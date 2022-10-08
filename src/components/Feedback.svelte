<script>
  import Model from './Model.svelte'
  import Textarea from './Textarea.svelte'
  import message from '../utils/message.js'
  import { ajaxPost, parseTime } from '../utils/index'
  let modelShow = false
  let listValue = '建议'
  let text = ''
  let confirmLoading = false

  function selectValue() {
    if (listValue == '添加网站') {
      text = '/*加到那个模块，比如模块：教程*/\n模块：\n网站链接：'
    } else {
      text = ''
    }
  }
  function handleOK() {
    if (!text.trim()) {
      message.warning('请输入建议')
      return
    }
    confirmLoading = true
    ajaxPost(
      'https://39734fbc-b241-4d89-ad87-0befd655e266.bspapp.com/setFeedbackInfo',
      { type: listValue, desc: text, create_time: parseTime(+new Date()) }
    ).then(res => {
      if (res?.success == false) {
        message.warning('接口超时，请重试')
        confirmLoading = false
        return
      }
      confirmLoading = false
      modelShow = false
      text = ''
      message.success('反馈成功，预计24小时后会处理')
    })
  }
</script>

<div
  class="feedback b--r m-b-20"
  on:click={() => {
    modelShow = true
  }}
>
  <img
    src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-39734fbc-b241-4d89-ad87-0befd655e266/2a66e021-0a42-4b30-82ff-4394644605cd.png"
    alt=""
  />
</div>
<Model
  title="反馈"
  visible={modelShow}
  {confirmLoading}
  on:ok={handleOK}
  on:cancel={e => {
    modelShow = e.detail
  }}
>
  <div slot="body">
    <div class="modal-type">
      <span>类型：</span>
      <select bind:value={listValue} on:change={selectValue}>
        <option value="建议">建议</option>
        <option value="添加网站">添加网站</option>
      </select>
    </div>
    <div class="modal-text">
      <span>描述：</span>
      <Textarea
        {text}
        placeholder="请输入你要反馈的内容"
        on:change={e => {
          text = e.detail
        }}
      />
    </div>
  </div>
</Model>

<style lang="less">
  select {
    outline: none;
    width: 163px;
    height: 32px;
    border: 1px solid rgba(60, 60, 60, 0.29);
    border-radius: 4px;
    padding: 0.2em 0.6em;
    background: transparent;
    line-height: inherit;
    color: inherit;
  }
  .feedback {
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
  }
  .modal-text,
  .modal-type {
    margin-top: 15px;
    display: flex;
    span {
      line-height: 32px;
      width: 55px;
      flex-shrink: 0;
    }
  }
</style>
