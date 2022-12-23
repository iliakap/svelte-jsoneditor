import type { Section } from './types';
export declare const SCROLL_DURATION = 300;
export declare const DEBOUNCE_DELAY = 300;
export declare const TEXT_MODE_ONCHANGE_DELAY = 300;
export declare const SEARCH_UPDATE_THROTTLE = 300;
export declare const AUTO_SCROLL_INTERVAL = 50;
export declare const AUTO_SCROLL_SPEED_SLOW = 200;
export declare const AUTO_SCROLL_SPEED_NORMAL = 400;
export declare const AUTO_SCROLL_SPEED_FAST = 1200;
export declare const MAX_SEARCH_RESULTS = 1000;
export declare const ARRAY_SECTION_SIZE = 100;
export declare const MAX_VALIDATION_ERRORS = 100;
export declare const MAX_CHARACTERS_TEXT_PREVIEW = 20000;
export declare const MAX_INLINE_OBJECT_CHARS = 50;
export declare const MAX_HEADER_NAME_CHARACTERS = 50;
export declare const DEFAULT_VISIBLE_SECTIONS: Section[];
export declare const MAX_VALIDATABLE_SIZE: number;
export declare const MAX_AUTO_REPAIRABLE_SIZE: number;
export declare const MAX_DOCUMENT_SIZE_TEXT_MODE: number;
export declare const MAX_DOCUMENT_SIZE_EXPAND_ALL: number;
export declare const SIMPLE_MODAL_OPTIONS: {
    closeButton: boolean;
    classBg: string;
    classWindow: string;
    classWindowWrap: string;
    classContent: string;
};
export declare const SORT_MODAL_OPTIONS: {
    classWindow: string;
    closeButton: boolean;
    classBg: string;
    classWindowWrap: string;
    classContent: string;
};
export declare const TRANSFORM_MODAL_OPTIONS: {
    classWindow: string;
    closeButton: boolean;
    classBg: string;
    classWindowWrap: string;
    classContent: string;
};
export declare const JSONEDITOR_MODAL_OPTIONS: {
    classWindow: string;
    closeButton: boolean;
    classBg: string;
    classWindowWrap: string;
    classContent: string;
};
export declare const INSERT_EXPLANATION: string;
export declare const CONTEXT_MENU_EXPLANATION: string;
export declare const HOVER_INSERT_INSIDE = "hover-insert-inside";
export declare const HOVER_INSERT_AFTER = "hover-insert-after";
export declare const HOVER_COLLECTION = "hover-collection";
export declare const JSON_STATUS_VALID = "valid";
export declare const JSON_STATUS_REPAIRABLE = "repairable";
export declare const JSON_STATUS_INVALID = "invalid";
export declare const CONTEXT_MENU_HEIGHT: number;
export declare const CONTEXT_MENU_WIDTH = 260;
export declare const UPDATE_SELECTION: {
    NO: string;
    SELF: string;
    NEXT_INSIDE: string;
};
export declare const SORT_DIRECTION_NAMES: {
    asc: string;
    desc: string;
};
