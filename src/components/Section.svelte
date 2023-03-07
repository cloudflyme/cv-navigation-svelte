<script>
  import { ajaxGet, ajaxPost } from '../utils/index'
  import { allData } from '../vendor'
  import { getOrder, objName } from '../vendor/orderData'
  // import { setLocal, getUploadData } from '../utils/local'
  let visible = localStorage.getItem('foldFlag')
    ? JSON.parse(localStorage.getItem('foldFlag'))
    : false
  let hotList = []

  function query(textList) {
    let reArr = []
    const array = Object.values(allData)
    let i = 0
    while (i < array.length) {
      if (reArr.length == textList.length) {
        break
      }
      reArr.push(
        ...array[i].filter(item => {
          return textList.indexOf(item.text) > -1
        })
      )
      i++
    }
    return reArr.sort(
      (a, b) => textList.indexOf(a.text) - textList.indexOf(b.text)
    )
  }
  ajaxGet(
    'https://fc-mp-b28966cb-26bc-43ae-b98b-aa286fad0729.next.bspapp.com/getHotList'
  ).then(res => {
    if (Array.isArray(res)) {
      hotList = query(res)
    }
  })

  let orderData = getOrder()

  window.addEventListener('setItem', function (e) {
    // @ts-ignore
    if (e.key === 'order') {
      // @ts-ignore
      orderData = JSON.parse(e.value)
    }
  })

  function handleRecord(text) {
    ajaxPost(
      'https://fc-mp-b28966cb-26bc-43ae-b98b-aa286fad0729.next.bspapp.com/updateHotList',
      [{ text, num: 1 }]
    )
    // console.log(item)
    // const isNull = window.localStorage.getItem('record')
    // let data = []
    // if (isNull !== null) data = JSON.parse(isNull).value
    // const fData = data.find(v => v.text === item.text)
    // if (fData) {
    //   fData.num++
    //   setLocal('record', [...data])
    // } else {
    //   item.num = 1
    //   setLocal('record', [...data, item])
    // }
  }
  // getUploadData()

  function handleFold() {
    if (
      localStorage.getItem('foldFlag') &&
      JSON.parse(localStorage.getItem('foldFlag'))
    ) {
      visible = false
      localStorage.setItem('foldFlag', 'false')
    } else {
      visible = true
      localStorage.setItem('foldFlag', 'true')
    }
  }
  function lazyLoad(node) {
    if (node.dataset.src.slice(0, 5) !== 'https') {
      node.src = node.dataset.src
      return
    }
    const config = {
      rootMargin: '300px 0px 0px 0px',
      threshold: 0
    }
    let observer = new IntersectionObserver((entries, self) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        let img = entry.target
        // @ts-ignore
        let src = img.dataset.src
        if (src) {
          // @ts-ignore
          img.src = src
        }
        self.unobserve(entry.target)
      }
    }, config)
    observer.observe(node)
  }
</script>

<section>
  <div class="list hidden">
    <div class="title-icon" />
    <div class="hot-box">
      {#each hotList as { text, url, src, title }}
        <a
          target="_blank"
          href={url}
          class="item-link"
          {title}
          on:click={handleRecord.bind(this, text)}
        >
          <img data-src={src} use:lazyLoad alt="" />
          <span>{text}</span>
        </a>
      {/each}
    </div>
  </div>

  {#each orderData as key (key)}
    <div class="list" id={key}>
      <h3>{objName[key]}</h3>
      <div class="list-item">
        {#each allData[key] as { text, url, src, title }}
          <a
            target="_blank"
            href={url}
            class="item-link text-overflow"
            {title}
            on:click={handleRecord.bind(this, text)}
          >
            <img data-src={src} use:lazyLoad alt="" />
            <span>{text}</span>
          </a>
        {/each}
      </div>
    </div>
  {/each}

  <div
    title="侧边栏"
    class="fold"
    on:click={handleFold}
    style="right: {visible ? '-404px' : '-34px'};"
  >
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style="transform: {visible ? 'rotate(180deg)' : 'rotate(0)'}"
    >
      <path
        d="M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z"
        fill="currentColor"
      />
    </svg>
  </div>
</section>

<style lang="less">
  .hidden {
    overflow: hidden;
  }
  .fold {
    width: 26px;
    height: 26px;
    line-height: 32px;
    z-index: 5;
    position: absolute;
    border: 1px solid var(--color-border);
    box-shadow: 0 2px 4px 0px rgb(0 0 0 / 6%);
    top: 7px;
    background-color: var(--color-box);
    border-radius: 50px;
    text-align: center;
    cursor: pointer;
    svg {
      transition: transform 0.3s ease-in-out;
      width: 18px;
      height: 18px;
    }
  }
  .item-link {
    width: 164px;
    height: 42px;
    flex-shrink: 0;

    img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
    span,
    img {
      vertical-align: middle;
    }
  }
  .hot-box {
    padding: 20px 48px;
    display: flex;
    flex-wrap: wrap;
    min-height: 166px;
  }
  .title-icon {
    position: absolute;
    top: 0;
    width: 40px;
    height: 40px;
    background: url(https://mp-b28966cb-26bc-43ae-b98b-aa286fad0729.cdn.bspapp.com/cloudstorage/1b0befee-bedd-4d2c-961f-de30fcac4bef.svg);
    background-size: cover;
  }
  .list {
    position: relative;
    border-radius: 8px;
    background-color: var(--color-box);
    line-height: 42px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 15px;
    padding-left: 46px;
    font-weight: 600;
    flex-shrink: 0;
    border-bottom: 0.5px solid var(--color-border);
  }

  .list-item {
    padding: 0 48px 10px;
    display: flex;
    flex-wrap: wrap;
  }

  section {
    position: relative;
    width: 1080px;
  }
</style>
