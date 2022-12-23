import { SvelteComponentTyped } from "svelte";
import type { JSONValue } from 'immutable-json-patch';
import type { DocumentState, JSONParser } from '../../../../types';
declare const __propDef: {
    props: {
        json: JSONValue;
        documentState: DocumentState;
        parser: JSONParser;
        showTip: any;
        onCloseContextMenu: any;
        onEditValue: any;
        onToggleEnforceString: any;
        onCut: any;
        onCopy: any;
        onPaste: any;
        onRemove: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TableContextMenuProps = typeof __propDef.props;
export type TableContextMenuEvents = typeof __propDef.events;
export type TableContextMenuSlots = typeof __propDef.slots;
export default class TableContextMenu extends SvelteComponentTyped<TableContextMenuProps, TableContextMenuEvents, TableContextMenuSlots> {
}
export {};
