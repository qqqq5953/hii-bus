import { IoCode, IoHeart, IoChevronBack, IoBus, IoArrowBackCircleOutline } from "react-icons/io5";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import BusMap from "../util/BusMap";
import getAuthorizationHeader from "../util/getAuthorizationHeader";
import cityList from "../data/cityList";
import DataContext from "../data/DataContext";
import axios from "axios";


const BusEstimateArrival = () => {
	const { routeNumber, city, api, routeName } = useContext(DataContext);


	const [stopData, setStopData] = useState([]);
	const [direction, setDirection] = useState("");
	const [finalRoute, setFinalRoute] = useState({});
	const navigate = useNavigate();


	// useEffect(() => {
	// 	console.log('outer', routeName);
	// 	const defaultDirection = `${routeName}_0`
	// 	console.log('defaultDirection', defaultDirection);
	// 	setDirection(defaultDirection)
	// 	console.log('direction', direction);
	// }, [])


	// 把 city 陣列轉成中英對照的物件型態 ex. {"台北市" : "Taipei"}
	const CityObj = cityList.reduce((acc, item) => {
		const chName = item.city_zh;
		const enName = item.city_en;
		acc[chName] = enName;
		return acc;
	}, {});
	// console.log('CityObj', CityObj);
	// console.log('routeNumber', routeNumber);

	useEffect(() => {
		const getAllRoutes = async () => {
			if (!city) return;

			const accessToken = await getAuthorizationHeader();
			const eta = axios.get(`${api}EstimatedTimeOfArrival/City/${CityObj[city]}/${routeNumber}?%24format=JSON`, {
				headers: {
					"authorization": "Bearer " + accessToken,
				},
			});
			const stop = axios.get(`${api}StopOfRoute/City/${CityObj[city]}/${routeNumber}?%24format=JSON`, {
				headers: {
					"authorization": "Bearer " + accessToken,
				},
			});
			const result = await Promise.all([eta, stop]);
			// console.log('result', result);
			const etaRes = result[0].data;
			const stopRes = result[1].data;
			// console.log('etaRes', etaRes);
			// console.log('stopRes', stopRes);


			// #1 取出需要的欄位
			const etas = etaRes.map((eta) => {
				return {
					Direction: eta.Direction,
					EstimateTime: eta.EstimateTime,
					StopUID: eta.StopUID,
					StopStatus: eta.StopStatus,
				}
			});
			// console.log('etas', etas);

			const stops = stopRes.map((item) => {
				return {
					Direction: item.Direction,
					RouteName: item.RouteName.Zh_tw,
					key: `${item.RouteName.Zh_tw}_${item.Direction}`,
					stops: item.Stops
				}
			});
			// console.log('stops', stops);


			// #2 forEach 分別取出物件中的 key 及 value 並組裝成 {StopUID:EstimateTime} 的資料型態
			const estimateTimeObj = etas.reduce((obj, item) => {
				const EstimateTime = item.EstimateTime;
				const StopUID = item.StopUID;
				obj[StopUID] = EstimateTime;
				return obj;
			}, {});

			// 取出站牌狀態資料
			const stopStatusObj = etas.reduce((stopObj, item) => {
				const StopStatus = item.StopStatus;
				const StopUID = item.StopUID;
				stopObj[StopUID] = StopStatus;
				return stopObj;
			}, {});
			// console.log('stopStatusObj', stopStatusObj);


			// 取出方向
			const etaDirectionObj = etas.reduce((directionObj, item) => {
				const Direction = item.Direction;
				const StopUID = item.StopUID;
				directionObj[StopUID] = Direction;
				return directionObj;
			}, {});

			const stopDirectionObj = stops.reduce((directionObj, item) => {
				const Direction = item.Direction;
				const StopUID = item.StopUID;
				directionObj[StopUID] = Direction;
				return directionObj;
			}, {});

			// 取出路線
			const routeObj = {}
			stops.forEach(item => {
				const { key, stops } = item  // 解構取值
				// const key = `${subRouteName}_${direction}`
				routeObj[key] = stops
			})
			// console.log('routeObj', routeObj);


			// #3 組合資料（上面的 routeObj 還缺 EstimateTime 資料）
			// for...in 設定名稱為 routeName 的 key 在 routeObj
			const finalRoute = {}
			for (const routeName in routeObj) {
				const stops = routeObj[routeName]
				const newStops = stops.map(stop => {
					const StopStatus = stopStatusObj[stop.StopUID];
					const EtaDirection = etaDirectionObj[stop.StopUID];
					const StopDirection = stopDirectionObj[stop.StopUID];
					const EstimateTime = estimateTimeObj[stop.StopUID]; // 用 StopUID 抓 estimateTimeObj相對應的站牌再賦予EstimateTime 的值，return EstimateTime 跟 stop 中的其他屬性 
					return {
						StopStatus,
						EtaDirection,
						StopDirection,
						EstimateTime,
						...stop
					}
				})
				finalRoute[routeName] = newStops;
				setStopData(newStops); // 帶入搜尋到的公車路線
			}

			setFinalRoute(finalRoute)
			// const init = finalRoute[direction]
			// console.log('finalRoute', finalRoute);
			// console.log('direction', direction);
			// console.log('init', init);
			// console.log('init', init);
			// setStopData(init); // 帶入搜尋到的公車路線

		};
		getAllRoutes();
		
	}, [city]);

	// useEffect(() => {
	// 	if (!direction) return
	// 	console.log('test2 direction', direction);
	// 	// console.log('finalRoute', finalRoute);
	// 	const newStops = finalRoute[direction];
	// 	console.log('newStops', newStops);

	// 	// setStopData(newStops); // 帶入搜尋到的公車路線
	// }, [direction])
	// console.log('useParams', useParams());
	console.log('stopData', stopData);

	return (
		<>
			<div className="bg-white w-full h-auto lg:flex lg:h-full lg:p-5 lg:bg-gray-100 border border-red-300">
				{/* 地圖來囉 */}
				<div className="hidden md:block sticky h-full w-full lg:w-1/2">
					<BusMap />
				</div>


				{/* md 以上不顯示返回及顯示地圖鍵 地圖直線顯示 */}
				<div className="p-4 
				md:px-8 
				lg:w-1/2 lg:bg-white mx-3 lg:p-4 rounded-lg overflow-y-auto">
					<div className="flex box-border justify-between md:hidden">
						<button type="button" onClick={() => {
							navigate(-1);
						}}>
							<IoChevronBack className="text-slate-300" size={22} />
						</button>
						<button type="button" className="w-24 h-10 border border-slate-300 rounded-full text-sm text-slate-400 tracking-wider">
							顯示地圖
						</button>
					</div>

					<main className="md:px-2 h-auto lg:px-4">
						<div className="flex justify-between items-center">
							<div className="px-2 py-2">
								<div className="flex">
									<button>
										<IoArrowBackCircleOutline className="hidden text-slate-300 md:block md:mr-3" size={26} />
									</button>
									<div className="font-bold text-2xl text-nav-dark">
										{routeName}
									</div>
								</div>

								<div className="flex py-1 items-center text-nav-dark tracking-wider">
									{stopData.length > 0 &&
										(<div>{stopData[0].StopName.Zh_tw}</div>)}
									<span className="text-highlight px-1 text-lg"><IoCode /></span>
									{stopData.length > 0 &&
										(<div>{stopData[(stopData.length) - 1].StopName.Zh_tw}</div>)}
								</div>
							</div>
							<div>
								<button>
									<IoHeart className="text-2xl mr-3 text-gray-300 active:text-highlight" />
								</button>
							</div>
						</div>


						<div className="grid grid-cols-2 divide-x divide-transparent h-10 border border-gradient-start rounded-lg overflow-hidden">
							<button className="flex justify-center items-center text-white bg-gradient-start" onClick={() => setDirection(`${routeName}_0`)}>
								<p className="whitespace-pre">往 </p>
								{stopData.length > 0 &&
									(<div>{stopData[0].StopName.Zh_tw}</div>)}
							</button>
							<button className="flex justify-center items-center text-gradient-start bg-white"
								onClick={() => setDirection(`${routeName}_1`)}
							>
								<p className="whitespace-pre">往 </p>
								{stopData.length > 0 &&
									(<div>{stopData[(stopData.length) - 1].StopName.Zh_tw}</div>)}
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

							{stopData.map((stop) => {
								return (
									<li className="flex items-center py-3 first:pt-0 last:pb-0 relative" key={stop.StopUID}>
										<div className="flex items-center">
											<div className="flex items-center">
												{/* 判斷站牌狀態＆到站時間 */}
												{stop.StopStatus === 4 ?
													(<Button backgroundColor="#FF6464"
														fontSize='12px'
														fontColor='#FFF'>今日未營運
													</Button >) :
													stop.StopStatus === 3 ?
														(<Button backgroundColor="#F8F8FB"
															fontSize='12px'
															fontColor='#8C90AB'>末班駛離
														</Button >) :
														stop.StopStatus === 2 ?
															(<Button backgroundColor="#F8F8FB"
																fontSize='12px'
																fontColor='#8C90AB'>交管不停靠
															</Button >) :
															stop.StopStatus === 1 || stop.StopStatus === undefined ?
																(<Button backgroundColor="#F8F8FB"
																	fontSize='12px'
																	fontColor='#8C90AB'>尚未發車
																</Button >) :
																stop.EstimateTime <= 120 ?
																	<Button backgroundColor="#FF6464"
																		fontSize='12px'
																		fontColor='#FFF'>
																		即將到站
																	</Button > :
																	<Button backgroundColor="#FFE5E5"
																		fontSize='14px'
																		fontColor='#FF6464'>
																		{Math.floor(stop.EstimateTime / 60)} 分
																	</Button >}
												<p className="text-nav-dark mx-3">
													{stop.StopName.Zh_tw}
												</p>
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
