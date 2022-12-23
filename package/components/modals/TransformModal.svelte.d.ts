import { SvelteComponentTyped } from "svelte";
import type { JSONPath, JSONValue } from 'immutable-json-patch';
import type { JSONParser, JSONPathParser, OnChangeQueryLanguage, OnClassName, OnPatch, OnRenderValue, QueryLanguage } from '../../types';
declare const __propDef: {
    props: {
        id?: string;
        json: JSONValue;
        rootPath?: JSONPath;
        indentation: number | string;
        escapeControlCharacters: boolean;
        escapeUnicodeCharacters: boolean;
        parser: JSONParser;
        parseMemoizeOne: JSONParser['parse'];
        validationParser: JSONParser;
        pathParser: JSONPathParser;
        queryLanguages: QueryLanguage[];
        queryLanguageId: string;
        onChangeQueryLanguage: OnChangeQueryLanguage;
        onRenderValue: OnRenderValue;
        onClassName: OnClassName;
        onTransform: OnPatch;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TransformModalProps = typeof __propDef.props;
export type TransformModalEvents = typeof __propDef.events;
export type TransformModalSlots = typeof __propDef.slots;
export default class TransformModal extends SvelteComponentTyped<TransformModalProps, TransformModalEvents, TransformModalSlots> {
}
export {};
