import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoSearch, IoCode } from "react-icons/io5";
import getAuthorizationHeader from "../util/getAuthorizationHeader";
// import DataContext from "../data/DataContext";
import cityList from "../data/cityList";



const SearchBar = ({ routeNumber, setRouteNumber, routeName, setRouteName, city, setCity }) => {
	// const { routeNumber, setRouteNumber, handleCityValue, response, setRouteName } = useContext(DataContext);
	// console.log('routeNumber', routeNumber);
	// console.log('routeName', routeName);

	// const [routeNumber, setRouteNumber] = useState(''); // 搜尋公車路線
	// const [city, setCity] = useState('臺北市'); // choose city
	const [response, setResponse] = useState([]); // 搜出來的路線資料
	// const [routeName, setRouteName] = useState("")
	const api = `https://tdx.transportdata.tw/api/basic/v2/Bus/`;
	const pressUnit = ['紅', '綠', '橘', '藍', '棕', '黃', 'F', 'R', 'T', '幹線', '先導', '內科', '貓空', '市民', '南軟', '跳蛙', '夜間', '小'];


	// 把 city 陣列轉成中英對照的物件型態 ex. {"台北市" : "Taipei"}
	const CityObj = cityList.reduce((acc, item) => {
		const chName = item.city_zh;
		const enName = item.city_en;
		acc[chName] = enName;
		return acc;
	}, {});

	function handleCityValue(e) {
		setCity(e.target.value);
	}

	// 取得搜尋列路線號碼的值
	function handleRouteNumber(e) {
		setRouteNumber(prevValue => {
			return prevValue + e.target.value
		});
		// setRouteNumber(e.target.value);
	}

	useEffect(() => {
		// console.log('routeNumber', routeNumber);
		try {
			const getAllRoutes = async () => {
				if (!city) return

				const accessToken = await getAuthorizationHeader();
				// ${cityObj[setCity的值]}
				const RoutesRes = await axios.get(`${api}Route/City/${CityObj[city]}?format=JSON`,
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
		} catch (error) {
			console.log('error', error);
		}

	}, [city, routeNumber]);

	console.log('response', response);

	return (<>
		<div className="relative grid grid-cols-3 divide-x divide-gray-300 py-1.5 w-10/12 mx-auto mt-4 border border-gradient-start rounded-lg bg-white
               md:w-8/12 lg:w-1/2">
			<div>
				<select name="dropdown" id="dropdown"
					className="w-full text-nav-dark text-sm text-center rounded-l-lg focus:outline-none"
					onChange={handleCityValue}>
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
					onInput={e => setRouteNumber(e.target.value)}
					value={routeNumber}
				/>
				<button>
					<IoSearch className="text-gradient-start mr-2" />
				</button>
			</div>


			<div className="block absolute top-full mt-0.5 z-10 rounded-xl bg-white w-full bg-opacity-70 shadow-sm shadow-slate-400/80 focus:outline-none">
				{routeNumber === "" &&
					(<div className="grid grid-cols-5 md:grid-cols-9 gap-2 px-4 py-4 lg:py-8 lg:px-8">
						{pressUnit.map((option, index) => (
							<button
								key={index} value={option}
								className="w-18 h-10 text-nav-dark text-sm border border-gray-500 rounded-full hover:bg-slate-100"
								onClick={handleRouteNumber}>
								{option}
							</button>))}
					</div>
					)}

				{routeNumber !== "" &&
					(<ul className="h-72 px-4 mt-2 overflow-y-auto divide-y divide-slate-200 
					md:px-10 md:mt-3 md:h-60 ">
						{response.map((route) => (
							<Link to={`/${route.City}/${route.RouteName.Zh_tw}`} key={route.RouteUID} className="block"
								onClick={() => setRouteName(route.RouteName.Zh_tw)}
							>
								<li className="flex justify-between py-3.5 md:pr-3">
									<p className="font-bold">{route.RouteName.Zh_tw}</p>
									<p className="flex font-light items-center text-sm">
										{route.DepartureStopNameZh}
										<span className="text-highlight px-1 md:px-2"><IoCode /></span>
										{route.DestinationStopNameZh}
									</p>
								</li>
							</Link>
						))}
					</ul>)
				}
			</div>
		</div>
	</>
	)
}


export default SearchBar;