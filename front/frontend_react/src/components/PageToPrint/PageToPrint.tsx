import { InfoCard } from 'components';
import { Hotel } from 'lib/data.types';
import React, { useEffect } from 'react';
import styles from './PageToPrint.module.scss';
import Logo from 'assets/images/logo trip 1.png';
import axios from 'axios';
import { encode } from '@googlemaps/polyline-codec';
import getCenter from 'geolib/es/getCenter';

type Props = {
	hotels: Hotel[];
	onGetPosition: (hotel: Hotel) => number | undefined;
};

const PageToPrint = React.forwardRef<HTMLDivElement, Props>(
	({ hotels, onGetPosition: getPosition }: Props, ref) => {
		const [mapSteps, setMapSteps] = React.useState<number[][]>([]);

		const coords =
			mapSteps.length > 0
				? mapSteps.map((step) => ({ lon: step[0], lat: step[1] }))
				: hotels.map((hotel) => hotel.coordinate);
		const center = getCenter(coords);
		/////////////////////////// COMPUTATION
		const pins = hotels.map((hotel) => {
			const location = hotel.coordinate;
			return `pin-s-${getPosition(hotel)}+ff3333(${location.lon},${location.lat})`;
		});

		const hotelsLocations = hotels.map(
			(hotel, index) =>
				`${hotel.coordinate.lon},${hotel.coordinate.lat}${index < hotels.length - 1 ? ';' : ''}`
		);

		const polyline = false; // || encode(mapSteps, 5);
		console.log(mapSteps);
		const path = polyline ? `path(${encodeURIComponent(polyline)}),` : '';
		console.log('polyline', polyline);

		const zoom = center
			? `${center.longitude.toFixed(4)},${center.latitude.toFixed(4)},13,0`
			: '0,0,13,0';

		////////////////////////// ROUTES

		const mapImgUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${path}${pins.map(
			(pin) => pin
		)}/auto/800x400?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;

		const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${hotelsLocations.join(
			''
		)}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${
			process.env.REACT_APP_MAPBOX_TOKEN
		}`;

		////////////////////////////////////

		useEffect(() => {
			if (hotels.length <= 1) return;
			axios.get(routeUrl).then((res) => {
				setMapSteps(res.data.routes[0].geometry.coordinates);
			});
		}, [routeUrl, hotels]);
		return (
			<div ref={ref} className={styles.container}>
				<img src={Logo} alt="Epic trip logo" />
				<h1 className={styles.title}>Recap</h1>
				<img src={mapImgUrl} className={styles.map} alt="map" />
				<div className={styles.cardCollection}>
					{hotels.map((hotel) => (
						<InfoCard hotel={hotel} key={hotel.id} isActivated={true} order={getPosition(hotel)} />
					))}
				</div>
			</div>
		);
	}
);

export default PageToPrint;
