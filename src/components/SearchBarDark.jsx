import getAuthorizationHeader from "../util/getAuthorizationHeader";
import { useEffect, useState } from "react";
import { IoSearch, IoArrowForwardOutline } from "react-icons/io5";
import cityList from "../data/cityList";
import axios from "axios";


const SearchBarDark = (props) => {
	const [routeNumber, setRouteNumber] = useState(''); // 搜尋公車路線
	const [city, setCity] = useState('臺北市'); // choose city result
	const [response, setResponse] = useState([]); // 搜出來的路線資料
	const pressUnit = ['紅', '綠', '橘', '藍', '棕', '黃', 'F', 'R', 'T', '幹線', '先導', '內科', '貓空', '市民', '南軟', '跳蛙', '夜間', '小'];
	const api = `https://tdx.transportdata.tw/api/basic/v2/Bus/`;

	// 把 city 陣列轉成中英對照的物件型態 ex. {"台北市" : "Taipei"}
	const CityObj = cityList.reduce((acc, item) => {
		const chName = item.city_zh;
		const enName = item.city_en;
		acc[chName] = enName;
		return acc;
	}, {});


	// 取得選取城市的值
	function handleCityValue(e) {
		setCity(e.target.value);
	}


	// 取得搜尋列路線號碼的值
	function handleRouteNumber(e) {
		setRouteNumber(prevValue => {
			return prevValue + e.target.value
		});
	}

	useEffect(() => {
		const getAllRoutes = async () => {
			if (!city) return

			const accessToken = await getAuthorizationHeader();
			// ${cityObj[setCity的值]}
			const RoutesRes = await axios.get(`${api}Route/City/${CityObj[city]}?%24format=JSON`,
				{
					headers: {
						"authorization": "Bearer " + accessToken,
					},
				});
			setResponse(RoutesRes.data.filter(route => route.RouteName.Zh_tw.includes(`${routeNumber}`)));
		}
		if (city && routeNumber !== "") {
			getAllRoutes();
		}
	}, [city, routeNumber]);

	return (<>
		<div className={`bg-nav-dark hidden md:w-8/12 ml-6 lg:ml-32 ${props.className}`}>
			<div className="grid grid-cols-3 py-1.5 mx-auto rounded-lg bg-searchbar-dark">
				<div>
					<select name="dropdown" id="dropdown"
						className="w-full text-gray-400 text-sm text-center rounded-l-lg bg-searchbar-dark focus:outline-none"
						onChange={handleCityValue}>
						{cityList.map((item) => (
							<option key={item.city_en}>
								{item.city_zh}
							</option>
						))}
					</select>
				</div>


				<div className="relative flex col-span-2 bg-searchbar-dark rounded-r-lg">
					<input type="text" name="search" id="search" placeholder="搜尋公車路線"
						className="w-full text-gray-300 text-sm text-left pl-2  bg-searchbar-dark focus:outline-none"
						value={routeNumber}
						onInput={e => setRouteNumber(e.target.value)} />

					<button>
						<IoSearch className="text-white mr-2" />
					</button>
				</div>


				<div className="hidden md:block absolute top-full z-10 rounded-lg bg-white w-full bg-opacity-80 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
					{routeNumber === "" && (
						<div className="grid grid-cols-6 gap-3 py-4 px-4 lg:grid-cols-7">
							{pressUnit.map((option, index) => (
								<button
									key={index} value={option}
									className="w-10 h-9 text-nav-dark text-sm border border-nav-dark rounded-xl"
									onClick={handleRouteNumber}>
									{option}
								</button>))}
						</div>
					)}

					{routeNumber !== "" &&
						(<div className="px-6 py-5 h-1/3">
							<p className="text-gradient-start text-xs font-bold">{city}</p>
							{response.map((route) => (
								<a href="" key={route.RouteUID}>
									<li className="flex justify-between py-3 pr-3">
										<p className="font-bold">{route.RouteName.Zh_tw}</p>
										<p className="flex font-light items-center">
											{route.DepartureStopNameZh}
											<span className="text-highlight px-2"><IoArrowForwardOutline /></span>
											{route.DestinationStopNameZh}
										</p>
									</li>
								</a>
							))}
						</div>)
					}
				</div>
			</div>
		</div>
	</>
	)
}


export default SearchBarDark;
