import { render } from '@testing-library/react';
import NotFoundPage from '../pages/404';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Not found page', () => {
	it('renders the component', () => {
		render(
			<Router>
				<NotFoundPage />
			</Router>
		);
	});
});
