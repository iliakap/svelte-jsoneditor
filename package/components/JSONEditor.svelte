<svelte:options accessors={false} immutable={true} />

<script>import { createDebug } from '../utils/debug';
import Modal, { bind } from 'svelte-simple-modal';
import { JSONEDITOR_MODAL_OPTIONS, SORT_MODAL_OPTIONS, TRANSFORM_MODAL_OPTIONS } from '../constants.js';
import { uniqueId } from '../utils/uniqueId.js';
import { isEqualParser, isJSONContent, isTextContent, validateContentType } from '../utils/jsonUtils';
import AbsolutePopup from './modals/popup/AbsolutePopup.svelte';
import { javascriptQueryLanguage } from '../plugins/query/javascriptQueryLanguage.js';
import { renderValue } from '../plugins/value/renderValue';
import { tick } from 'svelte';
import TransformModal from './modals/TransformModal.svelte';
import SortModal from './modals/SortModal.svelte';
import { Mode } from '../types';
import { noop } from '../utils/noop';
import { parseJSONPath, stringifyJSONPath } from '../utils/pathUtils';
import JSONEditorRoot from './modes/JSONEditorRoot.svelte';
import JSONEditorModal from './modals/JSONEditorModal.svelte';
import memoizeOne from 'memoize-one';
import ModalRef from '../components/modals/ModalRef.svelte';
// TODO: document how to enable debugging in the readme: localStorage.debug="jsoneditor:*", then reload
const debug = createDebug('jsoneditor:Main');
export let content = { text: '' };
export let readOnly = false;
export let indentation = 2;
export let tabSize = 4;
export let mode = Mode.tree;
export let mainMenuBar = true;
export let navigationBar = true;
export let statusBar = true;
export let escapeControlCharacters = false;
export let escapeUnicodeCharacters = false;
export let flattenColumns = true;
export let parser = JSON;
export let validator = null;
export let validationParser = JSON;
export let pathParser = {
    parse: parseJSONPath,
    stringify: stringifyJSONPath
};
export let queryLanguages = [javascriptQueryLanguage];
export let queryLanguageId = queryLanguages[0].id;
export let onChangeQueryLanguage = noop;
export let onChange = null;
export let onRenderValue = renderValue;
export let onClassName = () => undefined;
export let onRenderMenu = noop;
export let onChangeMode = noop;
export let onError = (err) => {
    console.error(err);
    alert(err.toString()); // TODO: create a nice alert modal
};
export let onFocus = noop;
export let onBlur = noop;
export let onSelect = noop;
let instanceId = uniqueId();
let hasFocus = false;
let refJSONEditorRoot;
let open; // svelte-simple-modal context open(...)
let jsoneditorModalState = null;
$: {
    const contentError = validateContentType(content);
    if (contentError) {
        console.error('Error: ' + contentError);
    }
}
// We memoize the last parse result for the case when the content is text and very large.
// In that case parsing takes a few seconds. When the user switches between tree and table mode,
// without having made a change, we do not want to parse the text again.
$: parseMemoizeOne = memoizeOne(parser.parse);
// rerender the full editor when the parser changes. This is needed because
// numeric state is hold at many places in the editor.
let previousParser = parser;
$: {
    if (!isEqualParser(parser, previousParser)) {
        debug('parser changed, recreate editor');
        if (isJSONContent(content)) {
            content = {
                json: parser.parse(previousParser.stringify(content.json))
            };
        }
        previousParser = parser;
        // new editor id -> will re-create the editor
        instanceId = uniqueId();
    }
}
export function get() {
    return content;
}
export function set(newContent) {
    debug('set');
    const contentError = validateContentType(newContent);
    if (contentError) {
        throw new Error(contentError);
    }
    // new editor id -> will re-create the editor
    instanceId = uniqueId();
    content = newContent;
}
export function update(updatedContent) {
    debug('update');
    const contentError = validateContentType(updatedContent);
    if (contentError) {
        throw new Error(contentError);
    }
    content = updatedContent;
}
export function patch(operations) {
    if (isTextContent(content)) {
        try {
            content = {
                json: parser.parse(content.text),
                text: undefined
            };
        }
        catch (err) {
            throw new Error('Cannot apply patch: current document contains invalid JSON');
        }
    }
    // Note that patch has an optional afterPatch callback.
    // right now we don's support this in the public API.
    return refJSONEditorRoot.patch(operations);
}
export function expand(callback) {
    refJSONEditorRoot.expand(callback);
}
/**
 * Open the transform modal
 */
export function transform(options) {
    refJSONEditorRoot.transform(options);
}
/**
 * Validate the contents of the editor using the configured validator.
 * Returns a parse error or a list with validation warnings
 */
export function validate() {
    return refJSONEditorRoot.validate();
}
/**
 * In tree mode, invalid JSON is automatically repaired when loaded. When the
 * repair was successful, the repaired contents are rendered but not yet
 * applied to the document itself until the user clicks "Ok" or starts editing
 * the data. Instead of accepting the repair, the user can also click
 * "Repair manually instead". Invoking `.acceptAutoRepair()` will
 * programmatically accept the repair. This will trigger an update,
 * and the method itself also returns the updated contents. In case of text
 * mode or when the editor is not in an "accept auto repair" status, nothing
 * will happen, and the contents will be returned as is.
 */
export function acceptAutoRepair() {
    return refJSONEditorRoot.acceptAutoRepair();
}
export function scrollTo(path) {
    return refJSONEditorRoot.scrollTo(path);
}
export function findElement(path) {
    return refJSONEditorRoot.findElement(path);
}
export function focus() {
    refJSONEditorRoot.focus();
}
export function refresh() {
    refJSONEditorRoot.refresh();
}
export function updateProps(props) {
    this.$set(props);
}
export function destroy() {
    this.$destroy();
}
function handleChange(updatedContent, previousContent, status) {
    content = updatedContent;
    if (onChange) {
        onChange(updatedContent, previousContent, status);
    }
}
function handleFocus() {
    hasFocus = true;
    if (onFocus) {
        onFocus();
    }
}
function handleBlur() {
    hasFocus = false;
    if (onBlur) {
        onBlur();
    }
}
async function toggleMode(newMode) {
    if (mode === newMode) {
        return;
    }
    mode = newMode;
    await tick();
    focus();
    onChangeMode(newMode);
}
function handleChangeQueryLanguage(newQueryLanguageId) {
    debug('handleChangeQueryLanguage', newQueryLanguageId);
    queryLanguageId = newQueryLanguageId;
    onChangeQueryLanguage(newQueryLanguageId);
}
// The onTransformModal method is located in JSONEditor to prevent circular references:
//     TreeMode -> TransformModal -> TreeMode
function onTransformModal({ id, json, rootPath, onTransform, onClose }) {
    if (readOnly) {
        return;
    }
    open(TransformModal, {
        id,
        json,
        rootPath,
        indentation,
        escapeControlCharacters,
        escapeUnicodeCharacters,
        parser,
        parseMemoizeOne,
        validationParser,
        pathParser,
        queryLanguages,
        queryLanguageId,
        onChangeQueryLanguage: handleChangeQueryLanguage,
        onRenderValue,
        onClassName,
        onTransform
    }, TRANSFORM_MODAL_OPTIONS, {
        onClose
    });
}
// The onSortModal is positioned here for consistency with TransformModal
function onSortModal({ id, json, rootPath, onSort, onClose }) {
    if (readOnly) {
        return;
    }
    open(SortModal, {
        id,
        json,
        rootPath,
        onSort
    }, SORT_MODAL_OPTIONS, {
        onClose
    });
}
// The onJSONEditorModal method is located in JSONEditor to prevent circular references:
//     JSONEditor -> TableMode -> JSONEditorModal -> JSONEditor
function onJSONEditorModal({ content, path, onPatch, onClose }) {
    debug('onJSONEditorModal', { content, path });
    jsoneditorModalState = {
        component: bind(JSONEditorModal, {
            content,
            path,
            onPatch,
            readOnly,
            indentation,
            tabSize,
            mainMenuBar,
            navigationBar,
            statusBar,
            escapeControlCharacters,
            escapeUnicodeCharacters,
            flattenColumns,
            parser,
            validator: undefined,
            validationParser,
            pathParser,
            // TODO: verify whether we need wrapper functions for the next
            // onChange, // TODO: cleanup when indeed not needed
            onRenderValue,
            onClassName,
            onRenderMenu,
            // onError, // TODO: cleanup when indeed not needed
            // onFocus, // TODO: cleanup when indeed not needed
            // onBlur, // TODO: cleanup when indeed not needed
            onSortModal,
            onTransformModal
        }),
        callbacks: {
            onClose
        }
    };
}
function closeJSONEditorModal() {
    jsoneditorModalState?.callbacks?.onClose();
    jsoneditorModalState = null;
}
$: {
    debug('mode changed to', mode);
    if (mode === 'code') {
        // check for 'code' is here for backward compatibility (deprecated since v0.4.0)
        console.warn('Deprecation warning: "code" mode is renamed to "text". Please use mode="text" instead.');
    }
}
</script>

<AbsolutePopup>
  <Modal
    show={jsoneditorModalState?.component}
    {...JSONEDITOR_MODAL_OPTIONS}
    on:close={closeJSONEditorModal}
  >
    <Modal>
      <ModalRef bind:open />
      <div class="jse-main" class:jse-focus={hasFocus}>
        {#key instanceId}
          <JSONEditorRoot
            bind:this={refJSONEditorRoot}
            {mode}
            {content}
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
            {onError}
            onChange={handleChange}
            onChangeMode={toggleMode}
            {onRenderValue}
            {onClassName}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {onSelect}
            {onRenderMenu}
            {onSortModal}
            {onTransformModal}
            {onJSONEditorModal}
          />
        {/key}
      </div>
    </Modal>
  </Modal>
</AbsolutePopup>

<style src="./JSONEditor.scss">:root {
  /* over all fonts, sizes, and colors */
  --jse-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu,
    Cantarell, "Helvetica Neue", sans-serif;
  /* "consolas" for Windows, "menlo" for Mac with fallback to "monaco", 'Ubuntu Mono' for Ubuntu */
  /* (at Mac this font looks too large at 14px, but 13px is too small for the font on Windows) */
  --jse-font-family-mono: consolas, menlo, monaco, "Ubuntu Mono", "source-code-pro", monospace;
  --jse-font-size-mono: 14px;
  --jse-font-size: 16px;
  --jse-font-size-text-mode-search: 80%;
  --jse-line-height: calc(1em + 4px);
  --jse-indent-size: calc(1em + 4px);
  --jse-color-picker-button-size: 1em;
  --jse-padding: 10px;
  --jse-theme-color: #3883fa;
  --jse-theme-color-highlight: #5f9dff;
  --jse-background-color: #fff;
  --jse-text-color: #4d4d4d;
  --jse-text-readonly: #8d8d8d;
  --jse-text-color-inverse: #fff;
  --jse-error-color: #ee5341;
  --jse-warning-color: #fdc539;
  /* main, menu, modal */
  --jse-main-border: 1px solid #d7d7d7;
  --jse-menu-color: var(--jse-text-color-inverse);
  --jse-menu-button-size: 32px;
  --jse-modal-background: #f5f5f5;
  --jse-modal-overlay-background: rgba(0, 0, 0, 0.3);
  --jse-modal-code-background: rgba(0, 0, 0, 0.05);
  /* jsoneditor modal */
  --jse-modal-theme-color: #707070;
  --jse-modal-theme-color-highlight: #646464;
  /* tooltip in text mode */
  --jse-tooltip-color: var(--jse-text-color);
  --jse-tooltip-background: var(--jse-modal-background);
  --jse-tooltip-border: var(--jse-main-border);
  --jse-tooltip-action-button-color: var(--jse-text-color-inverse);
  --jse-tooltip-action-button-background: #4d4d4d;
  /* panels: navigation bar, gutter, search box */
  --jse-panel-background: #ebebeb;
  --jse-panel-color: var(--jse-text-color);
  --jse-panel-color-readonly: #b2b2b2;
  --jse-panel-border: var(--jse-main-border);
  --jse-panel-button-color: inherit;
  --jse-panel-button-background: transparent;
  --jse-panel-button-color-highlight: var(--jse-text-color);
  --jse-panel-button-background-highlight: #e0e0e0;
  /* navigation-bar */
  --jse-navigation-bar-background: var(--jse-background-color);
  --jse-navigation-bar-background-highlight: #e5e5e5;
  --jse-navigation-bar-dropdown-color: #656565;
  /* context menu */
  --jse-context-menu-background: #656565;
  --jse-context-menu-background-highlight: #7a7a7a;
  --jse-context-menu-color: var(--jse-text-color-inverse);
  --jse-context-menu-color-disabled: #9d9d9d;
  --jse-context-menu-separator-color: #7a7a7a;
  --jse-context-menu-pointer-background: var(--jse-context-menu-background);
  --jse-context-menu-pointer-background-highlight: var(--jse-context-menu-background-highlight);
  --jse-context-menu-pointer-color: var(--jse-context-menu-color);
  --jse-context-menu-pointer-size: calc(1em + 4px);
  --jse-context-menu-tip-background: rgba(255, 255, 255, 0.2);
  --jse-context-menu-tip-color: inherit;
  /* contents: json key and values */
  --jse-key-color: #1a1a1a;
  --jse-value-color: #1a1a1a;
  --jse-value-color-number: #ee422e;
  --jse-value-color-boolean: #ff8c00;
  --jse-value-color-null: #004ed0;
  --jse-value-color-string: #008000;
  --jse-value-color-url: #008000;
  --jse-delimiter-color: rgba(0, 0, 0, 0.38);
  --jse-edit-outline: 2px solid #656565;
  /* contents: selected or hovered */
  --jse-selection-background-color: #d3d3d3;
  --jse-selection-background-light-color: #e8e8e8;
  --jse-hover-background-color: rgba(0, 0, 0, 0.06);
  --jse-active-line-background-color: rgba(0, 0, 0, 0.06);
  --jse-search-match-background-color: #99ff7780;
  /* contents: section of collapsed items in an array */
  --jse-collapsed-items-background-color: #f5f5f5;
  --jse-collapsed-items-selected-background-color: #c2c2c2;
  --jse-collapsed-items-link-color: rgba(0, 0, 0, 0.38);
  --jse-collapsed-items-link-color-highlight: #ee5341;
  /* contents: highlighting of search matches */
  --jse-search-match-color: #ffe665;
  --jse-search-match-outline: 1px solid #ffd700;
  --jse-search-match-active-color: #ffd700;
  --jse-search-match-active-outline: 1px solid #e1be00;
  /* contents: inline tags inside the JSON document */
  --jse-tag-background: rgba(0, 0, 0, 0.2);
  --jse-tag-color: var(--jse-text-color-inverse);
  /* contents: table */
  --jse-table-header-background: #f5f5f5;
  --jse-table-header-background-highlight: #e8e8e8;
  --jse-table-row-odd-background: rgba(0, 0, 0, 0.05);
  /* controls in modals: inputs, buttons, and `a` */
  --jse-controls-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.24);
  --jse-input-background: var(--jse-background-color);
  --jse-input-background-readonly: transparent;
  --jse-input-border: 1px solid #d8dbdf;
  --jse-input-border-focus: 1px solid var(--jse-theme-color);
  --jse-input-radius: 3px;
  --jse-button-background: #e0e0e0;
  --jse-button-background-highlight: #e7e7e7;
  --jse-button-color: var(--jse-text-color);
  --jse-button-primary-background: var(--jse-theme-color);
  --jse-button-primary-background-highlight: var(--jse-theme-color-highlight);
  --jse-button-primary-background-disabled: #9d9d9d;
  --jse-button-primary-color: var(--jse-text-color-inverse);
  --jse-button-secondary-background: #d3d3d3;
  --jse-button-secondary-background-highlight: #e1e1e1;
  --jse-button-secondary-background-disabled: #9d9d9d;
  --jse-button-secondary-color: var(--jse-text-color);
  --jse-a-color: #156fc5;
  --jse-a-color-highlight: #0f508d;
  /* messages */
  --jse-message-error-background: var(--jse-error-color);
  --jse-message-error-color: var(--jse-text-color-inverse);
  --jse-message-warning-background: #ffde5c;
  --jse-message-warning-color: var(--jse-text-color);
  --jse-message-success-background: #9ac45d;
  --jse-message-success-color: var(--jse-text-color-inverse);
  --jse-message-info-background: #4f91ff;
  --jse-message-info-color: var(--jse-text-color-inverse);
  --jse-message-action-background: rgba(255, 255, 255, 0.2);
  --jse-message-action-background-highlight: rgba(255, 255, 255, 0.3);
  /* svelte-select */
  --itemIsActiveBG: #3883fa;
  --border: 1px solid #d8dbdf;
  --borderRadius: 3px;
  --background: #fff;
  /* color picker */
  --jse-color-picker-background: var(--jse-panel-background);
  --jse-color-picker-border-box-shadow: #cbcbcb 0 0 0 1px;
}

.jse-main {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 150px;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  line-height: normal;
  position: relative;
  display: flex;
  flex-direction: row;
}</style>
