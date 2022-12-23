import { SvelteComponentTyped } from "svelte";
import type { JSONArray, JSONObject } from 'lossless-json';
import type { JSONPath } from 'immutable-json-patch';
import type { JSONParser } from '../../../../types';
declare const __propDef: {
    props: {
        path: JSONPath;
        value: JSONArray | JSONObject;
        parser: JSONParser;
        isSelected: boolean;
        onEdit: (path: JSONPath) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type InlineValueProps = typeof __propDef.props;
export type InlineValueEvents = typeof __propDef.events;
export type InlineValueSlots = typeof __propDef.slots;
export default class InlineValue extends SvelteComponentTyped<InlineValueProps, InlineValueEvents, InlineValueSlots> {
}
export {};
