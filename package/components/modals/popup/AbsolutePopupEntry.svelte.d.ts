import { SvelteComponentTyped } from "svelte";
import type { PopupEntry } from '../../../types';
declare const __propDef: {
    props: {
        popup: PopupEntry;
        closeAbsolutePopup: (popupId: number) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type AbsolutePopupEntryProps = typeof __propDef.props;
export type AbsolutePopupEntryEvents = typeof __propDef.events;
export type AbsolutePopupEntrySlots = typeof __propDef.slots;
export default class AbsolutePopupEntry extends SvelteComponentTyped<AbsolutePopupEntryProps, AbsolutePopupEntryEvents, AbsolutePopupEntrySlots> {
}
export {};
