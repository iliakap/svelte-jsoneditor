import { SvelteComponentTyped } from "svelte";
import type { JSONPath, JSONValue as JSONValueType } from 'immutable-json-patch';
import type { ExtendedSearchResultItem, JSONPointerMap, JSONSelection, NestedValidationError, TreeModeContext, VisibleSection } from '../../../types';
declare const __propDef: {
    props: {
        value: JSONValueType;
        path: JSONPath;
        expandedMap: JSONPointerMap<boolean> | undefined;
        enforceStringMap: JSONPointerMap<boolean> | undefined;
        visibleSectionsMap: JSONPointerMap<VisibleSection[]> | undefined;
        validationErrorsMap: JSONPointerMap<NestedValidationError> | undefined;
        searchResultItemsMap: JSONPointerMap<ExtendedSearchResultItem[]> | undefined;
        selection: JSONSelection | undefined;
        context: TreeModeContext;
        onDragSelectionStart: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        identifier: {};
    };
};
export type JsonNodeProps = typeof __propDef.props;
export type JsonNodeEvents = typeof __propDef.events;
export type JsonNodeSlots = typeof __propDef.slots;
export default class JsonNode extends SvelteComponentTyped<JsonNodeProps, JsonNodeEvents, JsonNodeSlots> {
}
export {};
