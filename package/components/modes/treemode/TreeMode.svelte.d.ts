import { SvelteComponentTyped } from "svelte";
import type { JSONPatchDocument, JSONPath, JSONValue } from 'immutable-json-patch';
import type { AfterPatchCallback, Content, ContentErrors, JSONParser, JSONPatchResult, JSONPathParser, OnBlur, OnChange, OnChangeMode, OnClassName, OnError, OnExpand, OnFocus, OnJSONEditorModal, OnRenderMenu, OnRenderValue, OnSelect, OnSortModal, OnTransformModal, TransformModalOptions, Validator } from '../../../types';
declare const __propDef: {
    props: {
        readOnly: boolean;
        externalContent: Content;
        mainMenuBar: boolean;
        navigationBar: boolean;
        escapeControlCharacters: boolean;
        escapeUnicodeCharacters: boolean;
        parser: JSONParser;
        parseMemoizeOne: JSONParser['parse'];
        validator: Validator | null;
        validationParser: JSONParser;
        pathParser: JSONPathParser;
        indentation: number | string;
        onError: OnError;
        onChange: OnChange;
        onChangeMode: OnChangeMode;
        onRenderValue: OnRenderValue;
        onRenderMenu: OnRenderMenu;
        onClassName: OnClassName | undefined;
        onFocus: OnFocus;
        onBlur: OnBlur;
        onSelect: OnSelect;
        onSortModal: OnSortModal;
        onTransformModal: OnTransformModal;
        onJSONEditorModal: OnJSONEditorModal;
        expand?: (callback?: OnExpand) => void;
        validate?: () => ContentErrors;
        getJson?: () => JSONValue;
        patch?: (operations: JSONPatchDocument, afterPatch?: AfterPatchCallback) => JSONPatchResult;
        acceptAutoRepair?: () => {
            json: JSONValue;
            text: string;
        };
        openTransformModal?: ({ id, rootPath, onTransform, onClose }: TransformModalOptions) => void;
        scrollTo?: (path: JSONPath, scrollToWhenVisible?: boolean) => Promise<void>;
        findElement?: (path: JSONPath) => Element | null;
        focus?: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TreeModeProps = typeof __propDef.props;
export type TreeModeEvents = typeof __propDef.events;
export type TreeModeSlots = typeof __propDef.slots;
export default class TreeMode extends SvelteComponentTyped<TreeModeProps, TreeModeEvents, TreeModeSlots> {
    get expand(): (callback?: OnExpand) => void;
    get validate(): () => ContentErrors;
    get getJson(): () => JSONValue;
    get patch(): (operations: JSONPatchDocument, afterPatch?: AfterPatchCallback) => JSONPatchResult;
    get acceptAutoRepair(): () => {
        json: JSONValue;
        text: string;
    };
    get openTransformModal(): ({ id, rootPath, onTransform, onClose }: TransformModalOptions) => void;
    get scrollTo(): (path: JSONPath, scrollToWhenVisible?: boolean) => Promise<void>;
    get findElement(): (path: JSONPath) => Element;
    get focus(): () => void;
}
export {};
