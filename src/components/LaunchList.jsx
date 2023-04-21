import { useState } from 'react';
import LaunchModal from './UI/LaunchModal';
import LaunchItem from './LaunchItem';
import Spinner from './shared/Spinner';

const LaunchList = ({ launches, isLoading }) => {
	const [launchId, setLaunchId] = useState('');
	const closeModal = () => {
		setLaunchId('');
	};

	const showLaunchModal = (id) => {
		setLaunchId(id);
	};
	return (
		<div className='launch-list'>
			{launchId && <LaunchModal closeModal={closeModal} launchId={launchId} />}
			<table className='table table-bordered table-hover'>
				<thead className='thead-dark'>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>Launched</th>
						<th scope='col'>Location</th>
						<th scope='col'>Mission</th>
						<th scope='col'>Orbit</th>
						<th scope='col'>Launch Status</th>
						<th scope='col'>Rocket</th>
					</tr>
				</thead>
				{!isLoading &&
					launches.length > 0 &&
					launches.map((launch, i) => (
						<LaunchItem
							key={launch.flight_number + i}
							launch={launch}
							showLaunchModal={showLaunchModal}
						/>
					))}
			</table>
			{!isLoading && launches.length === 0 && (
				<p>No results found for the specified filter.</p>
			)}
			{isLoading && <Spinner />}
		</div>
	);
};

export default LaunchList;
