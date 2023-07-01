import { useEffect, useState } from "react";

const useGeolocation = () => {
	const [location, setLocation] = useState({
		loaded: false,
		coordinates: { lat: "", lon: "" }, // 座標：緯度 latitude、經度 longitude
	});

	const onSuccess = (location) => {
		setLocation({
			loaded: true,
			coordinates: {
				lat: location.coords.latitude,
				lon: location.coords.longitude,
			}
		})
		// console.log("coords", location.coords);
	}

	const onError = (error) => {
		setLocation({
			loaded: true,
			error,
		})
	}

	useEffect(() => {
		if (!("geolocation" in navigator)) {
			onError({
				code: 0,
				message: "Geolocation not support!"
			});
		}
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}, []);

	console.log("use內部 location", location);
	return location;
}

export default useGeolocation;