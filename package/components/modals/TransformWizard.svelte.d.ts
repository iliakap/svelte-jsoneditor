import { SvelteComponentTyped } from "svelte";
import type { JSONValue } from 'immutable-json-patch';
import type { QueryLanguageOptions } from '../../types';
declare const __propDef: {
    props: {
        json: JSONValue;
        queryOptions?: QueryLanguageOptions;
        onChange: (queryOptions: QueryLanguageOptions) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TransformWizardProps = typeof __propDef.props;
export type TransformWizardEvents = typeof __propDef.events;
export type TransformWizardSlots = typeof __propDef.slots;
export default class TransformWizard extends SvelteComponentTyped<TransformWizardProps, TransformWizardEvents, TransformWizardSlots> {
}
export {};
