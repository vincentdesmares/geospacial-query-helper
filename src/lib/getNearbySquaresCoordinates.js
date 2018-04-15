// @flow

import type { Vector2, Square } from './type.js'

/**
 * Get the nearest square aligned on a two-dimensional Euclidean plane
 *
 * @param {*} position
 * @param {*} width
 */
const getCurrentSquare = (position: Vector2, width) => {
  return {
    position: {
      x: Math.round(position.x / width) * width,
      y: Math.round(position.y / width) * width,
      z: 0
    },
    width
  }
}

/**
 * Get the neighbors of the given square.
 * Will fetch exponentialy bigger square at each iteration.
 *
 * @param {*} square
 * @param {*} width
 * @param {*} maxIteration
 * @param {*} iteration
 */
const getNeighbors = (
  square: Square,
  width: number,
  maxIteration: number,
  iteration: number = 0
) => {
  if (iteration > maxIteration) {
    return []
  }
  // A 3x3 matrix without the center
  let a = [[-1, 1], [0, 1], [1, 1], [-1, 0], [1, 0], [-1, -1], [0, -1], [1, -1]]
  a = a.map(([x, y]) => {
    return [square.position.x + x * width, square.position.y + y * width]
  })
  const nextWidth = width * 3
  return [
    ...a.map(m => ({
      position: {
        x: m[0],
        y: m[1],
        z: 0
      },
      width
    })),
    ...getNeighbors(
      getCurrentSquare(square.position, nextWidth),
      nextWidth,
      maxIteration,
      iteration + 1
    )
  ]
}

export default (
  referencePosition: Vector2,
  width: number,
  maxIteration: number = 4
) => {
  const square = getCurrentSquare(referencePosition, width)
  const squares = getNeighbors(square, width, maxIteration)

  return [square, ...squares]
}
