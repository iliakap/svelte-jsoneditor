import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        text: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TooltipProps = typeof __propDef.props;
export type TooltipEvents = typeof __propDef.events;
export type TooltipSlots = typeof __propDef.slots;
export default class Tooltip extends SvelteComponentTyped<TooltipProps, TooltipEvents, TooltipSlots> {
}
export {};
