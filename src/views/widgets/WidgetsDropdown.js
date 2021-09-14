import React, { useEffect, useState } from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";
// import ChartBarSimple from "../charts/ChartBarSimple";


const WidgetsDropdown = () => {
  
  useEffect(()=>{
    //everytime the socket emits data to it
  })

  // render
  return (
    <>
      <CRow>
        <CCol sm="12" lg="6">
          <CWidgetDropdown
            color="gradient-danger"
            header={[1,2,3,4,5,6]}
            text="Temperature (Celcius)"
            footerSlot={
              <ChartLineSimple
                pointed
                className="c-chart-wrapper mt-3 mx-3"
                style={{ height: "70px" }}
                dataPoints= {[1,2,3,4,5,6]}
                pointHoverBackgroundColor="primary"
                label="Members"
                labels="months"
              />
            }
          >
            <CDropdown>
              <CDropdownToggle color="transparent">
                <CIcon name="cil-beach-access" />
              </CDropdownToggle>
              <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CWidgetDropdown>
        </CCol>

       
      </CRow>
    </>
  );
};

export default WidgetsDropdown;
