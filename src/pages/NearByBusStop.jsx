import { useEffect, useState } from "react";
import axios from "axios";
import useGeolocation from "../util/useGeolocation";
import getAuthorizationHeader from "../util/getAuthorizationHeader";
import cityList from "../data/cityList";
import { LatLngBounds } from "leaflet";
// import NearByMap from "../util/NearByMap";



const NearByBusStop = ({ city, routeName }) => {
	const [stopInfo, setStopInfo] = useState({});
	const api = `https://tdx.transportdata.tw/api/basic/v2/Bus/`;
	// 把 city 陣列轉成中英對照的物件型態 ex. {"台北市" : "Taipei"}
	const CityObj = cityList.reduce((acc, item) => {
		const chName = item.city_zh;
		const enName = item.city_en;
		acc[chName] = enName;
		return acc;
	}, {});

	// 打API先跑該縣市全部站牌
	const getAllStops = async () => {
		if (!city) return;

		const accessToken = await getAuthorizationHeader();
		const StopsRes = await axios.get(`${api}Stop/City/${CityObj[city]}?%24select=StopPosition%2C%20StopName&%24format=JSON`, {
			headers: {
				"authorization": "Bearer " + accessToken,
			}
		})
		const stopData = StopsRes.data;
		// console.log("附近站牌 stopData", stopData);

		// 取出各站牌位置及名稱
		const result = stopData.map((stop) => {
			return ({
				StopName: stop.StopName.Zh_tw,
				StopLat: stop.StopPosition.PositionLat,
				StopLon: stop.StopPosition.PositionLon,
			})
		})

		console.log('result', result);
		setStopInfo(result)

	}

	// 計算兩個經緯度之間的距離（使用 Haversine 公式）
	function calculateDistance(lat1, lon1, lat2, lon2) {
		const R = 6371; // 地球半徑，單位：公里
		const dLat = toRadians(lat2 - lat1);
		const dLon = toRadians(lon2 - lon1);
		const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c;
		return distance;
	}


	// 將角度轉換為弧度
	function toRadians(degrees) {
		return degrees * (Math.PI / 180);
	}

	// 取得使用者所在位置座標
	const location = useGeolocation();
	// console.log("location", location);
	const userLat = location.coordinates.lat;
	const userLon = location.coordinates.lon;
	console.log("userLat", userLat);
	console.log("userLon", userLon);


	// 取出 500 公尺內站牌，符合條件的 push 進以上陣列
	const nearbyStops = [];
	for (let i = 0; i < stopInfo.length; i++) {
		// 用來儲存符合條件的站牌
		const stop = stopInfo[i];
		const distance = calculateDistance(userLat, userLon, stop.StopLat, stop.StopLon);
		// console.log('distance', distance);
		if (distance < 0.15) {
			nearbyStops.push(stop);
		} else {
			continue;
		}
	}
	console.log("nearbyStops", nearbyStops);

	// 剔除重複的站牌
	const finalNearbyStops = [];
	nearbyStops.forEach((stop) => {
		// 如果 finalNearbyStops 已有存在的值，不push stop.StopName === nearbyStops.StopName
		const DuppliateIndex = finalNearbyStops.findIndex((obj) => {
			return obj.StopName === stop.StopName
		});
		console.log("DuppliateIndex", DuppliateIndex);
		if (DuppliateIndex === -1) {
			finalNearbyStops.push(stop);
		}
	})
	console.log("finalNearbyStops", finalNearbyStops);



	useEffect(() => {
		try {
			getAllStops();
		} catch (error) {
			console.log('error', error);
		}
	}, []);


	// console.log("附近站牌 routeName", typeof (routeName));
	// console.log("附近站牌 routeName", routeName);
	// console.log("defaultDirection", defaultDirection);
	// console.log("Map 內的 finalRoute", finalRoute);


	return (
		<>
			<div className="text-3xl text-blue-400">
				{location.loaded ? JSON.stringify(location) : "Geolocation not available"}
			</div>
			<div>
				{/* <NearByMap/> */}
			</div>
		</>
	)
}

export default NearByBusStop;