import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoCode } from "react-icons/io5";
import getAuthorizationHeader from "../util/getAuthorizationHeader";
import cityList from "../data/cityList";


const SearchBarDark = ({ routeNumber, setRouteNumber, setRouteName, city, setCity }) => {
	const [response, setResponse] = useState([]); // 搜出來的路線資料
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

	return (
		<>
			<div className="hidden 
						md:bg-nav-dark md:w-8/12 
						lg:w-2/5">
				<div className="grid grid-cols-5 py-1.5 mx-auto rounded-lg bg-searchbar-dark">
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

					<div className="relative flex col-span-3 bg-searchbar-dark rounded-r-lg">
						<input type="text" name="search" id="search" placeholder="搜尋公車路線"
							className="w-full text-gray-300 text-sm text-left pl-2 bg-searchbar-dark focus:outline-none"
							value={routeNumber}
							onInput={e => setRouteNumber(e.target.value)} />
					</div>


					{/* 按鍵面板 */}
					<div className="block absolute top-full mt-0.5 z-10 rounded-xl bg-white w-full bg-opacity-70 shadow-sm shadow-slate-400/80 focus:outline-none">
						{/* 搜尋欄空白時 */}
						{routeNumber === "" &&
							(<div className="grid grid-cols-5 md:grid-cols-9 gap-2 px-4 py-4 
											lg:py-8 lg:px-8">
								{pressUnit.map((option, index) => (
									<button
										key={index} value={option}
										className="w-18 h-10 text-nav-dark text-sm border border-gray-500 rounded-full hover:bg-slate-100"
										onClick={handleRouteNumber}>
										{option}
									</button>))}
							</div>
							)}

						{/* 搜尋欄有字且有搜尋結果時 */}
						{routeNumber !== "" && (response.length) > 0 &&
							(<ul className="h-72 px-4 mt-2 overflow-y-auto divide-y divide-slate-200 
					md:px-10 md:mt-3 md:h-60 ">
								{response.map((route) => (
									<Link to={`/${route.City}/${route.RouteName.Zh_tw}`} key={route.RouteUID} className="block"
										onClick={() => setRouteName(route.RouteName.Zh_tw)}>
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
			</div>
		</>
	)
}


export default SearchBarDark;
