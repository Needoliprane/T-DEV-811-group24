import React from 'react';
import utils from '../../styles/utils.module.scss';
import styles from './SmallCard.module.scss';
import { default as cn } from 'classnames';
import { useNavigate } from 'react-router-dom';

type Props = {
	city: string;
	description: string;
	image: string;
	location: string;
	link: string;
};

const dark_pale_colors = [
	'#b21a1a',
	'#e08a1a',
	'#1a5fb2',
	'#1ae08a',
	'#e0b21a',
	'#1a1ab2',
	'#b21ae0',
	'#e01ab2',
];

const SmallCard = ({ image, city, description, location, link }: Props) => {
	const navigate = useNavigate();
	const containerStyle = {
		'--bg-color': dark_pale_colors[Math.floor(Math.random() * dark_pale_colors.length)],
	} as React.CSSProperties;

	return (
		<div
			className={cn(styles.container, utils.card)}
			style={containerStyle}
			aria-label="small card"
			onClick={() => {
				console.log(link);
				navigate(link);
			}}
		>
			<div className={styles.imageContainer}>
				<img src={image} alt="city" className={styles.imageContainer} />
			</div>
			<div className={styles.contentContainer} aria-label="card content">
				<h3 className={styles.city}>{city}</h3>
				<p className={styles.description} aria-label="description">
					{description}
				</p>
				<span className={styles.location} aria-label="location">
					{location}
				</span>
			</div>
		</div>
	);
};

export default SmallCard;
