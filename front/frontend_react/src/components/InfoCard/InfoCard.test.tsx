import { render, screen } from '@testing-library/react';
import InfoCard from './InfoCard';
import '@testing-library/jest-dom';
// eslint-disable-next-line jest/no-mocks-import
import { mockedHotelResult } from '__mocks__/dataMock';
import { BrowserRouter as Router } from 'react-router-dom';

describe('InfoCard', () => {
	const mockedHotel = mockedHotelResult.data.searchResults.results[0];

	it('should render correctly', () => {
		render(
			<Router>
				<InfoCard hotel={mockedHotel} />
			</Router>
		);
		expect(screen.getByText(mockedHotel.name)).toBeInTheDocument();
		expect(
			screen.getByText(`${mockedHotel.address.locality} (${mockedHotel.address.postalCode})`)
		).toBeInTheDocument();
		expect(screen.getByText(mockedHotel.address.streetAddress)).toBeInTheDocument();
		expect(screen.getByText(mockedHotel.ratePlan.price.current)).toBeInTheDocument();
		expect(
			screen.getByText(
				`${mockedHotel.guestReviews.unformattedRating}/${mockedHotel.guestReviews.scale}`
			)
		).toBeInTheDocument();
	});
});
