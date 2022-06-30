import { render } from '@testing-library/react';
import InternalServerError from '../pages/500';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Internal server error page', () => {
	it('renders the component', () => {
		render(
			<Router>
				<InternalServerError />
			</Router>
		);
	});
});
