import React, { useEffect, useState } from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import Firebase from "src/firebase";
import moment from "moment";

// const brandSuccess = getStyle("success") || "#4dbd74";
// const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("danger") || "#f86c6b";
const brandWarning = getStyle('warngin') || '#f9b115'

const MainChartExample = (attributes) => {
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const [temperatureArr, setTemperatureArr] = useState([]);
  const [humidityArr, setHumidityArr] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const unsubscribe = Firebase.firestore()
      .collection("SensorReadings")
      .orderBy("timeStamp")
      .onSnapshot((snapshot) => {
        let dumTemp = [];
        let dumHum = [];
        let dumLabel = [];
        if (snapshot.size) {
          snapshot.forEach((doc) => {
            dumTemp.push(doc.data().temperature);
            dumHum.push(doc.data().humidity);
            dumLabel.push(
              moment(doc.data().timeStamp.toDate()).format(
                "DD/MM/YYYY HH:MM:SS"
              )
            );
          });
          setHumidityArr(dumHum);
          setTemperatureArr(dumTemp);
          setLabels(dumLabel);
        } else {
          console.log("NO DATA");
        }
      });
    console.log(temperatureArr);
    console.log(humidityArr);
    return () => {
      unsubscribe();
    };
  }, [Firebase]);

  const defaultDatasets = (() => {
    let elements = 27;
    const data1 = [];
    const data2 = [];
    const data3 = [];
    for (let i = 0; i <= elements; i++) {
      data1.push(random(50, 200));
      data2.push(random(80, 100));
      data3.push(65);
    }
    return [
      // {
      //   label: 'My First dataset',
      //   backgroundColor: hexToRgba(brandInfo, 10),
      //   borderColor: brandInfo,
      //   pointHoverBackgroundColor: brandInfo,
      //   borderWidth: 2,
      //   data: data1
      // },
      {
        label: "Temperature Degree Celcius",
        backgroundColor: "transparent",
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 2,
        data: temperatureArr,
      },
      {
        label: "Humidity",
        backgroundColor: "transparent",
        borderColor: brandWarning,
        pointHoverBackgroundColor: brandWarning,
        borderWidth: 1,
        borderDash: [8, 5],
        data: humidityArr,
      },
    ];
  })();

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: 5,
              max: 110,
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };
  })();

  // render
  return (
    <CChartLine
      {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={labels}
    />
  );
};

export default MainChartExample;
