const LaunchItem = ({ launch, showLaunchModal }) => {
	let status = 'Null';
	if (launch.status === true) {
		status = 'Sucessfull';
	}
	if (launch.status === false) {
		status = 'Failed';
	}
	return (
		<tbody>
			<tr onClick={() => showLaunchModal(launch.flight_number)}>
				<th scope='row'>{launch.flight_number}</th>

				<td>{launch.date}</td>
				<td>{launch.launch_site}</td>
				<td>{launch.mission_name}</td>
				<td>{launch.orbit}</td>
				<td>{status}</td>
				<td>{launch.rocket}</td>
			</tr>
		</tbody>
	);
};

export default LaunchItem;
