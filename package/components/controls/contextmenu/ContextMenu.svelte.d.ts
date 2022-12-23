import { SvelteComponentTyped } from "svelte";
import type { ContextMenuItem } from '../../../types.js';
declare const __propDef: {
    props: {
        items: ContextMenuItem[];
        tip: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ContextMenuProps = typeof __propDef.props;
export type ContextMenuEvents = typeof __propDef.events;
export type ContextMenuSlots = typeof __propDef.slots;
export default class ContextMenu extends SvelteComponentTyped<ContextMenuProps, ContextMenuEvents, ContextMenuSlots> {
}
export {};
