// src/DisplayMapFC.js

import * as React from 'react';
import hidden_config from './hidden_config';

export const DisplayMapComponent = () => {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null);

  const [events, setEvents] = React.useState([]);


  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  React.useLayoutEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
        apikey: hidden_config.here_api_key
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 50, lng: 5 },
      zoom: 4,
      pixelRatio: window.devicePixelRatio || 1
    });


    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef]); // This will run this hook every time this ref is updated

  
    // Fetch data --> 1.)
    React.useEffect(() => {

      // Fetch the Payroll Data related to the logged in User
      fetch(`http://127.0.0.1:8000/api/getEvents/`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
               Authorization: `Token ${localStorage.getItem('token')}`
          },
      })
      .then(res => res.json())
      .then(data => {
        setEvents(data)
        console.log(data)
        });
    }, []);

  return <div className="map" ref={mapRef} style={{ height: "100vh" }} />;
};