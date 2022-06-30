import { render, screen } from '@testing-library/react';
import LargeCard from './LargeCard';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

describe('LargeCard', () => {
	const testImage = 'https://via.placeholder.com/1080x1080';
	const testTitle = 'Test title';
	const testBtnText = 'Test button text';
	const testLink = 'https://www.google.com';

	beforeEach(() => {
		render(
			<Router>
				<LargeCard image={testImage} title={testTitle} btnText={testBtnText} link={testLink} />
			</Router>
		);
	});

	it('renders a large card', () => {
		const card = screen.getByRole('region', {
			name: /large card/i,
		});
		expect(card).toBeInTheDocument();
	});

	it('renders an image', () => {
		const image = screen.getByRole('img');
		expect(image).toBeInTheDocument();
		expect(image.getAttribute('alt')).toBe(testTitle);
	});

	it('renders a title', () => {
		const title = screen.getByRole('heading', {
			level: 3,
		});
		expect(title).toBeInTheDocument();
		expect(title.textContent).toBe(testTitle);
	});

	it('renders a button', () => {
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button.textContent).toBe(testBtnText);
	});
});
