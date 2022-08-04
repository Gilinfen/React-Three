/* eslint-disable react-hooks/rules-of-hooks */
import React, { Suspense } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { List } from 'antd'
import routes from './routes'

export default function index() {
  const navigate = useNavigate()
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
      <div id="Box">
        <Suspense>
          <Routes>
            {routes.map(item => {
              return (
                <>
                  <Route
                    key={item.path}
                    path={item.path}
                    element={<item.component />}
                  ></Route>
                  <Route
                    key={item.code.path}
                    path={item.code.path}
                    element={<item.code.component />}
                  ></Route>
                </>
              )
            })}
          </Routes>
        </Suspense>
      </div>
    </>
  )
}
