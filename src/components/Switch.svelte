<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  export let visible = false
  export let size = 'small'
  let state = false
  function handleSwitch() {
    dispatch('change', !visible)
    state = true
    setTimeout(() => {
      state = false
    }, 500)
  }
</script>

<button
  class="my-switch {visible ? 'my-switch-checked' : ''} {size}"
  on:click={handleSwitch}
>
  {#if state}
    <div
      class="ant-click-animating-node"
      style="--color: {visible ? '#1890ff' : '#00000040'}"
    />
  {/if}
</button>

<style lang="less">
  @keyframes waveEffect {
    to {
      box-shadow: 0 0 #1890ff;
      box-shadow: 0 0 0 6px var(--color);
    }
  }
  @keyframes fadeEffect {
    to {
      opacity: 0;
    }
  }
  .ant-click-animating-node {
    position: absolute;
    inset: 0;
    display: block;
    border-radius: inherit;
    box-shadow: 0 0 #1890ff;
    box-shadow: 0 0 0 0 var(--color);
    opacity: 0.2;
    animation: fadeEffect 2s cubic-bezier(0.08, 0.82, 0.17, 1),
      waveEffect 0.4s cubic-bezier(0.08, 0.82, 0.17, 1);
    animation-fill-mode: forwards;
    content: '';
    pointer-events: none;
  }
  .my-switch {
    position: relative;
    background-color: #00000040;
    border: 1px solid transparent;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.36s;
  }
  .my-switch:after {
    box-shadow: 0 2px 4px #00230b33;
    position: absolute;
    top: 1px;
    left: 1px;
    background-color: #fff;
    border-radius: 18px;
    cursor: pointer;
    transition: all 0.36s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    content: ' ';
  }
  .my-switch-checked {
    background-color: #1890ff;
  }
  .my-switch-checked:after {
    left: 100%;
    margin-left: -1px;
    transform: translate(-100%);
  }
  .default {
    width: 44px;
    height: 22px;
  }
  .default:after {
    width: 18px;
    height: 18px;
  }
  .small {
    width: 28px;
    height: 16px;
  }
  .small:after {
    width: 12px;
    height: 12px;
  }
</style>
