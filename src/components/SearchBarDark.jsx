import { IoSearch } from "react-icons/io5";
import { useState } from "react";

const options = ['紅', '綠', '橘', '藍', '黃', '棕', 'F', 'R', 'T', '幹線', '先導'];

function DropdownMenu() {
	return (
		<div className="hidden
		md:block w-8/12 mx-auto
		lg:w-1/2">
			<div className="z-10 bg-white border border-gray-300 rounded-md px-3 py-4 w-1/2 mx-auto grid grid-cols-9 gap-3 justify-center justify-items-center 
			md:w-full">
				{options.map((option, index) => (
					<button
						key={index}
						className="w-12 h-9 text-nav-dark text-sm border border-nav-dark rounded-xl"
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
}


const SearchBarDark = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (<>
		<div className="bg-nav-dark pb-3">
			<div className="grid grid-cols-3 divide-x divide-gray-300 py-1.5 w-10/12 mx-auto rounded-lg bg-searchbar-dark
				md:w-8/12 lg:w-1/2">
				<div className="relative">
					<select name="dropdown" id="dropdown"
						className="w-full text-gray-400 text-sm text-center rounded-l-lg bg-searchbar-dark focus:outline-none">
						<option>台北市</option>
						<option>新北市</option>
						<option>基隆市</option>
					</select>
				</div>
				<div className="flex col-span-2 bg-searchbar-dark rounded-r-lg">
					<input type="text" name="search" id="search" placeholder="搜尋公車路線"
						className="w-full text-gray-300 text-sm text-left pl-2  bg-searchbar-dark focus:outline-none"
						onClick={() => setIsOpen(!isOpen)} />
					<button>
						<IoSearch className="text-white mr-2" />
					</button>
				</div>
			</div>
		</div>

		{isOpen && (
			<DropdownMenu />
		)}
	</>
	)
}

export default SearchBarDark;