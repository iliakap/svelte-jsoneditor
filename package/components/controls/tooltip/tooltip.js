import Tooltip from './Tooltip.svelte';
export function tooltip(node, { text, openAbsolutePopup, closeAbsolutePopup }) {
    let popupId;
    function handleMouseEnter() {
        const props = {
            text
        };
        // opening popup will fail if there is already a popup open
        popupId = openAbsolutePopup(Tooltip, props, {
            position: 'top',
            width: 10 * text.length,
            offsetTop: 3,
            anchor: node,
            closeOnOuterClick: true
        });
    }
    function handleMouseLeave() {
        closeAbsolutePopup(popupId);
    }
    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);
    return {
        destroy() {
            node.removeEventListener('mouseenter', handleMouseEnter);
            node.removeEventListener('mouseleave', handleMouseLeave);
        }
    };
}
