import Navbar from "../components/Navbar";
import BusInfo from "../components/BusInfo";
import ButtonForCity from "../components/ButtonForCity";


const Search = () => {
	return (
		<>
			<Navbar />

			{/* 搜尋完才會往下推，可左右滑查看路線*/}
			<div className="flex whitespace-nowrap bg-gray-100 h-14 overflow-x-scroll overflow-y-hidden items-center">
				<p className="text-lg inline-block whitespace-nowrap pl-5 pr-2.5">
					<span className="text-gradient-start">20</span> 個公車路線
				</p>
				<ButtonForCity>台北市</ButtonForCity>
			</div>
			<div className="flex flex-col items-center">
				<BusInfo />
			</div>
		</>
	)
}


export default Search;
