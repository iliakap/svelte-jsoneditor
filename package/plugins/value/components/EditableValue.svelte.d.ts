import { SvelteComponentTyped } from "svelte";
import type { JSONPath, JSONValue } from 'immutable-json-patch';
import type { FindNextInside, JSONParser, OnFind, OnPasteJson, OnPatch, OnSelect, ValueNormalization } from '../../../types';
declare const __propDef: {
    props: {
        path: JSONPath;
        value: JSONValue;
        parser: JSONParser;
        normalization: ValueNormalization;
        enforceString: boolean;
        onPatch: OnPatch;
        onPasteJson: OnPasteJson;
        onSelect: OnSelect;
        onFind: OnFind;
        focus: () => void;
        findNextInside: FindNextInside;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type EditableValueProps = typeof __propDef.props;
export type EditableValueEvents = typeof __propDef.events;
export type EditableValueSlots = typeof __propDef.slots;
export default class EditableValue extends SvelteComponentTyped<EditableValueProps, EditableValueEvents, EditableValueSlots> {
}
export {};
