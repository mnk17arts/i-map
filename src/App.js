import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as dataUsage from "./data/dataUsage.json";

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 20.593684,
    longitude: 78.96288, 
    width: "100vw",
    height: "90vh",
    zoom: 2
  });
  const [selectedRegion, setselectedRegion] = useState(null);

  const bgColor = (f) => {
    let clr;
    if (f < 1) {
      clr = "yellow";
    } else if (f < 5) {
      clr = "salmon";
    }
    else if (f < 20) {
      clr = "orangered";
    }
    else if (f < 50) {
      clr = "purple";
    }
    else {
      clr = "red";
    }
    return clr;
  };
  
  const legendData = [
    {color: "yellow", text: "0 - 1", percent: "22 %"},
    {color: "salmon", text: "1 - 5", percent: "13 %"},
    {color: "orangered", text: "5 - 20", percent: "27 %"},
    {color: "purple", text: "20 - 50", percent: "37 %"},
    {color: "red", text: "50+", percent: "1 %"}
  ];

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setselectedRegion(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {dataUsage.features.map((park,id) => (
          <Marker
            key={id}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setselectedRegion(park);
              }}
            >
              {/* <img src="/skateboarding.svg" alt="Skate Park Icon" /> */}
              <div className="marker-div" style={{backgroundColor: bgColor(park.Data)}}></div>

            </button>
          </Marker>
        ))}

        {selectedRegion ? (
          <Popup
            latitude={selectedRegion.geometry.coordinates[1]}
            longitude={selectedRegion.geometry.coordinates[0]}
            onClose={() => {
              setselectedRegion(null);
            }}
          >
            <div className="popup-div">
              <h2>{selectedRegion.Country}</h2>
              <p><span>Data Usage : </span><br/>{selectedRegion.Data}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    
      <div className="legend-div">
        <div className="legend-top">
          <div className="legend-detail"> Data Usage </div>
          <div className="legend-gradient"> </div>
        </div>
        <div className="legend-bottom">
          <div className="legend">
              {legendData.map((item, id) => { 
                let cn = "legend-item li"+ id; 
                return (                  
                  <div className={cn} key={id}>
                    <div className="legend-color" style={{backgroundColor: item.color}}></div>
                    <div className="legend-text">{item.text}</div>
                    <div className="legend-percent">{item.percent}</div>
                  </div>
                )})}

          </div>
        </div>
      </div>  

    </div>
  );
}
