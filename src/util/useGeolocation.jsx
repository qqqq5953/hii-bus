import { useEffect, useState } from "react";

const useGeolocation = () => {
	const [location, setLocation] = useState({
		loaded: false,
		coordinates: { lat: "", lng: "" }, // 座標：緯度 latitude、經度 longitude
	});

	const onSuccess = (location) => {
		setLocation({
			loaded: true,
			coordinates: {
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			}
		})
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