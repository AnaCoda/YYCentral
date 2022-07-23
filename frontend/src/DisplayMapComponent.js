// src/DisplayMapComponent.js
import * as React from 'react';
import hidden_config from './hidden_config';

export class DisplayMapComponent extends React.Component {
  mapRef = React.createRef();

  state = {
    // The map instance to use during cleanup
    map: null
  };

  componentDidMount() {
    const H = window.H;
    const platform = new H.service.Platform({
        apikey: hidden_config.here_api_key
    });

    const defaultLayers = platform.createDefaultLayers();

    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over Europe
        center: { lat: 50, lng: 5 },
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components to allow the user to interact with them
    const ui = H.ui.UI.createDefault(map, defaultLayers);
 
    this.setState({ map });
  }

  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    this.state.map.dispose();
  }

  render() {
    return (
      // Set a height on the map so it will display
      <div ref={this.mapRef} style={{ height: "100vh" }} />
    );
  }
}