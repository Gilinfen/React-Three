/* eslint-disable react-hooks/rules-of-hooks */
import React, { Suspense, useRef, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { List } from 'antd'
import routes from './routes'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

export default function index() {
  const navigate = useNavigate()
  const BoxRef = useRef(null)
  const [Fullscrenn, SetFullscrenn] = useState(true)
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
                  marginBottom: '4px'
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
      <div id="Box" ref={BoxRef}>
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px'
          }}
          onClick={() => {
            // 判断是否全屏
            if (!document.fullscreenElement) {
              BoxRef.current.requestFullscreen()
              SetFullscrenn(false)
            } else {
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
