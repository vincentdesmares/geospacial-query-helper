'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Get the nearest square aligned on a two-dimensional Euclidean plane
 *
 * @param {*} position
 * @param {*} width
 */
var getCurrentSquare = function getCurrentSquare(position, width) {
  return {
    position: {
      x: Math.round(position.x / width) * width,
      y: Math.round(position.y / width) * width,
      z: 0
    },
    width: width
  };
};

/**
 * Get the neighbors of the given square.
 * Will fetch exponentialy bigger square at each iteration.
 *
 * @param {*} square
 * @param {*} width
 * @param {*} maxIteration
 * @param {*} iteration
 */


var getNeighbors = function getNeighbors(square, width, maxIteration) {
  var iteration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  if (iteration > maxIteration) {
    return [];
  }
  // A 3x3 matrix without the center
  var a = [[-1, 1], [0, 1], [1, 1], [-1, 0], [1, 0], [-1, -1], [0, -1], [1, -1]];
  a = a.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        x = _ref2[0],
        y = _ref2[1];

    return [square.position.x + x * width, square.position.y + y * width];
  });
  var nextWidth = width * 3;
  return [].concat(_toConsumableArray(a.map(function (m) {
    return {
      position: {
        x: m[0],
        y: m[1],
        z: 0
      },
      width: width
    };
  })), _toConsumableArray(getNeighbors(getCurrentSquare(square.position, nextWidth), nextWidth, maxIteration, iteration + 1)));
};

exports.default = function (referencePosition, width) {
  var maxIteration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

  var square = getCurrentSquare(referencePosition, width);
  var squares = getNeighbors(square, width, maxIteration);

  return [square].concat(_toConsumableArray(squares));
};