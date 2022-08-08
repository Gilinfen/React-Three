/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom'
import { List, Progress } from 'antd'
import {useSelector} from 'react-redux'
import routes from './routes'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

export default function index() {
  const navigate = useNavigate()
  const BoxRef = useRef(null)
  const [Fullscrenn, SetFullscrenn] = useState(true)
  const [ProgressFlag, setProgressFlag] = useState(100)
  const {itemsLoaded,itemsTotal} = useSelector(state=>state)
  // console.log(itemsLoaded);
  // 监测全屏状态
  useEffect(() => {
    const fun = () => {
      if (!document.fullscreenElement) SetFullscrenn(true)
    }
    window.addEventListener('resize', fun)
    return () => {
      window.removeEventListener('resize', fun)
    }
  }, [Fullscrenn])

  useEffect(()=>{
    const sum = ProgressFlag / itemsTotal
    console.log(sum);
  },[itemsLoaded])

  return (
    <>
      <div id="left">
        <List
          className="List"
          itemLayout="horizontal"
          dataSource={routes}
          rowKey="path"
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                onClick={() => {
                  navigate(item.path)
                }}
              />
              <span
                style={{
                  marginBottom: '4px',
                  marginLeft: 10
                }}
                onClick={() => {
                  navigate(item.code.path, { state: item.code.doc })
                }}
              >
                源码
              </span>
            </List.Item>
          )}
        />
      </div>
      <div
        id="Box"
        ref={BoxRef}
        // onDoubleClick={() => {
        //   // 判断是否全屏
        //   if (document.fullscreenElement) {
        //     // 就推出全屏
        //     document.exitFullscreen()
        //     SetFullscrenn(true)
        //   }
        // }}
      >
        {/* 进度条 */}
        <Progress
          className="Progress"
          type="circle"
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068'
          }}
          percent={ProgressFlag}
          format={(percent, successPercent) => {
            return (
              <>
                {percent >= 100 ? (
                  '成功'
                ) : (
                  <span className="formatspan">{percent}%</span>
                )}
              </>
            )
          }}
        />
        {/* Icon */}
        <div
          id="icon"
          onClick={() => {
            // 判断是否全屏
            if (!document.fullscreenElement) {
              // 请求全屏
              BoxRef.current.requestFullscreen()
              SetFullscrenn(false)
            } else {
              // 推出全屏
              document.exitFullscreen()
              SetFullscrenn(true)
            }
          }}
        >
          {Fullscrenn ? (
            <FullscreenOutlined
              style={{ color: '#ffffff', fontSize: '30px' }}
            />
          ) : (
            <FullscreenExitOutlined
              style={{ color: '#ffffff', fontSize: '30px' }}
            />
          )}
        </div>
        {/* 如果只是内部组件修改，也可以采用<Outlet/>来直接实现 */}
        <Outlet />
        {/* 路由入口 */}
        <Suspense>
          <Routes>
            {routes.map(item => {
              return (
                <Route key={item.path}>
                  <Route path={item.path} element={<item.component />}></Route>
                  <Route
                    path={item.code.path}
                    element={<item.code.component />}
                  ></Route>
                </Route>
              )
            })}
          </Routes>
        </Suspense>
      </div>
    </>
  )
}
