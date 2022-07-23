// src/DisplayMapFC.js

import * as React from 'react';

import hidden_config from './hidden_config.js';
import { setEvent } from "./redux/reducers/appSlice.js";
import { useDispatch } from "react-redux";

export const DisplayMapComponent = () =>
{
	// Create a reference to the HTML element we want to put the map on
	const mapRef = React.useRef(null);

	const [events, setEvents] = React.useState([]);
	const [map, setMap] = React.useState([])
	const [H, setH] = React.useState([])
	const [ui, setUI] = React.useState([])
	const [eventIcon, setEventIcon] = React.useState([])
	const [restaurantIcon, setRestaurantIcon] = React.useState([])

	const dispatch = useDispatch();

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
		setEventIcon(new H.map.Icon('<svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>event-solid</title><path class="clr-i-solid clr-i-solid-path-1" d="M10,10a1,1,0,0,0,1-1V3A1,1,0,0,0,9,3V9A1,1,0,0,0,10,10Z"></path><path class="clr-i-solid clr-i-solid-path-2" d="M26,10a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V9A1,1,0,0,0,26,10Z"></path><path class="clr-i-solid clr-i-solid-path-3" d="M32.25,6h-4V9a2.2,2.2,0,0,1-4.4,0V6H12.2V9A2.2,2.2,0,0,1,7.8,9V6h-4A1.78,1.78,0,0,0,2,7.81V30.19A1.78,1.78,0,0,0,3.75,32h28.5A1.78,1.78,0,0,0,34,30.19V7.81A1.78,1.78,0,0,0,32.25,6ZM25.94,16.58l-9.67,9.67L11,20.94A1.36,1.36,0,0,1,12.9,19l3.38,3.38L24,14.66a1.36,1.36,0,1,1,1.93,1.93Z"></path><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>'))
		setRestaurantIcon(new H.map.Icon('<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.415 12.393l1.868-2.289c.425-.544.224-.988-.055-2.165-.205-.871-.044-1.854.572-2.5 1.761-1.844 5.343-5.439 5.343-5.439l.472.37-3.693 4.728.79.617 3.87-4.59.479.373-3.558 4.835.79.618 3.885-4.58.443.347-3.538 4.85.791.617 3.693-4.728.433.338s-2.55 4.36-3.898 6.535c-.479.771-1.425 1.161-2.334 1.167-1.211.007-1.685-.089-2.117.464l-2.281 2.795c2.445 2.962 4.559 5.531 5.573 6.829.771.987.065 2.421-1.198 2.421-.42 0-.853-.171-1.167-.573l-8.36-10.072s-.926.719-1.944 1.518c-3.172-5.184-6.267-11.661-6.267-13.955 0-.128-.034-.924.732-.924.245 0 .493.116.674.344.509.642 5.415 6.513 10.002 12.049m-2.952 3.617l1.953 2.365-4.115 5.055c-.295.378-.736.576-1.182.576-1.198 0-1.991-1.402-1.189-2.428l4.533-5.568z" fill="#030405"/></svg>'))
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
		setUI(ui)

		var mapSettings = ui.getControl('mapsettings');
		var zoom = ui.getControl('zoom');
		var scalebar = ui.getControl('scalebar');

		mapSettings.setAlignment('top-center');
		zoom.setAlignment('top-center');
		scalebar.setAlignment('top-center');

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
		// Fetch the event data from backend
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
				console.log(data)
			});
		// Fetch restaurant data from backend
		// fetch(`http://127.0.0.1:8000/api/getRestaurants/`, {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: `Token ${localStorage.getItem('token')}`
		// 	},
		// })
		// 	.then(res => res.json())
		// 	.then(data =>
		// 	{
		// 		console.log(data)
		// 	});
	}, []);

	// Add markers to map
	React.useEffect(() =>
	{
		if (!map) return;
		var markerEvents = []
		events.forEach((event) =>
		{
			const newMarker = new H.map.Marker({ lat: event.latitude, lng: event.longitude })
			newMarker.setData(`<div><a href="${event.url}">${event.title}</a><br>`)
			if(eventIcon) {
				newMarker.setIcon(eventIcon)
			}
			newMarker.addEventListener('tap', tapevent=>{
				dispatch(setEvent(
					{
						title: event.title,
						description: event.notes,
						date: event.date,
						url: event.url,
						location: event.address,
					}
				));
			}, false)
			markerEvents.push(newMarker);
			map.addObject(newMarker);
		});
	}, [events, H.map.Marker, map, ui, eventIcon]);

	React.useEffect(() => {
		
		// Get user's location
		if (navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(setUserLocation)
		}
	},[map])

	return <div className="map" ref={mapRef} style={{ height: "100vh" }} />;
};