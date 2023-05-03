import { IoArrowForwardOutline, IoHeart, IoChevronBack, IoBus } from "react-icons/io5";
import Button from "./Button";

const BusEstimateArrival = () => {
	return (
		<>
			<div className="bg-white w-full h-auto">
				<div className="p-4">
					{/* sm 介面 */}
					<div className="flex box-border justify-between">
						<button><IoChevronBack className="text-slate-300" size={22} /></button>
						<button className="w-24 h-10 border border-slate-300 rounded-full text-sm text-slate-400 tracking-wider">顯示地圖</button>
					</div>

					<main className="p-2">
						<div className="flex justify-between items-center ">
							<div className="px-2 py-2">
								<p className="font-bold text-2xl text-nav-dark">302</p>
								<p className="flex py-1 items-center text-nav-dark tracking-wider">
									萬華
									<span className="text-highlight px-1"><IoArrowForwardOutline /></span>
									北投
								</p>
							</div>
							<div>
								<button>
									<IoHeart className="text-2xl mr-3 text-gray-300 active:text-highlight" />
								</button>
							</div>
						</div>

						<div className="grid grid-cols-2 divide-x divide-transparent h-10 border  border-gradient-start text-sm text-center">
							<button className="text-white bg-gradient-start">
								往 台北車站
							</button>
							<button className="text-gradient-start bg-white">
								往 內湖科學園區
							</button>

						</div>

						{/*公車到站狀態 */}
						<ul className="py-3 divide-y divide-slate-200 h-auto">
							<li className="flex justify-between px-3 py-3 h-auto first:pt-0 last:pb-0 md:hidden">
								<div className="flex items-center">
									<Button backgroundColor="#FF6464"
										fontSize='12px'
										fontColor='#FFF'>
										進站中
									</Button >
									<p className="text-nav-dark mx-3">老松國小</p>
								</div>
								<div className="flex w-20 h-10 bg-slate-100 rounded-full text-sm font-light text-slate-400 items-center justify-center">
									<IoBus className="text-gradient-start mx-0.5" />
									<p>712-FW</p>
								</div>

								<div className="fixed right-4 w-1 h-11 bg-slate-200 my-3">
									<div className="relative h-3 w-3 right-1 
					after:content[''] rounded-full border-2 border-slate-300"/>
								</div>
							</li>

							<li className="flex items-center px-3 py-3 first:pt-0 last:pb-0 md:hidden">
								<div className="flex items-center">
									<Button backgroundColor="#FFE5E5"
										fontSize='15px'
										fontColor='#FF6464'>
										2分
									</Button >
									<p className="text-nav-dark mx-3">老松國小</p>
								</div>
								<div className="fixed right-4 w-1 h-16 py-6 bg-slate-200  ">
									<div className="relative h-3 w-3 right-1 
					after:content[''] rounded-full border-2 border-slate-300"/>
								</div>
							</li>

							<li className="flex items-center px-3 py-3 first:pt-0 last:pb-0 md:hidden">
								<div className="flex items-center">
									<Button backgroundColor="#F8F8FB"
										fontSize='12px'
										fontColor='#8C90AB'>
										尚未發車
									</Button >
									<p className="text-nav-dark mx-3">老松國小</p>
								</div>
								<div className="fixed right-4 w-1 h-16 py-6 bg-slate-200  ">
									<div className="relative h-3 w-3 right-1 
					after:content[''] rounded-full border-2 border-slate-300"/>
								</div>
							</li>

							<li className="flex items-center px-3 py-3 first:pt-0 last:pb-0 md:hidden">
								<div className="flex items-center">
									<Button backgroundColor="#F8F8FB"
										fontSize='12px'
										fontColor='#8C90AB'>
										尚未發車
									</Button >
									<p className="text-nav-dark mx-3">老松國小</p>
								</div>
								<div className="fixed right-4 w-1 h-16 py-6 bg-slate-200  ">
									<div className="relative h-3 w-3 right-1 
					after:content[''] rounded-full border-2 border-slate-300"/>
								</div>
							</li>

							<li className="flex items-center px-3 py-3 first:pt-0 last:pb-0 md:hidden">
								<div className="flex items-center">
									<Button backgroundColor="#FFE5E5"
										fontSize='15px'
										fontColor='#FF6464'>
										2分
									</Button >
									<p className="text-nav-dark mx-3">老松國小</p>
								</div>
								<div className="fixed right-4 w-1 h-16 py-6 bg-slate-200  ">
									<span className="relative flex h-3 w-3 right-1">
										<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-200 opacity-75"></span>
										<span className="relative inline-flex rounded-full h-3 w-3 bg-slate-300"></span>
									</span>
								</div>
							</li>
						</ul>
					</main>




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
							<IoHeart className="text-xl text-gray-300 active:text-highlight" />
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
				</div>
			</div>
		</>
	)
}


export default BusEstimateArrival;
