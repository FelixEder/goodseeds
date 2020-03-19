"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isComposable = isComposable;
exports.default = queriesReducer;

var _unset2 = _interopRequireDefault(require("lodash/unset"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _immer = _interopRequireDefault(require("immer"));

var _constants = require("../constants");

var _query = require("../utils/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isComposable(action) {
  return !!(0, _get2.default)(action, 'meta.where') && !!(0, _get2.default)(action, 'meta.collection');
}

function queriesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return (0, _immer.default)(state, function (draft) {
    if (!isComposable(action)) {
      return state;
    }

    var key = (0, _query.getBaseQueryName)(action.meta);

    switch (action.type) {
      case _constants.actionTypes.GET_SUCCESS:
      case _constants.actionTypes.LISTENER_RESPONSE:
        draft[key] = _objectSpread({
          data: action.payload.data
        }, action.meta);
        return draft;

      case _constants.actionTypes.UNSET_LISTENER:
        if (draft[key]) {
          draft[key].data = undefined;
        }

        return draft;

      case _constants.actionTypes.DOCUMENT_ADDED:
      case _constants.actionTypes.DOCUMENT_MODIFIED:
        (0, _set2.default)(draft, [key, 'data', action.meta.doc], action.payload.data);
        return draft;

      case _constants.actionTypes.DOCUMENT_REMOVED:
      case _constants.actionTypes.DELETE_SUCCESS:
        (0, _unset2.default)(draft, [key, 'data', action.meta.doc]);
        return draft;

      default:
        return state;
    }
  });
}