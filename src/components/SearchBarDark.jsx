import { IoSearch } from "react-icons/io5";
import { useState } from "react";


const options = ['紅', '綠', '橘', '藍', '黃', '棕', 'F', 'R', 'T', '幹線', '先導'];


function DropdownMenu() {
	return (<>
		<div className="hidden md:block absolute left-1/3 top-12 z-10 mt-2 w-auto origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
       lg:right-1/4">
			<div className="grid grid-cols-7 gap-2 py-3 px-3">
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
	</>
	);
}




const SearchBarDark = (props) => {
	const [isOpen, setIsOpen] = useState(false);


	return (<>
		<div className={`bg-nav-dark hidden md:w-10/12 ml-6 lg:ml-8 ${props.className}`}>
			<div className="grid grid-cols-3 py-1.5 mx-auto rounded-lg bg-searchbar-dark">
				<div>
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
