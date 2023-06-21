import { useParams } from "react-router-dom";
import useGeolocation from "../util/useGeolocation";
import BusMap from "../util/BusMap";

const NearByBusStop = ({ routeNumber, routeName, city, finalRoute }) => {
	const location = useGeolocation();
	console.log("location", location);

	return (
		<>
			<div className="text-3xl text-blue-400">
				{location.loaded ? JSON.stringify(location) : "Geolocation not available"}
			</div>
			<div>
				<BusMap
					routeNumber={routeNumber}
					city={city}
					finalRoute={finalRoute} />
			</div>
		</>
	)
}

export default NearByBusStop;