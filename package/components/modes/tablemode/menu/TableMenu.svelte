<svelte:options immutable={true} />

<script>import Menu from '../../../controls/Menu.svelte';
import { faEllipsisV, faFilter, faRedo, faSortAmountDownAlt, faUndo } from '@fortawesome/free-solid-svg-icons';
import { CONTEXT_MENU_EXPLANATION } from '../../../../constants';
export let json;
export let readOnly;
export let historyState;
export let onSort;
export let onTransform;
export let onContextMenu;
export let onUndo;
export let onRedo;
export let onRenderMenu;
let defaultItems;
$: defaultItems = !readOnly
    ? [
        {
            type: 'button',
            icon: faSortAmountDownAlt,
            title: 'Sort',
            className: 'jse-sort',
            onClick: onSort,
            disabled: readOnly || json === undefined
        },
        {
            type: 'button',
            icon: faFilter,
            title: 'Transform contents (filter, sort, project)',
            className: 'jse-transform',
            onClick: onTransform,
            disabled: readOnly || json === undefined
        },
        {
            type: 'button',
            icon: faEllipsisV,
            title: CONTEXT_MENU_EXPLANATION,
            className: 'jse-contextmenu',
            onClick: onContextMenu
        },
        {
            type: 'separator'
        },
        {
            type: 'button',
            icon: faUndo,
            title: 'Undo (Ctrl+Z)',
            className: 'jse-undo',
            onClick: onUndo,
            disabled: !historyState.canUndo
        },
        {
            type: 'button',
            icon: faRedo,
            title: 'Redo (Ctrl+Shift+Z)',
            className: 'jse-redo',
            onClick: onRedo,
            disabled: !historyState.canRedo
        },
        {
            type: 'space'
        }
    ]
    : [
        {
            type: 'space'
        }
    ];
let items;
$: items = onRenderMenu('table', defaultItems) || defaultItems;
</script>

<Menu {items} />
