// // import { createContext, useState, useEffect } from "react";
// // import axios from "axios";
// // import getAuthorizationHeader from "../util/getAuthorizationHeader";
// // import cityList from "./cityList";

// const DataContext = createContext({});

// export const DataProvider = (props) => {
// 	const [routeNumber, setRouteNumber] = useState(''); // 搜尋公車路線
// 	const [city, setCity] = useState('臺北市'); // choose city
// 	const [response, setResponse] = useState([]); // 搜出來的路線資料
// 	const [routeName, setRouteName] = useState("")
// 	const api = `https://tdx.transportdata.tw/api/basic/v2/Bus/`;

// 	// 把 city 陣列轉成中英對照的物件型態 ex. {"台北市" : "Taipei"}
// 	const CityObj = cityList.reduce((acc, item) => {
// 		const chName = item.city_zh;
// 		const enName = item.city_en;
// 		acc[chName] = enName;
// 		return acc;
// 	}, {});

// 	function handleCityValue(e) {
// 		setCity(e.target.value);
// 	}
// 	useEffect(() => {
// 		// console.log('routeNumber', routeNumber);
// 		try {
// 			const getAllRoutes = async () => {
// 				if (!city) return

// 				const accessToken = await getAuthorizationHeader();
// 				// ${cityObj[setCity的值]}
// 				const RoutesRes = await axios.get(`${api}Route/City/${CityObj[city]}?format=JSON`,
// 					{
// 						headers: {
// 							"authorization": "Bearer " + accessToken,
// 						},
// 					});

// 				setResponse(RoutesRes.data.filter(route => route.RouteName.Zh_tw.includes(`${routeNumber}`)));
// 			}
// 			if (city && routeNumber !== "") {
// 				getAllRoutes();
// 			}
// 		} catch (error) {
// 			console.log('error', error);
// 		}

// 	}, [city, routeNumber]);

// 	return (
// 		<DataContext.Provider value={{
// 			routeNumber, setRouteNumber,
// 			city, setCity, handleCityValue,
// 			response, setResponse, api, CityObj,
// 			routeName, setRouteName
// 		}}>
// 			{props.children}
// 		</DataContext.Provider>
// 	)
// }

// export default DataContext;