<script>
  import { onMount, onDestroy } from 'svelte'
  import Textarea from './Textarea.svelte'
  import Feedback from './Feedback.svelte'
  import Tool from './Tool.svelte'
  import Hotlist from './Hotlist.svelte'
  import Switch from './Switch.svelte'
  import { parseTime, ajaxGet, jsonp, simplifyNum, ajaxPost } from '../utils'
  import md5 from '../utils/md5'
  let szvisible = localStorage.getItem('szvisible')
    ? JSON.parse(localStorage.getItem('szvisible'))
    : true
  let fkvisible = localStorage.getItem('fkvisible')
    ? JSON.parse(localStorage.getItem('fkvisible'))
    : true
  let fyvisible = localStorage.getItem('fyvisible')
    ? JSON.parse(localStorage.getItem('fyvisible'))
    : true
  let gjvisible = localStorage.getItem('gjvisible')
    ? JSON.parse(localStorage.getItem('gjvisible'))
    : true
  let bdvisible = localStorage.getItem('bdvisible')
    ? JSON.parse(localStorage.getItem('bdvisible'))
    : true
  let wbvisible = localStorage.getItem('wbvisible')
    ? JSON.parse(localStorage.getItem('wbvisible'))
    : true
  let zhvisible = localStorage.getItem('zhvisible')
    ? JSON.parse(localStorage.getItem('zhvisible'))
    : true
  let blvisible = localStorage.getItem('blvisible')
    ? JSON.parse(localStorage.getItem('blvisible'))
    : true
  let mrvisible = localStorage.getItem('mrvisible')
    ? JSON.parse(localStorage.getItem('mrvisible'))
    : true

  let callbackText = ''
  let search = ''

  let weather = ''
  function getCityWeater(cid) {
    ajaxGet(
      'https://restapi.amap.com/v3/weather/weatherInfo?key=1d94fb877fb22613daf44de96dd25a17&city=' +
        cid
    ).then(res => {
      if (res.infocode == 10000) {
        const {
          0: { temperature, city }
        } = res.lives
        weather =
          parseTime(+new Date(), '{m}月{d}日 星期{a} ') +
          temperature +
          '℃' +
          ' ' +
          city.replace('市', '')
      }
    })
  }
  let stopTime = null
  function getWeater() {
    ajaxPost('https://app.ipdatacloud.com/v1/ip_self_search').then(res => {
      const cid = res.data.area_code
      getCityWeater(cid)
      stopTime = setInterval(() => {
        // @ts-ignore
        getCityWeater(cid)
      }, 1000 * 60 * 30)
    })
  }
  onMount(() => {
    getWeater()
  })
  onDestroy(() => {
    clearTimeout(stopTime)
    stopTime = null
  })

  function searchSubmit() {
    if (['', null].includes(search)) return
    const obj = {
      text: search
        .replaceAll('\n', '')
        .replaceAll('[', '【')
        .replaceAll(']', '】')
    }
    if (obj.text === '') return
    function isEnChinois() {
      return /^[0-9\u4e00-\u9fa5]+$/.test(obj.text)
    }
    let to = isEnChinois() ? 'en' : 'zh'
    jsonp(
      `https://api.fanyi.baidu.com/api/trans/vip/translate?q=${
        obj.text
      }&from=auto&to=${to}&appid=20220208001077201&salt=1435660288&sign=${md5(
        `20220208001077201${obj.text}14356602880TyNp5mLYzBoZgYux3qK`
      )}`
    ).then(res => {
      if (!res) return
      if (res.hasOwnProperty('trans_result') && res.trans_result.length > 0) {
        callbackText = res.trans_result[0].dst
      }
    })
  }
  let baiduList = []
  let loading1 = false
  function getbaidu() {
    loading1 = true
    ajaxGet('https://www.frontendjs.com/api/hot/baidu').then(({ data }) => {
      baiduList = data
        .map(item => {
          return {
            text: item.text,
            url: item.link,
            hotNum: simplifyNum(item.hotValue)
          }
        })
        .slice(0, 10)

      loading1 = false
    })
  }
  if (bdvisible) {
    getbaidu()
  }

  let wbList = []
  let loading2 = false
  function getwb() {
    loading2 = true

    ajaxGet('https://www.frontendjs.com/api/hot/weibo').then(res => {
      wbList = res.data.slice(0, 10).map(item => {
        return {
          text: item.text + ' ',
          url: item.link,
          hotNum: simplifyNum(item.hotValue)
        }
      })
      loading2 = false
    })
  }
  if (wbvisible) {
    getwb()
  }

  let zhihuList = []
  let loading3 = false
  function getzhihu() {
    loading3 = true
    ajaxGet('https://www.frontendjs.com/api/hot/zhihu').then(res => {
      zhihuList = res.data.slice(0, 10).map(item => {
        return {
          text: item.text + ' ',
          url: item.link,
          hotNum: simplifyNum(item.hotValue)
        }
      })
      loading3 = false
    })
  }
  if (zhvisible) {
    getzhihu()
  }

  let blList = []
  let loading4 = false
  function getblList() {
    loading4 = true
    ajaxGet('https://tenapi.cn/v2/bilihot/').then(res => {
      blList = res.data.slice(0, 10).map(item => {
        return {
          text: item.name + ' ',
          url: item.url
        }
      })
      loading4 = false
    })
  }
  if (blvisible) {
    getblList()
  }

  window.addEventListener('setItem', function (e) {
    // @ts-ignore
    if (e.key === 'bdvisible' && e.value) {
      getbaidu()
      // @ts-ignore
    } else if (e.key === 'wbvisible' && e.value) {
      getwb()
      // @ts-ignore
    } else if (e.key === 'zhvisible' && e.value) {
      getzhihu()
    }
  })
  let str = ''
  let str1 = ''
  ajaxGet('https://v1.hitokoto.cn/').then(res => {
    str = res.hitokoto
    let temp = res.from_who ?? ''
    str1 = '—— ' + temp + '「 ' + res.from + ' 」'
  })
</script>

<aside>
  <div class="weather b--r m-b-20">
    {weather} <span class="iconfont icon-shezhi-xianxing m-l-10" />

    <div class="settings-list">
      <div class="settings-item">
        <div>
          <span class="iconfont icon-liuyan" />
          <span>每日一言</span>
        </div>

        <Switch
          visible={mrvisible}
          on:change={e => {
            localStorage.setItem('mrvisible', e.detail)
            mrvisible = e.detail
          }}
        />
      </div>
      <div class="settings-item">
        <div>
          <span class="iconfont icon-shizhong" />
          <span>时钟</span>
        </div>

        <Switch
          visible={szvisible}
          on:change={e => {
            localStorage.setItem('szvisible', e.detail)
            szvisible = e.detail
          }}
        />
      </div>

      <div class="settings-item">
        <div>
          <span class="iconfont icon-fankui" />
          <span>反馈</span>
        </div>

        <Switch
          visible={fkvisible}
          on:change={e => {
            localStorage.setItem('fkvisible', e.detail)
            fkvisible = e.detail
          }}
        />
      </div>

      <div class="settings-item">
        <div>
          <span class="iconfont icon-fanyiline" />
          <span>翻译</span>
        </div>

        <Switch
          visible={fyvisible}
          on:change={e => {
            localStorage.setItem('fyvisible', e.detail)
            fyvisible = e.detail
          }}
        />
      </div>

      <div class="settings-item">
        <div>
          <span class="iconfont icon-gongju" />
          <span>工具集</span>
        </div>

        <Switch
          visible={gjvisible}
          on:change={e => {
            localStorage.setItem('gjvisible', e.detail)
            gjvisible = e.detail
          }}
        />
      </div>

      <div class="settings-item">
        <div>
          <span class="iconfont icon-icon" />
          <span>百度热搜</span>
        </div>

        <Switch
          visible={bdvisible}
          on:change={e => {
            localStorage.setItem('bdvisible', e.detail)
            bdvisible = e.detail
          }}
        />
      </div>

      <div class="settings-item">
        <div>
          <span class="iconfont icon-icon" />
          <span>微博热搜</span>
        </div>

        <Switch
          visible={wbvisible}
          on:change={e => {
            localStorage.setItem('wbvisible', e.detail)
            wbvisible = e.detail
          }}
        />
      </div>

      <div class="settings-item">
        <div>
          <span class="iconfont icon-icon" />
          <span>知乎热搜</span>
        </div>

        <Switch
          visible={zhvisible}
          on:change={e => {
            localStorage.setItem('zhvisible', e.detail)
            zhvisible = e.detail
          }}
        />
      </div>

      <div class="settings-item">
        <div>
          <span class="iconfont icon-icon" />
          <span>bilibili热搜</span>
        </div>

        <Switch
          visible={blvisible}
          on:change={e => {
            localStorage.setItem('blvisible', e.detail)
            blvisible = e.detail
          }}
        />
      </div>
    </div>
  </div>
  {#if mrvisible}
    <div class="b--r m-b-20 article-box">
      <div class="article">
        {str}
        <div style="text-align: right;">
          {str1}
        </div>
      </div>

      <iframe
        title=""
        class="cat"
        width="350"
        height="280"
        src="/assets/cat.html"
        frameborder="0"
        style="background-color: var(--color-box);"
      />
    </div>
  {/if}

  {#if szvisible}
    <iframe
      title=""
      class="b--r m-b-20"
      width="350"
      height="280"
      src="/assets/watch.html"
      frameborder="0"
      style="background-color: var(--color-box);"
    />
  {/if}

  {#if fkvisible}
    <Feedback />
  {/if}

  {#if fyvisible}
    <div class="translate b--r">
      <div class="f-s-15 flex">
        翻译 <div class="my-primary custom" on:click={searchSubmit}>搜索</div>
      </div>
      <Textarea
        on:change={e => {
          search = e.detail
        }}
        text={search}
      />
      <div class="m-t-10">
        <Textarea text={callbackText} readonly />
      </div>
    </div>
  {/if}

  {#if gjvisible}
    <Tool />
  {/if}

  {#if bdvisible}
    <Hotlist
      title="<a href='https://top.baidu.com/board' target=_blank rel='noopener noreferrer' style='cursor: pointer'>百度热搜</a>"
      list={baiduList}
      loading={loading1}
      on:loading={getbaidu}
    />
  {/if}

  {#if wbvisible}
    <Hotlist
      title="<a href='https://s.weibo.com/top/summary' target=_blank rel='noopener noreferrer' style='cursor: pointer'>微博热搜</a>"
      list={wbList}
      loading={loading2}
      on:loading={getwb}
    />
  {/if}

  {#if zhvisible}
    <Hotlist
      title="知乎热搜"
      list={zhihuList}
      loading={loading3}
      on:loading={getzhihu}
    />
  {/if}
  {#if blvisible}
    <Hotlist
      title="bilibili热搜"
      list={blList}
      loading={loading4}
      on:loading={getblList}
    />
  {/if}
</aside>

<style lang="less">
  .article {
    padding: 10px 10px 0;
  }
  .cat {
    width: 330px;
    height: 160px;
  }
  .article-box {
    line-height: 28px;
    padding: 10px 10px 0;
    background-color: var(--color-box);
  }
  .settings-list {
    transition: transform 0.3s;
    transform: scale(0);
    transform-origin: center top;
    z-index: 99;
    padding: 5px;
    box-shadow: 0 2px 8px #00000026;
    position: absolute;
    top: 40px;
    width: 100%;
    border: 1px solid var(--color-border);
    background-color: var(--color-box);
  }
  .settings-item {
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }
  .settings-item:hover {
    color: #1890ff;
  }
  .translate {
    width: 350px;
    background-color: var(--color-box);
    padding: 10px;
    margin-bottom: 20px;
  }
  .custom {
    padding: 2px 8px;
    line-height: 22px;
    height: 26px;
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }

  .weather:hover {
    .settings-list {
      transform: scale(1);
    }
  }
  .weather {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 350px;
    padding: 0 5px;
    height: 40px;
    background-color: var(--color-box);
  }
  aside {
    margin-left: 20px;
    width: 350px;
  }
</style>
