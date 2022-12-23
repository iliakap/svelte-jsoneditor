import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        readOnly?: boolean;
        onFormat: any;
        onCompact: any;
        onSort: any;
        onTransform: any;
        onToggleSearch: any;
        onUndo: any;
        onRedo: any;
        canUndo: any;
        canRedo: any;
        canFormat: any;
        canCompact: any;
        canSort: any;
        canTransform: any;
        onRenderMenu?: (...args: any[]) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TextMenuProps = typeof __propDef.props;
export type TextMenuEvents = typeof __propDef.events;
export type TextMenuSlots = typeof __propDef.slots;
export default class TextMenu extends SvelteComponentTyped<TextMenuProps, TextMenuEvents, TextMenuSlots> {
}
export {};
