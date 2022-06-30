import { render, screen, within } from '@testing-library/react';
import Header from './Header';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Header display', () => {
	beforeEach(() => {
		// eslint-disable-next-line testing-library/no-render-in-setup
		render(
			<Router>
				<Header />
			</Router>
		);
	});

	it('renders a heading', () => {
		const heading = screen.getByRole('heading', {
			name: /Web project/i,
		});
		expect(heading).toBeInTheDocument();
	});

	it('renders a input', () => {
		const searchbar = screen.getByRole('textbox', {
			name: /search/i,
		});
		expect(searchbar).toBeInTheDocument();
	});

	it('renders a search button with a text and an icon', () => {
		const searchButton = screen.getByRole('button', {
			name: /search/i,
		});
		const btnText = within(searchButton).getByText('Search');
		const btnIcon = within(searchButton).getByLabelText('search icon');

		expect(searchButton).toBeInTheDocument();
		expect(btnText).toBeInTheDocument();
		expect(btnIcon).toBeInTheDocument();
	});

	it('renders a user menu button', () => {
		const menuButton = screen.getByRole('button', {
			name: 'menu',
		});
		const btnText = within(menuButton).getByLabelText('menu icon');
		const btnIcon = within(menuButton).getByLabelText('user avatar icon');

		expect(menuButton).toBeInTheDocument();
		expect(btnText).toBeInTheDocument();
		expect(btnIcon).toBeInTheDocument();
	});
});

describe('Header behaviour', () => {
	beforeEach(() => {
		// eslint-disable-next-line testing-library/no-render-in-setup
		render(
			<Router>
				<Header />
			</Router>
		);
	});

	it('renders a search input and when not empty display a popover', async () => {
		const user = userEvent.setup();
		const searchbar = screen.getByRole('textbox', {
			name: /search/i,
		});
		await user.click(searchbar);
		await user.keyboard('Paris');
		expect(screen.getByText('Number of guests')).toBeInTheDocument();
	});
});
