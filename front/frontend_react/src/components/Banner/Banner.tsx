import React from 'react';
import styles from './Banner.module.scss';

type Props = {
	onClick?: () => void;
};

const Banner = ({ onClick: handleClick }: Props) => {
	return (
		<div className={styles.container} aria-label="banner">
			<img
				src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
				style={{ objectFit: 'cover', width: '100%', height: '100%' }}
				alt="background"
			/>
			<div className={styles.discoverContainer}>
				<p className={styles.text} aria-label="discover text">
					Discover activities nearby !
				</p>
				<button className={styles.button} onClick={handleClick}>
					Learn more
				</button>
			</div>
		</div>
	);
};

export default Banner;
