import { ActivityCard, Header, Loading, Stars } from 'components';
import { DrinkActivity, EnjoyActivity, HotelDetails } from 'lib/data.types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import cn from 'classnames';
import styles from './Details.module.scss';
import utilsStyles from 'styles/utils.module.scss';

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Map from 'components/Map/Map';
import moment from 'moment';
import axios from 'axios';

const Details = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [hotelDetails, setHotelDetails] = useState<HotelDetails>();
	const [nearbyEnjoyActivities, setNearbyEnjoyActivities] = useState<EnjoyActivity[]>();
	const [nearbyDrinkActivities, setNearbyDrinkActivities] = useState<DrinkActivity[]>();
	const [isLoading, setIsLoading] = React.useState(true);
	const [searchParams] = useSearchParams();

	const queryParams = useMemo(
		() => ({
			startDate: searchParams.get('startDate'),
			endDate: searchParams.get('endDate'),
			numberOfGuests: searchParams.get('numberOfGuests'),
		}),
		[searchParams]
	);

	const getActivitiesResults = useCallback(async () => {
		if (!hotelDetails) return;
		try {
			const enjoyActivitiesResult = await axios.get(
				`${process.env.REACT_APP_API_URI}/enjoy/${hotelDetails.hotel_info.address.cityName}`
			);
			setNearbyEnjoyActivities(enjoyActivitiesResult.data.events);
			const drinkActivitiesResult = await axios.get(
				`${process.env.REACT_APP_API_URI}/drink/${hotelDetails.hotel_info.address.cityName}`
			);
			setNearbyDrinkActivities(drinkActivitiesResult.data.results);
		} catch (err) {}
	}, [hotelDetails]);

	const getResults = useCallback(async () => {
		if (!id) return;
		const format = 'YYYY-MM-DD';
		let checkinDate = moment(queryParams.startDate).format(format);
		if (checkinDate === 'Invalid date') checkinDate = moment().format(format);
		let checkoutDate = moment(queryParams.endDate).format(format);
		if (checkoutDate === 'Invalid date') checkoutDate = moment().format(format);
		try {
			const hostelIdResult = await axios.get(
				`${process.env.REACT_APP_API_URI}/sleep/details/?id=${id}&adults_number=${
					queryParams.numberOfGuests || 1
				}&checkin_date=${checkinDate}&checkout_date=${checkoutDate}`
			);
			setHotelDetails(hostelIdResult.data);
		} catch (err) {}
		setIsLoading(false);
	}, [queryParams, id]);

	useEffect(() => {
		getResults();
	}, [getResults]);

	useEffect(() => {
		getActivitiesResults();
	}, [getActivitiesResults]);

	console.log(hotelDetails);
	const { latitude: lat, longitude: lon } = hotelDetails?.hotel_info.header.hotelLocation
		.coordinates || { latitude: 0, longitude: 0 };

	const renderFeature = (content, index) => (
		<p
			key={index + content}
			dangerouslySetInnerHTML={{ __html: content }}
			className={styles.featureDescription}
		/>
	);

	if (isLoading && !hotelDetails)
		return (
			<div>
				<Header />
				<Loading />
			</div>
		);

	if (!isLoading && !hotelDetails) {
		navigate('/404');
		return <div>test 1</div>;
	}

	if (!hotelDetails) {
		navigate('/404');
		return <div>test</div>;
	}

	const formattedEnjoy =
		nearbyEnjoyActivities?.map((activity) => ({
			coordinates: { lat: activity.location[1], lon: activity.location[0] },
			name: activity.title,
			address: activity.address,
		})) || [];
	const formattedDrink =
		nearbyDrinkActivities?.map((activity) => ({
			coordinates: { lat: activity.location.lat, lon: activity.location.lng },
			name: activity.name,
			address: activity.address,
		})) || [];

	return (
		<div>
			<Header />
			{/* <h1>Details {id}</h1> */}
			<div className={styles.container}>
				<Swiper
					pagination={{
						dynamicBullets: true,
					}}
					navigation={true}
					modules={[Pagination, Navigation, Autoplay]}
					className={styles.swiper}
					autoplay={{ delay: 5000 }}
				>
					{hotelDetails.hotel_photo.map((photo) => (
						<SwiperSlide key={photo.mainUrl}>
							<img src={photo.mainUrl} alt="preview" className={styles.image} />
						</SwiperSlide>
					))}
				</Swiper>
				<div className={cn(utilsStyles.card, styles.infosContainer)}>
					<div className={styles.overview}>
						<div className={styles.header}>
							<div>
								<h3 className={styles.title}>{hotelDetails.hotel_info.name}</h3>
								<Stars
									rate={hotelDetails.hotel_info.starRating}
									className={styles.starsContainer}
								/>
								{hotelDetails.hotel_info.tagline.map((tag, index) => (
									<p
										dangerouslySetInnerHTML={{ __html: tag }}
										className={styles.tagline}
										key={index}
									/>
								))}

								<p>
									<span className={styles.price}>
										{hotelDetails.hotel_info.featuredPrice.currentPrice.formatted}
									</span>
									for {queryParams.numberOfGuests} from the{' '}
									{moment(queryParams.startDate).format('dddd, MMMM Do YYYY')} to the{' '}
									{moment(queryParams.endDate).format('dddd, MMMM Do YYYY')}
								</p>
							</div>
							<div className={styles.mapContainer}>
								<Map
									results={[
										{
											coordinates: { lat, lon },
											name: hotelDetails.hotel_info.name,
											address: hotelDetails.hotel_info.address.fullAddress,
										},
									]}
									zoom={15}
								/>
								<p></p>
							</div>
						</div>
						<h3 className={styles.sectionTitle}>Main features</h3>
						<div className={styles.featuresContainer}>
							{hotelDetails.hotel_info.overview.overviewSections.map((section, index) => (
								<div key={index} className={styles.section}>
									<h4 className={styles.featureTitle}>{section.title}</h4>
									{section.content.map(renderFeature)}
								</div>
							))}
						</div>
						<h3 className={styles.sectionTitle}>Special features</h3>
						<div className={styles.featuresContainer}>
							{hotelDetails.hotel_info.specialFeatures.sections.map((section, index) => (
								<div key={section.heading + index} className={styles.section}>
									<h4 className={styles.featureTitle}>{section.heading}</h4>
									{section.freeText && renderFeature([section.freeText], 1)}
									{section.freeText !== '' && section.listItems.map(renderFeature)}
									{section.subsections.map((content, index1) => (
										<div key={content.heading + index1}>
											<h5 className={styles.subsectionTitle}>{content.heading}</h5>
											{content.listItems.map(renderFeature)}
										</div>
									))}
								</div>
							))}
						</div>
					</div>
				</div>
				<div className={cn(utilsStyles.card, styles.card)}>
					<h3 className={styles.sectionTitle}>Amenities</h3>
					{hotelDetails.hotel_info.amenities.map((section, index) => (
						<div className={styles.amenitiesSection}>
							<h4 className={styles.featureTitle} style={{ textDecoration: 'underline' }}>
								{section.heading}
							</h4>
							<div
								key={section.heading + index}
								className={cn(styles.featuresContainer, styles.amenitiesSection)}
							>
								{section.listItems.map((content) => (
									<div>
										<h5 className={styles.featureTitle}>{content.heading}</h5>
										{content.listItems.map(renderFeature)}
									</div>
								))}
							</div>
						</div>
					))}
				</div>
				{formattedDrink.length > 0 && formattedEnjoy.length > 0 && (
					<div className={cn(utilsStyles.card, styles.card)}>
						<h3 className={styles.sectionTitle}>Activities nearby</h3>
						<div className={styles.activitiesMapContainer}>
							<Map results={[...formattedEnjoy, ...formattedDrink]} zoom={11} />
						</div>
						<h5 className={styles.featureTitle}>Enjoy</h5>
						<div className={styles.activiyContainer}>
							{nearbyEnjoyActivities?.map((event, index) => (
								<ActivityCard key={index} activity={{ ...event, venueName: event.venue_name }} />
							))}
						</div>
						<h5 className={styles.featureTitle}>Drinks</h5>
						<div className={styles.activiyContainer}>
							{nearbyDrinkActivities?.map((event, index) => (
								<ActivityCard
									key={index}
									activity={{
										...event,
										venueName: event.name,
										title: event.name,
										labels: event.types,
										description: 'Drink activity',
									}}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Details;
