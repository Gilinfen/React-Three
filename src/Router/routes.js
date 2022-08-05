/* eslint-disable import/no-anonymous-default-export */
import { lazy } from 'react'
// 这里不能用 import 来导入
const three_1 = require('../Docs/Three_1.md')
const three_2 = require('../Docs/Three_2.md')

export default [
  {
    title: 'Three场景与相机',
    path: '/three_1',
    component: lazy(() => import('../Page/1-Three')),
    code: {
      path: '/three_1/doc_1',
      doc: three_1,
      component: lazy(() => import('../MarKdown'))
    }
  },
  {
    title: 'Three控制器',
    path: '/three_2',
    component: lazy(() => import('../Page/2-Three')),
    code: {
      path: '/three_2/doc_2',
      doc: three_2,
      component: lazy(() => import('../MarKdown'))
    }
  }
]
