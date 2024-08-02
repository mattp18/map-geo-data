import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Popup } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";
import { fetchData } from "./api";
import NavBar from "./components/navbar";
import { Affix, Button, NavLink } from "@mantine/core";

function App() {
  const [geoJson, setGeoJson] = useState(null);

  const navItems = [
    { label: "Home", link: "/" },
    { label: "Extract Data", link: "/" },
    { label: "Sample Data", link: "/" },
    { label: "About", link: "/" },
  ];

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
    mapboxgl.accessToken = "yourkey";
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
    <div>
      {navItems.map((item) => (
        <NavLink key={item.label} label={item.label} />
      ))}

      <div className="map-container" id="map"></div>
    </div>
  );
}

export default App;
