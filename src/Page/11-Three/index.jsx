/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import {
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  Scene,
  AxesHelper,
  DoubleSide,
  PlaneBufferGeometry,
  MeshStandardMaterial,
  AmbientLight,
  SphereBufferGeometry,
  LoadingManager,
  SpotLight
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useDispatch } from 'react-redux'

import { CreateDOM, resizeChangeFun } from '../../utils'
import { PROGRESS } from '../../Redux/store/actions'
// https://threejs.org/docs/index.html?q=text#api/zh/loaders/DataTextureLoader
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// https://juejin.cn/post/7111988285722853389
import * as dat from 'dat.gui'

// 目标：聚光灯

export default function index() {
  const dispatch = useDispatch()
  useEffect(() => {
    // 创建 gui 面板
    const gui = new dat.GUI()

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

    // 设置纹理管理加载器
    const enent = {
      onLoad() {
        console.log('加载完成')
        dispatch(
          PROGRESS({
            success: false
          })
        )
      },
      onProgress(url, itemsLoaded, itemsTotal) {
        // console.log('加载中')
      },
      onError(url) {
        console.log(url)
        console.log('加载失败')
      }
    }
    const loadingMarnger = new LoadingManager(
      enent.onLoad,
      enent.onProgress,
      enent.onError
    )
    // 加载 HDR 环境图
    const rgbEloader = new RGBELoader(loadingMarnger)
    rgbEloader.loadAsync(require('../../assets/hdr/012.hdr')).then(texture => {
      // 设置经纬贴图
      // texture.mapping
      // https://threejs.org/docs/index.html?q=text#api/zh/textures/Texture.mapping
      // EquirectangularReflectionMapping
      // https://threejs.org/docs/index.html?q=text#api/zh/constants/Textures
      // texture.mapping = EquirectangularReflectionMapping
      // // 设置场景环境图
      // scene.background = texture
      // // 设置物体环境图
      // scene.environment = texture
    })

    // 材质
    const material = new MeshStandardMaterial({
      // metalness: 0.7,
      // roughness: 0.1,
      side: DoubleSide
    })
    // 条件球体
    const sphereGeometry = new SphereBufferGeometry(1, 20, 20)
    const sphere = new Mesh(sphereGeometry, material)
    // 设置物体投射阴影
    // https://threejs.org/docs/index.html?q=obj#api/zh/core/Object3D.castShadow
    sphere.castShadow = true
    scene.add(sphere)

    // 创建平面
    const planeGeometry = new PlaneBufferGeometry(30, 30)
    const plane = new Mesh(planeGeometry, material)
    plane.position.set(0, -2, 0)
    plane.rotation.x = -Math.PI / 2
    // 接受阴影
    // https://threejs.org/docs/index.html?q=obj#api/zh/core/Object3D.receiveShadow
    plane.receiveShadow = true
    scene.add(plane)

    // 灯光
    // 环境光
    // https://threejs.org/docs/index.html?q=Amb#api/zh/lights/AmbientLight
    const light = new AmbientLight('#ffffff', 0.5)
    scene.add(light)
    // 透视光（聚光灯）
    // https://threejs.org/docs/index.html?q=light#api/zh/lights/SpotLight
    const soptLight = new SpotLight(0xffffff, 1)
    soptLight.position.set(-3, 5.5, -5)
    // 设置光照投射阴影
    // https://threejs.org/docs/index.html?q=dir#api/zh/lights/SpotLight.castShadow
    soptLight.castShadow = true
    // https://threejs.org/docs/index.html?q=dir#api/zh/lights/shadows/LightShadow
    // 设置阴影贴图模糊度
    soptLight.shadow.radius = 20
    // 设置阴影贴图的分辨率
    soptLight.shadow.mapSize.set(4096, 2048)
    // 透视大小
    soptLight.angle = Math.PI / 6
    // 聚焦某个物体
    soptLight.target = sphere
    // 光线衰减
    soptLight.distance = 0
    // 聚光锥的半影衰减百分比
    soptLight.penumbra = 0
    // 沿着光照距离的衰减量 需要开启 physicallyCorrectLights
    // https://threejs.org/docs/index.html?q=light#api/zh/renderers/WebGLRenderer.physicallyCorrectLights
    soptLight.decay = 0

    scene.add(soptLight)

    // GUI 面板
    gui.add(sphere.position, 'x').min(-5).max(5).step(0.1).name('球体x轴位置')
    gui
      .add(soptLight, 'angle')
      .min(0)
      .max(Math.PI / 2)
      .step(0.01)
      .name('透视大小')
    gui.add(soptLight, 'distance').min(0).max(50).step(0.1).name('光线衰减')
    gui.add(soptLight, 'penumbra').min(0).max(1).step(0.01).name('半影衰减')
    gui.add(soptLight, 'decay').min(0).max(5).step(0.1).name('光照距离衰减量')

    // 初始化渲染器
    const renderer = new WebGLRenderer()

    // 设置渲染尺寸大小
    renderer.setSize(width, height)
    // 开启厂家中的阴影贴图
    // https://threejs.org/docs/index.html?q=renderer#api/zh/renderers/WebGLRenderer.shadowMap
    renderer.shadowMap.enabled = true
    // 开启物理上正确的光照模式
    renderer.physicallyCorrectLights = true

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
      const ElementGUI = document.querySelector('.main')
      ElementGUI?.parentElement.removeChild(ElementGUI)
    }
  }, [])
  return <></>
}
