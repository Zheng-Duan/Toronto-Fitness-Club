import React, { useRef, useState } from "react";
import GoogleMapReact from "google-map-react";

const Marker = ({ text }) => (
  <div style={{ width: "20px", height: "20px", backgroundColor: "red" }}>
    {text}
  </div>
);