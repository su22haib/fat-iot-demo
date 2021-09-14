import React, { useEffect, useState } from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CFormCheck,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartBarSimple from "../charts/ChartLineSimple";
import io from "socket.io-client";

const socket = io("http://49.124.145.219:8780", {
  transports: ["websocket", "polling"],
});

const WindowPositionWidget = () => {
  let [count, setCount] = useState("Closed");

  useEffect(() => {
    socket.on("window", (data) => {
      if (data.value == "1") {
        setCount((count = "Open"));
      } else if (data.value == "0") {
        setCount((count = "Closed"));
      }
    });
  });

  // render
  return (
    <>
      <CCol>
        <CWidgetDropdown
          color="gradient-info"
          header={count}
          text="Window Position"
          style={{ height: "80px", verticalAlign: "top" }}
        ></CWidgetDropdown>
      </CCol>
    </>
  );
};

export default WindowPositionWidget;
