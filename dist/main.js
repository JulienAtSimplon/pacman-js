/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_characters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/characters */ \"./src/modules/characters.js\");\n\n\nconst root = document.getElementById('root');\n\n// General constants\nlet intervalGhostId = null;\n\nvar s = document.createElement( 'style' );\ns.innerHTML = _modules_characters__WEBPACK_IMPORTED_MODULE_0__.animMouth;\nroot.appendChild(s);\n\n// create elements\nconst screen = document.createElement('div');\nscreen.setAttribute('id', 'screen');\nscreen.style.display = 'flex';\nscreen.style.justifyContent = 'center';\nscreen.style.alignItems = 'center';\nscreen.style.width = '100%';\nscreen.style.height = '95vh';\n\n// initializing game elements\nconst pacMan = new _modules_characters__WEBPACK_IMPORTED_MODULE_0__.PacMan(350, 50, wallsInfos, foodsPosition);\n\n// Create Ghost\nfunction generateGhosts() {\n  const ghost1 = new _modules_characters__WEBPACK_IMPORTED_MODULE_0__.Ghost(350, 350, wallsInfos, pacMan);\n  gameFloor.appendChild(ghost1.getGhost());\n  intervalGhostId = setInterval(() => {\n    gameFloor.appendChild(new _modules_characters__WEBPACK_IMPORTED_MODULE_0__.Ghost(350, 350, wallsInfos, pacMan).getGhost());\n  }, 10000);\n}\n\n// Create walls\nconst walls = wallsInfos.map((wall, i) => {\n  const w = document.createElement('div');\n  w.setAttribute('id', `wall-${i}`);\n  w.style.width = `${wall.width}px`;\n  w.style.height = `${wall.height}px`;\n  w.style.border = '#3F51B5 7px double';\n  w.style.boxSizing = 'border-box';\n  w.style.borderRadius = '2px';\n  w.style.backgroundColor = 'black';\n  w.style.position = 'absolute';\n  w.style.top = `${wall.top}px`;\n  w.style.left = `${wall.left}px`;\n  return w;\n});\n\n// Create Food\nconst foods = foodsPosition.map((p, i) => {\n  const f = document.createElement('div');\n  f.setAttribute('id', p.id);\n  f.style.width = `${foodWidth}px`;\n  f.style.height = `${foodHeight}px`;\n  f.style.backgroundColor = foodColor;\n  f.style.position = \"absolute\";\n  f.style.top = `${p.top}px`;\n  f.style.left = `${p.left}px`;\n  return f;\n});\n\n\n// we inject the element on root\nwalls.forEach(wall => gameFloor.appendChild(wall));\nfoods.forEach(food => gameFloor.appendChild(food));\ngameFloor.appendChild(pacMan.getPacMan());\nscreen.appendChild(gameFloor);\nroot.appendChild(screen);\n\n// We create the ghosts\ngenerateGhosts();\n\n// Proto\n// proto(\"hello\");\n\n\n//# sourceURL=webpack://pacman/./src/index.js?");

/***/ }),

/***/ "./src/modules/characters.js":
/*!***********************************!*\
  !*** ./src/modules/characters.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PacMan\": () => (/* binding */ PacMan),\n/* harmony export */   \"Ghost\": () => (/* binding */ Ghost),\n/* harmony export */   \"animMouth\": () => (/* binding */ animMouth)\n/* harmony export */ });\n/* harmony import */ var _gaming__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gaming */ \"./src/modules/gaming.js\");\n/* harmony import */ var _stages_stage1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stages/stage1 */ \"./src/modules/stages/stage1.js\");\n// ### Characters parts ###\n\n\n\n// General constants\nconst step = 5;\nconst stepGhost = 5;\nconst sizePacman = 50;\nconst heightGhost = 40;\nconst widthGhost = 35;\nconst wallDistance = 2;\nconst maxFood = 88;\nconst foodAte = [];\nconst angleDirection = {\n  ArrowUp: -90,\n  ArrowDown: 90,\n  ArrowLeft: 180,\n  ArrowRight: 0,\n};\nconst directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];\nconst ghostLimitStraightLine = 100;\nconst colorsGhost = ['cyan', '#f5b041', '#e74c3c', '#e8daef'];\n\n// Classes of characters\nclass Character {\n    constructor(originalX, originalY, wallsInfo) {\n      this.posX = originalX;\n      this.posY = originalY;\n      this.direction = 'ArrowRight';\n      this.wallsInfo = wallsInfo;\n      return this;\n    }\n  \n    getDirection = () => this.direction;\n    \n    setDirection = direction => {\n      this.direction = direction;\n    }\n    getPosX = () => this.posX;\n    getPosY = () => {\n      return this.posY;\n    };\n    setPosX = posX => {\n      this.posX = posX;\n    }\n    setPosY = posY => {\n      this.posY = posY;\n    }\n    detectLimitVerticalFloor = nextVerticalMove => {\n      if(nextVerticalMove <= 0 || (nextVerticalMove + 50) >= _stages_stage1__WEBPACK_IMPORTED_MODULE_1__.heightFloor )\n        return false;\n      return true;\n    }\n    detectLimitHorizontalFloor = nextHorizontalMove => {\n      if((nextHorizontalMove - 25) <= 0 || (nextHorizontalMove + 25) >= 700 )\n        return false;\n      return true;\n    }\n    detectVerticalWalls = (nextVerticalMove, nextHorizontalMove) => {\n      let ok = true;\n      this.wallsInfo.forEach(wall => {\n        if(\n          (nextVerticalMove <= (_stages_stage1__WEBPACK_IMPORTED_MODULE_1__.heightFloor - wall.top + wallDistance) && nextVerticalMove >= (_stages_stage1__WEBPACK_IMPORTED_MODULE_1__.heightFloor - wall.top)) ||\n          ((nextVerticalMove + 50) >= (_stages_stage1__WEBPACK_IMPORTED_MODULE_1__.heightFloor - wall.top - wall.height - wallDistance ) && ((nextVerticalMove + 50) <= ((_stages_stage1__WEBPACK_IMPORTED_MODULE_1__.heightFloor - wall.top - wall.height))))\n        ) {\n          if(\n            ((nextHorizontalMove + 25) >= wall.left && (nextHorizontalMove - 25) <= (wall.left + wall.width))\n          ) {\n            ok = false;\n          }\n        }\n      })\n      return ok;\n    }\n    detectHorizontalWalls = (nextHorizontalMove, nextVerticalMove) => {\n      let ok = true;\n      this.wallsInfo.forEach(wall => {\n        if(\n          (((nextHorizontalMove + 25) >= (wall.left - wallDistance)) && ((nextHorizontalMove + 25) <= wall.left )) ||\n          (((nextHorizontalMove - 25) >= (wall.left + wall.width)) && ((nextHorizontalMove - 25) <= (wall.left + wall.width + wallDistance))) \n        ) {\n          if(\n            ((nextVerticalMove + 25) <= (_stages_stage1__WEBPACK_IMPORTED_MODULE_1__.heightFloor - wall.top)) && (nextVerticalMove >= (_stages_stage1__WEBPACK_IMPORTED_MODULE_1__.heightFloor - wall.top - wall.height))\n          ) {\n            ok = false;\n          }\n        }\n      })\n      return ok;\n    }\n  \n    handleMove = (move, step) => {\n      switch (move) {\n        case 'ArrowUp':\n          if(this.detectLimitVerticalFloor(this.posY + step)  && this.detectVerticalWalls(this.posY + step, this.posX)) {\n            this.posY = this.posY + step;\n            this.direction = 'ArrowUp';\n          }\n          break;\n        case 'ArrowDown':\n          if(this.detectLimitVerticalFloor(this.posY - step)  && this.detectVerticalWalls(this.posY - step, this.posX)) {\n            this.posY =  this.posY - step;\n            this.direction = 'ArrowDown';\n          }\n          break;\n        case 'ArrowRight':\n          if(this.detectLimitHorizontalFloor(this.posX + step) && this.detectHorizontalWalls(this.posX + step, this.posY)) {\n            this.posX = this.posX + step;\n            this.direction = 'ArrowRight';\n          }\n          break;\n        case 'ArrowLeft':\n          if(this.detectLimitHorizontalFloor(this.posX - step) && this.detectHorizontalWalls(this.posX - step, this.posY)) {\n            this.posX = this.posX - step;\n            this.direction = 'ArrowLeft';\n          }\n          break;\n        default:\n          break;\n      }\n    }\n  }\n  \nclass PacMan extends Character {\n    constructor (originalX, originalY, wallsInfo, foods) {\n      const _super = super(originalX, originalY, wallsInfo);\n      this._super = _super;\n      this.foodsInfo = foods;\n      this.countFoods = 0;\n      // Pac Body\n      this.pac = document.createElement('div');\n      this.pac.setAttribute('id', 'pacman');\n      this.pac.style.width = `${sizePacman}px`;\n      this.pac.style.height = `${sizePacman}px`;\n      this.pac.style.borderRadius = '25px';\n      this.pac.style.border = 'solid 2px black';\n      this.pac.style.backgroundColor = 'yellow';\n      this.pac.style.position = 'absolute';\n      this.pac.style.left = `${this.posX - 25}px`;\n      this.pac.style.bottom = `${this.posY}px`;\n      // Pac Mouth\n      const mouth = document.createElement('div');\n      mouth.style.backgroundColor = \"black\";\n      mouth.style.position = \"absolute\";\n      mouth.style.width = \"100%\";\n      mouth.style.height = \"100%\";\n      mouth.style.clipPath = \"polygon(100% 74%, 44% 48%, 100% 21%)\";\n      mouth.style.animationName = \"eat\";\n      mouth.style.animationDuration = \"0.7s\";\n      mouth.style.animationIterationCount = \"infinite\";\n      this.pac.appendChild(mouth);\n      this.initialization(this);\n    }\n  \n    initialization = (_self) => {\n      document.addEventListener('keydown', function(event) {\n        if (directions.includes(event.key)){\n          _self._super.handleMove(event.key, step)\n          _self.updatePosition();\n        }\n      });\n    }\n  \n    getPacMan = () => this.pac;\n  \n    getCountFood = () => this.countFoods;\n  \n    eatFood = () => {\n      this.foodsInfo.forEach((f, i) => {\n        // // We check if pac eat food vertically\n        if (Math.abs((_stages_stage1__WEBPACK_IMPORTED_MODULE_1__.heightFloor - f.top + _stages_stage1__WEBPACK_IMPORTED_MODULE_1__.foodHeight) - this.posY) <= 3 ||\n            Math.abs(this.posY + sizePacman - (_stages_stage1__WEBPACK_IMPORTED_MODULE_1__.heightFloor - f.top)) <= 3) {\n          // We check if pacman is align with food laterally\n          if(Math.abs(this.posX - f.left) < 10) {\n            const foodEl = document.getElementById(f.id);\n            if (foodEl) {\n              foodEl.style.display = 'none';\n              if (!foodAte.includes(f.id)) {\n                this.countFoods += 1;\n                foodAte.push(f.id);\n              }\n              if (this.countFoods === maxFood) {\n                (0,_gaming__WEBPACK_IMPORTED_MODULE_0__.Victory)();\n              }\n            }\n          }\n        }\n  \n        // We check if pac eat food laterally\n        if (Math.abs(this.posX + sizePacman - f.left) <= 3 ||\n            Math.abs(f.left + _stages_stage1__WEBPACK_IMPORTED_MODULE_1__.foodWidth - this.posX) <= 3) {\n          // We check if pacman is align with food vertically\n          if(Math.abs(this.posY - (_stages_stage1__WEBPACK_IMPORTED_MODULE_1__.heightFloor - f.top)) <= 40) {\n            const foodEl = document.getElementById(f.id);\n            if (foodEl) {\n              foodEl.style.display = 'none';\n              if (!foodAte.includes(f.id)) {\n                this.countFoods += 1;\n                foodAte.push(f.id);\n              }\n              if (this.countFoods === maxFood) {\n                (0,_gaming__WEBPACK_IMPORTED_MODULE_0__.Victory)();\n              }\n            }\n          }\n        }\n  \n      });\n    }\n  \n    updatePosition = () => {\n      this.pac.style.transform = `rotate(${angleDirection[this.direction]}deg)`;\n      this.pac.style.left = `${this.posX - 25}px`;\n      this.pac.style.bottom = `${this.posY}px`;\n      this.eatFood();\n    }\n  }\n  \nclass Ghost extends Character {\n    constructor (originalX, originalY, wallsInfo, pacman) {\n      const _super = super(originalX, originalY, wallsInfo);\n      this._super = _super;\n      this.pac = pacman;\n      this.countTop = 0;\n      this.countRight = 0;\n      this.switchLeft = false;\n      this.switchTop = false;\n      this.intervalId = null;\n      this.biasDirectionX = Math.floor(Math.random() * 100) % 2 == 0 ? \"ArrowRight\" : \"ArrowLeft\";\n      this.biasDirectionY = Math.floor(Math.random() * 100) % 2 == 0 ? \"ArrowUp\" : \"ArrowDown\";\n      // Ghost\n      // Take random color\n      const i = Math.floor(Math.random() * 4);\n      const eyes = document.createElement('div');\n      eyes.style.height = \"20px\";\n      eyes.style.width = `${widthGhost}px`;\n      eyes.style.display = 'flex';\n      eyes.style.justifyContent = 'space-around';\n      eyes.style.alignItems = 'flex-end';\n      const eye = document.createElement('div');\n      eye.style.backgroundColor = '#fff';\n      eye.style.height = '15px';\n      eye.style.width = '15px';\n      eye.style.borderRadius = '100%';\n      eye.style.display = 'flex';\n      eye.style.justifyContent = 'flex-start';\n      eye.style.alignItems = 'center';\n      const iris = document.createElement('div');\n      iris.style.backgroundColor = 'blue';\n      iris.style.height = '7px';\n      iris.style.width = '7px';\n      iris.style.borderRadius = '100%';\n      eye.appendChild(iris);\n      eyes.appendChild(eye);\n      const eye2 = eye.cloneNode();\n      const iris2 = iris.cloneNode();\n      eye2.appendChild(iris2);\n      eyes.appendChild(eye2);\n      const tail = document.createElement('div');\n      tail.style.backgroundRepeat = 'repeat-x';\n      tail.style.bottom = '-10px';\n      tail.style.height = '10px';\n      tail.style.position = 'absolute';\n      tail.style.width = '35px';\n      tail.style.background = `linear-gradient(-45deg, transparent 75%, ${colorsGhost[i]} 75%) 0 50%, linear-gradient( 45deg, transparent 75%, ${colorsGhost[i]} 75%) 0 50%`;\n      tail.style.backgroundSize = \"10px 10px, 10px 10px\";\n      this.ghost = document.createElement('div');\n      this.ghost.setAttribute('class', 'ghost');\n      this.ghost.style.height = `${heightGhost}px`;\n      this.ghost.style.width = `${widthGhost}px`;\n      this.ghost.style.borderRadius = '30% 30% 0 0'\n      this.ghost.style.backgroundColor = colorsGhost[i];\n      this.ghost.style.position = 'absolute';\n      this.ghost.style.left = `${this.posX - 25}px`;\n      this.ghost.style.bottom = `${this.posY}px`;\n      this.ghost.appendChild(eyes);\n      this.ghost.appendChild(tail);\n      this.initialization(this);\n    }\n  \n    initialization = (_self) => {\n      _self.intervalId = setInterval(() => {\n        function getRandomMove() {\n          let randomIndex = Math.floor(Math.random() * 4);\n          // incorporing bias\n          const rand1 = Math.floor(Math.random() * 100);\n          const rand2 = Math.floor(Math.random() * 100);\n          randomIndex = (randomIndex === 2 && rand1 % 2 === 0) ? 3 : randomIndex;\n          randomIndex = (randomIndex === 1 && rand2 % 2 === 0) ? 0 : randomIndex;\n          let randomMove = directions[randomIndex];\n          if(randomMove === 'ArrowUp' || randomMove === 'ArrowDown') {\n            if(_self.countTop < ghostLimitStraightLine && !_self.switchTop) {\n              randomMove = _self.biasDirectionY;\n              _self.countTop += 1;\n            } else if (_self.countTop == ghostLimitStraightLine && !_self.switchTop) {\n              _self.countTop = 0;\n              _self.switchTop = true;\n            }\n            if(_self.countTop < ghostLimitStraightLine && _self.switchTop) {\n              randomMove = _self.biasDirectionY === 'ArrowDown' ? 'ArrowUp' : 'ArrowDown';\n              _self.countTop += 1;\n            } else if (_self.countTop == ghostLimitStraightLine && _self.switchTop) {\n              _self.countTop = 0;\n              _self.switchTop = false;\n            }\n          } \n          if(randomMove === 'ArrowLeft' || randomMove === 'ArrowRight') {\n            if(_self.countRight < ghostLimitStraightLine && !_self.switchLeft) {\n              randomMove = _self.biasDirectionX;\n              _self.countRight += 1;\n            } else if (_self.countRight == ghostLimitStraightLine && !_self.switchLeft) {\n              _self.countRight = 0;\n              _self.switchLeft = true;\n            }\n            if(_self.countRight < ghostLimitStraightLine && _self.switchLeft) {\n              randomMove = _self.biasDirectionX === 'ArrowRight' ? 'ArrowLeft' : 'ArrowRight';\n              _self.countRight += 1;\n            } else if (_self.countRight == ghostLimitStraightLine && _self.switchLeft) {\n              _self.countRight = 0;\n              _self.switchLeft = false;\n            }\n          } \n            _self._super.handleMove(randomMove, stepGhost);\n            _self.updatePosition();\n          }\n        getRandomMove();\n      }, 70);\n    }\n  \n    getGhost = () => this.ghost;\n  \n    updatePosition = () => {\n      // We check if the ghost hit pacman vertically\n      if (Math.abs(this.posY - this.pac.getPosY() - sizePacman) < 15 ||\n          Math.abs(this.pac.getPosY() - this.posY - sizePacman)  < 15 \n      ) {\n        // We check if pacman is align with ghost laterally\n        if(Math.abs(this.posX - this.pac.getPosX()) < 25) {\n          clearInterval(this.intervalId);\n          (0,_gaming__WEBPACK_IMPORTED_MODULE_0__.GameOver)();\n        }\n      }\n      // We check if the ghost hit pacman laterally\n      if( Math.abs(this.pac.getPosX() + sizePacman - this.posX) < 10 ||\n          Math.abs(this.posX + widthGhost - this.pac.getPosX()) < 10\n      ) {\n        // We check if pacman is align with ghost vertically\n        if(Math.abs(this.pac.getPosY() - this.posY) < 25) {\n          clearInterval(this.intervalId);\n          (0,_gaming__WEBPACK_IMPORTED_MODULE_0__.GameOver)();\n        }\n      }\n      this.ghost.style.left = `${this.posX - 25}px`;\n      this.ghost.style.bottom = `${this.posY}px`;\n    }\n  }\n\n\n// Characters animation\nconst animMouth = \" @keyframes eat {\\\n    0% {\\\n      clip-path: polygon(100% 74%, 44% 48%, 100% 21%);\\\n    }\\\n    25% {\\\n      clip-path: polygon(100% 60%, 44% 48%, 100% 40%);\\\n    }\\\n    50% {\\\n      clip-path: polygon(100% 50%, 44% 48%, 100% 50%);\\\n    }\\\n    75% {\\\n      clip-path: polygon(100% 59%, 44% 48%, 100% 35%);\\\n    }\\\n    100% {\\\n      clip-path: polygon(100% 74%, 44% 48%, 100% 21%);\\\n    }\\\n  }\\ \";\n\n\n\n//# sourceURL=webpack://pacman/./src/modules/characters.js?");

/***/ }),

/***/ "./src/modules/gaming.js":
/*!*******************************!*\
  !*** ./src/modules/gaming.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameOver\": () => (/* binding */ GameOver),\n/* harmony export */   \"Victory\": () => (/* binding */ Victory)\n/* harmony export */ });\n/* harmony import */ var _stages_stage1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stages/stage1 */ \"./src/modules/stages/stage1.js\");\n// ### Gaming parts ###\n\n\n\nfunction GameOver() {\n    const card = document.createElement('div');\n    card.style.width = \"300px\";\n    card.style.height = \"300px\";\n    card.style.border = \"solid 3px #3F51B5\";\n    card.style.display = \"flex\";\n    card.style.justifyContent = \"center\";\n    card.style.alignItems = \"center\";\n    card.style.backgroundColor = \"black\";\n    card.style.zIndex= 999;\n    card.style.position = \"absolute\";\n    card.style.left = `${_stages_stage1__WEBPACK_IMPORTED_MODULE_0__.widthFloor/2 - 150}px`;\n    card.style.top = `${_stages_stage1__WEBPACK_IMPORTED_MODULE_0__.heightFloor/2 - 150}px`;\n    const text = document.createElement('div');\n    text.innerHTML = \"Game Over\";\n    text.style.color = \"red\";\n    text.style.fontWeight = \"bold\";\n    text.style.fontSize = \"40px\";\n    card.appendChild(text);\n    gameFloor.appendChild(card);\n}\n  \nfunction Victory() {\n    const card = document.createElement('div');\n    card.style.width = \"300px\";\n    card.style.height = \"300px\";\n    card.style.border = \"solid 3px #3F51B5\";\n    card.style.display = \"flex\";\n    card.style.justifyContent = \"center\";\n    card.style.alignItems = \"center\";\n    card.style.backgroundColor = \"black\";\n    card.style.zIndex= 999;\n    card.style.position = \"absolute\";\n    card.style.left = `${_stages_stage1__WEBPACK_IMPORTED_MODULE_0__.widthFloor/2 - 150}px`;\n    card.style.top = `${_stages_stage1__WEBPACK_IMPORTED_MODULE_0__.heightFloor/2 - 150}px`;\n    const text = document.createElement('div');\n    text.innerHTML = \"You won!!\";\n    text.style.color = \"red\";\n    text.style.fontWeight = \"bold\";\n    text.style.fontSize = \"40px\";\n    card.appendChild(text);\n    gameFloor.appendChild(card);\n}\n\n// export function proto(message) {\n//     console.log(message);\n// }\n\n//# sourceURL=webpack://pacman/./src/modules/gaming.js?");

/***/ }),

/***/ "./src/modules/stages/stage1.js":
/*!**************************************!*\
  !*** ./src/modules/stages/stage1.js ***!
  \**************************************/
/***/ (() => {

eval("throw new Error(\"Module parse failed: Duplicate export 'foodsPosition' (140:95)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n| ];\\n| \\n> export { widthFloor, heightFloor, foodHeight, foodWidth, foodColor, foodsPosition, wallsInfos, foodsPosition }\");\n\n//# sourceURL=webpack://pacman/./src/modules/stages/stage1.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;