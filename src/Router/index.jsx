/* eslint-disable react-hooks/rules-of-hooks */
import React, { lazy } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { List } from 'antd'
import Three1 from '../Page/1-Three'
import Three2 from '../Page/2-Three'
import Doc from '../MarKdown'
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
              >
                源码
              </span>
            </List.Item>
          )}
        />
      </div>
      <div id="Box">
        <Routes>
          {routes.map(item => {
            // const Three = lazy(() => import(item.component))
            // console.log(<Three />);
            return (
              <Route
                key={item.path}
                path={item.path}
                element={<item.component />}
              ></Route>
            )
          })}
          {/* <Route path="/three_1" element={<Three1 />}></Route>
          <Route path="/three_2" element={<Three2 />}></Route>
          <Route path="/doc_1" element={<Doc />}></Route> */}
        </Routes>
      </div>
    </>
  )
}
