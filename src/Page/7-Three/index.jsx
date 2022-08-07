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
  BufferAttribute,
  MeshStandardMaterial,
  AmbientLight,
  DirectionalLight
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

    // 导入纹理
    // https://threejs.org/docs/index.html?q=texture#api/zh/textures/Texture
    const cubeGeometry = new TextureLoader()
    const cubeMaterial = cubeGeometry.load(require('../../assets/color.jpg'))
    const cubeAlphaMap = cubeGeometry.load(require('../../assets/alpha.jpg'))
    const cubeAoMap = cubeGeometry.load(
      require('../../assets/ambientOcclusion.jpg')
    )

    // 导入置换贴图（位移贴图）
    const doorHeightTexture = cubeGeometry.load(
      require('../../assets/height.jpg')
    )
    // 导入粗糙度贴图
    const roughnessTexture = cubeGeometry.load(
      require('../../assets/roughness.jpg')
    )
    // 导入金属贴图
    const metalnessTexture = cubeGeometry.load(
      require('../../assets/metalness.jpg')
    )
    // 导入法线贴图
    const normalTexture = cubeGeometry.load(require('../../assets/normal.jpg'))

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
    // cubeMaterial.magFilter = NearestFilter
    // cubeMaterial.minFilter = NearestFilter

    // 添加物体
    const geometry = new BoxGeometry(2, 2, 2, 200, 200, 200)
    // 标准网格材质
    // https://threejs.org/docs/index.html?q=MeshSt#api/zh/materials/MeshStandardMaterial
    const material = new MeshStandardMaterial({
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
      side: DoubleSide,
      // 透明度 需要开启 transparent
      // opacity: 0.5
      // 置换贴图（位移贴图）
      // https://threejs.org/docs/index.html?q=dis#api/zh/materials/MeshDistanceMaterial.displacementMap
      displacementMap: doorHeightTexture,
      // 位移贴图对网格的影响程度
      displacementScale: 0.1,
      // 粗糙度
      // https://threejs.org/docs/index.html?q=MeshS#api/zh/materials/MeshStandardMaterial.roughness
      roughness: 1,
      // 粗糙度贴图
      roughnessMap: roughnessTexture,
      // https://threejs.org/docs/index.html?q=MeshS#api/zh/materials/MeshStandardMaterial.metalness
      // 金属度
      metalness: 1,
      //  金属度贴图
      metalnessMap: metalnessTexture,
      // 法线特贴图
      // https://threejs.org/docs/index.html?q=MeshS#api/zh/materials/MeshStandardMaterial.normalMap
      normalMap: normalTexture
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
    const planeGeometry = new PlaneBufferGeometry(1, 1, 200, 200)
    const plane = new Mesh(planeGeometry, material)
    plane.position.set(3, 0, 0)
    scene.add(plane)
    // 给平面设置第二组 uv
    planeGeometry.setAttribute(
      'uv2',
      new BufferAttribute(planeGeometry.attributes.uv.array, 2)
    )

    // 灯光
    // 环境光
    // https://threejs.org/docs/index.html?q=Amb#api/zh/lights/AmbientLight
    const light = new AmbientLight('#ffffff', 0.5)
    scene.add(light)
    // 平行光
    // https://threejs.org/docs/index.html?q=light#api/zh/lights/DirectionalLight
    const directionalLight = new DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(0, 10, 10)
    scene.add(directionalLight)

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
    }
  }, [])
  return <></>
}
