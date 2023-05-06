import Navbar from "../components/Navbar";
import BusInfo from "../components/BusInfo";
import Footer from "../components/Footer";
import Button from "../components/Button";


const Search = () => {
	return (
		<>
			<div className="flex flex-col h-screen">
				<Navbar />

				<div className="flex md:flex justify-center py-0.5 lg:py-2">
					<div className="flex w-full whitespace-nowrap h-14 overflow-x-scroll overflow-y-hidden items-center md:w-5/6 lg:w-3/4">
						<p className="text-md pl-5 pr-2.5">
							共找到 <span className="text-gradient-start font-semibold">20</span> 個公車路線
						</p>
						<Button backgroundColor="#5468FF" fontColor="#FFF" fontSize="14px">
							台北市
						</Button>
						<Button backgroundColor="#5468FF" fontColor="#FFF" fontSize="14px" margin="0 0 0 6px">
							台北市
						</Button>
					</div>
				</div>
				<div className="flex flex-col items-center">
					<BusInfo />
				</div>

				<Footer />
			</div>
		</>
	)
}


export default Search;
