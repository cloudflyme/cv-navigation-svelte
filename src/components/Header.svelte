<script>
  import { onMount } from 'svelte'
  import webSearchUrl from '../vendor/webSearchUrl.js'
  import { jsonp } from '../utils/index'
  import { ajaxGet } from '../utils/index'
  import { getLocal, setLocal } from '../utils/local'
  let imgSrc = 'https://www.baidu.com/favicon.ico'
  let searchText = ''
  let searchUrl = 'https://www.baidu.com/s?ie=utf-8&wd='

  let clearShow = false
  let scaleShow = false
  let searchIndex = -1
  let inputDom = {}
  let inputZh = false
  let bcImgSrc = ''
  let visible = localStorage.getItem('themeFlag')
    ? JSON.parse(localStorage.getItem('themeFlag'))
    : false
  function selectLogo(e) {
    if (Array.from(e.target.classList).indexOf('logo') > -1) {
      const findata = webSearchUrl.find(i => i.name === e.target.alt)
      localStorage.setItem('searchType', JSON.stringify(findata))
      searchUrl = findata.url
      imgSrc = findata.src
    }
  }

  function handleKeyup(e) {
    switch (e.keyCode) {
      case 13:
        const value = searchText.trim()
        value && window.open(searchUrl + value)
        break
      case 38:
        if (inputZh || searchList.length == 0) return
        if (searchIndex <= 0) {
          searchIndex = searchList.length - 1
        } else {
          searchIndex--
        }
        searchText = searchList[searchIndex].q
        break
      case 40:
        if (inputZh || searchList.length == 0) return
        if (searchIndex >= searchList.length - 1) {
          searchIndex = 0
        } else {
          searchIndex++
        }
        searchText = searchList[searchIndex].q
        break
      default:
        break
    }
  }
  let searchList = []
  let catchVal = ''
  function handleInput() {
    if (searchText) {
      clearShow = true
    } else {
      searchList = []
      scaleShow = false
      clearShow = false
    }
    const val = searchText.trim()
    if (catchVal === val) return
    catchVal = val
    if (val) {
      jsonp('https://www.baidu.com/sugrec?prod=pc&wd=' + val).then(res => {
        if (Array.isArray(res.g) && res.g.length > 0) {
          searchIndex = -1
          searchList = res.g
          scaleShow = true
        }
      })
    }
  }

  function setNull() {
    catchVal = ''
    clearShow = false
    scaleShow = false
    searchText = ''
  }

  function searchItem(q, i) {
    searchText = q
    searchIndex = i
    window.open(searchUrl + searchText)
  }

  onMount(() => {
    const searchType = localStorage.getItem('searchType')
    if (searchType) {
      searchUrl = JSON.parse(searchType).url
      imgSrc = JSON.parse(searchType).src
    }

    const d = getLocal('bingImg')

    if (d) {
      bcImgSrc = d
    } else {
      jsonp('https://bing.ioliu.cn/v1?').then(res => {
        bcImgSrc = res.data.url
        setLocal('bingImg', res.data.url)
      })
      // ajaxGet(
      //   'https://fc-mp-b28966cb-26bc-43ae-b98b-aa286fad0729.next.bspapp.com/setAccessRecord'
      // )
    }
    inputDom.addEventListener('compositionstart', () => {
      inputZh = true
    })

    inputDom.addEventListener('compositionend', () => {
      inputZh = false
    })
  })

  document.onclick = function () {
    scaleShow = false
  }
  window.addEventListener('setItem', function (e) {
    // @ts-ignore
    if (e.key === 'themeFlag') {
      // @ts-ignore
      visible = JSON.parse(e.value)
    }
  })
</script>

<header
  style={visible
    ? `height: 100vh; background: url(${bcImgSrc}) 0% 0% / cover no-repeat; padding-bottom: 50vh;`
    : ''}
>
  <div class="search">
    <div class="search-logo">
      <img class="search-image" src={imgSrc} alt="" />
      <div class="select-logo" on:click={selectLogo}>
        <img
          class="logo"
          src="https://www.baidu.com/img/flexible/logo/pc/result.png"
          alt="baidu"
        />
        <img
          class="logo"
          src="https://images.frontendjs.com/bing-logo.png?imageView2/2/h/60"
          alt="bing"
        />
        <img
          class="logo"
          src="https://images.frontendjs.com/google-logo.png?imageView2/2/h/60"
          alt="google"
        />
        <img
          class="logo"
          src="https://images.frontendjs.com/github-logo.png?imageView2/2/h/60"
          alt="github"
        />
      </div>
    </div>
    <div
      class="search-box"
      on:keyup={handleKeyup}
      on:click={e => {
        e.stopPropagation()
      }}
    >
      <input
        bind:value={searchText}
        on:focus={() => {
          searchText && (scaleShow = clearShow = true)
        }}
        bind:this={inputDom}
        on:input={handleInput}
        type="text"
        class="search-ipt"
      />
      <div
        class="search-list"
        style="transform: {scaleShow ? 'scale(1)' : 'scale(0)'};"
      >
        {#each searchList as { q }, i}
          <div
            class="search-item {searchIndex === i ? 'search-item-active' : ''}"
            on:click={searchItem.bind(this, q, i)}
          >
            {q}
          </div>
        {/each}
      </div>
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
    </div>
  </div>
</header>

<style lang="less">
  .search {
    position: relative;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    padding: 0 10px;
    background-color: var(--color-header);
    width: 700px;
    height: 44px;
    display: flex;
  }
  .search-logo {
    position: relative;
    display: flex;
    align-items: center;
  }
  .search-image {
    width: 24px;
    height: 24px;
  }
  .select-logo {
    padding: 10px;
    transform-origin: center top;
    box-shadow: 0 2px 8px #00000026;
    border-radius: 2px;
    transform: scale(0);
    transition: transform 0.3s;
    position: absolute;
    top: 44px;
    left: -100%;
    border: 1px solid var(--color-border);
    background-color: var(--color-box);
  }

  input {
    color: var(--color-text);
    width: 100%;
    line-height: 44px;
    padding: 0 22px 0 5px;
    background: none;
    outline: none;
    border: none;
  }
  input:focus {
    border: none;
  }

  .search-box {
    width: 100%;
  }

  .search-logo:hover > .select-logo {
    transform: scale(1);
  }
  .logo {
    display: block;
    width: 55px;
    margin-bottom: 10px;
  }
  .logo:last-child {
    margin-bottom: 0;
  }

  .remove {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 16px;
  }
  .search-list {
    transform-origin: center top;
    transition: transform 0.3s;
    position: absolute;
    top: 50px;
    left: 39px;
    width: calc(100% - 50px);
    border: 1px solid var(--color-border);
    background: var(--color-box);
    border-radius: 2px;
    box-shadow: 0 2px 8px #00000026;
  }
  .search-item {
    padding: 5px 12px;
  }
  .search-item:hover {
    color: #1890ff;
  }
  .search-item:first-child {
    margin-top: 5px;
  }
  .search-item:last-child {
    margin-bottom: 5px;
  }
  .search-item-active {
    color: #1890ff;
  }
  header {
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
    position: sticky;
    top: 0;
    z-index: 99;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-border);
    backdrop-filter: saturate(50%) blur(8px);
    background: var(--color-header);
  }
</style>
