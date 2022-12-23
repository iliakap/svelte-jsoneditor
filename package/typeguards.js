export function isMenuSpaceItem(item) {
    return isMenuSpace(item);
}
export function isMenuSpace(item) {
    // checking the .space property is for backward compatibility
    return item && (item['type'] === 'space' || item['space'] === true);
}
export function isMenuSeparator(item) {
    // checking the .separator property is for backward compatibility
    return item && (item['type'] === 'separator' || item['separator'] === true);
}
export function isMenuLabel(item) {
    return item && item['type'] === 'label' && typeof item['text'] === 'string';
}
export function isMenuButton(item) {
    // for backward compatibility, we only check .onClick here and not item['type'] === 'button'
    return item && typeof item['onClick'] === 'function';
}
export function isMenuDropDownButton(item) {
    return (item &&
        item['type'] === 'dropdown-button' &&
        isMenuButton(item['main']) &&
        Array.isArray(item['items']));
}
export function isContextMenuRow(item) {
    return item && item['type'] === 'row' && Array.isArray(item['items']);
}
export function isContextMenuColumn(item) {
    return item && item['type'] === 'column' && Array.isArray(item['items']);
}
export function isContentParseError(contentErrors) {
    return typeof contentErrors['parseError'] === 'object' && contentErrors['parseError'] !== null;
}
export function isContentValidationErrors(contentErrors) {
    return Array.isArray(contentErrors['validationErrors']);
}
