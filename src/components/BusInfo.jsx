import { IoArrowForwardOutline, IoHeart } from "react-icons/io5";



const BusInfo = () => {
	return (
		<>
			<div className="bg-white w-full h-auto md:w-5/6 md:rounded-lg
			lg:w-3/4">
				<ul role="list" className="p-4 divide-y divide-slate-200 lg:px-10 py-6">
					<li className="hidden 
					md:flex text-left px-3 py-3 first:pt-0 text-gray-400">
						<p className="w-1/3">公車路線</p>
						<p className="w-1/3">起始站與終點站</p>
						<p className="w-1/3 text-center">我的收藏</p>
					</li>

					{/* sm 介面 */}
					<li className="flex px-3 py-3 first:pt-0 last:pb-0 md:hidden">
						<div className="w-1/2 overflow-hidden">
							<p className="font-bold text-nav-dark pb-1">302</p>
							<p className="flex items-center text-nav-dark truncate tracking-wider">
								萬華
								<span className="text-highlight px-1"><IoArrowForwardOutline /></span>
								北投
							</p>
						</div>
						<button className="w-1/2 flex items-center justify-end">
							<IoHeart className="text-2xl text-gray-300 active:text-highlight" />
						</button>
					</li>

					<li className="flex px-3 py-3 first:pt-0 last:pb-0 md:hidden">
						<div className="w-1/2 overflow-hidden">
							<p className="font-bold text-nav-dark pb-1">302</p>
							<p className="flex items-center text-nav-dark truncate tracking-wider">
								萬華
								<span className="text-highlight px-1"><IoArrowForwardOutline /></span>
								北投
							</p>
						</div>
						<button className="w-1/2 flex items-center justify-end">
							<IoHeart className="text-2xl text-gray-300 active:text-highlight" />
						</button>
					</li>

					{/* md & lg 介面 */}
					<li className="hidden hover:bg-gray-100 
					md:flex text-left px-3 py-4">
						<p className="w-1/3 text-lg font-semibold text-nav-dark">605 新台五</p>
						<div className="w-1/3">
							<p className="flex items-center text-nav-dark text-md truncate">
								萬華
								<span className="text-highlight px-1"><IoArrowForwardOutline /></span>
								北投
							</p>
						</div>
						<button className="md:w-1/3 flex justify-center">
							<IoHeart className="text-2xl text-gray-300 active:text-highlight" />
						</button>
					</li>

					<li className="hidden hover:bg-gray-100 
					md:flex text-left px-3 py-4">
						<p className="w-1/3 text-lg font-semibold text-nav-dark">605 新台五</p>
						<div className="w-1/3">
							<p className="flex items-center text-nav-dark text-md truncate">
								萬華
								<span className="text-highlight px-1"><IoArrowForwardOutline /></span>
								北投
							</p>
						</div>
						<button className="md:w-1/3 flex justify-center">
							<IoHeart className="text-2xl text-gray-300 active:text-highlight" />
						</button>
					</li>
				</ul>
			</div>
		</>
	)
}


export default BusInfo;
