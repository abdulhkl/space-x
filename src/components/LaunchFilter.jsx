import React from 'react';
import { useNavigate } from 'react-router-dom';

import './LaunchFilter.module.css';

const LaunchFilter = ({ onChangeFilter, selected }) => {
	const navigate = useNavigate();
	const dropDownChangeHandler = (event) => {
		navigate(`/${event.target.value}`);
		onChangeFilter(event.target.value);
	};
	return (
		<div className='d-flex flex-row-reverse py-3'>
			<select value={selected} onChange={dropDownChangeHandler}>
				<option value='All'>All Launches</option>
				<option value='Upcoming'>Upcoming Launches</option>
				<option value='Successfull'>Successfull Launches</option>
				<option value='Failed'>Failed Launches</option>
			</select>
		</div>
	);
};

export default LaunchFilter;
