// src/DisplayMapFC.js

import * as React from "react";

import { EventIcon, RestaurantIcon } from "./assets/mapIcons";
import appSlice, {
    removeRedirectedEvent,
    setEvent,
} from "./redux/reducers/appSlice.js";
import { useDispatch, useSelector } from "react-redux";

import hidden_config from "./hidden_config.js";

export const DisplayMapComponent = () => {
    // Create a reference to the HTML element we want to put the map on
    const mapRef = React.useRef(null);

    const [events, setEvents] = React.useState([]);
    const [map, setMap] = React.useState([]);
    const [H, setH] = React.useState([]);
    const [ui, setUI] = React.useState([]);
    const [eventIcon, setEventIcon] = React.useState([]);
    const [restaurantIcon, setRestaurantIcon] = React.useState([]);

    const dispatch = useDispatch();
    const { redirectedEvent } = useSelector((state) => state.app);
    /**
     * Create the map instance
     * While `useEffect` could also be used here, `useLayoutEffect` will render
     * the map sooner
     */
    const setUserLocation = (position) => {
        if (!(map.length > 0)) return;
        console.log(map);
        setMap({
            ...map,
            center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            },
        });
    };
    React.useLayoutEffect(() => {
        // `mapRef.current` will be `undefined` when this hook first runs; edge case that
        if (!mapRef.current) return;
        const H = window.H;
        setEventIcon(new H.map.Icon(EventIcon));
        setRestaurantIcon(new H.map.Icon(RestaurantIcon));
        const platform = new H.service.Platform({
            apikey: hidden_config.here_api_key,
        });
        const defaultLayers = platform.createDefaultLayers();

        const hMap = new H.Map(
            mapRef.current,
            defaultLayers.vector.normal.map,
            {
                center: { lat: 51.0447, lng: -114.0719 },
                zoom: 13,
                pixelRatio: window.devicePixelRatio || 1,
            }
        );

        setH(H);
        setMap(hMap);

        const behavior = new H.mapevents.Behavior(
            new H.mapevents.MapEvents(hMap)
        );

        const ui = H.ui.UI.createDefault(hMap, defaultLayers);
        console.log("rendering");
        setUI(ui);

        var mapSettings = ui.getControl("mapsettings");
        var zoom = ui.getControl("zoom");
        var scalebar = ui.getControl("scalebar");

        mapSettings.setAlignment("top-center");
        zoom.setAlignment("top-center");
        scalebar.setAlignment("top-center");

        // This will act as a cleanup to run once this hook runs again.
        // This includes when the component un-mounts
        return () => {
            hMap.dispose();
        };
    }, [mapRef]); // This will run this hook every time this ref is updated

    // Fetch data --> 1.)
    React.useEffect(() => {
        if (redirectedEvent) {
            setEvents([redirectedEvent]);
            dispatch(removeRedirectedEvent());
            dispatch(setEvent(redirectedEvent));
        } else {
            // Fetch the event data from backend
            fetch(`http://127.0.0.1:8000/api/getEvents/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setEvents(data);
                    console.log(data);
                });
        }
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
    React.useEffect(() => {
        if (!map) return;
        var markerEvents = [];
        events.forEach((event) => {
            const newMarker = new H.map.Marker({
                lat: event.latitude,
                lng: event.longitude,
            });
            newMarker.setData(
                `<div><a href="${event.url}">${event.title}</a><br>`
            );
            if (eventIcon) {
                newMarker.setIcon(eventIcon);
            }
            newMarker.addEventListener(
                "tap",
                (tapevent) => {
                    dispatch(
                        setEvent({
                            title: event.title,
                            description: event.notes,
                            date: event.date,
                            url: event.url,
                            location: event.address,
                        })
                    );
                },
                false
            );
            markerEvents.push(newMarker);
            map.addObject(newMarker);
        });
    }, [events, H.map.Marker, map, ui, eventIcon]);

    React.useEffect(() => {
        // Get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setUserLocation);
        }
    }, [map]);

    return <div className="map" ref={mapRef} style={{ height: "100vh" }} />;
};
