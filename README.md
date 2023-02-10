# \<oscd-tree-explorer>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i oscd-tree-explorer
```

## Usage

```html
<script type="module">
  import 'oscd-tree-explorer';
</script>

<oscd-tree-explorer></oscd-tree-explorer>
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


## `oscd-tree-explorer.ts`:

### class: `OscdTreeExplorer`

#### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

#### Fields

| Name          | Privacy | Type            | Default | Description | Inherited From |
| ------------- | ------- | --------------- | ------- | ----------- | -------------- |
| `selection`   |         | `TreeSelection` | `{}`    |             |                |
| `multi`       |         | `boolean`       | `false` |             |                |
| `tree`        |         | `Tree`          | `{}`    |             |                |
| `depth`       |         | `number`        |         |             |                |
| `paths`       |         | `Path[]`        |         |             |                |
| `path`        |         | `Path`          |         |             |                |
| `filterRegex` |         | `RegExp`        |         |             |                |
| `filter`      |         | `string`        |         |             |                |
| `searchUI`    |         | `TextField`     |         |             |                |
| `container`   |         | `Element`       |         |             |                |

#### Methods

| Name                   | Privacy | Description | Parameters                          | Return           | Inherited From |
| ---------------------- | ------- | ----------- | ----------------------------------- | ---------------- | -------------- |
| `renderCell`           |         |             | `path: Path, previousPath: Path`    | `TemplateResult` |                |
| `multiSelect`          |         |             | `parentPath: Path, clicked: string` | `void`           |                |
| `singleSelect`         |         |             | `path: Path, clicked: string`       | `void`           |                |
| `select`               |         |             | `path: Path, clicked: string`       | `void`           |                |
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

| Kind | Name               | Declaration      | Module                | Package |
| ---- | ------------------ | ---------------- | --------------------- | ------- |
| `js` | `OscdTreeExplorer` | OscdTreeExplorer | oscd-tree-explorer.ts |         |



&copy; 1970 THE AUTHORS
