const http = require('http')
const { parse } = require('url')
const { join, basename, dirname } = require('path')
const fs = require('fs').promises
const { createReadStream } = require('fs')
const { getType } = require('mime')
const { promisify } = require('util')
const { renderFile } = require('ejs')

const defaultConfig = {
  port: 1234,
  directory: process.cwd(),
}

function mergeConfig(config) {
  return Object.assign(defaultConfig, config)
}

async function callWithFn(fn, errorCb) {
  let res
  try {
    res = await fn()
  } catch (error) {
    errorCb(error)
  }
  return res
}

module.exports = class Server {
  constructor(config) {
    this.config = mergeConfig(config)
  }

  // 启动server
  start() {
    const server = http.createServer(this.serverHandler.bind(this))

    server.listen(this.config.port, () => {
      console.log(`server is running on http://localhost:${this.config.port}`)
    })
  }

  serverHandler(req, res) {
    // 获取路径
    const { pathname } = parse(req.url)
    const path = decodeURIComponent(pathname)

    this.pathHandler(path, req, res)
  }

  errorHandler(req, res, err) {
    res.statusCode = 404
    res.setHeader('Content-type', 'text/html;charset-utf-8')
    res.end('Not Found')
  }

  fileHandler(path, req, res) {
    res.statusCode = 200
    res.setHeader('content-type', `${getType(path)};charset=utf-8`)
    createReadStream(path).pipe(res)
  }

  async pathHandler(path, req, res) {
    const pathname = path
    path = join(this.config.directory, path)
    const statObj = await callWithFn(
      () => fs.stat(path),
      (err) => {
        this.errorHandler(req, res, err)
      }
    )
    if (statObj) {
      if (statObj.isFile()) {
        this.fileHandler(path, req, res)
      } else {
        const basePath = basename(path)
        // 处理目录
        const dir = await callWithFn(
          () => fs.readdir(path),
          () => {
            console.log('不是个目录')
          }
        )
        if (dir) {
          // 渲染 模板
          const ejsRenderFile = promisify(renderFile)
          const ret = await ejsRenderFile(join(__dirname, 'template.html'), {
            folder: dir.map((item) => ({
              name: item,
              pathname: join(pathname, item),
            })),
            parent: pathname === '/',
            parentPath: dirname(pathname),
            currentFolder: basePath,
          })
          res.end(ret)
        }
      }
    }
  }
}
