import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        open?: any;
        close?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ModalRefProps = typeof __propDef.props;
export type ModalRefEvents = typeof __propDef.events;
export type ModalRefSlots = typeof __propDef.slots;
export default class ModalRef extends SvelteComponentTyped<ModalRefProps, ModalRefEvents, ModalRefSlots> {
    get open(): any;
    get close(): any;
}
export {};
