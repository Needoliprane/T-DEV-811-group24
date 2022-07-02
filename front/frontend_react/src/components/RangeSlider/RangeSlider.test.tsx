import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RangeSlider from './RangeSlider';

describe('RangeSlider', () => {
	const testMin = 0;
	const testMax = 100;
	const testValue = 50;
	const testOnChange = (val: number | number[]) => console.log(val);
	const testSelection = [testValue - 10, testValue + 10];

	it('renders a min and max value', () => {
		render(
			<RangeSlider
				label="Test label"
				min={testMin}
				max={testMax}
				selection={testSelection}
				onSelect={testOnChange}
			/>
		);
		const label = screen.getByRole('button', {
			name: 'Test label',
		});
		act(() => label.click());
		const min = screen.getByLabelText('MinPrice');
		const max = screen.getByLabelText('MaxPrice');
		expect(min).toBeInTheDocument();
		expect(max).toBeInTheDocument();

		expect(min.textContent).toBe(`Min: ${testSelection[0].toString()}€`);
		expect(max.textContent).toBe(`Max: ${testSelection[1].toString()}€`);
	});
});
