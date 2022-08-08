import { PROGRESS } from '../Redux/store/actions'

// 创建DOM
export const CreateDOM = dom => {
  const DOM = document.createElement('div')
  DOM.setAttribute('id', 'Three')
  DOM.appendChild(dom)
  document.querySelector('#Box')?.appendChild(DOM)
}

// 检测页面大小,更新渲染画面
export const resizeChangeFun = (camera, renderer) => {
  return () => {
    const BOX = document.querySelector('#Box').getBoundingClientRect()
    const width = BOX.width - 10
    const height = BOX.height - 10
    // 更新摄像头
    camera.aspect = width / height
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix()
    // 更新渲染器
    renderer.setSize(width, height)
    // 设置相机渲染的像素比
    renderer.setPixelRatio(window.devicePixelRatio)
  }
}
