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

/***/ "./src/classes/icemagic.js":
/*!*********************************!*\
  !*** ./src/classes/icemagic.js ***!
  \*********************************/
/***/ (() => {

eval("class IceMagic {\n  constructor(app) {\n    this.stage = app.stage;\n    this.stage.hitArea = app.screen;\n\n    // UI Element Settings\n    this.stageHeight = app.screen.height;\n    this.stageWidth = app.screen.width;\n    this.sliderWidth = this.stageWidth * 0.8;\n    this.pathPoints = 0;\n\n    // Path Travelling Settings\n    this.pathTime = 1000; // Milliseconds to travel between 2 points\n    this.pathSpeed = 1 / this.pathTime; // Distance between 2 points is 1\n    this.movement = new PIXI.Ticker();\n\n    // Initialize eventManager\n    this.eventManager = new EventManager();\n    this.eventManager.subscribe(\"increment\", this.updatePathPoints.bind(this));\n    this.stage.eventMode = \"static\";\n\n    this.stage.on(\"pointerdown\", (e) => {\n      this.eventManager.notify(\"deselect\");\n      this.createEntityTicker = this.startCreateEntity(e);\n    });\n\n    this.stage.on(\"pointerup\", () => {\n      if (this.createEntityTicker !== undefined) {\n        this.createEntityTicker.stop();\n      }\n    });\n\n    // Initialize entities list\n    this.entities = [];\n    this.init();\n  }\n\n  init() {\n    this.slider = new Slider(\n      (this.stageWidth - this.sliderWidth) / 2,\n      this.stageHeight * 0.9,\n      this.sliderWidth,\n      this.stage,\n      this.moveEntities.bind(this)\n    );\n\n    this.movement.add((ticker) => {\n      this.movement_accum += ticker.deltaMS * this.pathSpeed;\n      this.entities.forEach((e) => {\n        if (!e.atEnd()) {\n          e.pathPosition(this.movement_accum);\n        }\n      });\n\n      if (this.entities.every((e) => e.atEnd())) {\n        this.movement.stop();\n      }\n    });\n\n    this.startButton = new PIXI.Graphics()\n      .circle(this.stageWidth / 2, this.stageHeight * 0.94, 20)\n      .fill(0xe76f51);\n    this.startButton.eventMode = \"static\";\n    this.startButton.on(\"pointerdown\", () => {\n      console.log(\"start\");\n      this.movement_accum = 0;\n      this.entities.forEach((e) => {\n        e.pathPosition(0);\n      });\n      this.movement.start();\n    });\n    this.stage.addChild(this.startButton);\n  }\n\n  startCreateEntity(e) {\n    let ticker = new PIXI.Ticker();\n    let accumulator = 0;\n    ticker.add((t) => {\n      accumulator += t.deltaMS;\n      console.log(accumulator);\n      if (accumulator >= 500) {\n        this.entities.push(this.createEntity(e.global.x, e.global.y));\n        t.stop();\n      }\n    });\n    ticker.start();\n    return ticker;\n  }\n\n  createEntity(x, y) {\n    return new Entity(x, y, this.stage, this.pathTime, this.eventManager);\n  }\n\n  moveEntities(t) {\n    let norm_t = t * this.pathPoints;\n    this.entities.forEach((e) => {\n      e.pathPosition(norm_t);\n    });\n\n    console.log(norm_t);\n  }\n\n  updatePathPoints(p) {\n    this.pathPoints = Math.max(this.pathPoints, p - 1);\n    console.log(this.pathPoints);\n  }\n}\n\n\n//# sourceURL=webpack://icemagic/./src/classes/icemagic.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/classes/icemagic.js"]();
/******/ 	
/******/ })()
;