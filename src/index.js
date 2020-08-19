/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-08-18 10:01:46
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-19 11:19:50
 */
import { print } from './num.js'
// es6导入es6模块
import es6importes6 from './es6'
import es6importcommon from './common'
let commonimportes6 = require('./es6_cp')
let commonimportcommon = require('./common_cp')

print()

// 因为走了__webpack_require__.t来转化
console.log(es6importes6, // es6 default
  es6importcommon, // { common: 1 }
  commonimportes6,  // { default: "es6 default",  obj: { es6: 1 }, __esModule: true }
  commonimportcommon)  // { common: 1 }

function button () {
  const button = document.createElement('button')
  const text = document.createTextNode('异步加载es6模块')
  button.appendChild(text)
  button.onclick = e => import('./info.js').then(res => {
    console.log(res.log)
  })
  return button
}

function button2 () {
  const button2 = document.createElement('button')
  const text2 = document.createTextNode('异步加载common模块')
  button2.appendChild(text2)
  button2.onclick = e => import('./info_c.js').then(res => {
    console.log(res.log)
  })
  return button2
}

document.body.appendChild(button())
document.body.appendChild(button2())