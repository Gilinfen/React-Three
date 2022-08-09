/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import {
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  Scene,
  AxesHelper,
  MeshStandardMaterial,
  AmbientLight,
  DirectionalLight,
  LoadingManager,
  CubeTextureLoader,
  SphereBufferGeometry,
  EquirectangularReflectionMapping
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// https://threejs.org/docs/index.html?q=text#api/zh/loaders/DataTextureLoader
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { useDispatch } from 'react-redux'

import { CreateDOM, resizeChangeFun } from '../../utils'
import { PROGRESS } from '../../Redux/store/actions'

// 目标：环境贴图与HDR场景
// 1、物体环境贴图  envMap: emvMapTexture
// 2、场景背景图  scene.background = emvMapTexture 
// 3、给所有的物体添加默认的场景贴图 scene.environment = emvMapTexture
// 4、加载 HDR 环境图 new RGBELoader(loadingMarnger)
// 5、设置经纬贴图  texture.mapping = EquirectangularReflectionMapping
// 6、设置场景环境图 scene.background = texture
// 7、设置物体环境图 scene.environment = texture

export default function index() {
  const dispatch = useDispatch()
  useEffect(() => {
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
    rgbEloader.loadAsync(require('../../assets/hdr/004.hdr')).then(texture => {
      // 设置经纬贴图
      // texture.mapping
      // https://threejs.org/docs/index.html?q=text#api/zh/textures/Texture.mapping
      // EquirectangularReflectionMapping
      // https://threejs.org/docs/index.html?q=text#api/zh/constants/Textures
      texture.mapping = EquirectangularReflectionMapping
      // 设置场景环境图
      scene.background = texture
      // 设置物体环境图
      scene.environment = texture
    })
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

    // 导入环境贴图
    const cubeTextureLoader = new CubeTextureLoader()
    const emvMapTexture = cubeTextureLoader.load([
      require('../../assets/environmentMaps/0/px.jpg'),
      require('../../assets/environmentMaps/0/nx.jpg'),
      require('../../assets/environmentMaps/0/py.jpg'),
      require('../../assets/environmentMaps/0/ny.jpg'),
      require('../../assets/environmentMaps/0/pz.jpg'),
      require('../../assets/environmentMaps/0/nz.jpg')
    ])

    // 添加球体
    const sphereGemoetry = new SphereBufferGeometry(1, 20, 20)
    // 设置材质
    const meterial = new MeshStandardMaterial({
      metalness: 0.7,
      roughness: 0.1
      // 环境贴图
      // https://threejs.org/docs/index.html?q=MeshS#api/zh/materials/MeshStandardMaterial.envMap
      // envMap: emvMapTexture
    })
    const cube = new Mesh(sphereGemoetry, meterial)
    scene.add(cube)

    // 添加场景背景图
    // https://threejs.org/docs/index.html?q=sce#api/zh/scenes/Scene
    // scene.background = emvMapTexture
    // 给所有的物体添加默认的场景贴图
    // scene.environment = emvMapTexture

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
