import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

const OmsSyntaxHighlight = props => {
  const { textContent, Style, language = 'txt' } = props
  return (
    <SyntaxHighlighter
      showLineNumbers={true} // 是否展示左侧行数
      lineNumberStyle={{ color: '#ddd', fontSize: 10 }} // 左侧行数的样式
      //   style={darkMode ? them.dark : them.light} // 主题风格
      style={Style}
      language={language} // 需要语言类型 如css, jsx , javascript 等
      PreTag="div"
    >
      {String(textContent).replace(/\n$/, '')}
    </SyntaxHighlighter>
  )
}

export default OmsSyntaxHighlight
