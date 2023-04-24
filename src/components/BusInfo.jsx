import { IoArrowForwardOutline, IoHeart } from "react-icons/io5";
import Footer from "./Footer";


const BusInfo = () => {
	return (
		<>
			<div className="px-8 grid ">
				<p className="pt-4 text-xs font-bold text-gradient-start ">台北市</p>

				<div className="divide-y divide-gray-300">
					<div className="flex py-2 justify-between text-nav-dark tracking-wider">
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
					</div>

					<div className="flex py-2 justify-between text-nav-dark tracking-wider">
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
					</div>
				</div>
			</div>
			
			<Footer />
		</>
	)
}

export default BusInfo;