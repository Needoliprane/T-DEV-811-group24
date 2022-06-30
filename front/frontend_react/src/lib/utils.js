import {
	addDays,
	endOfDay,
	startOfDay,
	startOfMonth,
	endOfMonth,
	addMonths,
	startOfWeek,
	endOfWeek,
	isSameDay,
	differenceInCalendarDays,
} from 'date-fns';
import { createStaticRanges } from 'react-date-range';
import { FaChild, FaTicketAlt, FaConciergeBell, FaWheelchair } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';

const defineds = {
	startOfWeek: startOfWeek(new Date()),
	endOfWeek: endOfWeek(new Date()),
	startOfNextWeek: startOfWeek(addDays(new Date(), 7)),
	endOfNextWeek: endOfWeek(addDays(new Date(), 7)),
	startOfToday: startOfDay(new Date()),
	endOfToday: endOfDay(new Date()),
	startOfTomorrow: startOfDay(addDays(new Date(), 1)),
	endOfTomorrow: endOfDay(addDays(new Date(), 1)),
	startOfMonth: startOfMonth(new Date()),
	endOfMonth: endOfMonth(new Date()),
	startOfNextMonth: startOfMonth(addMonths(new Date(), 1)),
	endOfNextMonth: endOfMonth(addMonths(new Date(), 1)),
};

export const staticRanges = createStaticRanges([
	{
		label: 'Today',
		range: () => ({
			startDate: defineds.startOfToday,
			endDate: defineds.endOfToday,
		}),
	},
	{
		label: 'Tomorrow',
		range: () => ({
			startDate: defineds.startOfTomorrow,
			endDate: defineds.endOfTomorrow,
		}),
	},

	{
		label: 'This Week',
		range: () => ({
			startDate: defineds.startOfToday,
			endDate: defineds.endOfWeek,
		}),
	},
	{
		label: 'Next Week',
		range: () => ({
			startDate: defineds.startOfNextWeek,
			endDate: defineds.endOfNextWeek,
		}),
	},
	{
		label: 'This Month',
		range: () => ({
			startDate: defineds.startOfToday,
			endDate: defineds.endOfMonth,
		}),
	},
	{
		label: 'Next Month',
		range: () => ({
			startDate: defineds.startOfNextMonth,
			endDate: defineds.endOfNextMonth,
		}),
	},
]);

export const inputRanges = [
	{
		label: 'days starting today',
		range(value) {
			const today = new Date();
			return {
				startDate: today,
				endDate: addDays(today, Math.max(Number(value), 1) - 1),
			};
		},
		getCurrentValue(range) {
			if (!isSameDay(range.startDate, defineds.startOfToday)) return '-';
			if (!range.endDate) return '∞';
			return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
		},
	},
];

export const colors = [
	'#f44336',
	'#e91e63',
	'#9c27b0',
	'#673ab7',
	'#3f51b5',
	'#2196f3',
	'#03a9f4',
	'#00bcd4',
	'#009688',
	'#4caf50',
	'#8bc34a',
	'#cddc39',
	'#ffeb3b',
	'#ffc107',
];

export const getRandomColor = () => {
	return colors[Math.floor(Math.random() * colors.length)];
};

export const activities = [
	{ name: 'airport', label: 'Airport', color: '#00bcd4' },
	{ name: 'amusement_park', label: 'Amusement Park', color: '#ffc107' },
	{ name: 'aquarium', label: 'Aquarium', color: '#ff9800' },
	{ name: 'art_gallery', label: 'Art Gallery', color: '#4caf50' },
	{ name: 'atm', label: 'ATM', color: '#2196f3' },
	{ name: 'bakery', label: 'Bakery', color: '#673ab7' },
	{ name: 'bank', label: 'Bank', color: '#f44336' },
	{ name: 'bar', label: 'Bar', color: '#9c27b0' },
	{ name: 'beauty_salon', label: 'Beauty Salon', color: '#3f51b5' },
	{ name: 'bicycle_store', label: 'Bicycle Store', color: '#795548' },
	{ name: 'book_store', label: 'Book Store', color: '#607d8b' },
	{ name: 'bowling', label: 'Bowling', color: '#ff5722' },
	{ name: 'bus_station', label: 'Bus Station', color: '#ffeb3b' },
	{ name: 'cafe', label: 'Cafe', color: '#9e9e9e' },
	{ name: 'campground', label: 'Campground', color: '#8bc34a' },
	{ name: 'car_dealer', label: 'Car Dealer', color: '#673ab7' },
	{ name: 'car_rental', label: 'Car Rental', color: '#3f51b5' },
	{ name: 'car_repair', label: 'Car Repair', color: '#795548' },
	{ name: 'car_wash', label: 'Car Wash', color: '#607d8b' },
	{ name: 'casino', label: 'Casino', color: '#ff5722' },
	{ name: 'cemetery', label: 'Cemetery', color: '#ffeb3b' },
	{ name: 'church', label: 'Church', color: '#9e9e9e' },
	{ name: 'cinema', label: 'Cinema', color: '#8bc34a' },
	{ name: 'city_hall', label: 'City Hall', color: '#673ab7' },
	{ name: 'clothing_store', label: 'Clothing Store', color: '#3f51b5' },
	{ name: 'convenience_store', label: 'Convenience Store', color: '#795548' },
	{ name: 'courthouse', label: 'Courthouse', color: '#607d8b' },
	{ name: 'dentist', label: 'Dentist', color: '#ff5722' },
	{ name: 'department_store', label: 'Department Store', color: '#ffeb3b' },
	{ name: 'doctor', label: 'Doctor', color: '#9e9e9e' },
	{ name: 'electrician', label: 'Electrician', color: '#8bc34a' },
	{ name: 'electronics_store', label: 'Electronics Store', color: '#673ab7' },
	{ name: 'embassy', label: 'Embassy', color: '#3f51b5' },
	{ name: 'fire_station', label: 'Fire Station', color: '#795548' },
	{ name: 'flowers_store', label: 'Flowers Store', color: '#607d8b' },
	{ name: 'funeral_service', label: 'Funeral Service', color: '#ff5722' },
	{ name: 'furniture_store', label: 'Furniture Store', color: '#ffeb3b' },
	{ name: 'gas_station', label: 'Gas Station', color: '#9e9e9e' },
	{ name: 'government_office', label: 'Government Office', color: '#8bc34a' },
	{ name: 'grocery_store', label: 'Grocery Store', color: '#673ab7' },
	{ name: 'gym', label: 'Gym', color: '#3f51b5' },
	{ name: 'hairdressing_salon', label: 'Hairdressing Salon', color: '#795548' },
	{ name: 'hardware_store', label: 'Hardware Store', color: '#607d8b' },
	{ name: 'health', label: 'Health', color: '#ff5722' },
	{ name: 'home_goods_store', label: 'Home Goods Store', color: '#ff5722' },
	{ name: 'hospital', label: 'Hospital', color: '#ffeb3b' },
	{ name: 'insurance_agency', label: 'Insurance Agency', color: '#9e9e9e' },
	{ name: 'jewelry_store', label: 'Jewelry Store', color: '#8bc34a' },
	{ name: 'laundry', label: 'Laundry', color: '#673ab7' },
	{ name: 'lawyer', label: 'Lawyer', color: '#3f51b5' },
	{ name: 'library', label: 'Library', color: '#795548' },
	{ name: 'liquor_store', label: 'Liquor Store', color: '#607d8b' },
	{ name: 'locksmith', label: 'Locksmith', color: '#ff5722' },
	{ name: 'lodging', label: 'Lodging', color: '#ffeb3b' },
	{ name: 'mosque', label: 'Mosque', color: '#9e9e9e' },
	{ name: 'museum', label: 'Museum', color: '#8bc34a' },
	{ name: 'night_club', label: 'Night Club', color: '#673ab7' },
	{ name: 'park', label: 'Park', color: '#3f51b5' },
	{ name: 'parking', label: 'Parking', color: '#795548' },
	{ name: 'pet_store', label: 'Pet Store', color: '#607d8b' },
	{ name: 'pharmacy', label: 'Pharmacy', color: '#ff5722' },
	{ name: 'place_of_worship', label: 'Place of worship', color: '#8bc34a' },
	{ name: 'plumber', label: 'Plumber', color: '#ffeb3b' },
	{ name: 'police_station', label: 'Police Station', color: '#9e9e9e' },
	{ name: 'post_office', label: 'Post Office', color: '#8bc34a' },
	{ name: 'primary_school', label: 'Primary School', color: '#673ab7' },
	{ name: 'rail_station', label: 'Rail Station', color: '#3f51b5' },
	{ name: 'real_estate_agency', label: 'Real Estate Agency', color: '#795548' },
	{ name: 'restaurant', label: 'Restaurant', color: '#607d8b' },
	{ name: 'rv_park', label: 'RV Park', color: '#ff5722' },
	{ name: 'school', label: 'School', color: '#ffeb3b' },
	{ name: 'secondary_school', label: 'Secondary School', color: '#9e9e9e' },
	{ name: 'shoe_store', label: 'Shoe Store', color: '#8bc34a' },
	{ name: 'shopping_center', label: 'Shopping Center', color: '#673ab7' },
	{ name: 'spa', label: 'Spa', color: '#3f51b5' },
	{ name: 'stadium', label: 'Stadium', color: '#795548' },
	{ name: 'storage', label: 'Storage', color: '#607d8b' },
	{ name: 'store', label: 'Store', color: '#ff5722' },
	{ name: 'subway_station', label: 'Subway Station', color: '#ffeb3b' },
	{ name: 'supermarket', label: 'Supermarket', color: '#9e9e9e' },
	{ name: 'synagogue', label: 'Synagogue', color: '#8bc34a' },
	{ name: 'taxi_stand', label: 'Taxi Stand', color: '#673ab7' },
	{ name: 'temple', label: 'Temple', color: '#3f51b5' },
	{ name: 'tourist_attraction', label: 'Tourist Attraction', color: '#795548' },
	{ name: 'train_station', label: 'Train Station', color: '#607d8b' },
	{ name: 'transit_station', label: 'Transit Station', color: '#ff5722' },
	{ name: 'travel_agency', label: 'Travel Agency', color: '#ffeb3b' },
	{ name: 'university', label: 'University', color: '#9e9e9e' },
	{ name: 'veterinarian', label: 'Veterinarian', color: '#8bc34a' },
	{ name: 'zoo', label: 'Zoo', color: '#673ab7' },
];

export const amenitiesIcons = [
	{ name: 'Taking the kids?', img: FaChild },
	{ name: 'Food and drink', img: MdFastfood },
	{ name: 'Things to do', img: FaTicketAlt },
	{ name: 'Working away', img: BsFillBriefcaseFill },
	{ name: 'Services', img: FaConciergeBell },
	{ name: 'Facilities', img: AiOutlineCheck },
	{ name: 'Accessibility', img: FaWheelchair },
	{ name: 'Languages Spoken', img: FaTicketAlt },
	{ name: 'Home comforts', img: FaTicketAlt },
	{ name: 'Sleep well', img: FaTicketAlt },
	{ name: 'Freshen up', img: FaTicketAlt },
	{ name: 'Be entertained', img: FaTicketAlt },
	{ name: 'Stay connected', img: FaTicketAlt },
	{ name: 'More', img: FaTicketAlt },
];
