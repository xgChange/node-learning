/**
 * @description 模拟可写流
 */

/**
 * 流程：
 *  1. 首先 fs.write
 *  2. 将剩下的东西入队列
 *  3. 执行 第一次 fs.write 的回调。将cache出队列
 *  4. 再执行 fs.write，重复上述操作
 *  5. 当队列为空时，抛出 drain 事件，代表又可以继续写了
 */