/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
import { STYKES } from '../utils/Style_h1js.js'
import './index.scss'
import { useLocation } from 'react-router-dom'
import OmsSyntaxHighlight from './OmsSyntaxHighlight'
const { Option } = Select
export default function MarKdown() {
  const [MDState, SetMDState] = useState('')
  const [Style, SetStyle] = useState(STYKES['funky'])
  const data = useLocation()

  // 获取MD文件
  useEffect(() => {
    fetch(data.state)
      .then(res => res.text())
      .then(text => SetMDState(text))
  }, [data.state])
  return (
    <div id="Mdroot">
      {false && (
        <div id="box">
          <Select
            defaultValue="All"
            style={{ width: 150 }}
            onChange={value => SetStyle(STYKES[value])}
          >
            {Object.keys(STYKES).map(v => (
              <Option key={v} value={v}>
                {v}
              </Option>
            ))}
          </Select>
        </div>
      )}
      <OmsSyntaxHighlight
        textContent={MDState}
        language={'jsx'}
        Style={Style}
      />
    </div>
  )
}
