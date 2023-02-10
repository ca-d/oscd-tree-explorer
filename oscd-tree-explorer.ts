import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { List, SingleSelectedEvent } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { TextField } from '@material/mwc-textfield';

export type TreeSelection = { [name: string]: TreeSelection };

export type Path = string[];

function samePath(a: Path, b?: Path): boolean {
  if (a.length !== b?.length) return false;
  return a.every((x, i) => b[i] === x);
}

/* eslint-disable no-use-before-define */
export interface TreeNode {
  children?: Tree;
  text?: string;
  mandatory?: boolean;
}

export type Tree = Partial<Record<string, TreeNode>>;

const placeholderCell = html`<mwc-list-item noninteractive></mwc-list-item>`;

function renderCollapseCell(path: Path): TemplateResult {
  const needle = JSON.stringify(path.slice(0, -1));
  if (path.length < 2) return placeholderCell;
  return html`<mwc-list-item class="filter" data-path="${needle}" hasMeta
    ><mwc-icon slot="meta">unfold_less</mwc-icon></mwc-list-item
  >`;
}

/** @returns the depth of `t` if an object or array, zero otherwise. */
function depth(t: Record<string, unknown>, mem = new WeakSet()): number {
  if (mem.has(t)) return Infinity;
  switch (t?.constructor) {
    case Object:
    case Array:
      mem.add(t);
      return (
        1 +
        Math.max(
          -1,
          ...Object.values(t).map(_ => depth(<Record<string, unknown>>_, mem))
        )
      );
    default:
      return 0;
  }
}

function getColumns(rows: Path[], count: number): (Path | undefined)[][] {
  return new Array(count)
    .fill(0)
    .map((_c, c) =>
      new Array(rows.length)
        .fill(0)
        .map((_r, r) =>
          c < rows[r].length ? rows[r].slice(0, c + 1) : undefined
        )
    );
}

@customElement('oscd-tree-explorer')
export class OscdTreeExplorer extends LitElement {
  @property({ type: Object, reflect: true })
  selection: TreeSelection = {};

  @property({ type: Boolean, reflect: true })
  multi = false;

  @property({ type: Object })
  tree: Tree = {};

  @property({ type: Number, reflect: true })
  get depth(): number {
    return depth(this.selection);
  }

  @property({ type: Array, reflect: true })
  get paths(): Path[] {
    return this.getPaths();
  }

  set paths(paths: Path[]) {
    const selection: TreeSelection = {};
    for (const path of paths) {
      let i = selection;
      for (const name of path) {
        if (!Object.prototype.hasOwnProperty.call(i, name)) i[name] = {};
        i = i[name];
      }
    }
    this.selection = selection;
  }

  @property({ type: Array, reflect: true })
  get path(): Path {
    return this.paths[0] ?? [];
  }

  set path(path: Path) {
    this.paths = [path];
  }

  get filterRegex(): RegExp {
    return new RegExp(this.searchUI.value, 'iu');
  }

  @property({ type: String })
  get filter(): string {
    return this.searchUI.value;
  }

  @query('mwc-textfield')
  searchUI!: TextField;

  @query('div')
  container!: Element;

  private collapsed = new Set<string>();

  private getPaths(maxLength?: number): Path[] {
    let paths: Path[] = Object.keys(this.selection).map(key => [key]);

    let i = maxLength ?? this.depth - 1;
    while (i > 0) {
      i -= 1;
      paths = paths.flatMap(path => {
        let dir = this.selection;
        for (const slug of path) dir = dir[slug]; // recursive descent
        const newPaths = Object.keys(dir).map(slug => path.concat(slug));
        return newPaths.length === 0 ? [path] : newPaths;
      });
    }

    return maxLength === undefined
      ? paths
      : paths
          .filter(path => path.length > maxLength)
          .sort((p1, p2) => p1.join(' ').localeCompare(p2.join(' ')));
  }

  private treeNode(path: Path): TreeNode {
    let { tree } = this;
    for (const slug of path.slice(0, -1)) tree = tree[slug]?.children ?? {};
    return tree[path[path.length - 1]] ?? {};
  }

  private rows(): Path[] {
    const rs = Object.keys(this.tree).map(s => [s]);
    for (let i = 0; i < this.depth; i += 1)
      this.getPaths(i).forEach(p =>
        Object.keys(this.treeNode(p).children ?? {}).forEach(s =>
          rs.push(p.concat(s))
        )
      );
    return rs
      .filter(
        r =>
          !rs.some(r2 => r2.length > r.length && r.every((s, i) => r2[i] === s))
      )
      .filter(r => this.filter === '' || r.join(' ').match(this.filterRegex))
      .map(r => {
        for (let i = r.length - 1; i > 0; i -= 1)
          if (this.collapsed.has(JSON.stringify(r.slice(0, -i))))
            return r.slice(0, -i);
        return r;
      })
      .sort((r1, r2) => r1.join(' ').localeCompare(r2.join(' ')))
      .filter((x, i, xs) => !samePath(x, xs[i - 1]));
  }

  renderCell(path: Path, previousPath: Path = []): TemplateResult {
    const parent = path.slice(0, -1);
    const entry = path[path.length - 1];

    const activated = this.getPaths(parent.length)
      .map(p => JSON.stringify(p))
      .includes(JSON.stringify(path));
    const noninteractive = path.every((s, i) => previousPath[i] === s);

    let defaultSelected = false;
    const afterRender = (item?: Element) => {
      if (!item) defaultSelected = false;
      if (defaultSelected || !item) return;
      defaultSelected = true;
      // eslint-disable-next-line no-param-reassign
      (item as ListItem).activated = activated && !noninteractive;
      // TODO(ca-d): find out why resetting activated is needed! Lit bug?
      if (this.treeNode(path).mandatory) {
        if (this.multi) {
          let dir = this.selection;
          for (const slug of path.slice(0, -1)) dir = dir[slug]; // rec. descent
          if (dir[path[path.length - 1]]) return;
          dir[path[path.length - 1]] = {};
          this.requestUpdate('selection');
        } else {
          const selection: TreeSelection = {};
          let dir = selection;
          for (const slug of path) {
            dir[slug] = {};
            dir = dir[slug];
          }
          if (depth(selection) > depth(this.selection))
            this.selection = selection;
        }
      }
    };

    const disabled = this.treeNode(path).mandatory;

    const collapsed = this.collapsed.has(JSON.stringify(path));
    const expandable = Object.keys(this.treeNode(path).children ?? {}).length;
    let icon = '';
    if (expandable)
      if (activated) icon = 'expand_less';
      else icon = 'expand_more';
    else if (activated) icon = 'remove';
    else icon = 'add';

    if (disabled)
      if (collapsed) icon = 'more_vert';
      else icon = '';
    if (noninteractive) icon = 'subdirectory_arrow_right';

    return html`<mwc-list-item
      value="${entry}"
      data-path=${JSON.stringify(parent)}
      hasMeta
      ?activated=${activated}
      ?disabled=${disabled}
      ?noninteractive=${noninteractive}
      style="${noninteractive ? 'opacity: 0.38' : ''}"
      ${ref(afterRender)}
      >${icon
        ? html`<mwc-icon slot="meta">${icon}</mwc-icon>`
        : html``}${this.treeNode(path).text ??
      path[path.length - 1]}</mwc-list-item
    >`;
  }

  multiSelect(parentPath: Path, clicked: string): void {
    const path = parentPath.concat([clicked]);
    const isSubPath = (p: Path) => path.every((s, i) => p[i] === s);
    if (this.paths.some(isSubPath))
      this.paths = this.paths.filter(p => !isSubPath(p)).concat([parentPath]);
    else this.paths = this.paths.concat([path]);
    /*
    let dir = this.selection;
    for (const slug of path) dir = dir[slug]; // recursive descent

    if (dir && dir[clicked]) delete dir[clicked];
    // deselect if selected
    else dir[clicked] = {}; // select otherwise
     */
  }

  singleSelect(path: Path, clicked: string): void {
    if (this.path[path.length] === clicked) this.path = path;
    // deselect if selected
    else this.path = path.concat([clicked]); // select otherwise
  }

  select(path: Path, clicked: string): void {
    if (this.multi) this.multiSelect(path, clicked);
    else this.singleSelect(path, clicked);
  }

  async handleSelected(event: SingleSelectedEvent): Promise<void> {
    const clicked = <ListItem | null>(<List>event.target).selected;
    const selectedValue = clicked?.value;
    if (!clicked || !selectedValue) return;
    if (selectedValue === 'selectAll') {
      const items = Array.from(
        clicked.closest('mwc-list')!.children
      ) as ListItem[];
      if (!items?.length) return;
      const selected = items
        .slice(1)
        .some(
          item =>
            !(item as ListItem).activated &&
            !(item as ListItem).noninteractive &&
            !(item as ListItem).disabled
        );
      items.forEach(item => {
        if (selected === (item as ListItem).activated) return;
        const path = JSON.parse(item.dataset.path ?? '[]') as Path;

        this.select(path, item.value);
      });
      await this.scrollRight();
    }
    const path = JSON.parse(clicked.dataset.path ?? '[]') as Path;

    this.select(path, selectedValue);
    clicked.selected = false;

    await this.scrollRight();
  }

  async scrollRight(): Promise<void> {
    this.requestUpdate();
    await this.updateComplete;
    await new Promise(resolve => {
      setTimeout(resolve, 250);
    });
    this.container.scrollLeft = 1000 * this.depth;
  }

  renderColumn(column: (Path | undefined)[]): TemplateResult {
    const items: TemplateResult[] = [];

    if (column.length === 0 || column.every(p => p === undefined))
      return html``;
    for (let i = 0; i < column.length; i += 1) {
      const path = column[i];
      items.push(
        path ? this.renderCell(column[i]!, column[i - 1]) : placeholderCell
      );
    }

    return html`<mwc-list
      @selected=${(e: SingleSelectedEvent) => this.handleSelected(e)}
      >${this.multi
        ? html`<mwc-list-item hasMeta value="selectAll"
            ><mwc-icon slot="meta">done_all</mwc-icon></mwc-list-item
          >`
        : placeholderCell}${items}</mwc-list
    >`;
  }

  renderExpandCell(path: Path): TemplateResult {
    const needle = JSON.stringify(path);
    if (!this.collapsed.has(needle)) return placeholderCell;
    if (!path.length) return placeholderCell;
    return html`<mwc-list-item class="filter" data-path="${needle}" hasMeta
      ><mwc-icon slot="meta">unfold_more</mwc-icon></mwc-list-item
    >`;
  }

  private toggleCollapse(serializedPath: string) {
    if (this.collapsed.has(serializedPath))
      this.collapsed.delete(serializedPath);
    else this.collapsed.add(serializedPath);
    this.requestUpdate();
  }

  renderExpandColumn(rows: Path[]): TemplateResult {
    return html`
      <mwc-list
        class="expand"
        @selected=${(e: SingleSelectedEvent) => {
          const clicked = <ListItem | null>(<List>e.target).selected;
          if (!clicked) return;
          clicked.selected = false;
          const { path } = clicked.dataset;
          if (path) this.toggleCollapse(path);
        }}
        >${placeholderCell}${rows.map(p => this.renderExpandCell(p))}</mwc-list
      >
    `;
  }

  renderCollapseColumn(rows: Path[]): TemplateResult {
    return html`<mwc-list
      class="collapse"
      @selected=${(e: SingleSelectedEvent) => {
        const clicked = <ListItem | null>(<List>e.target).selected;
        if (!clicked) return;
        clicked.selected = false;
        const { path } = clicked.dataset;
        if (path) this.toggleCollapse(path);
      }}
      >${placeholderCell}${rows.map(p => renderCollapseCell(p))}</mwc-list
    >`;
  }

  renderColumns(): TemplateResult {
    const rows = this.rows();
    const columns = getColumns(rows, this.depth + 1).map(c =>
      this.renderColumn(c)
    );

    return html`${columns.length > 1
      ? this.renderCollapseColumn(rows)
      : ''}${columns}${this.renderExpandColumn(rows)}`;
  }

  renderFilterField() {
    return html`<mwc-textfield
      style="--mdc-shape-small: 28px;"
      outlined
      icon="search"
      ${ref(elm =>
        elm?.setAttribute(
          'icon',
          (elm as TextField).value ? 'saved_search' : 'search'
        )
      )}
      label="Regular Expression"
      @input=${() => this.requestUpdate('filter')}
    ></mwc-textfield>`;
  }

  render() {
    return html`${this.renderFilterField()}
      <div class="pane">${this.renderColumns()}</div>`;
  }

  static styles = css`
    div.pane {
      display: flex;
      flex-direction: row;
      overflow: auto;
    }

    mwc-list-item.filter {
      color: var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38));
    }
  `;
}
