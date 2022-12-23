<svelte:options immutable={true} />

<script>import { getContext } from 'svelte';
import Header from './Header.svelte';
import { compileJSONPointer, immutableJSONPatch, isJSONArray } from 'immutable-json-patch';
import { createDebug } from '../../utils/debug';
import { Mode } from '../../types';
import JSONEditorRoot from '../modes/JSONEditorRoot.svelte';
import { noop } from '../../utils/noop.js';
import { stringifyJSONPath, stripRootObject } from '../../utils/pathUtils';
import { initial, isEmpty, last } from 'lodash-es';
import { isJSONContent, toJSONContent } from '../../utils/jsonUtils';
import Icon from 'svelte-awesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import memoizeOne from 'memoize-one';
const debug = createDebug('jsoneditor:JSONEditorModal');
export let content; // the nested document
export let path;
export let onPatch;
export let readOnly;
export let indentation;
export let tabSize;
export let mainMenuBar;
export let navigationBar;
export let statusBar;
export let escapeControlCharacters;
export let escapeUnicodeCharacters;
export let flattenColumns;
export let parser;
export let validator;
export let validationParser;
export let pathParser;
export let onRenderValue;
export let onClassName;
export let onRenderMenu;
export let onSortModal;
export let onTransformModal;
const { close } = getContext('simple-modal');
const rootState = {
    mode: determineMode(content),
    content,
    relativePath: path
};
let stack = [rootState];
$: absolutePath = stack.flatMap((state) => state.relativePath);
$: pathDescription = !isEmpty(absolutePath)
    ? stripRootObject(stringifyJSONPath(absolutePath))
    : '(whole document)';
// not relevant in this Modal setting, but well
$: parseMemoizeOne = memoizeOne(parser.parse);
let error = undefined;
function determineMode(content) {
    return isJSONContent(content) && isJSONArray(content.json) ? Mode.table : Mode.tree;
}
function handleApply() {
    debug('handleApply');
    if (readOnly) {
        return;
    }
    try {
        error = undefined;
        const operations = [
            {
                op: 'replace',
                path: compileJSONPointer(last(stack).relativePath),
                value: toJSONContent(last(stack).content, parser).json // this can throw an error
            }
        ];
        if (stack.length > 1) {
            const parentContent = stack[stack.length - 2].content;
            const parentJson = toJSONContent(parentContent, parser).json;
            const updatedParentContent = {
                json: immutableJSONPatch(parentJson, operations)
            };
            // after successfully updated, remove from the stack and apply the change
            stack = initial(stack);
            handleChange(updatedParentContent);
        }
        else {
            onPatch(operations);
            close();
        }
    }
    catch (err) {
        error = err.toString();
    }
}
function handleClose() {
    debug('handleClose');
    if (stack.length > 1) {
        // remove the last item from the stack
        stack = initial(stack);
        // clear any error from the just closed state
        error = undefined;
    }
    else {
        // this is the first modal, the root state, close the modal
        close();
    }
}
function handleChange(updatedContent) {
    debug('handleChange', updatedContent);
    const updatedState = {
        ...last(stack),
        content: updatedContent
    };
    stack = [...initial(stack), updatedState];
}
function handleChangeMode(newMode) {
    debug('handleChangeMode', newMode);
    const updatedState = {
        ...last(stack),
        mode: newMode
    };
    stack = [...initial(stack), updatedState];
}
function handleError(newError) {
    error = newError.toString();
    console.error(newError);
}
function handleJSONEditorModal({ content, path }) {
    debug('handleJSONEditorModal', { content, path });
    const nestedModalState = {
        mode: determineMode(content),
        content,
        relativePath: path
    };
    stack = [...stack, nestedModalState];
}
function focus(element) {
    element.focus();
}
</script>

<div class="jse-modal jse-jsoneditor-modal">
  <Header
    title="Edit nested content {stack.length > 1 ? ` (${stack.length})` : ''}"
    onClose={handleClose}
  />

  <div class="jse-modal-contents">
    <div class="jse-label">
      <div class="jse-label-inner">Path</div>
    </div>
    <input class="jse-path" type="text" readonly title="Selected path" value={pathDescription} />

    <div class="jse-label">
      <div class="jse-label-inner">Contents</div>
    </div>

    <div class="jse-modal-inline-editor">
      <JSONEditorRoot
        mode={last(stack).mode}
        content={last(stack).content}
        {readOnly}
        {indentation}
        {tabSize}
        {statusBar}
        {mainMenuBar}
        {navigationBar}
        {escapeControlCharacters}
        {escapeUnicodeCharacters}
        {flattenColumns}
        {parser}
        {parseMemoizeOne}
        {validator}
        {validationParser}
        {pathParser}
        onError={handleError}
        onChange={handleChange}
        onChangeMode={handleChangeMode}
        {onRenderValue}
        {onClassName}
        onFocus={noop}
        onBlur={noop}
        {onRenderMenu}
        {onSortModal}
        {onTransformModal}
        onJSONEditorModal={handleJSONEditorModal}
      />
    </div>

    <div class="jse-actions">
      {#if error}
        <div class="jse-error">
          {error}
        </div>
      {/if}

      {#if stack.length > 1}
        <button type="button" class="jse-secondary" on:click={handleClose}>
          <Icon data={faCaretLeft} /> Back
        </button>
      {/if}
      {#if !readOnly}
        <button type="button" class="jse-primary" on:click={handleApply} use:focus> Apply </button>
      {:else}
        <button type="button" class="jse-primary" on:click={handleClose} use:focus> Close </button>
      {/if}
    </div>
  </div>
</div>

<style src="./JSONEditorModal.scss">.jse-modal {
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

.jse-modal.jse-jsoneditor-modal .jse-modal-contents {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 0;
  --jse-theme-color: var(--jse-modal-theme-color);
  --jse-theme-color-highlight: var(--jse-modal-theme-color-highlight);
}
.jse-modal.jse-jsoneditor-modal .jse-modal-contents .jse-label {
  font-weight: bold;
  display: block;
  box-sizing: border-box;
}
.jse-modal.jse-jsoneditor-modal .jse-modal-contents .jse-label .jse-label-inner {
  margin-top: calc(2 * var(--jse-padding));
  margin-bottom: calc(0.5 * var(--jse-padding));
  box-sizing: border-box;
}
.jse-modal.jse-jsoneditor-modal .jse-modal-contents .jse-label .jse-label-inner button {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  padding: 5px;
  margin: 0;
  font-weight: bold;
  padding: 0;
}
.jse-modal.jse-jsoneditor-modal .jse-modal-contents .jse-modal-inline-editor {
  flex: 1;
  min-height: 0;
  min-width: 0;
  display: flex;
}
.jse-modal.jse-jsoneditor-modal .jse-actions {
  gap: var(--jse-padding);
  align-items: center;
}
.jse-modal.jse-jsoneditor-modal .jse-actions .jse-error {
  flex: 1;
  color: var(--jse-error-color);
}
.jse-modal.jse-jsoneditor-modal .jse-actions button.jse-secondary {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  padding: 5px;
  margin: 0;
  background: var(--jse-button-secondary-background);
  color: var(--jse-button-secondary-color);
  padding: var(--jse-padding) calc(2 * var(--jse-padding));
  border-radius: 3px;
}
.jse-modal.jse-jsoneditor-modal .jse-actions button.jse-secondary:hover {
  background: var(--jse-button-secondary-background-highlight);
}
.jse-modal.jse-jsoneditor-modal .jse-actions button.jse-secondary:disabled {
  background: var(--jse-button-secondary-background-disabled);
}
.jse-modal.jse-jsoneditor-modal input {
  border: var(--jse-input-border);
  outline: none;
  box-sizing: border-box;
  padding: calc(0.5 * var(--jse-padding));
  font-family: var(--jse-font-family-mono);
  font-size: var(--jse-font-size-mono);
  color: inherit;
  background: var(--jse-input-background);
}
.jse-modal.jse-jsoneditor-modal input:focus {
  border: var(--jse-input-border-focus);
}
.jse-modal.jse-jsoneditor-modal input:read-only {
  background: var(--jse-input-background-readonly);
}</style>
