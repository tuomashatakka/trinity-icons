var main =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(40)('wks')
  , uid        = __webpack_require__(42)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(0)
  , ctx       = __webpack_require__(34)
  , hide      = __webpack_require__(7)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(8)
  , createDesc = __webpack_require__(17);
module.exports = __webpack_require__(5) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(4)
  , IE8_DOM_DEFINE = __webpack_require__(62)
  , toPrimitive    = __webpack_require__(80)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(25);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(14);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(52), __esModule: true };

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(74)
  , enumBugKeys = __webpack_require__(36);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(40)('keys')
  , uid    = __webpack_require__(42);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(37)
  , defined = __webpack_require__(14);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(78)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(38)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIZE_FACTOR = exports.PREVIEW_SIZE = exports.ACTION = exports.INPUT_TYPE_RADIO = exports.INPUT_TYPE_CHECKBOX = undefined;

var _toConsumableArray2 = __webpack_require__(9);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _IconCatalog = __webpack_require__(24);

var _utils = __webpack_require__(48);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INPUT_TYPE_CHECKBOX = exports.INPUT_TYPE_CHECKBOX = 'checkbox';
var INPUT_TYPE_RADIO = exports.INPUT_TYPE_RADIO = 'radio';

var ACTION = exports.ACTION = {
  search: function search(value) {
    return (0, _IconCatalog.catalog)().query(value.trim());
  },
  variant: function variant(value) {
    var _catalog;

    return (_catalog = (0, _IconCatalog.catalog)()).updateVariants.apply(_catalog, (0, _toConsumableArray3.default)(value));
  },
  stroke: function stroke() {
    return (0, _utils.updatePreviewStyles)();
  },
  color: function color() {
    return (0, _utils.updatePreviewStyles)();
  },
  size: function size() {
    return (0, _utils.updatePreviewStyles)();
  }
};
var PREVIEW_SIZE = exports.PREVIEW_SIZE = {
  xsmall: '24px',
  small: '48px',
  medium: '80px',
  large: '160px',
  huge: '320px'
};
var SIZE_FACTOR = exports.SIZE_FACTOR = {
  xsmall: 10,
  small: 8,
  medium: 6,
  large: 4,
  huge: 2
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.input = undefined;

var _getIterator2 = __webpack_require__(13);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _defineProperty2 = __webpack_require__(30);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = __webpack_require__(31);

var _extends4 = _interopRequireDefault(_extends3);

var _toConsumableArray2 = __webpack_require__(9);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _from = __webpack_require__(25);

var _from2 = _interopRequireDefault(_from);

exports.assertElement = assertElement;
exports.createElement = createElement;
exports.setElementContents = setElementContents;
exports.getElementContents = getElementContents;
exports.appendChildElement = appendChildElement;
exports.attachBefore = attachBefore;
exports.attachAfter = attachAfter;
exports.default = extendHTMLElementPrototype;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * DOM Utility functions
 * @module dom
 */

var INPUT_TYPE_CHECKBOX = 'checkbox';
var INPUT_TYPE_RADIO = 'radio';
var isCheckbox = function isCheckbox(_ref) {
  var type = _ref.type;
  return INPUT_TYPE_CHECKBOX === type;
};
var isRadio = function isRadio(_ref2) {
  var type = _ref2.type;
  return INPUT_TYPE_RADIO === type;
};

var input = exports.input = {
  value: function value(el) {

    if (isCheckbox(el)) return (0, _from2.default)(el.parentElement.parentElement.querySelectorAll('input[name="' + el.name + '"]')).filter(function (el) {
      return el.checked;
    }).map(function (el) {
      return el.value;
    });

    if (isRadio(el)) {
      var match = (0, _from2.default)(el.parentElement.parentElement.querySelectorAll('input[name="' + el.name + '"]')).find(function (el) {
        return el.checked;
      });
      return match ? match.value : null;
    }

    return el.value;
  }
};

function assertElement(elem) {
  if (typeof type === 'string') return document.createElement(elem);
  return elem;
}

function createElement(elem) {
  var create = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


  if (typeof elem === 'string') return document.createElement(elem);

  if (typeof elem.cloneNode === 'function') return elem.cloneNode(true);

  return create ? document.createElement('div') : null;
}

function setElementContents() {
  var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var html = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


  var element = assertElement(this);

  if (typeof content === 'string') element[html ? 'innerHTML' : 'textContent'] = content;else if (content.appendChild) element.appendChild(content);else throw new Error('Trying to insert invalid content into an HTML element.');

  return element;
}

function getElementContents() {

  var targetElement = assertElement(this);

  return targetElement.childNodeCount > 0 ? [].concat((0, _toConsumableArray3.default)(targetElement.children)) : targetElement.innerHTML;
}

function appendChildElement(elem) {
  var targetElement = assertElement(this);
  var insertElement = assertElement(elem);
  return targetElement.appendChild(insertElement);
}

function attachBefore(elem) {
  var targetElement = assertElement(this);
  var insertElement = assertElement(elem);
  var parentElement = targetElement.parentElement;

  if (!parentElement) return null;
  try {
    return parentElement.insertBefore(insertElement, targetElement);
  } catch (e) {
    return null;
  }
}

function attachAfter(elem) {
  var targetElement = assertElement(this);
  var insertElement = assertElement(elem);
  var parentElement = targetElement.parentElement;

  if (!parentElement) return null;
  try {
    return parentElement.insertAfter(insertElement, targetElement);
  } catch (e) {
    return null;
  }
}

function extendHTMLElementPrototype() {

  var elementPrototypeMethods = [attachBefore, attachAfter, appendChildElement, getElementContents, setElementContents];

  var globalMethods = [createElement, setElementContents];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var method = _step.value;

      HTMLElement.prototype[method.name] = function () {
        return method.apply(this, arguments);
      };
    };

    for (var _iterator = (0, _getIterator3.default)(elementPrototypeMethods), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return (0, _extends4.default)(window, globalMethods.reduce(function (r, c) {
    return (0, _extends4.default)({}, r, (0, _defineProperty3.default)({}, c.name, c));
  }, {}));
}

/**
 * Global exports
 */

// TODO: Move this for webpack to handle when exported as lib
window.edm = {
  create: createElement,
  html: function html(el) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return !args.length ? getElementContents.call(el) : setElementContents.call.apply(setElementContents, [el].concat(args));
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catalog = undefined;

var _classCallCheck2 = __webpack_require__(28);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(29);

var _createClass3 = _interopRequireDefault(_createClass2);

var _getIterator2 = __webpack_require__(13);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = __webpack_require__(27);

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = __webpack_require__(9);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultIconProvider = {
  get: function get() {
    return [].concat((0, _toConsumableArray3.default)(window.icons)).map(iconTemplate);
  }
};

var FILTER = {
  OUTLINE: function OUTLINE(item) {
    return item.variant === 'outline';
  },
  DEFAULT: function DEFAULT(item) {
    return item.variant === 'regular';
  },
  FILLED: function FILLED(item) {
    return item.variant === 'filled';
  },

  VARIANT: function VARIANT(item) {
    return this.displayedVariants.indexOf(item.variant) > -1;
  },
  QUERY: function QUERY(item) {
    var term = this.queryTerm;
    return !term || (typeof item === 'string' ? item.search(term) > -1 : item.title ? item.title.search(term) > -1 : (0, _keys2.default)(item).reduce(function (sum, itr) {
      return sum || itr.search(term) > -1;
    }, false));
  }
};

function iconTemplate(title) {
  var template = void 0;
  var name = 'icon';
  var link = document.querySelector('link[rel="import"][href*="' + name + '.html"]');

  if (link) template = link.import.querySelector('template[data-name="' + name + '"]');else template = document.querySelector('template[data-name="' + name + '"]');
  var container = document.querySelector('#icons');
  var icon = title;
  var code = '\\' + title;
  var data = { title: title, icon: icon, code: code };

  return appendTemplate({ link: link, template: template, container: container, data: data });
}

function appendTemplate(_ref) {
  var link = _ref.link,
      template = _ref.template,
      container = _ref.container,
      data = _ref.data;

  container = container || document.body;

  if (link) template = document.importNode(template.content, true);

  if (template) template = container.appendChild(template);

  if (container.lastElementChild) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(data)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _key = _step.value;

        container.lastElementChild[_key] = data[_key];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }return container.lastElementChild;
}

var IconCatalog = function () {
  function IconCatalog() {
    var provider = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultIconProvider;
    (0, _classCallCheck3.default)(this, IconCatalog);


    this.displayedVariants = ['regular'];
    this.activeFilters = [FILTER.VARIANT, FILTER.QUERY];
    this.queryTerm = '';
    this.container = document.querySelector('#icons');
    this._icons = typeof provider.get === 'function' ? [].concat((0, _toConsumableArray3.default)(provider.get())) : [];

    this.updateVariants.apply(this, (0, _toConsumableArray3.default)(this.displayedVariants));
  }

  (0, _createClass3.default)(IconCatalog, [{
    key: 'getAllIcons',
    value: function getAllIcons() {
      return [].concat((0, _toConsumableArray3.default)(this.container.children));
    }
  }, {
    key: 'update',
    value: function update() {
      var _this = this;

      var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var allIcons = this.getAllIcons();
      if (reset) this._icons = allIcons;

      allIcons.forEach(function (icon) {
        return _this.icons.indexOf(icon) === -1 ? icon.classList.add('hidden') : icon.classList.remove('hidden');
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.update(true);
    }
  }, {
    key: 'query',
    value: function query() {
      var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var keep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!keep) this.reset();
      this.queryTerm = q.trim().length ? new RegExp(q.replace(/([^\w]+)(?=\w+)/gi, '|'), 'gi') : '';
      return this.filter.apply(this, (0, _toConsumableArray3.default)(this.activeFilters));
    }
  }, {
    key: 'toggleVariant',
    value: function toggleVariant(style) {
      this.toggleFilter(style, 'variant');
    }
  }, {
    key: 'updateVariants',
    value: function updateVariants() {
      for (var _len = arguments.length, variants = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
        variants[_key2] = arguments[_key2];
      }

      this.displayedVariants = variants;
      this.update(true);
      return this.filter.apply(this, (0, _toConsumableArray3.default)(this.activeFilters));
    }
  }, {
    key: 'toggleFilter',
    value: function toggleFilter(filter) {
      var _this2 = this;

      var group = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


      var arr = {
        get: function get() {
          return group === 'variant' ? _this2.displayedVariants : _this2.activeFilters;
        },
        add: function add(item) {
          return group === 'variant' ? _this2.displayedVariants.push(item) : _this2.activeFilters.push(item);
        },
        remove: function remove(index) {
          return group === 'variant' ? _this2.displayedVariants.splice(index, 1) : _this2.activeFilters.splice(index, 1);
        }
      };
      var index = arr.get().findIndex(function (item) {
        return item.name ? item.name == filter.name : item == filter;
      });
      if (index > -1) arr.remove(index);else {
        arr.add(filter);
        this.filter.apply(this, (0, _toConsumableArray3.default)(this.activeFilters));
        this.update(true);
      }

      return this.filter.apply(this, (0, _toConsumableArray3.default)(this.activeFilters));
    }
  }, {
    key: 'filter',
    value: function filter() {
      var _this3 = this;

      for (var _len2 = arguments.length, fn = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
        fn[_key3] = arguments[_key3];
      }

      this.icons = this.icons.filter(function (icon) {
        return fn.reduce(function (sum, test) {
          return sum && test.call(_this3, icon);
        }, true);
      });
      return this.icons;
    }
  }, {
    key: 'icons',
    set: function set(val) {
      this._icons = val;
      this.update();
    },
    get: function get() {
      return this._icons;
    }
  }, {
    key: 'iconNames',
    get: function get() {
      return this.icons.map(function (icon) {
        return icon.title;
      });
    }
  }]);
  return IconCatalog;
}();

exports.default = IconCatalog;


var _catalog = void 0;
var catalog = exports.catalog = function catalog() {
  return _catalog || (_catalog = new IconCatalog());
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(51), __esModule: true };

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(55), __esModule: true };

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(26);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(26);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(50);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(33)
  , TAG = __webpack_require__(1)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(57);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(33);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(68)
  , $export        = __webpack_require__(6)
  , redefine       = __webpack_require__(77)
  , hide           = __webpack_require__(7)
  , has            = __webpack_require__(11)
  , Iterators      = __webpack_require__(3)
  , $iterCreate    = __webpack_require__(65)
  , setToStringTag = __webpack_require__(39)
  , getPrototypeOf = __webpack_require__(73)
  , ITERATOR       = __webpack_require__(1)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f
  , has = __webpack_require__(11)
  , TAG = __webpack_require__(1)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(19)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(32)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(3);
module.exports = __webpack_require__(0).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84);
var global        = __webpack_require__(2)
  , hide          = __webpack_require__(7)
  , Iterators     = __webpack_require__(3)
  , TO_STRING_TAG = __webpack_require__(1)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.overlay = undefined;

var _classCallCheck2 = __webpack_require__(28);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(29);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HIDE_DELAY = 300;
var loader = void 0,
    _overlay = void 0;

function constructOverlayElement(target) {

  var element = document.createElement('section');
  var closeEl = document.createElement('span');
  var bodyEl = document.createElement('div');
  var content = document.createElement('div');

  closeEl.setAttribute('class', 'close tri tri-plus');
  closeEl.setAttribute('style', 'display: inline-block; transform: rotate(45deg)');
  content.setAttribute('class', 'content');
  element.setAttribute('class', 'overlay');
  bodyEl.setAttribute('class', 'body');

  bodyEl.appendChild(closeEl);
  bodyEl.appendChild(content);
  element.appendChild(bodyEl);

  return target.appendChild(element);
}

function showLoader(msg) {
  loader = loader || document.createElement('div');
  loader.innerHTML = msg ? msg : '';
  loader.classList.add('open');
  return loader;
}

function hideLoader() {
  if (loader) loader.remove();
  return loader;
}

var OverlayView = function () {
  function OverlayView(content) {
    var _this = this;

    (0, _classCallCheck3.default)(this, OverlayView);

    this.element = constructOverlayElement(document.body.querySelector('main'));
    this.element.querySelector('.close').addEventListener('click', function () {
      return _this.hide();
    });

    if (content) this.content = content;
  }

  (0, _createClass3.default)(OverlayView, [{
    key: 'toggleLoader',
    value: function toggleLoader() {
      var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.element.classList.toggle('loading', show);
      if (this.element.classList.contains('loading')) {
        this.contentElement.remove();
        this.element.appendChild(showLoader('loading'));
      } else hideLoader();
    }
  }, {
    key: 'show',
    value: function show(content) {
      if (content) this.content = content;
      this.element.classList.add('open');
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this2 = this;

      this.element.classList.remove('open');
      setTimeout(function () {
        return _this2.content = '';
      }, HIDE_DELAY);
    }
  }, {
    key: 'contentElement',
    get: function get() {
      var el = this.element.querySelector('.content');
      if (!el) {
        el = this.element.appendChild(document.createElement('div'));
        el.classList.add('content');
      }
      return el;
    }
  }, {
    key: 'content',
    set: function set(html) {
      var _this3 = this;

      var set = function set(data) {
        _this3.toggleLoader(false);

        var content = _this3.contentElement;
        if (typeof data === 'string') content.innerHTML = data;else content.appendChild(data);
      };

      if (html.constructor.name === 'Promise') {
        this.toggleLoader(true);
        html.then(function (data) {
          return set(data);
        });
      } else set(html);
    },
    get: function get() {
      return this.contentElement.innerHTML;
    }
  }, {
    key: 'visible',
    get: function get() {
      return this.element.classList.contains('open');
    }
  }]);
  return OverlayView;
}();

exports.default = OverlayView;
var overlay = exports.overlay = function overlay() {
  return _overlay || (_overlay = new OverlayView());
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(49);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(13);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catalog = exports.overlay = undefined;

var _slicedToArray2 = __webpack_require__(46);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _OverlayView = __webpack_require__(45);

var _IconCatalog = __webpack_require__(24);

var _dom = __webpack_require__(23);

var _constants = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var menu = document.querySelector('#menu');
var observables = document.querySelectorAll('*[data-dispatch]');
var menuToggle = menu.querySelector('.menu-toggle');
var toggleMenu = function toggleMenu() {
  return menu.classList.toggle('open');
};

function onObservableChange(namespace) {
  var _namespace = (0, _slicedToArray3.default)(namespace, 2),
      cat = _namespace[0],
      act = _namespace[1];

  var val = _dom.input.value(this);
  var action = _constants.ACTION[act];
  action.call(this, val, cat);
}

function addListeners() {
  observables.forEach(function (element) {
    var namespace = element.getAttribute('data-dispatch').split('.');
    var fields = element.querySelectorAll('input');
    var handler = function handler() {
      onObservableChange.call(this, namespace);
    };
    fields.forEach(function (field) {
      field.addEventListener('change', handler.bind(field));
      field.addEventListener('keyup', handler.bind(field));
    });
  });
  menuToggle.addEventListener('click', toggleMenu);
}

addListeners();
(0, _OverlayView.overlay)();
(0, _IconCatalog.catalog)();

exports.overlay = _OverlayView.overlay;
exports.catalog = _IconCatalog.catalog;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(27);

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = __webpack_require__(30);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = __webpack_require__(31);

var _extends4 = _interopRequireDefault(_extends3);

var _toConsumableArray2 = __webpack_require__(9);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.toObject = toObject;
exports.addStylesheet = addStylesheet;
exports.updatePreviewStyles = updatePreviewStyles;

var _constants = __webpack_require__(22);

var _dom = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toObject(collection) {
  return [].concat((0, _toConsumableArray3.default)(collection)).reduce(function (attr, field) {
    return (0, _extends4.default)(attr, (0, _defineProperty3.default)({}, field.getAttribute('name'), _dom.input.value(field)));
  }, {});
}

// export function value (el) {
//
//   if (isCheckbox(el))
//     return Array
//       .from(el.parentElement.parentElement.querySelectorAll(`input[name="${el.name}"]`))
//       .filter(el => el.checked)
//       .map(el => el.value)
//
//   if (isRadio(el)) {
//     let match = Array
//       .from(el.parentElement.parentElement.querySelectorAll(`input[name="${el.name}"]`))
//       .find(el => el.checked)
//     return match ? match.value : null
//   }
//
//   return el.value
// }


function addStylesheet(name, data) {

  var element = document.querySelector('style.' + name) || document.createElement('style');
  var css = '';

  var _loop = function _loop(selector) {
    var attr = data[selector] || {};
    var content = (0, _keys2.default)(attr).map(function (key) {
      return '\t' + key + ': ' + attr[key] + ' !important;';
    }).join('\n');
    css += '\n' + selector + ' {\n' + content + '\n}';
  };

  for (var selector in data) {
    _loop(selector);
  }

  element.setAttribute('class', name);
  element.innerHTML = css;
  document.body.appendChild(element);
}

function updatePreviewStyles() {

  var fields = document.querySelector('div[data-bind="preview"]').querySelectorAll('input');
  var attrs = toObject(fields);
  var width = _constants.PREVIEW_SIZE[attrs.width || 'medium'];
  var factor = parseInt(_constants.SIZE_FACTOR[attrs.width]) / _constants.SIZE_FACTOR.huge;

  attrs['width'] = width;
  attrs['stroke-width'] = attrs['stroke-width'] * factor + 'px';
  addStylesheet('preview_style', { 'icon-entry .icon': attrs });
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(53), __esModule: true };

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(54), __esModule: true };

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(21);
__webpack_require__(83);
module.exports = __webpack_require__(0).Array.from;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44);
__webpack_require__(21);
module.exports = __webpack_require__(81);

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44);
__webpack_require__(21);
module.exports = __webpack_require__(82);

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(85);
module.exports = __webpack_require__(0).Object.assign;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
module.exports = __webpack_require__(0).Object.keys;

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(20)
  , toLength  = __webpack_require__(41)
  , toIndex   = __webpack_require__(79);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(8)
  , createDesc      = __webpack_require__(17);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(5) && !__webpack_require__(10)(function(){
  return Object.defineProperty(__webpack_require__(35)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(3)
  , ITERATOR   = __webpack_require__(1)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(4);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(70)
  , descriptor     = __webpack_require__(17)
  , setToStringTag = __webpack_require__(39)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(7)(IteratorPrototype, __webpack_require__(1)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(1)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(16)
  , gOPS     = __webpack_require__(72)
  , pIE      = __webpack_require__(75)
  , toObject = __webpack_require__(12)
  , IObject  = __webpack_require__(37)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(10)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(4)
  , dPs         = __webpack_require__(71)
  , enumBugKeys = __webpack_require__(36)
  , IE_PROTO    = __webpack_require__(18)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(35)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(61).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(8)
  , anObject = __webpack_require__(4)
  , getKeys  = __webpack_require__(16);

module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 72 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(11)
  , toObject    = __webpack_require__(12)
  , IE_PROTO    = __webpack_require__(18)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(11)
  , toIObject    = __webpack_require__(20)
  , arrayIndexOf = __webpack_require__(59)(false)
  , IE_PROTO     = __webpack_require__(18)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 75 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(6)
  , core    = __webpack_require__(0)
  , fails   = __webpack_require__(10);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(19)
  , defined   = __webpack_require__(14);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(19)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(15);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4)
  , get      = __webpack_require__(43);
module.exports = __webpack_require__(0).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(32)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(3);
module.exports = __webpack_require__(0).isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(34)
  , $export        = __webpack_require__(6)
  , toObject       = __webpack_require__(12)
  , call           = __webpack_require__(64)
  , isArrayIter    = __webpack_require__(63)
  , toLength       = __webpack_require__(41)
  , createProperty = __webpack_require__(60)
  , getIterFn      = __webpack_require__(43);

$export($export.S + $export.F * !__webpack_require__(66)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(58)
  , step             = __webpack_require__(67)
  , Iterators        = __webpack_require__(3)
  , toIObject        = __webpack_require__(20);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(38)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(6);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(69)});

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(5), 'Object', {defineProperty: __webpack_require__(8).f});

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(12)
  , $keys    = __webpack_require__(16);

__webpack_require__(76)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ })
/******/ ]);