<svelte:options immutable={true} />

<script>import { isEditingSelection, isValueSelection } from '../../../logic/selection';
export let path;
export let value;
export let context;
export let enforceString;
export let selection;
export let searchResultItems;
$: isEditing = !context.readOnly && isValueSelection(selection) && isEditingSelection(selection);
$: renderers = context.onRenderValue({
    path,
    value,
    readOnly: context.readOnly,
    enforceString,
    isEditing,
    parser: context.parser,
    normalization: context.normalization,
    selection,
    searchResultItems,
    onPatch: context.onPatch,
    onPasteJson: context.onPasteJson,
    onSelect: context.onSelect,
    onFind: context.onFind,
    findNextInside: context.findNextInside,
    focus: context.focus
});
</script>

{#each renderers as renderer}
  <svelte:component this={renderer.component} {...renderer.props} />
{/each}
