<script>
  import { onMount } from 'svelte'
  import Header from './components/Header.svelte'
  import Section from './components/Section.svelte'
  import Anchor from './components/Anchor.svelte'
  import Sidebar from './components/Sidebar.svelte'
  import message from './utils/message'
  let visible = localStorage.getItem('foldFlag')
    ? JSON.parse(localStorage.getItem('foldFlag'))
    : false
  let temp = localStorage.getItem('themeFlag')
  if (temp) {
    // @ts-ignore
    temp = JSON.parse(temp) ? false : true
  } else {
    // @ts-ignore
    temp = true
  }
  let themeFlag = temp
  onMount(() => {
    message.init()
  })
  window.addEventListener('setItem', function (e) {
    // @ts-ignore
    if (e.key === 'foldFlag') {
      // @ts-ignore
      visible = JSON.parse(e.value)
    }
  })
  function handleSwitch() {
    // @ts-ignore
    themeFlag = !themeFlag
    localStorage.setItem('themeFlag', JSON.stringify(!themeFlag))
  }
</script>
<Header />
{#if themeFlag}
  <main>
    <Section />
    {#if visible}
      <Sidebar />
    {/if}
  </main>
  <Anchor />
  <footer>
    <div>
      <a
        class="link"
        href="https://github.com/cloudflyme/cv-navigation-nuxt"
        target="_blank"
        rel="noopener noreferrer">源码链接，代码写的不好忽喷</a
      >
    </div>
    <div class="block">Copyright © 2021-2022 5cv.top All Rights Reserved</div>
    <a
      class="block"
      href="https://beian.miit.gov.cn/"
      style="color: #909399;"
      target="_blank">豫ICP备2022003304号-1</a
    >
  </footer>
{/if}

<span
  on:click={handleSwitch}
  class="switch iconfont icon-shuangmoshiqiehuan"
  title="切换主题"
/>

<span
  on:click={() => {
    window.open('https://juejin.cn/post/7067030401444741157')
  }}
  class="help iconfont icon-bangzhu1"
  title="帮助"
/>


<style lang="less">
  .help, .switch {
    position: fixed;
    font-size: 22px;
    right: 50px;
    bottom: 10px;
    cursor: pointer;
    z-index: 100;
    z-index: 100;
  }
  .help {
    right: 50px;
  }
  .switch {
    right: 10px;
  }
  main {
    position: relative;
    margin: 20px 0;
    display: flex;
    justify-content: center;
  }
  footer {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    flex-wrap: wrap;
    color: #909399;
    height: 80px;
    padding: 10px 0;
    background-color: #fff;
    
    .block {
      display: block;
      width: 100%;
    }
  }
</style>
