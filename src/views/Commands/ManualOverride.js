import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import "../../scss/_custom.scss";
import io from "socket.io-client";

const socket = io.connect("http://49.124.145.219:8780", {
  transports: ["websocket", "polling"],
  reconnect: true,
});

const ManualOverride = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  useEffect(() => {
    socket.on("connect", function (socket) {
      console.log("Client connected");
    });
    let Status = { LED: false };

    if (checked) {
      Status.Override = true;
    } else {
      Status.Override = false;
    }

    socket.emit("Override", "Node1", Status);
    // Update the document title using the browser API
  });

  return (
    <div className="example">
      <label>
        <Switch
          onChange={handleChange}
          checked={checked}
          className="react-switch"
        />
      </label>
    </div>
  );
};

export default ManualOverride;
