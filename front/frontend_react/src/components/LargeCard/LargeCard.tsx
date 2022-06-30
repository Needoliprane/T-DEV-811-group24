import React from 'react';
import { default as cn } from 'classnames';
import utils from '../../styles/utils.module.scss';
import styles from './LargeCard.module.scss';
import { useNavigate } from 'react-router-dom';

type Props = {
	image: string;
	title: string;
	btnText: string;
	link: string;
};

const LargeCard = ({ image, title, btnText, link }: Props) => {
	const navigate = useNavigate();

	return (
		<section className={cn(utils.card, styles.container, '')} aria-label="large card">
			<div className={styles.imageContainer} aria-label="image container">
				<img src={image} alt={title} className={styles.imageContainer} />
			</div>
			<div className={styles.infos} aria-label="infos container">
				<h3 className={styles.title}>{title}</h3>
				<button className={styles.button} onClick={() => navigate(link)}>
					{btnText}
				</button>
			</div>
		</section>
	);
};

export default LargeCard;
