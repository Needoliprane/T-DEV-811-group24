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
		return (
			<div ref={ref} className={styles.container}>
				<img src={Logo} alt="Epic trip logo" />
				<h1>Recap</h1>
				{hotels.map((hotel) => (
					<InfoCard hotel={hotel} key={hotel.id} isActivated={true} order={getPosition(hotel)} />
				))}
			</div>
		);
	}
);

export default PageToPrint;
