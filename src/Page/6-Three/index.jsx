/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import {
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Scene,
  AxesHelper,
  TextureLoader,
  RepeatWrapping,
  MirroredRepeatWrapping,
  NearestFilter,
  DoubleSide,
  PlaneBufferGeometry,
  BufferAttribute
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CreateDOM, resizeChangeFun } from '../../utils'

import { useDispatch } from 'react-redux'
import { PROGRESS } from '../../Redux/store/actions'

export default function index() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      PROGRESS({
        success: 'T6'
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

    // 导入纹理
    // https://threejs.org/docs/index.html?q=texture#api/zh/textures/Texture
    const textureloader = new TextureLoader()
    const cubeMaterial = textureloader.load(
      require('../../assets/door/color.jpg')
    )
    const cubeAlphaMap = textureloader.load(
      require('../../assets/door/alpha.jpg')
    )
    const cubeAoMap = textureloader.load(
      require('../../assets/door/ambientOcclusion.jpg')
    )
    const minecraft = textureloader.load(require('../../assets/minecraft.png'))

    // 材质属性
    // https://threejs.org/docs/index.html?q=texture#api/zh/constants/Textures
    // 偏移
    // cubeMaterial.repeat.set(0.5, 0.5)
    // 旋转
    // cubeMaterial.center.set(0.5, 0.5)
    // cubeMaterial.center.position = Math.PI / 4
    // 重复 需要定义水平垂直重复方式
    // cubeMaterial.repeat.set(2, 1)
    // 水平重复方式
    // cubeMaterial.wrapS = RepeatWrapping
    // 垂直重复方式
    // cubeMaterial.wrapT = MirroredRepeatWrapping

    // 纹理显示设置
    // 当一个纹素覆盖大于一个像素时，贴图将如何采样
    minecraft.magFilter = NearestFilter
    minecraft.minFilter = NearestFilter

    // 添加我的世界方块
    const MCGeometry = new BoxGeometry(1, 1, 1)
    const MCmaterial = new MeshBasicMaterial({
      map: minecraft
    })
    const cubeMC = new Mesh(MCGeometry, MCmaterial)
    cubeMC.position.set(-3, 0, 0)
    scene.add(cubeMC)

    // 添加物体
    const geometry = new BoxGeometry(2, 2, 2)
    // 基础网格材质
    // https://threejs.org/docs/index.html#api/zh/materials/MeshBasicMaterial
    const material = new MeshBasicMaterial({
      color: '#ffee00',
      map: cubeMaterial,
      // 定义此材质是否透明
      // https://threejs.org/docs/index.html?q=MeshBasicMaterial#api/zh/materials/Material.transparent
      transparent: true,
      // alphaMap 的材质是一个灰度图，图中量的区域表示显示，暗的区域表示透明
      alphaMap: cubeAlphaMap,
      // aoMap 该纹理的红色通道用作环境遮挡贴图。默认值为null。aoMap需要第二组UV。
      aoMap: cubeAoMap,
      // aoMap的强度
      aoMapIntensity: 1,
      // 渲染那一面
      side: DoubleSide
      // opacity: 0.5
    })
    // 给几何物体添加材质
    const cube = new Mesh(geometry, material)
    // 添加几何物体
    scene.add(cube)
    // 给cube添加第二组ua
    geometry.setAttribute(
      'uv2',
      new BufferAttribute(geometry.attributes.uv.array, 2)
    )

    // 添加平面
    const planeGeometry = new PlaneBufferGeometry(1, 1)
    const plane = new Mesh(planeGeometry, material)
    plane.position.set(3, 0, 0)
    scene.add(plane)
    // 给平面设置第二组 uv
    planeGeometry.setAttribute(
      'uv2',
      new BufferAttribute(planeGeometry.attributes.uv.array, 2)
    )

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

    // 利用动画函数不停的渲染页面
    function render() {
      controls.update()
      renderer.render(scene, camera)
      // 渲染下一针的时候就会重新调用
      requestAnimationFrame(render)
    }
    render()

    // 检测页面大小,更新渲染画面
    const resizeFun = resizeChangeFun(camera, renderer)
    window.addEventListener('resize', resizeFun)

    return () => {
      window.removeEventListener('resize', resizeFun)
      const Element = document.querySelector('#Three')
      Element?.parentElement.removeChild(Element)
    }
  }, [])
  return <></>
}
