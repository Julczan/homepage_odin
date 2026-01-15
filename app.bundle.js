/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 56
(module, __unused_webpack_exports, __webpack_require__) {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ },

/***/ 72
(module) {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ },

/***/ 113
(module) {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ },

/***/ 314
(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ },

/***/ 354
(module) {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ },

/***/ 365
(module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* CSS RESET */
/* 1. Use a more-intuitive box-sizing model */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* 2. Remove default margin */
*:not(dialog) {
  margin: 0;
}

/* 3. Enable keyword animations */
@media (prefers-reduced-motion: no-preference) {
  html {
    interpolate-size: allow-keywords;
  }
}

body {
  /* 4. Add accessible line-height */
  line-height: 1.5;
  /* 5. Improve text rendering */
  -webkit-font-smoothing: antialiased;
}

/* 6. Improve media defaults */
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

/* 7. Inherit fonts for form controls */
input,
button,
textarea,
select {
  font: inherit;
}

/* 8. Avoid text overflows */
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

/* 9. Improve line wrapping */
p {
  text-wrap: pretty;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}

/*

/*  */

@keyframes slide-in {
  from {
    transform: skewY(0deg);
    opacity: 0;
  }
  to {
    transform: skewY(8deg);
    opacity: 1;
  }
}

body {
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: center;
}

.portrait {
  max-width: 400px;
}

h1,
.portrait-text {
  font-family: "UnifrakturCook";
}

.portrait-text {
  font-size: 2rem;
  position: absolute;
  color: white;
  bottom: 0;
  left: 110px;
}

.icon {
  width: 32px;
  height: 32px;
  will-change: transform;
  transition: transform 300ms;
}

.icon:hover {
  transform: scale(1.1);
}

header {
  margin-bottom: 60px;
  max-width: 1100px;
}

header::before {
  content: "";
  width: 100%;
  height: 500px;
  position: absolute;
  z-index: -1;
  top: -48 px;
  left: 0;
  background: rgb(1, 30, 0);
  transform: skewY(8deg);
  will-change: transform;
  animation: slide-in 1000ms ease-out;
  animation-fill-mode: backwards;
  box-shadow: 5px 5px 5px rgba(108, 108, 108, 0.321);
}

footer::before {
  content: "";
  width: 100%;
  height: 400px;
  position: absolute;
  background: rgb(1, 30, 0);
  z-index: -1;
  left: 0;
  box-shadow: 5px 5px 5px rgba(108, 108, 108, 0.321);
}

.hyper-git {
  position: absolute;
  right: 10px;
  top: 10px;
}

.hyper-ext {
  position: absolute;
  right: 45px;
  top: 10px;
}

.projects {
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-top: 20px;
  margin-bottom: 80px;
}

.card-container {
  position: relative;
  padding: 10px;
}

.card {
  border: solid rgba(0, 0, 0, 0.321) 1px;
  will-change: transform;
  transition: transform 500ms;
  box-shadow: 5px 5px 5px rgba(108, 108, 108, 0.321);
  display: grid;
  grid-template-rows: 1fr 0.25fr;
}

.card:hover {
  transform: scale(1.05);
  transition: transform 125ms;
}

.portrait-container {
  position: relative;
  float: left;
  margin-right: 20px;
  box-shadow: 5px 5px 5px rgba(108, 108, 108, 0.321);
}

.icons-container {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.about-me {
  margin-top: 160px;
  border: solid rgba(0, 0, 0, 0.332) 1px;
  padding: 20px;
  box-shadow: 5px 5px 5px rgba(108, 108, 108, 0.321);
  background-color: white;
}

.footer-img {
  max-width: 400px;
  box-shadow: 5px 5px 5px rgba(108, 108, 108, 0.321);
}
.screenshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

footer {
  display: flex;
  gap: 20px;
  max-width: 1100px;
  color: white;
  align-items: center;
}

@media (max-width: 600px) {
  h1 {
    text-align: center;
  }

  header,
  footer {
    display: flex;
    gap: 20px;
    flex-direction: column;
    align-items: center;
  }
  .about-me {
    margin-top: 0;
  }
  .portrait-container {
    margin-right: 0;
  }
  .portrait {
    max-width: 300px;
  }

  .footer-img {
    max-width: 300px;
  }
  body {
    margin: 10px;
  }

  footer::before {
    height: 620px;
  }
}

@media (min-width: 1100px) {
  .projects {
    max-width: 1100px;
  }
}
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA,cAAc;AACd,6CAA6C;AAC7C;;;EAGE,sBAAsB;AACxB;;AAEA,6BAA6B;AAC7B;EACE,SAAS;AACX;;AAEA,iCAAiC;AACjC;EACE;IACE,gCAAgC;EAClC;AACF;;AAEA;EACE,kCAAkC;EAClC,gBAAgB;EAChB,8BAA8B;EAC9B,mCAAmC;AACrC;;AAEA,8BAA8B;AAC9B;;;;;EAKE,cAAc;EACd,eAAe;AACjB;;AAEA,uCAAuC;AACvC;;;;EAIE,aAAa;AACf;;AAEA,4BAA4B;AAC5B;;;;;;;EAOE,yBAAyB;AAC3B;;AAEA,6BAA6B;AAC7B;EACE,iBAAiB;AACnB;AACA;;;;;;EAME,kBAAkB;AACpB;;AAEA;;KAEK;;AAEL;EACE;IACE,sBAAsB;IACtB,UAAU;EACZ;EACA;IACE,sBAAsB;IACtB,UAAU;EACZ;AACF;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;EAEE,6BAA6B;AAC/B;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,YAAY;EACZ,SAAS;EACT,WAAW;AACb;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,sBAAsB;EACtB,2BAA2B;AAC7B;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,WAAW;EACX,WAAW;EACX,aAAa;EACb,kBAAkB;EAClB,WAAW;EACX,WAAW;EACX,OAAO;EACP,yBAAyB;EACzB,sBAAsB;EACtB,sBAAsB;EACtB,mCAAmC;EACnC,8BAA8B;EAC9B,kDAAkD;AACpD;;AAEA;EACE,WAAW;EACX,WAAW;EACX,aAAa;EACb,kBAAkB;EAClB,yBAAyB;EACzB,WAAW;EACX,OAAO;EACP,kDAAkD;AACpD;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,SAAS;AACX;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,SAAS;AACX;;AAEA;EACE,aAAa;EACb,SAAS;EACT,4DAA4D;EAC5D,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,aAAa;AACf;;AAEA;EACE,sCAAsC;EACtC,sBAAsB;EACtB,2BAA2B;EAC3B,kDAAkD;EAClD,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,sBAAsB;EACtB,2BAA2B;AAC7B;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,kBAAkB;EAClB,kDAAkD;AACpD;;AAEA;EACE,aAAa;EACb,SAAS;EACT,yBAAyB;EACzB,gBAAgB;AAClB;;AAEA;EACE,iBAAiB;EACjB,sCAAsC;EACtC,aAAa;EACb,kDAAkD;EAClD,uBAAuB;AACzB;;AAEA;EACE,gBAAgB;EAChB,kDAAkD;AACpD;AACA;EACE,WAAW;EACX,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,SAAS;EACT,iBAAiB;EACjB,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE;IACE,kBAAkB;EACpB;;EAEA;;IAEE,aAAa;IACb,SAAS;IACT,sBAAsB;IACtB,mBAAmB;EACrB;EACA;IACE,aAAa;EACf;EACA;IACE,eAAe;EACjB;EACA;IACE,gBAAgB;EAClB;;EAEA;IACE,gBAAgB;EAClB;EACA;IACE,YAAY;EACd;;EAEA;IACE,aAAa;EACf;AACF;;AAEA;EACE;IACE,iBAAiB;EACnB;AACF","sourcesContent":["/* CSS RESET */\n/* 1. Use a more-intuitive box-sizing model */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/* 2. Remove default margin */\n*:not(dialog) {\n  margin: 0;\n}\n\n/* 3. Enable keyword animations */\n@media (prefers-reduced-motion: no-preference) {\n  html {\n    interpolate-size: allow-keywords;\n  }\n}\n\nbody {\n  /* 4. Add accessible line-height */\n  line-height: 1.5;\n  /* 5. Improve text rendering */\n  -webkit-font-smoothing: antialiased;\n}\n\n/* 6. Improve media defaults */\nimg,\npicture,\nvideo,\ncanvas,\nsvg {\n  display: block;\n  max-width: 100%;\n}\n\n/* 7. Inherit fonts for form controls */\ninput,\nbutton,\ntextarea,\nselect {\n  font: inherit;\n}\n\n/* 8. Avoid text overflows */\np,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  overflow-wrap: break-word;\n}\n\n/* 9. Improve line wrapping */\np {\n  text-wrap: pretty;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  text-wrap: balance;\n}\n\n/*\n\n/*  */\n\n@keyframes slide-in {\n  from {\n    transform: skewY(0deg);\n    opacity: 0;\n  }\n  to {\n    transform: skewY(8deg);\n    opacity: 1;\n  }\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  margin: 10px;\n  align-items: center;\n}\n\n.portrait {\n  max-width: 400px;\n}\n\nh1,\n.portrait-text {\n  font-family: \"UnifrakturCook\";\n}\n\n.portrait-text {\n  font-size: 2rem;\n  position: absolute;\n  color: white;\n  bottom: 0;\n  left: 110px;\n}\n\n.icon {\n  width: 32px;\n  height: 32px;\n  will-change: transform;\n  transition: transform 300ms;\n}\n\n.icon:hover {\n  transform: scale(1.1);\n}\n\nheader {\n  margin-bottom: 60px;\n  max-width: 1100px;\n}\n\nheader::before {\n  content: \"\";\n  width: 100%;\n  height: 500px;\n  position: absolute;\n  z-index: -1;\n  top: -48 px;\n  left: 0;\n  background: rgb(1, 30, 0);\n  transform: skewY(8deg);\n  will-change: transform;\n  animation: slide-in 1000ms ease-out;\n  animation-fill-mode: backwards;\n  box-shadow: 5px 5px 5px rgba(108, 108, 108, 0.321);\n}\n\nfooter::before {\n  content: \"\";\n  width: 100%;\n  height: 400px;\n  position: absolute;\n  background: rgb(1, 30, 0);\n  z-index: -1;\n  left: 0;\n  box-shadow: 5px 5px 5px rgba(108, 108, 108, 0.321);\n}\n\n.hyper-git {\n  position: absolute;\n  right: 10px;\n  top: 10px;\n}\n\n.hyper-ext {\n  position: absolute;\n  right: 45px;\n  top: 10px;\n}\n\n.projects {\n  display: grid;\n  gap: 30px;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  margin-top: 20px;\n  margin-bottom: 80px;\n}\n\n.card-container {\n  position: relative;\n  padding: 10px;\n}\n\n.card {\n  border: solid rgba(0, 0, 0, 0.321) 1px;\n  will-change: transform;\n  transition: transform 500ms;\n  box-shadow: 5px 5px 5px rgba(108, 108, 108, 0.321);\n  display: grid;\n  grid-template-rows: 1fr 0.25fr;\n}\n\n.card:hover {\n  transform: scale(1.05);\n  transition: transform 125ms;\n}\n\n.portrait-container {\n  position: relative;\n  float: left;\n  margin-right: 20px;\n  box-shadow: 5px 5px 5px rgba(108, 108, 108, 0.321);\n}\n\n.icons-container {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  margin-top: 20px;\n}\n\n.about-me {\n  margin-top: 160px;\n  border: solid rgba(0, 0, 0, 0.332) 1px;\n  padding: 20px;\n  box-shadow: 5px 5px 5px rgba(108, 108, 108, 0.321);\n  background-color: white;\n}\n\n.footer-img {\n  max-width: 400px;\n  box-shadow: 5px 5px 5px rgba(108, 108, 108, 0.321);\n}\n.screenshot {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\nfooter {\n  display: flex;\n  gap: 20px;\n  max-width: 1100px;\n  color: white;\n  align-items: center;\n}\n\n@media (max-width: 600px) {\n  h1 {\n    text-align: center;\n  }\n\n  header,\n  footer {\n    display: flex;\n    gap: 20px;\n    flex-direction: column;\n    align-items: center;\n  }\n  .about-me {\n    margin-top: 0;\n  }\n  .portrait-container {\n    margin-right: 0;\n  }\n  .portrait {\n    max-width: 300px;\n  }\n\n  .footer-img {\n    max-width: 300px;\n  }\n  body {\n    margin: 10px;\n  }\n\n  footer::before {\n    height: 620px;\n  }\n}\n\n@media (min-width: 1100px) {\n  .projects {\n    max-width: 1100px;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ 540
(module) {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ },

/***/ 659
(module) {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ },

/***/ 825
(module) {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/styles.css
var styles = __webpack_require__(365);
;// ./src/styles.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(styles/* default */.A, options);




       /* harmony default export */ const src_styles = (styles/* default */.A && styles/* default */.A.locals ? styles/* default */.A.locals : undefined);

;// ./src/assets/icons/open-in-new.svg
const open_in_new_namespaceObject = __webpack_require__.p + "3ede19ed228086e87d89.svg";
;// ./src/modules/projectCard.js


function createCard(name, description, externalHyper, githubHyper, imgSrc) {
  const screenshot = document.createElement("img");
  const githubIcon = document.createElement("img");
  const externalIcon = document.createElement("img");
  const hyperLinkGit = document.createElement("a");
  const hyperLinkExt = document.createElement("a");
  const card = document.createElement("div");
  const container = document.createElement("div");
  const projectName = document.createElement("h2");
  const projectDesc = document.createElement("p");

  screenshot.src = imgSrc;
  githubIcon.src =
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg";
  externalIcon.src = open_in_new_namespaceObject;
  projectName.textContent = name;
  hyperLinkExt.href = externalHyper;
  hyperLinkGit.href = githubHyper;
  projectDesc.textContent = description;

  screenshot.classList.add("screenshot");
  githubIcon.classList.add("icon");
  externalIcon.classList.add("icon");
  card.classList.add("card");
  container.classList.add("card-container");
  hyperLinkGit.classList.add("hyper-git");
  hyperLinkExt.classList.add("hyper-ext");

  hyperLinkGit.appendChild(githubIcon);
  hyperLinkExt.appendChild(externalIcon);

  card.appendChild(screenshot);
  container.appendChild(projectName);
  container.appendChild(projectDesc);
  container.appendChild(hyperLinkGit);
  container.appendChild(hyperLinkExt);
  card.appendChild(container);

  return card;
}



;// ./src/assets/images/Battleship.png
const Battleship_namespaceObject = __webpack_require__.p + "7a0436d550f17cb0abfe.png";
;// ./src/assets/images/weather-app.png
const weather_app_namespaceObject = __webpack_require__.p + "670afc24a54271870251.png";
;// ./src/assets/images/to-do.png
const to_do_namespaceObject = __webpack_require__.p + "4a465eab3a91c32bef01.png";
;// ./src/assets/images/calculator.png
const calculator_namespaceObject = __webpack_require__.p + "3fc379630885836ffac2.png";
;// ./src/assets/images/etch-a-sketch.png
const etch_a_sketch_namespaceObject = __webpack_require__.p + "130c9662aca7f999dd44.png";
;// ./src/assets/images/tic-tac.png
const tic_tac_namespaceObject = __webpack_require__.p + "58a99b7f6b6ea399cea8.png";
;// ./src/index.js









const projectContainer = document.querySelector(".projects");

const battleship = createCard(
  "Battleship",
  "Battleship game",
  "https://julczan.github.io/battleship_odin/",
  "https://github.com/Julczan/battleship_odin",
  Battleship_namespaceObject
);

const weather = createCard(
  "Weather App",
  "Weather App made in HTML, CSS and JS",
  "https://julczan.github.io/weather_app_odin/",
  "https://github.com/Julczan/weather_app_odin",
  weather_app_namespaceObject
);

const toDo = createCard(
  "To Do List App",
  "To Do List App",
  "https://julczan.github.io/to-do-list/",
  "https://github.com/Julczan/to-do-list",
  to_do_namespaceObject
);
const calculator = createCard(
  "Calculator Project",
  "Calculator made in HTML, CSS and JS",
  "https://julczan.github.io/calculator_TOP/",
  "https://github.com/Julczan/calculator_TOP",
  calculator_namespaceObject
);
const sketch = createCard(
  "Etch a sketch",
  "Etch a sketch project",
  "https://julczan.github.io/etch-a-sketch/",
  "https://github.com/Julczan/etch-a-sketch",
  etch_a_sketch_namespaceObject
);
const tictactoe = createCard(
  "Project name",
  "Short description of the project",
  "https://julczan.github.io/odin_tic-tac-toe/",
  "https://github.com/Julczan/odin_tic-tac-toe",
  tic_tac_namespaceObject
);

projectContainer.appendChild(battleship);
projectContainer.appendChild(weather);
projectContainer.appendChild(toDo);
projectContainer.appendChild(calculator);
projectContainer.appendChild(sketch);
projectContainer.appendChild(tictactoe);

/******/ })()
;
//# sourceMappingURL=app.bundle.js.map