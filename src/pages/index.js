import MyPolygon from "@/components/polygon/MyPolygon";
import React from "react";

const Home = () => {
  

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", padding: "25px" }}>
        <div style={{ width: "100%", padding: "25px" }}>
          <h3>Create Google Map Polygon</h3>
        </div>
        <div>
          <MyPolygon />
        </div>
      </div>
    </div>
  );
};

export default Home;
