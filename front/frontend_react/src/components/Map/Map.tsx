// sonarlint-disable-file
import React, { useCallback, useMemo, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import styles from './Map.module.scss';
import { Hotel } from 'lib/data.types';
import getCenter from 'geolib/es/getCenter';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import './MapCustom.css';

type Result = {
	coordinates: {
		lat: number;
		lon: number;
	};
	address: string;
	name: string;
};

type Props = {
	results?: Result[];
	center?: mapboxgl.LngLatLike;
	selectedWaypoints?: mapboxgl.LngLatLike[];
	handleMarkerClick?: (activity: Hotel) => void;
	zoom?: number;
};

const Map = ({ results, center, selectedWaypoints, zoom = 9 }: Props) => {
	const mapNode = useRef(null);

	const coordinates = useMemo(
		() => results?.map((result) => result.coordinates || { lng: 0, lat: 0 }) || [],
		[results]
	);
	const globalCenter = useMemo(() => {
		return coordinates ? getCenter(coordinates) : { longitude: 0, latitude: 0 };
	}, [coordinates]);

	const directions = useMemo(
		() =>
			new MapboxDirections({
				accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
				unit: 'metric',
				profile: 'mapbox/driving',
			}),
		[]
	);

	const onLoad = useCallback(
		(mapboxMap: mapboxgl.Map, resultsData: Result[]) => {
			mapboxMap.addSource('places', {
				type: 'geojson',
				data: {
					type: 'FeatureCollection',
					features: resultsData.map((result) => ({
						type: 'Feature',
						properties: {
							description: `<strong>${result.name}</strong><p>${result.address}</p>`,
						},
						geometry: {
							type: 'Point',
							coordinates: [result.coordinates.lon, result.coordinates.lat],
						},
					})),
				},
			});
			mapboxMap.addLayer({
				id: 'places',
				type: 'circle',
				source: 'places',
				paint: {
					'circle-color': '#4264fb',
					'circle-radius': 6,
					'circle-stroke-width': 2,
					'circle-stroke-color': '#ffffff',
				},
			});

			const popup = new mapboxgl.Popup({
				closeButton: false,
				closeOnClick: false,
			});

			mapboxMap.on('mouseenter', 'places', (e) => {
				if (!e?.features) return;
				mapboxMap.getCanvas().style.cursor = 'pointer';

				let coordinatesPts: number[] | undefined = undefined;
				if (e.features[0].geometry.type === 'Point') {
					coordinatesPts = e.features[0].geometry.coordinates.slice();
				}
				const description = e.features[0].properties?.description;
				if (!coordinatesPts || !description) return;
				while (Math.abs(e.lngLat.lng - coordinatesPts[0]) > 180) {
					coordinatesPts[0] += e.lngLat.lng > coordinatesPts[0] ? 360 : -360;
				}

				popup
					.setLngLat(coordinatesPts as [number, number])
					.setHTML(description)
					.addTo(mapboxMap);
			});

			mapboxMap.on('mouseleave', 'places', () => {
				mapboxMap.getCanvas().style.cursor = '';
				popup.remove();
			});
			if (!selectedWaypoints) return;
			if (selectedWaypoints.length < 2) return;
			directions.setOrigin(selectedWaypoints[0]);
			const waypointsLength = selectedWaypoints.length;
			selectedWaypoints
				.filter((_, index) => index !== 0 && index !== waypointsLength - 1)
				.forEach((waypoint, index) => {
					directions.addWaypoint(index, waypoint);
				});
			directions.setDestination(selectedWaypoints[waypointsLength - 1]);
		},
		[selectedWaypoints, directions]
	);

	React.useEffect(() => {
		const node = mapNode.current;
		if (typeof window === 'undefined' || node === null) return;
		const mapboxMap = new mapboxgl.Map({
			container: node,
			accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: center || !globalCenter ? [0, 0] : [globalCenter.longitude, globalCenter.latitude],
			zoom,
		});

		if (selectedWaypoints) mapboxMap.addControl(directions, 'top-left');

		if (!results) return;
		mapboxMap.on('load', () => onLoad(mapboxMap, results));

		return () => {
			mapboxMap.remove();
		};
	}, [center, globalCenter, results, onLoad, directions, zoom, selectedWaypoints]);

	return (
		<>
			<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.0.2/mapbox-gl-directions.js"></script>
			<link
				rel="stylesheet"
				href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.0.2/mapbox-gl-directions.css"
				type="text/css"
			/>
			<div ref={mapNode} className={styles.container}></div>
		</>
	);
};

export default Map;
