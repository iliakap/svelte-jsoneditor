<script>import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Icon from 'svelte-awesome';
import { getContext } from 'svelte';
import { tooltip } from '../../controls/tooltip/tooltip';
const absolutePopupContext = getContext('absolute-popup');
export let validationError;
export let onExpand;
$: text = validationError.isChildError ? 'Contains invalid data' : validationError.message;
</script>

<button
  type="button"
  class="jse-validation-error"
  on:click={onExpand}
  use:tooltip={{ text, ...absolutePopupContext }}
>
  <Icon data={faExclamationTriangle} />
</button>

<style src="./ValidationErrorIcon.scss">button.jse-validation-error {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  padding: 5px;
  margin: 0;
  padding: 0;
  margin: 0;
  vertical-align: top;
  display: inline-flex;
  color: var(--jse-warning-color);
}</style>
