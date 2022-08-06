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

import { gsap } from 'gsap'

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
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
    // 设置控制器的阻尼（惯性）必须在你的动画循环里调用.update()
    controls.enableDamping = true

    // 添加坐标轴
    const axesHelper = new AxesHelper(5)
    scene.add(axesHelper)

    // gsap 动画 https://greensock.com/get-started/
    // 暂停动画函数
    // adimatel.pause()
    // 判断是否是暂停状态函数
    // adimatel.isActive()
    // 恢复函数
    // adimatel.resume()
    const adimatel = gsap.to(cube.position, {
      x: 5, // 动画运动长度距离
      direction: 15, // 动画运动时间
      ease: 'pover.inOut', // 运动速度
      repeat: 2, // 重复次数，无限重复为 -1
      yoyo: true, // 往返运动
      delay: 2, //开始时延迟时间
      onComplete() {
        //动画完成回调
        console.log('动画完成')
      },
      onStart() {
        // 开始回调
        console.log('动画开始')
      }
    })
    gsap.to(cube.rotation, {
      x: 2 * Math.PI,
      direction: 15,
      ease: 'pover.inOut',
      repeat: 2, // 重复次数，无限重复为 -1
      yoyo: true, // 往返运动
      delay: 2 //开始时延迟时间
    })

    // 利用动画函数不停的渲染页面
    function render() {
      controls.update()
      renderer.render(scene, camera)
      // 渲染下一针的时候就会重新调用
      requestAnimationFrame(render)
    }
    render()

    // 检测页面大小,更新渲染画面
    const resizeFun = () => {
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
    window.addEventListener('resize', resizeFun)

    return () => {
      window.removeEventListener('resize', resizeFun)
      const Element = document.querySelector('#Three')
      Element?.parentElement.removeChild(Element)
      // 组件销毁则暂停动画
      if (adimatel.isActive()) adimatel.pause()
    }
  }, [])
  return <></>
}
