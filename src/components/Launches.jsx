import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LaunchFilter from './LaunchFilter';
import LaunchList from './LaunchList';
const Launches = () => {
	const params = useParams();
	const [launchType, setLaunchType] = useState('All');
	const [allLaunches, setAllLaunches] = useState([]);
	const [filteredLaunches, setFilteredLaunches] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const launchChangeHandler = (selectedLaunchType) => {
		setLaunchType(selectedLaunchType);
	};
	useEffect(() => {
		if (launchType === 'All') {
			setFilteredLaunches(allLaunches);
		}
		if (launchType === 'Upcoming') {
			async function fetchLaunchesUpcoming() {
				setIsLoading(true);
				const response = await fetch(
					'https://api.spacexdata.com/v3/launches/upcoming'
				);
				const data = await response.json();
				const transformedLaunches = data.map((launchData) => {
					return {
						flight_number: launchData.flight_number,
						date: new Date(launchData.launch_date_utc).toLocaleDateString(
							'en-us',
							{
								day: 'numeric',
								month: 'short',
								year: 'numeric',
							}
						),
						launch_site: launchData.launch_site.site_name,
						mission_name: launchData.mission_name,
						orbit: launchData.rocket.second_stage.payloads[0].orbit,
						status: launchData.launch_success,
						rocket: launchData.rocket.rocket_name,
					};
				});

				setFilteredLaunches(transformedLaunches);
				setIsLoading(false);
			}
			fetchLaunchesUpcoming();
		}
		if (launchType === 'Successfull') {
			setFilteredLaunches(
				allLaunches.filter((launch) => launch.status === true)
			);
		}
		if (launchType === 'Failed') {
			setFilteredLaunches(
				allLaunches.filter((launch) => launch.status === false)
			);
		}
	}, [launchType, allLaunches]);
	useEffect(() => {
		async function fetchLaunches() {
			setIsLoading(true);
			const response = await fetch('https://api.spacexdata.com/v3/launches');
			const data = await response.json();
			const transformedLaunches = data.map((launchData) => {
				return {
					flight_number: launchData.flight_number,
					date: new Date(launchData.launch_date_utc).toLocaleDateString(
						'en-us',
						{
							day: 'numeric',
							month: 'short',
							year: 'numeric',
						}
					),
					launch_site: launchData.launch_site.site_name,
					mission_name: launchData.mission_name,
					orbit: launchData.rocket.second_stage.payloads[0].orbit,
					status: launchData.launch_success,
					rocket: launchData.rocket.rocket_name,
				};
			});
			setAllLaunches(transformedLaunches);
			if (params.id) {
				setLaunchType(params.id);
			} else {
				setFilteredLaunches(transformedLaunches);
			}
			setIsLoading(false);
		}
		fetchLaunches();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className='container table-responsive py-3'>
			<LaunchFilter
				selected={launchType}
				onChangeFilter={launchChangeHandler}
			/>
			<LaunchList launches={filteredLaunches} isLoading={isLoading} />
		</div>
	);
};

export default Launches;
