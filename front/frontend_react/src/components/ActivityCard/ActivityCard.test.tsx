import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Activity } from 'lib/data.types';
import ActivityCard from './ActivityCard';

const activity: Activity = {
	title: 'Activity title',
	description: 'Activity description',
	venueName: 'Activity venue name',
	address: 'Activity address',
	labels: ['Activity label 1', 'Activity label 2'],
};

describe('ActivityCard', () => {
	it('should render correctly', () => {
		render(<ActivityCard activity={activity} />);
		expect(screen.getByText(activity.title)).toBeInTheDocument();
		expect(screen.getByText(activity.description)).toBeInTheDocument();
		expect(screen.getByText(activity.venueName)).toBeInTheDocument();
		expect(screen.getByText(activity.address)).toBeInTheDocument();
		expect(screen.getByText(activity.labels[0])).toBeInTheDocument();
		expect(screen.getByText(activity.labels[1])).toBeInTheDocument();
	});

	it('should render correctly with no labels', () => {
		render(<ActivityCard activity={{ ...activity, labels: [] }} />);
		expect(screen.queryByText(activity.labels[0])).not.toBeInTheDocument();
		expect(screen.queryByText(activity.labels[1])).not.toBeInTheDocument();
	});
});
