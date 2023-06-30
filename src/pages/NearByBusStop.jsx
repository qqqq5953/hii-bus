import { useEffect } from "react";
import axios from "axios";
import useGeolocation from "../util/useGeolocation";
import getAuthorizationHeader from "../util/getAuthorizationHeader";
import cityList from "../data/cityList";
import BusMap from "../util/BusMap";


const NearByBusStop = ({ city, routeName }) => {
	const location = useGeolocation();
	// console.log("location", location);
	const api = `https://tdx.transportdata.tw/api/basic/v2/Bus/`;

	// 把 city 陣列轉成中英對照的物件型態 ex. {"台北市" : "Taipei"}
	const CityObj = cityList.reduce((acc, item) => {
		const chName = item.city_zh;
		const enName = item.city_en;
		acc[chName] = enName;
		return acc;
	}, {});


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

	// 獲取 500 公尺內站牌
	function getNearbyStop() {
		// 使用者位置經緯度
		let userLat = 25.0443962;
		let userLon = 121.5234677;
	}

	// 打API跑該縣市全部站牌


	// 儲存符合條件的站牌
	const nearbyStops = [];


	const getAllStops = async () => {
		const accessToken = await getAuthorizationHeader();
		const StopsRes = await axios.get(`${api}Stop/City/${CityObj[city]}?%24select=StopPosition%2C%20StopName&%24top=30&%24format=JSON`, {
			headers: {
				"authorization": "Bearer " + accessToken,
			}
		})
		console.log("附近站牌 StopsRes", StopsRes);

		const stopData = StopsRes.data;
		console.log("附近站牌 stopData", stopData);

		// 取出站牌位置及名稱
		const stopInfo = stopData.map((stop) => {
			return {
				StopName: stop.StopName.Zh_tw,
				StopLat: stop.StopPosition.PositionLat,
				StopLon: stop.StopPosition.PositionLon,
			}
		})
		console.log("stopInfo", stopInfo);
	}


	useEffect(() => {
		try {
			getAllStops();
		} catch (error) {
			console.log('error', error);
		}
	}, []);


	console.log("附近站牌 routeName", typeof (routeName));
	console.log("附近站牌 routeName", routeName);
	console.log("defaultDirection", defaultDirection);
	console.log("Map 內的 finalRoute", finalRoute);


	return (
		<>
			<div className="text-3xl text-blue-400">
				{location.loaded ? JSON.stringify(location) : "Geolocation not available"}
			</div>
			<div>
				<BusMap routeName={routeName} />
			</div>
		</>
	)
}

export default NearByBusStop;