<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  export let width = 520
  export let title = '标题'
  export let okText = '确定'
  export let cancelText = '取消'
  export let confirmLoading = false
  export let visible = false
  function handleOK() {
    if (!confirmLoading) {
      dispatch('ok', '')
    }
  }
  function handleCancel() {
    dispatch('cancel', false)
  }
  function get() {
    if (visible) {
      document.body.style.paddingRight = '5px'
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.paddingRight = ''
      document.body.style.overflowY = 'auto'
    }
    return true
  }
</script>

{#if get() && visible}
  <div class="my-model">
    <div class="mask">
      <div class="my-model-mian" style="width: {width}px;">
        <div class="model-header">
          <span>{title}</span>
          <svg
            on:click={handleCancel}
            viewBox="64 64 896 896"
            data-icon="close"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class=""
          >
            <path
              d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
            />
          </svg>
        </div>
        <div class="model-body">
          <slot name="body" />
        </div>
        <div class="model-footer">
          <span class="my-cancel" on:click={handleCancel}>{cancelText}</span>
          <span
            class="my-primary {confirmLoading ? 'disable' : ''}"
            on:click={handleOK}>{okText}</span
          >
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="less">
  .model {
    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      color: rgba(0, 0, 0, 0.65);
      border-bottom: 1px solid #e8e8e8;
      span {
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        font-size: 16px;
      }
      svg {
        cursor: pointer;
      }
    }
    &-body {
      padding: 24px;
      font-size: 14px;
      line-height: 1.5;
    }
    &-footer {
      height: 53px;
      padding: 10px 16px;
      text-align: right;
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid #e8e8e8;
    }
  }
  .mask {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background-color: #00000073;
    width: 100vw;
    height: 100vh;
  }
  .my-model-mian {
    border-radius: 4px;
    background: #fff;
    transition: all 0.05s ease-in;
    position: relative;
    top: 100px;
    margin: 0 auto;
    border: 0;
    box-shadow: 0 4px 12px #00000026;
    pointer-events: auto;
  }

  .disable {
    color: #fff;
    background-color: #40a9ff;
    border-color: #40a9ff;
    cursor: not-allowed;
  }
</style>
