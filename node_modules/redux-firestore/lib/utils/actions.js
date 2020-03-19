"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapInDispatch = wrapInDispatch;
exports.mapWithFirebaseAndDispatch = mapWithFirebaseAndDispatch;

var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));

var _isObject2 = _interopRequireDefault(require("lodash/isObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function makePayload(_ref, valToPass) {
  var payload = _ref.payload;
  return typeof payload === 'function' ? payload(valToPass) : payload;
}

function wrapInDispatch(dispatch, _ref2) {
  var ref = _ref2.ref,
      _ref2$meta = _ref2.meta,
      meta = _ref2$meta === void 0 ? {} : _ref2$meta,
      method = _ref2.method,
      _ref2$args = _ref2.args,
      args = _ref2$args === void 0 ? [] : _ref2$args,
      types = _ref2.types;

  var _types = _slicedToArray(types, 3),
      requestingType = _types[0],
      successType = _types[1],
      errorType = _types[2];

  dispatch({
    type: (0, _isObject2.default)(requestingType) ? requestingType.type : requestingType,
    meta: meta,
    payload: (0, _isObject2.default)(requestingType) ? requestingType.payload : {
      args: args
    }
  });
  return ref[method].apply(ref, _toConsumableArray(args)).then(function (result) {
    var successIsObject = (0, _isObject2.default)(successType);
    var actionObj = {
      type: successIsObject ? successType.type : successType,
      meta: meta,
      payload: successIsObject && successType.payload ? makePayload(successType, result) : {
        args: args
      }
    };

    if (successIsObject && successType.preserve) {
      actionObj.preserve = successType.preserve;
    }

    if (successIsObject && successType.merge) {
      actionObj.merge = successType.merge;
    }

    dispatch(actionObj);
    return result;
  }).catch(function (err) {
    dispatch({
      type: errorType,
      meta: meta,
      payload: err
    });
    return Promise.reject(err);
  });
}

function createWithFirebaseAndDispatch(firebase, dispatch) {
  return function (func) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return func.apply(firebase, [firebase, dispatch].concat(args));
    };
  };
}

function mapWithFirebaseAndDispatch(firebase, dispatch, actions, aliases) {
  var withFirebaseAndDispatch = createWithFirebaseAndDispatch(firebase, dispatch);
  return _objectSpread({}, (0, _mapValues2.default)(actions, withFirebaseAndDispatch), {}, aliases.reduce(function (acc, _ref3) {
    var action = _ref3.action,
        name = _ref3.name;
    return _objectSpread({}, acc, _defineProperty({}, name, withFirebaseAndDispatch(action)));
  }, {}));
}