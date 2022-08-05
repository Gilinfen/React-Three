// 生成Markdown文件
const fs = require('fs')
const path = require('path')
// 创建文件夹
fs.mkdir(path.resolve(__dirname, './src/Docs'), err => err)
;(() => {
  const globalPath = path.resolve(__dirname, './src/Page')
  const arr = fs.readdirSync(globalPath)
  arr.map(item => {
    const pathUrl = globalPath + `\\${item}`
    const urlArr = fs.readdirSync(pathUrl)
    const text = fs.readFileSync(pathUrl + `\\${urlArr[0]}`, 'utf-8')
    // 创建文件
    fs.writeFileSync(
      path.resolve(__dirname, `./src/Docs/${item}.md`),
      '```jsx\n' + text + '```',
      'utf8'
    )
  })
})()
