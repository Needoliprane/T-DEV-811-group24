import { BadgeCheckIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import cn from 'classnames';
import React from 'react';
import styles from './Stars.module.scss';

type Props = {
	rate: number;
	hasIcon?: boolean;
	className?: string;
};

const Stars = ({ rate, hasIcon, className: customClass }: Props) => {
	return (
		<div className={cn(styles.container, customClass)}>
			{hasIcon && <BadgeCheckIcon className={styles.icon} />}
			<div className={styles.starsContainer}>
				{new Array(rate).fill(0).map((_, index) => (
					<StarIcon key={index} className={styles.star} />
				))}
				{new Array(5 - rate).fill(0).map((_, index) => (
					<StarIcon key={index} className={styles.noStar} />
				))}
			</div>
		</div>
	);
};

export default Stars;
