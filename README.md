# \<oscd-tree-table>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i oscd-tree-table
```

## Usage

```html
<script type="module">
  import 'oscd-tree-table';
</script>

<oscd-tree-table></oscd-tree-table>
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`


## `oscd-tree-table.ts`:

### class: `OscdTreeTable`

#### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

#### Fields

| Name          | Privacy | Type                     | Default | Description | Inherited From |
| ------------- | ------- | ------------------------ | ------- | ----------- | -------------- |
| `selection`   |         | `TreeSelection`          | `{}`    |             |                |
| `tree`        |         | `Tree`                   | `{}`    |             |                |
| `depth`       |         | `number`                 |         |             |                |
| `paths`       |         | `Path[]`                 |         |             |                |
| `filterRegex` |         | `RegExp`                 |         |             |                |
| `filter`      |         | `string`                 |         |             |                |
| `searchUI`    |         | `TextField \| undefined` |         |             |                |
| `container`   |         | `Element \| undefined`   |         |             |                |

#### Methods

| Name                   | Privacy | Description | Parameters                          | Return           | Inherited From |
| ---------------------- | ------- | ----------- | ----------------------------------- | ---------------- | -------------- |
| `renderCell`           |         |             | `path: Path, previousPath: Path`    | `TemplateResult` |                |
| `select`               |         |             | `parentPath: Path, clicked: string` | `void`           |                |
| `selectAll`            |         |             | `clicked: ListItem`                 | `void`           |                |
| `handleSelected`       |         |             | `event: SingleSelectedEvent`        | `Promise<void>`  |                |
| `scrollRight`          |         |             |                                     | `Promise<void>`  |                |
| `renderColumn`         |         |             | `column: (Path \| undefined)[]`     | `TemplateResult` |                |
| `renderExpandCell`     |         |             | `path: Path`                        | `TemplateResult` |                |
| `renderExpandColumn`   |         |             | `rows: Path[]`                      | `TemplateResult` |                |
| `renderCollapseColumn` |         |             | `rows: Path[]`                      | `TemplateResult` |                |
| `renderColumns`        |         |             |                                     | `TemplateResult` |                |
| `renderFilterField`    |         |             |                                     |                  |                |

<details><summary>Private API</summary>

#### Fields

| Name        | Privacy | Type | Default             | Description | Inherited From |
| ----------- | ------- | ---- | ------------------- | ----------- | -------------- |
| `collapsed` | private |      | `new Set<string>()` |             |                |

#### Methods

| Name             | Privacy | Description | Parameters               | Return     | Inherited From |
| ---------------- | ------- | ----------- | ------------------------ | ---------- | -------------- |
| `getPaths`       | private |             | `maxLength: number`      | `Path[]`   |                |
| `treeNode`       | private |             | `path: Path`             | `TreeNode` |                |
| `rows`           | private |             |                          | `Path[]`   |                |
| `toggleCollapse` | private |             | `serializedPath: string` |            |                |

</details>

<hr/>

### Exports

| Kind | Name            | Declaration   | Module             | Package |
| ---- | --------------- | ------------- | ------------------ | ------- |
| `js` | `OscdTreeTable` | OscdTreeTable | oscd-tree-table.ts |         |



&copy; 1970 THE AUTHORS
