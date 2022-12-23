import { SvelteComponentTyped } from "svelte";
import type { JSONPatchDocument } from 'immutable-json-patch';
import type { Content, ContentErrors, JSONParser, JSONPatchResult, OnBlur, OnChange, OnChangeMode, OnError, OnFocus, OnRenderMenu, OnSortModal, OnTransformModal, TransformModalOptions, Validator } from '../../../types';
declare const __propDef: {
    props: {
        readOnly: boolean;
        mainMenuBar: boolean;
        statusBar: boolean;
        externalContent: Content;
        indentation: number | string;
        tabSize: number;
        escapeUnicodeCharacters: boolean;
        parser: JSONParser;
        validator: Validator | null;
        validationParser: JSONParser;
        onChange: OnChange;
        onChangeMode: OnChangeMode;
        onError: OnError;
        onFocus: OnFocus;
        onBlur: OnBlur;
        onRenderMenu: OnRenderMenu;
        onSortModal: OnSortModal;
        onTransformModal: OnTransformModal;
        focus?: () => void;
        patch?: (operations: JSONPatchDocument) => JSONPatchResult;
        openTransformModal?: ({ id, rootPath, onTransform, onClose }: TransformModalOptions) => void;
        refresh?: () => void;
        validate?: () => ContentErrors;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TextModeProps = typeof __propDef.props;
export type TextModeEvents = typeof __propDef.events;
export type TextModeSlots = typeof __propDef.slots;
export default class TextMode extends SvelteComponentTyped<TextModeProps, TextModeEvents, TextModeSlots> {
    get focus(): () => void;
    get patch(): (operations: JSONPatchDocument) => JSONPatchResult;
    get openTransformModal(): ({ id, rootPath, onTransform, onClose }: TransformModalOptions) => void;
    get refresh(): () => void;
    get validate(): () => ContentErrors;
}
export {};
