import { SvelteComponentTyped } from "svelte";
import type { MenuButton } from '../../types';
declare const __propDef: {
    props: {
        items?: MenuButton[];
        title?: string | undefined;
        width?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        defaultItem: {};
    };
};
export type DropdownButtonProps = typeof __propDef.props;
export type DropdownButtonEvents = typeof __propDef.events;
export type DropdownButtonSlots = typeof __propDef.slots;
export default class DropdownButton extends SvelteComponentTyped<DropdownButtonProps, DropdownButtonEvents, DropdownButtonSlots> {
}
export {};
