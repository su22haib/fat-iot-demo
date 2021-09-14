import React from 'react'
import Plot from 'react-plotly.js'
import io from 'socket.io-client'


const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling'],
})


export default class PlotEx extends React.Component {
  state = {
    line1: {
      x: [0],
      y: [0],
      name: 'Line 1',
    },
    // line2: {
    //   x: [1, 2, 3],
    //   y: [-3, -2, -1],
    //   name: 'Line 2',
    // },
    layout: {
      datarevision: 0,
    },
    revision: 0,
  }
  componentDidMount() {
    // setInterval(this.increaseGraphic, 1000)
    socket.on('dataStream', (data)=>{
      this.increaseGraphic(data)
    })

  }

  increaseGraphic = ({analogOne, analogTwo, timeStamp}) => {
    const { line1, line2, layout, revision } = this.state
    line1.x.push(revision)
    line1.y.push(analogOne)
    // if (line1.x.length >= 10) {
    //   line1.x.shift()
    //   line1.y.shift()
    // }
    
    // line2.x.push(this.rand())
    // line2.y.push(this.rand())
    // if (line2.x.length >= 10) {
    //   line2.x.shift()
    //   line2.y.shift()
    // }
    this.setState({ revision: this.state.revision + 1 })
    layout.datarevision = this.state.revision + 1
  }
  render() {
    return (
      <div>
        <Plot
          data={[this.state.line1]}
          layout={this.state.layout}
          revision={this.state.revision}
          graphDiv="graph"
        />
      </div>
    )
  }
}

