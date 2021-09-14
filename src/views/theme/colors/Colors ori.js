import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { CRow, CCol, CCard, CCardHeader, CCardBody } from "@coreui/react";
import { rgbToHex } from "@coreui/utils";
import { DocsLink } from "src/reusable";
import axios from "axios";
import Plot from "react-plotly.js";
import "react-datepicker/dist/react-datepicker.css";

const ReviewChart = () => {
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [startDate, setStartDate] = useState(new Date());

  //Mon May 10 2021 12:00:03 GMT+0800 (Malaysia Time)           Change this to MM/dd/yyyy
  const convertDate = () => {
    let str = startDate.toString();
    let parts = str.split(" ");
    let months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    return months[parts[1]] + "/" + parts[2] + "/" + parts[3];
  };

  // async function onSubmit(data) {
  //   console.log("The Submit button was clicked");

  //   axios.get(`http://49.124.145.219:8780/data?node=${data.Node}&date=${convertDate(startDate)}`)
  //     .then((response) => {
  //       //Data coming in from API, should be sent to create the chart.
  //       console.log(response);

  //       setfetchedData(
  //         {
  //           x: response.time,
  //           y: response.data,
  //         }
  //       )

  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  let APIData = {};

  async function onSubmit(data) {
    console.log("The Submit button was clicked");
    axios
      .get(
        `http://49.124.145.219:8780/data?node=${data.Node}&date=${convertDate(
          startDate
        )}&data=${data.type}`
      )
      .then((res) => {
        //Data coming in from API, should be sent to create the chart.
        console.log(res.data);

        if (res.status === 200) {
          const { values, time } = res.data;

          setYData(values);
          setXData(time);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // useEffect(() => {
  //   setfetchedData(APIData);                            //how to
  //   console.log('UseEffect was triggered');
  // }, []);

  // const handleSubmit = (e) => {
  //   e.preventdefault();
  //   setfetchedData(data);
  //   console.log('HandleSubmit Data.Node ===>', data.Node);
  // };

  return (
    <div>
      <CCard>
        <CCardHeader>Review Past Data</CCardHeader>
        <CCardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CRow>
              <CCol>
                <label>Node: </label>
                <select {...register("Node")}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </CCol>

              <CCol>
                <label>Select the Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="MM/dd/yyyy"
                />
              </CCol>
              <CCol>
                <label>Node: </label>
                <select {...register("type")}>
                  <option value="TempIn">Temperature Inside</option>
                  <option value="TempOut">Temperature Outside</option>
                  <option value="LightIn">Light Intensity Inside</option>
                  <option value="LightOut">Light Intensity Outside</option>
                </select>
              </CCol>
              <CCol>
                <input type="submit" />
              </CCol>
            </CRow>
          </form>
        </CCardBody>
        <CCardHeader></CCardHeader>
        <CCardBody>
          <Plot
            data={[
              {
                x: xData,
                y: yData,
                type: "scatter",
                marker: { color: "red" },
              },
            ]}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            graphDiv="graph"
          />
        </CCardBody>
      </CCard>
      ``
    </div>
  );
};

export default ReviewChart;
