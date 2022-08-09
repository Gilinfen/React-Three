/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import {
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Scene,
  AxesHelper
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { CreateDOM } from '../../utils'
import { useDispatch } from 'react-redux'
import { PROGRESS } from '../../Redux/store/actions'

export default function index() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      PROGRESS({
        success: 'T2'
      })
    )
    // 获取容器大小
    const BOX = document.querySelector('#Box').getBoundingClientRect()

    // 创建一个场景
    const scene = new Scene()
    const width = BOX.width - 10
    const height = BOX.height - 10

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

    // 使用渲染器、通过相机来渲染场景
    // renderer.render(scene, camera)

    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement)

    // 添加坐标轴
    const axesHelper = new AxesHelper(5)
    scene.add(axesHelper)

    // 利用动画函数不停的渲染页面
    function render() {
      renderer.render(scene, camera)
      // 渲染下一针的时候就会重新调用
      requestAnimationFrame(render)
    }
    render()

    return () => {
      const Element = document.querySelector('#Three')
      Element?.parentElement.removeChild(Element)
    }
  }, [])
  return <></>
}
