import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
	return (<>
		<div className="grid grid-cols-3 divide-x divide-gray-300 py-1.5 w-10/12 mx-auto mt-4 border border-gradient-start rounded-lg bg-white
               md:w-8/12 lg:w-1/2">
			<div className="relative">
				<select name="dropdown" id="dropdown"
					className="w-full text-gray-400 text-sm text-center rounded-l-lg focus:outline-none">
					<option>台北市</option>
					<option>新北市</option>
					<option>基隆市</option>
				</select>
			</div>
			<div className="flex col-span-2 bg-white rounded-r-lg">
				<input type="text" name="search" id="search" placeholder="搜尋公車路線"
					className="w-full text-gray-400 text-sm text-left pl-1.5 focus:outline-none" />
				<button>
					<IoSearch className="text-gradient-start mr-2" />
				</button>
			</div>
		</div>




	</>
	)
}


export default SearchBar;
