/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-08-18 10:01:46
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-19 11:29:09
 */
import { tmpPrint } from './tmp.js'
export default "num default"
export function print () {
  tmpPrint() 
  console.log('num.js print')
}