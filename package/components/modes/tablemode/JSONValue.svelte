<svelte:options immutable={true} />

<script>import { isEditingSelection, isValueSelection } from '../../../logic/selection';
import { createNestedValueOperations } from '../../../logic/operations';
export let path;
export let value;
export let context;
export let enforceString;
export let selection;
export let searchResultItems;
function handlePatch(operations, afterPatch) {
    // When having flattened table columns, it is possible that we edit a nested value of which
    // the parent object is not existing. Therefore, we call replaceNestedValue to create
    // the parent object(s) first.
    return context.onPatch(createNestedValueOperations(operations, context.getJson()), afterPatch);
}
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
    onPatch: handlePatch,
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
