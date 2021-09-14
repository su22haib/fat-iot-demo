import React, { useEffect, useState } from "react";
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


const ChartjsHumidity = ({}) => {
  const [data, setData] = useState([]);

  // 1. listen for a cpu event and update the state
  useEffect(() => {
    socket.on('hum', humidity => {
      setData(currentData => [...currentData, humidity]);
    });
  
  }, []);

  // 2. render the line chart using the state
  return (
    <div>
        
    <div>
    <Line
      data={data}
      options={{
        title:{
          display:true,
          text:'Average Rainfall per month',
          fontSize:20
        },
        legend:{
          display:true,
          position:'right'
        }
      }}
    />
  </div>
    </div>
  );
};

export default ChartjsHumidity;
