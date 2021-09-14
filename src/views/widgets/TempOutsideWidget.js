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
import ChartBarSimple from "../charts/ChartLineSimple";
import io from "socket.io-client";

const socket = io("http://49.124.145.219:8780", {
  transports: ["websocket", "polling"],
});

const TempOutsideWidget = () => {
  let [TempOut, setTempOut] = useState(0);

  useEffect(() => {
    socket.on("DataStream", (data) => {
      setTempOut((TempOut = data.TempOut));
    });
  });

  // render
  return (
    <>
      <CCol>
        <CWidgetDropdown
          color="gradient-warning"
          header={TempOut}
          text="Temperature Outside (C)"
          style={{ height: "80px" }}
        ></CWidgetDropdown>
      </CCol>
    </>
  );
};

export default TempOutsideWidget;
