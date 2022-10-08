<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  export let title = '标题栏'
  export let list = []
  export let loading = false
  import shuaxin from '../assets/image/shuaxin.png'
  function fn() {
    if (!loading) {
      dispatch('loading', '')
    }
  }
</script>

<div class="hot-list b--r bc-white p-10 m-b-20">
  <div class="f-s-15">
    {title} <img src={shuaxin} title="刷新" class="img {loading? 'hot-loading' : ''}" alt="" on:click={fn}>
  </div>
  {#each list as { url, text, hotNum }, i}
    <div class="list-item">
      <span class="rl-item-index">{i + 1}</span>
      <a
        href={url}
        title={text}
        class="text-overflow rl-item-text"
        target="_blank"
        rel="noopener noreferrer">{text}</a
      >
      <span class="rl-item-num" style="display: {hotNum ? 'block' : 'none'};"
        >{hotNum}</span
      >
    </div>
  {/each}
</div>

<style lang="less">
  .img {
    display: block;
    width: 16px;
    height: 16px;
  }
  .hot-loading {
    transform-origin: center center;
    animation: animal 1s infinite linear;
  }

  @-webkit-keyframes animal {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .f-s-15 {
    display: flex;
    justify-content: space-between;
  }
  .list-item {
    display: flex;
  }
  .rl-item-index {
    display: inline-block;
    width: 22px;
  }
  .list-item:nth-child(2) {
    .rl-item-index {
      color: #fe2d46;
    }
    a::after {
      content: '热';
      display: inline-block;
      padding: 0 2px;
      background-color: #f60;
      height: 16px;
      color: #fff;
      line-height: 16px;
      font-size: 12px;
      border-radius: 4px;
    }
  }
  .list-item:nth-child(3) {
    .rl-item-index {
      color: #f60;
    }
    a::after {
      content: '热';
      display: inline-block;
      padding: 0 2px;
      background-color: #f60;
      height: 16px;
      color: #fff;
      line-height: 16px;
      font-size: 12px;
      border-radius: 4px;
    }
  }
  .list-item:nth-child(4) {
    .rl-item-index {
      color: #faa90e;
    }
    a::after {
      content: '热';
      display: inline-block;
      padding: 0 2px;
      background-color: #f60;
      height: 16px;
      color: #fff;
      line-height: 16px;
      font-size: 12px;
      border-radius: 4px;
    }
  }
  .hot-list a {
    color: #2440b3 !important;
  }
  .rl-item-text {
    width: 77%;
  }
  .rl-item-num {
    color: #9195a3;
    flex-shrink: 0;
    font-size: 15px;
    text-align: right;
    width: 55px;
  }
</style>
