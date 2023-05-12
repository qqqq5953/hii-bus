import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { cityList } from "../data/city";


const SearchBarDark = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const pressUnit = ['紅', '綠', '橘', '藍', '黃', '棕', '幹線', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	const cities = cityList.map((city, index) =>
		<option key={index}>{city[0]}</option>
	)


	function handleSearchValue(e) {
		setSearchValue(prevValue => prevValue + e.target.value)
		console.log(e.target.value);;
	}

	return (<>
		<div className={`bg-nav-dark hidden md:w-8/12 ml-6 lg:ml-32 ${props.className}`}>
			<div className="grid grid-cols-3 py-1.5 mx-auto rounded-lg bg-searchbar-dark">
				<div>
					<select name="dropdown" id="dropdown"
						className="w-full text-gray-400 text-sm text-center rounded-l-lg bg-searchbar-dark focus:outline-none">
						<option value="">請選擇縣市</option>
						{cities}
					</select>
				</div>


				<div className="relative flex col-span-2 bg-searchbar-dark rounded-r-lg">
					<input type="text" name="search" id="search" placeholder="搜尋公車路線"
						className="w-full text-gray-300 text-sm text-left pl-2  bg-searchbar-dark focus:outline-none"
						onClick={() => setIsOpen(!isOpen)}
						defaultValue={searchValue}
						onChange={searchValue => setSearchValue(searchValue)} />

					{isOpen && (
						<div className="hidden md:block absolute top-full z-10 rounded-lg bg-white w-full bg-opacity-80 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
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
						<IoSearch className="text-white mr-2" />
					</button>
				</div>
			</div>
		</div>
	</>
	)
}


export default SearchBarDark;
