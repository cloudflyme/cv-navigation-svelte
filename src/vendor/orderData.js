export const objName = {
  algorithm: '算法',
  course: '教程',
  community: '社区',
  uiLib: 'UI框架',
  frame: '框架',
  archive: '文档',
  buildTools: '构建工具',
  classLib: '类库',
  tool: '工具',
  Design: '设计',
  collaborativeOffice: '协同办公',
  language: '语言',
  Icon: '图标',
  cssTool: 'css工具',
  svgTool: 'svg工具',
  designTool: '设计工具',
  chartFrame: '可视化图表库',
  vscode: 'vscode插件'
}

export const orderData = [
  'course',
  'community',
  'archive',
  'classLib',
  'uiLib',
  'frame',
  'chartFrame',
  'Design',
  'Icon',
  'algorithm',
  'language',
  'collaborativeOffice',
  'designTool',
  'buildTools',
  'svgTool',
  'cssTool',
  'tool',
  'vscode'
]

export function getOrder() {
  let isNull = window.localStorage.getItem('order')
  let orderList = []
  if (isNull !== null) {
    orderList = orderData.sort(function (a, b) {
      return isNull.indexOf(a) - isNull.indexOf(b)
    })
  } else {
    orderList = orderData
  }
  return orderList
}