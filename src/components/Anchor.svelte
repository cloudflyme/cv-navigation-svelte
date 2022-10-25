<script>
  import { onMount } from 'svelte'
  import { getOrder, objName } from '../vendor/orderData'
  let order = getOrder()
  let flag = false
  let top = ''
  let topList = []
  let topIndex = -1
  onMount(() => {
    topList = order.map(item => {
      return document.getElementById(item).offsetTop
    })
    window.onscroll = () => {
      if (flag) {
        return
      }
      let top1 = document.documentElement.scrollTop
      for (let i = 0; i < topList.length; i++) {
        if (top1 <= topList[i]) {
          topIndex = i - 1
          topIndex > -1 && (top = 30 * topIndex + 11 + 'px')
          break
        }
      }
    }
  })
  var timer = null
  function goTop(i) {
    clearTimeout(timer)
    flag = true
    topIndex = i
    top = 30 * i + 11 + 'px'
    window.scrollTo({
      top: topList[i],
      behavior: 'smooth'
    })
    timer = setTimeout(() => {
      flag = false
    }, 1000)
  }
  function handleDragstart(event) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('id', event.target.id)
  }
  function handleDragover(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }
  function handleDrop(event) {
    let a = order.findIndex(item => item == event.target.id)
    let b = order.findIndex(item => item == event.dataTransfer.getData('id'))
    order[a] = event.dataTransfer.getData('id')
    order[b] = event.target.id
    order = order
    localStorage.setItem('order', JSON.stringify(order))
    requestAnimationFrame(() => {
      topList = order.map(item => {
        return document.getElementById(item).offsetTop
      })
    })
  }
</script>

<div class="navigation-box">
  <div class="anchor-ink">
    <span
      class="visible"
      style="display: {topIndex > -1 ? 'block' : 'none'}; top: {top}"
    />
  </div>
  {#each order as item, i (item)}
    <div
      id={item}
      draggable="true"
      class="anchor-item {topIndex === i ? 'anchor-item-active' : ''}"
      on:dragstart={handleDragstart}
      on:dragover={handleDragover}
      on:drop={handleDrop}
      on:click={goTop.bind(this, i)}
    >
      {objName[item]}
    </div>
  {/each}
</div>

<style lang="less">
  .visible {
    position: absolute;
    left: 50%;
    width: 8px;
    height: 8px;
    background-color: var(--color-box);
    border: 2px solid #1890ff;
    border-radius: 8px;
    transform: translate(-50%);
    transition: top 0.3s ease-in-out;
  }
  .navigation-box {
    padding-left: 16px;
    position: fixed;
    top: calc(50% - 270px);
    right: 20px;
  }
  .anchor-ink {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
  .anchor-ink:before {
    position: relative;
    display: block;
    width: 2px;
    height: 100%;
    margin: 0 auto;
    background-color: var(--color-box);
    content: ' ';
  }
  .anchor-item {
    display: block;
    user-select: none;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    transition: all 0.3s;
  }
  .anchor-item:hover,
  .anchor-item-active {
    color: #40a9ff;
  }
</style>
