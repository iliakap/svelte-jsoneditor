import { SvelteComponentTyped } from "svelte";
import type { OnRenderMenu } from '../../../../types';
import type { JSONValue } from 'immutable-json-patch';
import type { HistoryState } from '../../../../logic/history';
declare const __propDef: {
    props: {
        json: JSONValue | undefined;
        readOnly: boolean;
        historyState: HistoryState;
        onSort: () => void;
        onTransform: () => void;
        onContextMenu: () => void;
        onUndo: () => void;
        onRedo: () => void;
        onRenderMenu: OnRenderMenu;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TableMenuProps = typeof __propDef.props;
export type TableMenuEvents = typeof __propDef.events;
export type TableMenuSlots = typeof __propDef.slots;
export default class TableMenu extends SvelteComponentTyped<TableMenuProps, TableMenuEvents, TableMenuSlots> {
}
export {};
