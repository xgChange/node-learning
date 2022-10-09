/**
 * @description md 转 html
 */

const fs = require('fs')
const promisify = require('util').promisify
const path = require('path')

const { marked } = require('marked')

/**
 * 1. 读取 md 转换成 html
 * 2. 拿生成的 html，替换
 * 3. 监听
 */

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const args = process.argv.slice(2)

const mdPath = path.join(__dirname, args[0])
const templatePath = path.join(__dirname, 'template.html')

const targeName = args[1] ?? path.basename(mdPath).replace(path.extname(mdPath), '.html') // 最

async function translate() {
  try {
    // 监听文件变化
    fs.watchFile(mdPath, async (cur, prev) => {
      if (cur.mtime !== prev.mtime) {
        console.log('Change File ~~~~')
    
        // 读取 template html 、 读取 md
        const readFileArr = [readFile(mdPath, 'utf-8'), readFile(templatePath, 'utf-8')]
        const [mdContent, htmlContent] = await Promise.all(readFileArr)
        const mdHtml = marked(mdContent)

        const targetHtml = htmlContent.replace('{{content}}', mdHtml)
        
        // 写入指定的 html
        await writeFile(path.resolve(__dirname, targeName), targetHtml, 'utf-8')
      }
    })
  } catch (error) {
    console.log('error', error)
  }
}

translate()
