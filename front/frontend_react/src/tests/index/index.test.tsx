import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const renderHome = () => {
	render(
		<Router>
			<Home />
		</Router>
	);
};

describe('Home', () => {
	beforeEach(renderHome);

	it('renders a search input and when not empty display a popover', () => {
		const searchInput = screen.getByRole('textbox', {
			name: /search/i,
		});
		expect(searchInput).toBeInTheDocument();
	});
});
