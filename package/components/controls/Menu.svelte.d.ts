import { SvelteComponentTyped } from "svelte";
import type { MenuItem } from '../../types';
declare const __propDef: {
    props: {
        items?: MenuItem[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        left: {};
        right: {};
    };
};
export type MenuProps = typeof __propDef.props;
export type MenuEvents = typeof __propDef.events;
export type MenuSlots = typeof __propDef.slots;
export default class Menu extends SvelteComponentTyped<MenuProps, MenuEvents, MenuSlots> {
}
export {};
