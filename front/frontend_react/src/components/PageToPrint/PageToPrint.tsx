import { InfoCard } from 'components';
import { Hotel } from 'lib/data.types';
import React from 'react';
import styles from './PageToPrint.module.scss';
import Logo from 'assets/images/logo trip 1.png';

type Props = {
	hotels: Hotel[];
	onGetPosition: (hotel: Hotel) => number | undefined;
};

const PageToPrint = React.forwardRef<HTMLDivElement, Props>(
	({ hotels, onGetPosition: getPosition }: Props, ref) => {
		const pins = hotels.map((hotel) => {
			const location = hotel.coordinate;
			return `pin-s-${getPosition(hotel)}+ff3333(${location.lon},${location.lat})`;
		});

		console.log(pins);
		const mapImgUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/path({jgiHioeMnBiH}CeEuDkCaIfMoCjL_A~GxD~CLr@qCdBv@ZwCrOvHhExAeGeCyAcJmESu@iQzKlGjo@zAvHbLh^jHlQiDjGDvAfGH),${pins.map(
			(pin) => pin
		)}/auto/500x400?access_token=pk.eyJ1IjoibGVvc2hlZWNvb2wiLCJhIjoiY2wzY3N0NGN6MDBkMzNjdWxnb2dyZDJ0YiJ9.WeGtzvtdmHHN0oU5JR_GQw`;

		return (
			<div ref={ref} className={styles.container}>
				<img src={Logo} alt="Epic trip logo" />
				<h1>Recap</h1>
				<img src={mapImgUrl} alt="map" />
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
