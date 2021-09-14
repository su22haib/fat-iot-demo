import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import io from "socket.io-client";

//======================Socket Setup==========================

const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling"],
});

//=====================Section End============================

const SampleChart = () => {
  //This is where I collect data over socket and put in an array.
  const [timeStamp, setTimeStamp] = useState([]);
  const [data, setData] = useState([]);

  // 1. listen for a Analog event and update the state.
  useEffect(() => {
    socket.on("ana", (Data) => {
      console.log(data);

      console.log(Data);

      setTimeStamp((currentData) => [...currentData, Data.time]);
      setData((currentData) => [...currentData, Data.value]);
    });
  }, []);

  return (
    <Plot
      data={[
        {
          x: [],
          y: [],
          type: "scatter",
          marker: { color: "red" },
        },
      ]}
      layout={{ width: 800, height: 400, title: "Sample Chart" }}
    />
  );
};

export default SampleChart;
