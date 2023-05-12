import { IoCode, IoHeart, IoChevronBack, IoBus, IoArrowBackCircleOutline } from "react-icons/io5";
import Button from "./Button";
import BusMap from "../util/BusMap";
import api from "../util/api";
import { useEffect, useState } from "react";
import axios from "axios";


const BusEstimateArrival = () => {
	const [stopData, setStopData] = useState([]);
	const [etaData, setEtaData] = useState([]);
	const STOP_URL = "https://tdx.transportdata.tw/api/basic/v2/Bus/StopOfRoute/City/Taipei/302?%24format=JSON";
	const ESTIMATE_TIME_URL = "https://tdx.transportdata.tw/api/basic/v2/Bus/EstimatedTimeOfArrival/City/Taipei/302?%24format=JSON";



	useEffect(() => {
		const fetchData = async () => {
			const accessToken = await api();
			const etaRes = await axios.get(ESTIMATE_TIME_URL, {
				headers: {
					"authorization": "Bearer " + accessToken,
				},
			});
			const stopRes = await axios.get(STOP_URL, {
				headers: {
					"authorization": "Bearer " + accessToken,
				},
			});


			// 取出需要的欄位
			const etas = etaRes.data.map((eta) => eta.EstimateTime);
			const stops = stopRes.data.Stops.map((stop) => ({
				sequence: stop.StopSequence,
				name: stop.StopName.Zh_tw,
			}));

			// 資料整合
			const newData = stops.map((stop, index) => ({
				sequence: stop.sequence,
				name: stop.name,
				eta: etas[index],
			}))

			setStopData(stops);
			setEtaData(etas);
		};
		fetchData();
	}, []);


	return (
		<>
			<div className="bg-white w-full h-auto lg:flex lg:h-full lg:p-5 lg:bg-gray-100">
				{/* 地圖來囉 */}
				<div className="hidden md:block sticky h-full w-full lg:w-1/2">
					<BusMap />
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
								<div className="flex">
									<button>
										<IoArrowBackCircleOutline className="hidden text-slate-300 md:block md:mr-3" size={26} />
									</button>
									<p className="font-bold text-2xl text-nav-dark">

									</p>
								</div>

								<div className="flex py-1 items-center text-nav-dark tracking-wider">
									{stopData.length > 0 && (
										<div>
											<p>{stopData[0].Stops[0].StopName.Zh_tw}</p>
										</div>
									)}
									<span className="text-highlight px-1 text-lg"><IoCode /></span>
									{stopData.length > 0 && (
										<div>
											<p>{stopData[0].Stops[stopData[0].Stops.length - 1].StopName.Zh_tw}</p>
										</div>
									)}
								</div>
							</div>
							<div>
								<button>
									<IoHeart className="text-2xl mr-3 text-gray-300 active:text-highlight" />
								</button>
							</div>
						</div>


						<div className="grid grid-cols-2 divide-x divide-transparent h-10 border  border-gradient-start rounded-lg overflow-hidden">
							<button className="flex justify-center items-center text-white bg-gradient-start">
								<p className="whitespace-pre">往 </p>
								{stopData.length > 0 &&
									stopData[1].Direction === 1 && (
										<div>
											<p>{stopData[0].Stops[0].StopName.Zh_tw}</p>
										</div>
									)}
							</button>
							<button className="flex justify-center items-center text-gradient-start bg-white">
								<p className="whitespace-pre">往 </p>
								{stopData.length > 0 &&
									stopData[0].Direction === 0 && (
										<div>
											<p>{stopData[0].Stops[stopData[0].Stops.length - 1].StopName.Zh_tw}</p>
										</div>
									)}
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


							{stopData.map((stop, index) => {
								return (
									<li className="flex items-center py-3 first:pt-0 last:pb-0 relative" key={stop.sequence}>
										<div className="flex items-center">
											<div className="flex items-center">
												<Button backgroundColor="#FF6464"
													fontSize='12px'
													fontColor='#FFF'>
													預估到站{etaData[index]}秒
												</Button >
												<p className="text-nav-dark mx-3">{stop.name}</p>
											</div>
										</div>
										<div className="absolute -right-3 w-0.5 h-16 py-6 bg-slate-200 
								md:-right-5 md:h-16 md:py-6 lg:-right-2">
											<div className="relative h-2 w-2 right-[3px] 
					after:content[''] rounded-full border-[2px] border-slate-200 bg-white"/>
										</div>
									</li>
								)
							})}


						</ul>
					</main>
				</div>


			</div>
		</>
	)
}


export default BusEstimateArrival;
