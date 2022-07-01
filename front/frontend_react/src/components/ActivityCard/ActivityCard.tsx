import { Activity } from 'lib/data.types';
import React from 'react';
import styles from './ActivityCard.module.scss';
import utilsStyles from 'styles/utils.module.scss';
import cn from 'classnames';
import { HomeIcon, LocationMarkerIcon } from '@heroicons/react/outline';

const ActivityCard = ({ activity }: { activity: Activity }) => {
	return (
		<div className={cn(utilsStyles.card, styles.container)}>
			<div>
				<h3 className={styles.title}>{activity.title}</h3>
				<p className={styles.description}>{activity.description}</p>
				<div className={styles.infoContainer}>
					<HomeIcon className={styles.icon} />
					<p className={styles.address}>{activity.venueName}</p>
				</div>
				<div className={styles.infoContainer}>
					<LocationMarkerIcon className={styles.icon} />
					<p className={styles.address}>{activity.address}</p>
				</div>
			</div>
			<div className={styles.tagContainer}>
				{activity.labels.map?.((label) => (
					<span key={label} className={styles.tag}>
						{label}
					</span>
				))}
			</div>
		</div>
	);
};

export default ActivityCard;
