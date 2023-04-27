import { IoSearch } from "react-icons/io5";
import { useState } from "react";

const routes = ['紅', '綠', '橘', '藍', '黃', '棕', 'F', 'R', 'T', '幹線', '先導'];


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


				<div className="relative flex col-span-2 bg-searchbar-dark rounded-r-lg">
					<input type="text" name="search" id="search" placeholder="搜尋公車路線"
						className="w-full text-gray-300 text-sm text-left pl-2  bg-searchbar-dark focus:outline-none"
						onClick={() => setIsOpen(!isOpen)} />

					{isOpen && (
						<div className="hidden md:block absolute top-full z-10 rounded-lg bg-white w-full bg-opacity-80 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="grid grid-cols-6 gap-3 py-4 px-4 lg:grid-cols-7">
								{routes.map((option, index) => (
									<button
										key={index}
										className="w-10 h-9 text-nav-dark text-sm border border-nav-dark rounded-xl">
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
