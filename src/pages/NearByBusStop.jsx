// import { useParams } from "react-router-dom";
import useGeolocation from "../util/useGeolocation";


const NearByBusStop = ({ finalRoute }) => {
	const location = useGeolocation();
	// const { routeName } = useParams();
	console.log("location", location);

	return (
		<>
			<div className="text-3xl text-blue-400">
				{location.loaded ? JSON.stringify(location) : "Geolocation not available"}
			</div>
			<div>
				
			</div>
		</>
	)
}

export default NearByBusStop;