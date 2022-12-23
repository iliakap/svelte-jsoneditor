import { SvelteComponentTyped } from "svelte";
import type { ValidationError } from '../../../types';
declare const __propDef: {
    props: {
        validationError: ValidationError;
        onExpand: (event: Event) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ValidationErrorIconProps = typeof __propDef.props;
export type ValidationErrorIconEvents = typeof __propDef.events;
export type ValidationErrorIconSlots = typeof __propDef.slots;
export default class ValidationErrorIcon extends SvelteComponentTyped<ValidationErrorIconProps, ValidationErrorIconEvents, ValidationErrorIconSlots> {
}
export {};
