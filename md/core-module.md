# 核心模块

## path 模块

```javascript
dirname
basename // path 当中的最后一个路径
extname
path.parse() // 解析成Obj
path.format() // 序列化
path.isAbsolute() // 是否是绝对路径
```

## 全局变量之 buffer

> buffer 让 js 可以操作二进制

> IO 行为操作的就是二进制数据

> 流操作配合管道实现数据分段传输

> 数据的端到端传输会有生产者和消费者、生产和消费的过程往往存在等待、等待时数据存放在哪？Buffer

> Nodejs 中 Buffer 是一块内存空间(不占 v8 堆内存大小)、内存的使用由 Node 控制、一般配合 Stream 流使用，充当数据缓冲区

### 创建 Buffer

- alloc: 创建指定字节大小的 buffer
- allocUnsafe: (不安全)
- from: 接收数据，创建 buffer

### 实例方法

- fill: 使用数据填充 buffer
- wirte: 向 buffer 中写入数据
- toString: 从 buffer 中提取数据
- slice: 截取 buffer
- indexof: buffer 中查找数据
- copy

### 静态方法

- concat: 多个 buffer 拼接
- isBuffer

## FS

- 权限：rwx - 4 2 1 (win 中默认是 0o666，可读可写不可执行)
- 用户：文件所有者-所有组-其他用户
- 常见 flag 操作符: r、w、s(同步)、+(执行相反操作)、x(排他操作)、a(追加)
- fd 就是操作系统分配给被打开文件的标识(文件描述符) 从 3 开始，(0,1,2 都被占了)

### 文件读写和拷贝操作

- readFile(一次性把文件读出来)
- writeFile
- appendFile
- copyFile
- watchFile

### 目录操作 api

- access: 判断文件或目录是否具有操作权限
- stat: 获取目录及文件信息
- mkdir: 创建目录
- rmdir: 删除目录
- readdir: 读取目录中内容
- unlink: 删除指定文件

## commonjs 规范

> 任何一个文件就是一个独立的模块，拥有独立的作用域；加载模块是同步的，先执行模块里面的代码，然后才走 require 后面的

- 模块引用

- 模块定义

- 模块标识

### module 属性

- id 返回模块标识符
- filename 返回文件模块的绝对路径
- loaded 返回布尔值，表示模块是否完
- parent 返回对象存放调用当前模块的模块
- children 数组，存放当前模块调用的其他模块
- exports 返回当前模块需要暴露的内容
- paths 返回数组，存放不同目录下的 node_modules 位置，比如当前目录的 node_module，上一层、上上层、上上上层

### require 属性

- resolve 返回模块文件绝对模块
- extensions 根据不同后缀名执行解析操作
- main 返回主模块对象

### node 中的模块分类

- 内置模块
- 文件模块

#### 模块加载速度

- 核心模块：Node 源码编译时写入到二进制文件中
- 文件模块：代码运行时，动态加载

#### 加载流程

- 路径分析：根据标识符确定模块位置

```
  去遍历 module.paths，看里面的路径是否匹配，如果没匹配到就报错 (非路径标识符)
```

- 文件定位：确定目标模块中具体的文件及文件类型

```
m1.js -> m1.json -> m1.node 根据拓展名去查找，先后顺序.
如果都没有，就把这个路径当作目录，当成一个包去处理.
在当前目录查找package.json文件，用parse解析
取出main.js -> main.json -> main.node
没有的话就取index作为目标文件中的具体名称
如果当前目录没有的话，就去上层找，一直找
```

- 编译执行：采用对应的方式完成文件的编译执行（不同文件，编译就不同)

```
js 文件的编译执行

使用fs模块，同步读入目标文件内容
对内容进行语法包装，生成可执行的js函数
调用时传入exports、module、require等属性值 (包装一个函数，里面的内容是文件内容)
```

### VM 模块的使用 (沙箱)

## 事件模块

> node.js 是基于事件驱动的异步操作架构，内置 events 模块

- events 模块提供了 EventEmitter 类
- node 中很多内置模块继承了 EventEmitter

### EventEmitter 常见 API

- on
- emit 触发事件，按照注册的顺序同步调用每个事件监听
- once
- off

## 事件循环