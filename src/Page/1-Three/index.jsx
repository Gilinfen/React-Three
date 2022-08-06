import React, { useEffect } from 'react'
import {
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Scene
} from 'three'
import { CreateDOM } from '../../utils'

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // 创建一个场景
    const scene = new Scene()
    const width = 1190
    const height = 890

    // 创建相机对象
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000)

    // 设置相机位置
    camera.position.set(0, 0, 10)
    scene.add(camera)

    // 添加物体
    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshBasicMaterial({ color: 0x00ff00 })
    // 给几何物体添加材质
    const cube = new Mesh(geometry, material)
    // 添加几何物体
    scene.add(cube)

    // 初始化渲染器
    const renderer = new WebGLRenderer()

    // 设置渲染尺寸大小
    renderer.setSize(width, height)
    // 添加到页面中
    CreateDOM(renderer.domElement)
    //   CreateDOM = (dom)=>{
    //     const DOM = document.createElement('div')
    //     DOM.setAttribute('id', 'Three')
    //     DOM.appendChild(dom)
    //     document.querySelector('#Box')?.appendChild(DOM)
    // }

    // 使用渲染器、通过相机来渲染场景
    renderer.render(scene, camera)
    return () => {
      const Element = document.querySelector('#Three')
      Element?.parentElement.removeChild(Element)
    }
  }, [])
  return <></>
}
