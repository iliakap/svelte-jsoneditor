<script>import { isJSONArray } from 'immutable-json-patch';
import { truncate } from '../../../../utils/stringUtils.js';
import { MAX_INLINE_OBJECT_CHARS } from '../../../../constants.js';
export let path;
export let value;
export let parser;
export let isSelected;
export let onEdit;
$: count = isJSONArray(value) ? value.length : Object.keys(value).length;
$: description = (isJSONArray(value) ? 'item' : 'prop') + (count === 1 ? '' : 's');
</script>

<button
  type="button"
  class="jse-inline-value"
  class:jse-selected={isSelected}
  on:dblclick={() => onEdit(path)}
>
  {truncate(parser.stringify(value), MAX_INLINE_OBJECT_CHARS)}
</button>

<style src="./InlineValue.scss">.jse-inline-value {
  font-family: var(--jse-font-family-mono);
  font-size: var(--jse-font-size-mono);
  line-height: var(--jse-line-height);
  border: none;
  padding: 0 calc(0.5 * var(--jse-padding));
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.jse-inline-value:hover {
  background: var(--jse-hover-background-color);
}
.jse-inline-value.jse-selected {
  background: var(--jse-selection-background-color);
}</style>
