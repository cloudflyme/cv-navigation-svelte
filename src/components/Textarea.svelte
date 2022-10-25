<script>
  import { createEventDispatcher } from 'svelte'
  export let readonly = false;
  export let text;
  export let placeholder = '空空如也'
  const dispatch = createEventDispatcher()
  let clearShow = false
  function setNull() {
    dispatch('change', '')
    clearShow = false
  }
  function handleIpt(e) {
    if (e.target.value) {
      clearShow = true
    } else {
      clearShow = false
    }
  }
  function handleChange(e) {
    dispatch('change', e.target.value.trim())
  }
</script>

<span class="my-textarea">
  <textarea
    rows="3"
    on:input={handleIpt}
    bind:value={text}
    on:change={handleChange}
    placeholder={placeholder}
    {readonly}
  />
  <svg
    on:click={setNull}
    style="display: {clearShow ? 'block' : 'none'};"
    class="remove"
    focusable="false"
    width="12px"
    height="12px"
    fill="var(--color-text)"
    aria-hidden="true"
    viewBox="64 64 896 896"
  >
    <path
      d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
    />
  </svg>
</span>

<style lang="less">
  .my-textarea {
    width: 100%;
    height: auto;
    display: inline-block;
    position: relative;
    textarea {
      outline: none;
      color: var(--color-text);
      background-color: var(--color-box);
      border: 1px solid var(--color-border);
      padding: 4px 11px;
      width: 100%;
      max-width: 100%;
      resize: vertical;
      height: auto;
      min-height: 32px;
      line-height: 1.5715;
      vertical-align: bottom;
      transition: all 0.3s, height 0s;
    }
    textarea::-webkit-input-placeholder {
      color: #bfbfbf;
    }
    textarea:hover {
      border-color: #40a9ff;
    }
    .remove {
      cursor: pointer;
      position: absolute;
      top: 11px;
      right: 6px;
    }
  }
</style>
