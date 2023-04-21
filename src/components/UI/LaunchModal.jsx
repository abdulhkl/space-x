import { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Spinner from '../shared/Spinner';
const Backdrop = (props) => {
	return <div className='backdrop' onClick={props.closeModal} />;
};

const ModalOverlay = (props) => {
	return (
		<div className='launch-modal'>
			<button className='md-btn-close' onClick={props.closeModal}>
				X
			</button>
			<div className='content'>
				{props.isLoading && <Spinner />}
				{!props.isLoading && props.launchData && (
					<>
						<div className='d-flex flex-row'>
							<div className='p-1'>
								<img
									src={props.launchData.links?.mission_patch_small}
									alt={props.launchData.mission_name}
									style={{ width: '100px' }}
								/>
							</div>
							<div className='p-2'>
								<p>{props.launchData.mission_name}</p>
								<p>{props.launchData.rocket?.rocket_id}</p>
							</div>
						</div>
						<p>{props.launchData.details}</p>
						<table className='table table-bordered table-hover'>
							<tbody>
								<tr>
									<td className='w-25'>Flight Number</td>
									<td>{props.launchData.flight_number}</td>
								</tr>
								<tr>
									<td>Mission Name</td>
									<td>{props.launchData.mission_name}</td>
								</tr>
								<tr>
									<td>Rocket Type</td>
									<td>{props.launchData.rocket?.rocket_type}</td>
								</tr>
								<tr>
									<td>Launch Date</td>
									<td>
										{new Date(
											props.launchData.launch_date_utc
										).toLocaleDateString('en-us', {
											day: 'numeric',
											month: 'short',
											year: 'numeric',
										})}
									</td>
								</tr>
								<tr>
									<td>Launch Site</td>
									<td>{props.launchData.launch_site?.site_name}</td>
								</tr>
							</tbody>
						</table>
					</>
				)}
			</div>
		</div>
	);
};

const LaunchModal = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [launch, setLaunch] = useState({});
	useEffect(() => {
		async function fetchLaunch() {
			setIsLoading(true);
			const response = await fetch(
				`https://api.spacexdata.com/v3/launches/${props.launchId}`
			);
			const data = await response.json();
			setLaunch(data);
			setIsLoading(false);
		}
		fetchLaunch();
	}, [props.launchId]);
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop closeModal={props.closeModal} />,
				document.getElementById('backdrop-root')
			)}
			{ReactDOM.createPortal(
				<ModalOverlay
					launchId={props.launchId}
					closeModal={props.closeModal}
					launchData={launch}
					isLoading={isLoading}
				/>,
				document.getElementById('overlay-root')
			)}
		</Fragment>
	);
};

export default LaunchModal;
