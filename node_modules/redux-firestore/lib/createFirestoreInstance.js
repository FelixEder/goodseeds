"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createFirestoreInstance;

var _merge2 = _interopRequireDefault(require("lodash/fp/merge"));

var _actions = require("./actions");

var _actions2 = require("./utils/actions");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createFirestoreInstance(firebase, configs, dispatch) {
  var defaultInternals = {
    listeners: {},
    config: _objectSpread({}, _constants.defaultConfig, {}, configs)
  };
  firebase._ = (0, _merge2.default)(defaultInternals, firebase._);
  var aliases = [{
    action: _actions.firestoreActions.deleteRef,
    name: 'delete'
  }, {
    action: _actions.firestoreActions.setListener,
    name: 'onSnapshot'
  }];
  var methods = (0, _actions2.mapWithFirebaseAndDispatch)(firebase, dispatch, _actions.firestoreActions, aliases);

  var methodsFromFirestore = _constants.methodsToAddFromFirestore.reduce(function (acc, methodName) {
    return firebase.firestore && typeof firebase.firestore()[methodName] === 'function' ? _objectSpread({}, acc, _defineProperty({}, methodName, firebase.firestore()[methodName].bind(firebase.firestore()))) : acc;
  }, {});

  return Object.assign(methodsFromFirestore, firebase.firestore, {
    _: firebase._
  }, configs.helpersNamespace ? _defineProperty({}, configs.helpersNamespace, methods) : methods);
}