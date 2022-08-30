/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef } from 'react'
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
  DirectionalLight,
  SphereBufferGeometry,
  LoadingManager,
  EquirectangularReflectionMapping,
  SpotLight,
  PointLight,
  MeshBasicMaterial,
  Clock,
  SphereGeometry,
  CubeTextureLoader,
  TextureLoader,
  CircleBufferGeometry,
  Vector2,
  PlaneGeometry,
  RepeatWrapping,
  Vector3,
  ACESFilmicToneMapping,
  BoxGeometry,
  PMREMGenerator
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useDispatch } from 'react-redux'

import { CreateDOM, resizeChangeFun } from '../../utils'
import { PROGRESS } from '../../Redux/store/actions'
// https://threejs.org/docs/index.html?q=text#api/zh/loaders/DataTextureLoader
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// https://juejin.cn/post/7111988285722853389
import * as dat from 'dat.gui'
import { Water } from 'three/examples/jsm/objects/Water.js'

import { Sky } from 'three/examples/jsm/objects/Sky'

export default function index() {
  const dispatch = useDispatch()
  const ResizeRef = useRef({})
  useEffect(() => {
    // 初始化场景
    const { camera, scene, renderer, controls, paramGenerator } = InitScene()

    // 纹理管理加载器
    const LoadingManager = LoadingManagerFun()

    // 场景
    const { water, sky, cube } = initVater(LoadingManager, paramGenerator)
    // 水面
    scene.add(water)
    // 天空
    scene.add(sky)
    // cobe盒子
    scene.add(cube)

    // 渲染
    render({ controls, renderer, scene, camera }, water)
    return () => {
      window.removeEventListener('resize', ResizeRef.current?.resizeFun)
      const Element = document.querySelector('#Three')
      Element?.parentElement.removeChild(Element)
      const ElementGUI = document.querySelector('.main')
      ElementGUI?.parentElement.removeChild(ElementGUI)
    }
  }, [])

  // 初始化场景
  function InitScene() {
    // 获取容器大小
    const BOX = document.querySelector('#Box').getBoundingClientRect()

    // 创建场景
    const scene = new Scene()
    const width = BOX.width - 10
    const height = BOX.height - 10

    // 创建相机对象
    const camera = new PerspectiveCamera(75, width / height, 0.1, 2000)

    // 设置相机位置
    camera.position.set(30, 30, 100)
    // 更新摄像机的头宽高比
    camera.aspect = width / height
    // 更新摄像机投影矩阵
    camera.updateProjectionMatrix()
    scene.add(camera)

    // 初始化渲染器
    const renderer = new WebGLRenderer()
    // 设置渲染尺寸大小
    renderer.setSize(width, height)
    // 太阳的渲染设置
    renderer.toneMapping = ACESFilmicToneMapping

    const paramGenerator = new PMREMGenerator(renderer)

    // 添加到页面中
    CreateDOM(renderer.domElement)

    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 10, 0)
    // 设置控制器的阻尼（惯性）必须在你的动画循环里调用.update()
    controls.enableDamping = true

    // 添加坐标轴
    const axesHelper = new AxesHelper(100)
    scene.add(axesHelper)

    // 检测页面大小,更新渲染画面
    ResizeRef.current.resizeFun = resizeChangeFun(camera, renderer)
    window.addEventListener('resize', ResizeRef.current.resizeFun)

    return {
      scene,
      camera,
      renderer,
      controls,
      paramGenerator
    }
  }

  // 场景
  function initVater(LoadingManager, paramGenerator) {
    const loader = new TextureLoader(LoadingManager)
    // 这是太阳
    const sun = new Vector3(-80, 5, -100)
    // 设置水面
    const water = new Water(
      // 第一个参数为 bufferGeometry
      new PlaneGeometry(10000, 10000),
      // 第二个参数为 ShaderMaterial ，这里为 optons
      {
        waterNormals: loader.load(
          require('../../assets/water/waternormals.jpg'),
          texture => {
            // 水平和垂直的 wrap 都等于 RepeatWrapping
            // THREE.RepeatWrapping(重复平铺)
            // THREE.MirroredRepeatWrapping（先镜像再重复平铺）
            texture.wrapS = texture.wrapT = RepeatWrapping
          }
        ),
        sunDirection: sun,
        // 太阳颜色
        sunColor: 0xffffff,
        // 水面颜色
        waterColor: 0x001e0f
      }
    )
    water.rotation.x = -Math.PI / 2
    // 天空场景
    const sky = new Sky()
    sky.scale.setScalar(10000)
    sky.material.uniforms['sunPosition'].value.copy(sun)

    //

    // cube 盒子
    const cube = new Mesh(
      new BoxGeometry(30, 30, 30),
      new MeshStandardMaterial()
    )
    return { water, sky, cube }
  }

  // 利用动画函数不停的渲染页面
  function render({ controls, renderer, scene, camera }, water) {
    // 水面波动
    water.material.uniforms['time'].value += 1 / 60

    controls.update()
    renderer.render(scene, camera)
    // 渲染下一针的时候就会重新调用
    requestAnimationFrame(() =>
      render({ controls, renderer, scene, camera }, water)
    )
  }

  // 设置纹理管理加载器
  function LoadingManagerFun() {
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
    return new LoadingManager(enent.onLoad, enent.onProgress, enent.onError)
  }
  return <></>
}
