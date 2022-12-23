import { SvelteComponentTyped } from "svelte";
import type { MessageAction } from '../../types';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
declare const __propDef: {
    props: {
        type?: 'success' | 'error';
        icon?: IconDefinition;
        message?: string | undefined;
        actions?: MessageAction[];
        onClick?: () => void | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type MessageProps = typeof __propDef.props;
export type MessageEvents = typeof __propDef.events;
export type MessageSlots = typeof __propDef.slots;
export default class Message extends SvelteComponentTyped<MessageProps, MessageEvents, MessageSlots> {
}
export {};
