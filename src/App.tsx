import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Popup } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";
import { fetchData } from "./api";

function App() {
  const [geoJson, setGeoJson] = useState(null);

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-77.032, 38.913],
        },
        properties: {
          title: "Mapbox",
          description: "Washington, D.C.",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-122.414, 37.776],
        },
        properties: {
          title: "Mapbox",
          description: "San Francisco, California",
        },
      },
    ],
  };

  useEffect(() => {
    mapboxgl.accessToken = "enteraccesstoken";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-v9",
      zoom: 11,
      center: [-77.10668412735288, 39.112403395586114],
    });

    const needwoodPop = new mapboxgl.Popup({ offset: 25 }).setText(
      "Lake Needwood is a 75-acre reservoir in Derwood, Maryland, United States"
    );

    new mapboxgl.Marker()
      .setLngLat([-77.13293269329, 39.1225907004948])
      .setPopup(needwoodPop)
      .addTo(map);

    geojson.features.forEach((feature) => {
      const coordinates = feature.geometry.coordinates as [number, number];
      new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    });

    const fetchGeoJson = async () => {
      try {
        const data = await fetchData("some endpoint");
        setGeoJson(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGeoJson();
    return () => map.remove();
  }, []);

  return (
    <div id="map">
      {/* <Grid justify="center" align="flex-start">
        <Grid.Col span={3}>
          <Button variant="filled">Button</Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Map
            mapLib={import("mapbox-gl")}
            initialViewState={{
              longitude: -77.10668412735288,
              latitude: 39.112403395586114,
              zoom: 15,
            }}
            style={{ width: 400, height: 400 }}
            mapStyle="mapbox://styles/mapbox/satellite-v9"
            mapboxAccessToken="pk.eyJ1IjoiY29sYmluYXRvcjIwMjQiLCJhIjoiY2x6MXpzczh0MGEzZzJpbXdpMTRsYnEwYSJ9.1bNIt3vYfP4JaNIjbPMJWg"
          />
        </Grid.Col>
      </Grid> */}
    </div>
  );
}

export default App;
