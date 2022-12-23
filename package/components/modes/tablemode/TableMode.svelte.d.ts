import { SvelteComponentTyped } from "svelte";
import type { AfterPatchCallback, Content, ContentErrors, JSONParser, JSONPatchResult, OnBlur, OnChange, OnChangeMode, OnFocus, OnJSONEditorModal, OnRenderMenu, OnRenderValue, OnSelect, OnSortModal, OnTransformModal, TransformModalOptions, Validator } from '../../../types';
import type { JSONPatchDocument, JSONPath, JSONValue } from 'immutable-json-patch';
declare const __propDef: {
    props: {
        readOnly: boolean;
        externalContent: Content;
        mainMenuBar: boolean;
        escapeControlCharacters: boolean;
        escapeUnicodeCharacters: boolean;
        flattenColumns: boolean;
        parser: JSONParser;
        parseMemoizeOne: JSONParser['parse'];
        validator: Validator | null;
        validationParser: JSONParser;
        indentation: number | string;
        onChange: OnChange;
        onChangeMode: OnChangeMode;
        onRenderValue: OnRenderValue;
        onRenderMenu: OnRenderMenu;
        onFocus: OnFocus;
        onBlur: OnBlur;
        onSelect: OnSelect;
        onSortModal: OnSortModal;
        onTransformModal: OnTransformModal;
        onJSONEditorModal: OnJSONEditorModal;
        validate?: () => ContentErrors;
        patch?: (operations: JSONPatchDocument, afterPatch?: AfterPatchCallback) => JSONPatchResult;
        focus?: () => void;
        acceptAutoRepair?: () => {
            json: JSONValue;
            text: string;
        };
        scrollTo?: (path: JSONPath, scrollToWhenVisible?: boolean) => void;
        findElement?: (path: JSONPath) => Element | null;
        openTransformModal?: ({ id, rootPath, onTransform, onClose }: TransformModalOptions) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TableModeProps = typeof __propDef.props;
export type TableModeEvents = typeof __propDef.events;
export type TableModeSlots = typeof __propDef.slots;
export default class TableMode extends SvelteComponentTyped<TableModeProps, TableModeEvents, TableModeSlots> {
    get validate(): () => ContentErrors;
    get patch(): (operations: JSONPatchDocument, afterPatch?: AfterPatchCallback) => JSONPatchResult;
    get focus(): () => void;
    get acceptAutoRepair(): () => {
        json: JSONValue;
        text: string;
    };
    get scrollTo(): (path: JSONPath, scrollToWhenVisible?: boolean) => void;
    get findElement(): (path: JSONPath) => Element;
    get openTransformModal(): ({ id, rootPath, onTransform, onClose }: TransformModalOptions) => void;
}
export {};
