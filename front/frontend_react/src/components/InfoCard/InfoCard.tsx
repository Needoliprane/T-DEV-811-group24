import { Hotel } from 'lib/data.types';
import React from 'react';
import utilsStyles from 'styles/utils.module.scss';
import styles from './InfoCard.module.scss';
import cn from 'classnames';
import {
	LocationMarkerIcon,
	MinusIcon,
	PlusIcon,
	HomeIcon,
	UserGroupIcon,
	HeartIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { Stars } from 'components';

type Props = {
	hotel: Hotel;
	onClick?: () => void;
	onOrderClick?: () => void;
	isActivated?: boolean;
	order?: number;
	url?: string;
};

const InfoCard = ({
	hotel,
	onClick,
	onOrderClick: handleOrderClick,
	isActivated,
	order,
	url,
}: Props) => {
	return (
		<div
			className={cn(utilsStyles.card, styles.container, { [styles.activated]: isActivated })}
			onClick={onClick}
		>
			<img
				src={hotel.optimizedThumbUrls.srpDesktop}
				alt="Hotel preview"
				className={styles.preview}
			/>
			<div style={{ flex: 1 }}>
				<Link to={url || `/hotels/${hotel.id}`} className={styles.name} target="_blank">
					{hotel.name}
				</Link>
				<div className={styles.infoContainer}>
					<Stars rate={Math.floor(hotel.starRating)} hasIcon />
				</div>
				<div className={styles.infoContainer}>
					<LocationMarkerIcon className={styles.icon} />
					<p className={styles.city}>
						{hotel.address.locality} ({hotel.address.postalCode})
					</p>
				</div>
				<div className={styles.infoContainer}>
					<HomeIcon className={styles.icon} />
					<p className={styles.address}>{hotel.address.streetAddress}</p>
				</div>
				{hotel.guestReviews && (
					<div className={styles.infoContainer}>
						<UserGroupIcon className={styles.icon} />
						<p className={styles.reviewsContainer}>
							<span
								className={styles.reviews}
							>{`${hotel.guestReviews.unformattedRating}/${hotel.guestReviews.scale} `}</span>
							{hotel.guestReviews.badgeText}
							{` (${hotel.guestReviews.total} reviews)`}
						</p>
					</div>
				)}
				<p className={styles.price}>{hotel.ratePlan.price.current}</p>
				<p className={styles.priceInfos}>
					{hotel.ratePlan.price.fullyBundledPricePerStay}(VAT incl.)
				</p>
			</div>
			{/* <p>{hotel.distance}m</p>
			<div className={styles.tagContainer}>
				{hotel.types?.map?.((type) => (
					<span key={type} className={styles.tag}>
						{activitiesList.find((a) => a.name === type)?.label}
					</span>
				))}
			</div> */}
			<div className={styles.listButton}>
				<HeartIcon className={styles.heartIcon} />
				<div className={styles.orderButton}>
					{order && <p className={styles.positionNb}>{order}</p>}
					{isActivated ? (
						<MinusIcon className={styles.orderIcon} onClick={handleOrderClick} />
					) : (
						<PlusIcon
							className={styles.orderIcon}
							onClick={handleOrderClick}
							style={{ display: 'block' }}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default InfoCard;
