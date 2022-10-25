const _cdn =
  'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-39734fbc-b241-4d89-ad87-0befd655e266/'
import buildTools from './buildTools' // 构建工具
import classLib from './classLib' // 类库
import collaborativeOffice from './collaborativeOffice' // 协同办公
import cssTool from './cssTool' // css工具
import frame from './frame' // 框架
import tool from './tool' // 工具
import uiLib from './uiLib' // ui框架
import vscode from './vscode' // vscode 插件
import Design from './Design' // 设计
import designTool from './designTool' // 设计工具
import course from './course' // 教程
import language from './language' // 语言
import algorithm from './algorithm' // 算法

// 社区
const community = [
  {
    src: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/favicon-32x32.png',
    text: '掘金',
    url: 'https://juejin.cn/'
  },
  {
    src: 'https://static2.cnodejs.org/public/images/cnode_icon_32.png',
    text: 'cnode',
    url: 'https://cnodejs.org/'
  },
  {
    src: _cdn + '4dc55388-e42d-4c25-b87f-b60dea208161.ico',
    text: 'segmentfault',
    url: 'https://segmentfault.com/'
  },
  {
    src: 'https://images.frontendjs.com/github.png?imageView2/2/h/30',
    text: 'github',
    url: 'http://github.com/'
  },
  {
    src: 'https://gitee.com/assets/favicon_message.ico?1581387642851',
    text: '码云',
    url: 'https://gitee.com/'
  },
  {
    src: 'https://static.oschina.net/new-osc/img/favicon.ico',
    text: '开源中国',
    url: 'https://www.oschina.net/'
  },
  {
    src: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196',
    text: 'stackoverflow',
    url: 'https://stackoverflow.com/'
  },
  {
    src: 'https://www.jianshu.com/favicon.ico',
    text: '简书',
    url: 'https://www.jianshu.com/'
  },
  {
    src: 'https://static.zhihu.com/heifetz/favicon.ico',
    text: '知乎',
    url: 'https://www.zhihu.com/'
  },
  {
    src: 'https://leetcode.cn/favicon.ico',
    text: '力扣',
    url: 'https://leetcode.cn/'
  }
]

// 文档
const archive = [
  {
    src: 'https://cn.vuejs.org/logo.svg',
    text: 'vue-Cli',
    url: 'https://cli.vuejs.org/zh/guide/'
  },
  {
    src: 'https://cn.vuejs.org/logo.svg',
    text: 'vue-Router',
    url: 'https://router.vuejs.org/zh/'
  },
  {
    src: 'https://cn.vuejs.org/logo.svg',
    text: 'vue-Vuex',
    url: 'https://vuex.vuejs.org/zh/'
  },
  {
    src: 'https://cn.vuejs.org/logo.svg',
    text: 'vueUse',
    url: 'https://vueuse.org/'
  },
  {
    src: 'https://pinia.vuejs.org/logo.png',
    text: 'Pinia',
    url: 'https://pinia.vuejs.org/'
  },
  {
    src: 'https://react.docschina.org/favicon.ico',
    text: 'react-router',
    url: 'http://react-guide.github.io/react-router-cn/index.html'
  },
  {
    src: 'https://react.docschina.org/favicon.ico',
    text: 'redux',
    url: 'https://www.redux.org.cn/'
  },
  {
    src: 'https://www.mobxjs.com/img/favicon.png',
    text: 'mobx',
    url: 'https://cn.mobx.js.org/'
  },
  {
    src: 'https://www.html5plus.org/favicon.ico',
    text: 'h5Api',
    url: 'https://www.html5plus.org/doc/h5p.html'
  },
  {
    src: 'https://cssvalues.com/favicon.ico',
    text: 'css 属性速查',
    url: 'https://cssvalues.com/'
  },
  {
    src: 'https://static.runoob.com/images/favicon.ico',
    text: 'css 选择器',
    url: 'https://www.runoob.com/cssref/css-selectors.html'
  },
  {
    src: _cdn + 'd01c693b-1ebb-4209-b13e-4ed5b13b3366.png',
    text: 'js 一行代码',
    url: 'https://1loc.dev/'
  },
  {
    src: 'https://overapi.com/favicon.ico',
    text: 'overapi',
    url: 'https://overapi.com/',
    title: '程序员备忘录'
  },
  {
    src: 'https://lhammer.cn/You-need-to-know-css/static/favicon.ico',
    text: 'CSS 诀窍',
    url: 'https://lhammer.cn/You-need-to-know-css/#/zh-cn/',
    title: 'Web开发者应该掌握的 CSS 诀窍'
  },
  {
    src: 'https://hejialianghe.gitee.io/logo.png',
    text: 'web全栈体系',
    url: 'https://hejialianghe.gitee.io/'
  },
  {
    src: 'https://tc39.es/favicon.ico',
    text: 'TC39',
    url: 'https://tc39.es/'
  },
  {
    src: 'https://www.bootcdn.cn/assets/ico/favicon.ico?1644166305141',
    text: 'BootCDN',
    url: 'https://www.bootcdn.cn/'
  },
  {
    src: 'https://caniuse.com/img/favicon-128.png',
    text: 'web兼容性',
    url: 'https://caniuse.com/flexbox'
  },
  {
    src: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-39734fbc-b241-4d89-ad87-0befd655e266/fbe27402-b82c-4e0b-b74b-309720a34d17.ico',
    text: '中国色',
    url: 'http://zhongguose.com/'
  },
  {
    src: 'https://sunpma.com/other/rgb/favicon.ico',
    text: '颜色转换',
    url: 'https://sunpma.com/other/rgb/'
  },
  {
    src: 'https://csscoco.com/inspiration/logo2.png',
    text: 'CSS-Inspiration',
    url: 'https://csscoco.com/inspiration/#/',
    title: '这里可以让你寻找到使用或者是学习 CSS 的灵感，以分类的形式，展示不同 CSS 属性或者不同的课题使用 CSS 来解决的各种方法。'
  },
  {
    src: 'https://es6.ruanyifeng.com/favicon.ico',
    text: 'ES6',
    url: 'https://es6.ruanyifeng.com/#docs/style',
    title: '阮一峰编写的ES6代码规范'
  },
  {
    src: 'https://any86.github.io/any-rule/favicon.ico',
    text: '正则大全',
    url: 'https://any86.github.io/any-rule/'
  }
]

// svg工具
const svgTool = [
  {
    src: 'https://c.runoob.com/more/svgeditor/images/favicon.svg',
    text: 'SVG 编辑器',
    url: 'https://c.runoob.com/more/svgeditor/'
  },
  {
    src: 'https://getwaves.io/favicon-32x32.png?v=f13a1a2e88a9720e746d5561039d3f5f',
    text: 'SVG 波浪线',
    url: 'https://getwaves.io/'
  },
  {
    src: 'https://undraw.co/favicon.ico',
    text: 'unDraw',
    url: 'https://undraw.co/illustrations'
  },
  {
    src: 'https://www.shapedivider.app/favicon.ico',
    text: 'Shape Dividers',
    url: 'https://www.shapedivider.app/'
  },
  {
    src: _cdn + '7071a630-33c2-4ca0-bb77-9c7a7868a7a9.png',
    text: 'IRA Design',
    url: 'https://iradesign.io/gallery/illustrations'
  },
  {
    src: 'https://delesign.com/public/images/favicon-ico.png',
    text: 'Free Designs',
    url: 'https://delesign.com/free-designs/graphics/'
  },
  {
    src: 'https://datav.aliyun.com/favicon.ico',
    text: '地理小工具',
    url: 'https://datav.aliyun.com/portal/school/atlas/area_selector?spm=a2crr.b71357980.0.0.15cd26c0dUO9va'
  }
]
// 图标
const Icon = [
  {
    src: 'https://img.alicdn.com/imgextra/i2/O1CN01ZyAlrn1MwaMhqz36G_!!6000000001499-73-tps-64-64.ico',
    text: 'iconfont',
    url: 'https://www.iconfont.cn/'
  },
  {
    src: 'https://fontawesome.com/favicon.ico',
    text: 'fontawesome',
    url: 'https://fontawesome.com/'
  },
  {
    src: 'https://icomoon.io/favicon.ico',
    text: 'icomoon',
    url: 'https://icomoon.io/'
  },
  {
    src: 'https://icons.mono.company/favicon.ico',
    text: 'icomoon',
    url: 'https://icons.mono.company/'
  },
  {
    src: 'https://lf1-cdn2-tos.bytegoofy.com/bydesign/iconparksite/logo.svg',
    text: 'iconPark',
    url: 'https://iconpark.oceanengine.com/official'
  },
  {
    src: 'https://unpkg.byted-static.com/byted/arco-config/1.0.9/assets/icon-box.ico',
    text: 'iconBox',
    url: 'https://arco.design/iconbox/libs'
  },
  {
    src: 'https://www.fonts.net.cn/favicon.ico',
    text: '字体天下',
    url: 'https://www.fonts.net.cn/'
  },
  {
    src: 'https://www.emojiall.com/favicon.ico',
    text: 'emojiall',
    url: 'https://www.emojiall.com/zh-hans',
    title: 'emoji中文网'
  },
  {
    src: 'https://v5.bootcss.com/docs/5.1/assets/img/favicons/favicon.ico',
    text: 'bootstrap-icons',
    url: 'https://icons.bootcss.com/',
    title: 'Bootstrap 官方图标库'
  },
  {
    src:  _cdn + 'edff8684-32c4-4023-a632-4b8cfb65a5fe.svg',
    text: 'xicons',
    url: 'https://www.xicons.org/#/zh-CN'
  }
]
// 可视化图表库
const chartFrame = [
  {
    src: _cdn + 'e901f8e8-e500-4fcc-a153-ebfe6dfe77d0.png',
    text: 'echarts',
    url: 'https://echarts.apache.org/zh/index.html'
  },
  {
    src: 'https://www.highcharts.com/docs/img/favicon.png',
    text: 'highcharts',
    url: 'https://www.highcharts.com/docs/index'
  },
  {
    src: _cdn + '4bf0d9f5-65b7-43c6-9735-e3523ef9c3ef.png',
    text: 'antv',
    url: 'https://antv.vision/zh'
  },
  {
    src: 'https://d3js.org/favicon.png',
    text: 'd3',
    url: 'https://d3js.org/'
  },
  {
    src: 'https://threejs.org/files/favicon.ico',
    text: 'threejs',
    url: 'https://threejs.org/'
  },
  {
    src: _cdn + '2887e2e7-5ec7-4c79-aaef-8150aa86980c.png',
    text: 'fabricjs',
    url: 'http://fabricjs.com/',
    title: '是一个强大而简单的 Javascript HTML5 画布库'
  },
  {
    src: 'https://apexcharts.com/wp-content/themes/apexcharts/favicon.ico',
    text: 'ApexCharts',
    url: 'https://apexcharts.com/'
  }
]

export const allData = {
  algorithm,
  course,
  community,
  uiLib,
  frame,
  archive,
  buildTools,
  classLib,
  tool,
  Design,
  collaborativeOffice,
  language,
  Icon,
  cssTool,
  svgTool,
  designTool,
  chartFrame,
  vscode
}
