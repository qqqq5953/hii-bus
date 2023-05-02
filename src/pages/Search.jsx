import Navbar from "../components/Navbar";
import BusInfo from "../components/BusInfo";
import Footer from "../components/Footer";
import ButtonForCity from "../components/ButtonForCity";


const Search = () => {
	return (
		<>
			<Navbar />

			{/* 搜尋完才會往下推，可左右滑查看路線*/}
			<div className="md:flex justify-center py-0.5 lg:py-2">
				<div className="flex w-full whitespace-nowrap h-14 overflow-x-scroll overflow-y-hidden items-center md:w-5/6 lg:w-3/4">
					<p className="text-md pl-5 pr-2.5">
						共找到 <span className="text-gradient-start font-semibold">20</span> 個公車路線
					</p>
					<ButtonForCity>台北市</ButtonForCity>
				</div>
			</div>
			<div className="flex flex-col items-center">
				<BusInfo />
			</div>

			<Footer />
		</>
	)
}


export default Search;
