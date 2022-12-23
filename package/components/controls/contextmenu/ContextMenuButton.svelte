<script>import Icon from 'svelte-awesome';
import { classnames } from '../../../utils/cssUtils.js';
export let item;
export let className = undefined;
</script>

<button
  type="button"
  class={classnames('jse-context-menu-button', className, item.className)}
  on:click={item.onClick}
  title={item.title}
  disabled={item.disabled || false}
>
  {#if item.icon}
    <Icon data={item.icon} />
  {/if}
  {#if item.text}
    {item.text}
  {/if}
</button>

<style src="./ContextMenuButton.scss">button.jse-context-menu-button {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  padding: 5px;
  margin: 0;
  flex: 1;
  white-space: nowrap;
  padding: var(--jse-padding);
  color: inherit;
}
button.jse-context-menu-button:hover {
  background: var(--jse-context-menu-background-highlight);
}
button.jse-context-menu-button:focus {
  background: var(--jse-context-menu-background-highlight);
  z-index: 1;
}
button.jse-context-menu-button:disabled {
  color: var(--jse-context-menu-color-disabled);
  background: unset;
}
button.jse-context-menu-button.left {
  text-align: left;
}
button.jse-context-menu-button :global(svg) {
  width: 16px;
}</style>
