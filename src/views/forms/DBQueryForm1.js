import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-date-picker";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody
} from '@coreui/react'
//import "../../css/form1.css";
import axios from 'axios';

function DbForm1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const [value, onChange] = useState(new Date());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <CCol>
      <label>Node: </label>
      <select {...register("ageGroup")}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
       
      <label>React Datepicker</label>
      <DatePicker onChange={onChange} value={value} />
      <input type="submit" />
      </CCol>
    </form>
  );
}

export default DbForm1;
