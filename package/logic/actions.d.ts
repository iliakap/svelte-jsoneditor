import type { AfterPatchCallback, DocumentState, InsertType, JSONParser, OnChange, OnChangeText, OnPatch, OnSelect } from '../types';
import type { JSONValue } from 'lossless-json';
export interface OnCutAction {
    json: JSONValue | undefined;
    documentState: DocumentState;
    indentation: string | number | undefined;
    readOnly: boolean;
    parser: JSONParser;
    onPatch: OnPatch;
}
export declare function onCut({ json, documentState, indentation, readOnly, parser, onPatch }: OnCutAction): Promise<void>;
export interface OnCopyAction {
    json: JSONValue | undefined;
    documentState: DocumentState;
    indentation: string | number | undefined;
    parser: JSONParser;
}
export declare function onCopy({ json, documentState, indentation, parser }: OnCopyAction): Promise<void>;
interface OnPasteAction {
    clipboardText: string;
    json: JSONValue | undefined;
    documentState: DocumentState;
    readOnly: boolean;
    parser: JSONParser;
    onPatch: OnPatch;
    onChangeText: OnChangeText;
    openRepairModal: (clipboardText: string, RepairModalCallback: any) => void;
}
export declare function onPaste({ clipboardText, json, documentState, readOnly, parser, onPatch, onChangeText, openRepairModal }: OnPasteAction): void;
export interface OnRemoveAction {
    json: JSONValue | undefined;
    text: string | undefined;
    documentState: DocumentState;
    keepSelection: boolean;
    readOnly: boolean;
    onChange: OnChange;
    onPatch: OnPatch;
}
export declare function onRemove({ json, text, documentState, keepSelection, readOnly, onChange, onPatch }: OnRemoveAction): void;
export interface OnInsert {
    insertType: InsertType;
    selectInside: boolean;
    refJsonEditor: HTMLElement;
    json: JSONValue | undefined;
    documentState: DocumentState;
    readOnly: boolean;
    parser: JSONParser;
    onPatch: OnPatch;
    onReplaceJson: (updatedJson: JSONValue, afterPatch: AfterPatchCallback) => void;
}
export declare function onInsert({ insertType, selectInside, refJsonEditor, json, documentState, readOnly, parser, onPatch, onReplaceJson }: OnInsert): void;
export interface OnInsertCharacter {
    char: string;
    selectInside: boolean;
    refJsonEditor: HTMLElement;
    json: JSONValue;
    documentState: DocumentState;
    readOnly: boolean;
    parser: JSONParser;
    onPatch: OnPatch;
    onReplaceJson: (updatedJson: JSONValue, afterPatch: AfterPatchCallback) => void;
    onSelect: OnSelect;
}
export declare function onInsertCharacter({ char, selectInside, refJsonEditor, json, documentState, readOnly, parser, onPatch, onReplaceJson, onSelect }: OnInsertCharacter): Promise<void>;
export {};
