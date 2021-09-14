import React from "react";
import Plot from "react-plotly.js";
import io from "socket.io-client";

const socket = io("http://49.124.145.219:8780", {
  transports: ["websocket", "polling"],
});

export default class TemperatureChart extends React.Component {
  state = {
    //Initial State of data
    xValue: [],
    yValue: [],
    data: [
      {
        x: [],
        y: [],
        name: "Line 1",
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "red" },
      },
    ],
    layout: {
      datarevision: 0,
    },
    revision: 0,
    time: "",
  };

  componentDidMount() {
    // setInterval(this.increaseGraphic, 1000)
    socket.on("temp", (data) => {
      //Data coming in from the socket being sent to increaseGraphic function
      this.increaseGraphic(data);
    });
  }

  increaseGraphic = ({ value, time }) => {
    //Incoming data is passed as an object.
    const { layout, revision, data, xValue, yValue } = this.state;

    xValue.push(time);
    yValue.push(value);

    console.log("datat", data[0].x);

    let _data = Object.values(data);
    _data[0].x = xValue;
    _data[0].y = yValue;

    console.log("DATA=>", _data);

    // line1.x.push(time);
    // line1.y.push(value);
    // line1.dummy.push(revision);
    // if (line1.x.length >= 10) {
    //   line1.x.shift()
    //   line1.y.shift()
    // }
    // let _revision = revision++;

    // line2.x.push(this.rand())
    // line2.y.push(this.rand())
    // if (line2.x.length >= 10) {
    //   line2.x.shift()
    //   line2.y.shift()
    // }

    this.setState({ revision: this.state.revision + 1, data: _data });
    layout.datarevision = this.state.revision + 1;
  };

  render() {
    return (
      <div>
        <Plot
          data={this.state.data}
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
