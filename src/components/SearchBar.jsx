import getAuthorizationHeader from "../util/getAuthorizationHeader";
import { IoSearch, IoArrowForwardOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import cityList from "../data/cityList";
import axios from "axios";


const SearchBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [routeNumber, setRouteNumber] = useState(''); // 搜尋公車路線
	const [city, setCity] = useState(''); // choose city result
	const [response, setResponse] = useState([]); // 搜出來的路線資料
	const pressUnit = ['紅', '綠', '橘', '藍', '棕', '黃', 'F', 'R', 'T', '幹線', '先導', '內科', '貓空', '市民', '南軟', '跳蛙', '夜間', '小'];
	const api = `https://tdx.transportdata.tw/api/basic/v2/Bus/`;
	// console.log('cityList', cityList);

	// 把 city 陣列轉成中英對照的物件型態 ex. {"台北市" : "Taipei"}
	const CityObj = cityList.reduce((acc, item) => {
		const chName = item.city_zh;
		const enName = item.city_en;
		acc[chName] = enName;
		return acc;
	}, {});
	// console.log('CityObj', CityObj);
	// console.log('routeNumber', routeNumber);


	// 取得選取城市的值
	function handleCityValue(e) {
		setCity(e.target.value);
	}
	// console.log('city', city);

	// 取得搜尋列路線號碼的值
	function handleRouteNumber(e) {
		setRouteNumber(prevValue => {
			console.log('prevValue', prevValue);
			return prevValue + e.target.value
		});
	}

	useEffect(() => {
		// console.log('routeNumber', routeNumber);
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
			// console.log('RoutesRes', RoutesRes.data);
			// console.log('test', RoutesRes.data.filter(route => route.RouteName.Zh_tw.includes("樂活")));
			// const response = RoutesRes.data.filter(route => route.RouteName.Zh_tw.includes(`${routeNumber}`));
			setResponse(RoutesRes.data.filter(route => route.RouteName.Zh_tw.includes(`${routeNumber}`)));
		}
		if (city && routeNumber !== "") {
			getAllRoutes();
		}
	}, [city, routeNumber]);

	// console.log('response', response);

	return (<>
		<div className="relative grid grid-cols-3 divide-x divide-gray-300 py-1.5 w-10/12 mx-auto mt-4 border border-gradient-start rounded-lg bg-white
               md:w-8/12 lg:w-1/2">
			<div>
				<select name="dropdown" id="dropdown"
					className="w-full text-nav-dark text-sm text-center rounded-l-lg focus:outline-none"
					onChange={handleCityValue}>
					<option>全部縣市</option>
					{cityList.map((item) => (
						<option key={item.city_en}>
							{item.city_zh}
						</option>
					))}
				</select>
			</div>
			<div className="flex col-span-2 bg-white rounded-r-lg">
				<input type="text" name="search" id="search"
					placeholder="搜尋公車路線"
					className="w-full text-nav-dark text-sm text-left pl-3 focus:outline-none"
					onClick={() => setIsOpen(!isOpen)}
					onInput={e => setRouteNumber(e.target.value)}
					defaultValue={routeNumber}
				// onKeyUp={(e) => {
				// 	if (e.code === "Enter") {
				// 		console.log(e.target.value);
				// 	}
				// }}
				/>
				<p>{routeNumber}</p>
				<button>
					<IoSearch className="text-gradient-start mr-2" />
				</button>
			</div>

			{isOpen && (
				<div className="hidden md:block absolute top-full z-10 rounded-b-xl bg-white w-full bg-opacity-70 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
					{routeNumber === "" &&
						(<div className="grid grid-cols-9 gap-2 px-4 py-4 lg:py-8 lg:px-8">
							{pressUnit.map((option, index) => (
								<button
									key={index} value={option}
									className="w-18 h-10 text-nav-dark text-sm border border-gray-500 rounded-full hover:bg-slate-100"
									onClick={handleRouteNumber}>
									{option}
								</button>))}
						</div>)
					}

					{routeNumber !== "" &&
						(<div className="px-6 py-5">
							<p className="text-gradient-start text-xs font-bold">待更新 待更新</p>
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
			)}
		</div>
	</>
	)
}


export default SearchBar;