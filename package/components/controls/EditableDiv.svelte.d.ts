import { SvelteComponentTyped } from "svelte";
import type { OnFind, OnPaste } from '../../types';
declare const __propDef: {
    props: {
        value: string;
        shortText?: boolean;
        onChange: (newValue: string, updateSelection: string) => void;
        onCancel: () => void;
        onFind: OnFind;
        onPaste?: OnPaste;
        onValueClass?: (value: string) => string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type EditableDivProps = typeof __propDef.props;
export type EditableDivEvents = typeof __propDef.events;
export type EditableDivSlots = typeof __propDef.slots;
export default class EditableDiv extends SvelteComponentTyped<EditableDivProps, EditableDivEvents, EditableDivSlots> {
}
export {};
