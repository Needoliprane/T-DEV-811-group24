import { Header, Stars } from 'components';
import { HotelDetails } from 'lib/data.types';
import React from 'react';
import { useParams } from 'react-router-dom';
import { mockedHotelDetailsEn } from '__mocks__/dataMock';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import cn from 'classnames';
import styles from './Details.module.scss';
import utilsStyles from 'styles/utils.module.scss';

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Map from 'components/Map/Map';

const Details = () => {
	const { id } = useParams();
	const hotelDetails: HotelDetails = mockedHotelDetailsEn.data;

	const { latitude: lat, longitude: lon } =
		hotelDetails.hotel_info.header.hotelLocation.coordinates;

	const renderFeature = (content, index) => (
		<p
			key={index + content}
			dangerouslySetInnerHTML={{ __html: content }}
			className={styles.featureDescription}
		/>
	);

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
								<p className={styles.price}>
									{hotelDetails.hotel_info.featuredPrice.currentPrice.formatted}
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
			</div>
		</div>
	);
};

export default Details;
