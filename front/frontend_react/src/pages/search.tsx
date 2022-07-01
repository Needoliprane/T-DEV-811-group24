// eslint-disable-line import/no-webpack-loader-syntax
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Header, InfoCard, Loading } from 'components';
import styles from 'styles/Search.module.scss';
import MultiSelect from 'components/MultiSelect/MultiSelect';
import axios from 'axios';
import { getRandomColor } from 'lib/utils';
import useSearch from 'hooks/useSearch';
import moment from 'moment';
import { Hotel, HotelResults } from 'lib/data.types';
import Map from 'components/Map/Map';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { mockedHotelResult } from '__mocks__/dataMock';
import { Helmet } from 'react-helmet-async';
import ReactToPrint from 'react-to-print';
import PageToPrint from 'components/PageToPrint/PageToPrint';

const Search = () => {
	const [Hotels, setHotels] = useState<HotelResults>(mockedHotelResult.data);
	const pageToPrintRef = React.useRef<HTMLDivElement>(null);
	const printBtnRef = React.useRef<HTMLButtonElement>(null);
	const [isLoading, setIsLoading] = useState(true);
	const filters = useMemo(
		() =>
			mockedHotelResult.data.filters.themesAndTypes.items.map((filter) => ({
				label: filter.label,
				color: getRandomColor(),
			})),
		[]
	);
	const [searchParams, setSearchParams] = useSearchParams();
	const [selectedActivities, setSelectedActivities] = useState<string[]>(
		searchParams.getAll('selectedActivities').length
			? searchParams.getAll('selectedActivities')
			: []
	);

	const [selectedLocations, setSelectedLocations] = useState<Hotel[]>();

	const { results: filtersToDisplay, handleSearch: handleFiltersSearch } = useSearch((search) =>
		filters.filter(
			(filter) =>
				search === '' ||
				filter.label.toLowerCase().match(search.toLowerCase().trim().replace(/\s/g, ''))
		)
	);

	const queryParams = useMemo(
		() => ({
			startDate: searchParams.get('startDate'),
			endDate: searchParams.get('endDate'),
			location: searchParams.get('location'),
			numberOfGuests: searchParams.get('numberOfGuests'),
		}),
		[searchParams]
	);

	const getResults = useCallback(async () => {
		if (!queryParams.location) return;
		const format = 'YYYY-MM-DD';
		let checkinDate = moment(queryParams.startDate).format(format);
		if (checkinDate === 'Invalid date') checkinDate = moment().format(format);
		let checkoutDate = moment(queryParams.endDate).format(format);
		if (checkoutDate === 'Invalid date') checkoutDate = moment().format(format);
		try {
			const hostelIdResult = await axios.get(
				`${process.env.REACT_APP_API_URI}/sleep/hotels/?search=${
					queryParams.location
				}&adults_number=${
					queryParams.numberOfGuests || 1
				}&checkin_date=${checkinDate}&checkout_date=${checkoutDate}`
			);
			setHotels(hostelIdResult.data);
		} catch (err) {}
		setIsLoading(false);
	}, [queryParams]);

	useEffect(() => {
		getResults();
	}, [getResults]);

	useEffect(() => {
		setSearchParams({
			location: queryParams.location as string,
			startDate: queryParams.startDate as string,
			endDate: queryParams.endDate as string,
			numberOfGuests: queryParams.numberOfGuests as string,
			selectedActivities,
		});
	}, [selectedActivities, setSearchParams, queryParams]);

	const fomatedStartDate = moment(queryParams.startDate as string).format('dd MMM yyyy');
	const formatedEndDate = moment(queryParams.endDate as string).format('dd MMM yyyy');

	const handleSelectActivities = (selected: string) => {
		setSelectedActivities((prev) =>
			prev.includes(selected) ? prev.filter((a) => a !== selected) : [...prev, selected]
		);
	};

	const { results: hotelsToDisplay, handleSearch } = useSearch<Hotel[]>((search) =>
		Hotels.searchResults.results.filter(
			(hotel) =>
				search === '' ||
				hotel.name.toLowerCase().match(search.toLowerCase().trim().replace(/\s/g, ''))
		)
	);

	const handleInfoCardOrderClick = (hotel: Hotel) => {
		setSelectedLocations((prev) => {
			if (!prev) return [hotel];
			if (prev?.find((a) => a.id === hotel.id)) {
				return prev.filter((a) => a.id !== hotel.id);
			}
			return [...prev, hotel];
		});
	};

	const getPosition = (hotel: Hotel) => {
		if (!selectedLocations) return;
		const pos = selectedLocations?.findIndex((a) => a.id === hotel.id);
		return pos === -1 ? undefined : pos + 1;
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (isLoading) {
		return (
			<div>
				<Header locationValue={queryParams.location as string} />
				<Loading />
			</div>
		);
	}

	const getUrl = (id: number) => {
		const params = createSearchParams({
			startDate: queryParams.startDate || new Date().toDateString(),
			endDate: queryParams.endDate || new Date().toDateString(),
			numberOfGuests: queryParams.numberOfGuests || '1',
		});

		return `/hotels/${id}?${params}`;
	};

	return (
		<div>
			<Helmet>
				<title>Search for {queryParams.location}</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Helmet>
			<Header locationValue={queryParams.location as string} />
			<main className={styles.container}>
				<section className={styles.section}>
					<p className={styles.searchInfo}>
						{hotelsToDisplay.length} stays for {queryParams.numberOfGuests} guest(s) starting at{' '}
						{fomatedStartDate} - {formatedEndDate}
					</p>
					<h1 className={styles.title}>Stays in {queryParams.location}</h1>
					<input placeholder="Name of place" onChange={handleSearch} className={styles.searchbar} />
					<div className={styles.filtersContainer}>
						<MultiSelect
							onSearch={handleFiltersSearch}
							label="Activities"
							selection={selectedActivities}
							onSelect={handleSelectActivities}
							options={filtersToDisplay}
							className={styles.activitiesList}
						/>
					</div>
					<div className={styles.infoCardContainer}>
						{selectedLocations && selectedLocations.length > 0 && (
							<>
								<h3 className={styles.selectedTitle}>Selected places</h3>
								{hotelsToDisplay
									.filter((hotel) => selectedLocations.some((a) => a.id === hotel.id))
									.sort((a, b) => (getPosition(a) || -1) - (getPosition(b) || -1))
									.map((hotel) => (
										<InfoCard
											hotel={hotel}
											key={hotel.id}
											onOrderClick={() => handleInfoCardOrderClick(hotel)}
											isActivated={true}
											order={getPosition(hotel)}
											url={getUrl(hotel.id)}
										/>
									))}
								<ReactToPrint
									trigger={() => (
										<button className={styles.button} ref={printBtnRef}>
											Print selected results
										</button>
									)}
									content={() => pageToPrintRef.current}
								/>
								<div style={{ display: 'none' }}>
									<PageToPrint
										hotels={hotelsToDisplay
											.filter((hotel) => selectedLocations?.some((a) => a.id === hotel.id))
											.sort((a, b) => (getPosition(a) || -1) - (getPosition(b) || -1))}
										onGetPosition={getPosition}
										ref={pageToPrintRef}
									/>
								</div>
								<div className={styles.delimiter}></div>
							</>
						)}
						{hotelsToDisplay
							.filter((hotel) => !selectedLocations?.some((a) => a.id === hotel.id))
							.map((hotel) => (
								<InfoCard
									hotel={hotel}
									key={hotel.id}
									onOrderClick={() => handleInfoCardOrderClick(hotel)}
									isActivated={false}
									order={getPosition(hotel)}
									url={getUrl(hotel.id)}
								/>
							))}
					</div>
				</section>
				<section className={styles.mapContainer}>
					<Map
						results={hotelsToDisplay
							.filter((hotel) => hotel.coordinate)
							.map((hotel) => ({
								coordinates: hotel.coordinate,
								name: hotel.name,
								address: hotel.address.streetAddress,
							}))}
						selectedWaypoints={selectedLocations?.map((hotel) => [
							hotel.coordinate.lon,
							hotel.coordinate.lat,
						])}
					/>
				</section>
			</main>
		</div>
	);
};

export default Search;
