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

### 创建Buffer

- alloc: 创建指定字节大小的buffer
- allocUnsafe: (不安全)
- from: 接收数据，创建buffer

### 实例方法

- fill: 使用数据填充buffer
- wirte: 向buffer中写入数据
- toString: 从buffer中提取数据
- slice: 截取buffer
- indexof: buffer中查找数据
- copy

### 静态方法

- concat: 多个buffer拼接
- isBuffer

## FS

- 权限：rwx - 4 2 1 (win中默认是 0o666，可读可写不可执行)
- 用户：文件所有者-所有组-其他用户
- 常见flag操作符: r、w、s(同步)、+(执行相反操作)、x(排他操作)、a(追加)
- fd 就是操作系统分配给被打开文件的标识(文件描述符)

### 文件读写和拷贝操作

- readFile
- writeFile
- appendFile
- copyFile
- watchFile