import { render, screen } from '@testing-library/react';
import ErrorPage from './ErrorPage';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Not found page', () => {
	const testTitle = 'Test title';
	const testDescription = 'Test description';

	beforeEach(() => {
		// eslint-disable-next-line testing-library/no-render-in-setup
		render(
			<Router>
				<ErrorPage title={testTitle} description={testDescription} />
			</Router>
		);
	});

	it('renders an error title', () => {
		const errorTitle = screen.getByRole('heading', {
			level: 1,
		});

		expect(errorTitle).toBeInTheDocument();
		expect(errorTitle.textContent).toBe(testTitle);
	});

	it('renders an error description', () => {
		const errorDescription = screen.getByRole('heading', {
			level: 2,
		});
		expect(errorDescription).toBeInTheDocument();
		expect(errorDescription.textContent).toBe(testDescription);
	});

	it('renders a button to go back to the home page', () => {
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button.textContent).toBe('Return to the home page');
	});
});
