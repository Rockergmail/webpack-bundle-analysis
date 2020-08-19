/******/ (function (modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback (data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for (; i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
						// 把__webpack_require__.e的promise的resolve方法收集起来
/******/ 				resolves.push(installedChunks[chunkId][0]);
				/******/
			}
/******/ 			installedChunks[chunkId] = 0;
			/******/
		}		// 模块注册
/******/ 		for (moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
				/******/
			}
			/******/
		}		// parentJsonpFunction就是数组的push方法，而且数组是指定了jsonpArray数组
/******/ 		if (parentJsonpFunction) parentJsonpFunction(data);
/******/		// 把__webpack_require__.e的promise的resolve执行掉，相当于promise完成了
/******/ 		while (resolves.length) {
/******/ 			resolves.shift()();
			/******/
		}
		/******/
		/******/
	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
		/******/
	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc (chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".main.js"
		/******/
	}
/******/	// 模块缓存
/******/ 	// The require function
/******/ 	function __webpack_require__ (moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
			/******/
		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
			/******/
		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
		/******/
	}
/******/	// 在body底部新建script加载chunk，用JSONP
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure (chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/		// chunk缓存
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if (installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if (installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
				/******/
			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function (resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
				/******/
			});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
					/******/
				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if (chunk !== 0) {
/******/ 						if (chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
							/******/
						}
/******/ 						installedChunks[chunkId] = undefined;
						/******/
					}
					/******/
				};
/******/ 				var timeout = setTimeout(function () {
/******/ 					onScriptComplete({ type: 'timeout', target: script });
					/******/
				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
				/******/
			}
			/******/
		}
/******/ 		return Promise.all(promises);
		/******/
	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
			// 为es6模块的属性定义getter方法
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
			/******/
		}
		/******/
	};
/******/	// 添加es6模块标识
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function (exports) {
/******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
			/******/
		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
		/******/
	};
/******/	// 智能导入模块，如果是commonjs，那就转换成es6
			// 这个有几个mode，相当于if else
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/* 二进制
      0b0001 ---> 1
      0b0010 ---> 2
      0b0100 ---> 4
      0b1000 ---> 8

      &与操作
         1001
      &  0001
      ---------
         0001 

      此处以0001为准，就看如果传过来的值最后一位是1，那就是true，否则就是false
      
      再举个例子

         1101
      &  0100
      ---------
         0100 

      此处以0100为准，就看如果传过来的值倒数第三位是1，那就是true，否则就是false

      所以效果就是mode传过来的二进制，1001，就相当于走1、8的逻辑
      所以效果就是mode传过来的二进制，0011，就相当于走1、2的逻辑

      let modules = {
        "moduleA": function(module, exports) {
          module.exports = "moduleA导出内容"
        },
        "moduleB": function(module, exports) {
          module.exports = { 
            __esModule: true,
            default: 'moduleB导出内容'
          }
        },
        "moduleC": function(module, exports) {
          module.exports = { name: 'moduleC导出内容'}
        }
      }
      
      __webpack_require__.t("moduleA", 0b1001) // 直接返回
      __webpack_require__.t("moduleB", 0b0101) // 返回es6模块
      __webpack_require__.t("moduleA", 0b1001) // 强制转换成es6再返回
  */
/******/ 	__webpack_require__.t = function (value, mode) {
/******/ 		if (mode & 1) value = __webpack_require__(value);
/******/ 		if (mode & 8) return value;
/******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
		/******/
	};
/******/	// 获取default值，兼容es6模块、commonjs模块
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
					// 如果是es6模块，直接返回default属性
/******/ 			function getDefault () { return module['default']; } :
					// 如果是commonjs模块，直接返回module
/******/ 			function getModuleExports () { return module; };
				// 指定a作为获取default的key
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
		/******/
	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function (err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray); // 原生数组的push方法
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
	/******/
})
/************************************************************************/
/******/({

/***/ "./src/common.js":
/*!***********************!*\
  !*** ./src/common.js ***!
  \***********************/
/*! no static exports found */
/***/ (function (module, exports) {
			// commonjs模块的打包，原封不动的返回，返回到installedModules[moduleId].exports
			module.exports = {
				common: 1
			}
			/***/
		}),

/***/ "./src/common_cp.js":
/*!**************************!*\
  !*** ./src/common_cp.js ***!
  \**************************/
/*! no static exports found */
/***/ (function (module, exports) {
			// commonjs模块的打包，同上处理
			module.exports = {
				common: 1
			}
			/***/
		}),

/***/ "./src/es6.js":
/*!********************!*\
  !*** ./src/es6.js ***!
  \********************/
/*! exports provided: default, obj */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
			// es6模块，要做以下的操作：
			"use strict";
			// installedModules[moduleId].exports添加es6模块标识
			__webpack_require__.r(__webpack_exports__);
			/* harmony export (binding) */
			// installedModules[moduleId].exports添加属性，并添加对应的Getter方法
			__webpack_require__.d(__webpack_exports__, "obj", function () { return obj; });
			/* harmony default export */
			// installedModules[moduleId].exports添加default属性
			__webpack_exports__["default"] = ("es6 default");
			const obj = {
				es6: 1
			}
			/***/
		}),

/***/ "./src/es6_cp.js":
/*!***********************!*\
  !*** ./src/es6_cp.js ***!
  \***********************/
/*! exports provided: default, obj */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
			// es6模块，同上处理
			"use strict";
			__webpack_require__.r(__webpack_exports__);
			/* harmony export (binding) */
			__webpack_require__.d(__webpack_exports__, "obj", function () { return obj; });
			/* harmony default export */
			__webpack_exports__["default"] = ("es6 default");
			const obj = {
				es6: 1
			}

			/***/
		}),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

			"use strict";
			// 添加es6模块标识
			__webpack_require__.r(__webpack_exports__);
			/* harmony import */
			var _num_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./num.js */ "./src/num.js");
			/* harmony import */
			var _es6__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./es6 */ "./src/es6.js");
			/* harmony import */
			var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "./src/common.js");
			/* harmony import */
			var _common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_common__WEBPACK_IMPORTED_MODULE_2__);

			let commonimportes6 = __webpack_require__(/*! ./es6_cp */ "./src/es6_cp.js")
			let commonimportcommon = __webpack_require__(/*! ./common_cp */ "./src/common_cp.js")

			// 执行num.js的print函数
			Object(_num_js__WEBPACK_IMPORTED_MODULE_0__["print"])()
			// 用es6导入es6模块
			console.log(_es6__WEBPACK_IMPORTED_MODULE_1__["default"], // es6 default
				// 用es6导入commonjs模块，其中a是__webpack_require__.n用r方法指定获取default的key
				_common__WEBPACK_IMPORTED_MODULE_2___default.a, // { common: 1 }
				commonimportes6,  // { default: "es6 default",  obj: { es6: 1 }, __esModule: true }
				commonimportcommon)  // { common: 1 }

			function button () {
				const button = document.createElement('button')
				const text = document.createTextNode('异步加载es6模块')
				button.appendChild(text)
				// __webpack_require__.e异步加载chunk，并注册对应的modules
				// __webpack_require__加载模块
				button.onclick = e => __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./info.js */ "./src/info.js")).then(res => {
					console.log(res.log)
				})
				return button
			}

			function button2 () {
				const button2 = document.createElement('button')
				const text2 = document.createTextNode('异步加载common模块')
				button2.appendChild(text2)
				// __webpack_require__.e异步加载chunk，并注册对应的modules
				// __webpack_require__.t转换为es6模块并返回模块内容，所以传了7，就是0b0111，所以会执行mode：1、2、4
				button2.onclick = e => __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.t.bind(null, /*! ./info_c.js */ "./src/info_c.js", 7)).then(res => {
					console.log(res.log)
				})
				return button2
			}

			document.body.appendChild(button())
			document.body.appendChild(button2())

			/***/
		}),

/***/ "./src/num.js":
/*!********************!*\
  !*** ./src/num.js ***!
  \********************/
/*! exports provided: default, print */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

			"use strict";
			__webpack_require__.r(__webpack_exports__);
			/* harmony export (binding) */
			__webpack_require__.d(__webpack_exports__, "print", function () { return print; });
			/* harmony import */
			// 引用模块
			var _tmp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tmp.js */ "./src/tmp.js");
			/* harmony default export */
			__webpack_exports__["default"] = ("num default");
			function print () {
				// 执行tmpPrint方法
				Object(_tmp_js__WEBPACK_IMPORTED_MODULE_0__["tmpPrint"])()
				console.log('num.js print')
			}

			/***/
		}),

/***/ "./src/tmp.js":
/*!********************!*\
  !*** ./src/tmp.js ***!
  \********************/
/*! exports provided: tmpPrint */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
			"use strict";
			__webpack_require__.r(__webpack_exports__);
			/* harmony export (binding) */
			__webpack_require__.d(__webpack_exports__, "tmpPrint", function () { return tmpPrint; });
			function tmpPrint () {
				console.log('tmp.js print')
			}
			/***/
		})
	/******/
});