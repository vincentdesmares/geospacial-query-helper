import React, { Component } from 'react'
import 'tachyons/css/tachyons.min.css'

import GetNearbySquaresCoordinatesDemo from './components/getNearbySquaresCoordinatesDemo'
import './app.css'

const getScene = scene => {
  switch (scene) {
    case 'getNearbySquaresCoordinates':
      return <GetNearbySquaresCoordinatesDemo />
    default:
      return <span>Unknown scene</span>
  }
}

const MenuItem = ({ scene, item }) => {
  return (
    <div className="avenir">
      {item === scene && <span className="b">{'> '}</span>}
      {item}
    </div>
  )
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      scene: 'getNearbySquaresCoordinates'
    }
  }

  render () {
    return (
      <div className="flex h-100">
        <div className="pa5 shadow-1">
          {['getNearbySquaresCoordinates'].map(item => (
            <MenuItem scene={this.state.scene} item={item} />
          ))}
        </div>
        <div className="fg1">{getScene(this.state.scene)}</div>
      </div>
    )
  }
}

export default App
