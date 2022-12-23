<svelte:options immutable={true} />

<script>import { onMount } from 'svelte';
import Icon from 'svelte-awesome';
import { keyComboFromEvent } from '../../../utils/keyBindings';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { findNearestElement } from '../../../utils/domUtils';
import { isContextMenuColumn, isContextMenuRow, isMenuButton, isMenuDropDownButton, isMenuLabel, isMenuSeparator } from '../../../typeguards.js';
import ContextMenuButton from './ContextMenuButton.svelte';
import ContextMenuDropDownButton from './ContextMenuDropDownButton.svelte';
export let items;
export let tip;
let refContextMenu;
onMount(() => {
    setTimeout(() => {
        const firstEnabledButton = [...refContextMenu.querySelectorAll('button')].find((button) => !button.disabled);
        if (firstEnabledButton) {
            firstEnabledButton.focus();
        }
    });
});
function handleKeyDown(event) {
    const combo = keyComboFromEvent(event).replace(/^Command\+/, 'Ctrl+');
    if (combo === 'Up' || combo === 'Down' || combo === 'Left' || combo === 'Right') {
        event.preventDefault();
        const buttons = Array.from(refContextMenu.querySelectorAll('button:not([disabled])'));
        const nearest = findNearestElement({
            allElements: buttons,
            currentElement: event.target,
            direction: combo,
            hasPrio: (element) => {
                return element.getAttribute('data-type') !== 'jse-open-dropdown';
            }
        });
        if (nearest) {
            nearest.focus();
        }
    }
}
function unknownMenuItem(item) {
    console.error('Unknown type of context menu item', item);
    return '???';
}
</script>

<div class="jse-contextmenu" bind:this={refContextMenu} on:keydown={handleKeyDown}>
  {#each items as item}
    {#if isMenuButton(item)}
      <ContextMenuButton {item} />
    {:else if isMenuDropDownButton(item)}
      <ContextMenuDropDownButton {item} />
    {:else if isContextMenuRow(item)}
      <div class="jse-row">
        {#each item.items as rowItem}
          {#if isMenuButton(rowItem)}
            <ContextMenuButton item={rowItem} />
          {:else if isMenuDropDownButton(rowItem)}
            <ContextMenuDropDownButton item={rowItem} />
          {:else if isContextMenuColumn(rowItem)}
            <div class="jse-column">
              {#each rowItem.items as columnItem}
                {#if isMenuButton(columnItem)}
                  <ContextMenuButton className="left" item={columnItem} />
                {:else if isMenuDropDownButton(columnItem)}
                  <ContextMenuDropDownButton className="left" item={columnItem} />
                {:else if isMenuSeparator(columnItem)}
                  <div class="jse-separator" />
                {:else if isMenuLabel(columnItem)}
                  <div class="jse-label">
                    {columnItem.text}
                  </div>
                {:else}
                  {unknownMenuItem(columnItem)}
                {/if}
              {/each}
            </div>
          {:else if isMenuSeparator(rowItem)}
            <div class="jse-separator" />
          {:else}
            {unknownMenuItem(rowItem)}
          {/if}
        {/each}
      </div>
    {:else if isMenuSeparator(item)}
      <div class="jse-separator" />
    {:else}
      {unknownMenuItem(item)}
    {/if}
  {/each}

  {#if tip}
    <div class="jse-row">
      <div class="jse-tip">
        <div class="jse-tip-icon">
          <Icon data={faLightbulb} />
        </div>
        <div class="jse-tip-text">{tip}</div>
      </div>
    </div>
  {/if}
</div>

<style src="./ContextMenu.scss">.jse-contextmenu {
  box-shadow: var(--jse-controls-box-shadow);
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  background: var(--jse-context-menu-background);
  color: var(--jse-context-menu-color);
}
.jse-contextmenu .jse-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: stretch;
}
.jse-contextmenu .jse-row div.jse-label {
  flex: 1;
  white-space: nowrap;
  padding: var(--jse-padding);
  color: var(--jse-context-menu-color-disabled);
  line-height: normal;
}
.jse-contextmenu .jse-row div.jse-tip {
  flex: 1;
  background: var(--jse-context-menu-tip-background);
  color: var(--jse-context-menu-tip-color);
  margin: calc(0.5 * var(--jse-padding));
  padding: calc(0.5 * var(--jse-padding)) var(--jse-padding);
  font-size: 80%;
  line-height: 1.3em;
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: var(--jse-padding);
  border-radius: 3px;
}
.jse-contextmenu .jse-row div.jse-tip div.jse-tip-icon {
  padding-top: calc(0.5 * var(--jse-padding));
}
.jse-contextmenu .jse-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.jse-contextmenu .jse-column:not(:last-child) {
  border-right: 1px solid var(--jse-context-menu-separator-color);
}
.jse-contextmenu .jse-separator {
  width: 100%;
  height: 1px;
  background: var(--jse-context-menu-separator-color);
}</style>
