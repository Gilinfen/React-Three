/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { STYKES } from '../utils/Style_h1js.js'
import './index.scss'
import { useLocation } from 'react-router-dom'
const { Option } = Select
export default function MarKdown() {
  const [MDState, SetMDState] = useState('')
  const [Style, SetStyle] = useState(STYKES['tomorrowNightBright'])
  const data = useLocation()

  // 推荐主题
  const recommended = [
    'atomOneDarkReasonable',
    'gruvboxDark',
    'hybrid',
    'agate',
    'irBlack',
    'nightOwl',
    'sunburst',
    'tomorrowNightBright'
  ]

  // 获取MD文件
  useEffect(() => {
    fetch(data.state)
      .then(res => res.text())
      .then(text => SetMDState(text))
  }, [data.state])

  const components = {
    // 代码高亮
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        // https://github.com/react-syntax-highlighter/react-syntax-highlighter
        <SyntaxHighlighter
          style={Style} //这个就是你代码高亮的样式，颜色类的
          language={match[1]} //你需要的类型，比如url、JavaScript等
          showLineNumbers={true} //这个是显示不显示左侧的行数
          lineNumberStyle={{ fontSize: 10 }} //这个是行数的样式
          wrapLines={true} //确定每行代码是否应该包装在父元素中
          children={String(children).replace(/\n$/, '')}
          {...props}
        />
      ) : (
        <code className={className} {...props} />
      )
    }
  }
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
          <Select
            defaultValue="Recommended"
            style={{ width: 150 }}
            onChange={value => SetStyle(STYKES[value])}
          >
            {recommended.map(v => (
              <Option key={v} value={v}>
                {v}
              </Option>
            ))}
          </Select>
        </div>
      )}
      <ReactMarkdown children={MDState} components={components} />
    </div>
  )
}
