/* eslint-disable import/no-anonymous-default-export */
import { lazy } from 'react'

const MarKdown = lazy(() => import('../MarKdown'))

const obj = [
  {
    title: 'Three场景与相机',
    path: '/three_1',
    component: lazy(() => import('../Page/1-Three')),
    code: {
      path: '/three_1/doc_1',
      doc: require('../Docs/Three_1.md'),
      component: MarKdown
    }
  },
  {
    title: 'Three控制器与坐标轴',
    path: '/three_2',
    component: lazy(() => import('../Page/2-Three')),
    code: {
      path: '/three_2/doc_2',
      doc: require('../Docs/Three_2.md'),
      component: MarKdown
    }
  },
  {
    title: 'Three移动、缩放、旋转',
    path: '/three_3',
    component: lazy(() => import('../Page/3-Three')),
    code: {
      path: '/three_3/doc_3',
      doc: require('../Docs/Three_3.md'),
      component: MarKdown
    }
  },
  {
    title: 'Three GSAP动画',
    path: '/three_4',
    component: lazy(() => import('../Page/4-Three')),
    code: {
      path: '/three_4/doc_4',
      doc: require('../Docs/Three_4.md'),
      component: MarKdown
    }
  },
  {
    title: 'Three 控制器阻尼与响应式场景',
    path: '/three_5',
    component: lazy(() => import('../Page/5-Three')),
    code: {
      path: '/three_5/doc_5',
      doc: require('../Docs/Three_5.md'),
      component: MarKdown
    }
  },
  {
    title: 'Three 材质与纹理',
    path: '/three_6',
    component: lazy(() => import('../Page/6-Three')),
    code: {
      path: '/three_6/doc_6',
      doc: require('../Docs/Three_6.md'),
      component: MarKdown
    }
  },
  {
    title: 'Three 灯光与置换、粗糙、金属、法线各类贴图',
    path: '/three_7',
    component: lazy(() => import('../Page/7-Three')),
    code: {
      path: '/three_7/doc_7',
      doc: require('../Docs/Three_7.md'),
      component: MarKdown
    }
  },
  {
    title: 'Three 资源加载进度',
    path: '/three_8',
    component: lazy(() => import('../Page/8-Three')),
    code: {
      path: '/three_8/doc_8',
      doc: require('../Docs/Three_8.md'),
      component: MarKdown
    }
  }
]

export default obj
