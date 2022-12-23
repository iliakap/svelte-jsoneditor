<svelte:options immutable={true} />

<script>import { isEmpty } from 'lodash-es';
import { getContext } from 'svelte';
import Select from 'svelte-select';
import Header from './Header.svelte';
import { getNestedPaths } from '../../utils/arrayUtils.js';
import { pathToOption, stringifyJSONPath } from '../../utils/pathUtils.js';
import { sortJson } from '../../logic/sort.js';
import { sortModalState } from './sortModalState.js';
import { compileJSONPointer, getIn } from 'immutable-json-patch';
import { createDebug } from '../../utils/debug';
import { stripRootObject } from '../../utils/pathUtils.js';
const debug = createDebug('jsoneditor:SortModal');
export let id;
export let json; // the whole document
export let rootPath;
export let onSort;
const { close } = getContext('simple-modal');
const stateId = `${id}:${compileJSONPointer(rootPath)}`;
const selectedJson = getIn(json, rootPath);
$: jsonIsArray = Array.isArray(selectedJson);
$: paths = jsonIsArray ? getNestedPaths(selectedJson) : undefined;
$: properties = paths ? paths.map(pathToOption) : undefined;
const asc = {
    value: 1,
    label: 'ascending'
};
const desc = {
    value: -1,
    label: 'descending'
};
const directions = [asc, desc];
let selectedProperty = (sortModalState[stateId] && sortModalState[stateId].selectedProperty) || undefined;
let selectedDirection = (sortModalState[stateId] && sortModalState[stateId].selectedDirection) || asc;
let sortError = undefined;
$: {
    // if there is only one option, select it and do not render the select box
    if (selectedProperty === undefined && properties && properties.length === 1) {
        selectedProperty = properties[0];
    }
}
$: {
    // remember the selected values for the next time we open the SortModal
    // just in memory, not persisted
    sortModalState[stateId] = {
        selectedProperty,
        selectedDirection
    };
    debug('store state in memory', stateId, sortModalState[stateId]);
}
function handleSort() {
    try {
        sortError = undefined;
        const itemPath = selectedProperty?.value;
        const direction = selectedDirection?.value;
        const operations = sortJson(json, rootPath, itemPath, direction);
        onSort({ operations, rootPath, itemPath, direction });
        close();
    }
    catch (err) {
        sortError = err.toString();
    }
}
function focus(element) {
    element.focus();
}
</script>

<div class="jse-modal jse-sort">
  <Header title={jsonIsArray ? 'Sort array items' : 'Sort object keys'} />

  <div class="jse-modal-contents">
    <table>
      <colgroup>
        <col width="25%" />
        <col width="75%" />
      </colgroup>
      <tbody>
        <tr>
          <th>Path</th>
          <td>
            <input
              class="jse-path"
              type="text"
              readonly
              title="Selected path"
              value={!isEmpty(rootPath)
                ? stripRootObject(stringifyJSONPath(rootPath))
                : '(whole document)'}
            />
          </td>
        </tr>
        {#if jsonIsArray && (properties.length > 1 || selectedProperty === undefined)}
          <tr>
            <th>Property</th>
            <td>
              <Select showChevron items={properties} bind:value={selectedProperty} />
            </td>
          </tr>
        {/if}
        <tr>
          <th>Direction</th>
          <td>
            <Select
              showChevron
              clearable={false}
              items={directions}
              bind:value={selectedDirection}
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="jse-space">
      {#if sortError}
        <div class="jse-error">
          {sortError}
        </div>
      {/if}
    </div>

    <div class="jse-actions">
      <button
        type="button"
        class="jse-primary"
        on:click={handleSort}
        use:focus
        disabled={jsonIsArray ? !selectedProperty : false}
      >
        Sort
      </button>
    </div>
  </div>
</div>

<style src="./SortModal.scss">.jse-modal {
  --height: 36px;
  --multi-item-height: 28px;
  --multi-item-margin: 2px;
  --multi-item-padding: 2px 8px;
  --multi-item-border-radius: 6px;
  --indicator-top: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  line-height: normal;
  background: var(--jse-modal-background);
  color: var(--jse-text-color);
}
.jse-modal .jse-modal-contents {
  padding: 20px;
  overflow: auto;
  min-width: 0;
  min-height: 0;
}
.jse-modal .jse-modal-contents .jse-actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: var(--jse-padding);
}
.jse-modal .jse-modal-contents .jse-actions button.jse-primary {
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
}
.jse-modal .jse-modal-contents .jse-actions button.jse-primary:hover {
  background: var(--jse-button-primary-background-highlight);
}
.jse-modal .jse-modal-contents .jse-actions button.jse-primary:disabled {
  background: var(--jse-button-primary-background-disabled);
}

:global(.bg.jse-modal-bg) {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: var(--jse-modal-overlay-background);
}

:global(.bg.jse-modal-bg .jse-modal-window-wrap) {
  margin: 0;
}

:global(.bg.jse-modal-bg .jse-modal-window) {
  max-width: 90%;
  margin: 4rem auto 2rem auto;
  border-radius: 2px;
}

:global(.bg.jse-modal-bg .jse-modal-window.jse-modal-window-sort) {
  width: 400px;
}

:global(.bg.jse-modal-bg .jse-modal-window.jse-modal-window-transform) {
  width: 1200px;
  height: 1200px;
  max-height: 80%;
  display: flex;
}

:global(.bg.jse-modal-bg .jse-modal-window.jse-modal-window-jsoneditor) {
  width: 800px;
  height: auto;
  min-height: 500px;
  max-height: 80%;
  display: flex;
}

:global(.bg.jse-modal-bg .jse-modal-content) {
  flex: 1;
  display: flex;
  max-height: calc(100vh - 6rem);
  padding: 0;
}

.jse-modal.jse-sort table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}
.jse-modal.jse-sort table th,
.jse-modal.jse-sort table td {
  text-align: left;
  vertical-align: middle;
  font-weight: normal;
  padding-bottom: var(--jse-padding);
}
.jse-modal.jse-sort table th input.jse-path,
.jse-modal.jse-sort table td input.jse-path {
  width: 100%;
  box-sizing: border-box;
  padding: 6px 16px;
  border: var(--jse-input-border);
  border-radius: var(--jse-input-radius);
  font-family: inherit;
  font-size: inherit;
  background: inherit;
  color: inherit;
  outline: none;
}
.jse-modal.jse-sort table th input.jse-path:read-only,
.jse-modal.jse-sort table td input.jse-path:read-only {
  background: var(--jse-input-background-readonly);
}
.jse-modal.jse-sort table th :global(.svelte-select input),
.jse-modal.jse-sort table td :global(.svelte-select input) {
  box-sizing: border-box;
}
.jse-modal.jse-sort .jse-space {
  height: 200px;
}
.jse-modal.jse-sort .jse-space .jse-error {
  color: var(--jse-error-color);
}</style>
