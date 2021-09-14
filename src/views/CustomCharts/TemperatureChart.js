import React from "react";
import Plot from "react-plotly.js";
import io from "socket.io-client";

const socket = io("http://49.124.145.219:8780", {
  transports: ["websocket", "polling"],
});

export default class TemperatureChart extends React.Component {
  state = {
    line1: {
      x: [0],
      y: [0],
      name: "Line 1",
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
  };

  componentDidMount() {
    // setInterval(this.increaseGraphic, 1000)
    socket.on("temp", (data) => {
      this.increaseGraphic(data);
    });
  }

  increaseGraphic = ({ value, analogTwo, timeStamp }) => {
    const { line1, line2, layout, revision } = this.state;
    line1.x.push(revision);
    line1.y.push(value);

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

    this.setState({ revision: this.state.revision + 1 });
    layout.datarevision = this.state.revision + 1;
  };

  render() {
    return (
      <div>
        <Plot
          data={[this.state.line1]}
          layout={this.state.layout}
          revision={this.state.revision}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          graphDiv="graph"
        />
      </div>
    );
  }
}
