/**
 * @description 使用 vm, 完成模块加载实现
 *
 * 路径分析
 * 缓存优先 使用map去缓存上一次寻找的路径
 * 文件定位
 * 编译执行 (load compile)
 */

const fs = require('fs')
const path = require('path')
const vm = require('vm')

function myRequire(source) {
  // 1. 绝对路径
  const mPath = Module._resolveFilename(source)

  // 2. 缓存优先
  const cacheModule = Module._cache[mPath]
  if (cacheModule) return cacheModule.exports
  console.log('执行')
  // 3. 创建空对象加载目标模块
  const myModule = new Module(mPath)

  Module._cache[mPath] = myModule

  // 4. compile
  myModule.load()

  return myModule.exports
}

class Module {
  exports = {}

  constructor(id) {
    this.id = id
  }

  load() {
    const extname = path.extname(this.id)
    Module._extensions[extname](this);
  }

  compiler(myModule, content) {
    const wrapContent = Module.wrapper[0] + content + Module.wrapper[1]
    const compilerContent = vm.runInThisContext(wrapContent)

    const dirname = path.dirname(this.id)
    const filename = this.id
    const thisValue = this.exports
    const myExports = this.exports

    // 执行
    compilerContent.call(thisValue, myExports, myRequire, myModule, filename, dirname)
  }

  static _cache = {}

  static _resolveFilename = (absPath) => {
    absPath = path.resolve(__dirname, absPath)
    // 判断当前路径对应的内容是否存在
    if (fs.existsSync(absPath)) {
      //
    } else {
      // 文件定位，再判断是否存在 js、json、node
      const suffix = Object.keys(Module._extensions)

      for (let i = 0; i < suffix.length; i++) {
        const filename = absPath + suffix[i]
        if (fs.existsSync(filename)) {
          return filename
        }
      }
    }

    throw new Error(`${absPath} is not found`)
  }

  static _extensions = {
    ['.js']: function (myModule) {
      const content = fs.readFileSync(myModule.id, 'utf-8')
      myModule.compiler(myModule, content)
    },
    ['.json']: function (myModule) {
      const content = fs.readFileSync(myModule.id, 'utf-8')
      myModule.exports = JSON.parse(content)
    },
  }

  static wrapper = [
    '(function (exports, require, module, __filename, __dirname) {',
    '\n});'
  ]
}

const obj = myRequire('./myjson')

console.log('111', obj, obj2)
