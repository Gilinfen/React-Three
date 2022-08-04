/* eslint-disable import/no-anonymous-default-export */
import { lazy } from 'react'

export default [
  {
    title: 'Three场景与相机',
    path: '/three_1',
    component: lazy(() => import('../Page/1-Three')),
    code: {
      path: '/doc_1',
      component: lazy(() => import('../MarKdown')),
    }
  },
  {
    title: 'Three场景与相机',
    path: '/three_2',
    component: lazy(() => import('../Page/2-Three')),
    code: {
      path: '/doc_1',
      component: lazy(() => import('../MarKdown')),
    }
  }
]
