import { SvelteComponentTyped } from "svelte";
import type { JSONPath } from 'immutable-json-patch';
import type { OnPatch } from '../../../types';
declare const __propDef: {
    props: {
        path: JSONPath;
        value: string;
        readOnly: boolean;
        onPatch: OnPatch;
        focus: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ColorPickerProps = typeof __propDef.props;
export type ColorPickerEvents = typeof __propDef.events;
export type ColorPickerSlots = typeof __propDef.slots;
export default class ColorPicker extends SvelteComponentTyped<ColorPickerProps, ColorPickerEvents, ColorPickerSlots> {
}
export {};
