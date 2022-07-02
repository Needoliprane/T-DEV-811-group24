import React, { useState } from 'react';
import useOutsideClicker from '../../hooks/useClickOutside';
import styles from './RangeSlider.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import cn from 'classnames';

type Props = {
	label: string;
	options?: { label: string; color?: string }[];
	selection: number[];
	onSelect: (value: number | number[]) => void;
	className?: string;
	min: number;
	max: number;
};

const RangeSlider = ({ label, selection, onSelect: handleSelect, min, max, className }: Props) => {
	const [isActive, setIsActive] = useState(false);
	const ref = useOutsideClicker(() => setIsActive(false));

	return (
		<div style={{ position: 'relative' }}>
			<button
				onClick={() => setIsActive(true)}
				className={`${styles.button} ${isActive ? styles.isActive : null}`}
			>
				{label}
			</button>
			{isActive && (
				<div role="list" className={cn(styles.overlay, className)} ref={ref}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<p>Min: {selection[0]}€</p>
						<p>Max: {selection[1]}€</p>
					</div>
					<Slider
						range
						allowCross={false}
						max={max}
						min={min}
						onChange={handleSelect}
						value={selection}
						className={styles.slider}
					/>
				</div>
			)}
		</div>
	);
};

export default RangeSlider;
