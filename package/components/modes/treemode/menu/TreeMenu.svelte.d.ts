import { SvelteComponentTyped } from "svelte";
import type { JSONSelection, OnRenderMenu } from '../../../../types';
import type { JSONValue } from 'immutable-json-patch';
import type { HistoryState } from '../../../../logic/history';
declare const __propDef: {
    props: {
        json: JSONValue;
        selection: JSONSelection | undefined;
        readOnly: boolean;
        showSearch?: boolean;
        historyState: HistoryState;
        onExpandAll: () => void;
        onCollapseAll: () => void;
        onUndo: () => void;
        onRedo: () => void;
        onSort: () => void;
        onTransform: () => void;
        onContextMenu: () => void;
        onCopy: () => void;
        onRenderMenu: OnRenderMenu;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TreeMenuProps = typeof __propDef.props;
export type TreeMenuEvents = typeof __propDef.events;
export type TreeMenuSlots = typeof __propDef.slots;
export default class TreeMenu extends SvelteComponentTyped<TreeMenuProps, TreeMenuEvents, TreeMenuSlots> {
}
export {};
