import { SvelteComponentTyped } from "svelte";
import type { JSONEditorContext, JSONSelection, SearchResultItem } from '../../../types';
import type { JSONValue, JSONPath } from 'immutable-json-patch';
declare const __propDef: {
    props: {
        path: JSONPath;
        value: JSONValue;
        context: JSONEditorContext;
        enforceString: boolean;
        selection: JSONSelection | undefined;
        searchResultItems: SearchResultItem[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type JsonValueProps = typeof __propDef.props;
export type JsonValueEvents = typeof __propDef.events;
export type JsonValueSlots = typeof __propDef.slots;
export default class JsonValue extends SvelteComponentTyped<JsonValueProps, JsonValueEvents, JsonValueSlots> {
}
export {};
