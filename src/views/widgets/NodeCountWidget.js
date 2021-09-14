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

const NodeCountWidget = () => {
  let [count, setCount] = useState(0);

  useEffect(() => {
    socket.on("nodeCount", (data) => {
      setCount((count = data.value));
    });
  });

  // render
  return (
    <>
      <CCol>
        <CWidgetDropdown
          color="gradient-success"
          header={count}
          text="Nodes Connected"
          style={{ height: "80px" }}
        ></CWidgetDropdown>
      </CCol>
    </>
  );
};

export default NodeCountWidget;
