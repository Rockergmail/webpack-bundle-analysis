<!--
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-08-19 11:31:11
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-19 15:22:30
-->
webpack打包结果分析：
1. chunk的概念是把多个模块按照依赖关系打包在一起，详见源码```webpackJsonpCallback```函数
2. 把index.js作为入口，分析依赖，打成一个main.js
   1. index.js-->num.js-->tmp.js
   2. index.js-->common.js
   3. index.js-->common_cp.js
   4. index.js-->es6.js
   5. index.js-->es6_cp.js
3. 使用import()语法，把对应的模块作为入口，分析依赖，打成独立的chunk
   1. info.js ~~打包~~> 0.main.js
   2. info_c.js ~~打包~~> 1.main.js

源码分析：
1. 自执行函数，参数是一个对象，key是入口文件依赖模块的路径，value是依赖模块的代码，其中模块的代码做了es6模块的兼容
2. 默认执行__webpack_require__，加载并执行入口模块index.js。__webpack_require__还做了模块缓存的功能
3. 所有es6模块，都做了兼容操作：对installedModules[moduleId].exports添加es6模块标记、设置属性getter、设置default值
4. 所有commonjs模块，原封不动
5. 用es6方法导入es6模块，正常
6. 用es6方法导入commonjs模块，正常，因为只需要再用__webpack_require__.n模拟一下default的返回就ok，commonjs没有default值，指向的是module.exports
7. 用commonjs方法导入commonjs模块，正常
8. 用commonjs方法导入es6模块，返回的是installedModules[moduleId].exports，不正常 // { default: "es6 default",  obj: { es6: 1 }, __esModule: true }
9. 遇到异步chunk，就用__webpack_require__.e加载，如果是es6模块，就用__webpack_require__加载进来，如果是commonjs模块，就用__webpack_require__.t转成es6模块再加载进来
10. __webpack_require__.e，就是加载script标签加载chunk代码，原理就是jsonp；设定了promise，并返回，主要是用于跟踪chunk的加载
11. chunk的代码执行，调用webpackJsonpCallback方法，就是加载chunk，注册模块，并把__webpack_require__.e的promise将其resolve掉，以示加载完chunk
12. 如果是commonjs模块，就用__webpack_require__.t转换成es6模块，代码示例中mode传参了7，就是相当于二进制0b0111，也就是mode1、2、4都会执行