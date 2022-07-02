// eslint-disable-line import/no-webpack-loader-syntax
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Header, InfoCard, Loading, RangeSlider } from 'components';
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
	const [Hotels, setHotels] = useState<HotelResults>();
	const [priceFilter, setPriceFilter] = useState<number[]>([0, 1000]);
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

	const getCorrectDates = (checkin: string | null, checkout: string | null) => {
		const format = 'YYYY-MM-DD';
		const now = moment();
		let checkinDate = moment(checkin).format(format);
		if (checkinDate === 'Invalid date' || now.diff(moment(checkinDate)) > 0)
			checkinDate = moment().format(format);
		let checkoutDate = moment(checkout).format(format);
		if (checkoutDate === 'Invalid date' || now.diff(moment(checkoutDate)) > 0)
			checkoutDate = moment().format(format);
		return { checkinDate, checkoutDate };
	};

	const queryParams = useMemo(() => {
		const { checkinDate: startDate, checkoutDate: endDate } = getCorrectDates(
			searchParams.get('startDate'),
			searchParams.get('endDate')
		);
		const location = searchParams.get('location');
		const numberOfGuests = searchParams.get('numberOfGuests');
		const selectedHotels = searchParams.getAll('selectedHotels');

		return {
			startDate,
			endDate,
			location,
			numberOfGuests: numberOfGuests ? Math.abs(parseInt(numberOfGuests)).toString() : '1',
			selectedHotels,
		};
	}, [searchParams]);

	const getResults = useCallback(async () => {
		if (!queryParams.location) return;

		const checkinDate = queryParams.startDate;
		const checkoutDate = queryParams.endDate;

		try {
			const hostelIdResult = await axios.get(
				`${process.env.REACT_APP_API_URI}/sleep/hotels/?search=${
					queryParams.location
				}&adults_number=${
					queryParams.numberOfGuests || 1
				}&checkin_date=${checkinDate}&checkout_date=${checkoutDate}`
			);
			setHotels(hostelIdResult.data);
			setPriceFilter([0, 1000]);
		} catch (err) {}
		setIsLoading(false);
	}, [queryParams]);

	useEffect(() => {
		const selectedHotels = queryParams.selectedHotels;
		if (selectedHotels.length > 0 && Hotels && Hotels.searchResults.results.length > 0) {
			setSelectedLocations(
				Hotels.searchResults.results.filter((hotel) => {
					return selectedHotels.includes(hotel.id.toString());
				})
			);
		}
	}, [Hotels, queryParams]);

	const maxPrice = useMemo(
		() =>
			Math.max(
				...(Hotels?.searchResults.results.map((hotel) => hotel.ratePlan.price.exactCurrent) || [0])
			),
		[Hotels]
	);
	const minPrice = useMemo(
		() =>
			Math.min(
				...(Hotels?.searchResults.results.map((hotel) => hotel.ratePlan.price.exactCurrent) || [0])
			),
		[Hotels]
	);

	useEffect(() => {
		if (Hotels && Hotels?.searchResults.results.length > 0) {
			setPriceFilter([minPrice, maxPrice]);
		}
	}, [Hotels, minPrice, maxPrice]);

	useEffect(() => {
		getResults();
	}, [getResults]);

	useEffect(() => {
		const selectedHotels =
			selectedLocations?.map((hotel) => hotel.id.toString()) || queryParams.selectedHotels || [];
		setSearchParams({
			location: queryParams.location as string,
			startDate: queryParams.startDate,
			endDate: queryParams.endDate,
			numberOfGuests: queryParams.numberOfGuests,
			selectedActivities,
			selectedHotels,
		});
	}, [selectedActivities, selectedLocations, setSearchParams, queryParams]);

	const fomatedStartDate = moment(queryParams.startDate).format('dd. DD of MMM yyyy');
	const formatedEndDate = moment(queryParams.endDate).format('dd. DD of MMM yyyy');

	const handleSelectActivities = (selected: string) => {
		setSelectedActivities((prev) =>
			prev.includes(selected) ? prev.filter((a) => a !== selected) : [...prev, selected]
		);
	};

	const matchPrice = (price: number) => {
		return price >= priceFilter[0] && price <= priceFilter[1];
	};

	const { results: hotelsToDisplay, handleSearch } = useSearch<Hotel[]>(
		(search) =>
			Hotels?.searchResults?.results?.filter(
				(hotel) =>
					(search === '' ||
						hotel.name.toLowerCase().match(search.toLowerCase().trim().replace(/\s/g, ''))) &&
					matchPrice(hotel.ratePlan.price.exactCurrent)
			) || []
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
						<RangeSlider
							label="Price"
							max={maxPrice}
							min={minPrice}
							selection={priceFilter}
							onSelect={(val) => setPriceFilter(val as number[])}
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
