"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pathToArr = pathToArr;
exports.getSlashStrPath = getSlashStrPath;
exports.getDotStrPath = getDotStrPath;
exports.combineReducers = combineReducers;
exports.pathFromMeta = pathFromMeta;
exports.updateItemInArray = updateItemInArray;
exports.createReducer = createReducer;
exports.preserveValuesFromState = preserveValuesFromState;

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _trimStart2 = _interopRequireDefault(require("lodash/trimStart"));

var _replace2 = _interopRequireDefault(require("lodash/replace"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function pathToArr(path) {
  return path ? path.split(/\//).filter(function (p) {
    return !!p;
  }) : [];
}

function getSlashStrPath(path) {
  return (0, _trimStart2.default)((0, _replace2.default)(path, /[.]/g, '/'), '/');
}

function getDotStrPath(path) {
  return pathToArr(path).join('.');
}

function combineReducers(reducers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;
    return Object.keys(reducers).reduce(function (nextState, key) {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
}

function pathFromMeta(meta) {
  if (!meta) {
    throw new Error('Action meta is required to build path for reducers.');
  }

  var collection = meta.collection,
      collectionGroup = meta.collectionGroup,
      doc = meta.doc,
      subcollections = meta.subcollections,
      storeAs = meta.storeAs;

  if (storeAs) {
    return doc ? [storeAs, doc] : [storeAs];
  }

  if (meta.path) {
    return meta.path.split('/');
  }

  if (!collection && !collectionGroup) {
    throw new Error('Collection or Collection Group is required to construct reducer path.');
  }

  var basePath = [collection || collectionGroup];

  if (doc) {
    basePath = [].concat(_toConsumableArray(basePath), [doc]);
  }

  if (!subcollections) {
    return basePath;
  }

  var mappedCollections = subcollections.map(pathFromMeta);
  return [].concat(_toConsumableArray(basePath), _toConsumableArray((0, _flatten2.default)(mappedCollections)));
}

function updateItemInArray(array, itemId, updateItemCallback) {
  var matchFound = false;
  var modified = Array.isArray(array) ? array.map(function (item) {
    if (!item || item.id !== itemId) {
      return item;
    }

    matchFound = true;
    var updatedItem = updateItemCallback(item);
    return updatedItem;
  }) : [];

  if (!matchFound) {
    modified.push(updateItemCallback({
      id: itemId
    }));
  }

  return modified;
}

function createReducer(initialState, handlers) {
  return function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}

function preserveValuesFromState(state, preserveSetting, nextState) {
  if ((0, _isBoolean2.default)(preserveSetting)) {
    return nextState ? _objectSpread({}, state, {}, nextState) : state;
  }

  if (typeof preserveSetting === 'function') {
    return preserveSetting(state, nextState);
  }

  if (Array.isArray(preserveSetting)) {
    return (0, _pick2.default)(state, preserveSetting);
  }

  throw new Error('Invalid preserve parameter. It must be an Object or an Array.');
}