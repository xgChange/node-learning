/**
 * @description http
 */

const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  const { path, query } = url.parse(req.url, true)

  // console.log(path, query)
  const dataList = []
  req.on('data', (data) => {
    console.log(data.toString())
    dataList.push(data)
  })

  req.on('end', () => {
    console.log(Buffer.concat(dataList).toString())
    res.end(
      JSON.stringify({
        msg: '这是res',
        data: Buffer.concat(dataList).toString(),
      })
    )
  })
})

server.listen(1234, () => {
  console.log(`server is running on http://localhost:1234`)
})