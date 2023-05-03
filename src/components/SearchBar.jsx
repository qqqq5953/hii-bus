import api from "../util/api";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";


const SearchBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [city, setCity] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const pressUnit = ['紅', '綠', '橘', '藍', '黃', '棕', '幹線', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	const CITY_URL = "https://tdx.transportdata.tw/api/basic/v2/Basic/City?%24format=JSON";


	const fetchData = useCallback(async () => {
		try {
			const accessToken = await api();
			const cityRes = await axios.get(CITY_URL, {
				headers: {
					"authorization": "Bearer " + accessToken,
				},
			});
			setCity(cityRes.data);
			console.log("city", city);
		} catch (error) {
			console.log("error", error);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);


	function handleSearchValue(e) {
		setSearchValue(prevValue => prevValue + e.target.value);
	}


	return (<>
		<div className="grid grid-cols-3 divide-x divide-gray-300 py-1.5 w-10/12 mx-auto mt-4 border border-gradient-start rounded-lg bg-white
               md:w-8/12 lg:w-1/2">
			<div>
				<select name="dropdown" id="dropdown"
					className="w-full text-gray-400 text-sm text-center rounded-l-lg focus:outline-none">
					<option>請選擇縣市</option>
					{city.map((item) => {
						return (
							<option key={item?.CityID} id={item?.CityID} value={item?.CityName}>
								{item?.CityName}
							</option>
						)
					})}
				</select>
			</div>
			<div className="relative flex col-span-2 bg-white rounded-r-lg">
				<input type="text" name="search" id="search"
					placeholder="搜尋公車路線"
					className="w-full text-gray-400 text-sm text-left pl-1.5 focus:outline-none"
					onClick={() => setIsOpen(!isOpen)}
					defaultValue={searchValue}
					onChange={searchValue => setSearchValue(searchValue)}
				/>

				{isOpen && (
					<div className="hidden md:block absolute top-full z-10 rounded-lg bg-white w-full bg-opacity-70 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="grid grid-cols-6 gap-3 py-4 px-4 lg:grid-cols-7">
							{pressUnit.map((option, index) => (
								<button
									key={index} value={option}
									className="w-10 h-9 text-nav-dark text-sm border border-nav-dark rounded-xl"
									onClick={handleSearchValue}>
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
