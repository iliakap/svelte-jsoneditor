import { SvelteComponentTyped } from "svelte";
import type { JSONParser } from '../../types';
import type { JSONValue } from 'lossless-json';
declare const __propDef: {
    props: {
        text: string | undefined;
        json: JSONValue | undefined;
        indentation: number | string;
        parser: JSONParser;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type JsonPreviewProps = typeof __propDef.props;
export type JsonPreviewEvents = typeof __propDef.events;
export type JsonPreviewSlots = typeof __propDef.slots;
export default class JsonPreview extends SvelteComponentTyped<JsonPreviewProps, JsonPreviewEvents, JsonPreviewSlots> {
}
export {};
