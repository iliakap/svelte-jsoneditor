<svelte:options immutable={true} />

<script lang="ts">
  import Icon from 'svelte-awesome'
  import type { MenuItem } from '$lib/types'
  import { isMenuSeparator, isMenuSpace } from '$lib/typeguards'
  import { isMenuButton } from '$lib/typeguards.js'

  export let items: MenuItem[] = []

  function unknownMenuItem(item: MenuItem): string {
    console.error('Unknown type of menu item', item)
    return '???'
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

<style src="./Menu.scss"></style>
