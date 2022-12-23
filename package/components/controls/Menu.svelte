<svelte:options immutable={true} />

<script>import Icon from 'svelte-awesome';
import { isMenuSeparator, isMenuSpace } from '../../typeguards';
import { isMenuButton } from '../../typeguards.js';
export let items = [];
function unknownMenuItem(item) {
    console.error('Unknown type of menu item', item);
    return '???';
}
</script>

<div class="jse-menu">
  <slot name="left" />

  {#each items as item}
    {#if isMenuSeparator(item)}
      <div class="jse-separator" />
    {:else if isMenuSpace(item)}
      <div class="jse-space" />
    {:else if isMenuButton(item)}
      <button
        type="button"
        class="jse-button {item.className}"
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
    {:else}
      {unknownMenuItem(item)}
    {/if}
  {/each}

  <slot name="right" />
</div>

<style src="./Menu.scss">.jse-menu {
  background: var(--jse-theme-color);
  border-bottom: 1px solid var(--jse-theme-color);
  color: var(--jse-menu-color);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
}
.jse-menu .jse-button {
  width: var(--jse-menu-button-size);
  height: var(--jse-menu-button-size);
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  padding: calc(0.5 * var(--jse-padding));
  margin: 0;
  border-radius: 0;
}
.jse-menu .jse-button:hover, .jse-menu .jse-button:focus {
  background: var(--jse-theme-color-highlight);
}
.jse-menu .jse-button:disabled {
  color: var(--jse-menu-color);
  opacity: 0.5;
  background: transparent;
}
.jse-menu .jse-button.jse-group-button {
  border: 1px solid var(--jse-menu-color);
  padding: 0 calc(0.5 * var(--jse-padding));
  margin: calc(0.5 * var(--jse-padding)) 0;
  height: calc(var(--jse-menu-button-size) - var(--jse-padding));
  width: auto;
}
.jse-menu .jse-button.jse-group-button:not(.jse-last) {
  border-right: none;
}
.jse-menu .jse-button.jse-group-button.jse-first {
  margin-left: calc(0.5 * var(--jse-padding));
}
.jse-menu .jse-button.jse-group-button.jse-last {
  margin-right: calc(0.5 * var(--jse-padding));
}
.jse-menu .jse-button.jse-group-button:hover, .jse-menu .jse-button.jse-group-button:focus {
  background: var(--jse-theme-color-highlight);
}
.jse-menu .jse-button.jse-group-button.jse-selected {
  background: var(--jse-menu-color);
  color: var(--jse-theme-color);
}
.jse-menu .jse-space {
  flex: 1;
}
.jse-menu .jse-separator {
  background: var(--jse-menu-color);
  opacity: 0.3;
  box-sizing: border-box;
  width: 1px;
  height: calc(var(--jse-menu-button-size) - 6px);
  margin: 3px;
}</style>
