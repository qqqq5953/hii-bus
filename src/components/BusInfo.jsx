import { IoArrowForwardOutline, IoHeart } from "react-icons/io5";
import Footer from "./Footer";




const BusInfo = () => {
	return (
		<>
			<div className="w-5/6 py-6">
				<p className="text-xs font-bold text-gradient-start md:hidden">台北市</p>
				<div className="divide-y divide-gray-300">
					<a role="button" href="https://www.google.com.tw/?hl=zh_TW" className="flex py-2 justify-between text-nav-dark tracking-wider md:hidden">
						<div>
							<h1 className="bus-number text-xl font-semibold leading-8">302</h1>
							<div className="flex items-center">
								<p>萬華  </p>
								<span className="text-highlight"><IoArrowForwardOutline /></span>
								<p>  北投</p>
							</div>
						</div>
						<button className="flex items-center">
							<IoHeart className="text-2xl text-gray-300 " />
						</button>
					</a>
					<a role="button" href="https://www.google.com.tw/?hl=zh_TW" className="flex py-2 justify-between text-nav-dark tracking-wider md:hidden">
						<div>
							<h1 className="bus-number text-xl font-semibold leading-8">302</h1>
							<div className="flex items-center">
								<p>萬華  </p>
								<span className="text-highlight"><IoArrowForwardOutline /></span>
								<p>  北投</p>
							</div>
						</div>
						<button className="flex items-center">
							<IoHeart className="text-2xl text-gray-300 " />
						</button>
					</a>
				</div>




				<div className="hidden md:block w-full bg-white px-3 pt-5 pb-3 rounded-lg shadow-lg ring-gray-300 ring-opacity-5">
					<p className="text-xs font-bold text-gradient-start ">台北市</p>
					<a role="button" href="https://www.google.com.tw/?hl=zh_TW" className="flex py-2 justify-between text-nav-dark tracking-wider">
						<div>
							<h1 className="text-xl font-semibold leading-8">302</h1>
							<div className="flex items-center">
								<p>萬華  </p>
								<span className="text-highlight"><IoArrowForwardOutline /></span>
								<p>  北投</p>
							</div>
						</div>
						<div className="flex items-center">
							<IoHeart className="text-2xl text-gray-300 " />
						</div>
					</a>
					<a role="button" href="https://www.google.com.tw/?hl=zh_TW" className="flex py-2 justify-between text-nav-dark tracking-wider">
						<div>
							<h1 className="text-xl font-semibold leading-8">302</h1>
							<div className="flex items-center">
								<p>萬華  </p>
								<span className="text-highlight"><IoArrowForwardOutline /></span>
								<p>  北投</p>
							</div>
						</div>
						<div className="flex items-center">
							<IoHeart className="text-2xl text-gray-300 " />
						</div>
					</a>
				</div>
			</div>


			<Footer />
		</>
	)
}


export default BusInfo;
