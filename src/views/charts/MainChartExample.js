import React, { useEffect, useState } from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
//import Firebase from "src/firebase";
import moment from "moment";
import io from 'socket.io-client';
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';


//======================Socket Setup=================

const socket = io("http://localhost:3001", {
  transports: ['websocket', 'polling']
});


//=====================Section End===================



const MainChartTemperature = ({}) => {
  const [data, setData] = useState([]);

  // 1. listen for a cpu event and update the state
  useEffect(() => {
    socket.on('temp', temperature => {
      console.log(temperature);
      setData(currentData => [...currentData, temperature]);
    });
  }, []);

  // 2. render the line chart using the state
  return (
    <div>
      <LineChart width={1500} height={300} data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Line dataKey="value" />
      </LineChart>
    </div>
  );
};

export default MainChartTemperature;
