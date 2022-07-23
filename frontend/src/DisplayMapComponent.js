// src/DisplayMapFC.js

import * as React from 'react';

import hidden_config from './hidden_config.js';

export const DisplayMapComponent = () =>
{
	// Create a reference to the HTML element we want to put the map on
	const mapRef = React.useRef(null);

	const [events, setEvents] = React.useState([]);
	const [map, setMap] = React.useState([])
	const [H, setH] = React.useState([])


	/**
	 * Create the map instance
	 * While `useEffect` could also be used here, `useLayoutEffect` will render
	 * the map sooner
	 */
	const setUserLocation = (position) => {
		if (!(map.length > 0)) return;
		console.log(map)
		setMap({...map, center: {lat: position.coords.latitude, lng: position.coords.longitude}})
	}
	React.useLayoutEffect(() =>
	{
		// `mapRef.current` will be `undefined` when this hook first runs; edge case that
		if (!mapRef.current) return;
		const H = window.H;
		const platform = new H.service.Platform({
			apikey: hidden_config.here_api_key
		});
		const defaultLayers = platform.createDefaultLayers();

		const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
			center: { lat: 51.0447, lng: -114.0719 },
			zoom: 13,
			pixelRatio: window.devicePixelRatio || 1
		});

		setH(H);
		setMap(hMap);

		const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

		const ui = H.ui.UI.createDefault(hMap, defaultLayers);
		console.log('rendering')

		// This will act as a cleanup to run once this hook runs again.
		// This includes when the component un-mounts
		return () =>
		{
			hMap.dispose();
		};
	}, [mapRef]); // This will run this hook every time this ref is updated


	// Fetch data --> 1.)
	React.useEffect(() =>
	{
		// Fetch the Payroll Data related to the logged in User
		fetch(`http://127.0.0.1:8000/api/getEvents/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('token')}`
			},
		})
			.then(res => res.json())
			.then(data =>
			{
				setEvents(data)
			});
	}, []);

	// Add markers to map
	React.useEffect(() =>
	{
		if (!map) return;
		var markerEvents = []
		events.forEach((event) =>
		{
			const newMarker = new H.map.Marker({ lat: event.latitude, lng: event.longitude })
			markerEvents.push(newMarker);
			map.addObject(newMarker);
		});
	}, [events, H.map.Marker, map]);

	React.useEffect(() => {
		
		// Get user's location
		if (navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(setUserLocation)
		}
	},[map])

	return <div className="map" ref={mapRef} style={{ height: "100vh" }} />;
};