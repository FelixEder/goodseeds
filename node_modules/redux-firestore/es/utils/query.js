"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSnapshotByObject = getSnapshotByObject;
exports.firestoreRef = firestoreRef;
exports.getQueryName = getQueryName;
exports.getBaseQueryName = getBaseQueryName;
exports.listenerExists = listenerExists;
exports.attachListener = attachListener;
exports.detachListener = detachListener;
exports.queryStrToObj = queryStrToObj;
exports.getQueryConfig = getQueryConfig;
exports.getQueryConfigs = getQueryConfigs;
exports.orderedFromSnap = orderedFromSnap;
exports.dataByIdSnapshot = dataByIdSnapshot;
exports.getPopulateChild = getPopulateChild;
exports.populateList = populateList;
exports.promisesForPopulate = promisesForPopulate;
exports.dispatchListenerResponse = dispatchListenerResponse;
exports.getPopulateActions = getPopulateActions;
exports.snapshotCache = void 0;

var _cloneDeep2 = _interopRequireDefault(require("lodash/cloneDeep"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _trim2 = _interopRequireDefault(require("lodash/trim"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _isObject2 = _interopRequireDefault(require("lodash/isObject"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var snapshotCache = new WeakMap();
exports.snapshotCache = snapshotCache;

function getSnapshotByObject(obj) {
  return snapshotCache.get(obj);
}

function addWhereToRef(ref, where) {
  if (!Array.isArray(where)) {
    throw new Error('where parameter must be an array.');
  }

  if (Array.isArray(where[0])) {
    return where.reduce(function (acc, whereArgs) {
      return addWhereToRef(acc, whereArgs);
    }, ref);
  }

  return ref.where.apply(ref, _toConsumableArray(where));
}

function addOrderByToRef(ref, orderBy) {
  if (!Array.isArray(orderBy) && !(typeof orderBy === 'string' || orderBy instanceof String)) {
    throw new Error('orderBy parameter must be an array or string.');
  }

  if (typeof orderBy === 'string' || orderBy instanceof String) {
    return ref.orderBy(orderBy);
  }

  if (typeof orderBy[0] === 'string' || orderBy[0] instanceof String) {
    return ref.orderBy.apply(ref, _toConsumableArray(orderBy));
  }

  return orderBy.reduce(function (acc, orderByArgs) {
    return addOrderByToRef(acc, orderByArgs);
  }, ref);
}

function arrayify(cursor) {
  return [].concat(cursor);
}

function handleSubcollections(ref, subcollectionList) {
  if (Array.isArray(subcollectionList)) {
    subcollectionList.forEach(function (subcollection) {
      if (subcollection.collection) {
        if (typeof ref.collection !== 'function') {
          throw new Error("Collection can only be run on a document. Check that query config for subcollection: \"".concat(subcollection.collection, "\" contains a doc parameter."));
        }

        ref = ref.collection(subcollection.collection);
      }

      if (subcollection.doc) ref = ref.doc(subcollection.doc);
      if (subcollection.where) ref = addWhereToRef(ref, subcollection.where);

      if (subcollection.orderBy) {
        ref = addOrderByToRef(ref, subcollection.orderBy);
      }

      if (subcollection.limit) ref = ref.limit(subcollection.limit);

      if (subcollection.startAt) {
        var _ref;

        ref = (_ref = ref).startAt.apply(_ref, _toConsumableArray(arrayify(subcollection.startAt)));
      }

      if (subcollection.startAfter) {
        var _ref2;

        ref = (_ref2 = ref).startAfter.apply(_ref2, _toConsumableArray(arrayify(subcollection.startAfter)));
      }

      if (subcollection.endAt) {
        var _ref3;

        ref = (_ref3 = ref).endAt.apply(_ref3, _toConsumableArray(arrayify(subcollection.endAt)));
      }

      if (subcollection.endBefore) {
        var _ref4;

        ref = (_ref4 = ref).endBefore.apply(_ref4, _toConsumableArray(arrayify(subcollection.endBefore)));
      }

      ref = handleSubcollections(ref, subcollection.subcollections);
    });
  }

  return ref;
}

function firestoreRef(firebase, meta) {
  var _ref5, _ref6, _ref7, _ref8;

  if (!firebase.firestore) {
    throw new Error('Firestore must be required and initalized.');
  }

  var collection = meta.collection,
      collectionGroup = meta.collectionGroup,
      doc = meta.doc,
      subcollections = meta.subcollections,
      where = meta.where,
      orderBy = meta.orderBy,
      limit = meta.limit,
      startAt = meta.startAt,
      startAfter = meta.startAfter,
      endAt = meta.endAt,
      endBefore = meta.endBefore;
  var ref = firebase.firestore();

  if (collection && collectionGroup) {
    throw new Error('Reference cannot contain both Collection and CollectionGroup.');
  }

  if (collection) ref = ref.collection(collection);
  if (collectionGroup) ref = ref.collectionGroup(collectionGroup);
  if (doc) ref = ref.doc(doc);
  ref = handleSubcollections(ref, subcollections);
  if (where) ref = addWhereToRef(ref, where);
  if (orderBy) ref = addOrderByToRef(ref, orderBy);
  if (limit) ref = ref.limit(limit);
  if (startAt) ref = (_ref5 = ref).startAt.apply(_ref5, _toConsumableArray(arrayify(startAt)));
  if (startAfter) ref = (_ref6 = ref).startAfter.apply(_ref6, _toConsumableArray(arrayify(startAfter)));
  if (endAt) ref = (_ref7 = ref).endAt.apply(_ref7, _toConsumableArray(arrayify(endAt)));
  if (endBefore) ref = (_ref8 = ref).endBefore.apply(_ref8, _toConsumableArray(arrayify(endBefore)));
  return ref;
}

function arrayToStr(key, value) {
  if (typeof value === 'string' || value instanceof String || (0, _isNumber2.default)(value)) {
    return "".concat(key, "=").concat(value);
  }

  if (typeof value[0] === 'string' || value[0] instanceof String) {
    return "".concat(key, "=").concat(value.join(':'));
  }

  if (value && typeof value.toString === 'function') {
    return "".concat(key, "=").concat(value.toString());
  }

  return value.map(function (val) {
    return arrayToStr(key, val);
  });
}

function pickQueryParams(obj) {
  return ['where', 'orderBy', 'limit', 'startAfter', 'startAt', 'endAt', 'endBefore'].reduce(function (acc, key) {
    return obj[key] ? _objectSpread({}, acc, _defineProperty({}, key, obj[key])) : acc;
  }, {});
}

function serialize(queryParams) {
  return Object.keys(queryParams).filter(function (key) {
    return queryParams[key] !== undefined;
  }).map(function (key) {
    return arrayToStr(key, queryParams[key]);
  }).join('&');
}

function getQueryName(meta) {
  if (typeof meta === 'string' || meta instanceof String) {
    return meta;
  }

  var collection = meta.collection,
      collectionGroup = meta.collectionGroup,
      doc = meta.doc,
      subcollections = meta.subcollections,
      storeAs = meta.storeAs,
      remainingMeta = _objectWithoutProperties(meta, ["collection", "collectionGroup", "doc", "subcollections", "storeAs"]);

  if (!collection && !collectionGroup) {
    throw new Error('Collection or Collection Group is required to build query name');
  }

  if (storeAs) {
    return storeAs;
  }

  var basePath = collection || collectionGroup;

  if (doc) {
    basePath = basePath.concat("/".concat(doc));
  }

  if (collection && subcollections) {
    console.error('Queries with subcollections must use "storeAs" to prevent invalid store updates. This closley matches the upcoming major release (v1), which stores subcollections at the top level by default.');
    var mappedCollections = subcollections.map(function (subcollection) {
      return getQueryName(subcollection);
    });
    basePath = "".concat(basePath, "/").concat(mappedCollections.join('/'));
  }

  var queryParams = pickQueryParams(remainingMeta);

  if (!(0, _isEmpty2.default)(queryParams)) {
    if (queryParams.where && !Array.isArray(queryParams.where)) {
      throw new Error('where parameter must be an array.');
    }

    basePath = basePath.concat('?', serialize(queryParams));
  }

  return basePath;
}

function getBaseQueryName(meta) {
  if (typeof meta === 'string' || meta instanceof String) {
    return meta;
  }

  var collection = meta.collection,
      collectionGroup = meta.collectionGroup,
      subcollections = meta.subcollections,
      remainingMeta = _objectWithoutProperties(meta, ["collection", "collectionGroup", "subcollections"]);

  if (!collection && !collectionGroup) {
    throw new Error('Collection or Collection Group is required to build query name');
  }

  var basePath = collection || collectionGroup;

  if (collection && subcollections) {
    var mappedCollections = subcollections.map(function (subcollection) {
      return getQueryName(subcollection);
    });
    basePath = "".concat(basePath, "/").concat(mappedCollections.join('/'));
  }

  var queryParams = pickQueryParams(remainingMeta);

  if (!(0, _isEmpty2.default)(queryParams)) {
    if (queryParams.where && !Array.isArray(queryParams.where)) {
      throw new Error('where parameter must be an array.');
    }

    basePath = basePath.concat('?', serialize(queryParams));
  }

  return basePath;
}

function confirmMetaAndConfig(firebase, meta) {
  if (!meta) {
    throw new Error('Meta data is required to attach listener.');
  }

  if (!firebase || !firebase._ || !firebase._.listeners) {
    throw new Error('Internal Firebase object required to attach listener. Confirm that reduxFirestore enhancer was added when you were creating your store');
  }
}

function listenerExists(firebase, meta) {
  confirmMetaAndConfig(firebase, meta);
  var name = getQueryName(meta);
  return !!firebase._.listeners[name];
}

function attachListener(firebase, dispatch, meta, unsubscribe) {
  confirmMetaAndConfig(firebase, meta);
  var name = getQueryName(meta);

  if (!firebase._.listeners[name]) {
    firebase._.listeners[name] = unsubscribe;
  }

  dispatch({
    type: _constants.actionTypes.SET_LISTENER,
    meta: meta,
    payload: {
      name: name
    }
  });
  return firebase._.listeners;
}

function detachListener(firebase, dispatch, meta) {
  var name = getQueryName(meta);

  if (firebase._.listeners[name]) {
    firebase._.listeners[name]();

    delete firebase._.listeners[name];
  }

  dispatch({
    type: _constants.actionTypes.UNSET_LISTENER,
    meta: meta,
    payload: {
      name: name
    }
  });
}

function queryStrToObj(queryPathStr, parsedPath) {
  var pathArr = parsedPath || (0, _trim2.default)(queryPathStr, ['/']).split('/');

  var _pathArr = _toArray(pathArr),
      collection = _pathArr[0],
      doc = _pathArr[1],
      subcollections = _pathArr.slice(2);

  var queryObj = {};
  if (collection) queryObj.collection = collection;
  if (doc) queryObj.doc = doc;

  if (subcollections.length) {
    queryObj.subcollections = [queryStrToObj('', subcollections)];
  }

  return queryObj;
}

function getQueryConfig(query) {
  if (typeof query === 'string' || query instanceof String) {
    return queryStrToObj(query);
  }

  if ((0, _isObject2.default)(query)) {
    if (!query.collection && !query.collectionGroup && !query.doc) {
      throw new Error('Collection, Collection Group and/or Doc are required parameters within query definition object.');
    }

    return query;
  }

  throw new Error('Invalid Path Definition: Only Strings and Objects are accepted.');
}

function getQueryConfigs(queries) {
  if (Array.isArray(queries)) {
    return queries.map(getQueryConfig);
  }

  if (typeof queries === 'string' || queries instanceof String) {
    return queryStrToObj(queries);
  }

  if ((0, _isObject2.default)(queries)) {
    return [getQueryConfig(queries)];
  }

  throw new Error('Querie(s) must be an Array or a string.');
}

function orderedFromSnap(snap) {
  var ordered = [];

  if (snap.data && snap.exists) {
    var obj = (0, _isObject2.default)(snap.data()) ? _objectSpread({
      id: snap.id
    }, snap.data() || snap.data) : {
      id: snap.id,
      data: snap.data()
    };
    snapshotCache.set(obj, snap);
    ordered.push(obj);
  } else if (snap.forEach) {
    snap.forEach(function (doc) {
      var obj = (0, _isObject2.default)(doc.data()) ? _objectSpread({
        id: doc.id
      }, doc.data() || doc.data) : {
        id: doc.id,
        data: doc.data()
      };
      snapshotCache.set(obj, doc);
      ordered.push(obj);
    });
  }

  snapshotCache.set(ordered, snap);
  return ordered;
}

function dataByIdSnapshot(snap) {
  var data = {};

  if (snap.data) {
    var snapData = snap.exists ? snap.data() : null;

    if (snapData) {
      snapshotCache.set(snapData, snap);
    }

    data[snap.id] = snapData;
  } else if (snap.forEach) {
    snap.forEach(function (doc) {
      var snapData = doc.data() || doc;
      snapshotCache.set(snapData, doc);
      data[doc.id] = snapData;
    });
  }

  if (!!data && Object.keys(data).length) {
    snapshotCache.set(data, snap);
    return data;
  }

  return null;
}

function getPopulateChild(firebase, populate, id) {
  return firestoreRef(firebase, {
    collection: populate.root,
    doc: id
  }).get().then(function (snap) {
    return _objectSpread({
      id: id
    }, snap.data());
  });
}

function populateList(firebase, originalObj, p, results) {
  if (!results[p.root]) {
    (0, _set2.default)(results, p.root, {});
  }

  return Promise.all((0, _map2.default)(originalObj, function (id, childKey) {
    var populateKey = id === true || p.populateByKey ? childKey : id;
    return getPopulateChild(firebase, p, populateKey).then(function (pc) {
      if (pc) {
        return (0, _set2.default)(results, "".concat(p.root, ".").concat(populateKey), pc);
      }

      return results;
    });
  }));
}

function getPopulateObj(str) {
  if (typeof str === 'string' || str instanceof String) {
    return str;
  }

  var strArray = str.split(':');
  return {
    child: strArray[0],
    root: strArray[1]
  };
}

function getPopulateObjs(arr) {
  if (!Array.isArray(arr)) {
    return arr;
  }

  return arr.map(function (o) {
    return (0, _isObject2.default)(o) ? o : getPopulateObj(o);
  });
}

function promisesForPopulate(firebase, dataKey, originalData, populatesIn) {
  var promisesArray = [];
  var results = {};
  var populatesForData = getPopulateObjs(typeof populatesIn === 'function' ? populatesIn(dataKey, originalData) : populatesIn);
  var dataHasPopulateChilds = populatesForData.some(function (populate) {
    return (0, _has2.default)(originalData, populate.child);
  });

  if (dataHasPopulateChilds) {
    populatesForData.forEach(function (p) {
      var childDataVal = (0, _get2.default)(originalData, p.child);

      if (typeof childDataVal === 'string' || childDataVal instanceof String) {
        return promisesArray.push(getPopulateChild(firebase, p, childDataVal).then(function (v) {
          if (v) {
            (0, _set2.default)(results, "".concat(p.storeAs ? p.storeAs : p.root, ".").concat(childDataVal), v);
          }
        }));
      }

      return promisesArray.push(populateList(firebase, childDataVal, p, results));
    });
  } else {
    (0, _forEach2.default)(originalData, function (d, key) {
      var populatesForDataItem = getPopulateObjs(typeof populatesIn === 'function' ? populatesIn(key, d) : populatesIn);
      (0, _forEach2.default)(populatesForDataItem, function (p) {
        var idOrList = (0, _get2.default)(d, p.child);

        if (!idOrList) {
          return;
        }

        if (typeof idOrList === 'string' || idOrList instanceof String) {
          return promisesArray.push(getPopulateChild(firebase, p, idOrList).then(function (v) {
            if (v) {
              (0, _set2.default)(results, "".concat(p.storeAs ? p.storeAs : p.root, ".").concat(idOrList), v);
            }

            return results;
          }));
        }

        if (Array.isArray(idOrList) || (0, _isObject2.default)(idOrList)) {
          return promisesArray.push(populateList(firebase, idOrList, p, results));
        }
      });
    });
  }

  return Promise.all(promisesArray).then(function () {
    return results;
  });
}

var changeTypeToEventType = {
  added: _constants.actionTypes.DOCUMENT_ADDED,
  removed: _constants.actionTypes.DOCUMENT_REMOVED,
  modified: _constants.actionTypes.DOCUMENT_MODIFIED
};

function docChangeEvent(change) {
  var originalMeta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var meta = _objectSpread({}, (0, _cloneDeep2.default)(originalMeta), {
    path: change.doc.ref.path
  });

  if (originalMeta.subcollections && !originalMeta.storeAs) {
    meta.subcollections[0] = _objectSpread({}, meta.subcollections[0], {
      doc: change.doc.id
    });
  } else {
    meta.doc = change.doc.id;
  }

  return {
    type: changeTypeToEventType[change.type] || _constants.actionTypes.DOCUMENT_MODIFIED,
    meta: meta,
    payload: {
      data: change.doc.data(),
      ordered: {
        oldIndex: change.oldIndex,
        newIndex: change.newIndex
      }
    }
  };
}

function dispatchListenerResponse(_ref9) {
  var dispatch = _ref9.dispatch,
      docData = _ref9.docData,
      meta = _ref9.meta,
      firebase = _ref9.firebase;

  var _ref10 = firebase._.config || {},
      mergeOrdered = _ref10.mergeOrdered,
      mergeOrderedDocUpdates = _ref10.mergeOrderedDocUpdates,
      mergeOrderedCollectionUpdates = _ref10.mergeOrderedCollectionUpdates;

  var docChanges = typeof docData.docChanges === 'function' ? docData.docChanges() : docData.docChanges;

  if (docChanges && docChanges.length < docData.size) {
    docChanges.forEach(function (change) {
      dispatch(docChangeEvent(change, meta));
    });
  } else {
    dispatch({
      type: _constants.actionTypes.LISTENER_RESPONSE,
      meta: meta,
      payload: {
        data: dataByIdSnapshot(docData),
        ordered: orderedFromSnap(docData)
      },
      merge: {
        docs: mergeOrdered && mergeOrderedDocUpdates,
        collections: mergeOrdered && mergeOrderedCollectionUpdates
      }
    });
  }
}

function getPopulateActions(_ref11) {
  var firebase = _ref11.firebase,
      docData = _ref11.docData,
      meta = _ref11.meta;
  return promisesForPopulate(firebase, docData.id, dataByIdSnapshot(docData), meta.populates).then(function (populateResults) {
    return Object.keys(populateResults).map(function (resultKey) {
      return {
        meta: {
          collection: resultKey
        },
        payload: {
          data: populateResults[resultKey]
        },
        requesting: false,
        requested: true
      };
    });
  }).catch(function (populateErr) {
    console.error('Error with populate:', populateErr, meta);
    return Promise.reject(populateErr);
  });
}