<script>import { Mode } from '../../../types';
import { valueType } from '../../../utils/typeUtils';
import { findNestedArrays } from '../../../logic/table';
import { getIn, isJSONArray, isJSONObject } from 'immutable-json-patch';
import { isEmpty } from 'lodash-es';
import { stringifyJSONPath, stripRootObject } from '../../../utils/pathUtils.js';
export let text;
export let json;
export let readOnly;
export let parser;
export let openJSONEditorModal;
export let onChangeMode;
$: action = readOnly ? 'View' : 'Edit';
let nestedArrayPaths;
$: nestedArrayPaths = json
    ? findNestedArrays(json)
        .slice(0, 99)
        .filter((path) => path.length > 0)
    : [];
$: hasNestedArrays = !isEmpty(nestedArrayPaths);
$: documentType = hasNestedArrays
    ? 'Object with nested arrays'
    : json === undefined && (text === '' || text === undefined)
        ? 'An empty document'
        : isJSONObject(json)
            ? 'An object'
            : isJSONArray(json)
                ? 'An empty array' // note: can also be an array with objects but without properties
                : `A ${valueType(json, parser)}`;
</script>

<div class="jse-table-mode-welcome">
  <div class="jse-space jse-before" />

  <div class="jse-nested-arrays">
    <div class="jse-nested-arrays-title">{documentType}</div>
    <div class="jse-nested-arrays-info">
      {#if hasNestedArrays}
        An object cannot be opened in table mode. You can open a nested array instead, or open the
        document in tree mode.
      {:else}
        {documentType} cannot be opened in table mode. You can open the document in tree mode instead.
      {/if}
    </div>
    {#each nestedArrayPaths as nestedArrayPath}
      {@const count = getIn(json, nestedArrayPath).length}

      <button
        type="button"
        class="jse-nested-array-action"
        on:click={() => openJSONEditorModal(nestedArrayPath)}
      >
        {action} "{stripRootObject(stringifyJSONPath(nestedArrayPath))}"
        <span class="jse-nested-array-count">({count} {count !== 1 ? 'items' : 'item'})</span>
      </button>
    {/each}
    <button type="button" class="jse-nested-array-action" on:click={() => onChangeMode(Mode.tree)}>
      {action} in tree mode
    </button>
  </div>

  <div class="jse-space jse-after" />
</div>

<style src="./TableModeWelcome.scss">.jse-table-mode-welcome {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  align-items: center;
  border-left: var(--jse-main-border);
  border-right: var(--jse-main-border);
}
.jse-table-mode-welcome:last-child {
  border-bottom: var(--jse-main-border);
}
.jse-table-mode-welcome .jse-space.jse-before {
  flex: 1;
}
.jse-table-mode-welcome .jse-nested-arrays {
  display: flex;
  flex-direction: column;
  gap: var(--jse-padding);
  max-width: 300px;
  margin: var(--jse-padding);
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
}
.jse-table-mode-welcome .jse-nested-arrays .jse-nested-arrays-info {
  color: var(--jse-panel-color-readonly);
}
.jse-table-mode-welcome .jse-nested-arrays button.jse-nested-array-action {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  padding: 5px;
  margin: 0;
  background: var(--jse-button-primary-background);
  color: var(--jse-button-primary-color);
  padding: var(--jse-padding) calc(2 * var(--jse-padding));
  border-radius: 3px;
  text-align: left;
}
.jse-table-mode-welcome .jse-nested-arrays button.jse-nested-array-action:hover {
  background: var(--jse-button-primary-background-highlight);
}
.jse-table-mode-welcome .jse-nested-arrays button.jse-nested-array-action:disabled {
  background: var(--jse-button-primary-background-disabled);
}
.jse-table-mode-welcome .jse-nested-arrays button.jse-nested-array-action .jse-nested-array-count {
  opacity: 0.5;
  white-space: nowrap;
}
.jse-table-mode-welcome .jse-space.jse-after {
  flex: 2;
}</style>
