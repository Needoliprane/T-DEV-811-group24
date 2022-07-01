// export type Activity = {
// 	address: string;
// 	distance: number;
// 	id: string;
// 	location: {
// 		lat: number;
// 		lng: number;
// 	};
// 	name: string;
// 	phone_number: string;
// 	types: string[];
// };

export type Activity = {
	title: string;
	description: string;
	venueName: string;
	address: string;
	phoneNumber?: string;
	labels: string[];
};

export type EnjoyActivity = {
	id: string;
	title: string;
	description: string;
	labels: string[];
	location: number[];
	venue_name: string;
	address: string;
	country: string;
	start: string;
	end: string;
	timezone: string;
};

export type EnjoyResults = {
	count: number;
	events: EnjoyActivity[];
};

export type DrinkActivity = {
	id: string;
	name: string;
	address: string;
	phone_number: string;
	website: string;
	location: {
		lat: number;
		lng: number;
	};
	types: string[];
	distance: number;
};

export type DrinkResults = {
	results: DrinkActivity[];
};

export type Hotel = {
	address: {
		locality: string; // City
		postalCode: string; // Zip code
		region: string; // State
		streetAddress: string; // Street address
	};
	coordinate: {
		lat: number; // Latitude
		lon: number; // Longitude
	};
	guestReviews: {
		badge: string; // Badge
		badgeText: string; // Badge label
		rating: string; // Rating
		scale: number; // 0 to 5
		total: number; // Total number of reviews
		unformattedRating: number; // 0 to 5
	};
	id: number;
	name: string; // Name of hotel
	optimizedThumbUrls: {
		srpDesktop: string; // URL of optimized image for desktop (max width: 500px)
	}; // URL of optimized image for desktop (max width: 500px)
	ratePlan: {
		price: {
			current: string; // Price of hotel
			exactCurrent: number; // Price of hotel
			// info?: string;
			fullyBundledPricePerStay?: string; // Price of hotel
			old?: string; // Price of hotel
			// summary?: string;
		};
	};
	starRating: number; // 0 to 5
};

export type HotelResults = {
	filters: {
		landmarks: {
			items: {
				label: string;
				value: string;
			}[];
		};
		neighbourhood: {
			items: {
				label: string;
				value: string;
			}[];
		};
		themesAndTypes: {
			items: {
				label: string;
				value: string;
			}[];
		};
	};
	header: string; // Name of city
	searchResults: {
		results: Hotel[];
		totalCount: number; // Total number of results
	};
};

export type HotelDetails = {
	hotel_info: {
		address: {
			addressLine1: string;
			cityName: string;
			countryCode: string;
			countryName: string;
			fullAddress: string;
			pattern: string;
			postalCode: string;
			provinceName: string;
		};
		amenities: {
			// advantages of the hotel
			heading: string; // title of section
			listItems: {
				heading: string; // title of subsection
				listItems: string[]; // advantages
			}[];
		}[];
		atAGlance: {
			// about the hotel
			keyFacts: {
				// key facts about the hotel
				arrivingLeaving: string[]; // arrival and departure times
				hotelSize: string[]; // size of the hotel
				requiredAtCheckIn: string[]; // required at check in
				specialCheckInInstructions: string[]; // special check in instructions
			};
			transportAndOther: {
				// transport and other
				otherInclusions: string[]; // other inclusions
				otherInformation: string[]; // other information
				transport: {
					parking: string[]; // parking
					transfers: string[]; // transfers
				};
			};
			travellingOrInternet: {
				internet: string[]; // internet
				travelling: {
					children: string[]; // children
					extraPeople: string[]; // extra people
					pets: string[]; // pets
				};
			};
		};
		featuredPrice: {
			afterPriceText: string;
			beforePriceText: string;
			bookNowButton: boolean;
			currentPrice: { formatted: string; plain: number };
			pricingAvailability: string;
			pricingTooltip: string;
			taxInclusiveFormatting: boolean;
		};
		freebies: string[];
		header: {
			currencyCode: string;
			destinationId: string;
			hotelId: string;
			hotelLocation: {
				coordinates: {
					latitude: number;
					longitude: number;
				};
				locationName: string;
			};
		};
		hygieneAndCleanliness: {
			healthAndSafetyMeasures: {
				description: string;
				measures: string[];
				title: string;
			};
			hygieneQualifications: {
				qualifications: string[];
				title: string;
			};
			title: string;
		};
		mapWidget: {
			staticMapUrl: string; // URL of static map
		};
		name: string;
		neighborhood: {
			neighborhoodName: string;
		};
		overview: {
			// features list
			overviewSections: {
				content: string[];
				title?: string; // title of section
			}[];
		};
		reviews: {
			brands: {
				badgeText: string;
				formattedRating: string;
				formattedScale: string;
				lowRating: boolean;
				rating: number;
				scale: number;
				total: number;
			};
		};
		specialFeatures: {
			sections: {
				freeText: string;
				heading: string;
				listItems: never[];
				subsections: {
					heading: string;
					listItems: string[];
				}[];
			}[];
		};
		starRating: number; // 0 to 5 hotel's quality rating
		starRatingTitle: string; // hotel's quality rating formated
		tagline: string[]; // tagline of hotel
		transportation: {
			transportLocations: {
				category: string;
				locations: {
					distance?: string;
					distanceInTime?: string;
					name: string;
				}[];
			}[];
		};
	};
	hotel_photo: {
		mainUrl: string; // URL of main photo
	}[];
};
