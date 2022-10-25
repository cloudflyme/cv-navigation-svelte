export function jsonp(src) {
  return new Promise(resolve => {
    const script = document.createElement('script')
    const callback = 'callback' + new Date().getTime()
    script.src = src + '&callback=' + callback
    document.body.appendChild(script)
    window[callback] = function (res) {
      resolve(res)
      document.body.removeChild(script)
    }
  })
}

export function ajaxGet(url, data, headers) {
  if (data) {
    let paramsArray = []
    //拼接参数
    Object.keys(data).forEach(key => paramsArray.push(key + '=' + data[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return fetch(url, { headers }).then(response => {
    return response.json()
  })
}

export function ajaxPost(url, data, headers) {
  return fetch(url, {
    headers,
    method: 'POST',
    body: JSON.stringify(data)
  }).then(response => {
    return response.json()
  })
}

/**
 * 节流
 * @param {function} fn
 * @param {number} delay
 */
export function throttle(fn, delay = 1000) {
  let timer = null
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

export function simplifyNum(number) {
  if (!number && number != 0) return number
  if (number / 100000000 >= 1) {
    return parseInt(number / 100000000) + '亿'
  } else if (number / 10000 >= 1) {
    return parseInt(number / 10000) + '万'
  } else {
    return number
  }
}
