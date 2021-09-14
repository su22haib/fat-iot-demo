import React from "react";
import Plot from "react-plotly.js";
import io from "socket.io-client";
import moment from "moment";
import axios from "axios";

const socket = io("http://49.124.145.219:8780", {
  transports: ["websocket", "polling"],
});

export default class LightOut extends React.Component {
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
        mode: "lines",
        marker: { color: "blue" },
      },
    ],
    layout: {
      datarevision: 0,
    },
    revision: 0,
    time: "",
  };

  componentDidMount() {
    axios
      .get(
        `http://49.124.145.219:8780/data?node=2&date=${moment().format(
          "L"
        )}&data=LightOut`
      )
      .then((res) => {
        if (res.status === 200) {
          //Need to figure out how to take this data and plot it on the graph.
          console.log("y-axis" + res.data.values);
          console.log("x-axis" + res.data.time);

          const { layout, revision, data, xValue, yValue } = this.state; //Just uses the es6 destructuring.

          // xValue = res.data.time
          // yValue = res.data.values

          let _data = [
            {
              x: res.data.time,
              y: res.data.values,
            },
          ];

          //console.log('x-axis time array: ' + data[0].x)
          //console.log('y-axis data array: ' + data[0].y)

          // this.increaseGraphic({ , time })
          this.setState({
            //This function will set the data in the state object, every time setState is called the graph renders.
            revision: this.state.revision + 1,
            data: _data,
            xValue: res.data.time,
            yValue: res.data.values,
          });
          layout.datarevision = this.state.revision + 1;
        }
      })
      .then(() => {
        socket.on("DataStream", (data) => {
          //Data coming in from the socket being sent to increaseGraphic function
          this.increaseGraphic(data);
        }); //End of Socket subscription.
      });
  }

  increaseGraphic = ({ LightOut, time }) => {
    //Incoming data is passed as an object.
    const { layout, revision, data, xValue, yValue } = this.state;

    xValue.push(time);
    yValue.push(LightOut);

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
