import { SvelteComponentTyped } from "svelte";
import type { JSONValue } from 'lossless-json';
import type { JSONParser, OnChangeMode } from '../../../types';
import type { JSONPath } from 'immutable-json-patch';
declare const __propDef: {
    props: {
        text: string | undefined;
        json: JSONValue | undefined;
        readOnly: boolean;
        parser: JSONParser;
        openJSONEditorModal: (path: JSONPath) => void;
        onChangeMode: OnChangeMode;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TableModeWelcomeProps = typeof __propDef.props;
export type TableModeWelcomeEvents = typeof __propDef.events;
export type TableModeWelcomeSlots = typeof __propDef.slots;
export default class TableModeWelcome extends SvelteComponentTyped<TableModeWelcomeProps, TableModeWelcomeEvents, TableModeWelcomeSlots> {
}
export {};
