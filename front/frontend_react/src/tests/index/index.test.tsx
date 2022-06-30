import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Home', () => {
	it('renders a heading', () => {
		render(
			<Router>
				<Home />
			</Router>
		);

		const heading = screen.getByRole('heading', {
			name: /Web project/i,
		});

		expect(heading).toBeInTheDocument();
	});
});
