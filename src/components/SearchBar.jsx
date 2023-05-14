import getAuthorizationHeader from "../util/getAuthorizationHeader";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { cityList } from "../data/city";
import axios from "axios";


const SearchBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [routeNumber, setRouteNumber] = useState('');
	const [search, setSearch] = useState('');
	const [city, setCity] = useState('');
	const pressUnit = ['紅', '綠', '橘', '藍', '黃', '棕', '幹線', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	const api = `https://tdx.transportdata.tw/api/basic/v2/Bus/`;

	// render city 各縣市
	const cities = cityList.map((city, index) =>
		<option key={index}>
			{city[0]}
		</option>
	)

	// 把 city 陣列資料轉成物件 中文:英文型態
	const CityObj = cityList.reduce((acc, item) => {
		const chName = item[0];
		const enName = item[1];
		acc[chName] = enName;
		return acc;
	}, {});
	console.log('CityObj', CityObj);


	function handleCityValue(e) {
		setCity(e.target.value);
	}
	// console.log('city', city);


	function handleRouteNumber(e) {
		setRouteNumber(prevValue => prevValue + e.target.value);
	}


	useEffect(() => {
		const getAllRoutes = async () => {
			if (!city) return

			const accessToken = await getAuthorizationHeader();
			// ${cityObj[setCity的值]}
			const RoutesRes = await axios.get(`${api}Route/City/${CityObj[city]}?%24top=20&%24format=JSON`, {
				headers: {
					"authorization": "Bearer " + accessToken,
				},
			});
			console.log('RoutesRes', RoutesRes.data);
			// const getRoute = RoutesRes.data.filter(function (item) {
			// 	return item.RouteUID === "TPE10132";
			// })
			// console.log('getRoute', getRoute);
		}
		getAllRoutes();
	}, [city]);

	return (<>
		<div className="grid grid-cols-3 divide-x divide-gray-300 py-1.5 w-10/12 mx-auto mt-4 border border-gradient-start rounded-lg bg-white
               md:w-8/12 lg:w-1/2">
			<div>
				<select name="dropdown" id="dropdown"
					className="w-full text-gray-400 text-sm text-center rounded-l-lg focus:outline-none"
					onChange={handleCityValue}>
					<option>請選擇縣市</option>
					{cities}
				</select>
			</div>
			<div className="relative flex col-span-2 bg-white rounded-r-lg">
				<input type="text" name="search" id="search"
					placeholder="搜尋公車路線"
					className="w-full text-gray-400 text-sm text-left pl-1.5 focus:outline-none"
					onClick={() => setIsOpen(!isOpen)}
					defaultValue={routeNumber}
					onKeyUp={(e) => {
						if (e.code === "Enter") {
							console.log(e.target.value);
						}
					}}
				/>

				{isOpen && (
					<div className="hidden md:block absolute top-full z-10 rounded-lg bg-white w-full bg-opacity-70 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="grid grid-cols-6 gap-3 py-4 px-4 lg:grid-cols-7">
							{pressUnit.map((option, index) => (
								<button
									key={index} value={option}
									className="w-10 h-9 text-nav-dark text-sm border border-nav-dark rounded-xl"
									onClick={handleRouteNumber}>
									{option}
								</button>
							))}
						</div>
					</div>
				)}

				<button>
					<IoSearch className="text-gradient-start mr-2" />
				</button>
			</div>

		</div>

	</>
	)
}


export default SearchBar;