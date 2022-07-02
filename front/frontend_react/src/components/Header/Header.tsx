import React, { useState } from 'react';
import { MenuIcon, SearchIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/outline';
import { default as cn } from 'classnames';
import { Popover } from '../';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import styles from './Header.module.scss';
import { DateRange, DefinedRange, RangeKeyDict } from 'react-date-range';
import { inputRanges, staticRanges } from '../../lib/utils';
import { useForm } from 'react-hook-form';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import Logo from 'assets/images/logo trip 1.png';

type Inputs = {
	location: string;
	numberOfGuests: number;
};

type datesRange = {
	startDate?: Date;
	endDate?: Date;
};

type Props = {
	locationValue?: string;
};

const Header = ({ locationValue }: Props) => {
	const [isMenuExpended, setIsMenuExpended] = useState(false);
	const [isSearchExpended, setIsSearchExpended] = useState(false);

	const { register, getValues } = useForm<Inputs>({
		defaultValues: {
			location: locationValue || '',
			numberOfGuests: 1,
		},
	});

	const [dates, setDates] = useState<datesRange>({
		startDate: new Date(),
		endDate: new Date(),
	});

	const navigate = useNavigate();

	const handleSelect = (ranges: RangeKeyDict) => {
		console.log(ranges.selection);
		const { startDate, endDate } = ranges.selection;
		setDates({ startDate, endDate });
	};

	const handleSearch = () => {
		const { location, numberOfGuests } = getValues();

		const params = createSearchParams({
			location,
			numberOfGuests: numberOfGuests.toString(),
			startDate: dates.startDate?.toDateString() || '',
			endDate: dates.endDate?.toDateString() || '',
		});

		navigate({
			pathname: '/search',
			search: `?${params}`,
		});
	};

	const selectionRange = {
		startDate: dates.startDate,
		endDate: dates.endDate,
		key: 'selection',
	};

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<img src={Logo} alt="Epic trip" className={styles.logo} onClick={() => navigate('/')} />
				<div className={styles.inputContainer}>
					<input
						type="text"
						placeholder="Search a location"
						aria-label="Search"
						className={styles.input}
						{...register('location')}
						onFocus={() => setIsSearchExpended(true)}
					/>
					<button className={styles.searchIcon} aria-label="search" onClick={handleSearch}>
						<SearchIcon height="100%" width="100%" aria-label="search icon" />
						<span className={styles.searchText}>Search</span>
					</button>
				</div>
				<div className={styles.user}>
					<button
						className={styles.menuBtn}
						onClick={() => setIsMenuExpended(true)}
						aria-label="menu"
					>
						<MenuIcon className={styles.menuIcon} aria-label="menu icon" />
						<UserCircleIcon className={styles.userCircleIcon} aria-label="user avatar icon" />
					</button>
					<Popover
						className={cn(styles.menu, { [styles.show]: isMenuExpended })}
						onClose={() => setIsMenuExpended(false)}
					>
						<ul>
							<li className={styles.btn}>
								<Link to="/login">Login</Link>
							</li>
						</ul>
					</Popover>
				</div>
			</div>
			{isSearchExpended && (
				// <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
				<Popover onClose={() => setIsSearchExpended(false)}>
					<div className={styles.advancedSeachContainer}>
						<div className={styles.rangesContainer}>
							<DefinedRange
								ranges={[selectionRange]}
								staticRanges={staticRanges}
								inputRanges={inputRanges}
								onChange={handleSelect}
							/>
							<div>
								<DateRange ranges={[selectionRange]} minDate={new Date()} onChange={handleSelect} />
							</div>
						</div>

						<div className={styles.guestsInputGroup}>
							<label
								htmlFor="#inputNbGuest"
								className={styles.advancedSearchGuestNbTitle}
								aria-label="guest number"
							>
								Number of guests
							</label>
							<div className={styles.guestNbInput}>
								<input
									id="inputNbGuest"
									type="number"
									placeholder="1"
									min={1}
									{...register('numberOfGuests')}
								/>
								<UsersIcon height={20} width={20} />
							</div>
						</div>
					</div>
				</Popover>
			)}
		</header>
	);
};

export default Header;
