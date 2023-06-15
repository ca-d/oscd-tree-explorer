# \<oscd-tree-grid>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i oscd-tree-grid
```

## Usage

```html
<script type="module">
  import 'oscd-tree-grid';
</script>

<oscd-tree-grid></oscd-tree-grid>
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


## `oscd-tree-grid.ts`:

### class: `TreeGrid`

#### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

#### Fields

| Name        | Privacy | Type            | Default | Description | Inherited From |
| ----------- | ------- | --------------- | ------- | ----------- | -------------- |
| `selection` |         | `TreeSelection` | `{}`    |             |                |
| `tree`      |         | `Tree`          | `{}`    |             |                |
| `paths`     |         | `Path[]`        |         |             |                |
| `filter`    |         | `string`        |         |             |                |

<details><summary>Private API</summary>

#### Fields

| Name          | Privacy | Type                     | Default             | Description | Inherited From |
| ------------- | ------- | ------------------------ | ------------------- | ----------- | -------------- |
| `depth`       | private | `number`                 |                     |             |                |
| `searchUI`    | private | `TextField \| undefined` |                     |             |                |
| `filterRegex` | private | `RegExp`                 |                     |             |                |
| `container`   | private | `Element \| undefined`   |                     |             |                |
| `collapsed`   | private |                          | `new Set<string>()` |             |                |

#### Methods

| Name                   | Privacy | Description | Parameters                          | Return           | Inherited From |
| ---------------------- | ------- | ----------- | ----------------------------------- | ---------------- | -------------- |
| `getPaths`             | private |             | `maxLength: number`                 | `Path[]`         |                |
| `treeNode`             | private |             | `path: Path`                        | `TreeNode`       |                |
| `rows`                 | private |             |                                     | `Path[]`         |                |
| `renderCell`           | private |             | `path: Path, previousPath: Path`    | `TemplateResult` |                |
| `select`               | private |             | `parentPath: Path, clicked: string` | `void`           |                |
| `selectAll`            | private |             | `clicked: ListItem`                 | `void`           |                |
| `handleSelected`       | private |             | `event: SingleSelectedEvent`        | `Promise<void>`  |                |
| `scrollRight`          | private |             |                                     | `Promise<void>`  |                |
| `renderColumn`         | private |             | `column: (Path \| undefined)[]`     | `TemplateResult` |                |
| `renderExpandCell`     | private |             | `path: Path`                        | `TemplateResult` |                |
| `toggleCollapse`       | private |             | `serializedPath: string`            |                  |                |
| `renderExpandColumn`   | private |             | `rows: Path[]`                      | `TemplateResult` |                |
| `renderCollapseColumn` | private |             | `rows: Path[]`                      | `TemplateResult` |                |
| `renderColumns`        | private |             |                                     | `TemplateResult` |                |
| `renderFilterField`    | private |             |                                     |                  |                |

</details>

<hr/>

### Exports

| Kind | Name       | Declaration | Module            | Package |
| ---- | ---------- | ----------- | ----------------- | ------- |
| `js` | `TreeGrid` | TreeGrid    | oscd-tree-grid.ts |         |



&copy; 2023 OMICRON electronics GmbH
