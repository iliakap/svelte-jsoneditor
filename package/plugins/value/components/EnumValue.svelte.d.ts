import { SvelteComponentTyped } from "svelte";
import type { JSONPath, JSONValue } from 'immutable-json-patch';
import type { JSONParser, JSONSelection, OnPatch } from '../../../types';
declare const __propDef: {
    props: {
        path: JSONPath;
        value: JSONValue;
        parser: JSONParser;
        readOnly: boolean;
        selection: JSONSelection | undefined;
        onPatch: OnPatch;
        options: {
            value: unknown;
            text: string;
        }[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type EnumValueProps = typeof __propDef.props;
export type EnumValueEvents = typeof __propDef.events;
export type EnumValueSlots = typeof __propDef.slots;
export default class EnumValue extends SvelteComponentTyped<EnumValueProps, EnumValueEvents, EnumValueSlots> {
}
export {};
