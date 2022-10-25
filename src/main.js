// @ts-ignore
import App from './App.svelte'
import './style/dark.css'
import './style/index.less'
import './assets/icon/iconfont.css'

// 监听setitem 操作
const setItem = localStorage.setItem
localStorage.setItem = function (name, value) {
  setItem.apply(this, arguments)
  var event = new Event('setItem')
  // @ts-ignore
  event.key = name
  // @ts-ignore
  event.value = value
  window.dispatchEvent(event)
}

const app = new App({
  target: document.getElementById('app')
})

export default app
