<script>import { truncate } from '../../utils/stringUtils.js';
import { getText } from '../../utils/jsonUtils.js';
import { MAX_CHARACTERS_TEXT_PREVIEW } from '../../constants.js';
export let text;
export let json;
export let indentation;
export let parser;
</script>

<div class="jse-json-preview">
  {truncate(getText({ text, json }, indentation, parser), MAX_CHARACTERS_TEXT_PREVIEW)}
</div>

<style src="./JSONPreview.scss">.jse-json-preview {
  flex: 1;
  color: var(--jse-panel-color-readonly);
  overflow: auto;
  white-space: pre-wrap;
  padding: 2px;
  border-left: var(--jse-main-border);
  border-right: var(--jse-main-border);
  border-bottom: var(--jse-main-border);
}</style>
