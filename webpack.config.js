/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-08-18 10:01:46
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-18 20:07:01
 */
const path = require('path')

module.exports = {
  entry: './src/index.js',
  // entry: './src/test.js',
  // 为了利于分析打包后的代码，这里选择开发模式
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js'
  }
}