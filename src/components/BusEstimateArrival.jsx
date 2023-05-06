import { IoArrowForwardOutline, IoHeart, IoChevronBack, IoBus } from "react-icons/io5";
import Button from "./Button";
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const BusEstimateArrival = () => {

	return (
		<>
			<div className="bg-white w-full h-auto lg:flex lg:h-full lg:p-5 lg:bg-gray-100">
				{/* 地圖來囉 */}
				<div className="hidden md:block sticky h-full w-full lg:w-1/2">
					<MapContainer className="block object-cover lg:h-full"
						center={[25.0368498, 121.5000289]} zoom={17} scrollWheelZoom={false}>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						{/* <Marker position={[51.505, -0.09]}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker> */}
					</MapContainer>
				</div>


				{/* md 以上不顯示返回及顯示地圖鍵 地圖直線顯示 */}
				<div className="p-4 
				md:px-8 
				lg:w-1/2 lg:bg-white mx-3 lg:p-4 rounded-lg overflow-y-auto">
					<div className="flex box-border justify-between md:hidden">
						<button><IoChevronBack className="text-slate-300" size={22} /></button>
						<button className="w-24 h-10 border border-slate-300 rounded-full text-sm text-slate-400 tracking-wider">顯示地圖</button>
					</div>

					<main className="md:px-2 h-auto lg:px-4">
						<div className="flex justify-between items-center">
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

						<div className="grid grid-cols-2 divide-x divide-transparent h-10 border  border-gradient-start text-sm text-center rounded-lg overflow-hidden">
							<button className="text-white bg-gradient-start">
								往 台北車站
							</button>
							<button className="text-gradient-start bg-white">
								往 內湖科學園區
							</button>
						</div>

						{/* 公車到站狀態 */}
						<ul className="px-2 py-3 divide-y divide-slate-200 md:py-6">
							<li className="flex justify-between items-center py-3 h-auto first:pt-0 last:pb-0 relative">
								<div className="flex items-center">
									<Button backgroundColor="#FF6464"
										fontSize='12px'
										fontColor='#FFF'>
										進站中
									</Button >
									<p className="text-nav-dark mx-3">老松國小</p>
								</div>
								<div className="flex w-20 h-10 bg-slate-100 rounded-full text-sm font-light text-slate-400 items-center justify-center mr-1 lg:mx-3">
									<IoBus className="text-gradient-start mx-0.5" />
									<p>712-FW</p>
								</div>

								<div className="absolute -right-3 w-1 h-10 bg-slate-200 mt-6 
								md:-right-5 md:mt-6 md:h-10 lg:-right-2">
									<div className="relative h-3 w-3 right-1 
					after:content[''] rounded-full border-2 border-slate-300"/>
								</div>
							</li>

							<li className="flex items-center py-3 first:pt-0 last:pb-0 relative">
								<div className="flex items-center">
									<Button backgroundColor="#FFE5E5"
										fontSize='15px'
										fontColor='#FF6464'>
										2分
									</Button >
									<p className="text-nav-dark mx-3">老松國小</p>
								</div>
								<div className="absolute -right-3 w-1 h-16 py-6 bg-slate-200 
								md:-right-5 md:h-16 md:py-6 lg:-right-2">
									<div className="relative h-3 w-3 right-1 
					after:content[''] rounded-full border-2 border-slate-300"/>
								</div>
							</li>

							<li className="flex items-center py-3 first:pt-0 last:pb-0 relative">
								<div className="flex items-center">
									<Button backgroundColor="#FFE5E5"
										fontSize='15px'
										fontColor='#FF6464'>
										2分
									</Button >
									<p className="text-nav-dark mx-3">老松國小</p>
								</div>
								<div className="absolute -right-3 w-1 h-16 py-6 bg-slate-200 
								md:-right-5 md:h-16 md:py-6 lg:-right-2">
									<span className="relative flex h-3 w-3 right-1">
										<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-200 opacity-75"></span>
										<span className="relative inline-flex rounded-full h-3 w-3 bg-slate-300"></span>
									</span>
								</div>
							</li>

							<li className="flex items-center py-3 first:pt-0 last:pb-0 relative">
								<div className="flex items-center">
									<Button backgroundColor="#FFE5E5"
										fontSize='15px'
										fontColor='#FF6464'>
										2分
									</Button >
									<p className="text-nav-dark mx-3">老松國小</p>
								</div>
								<div className="absolute -right-3 w-1 h-16 py-6 bg-slate-200 
								md:-right-5 md:h-16 md:py-6 lg:-right-2">
									<span className="relative flex h-3 w-3 right-1">
										<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-200 opacity-75"></span>
										<span className="relative inline-flex rounded-full h-3 w-3 bg-slate-300"></span>
									</span>
								</div>
							</li>

							<li className="flex items-center py-3 first:pt-0 last:pb-0 relative">
								<div className="flex items-center">
									<Button backgroundColor="#FFE5E5"
										fontSize='15px'
										fontColor='#FF6464'>
										2分
									</Button >
									<p className="text-nav-dark mx-3">老松國小</p>
								</div>
								<div className="absolute -right-3 w-1 h-16 py-6 bg-slate-200 
								md:-right-5 md:h-16 md:py-6 lg:-right-2">
									<div className="relative h-3 w-3 right-1 
					after:content[''] rounded-full border-2 border-slate-300"/>
								</div>
							</li>

						</ul>
					</main>
				</div>


			</div>
		</>
	)
}


export default BusEstimateArrival;
