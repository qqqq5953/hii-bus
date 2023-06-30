import { IoChevronBack, IoBus } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BusMap from "../util/BusMap";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BusStopStatus from "../components/BusStopStatus";
import BusInformation from "../components/BusInformation";
import getAuthorizationHeader from "../util/getAuthorizationHeader";
import cityList from "../data/cityList";
import axios from "axios";


const BusStatusPage = ({ city, stopData, setStopData, favorites, setFavorites }) => {
	// const [stopData, setStopData] = useState([]);
	const [routeDirection, setRouteDirection] = useState("");
	const [finalRoute, setFinalRoute] = useState({});
	const api = `https://tdx.transportdata.tw/api/basic/v2/Bus/`;
	const navigate = useNavigate();
	const { routeName } = useParams();


	// 把 city 陣列轉成中英對照的物件型態 ex. {"台北市" : "Taipei"}
	const CityObj = cityList.reduce((acc, item) => {
		const chName = item.city_zh;
		const enName = item.city_en;
		acc[chName] = enName;
		return acc;
	}, {});
	// console.log('CityObj', CityObj);
	// console.log('routeNumber', routeNumber);

	const getAllRoutes = async () => {
		if (!city) return;

		const accessToken = await getAuthorizationHeader();
		const eta = axios.get(`${api}EstimatedTimeOfArrival/City/${CityObj[city]}/${routeName
			}?%24select=StopUID%2CDirection%2CEstimateTime%2CStopStatus&%24format=JSON`, {
			headers: {
				"authorization": "Bearer " + accessToken,
			},
		});
		// console.log('eta', eta);
		const stop = axios.get(`${api}StopOfRoute/City/${CityObj[city]}/${routeName
			}?%24select=RouteName%2CDirection%2CStops&%24format=JSON`, {
			headers: {
				"authorization": "Bearer " + accessToken,
			},
		});
		const result = await Promise.all([eta, stop]);
		console.log('result', result);
		const etaRes = result[0].data;
		const stopRes = result[1].data;
		// 當輸入無效路線號碼時
		if (etaRes.length === 0 || stopRes.length === 0) {
			navigate("/NotFound");
			return;
		}
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
		console.log('etas', etas);

		const stops = stopRes.map((item) => {
			return {
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

		// 取出路線
		const routeObj = {}
		stops.forEach(item => {
			const { key, stops } = item  // 解構取值
			// const key = `${subRouteName}_${direction}`
			routeObj[key] = stops
		})
		// console.log('routeObj', routeObj);


		// #3 組合資料（上面的 routeObj 還缺 EstimateTime 資料）
		// for...in (在 routeObj物件中自訂一個 routeName 的屬性)
		// routeName 範例: 302_1
		const innerFinalRoute = {};
		for (const routeAndDirection in routeObj) {
			const stops = routeObj[routeAndDirection];
			const defaultStops = stops.map(stop => {
				const StopStatus = stopStatusObj[stop.StopUID];
				const EtaDirection = etaDirectionObj[stop.StopUID];
				const EstimateTime = estimateTimeObj[stop.StopUID];
				// 用 StopUID 抓 estimateTimeObj相對應的站牌再賦予EstimateTime 的值，return EstimateTime 跟 stop 中的其他屬性 
				return {
					StopStatus,
					EtaDirection,
					EstimateTime,
					...stop
				}
			})
			// 第一圈先取出該路線的站牌資料
			innerFinalRoute[routeAndDirection] = defaultStops;
		}
		// console.log('innerFinalRoute', innerFinalRoute);

		// 畫面初始要跑預設:去程路線
		const defaultDirection = `${routeName}_0`;
		setRouteDirection(defaultDirection);
		setFinalRoute(innerFinalRoute);

		const defaultStopsData = innerFinalRoute[defaultDirection];
		// 當輸入無效路線號碼時
		if (defaultStopsData === undefined) return;
		const fromStopName = defaultStopsData[(defaultStopsData.length) - 1].StopName.Zh_tw;
		const toStopName = defaultStopsData[0].StopName.Zh_tw;
		setFrom(fromStopName);
		setTo(toStopName);
	};

	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");

	useEffect(() => {
		getAllRoutes();
	}, [routeName]);

	const defaultButtonStyle = "flex justify-center items-center";
	const [directionFromStyle, setDirectionFromStyle] = useState(defaultButtonStyle);
	const [directionToStyle, setDirectionToStyle] = useState(defaultButtonStyle);

	const selectStyle = "text-white bg-gradient-start";
	const unSelectStyle = "text-gradient-start bg-white";

	// 當觸發 direction 改變時
	useEffect(() => {
		if (!routeDirection) return;
		// console.log('routeDirection', routeDirection);

		const newStopData = finalRoute[routeDirection]; // 外面的 finalRoute
		if (newStopData === undefined) {
			return;
		}
		setStopData(newStopData); // 帶入搜尋到的公車路線

		const direction = routeDirection.split("_")[1];
		// console.log('direction', direction);
		console.log('finalRoute', finalRoute);


		if (direction === "0") {
			console.log('去程');
			setDirectionFromStyle(defaultButtonStyle + " " + selectStyle);
			setDirectionToStyle(defaultButtonStyle + " " + unSelectStyle);
		} else {
			console.log('回程');
			setDirectionFromStyle(defaultButtonStyle + " " + unSelectStyle);
			setDirectionToStyle(defaultButtonStyle + " " + selectStyle);
		}
		// console.log('directionFromStyle', directionFromStyle);
		// console.log('directionToStyle', directionToStyle);
	}, [routeDirection]);

	console.log('StopData', stopData);
	// console.log('外面state的routeDirection', routeDirection);

	// 切換愛心按鈕顏色
	const [isHighlighted, setIsHighlighted] = useState(false);
	const toggleHeartColor = () => {
		setIsHighlighted(!isHighlighted);
	}
	const getButtonClassName = () => {
		if (isHighlighted) return "text-highlight";
		return "text-gray-300";
	}


	// 加入最愛
	const addToFavorites = (item) => {
		setFavorites((prevFavorites) => [...prevFavorites, item]);
		toggleHeartColor();
	}


	// 儲存最愛到 localStorage
	useEffect(() => {
		if (favorites.length === 0) {
			return;
		}
		localStorage.setItem('favorites', JSON.stringify(favorites))
	}, [favorites]);

	// console.log('routeName', routeName);


	return (
		<>
			<div className="h-auto lg:h-screen lg:flex lg:flex-col">
				<Navbar className="hidden md:block" />
				<div className="bg-white w-full h-auto lg:flex lg:h-full lg:p-5 lg:bg-gray-100">
					{/* 地圖來囉 */}
					<div className="hidden 
						md:block md:h-[400px] md:w-full md:sticky 
						lg:w-11/12 lg:h-auto">
						<BusMap
							routeName={routeName}
							finalRoute={finalRoute} />
					</div>


					{/* md 以上不顯示返回及顯示地圖鍵 地圖直線顯示 */}
					<div className="p-4 
				             md:px-10 
				             lg:w-1/2 lg:h-[500px] lg:bg-white lg:ml-3 lg:px-5 rounded-lg overflow-y-auto xl:h-[650px]">
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


						{/* 路線名稱、起迄站那塊 */}
						<main className="md:px-2 h-auto">
							<BusInformation
								routeName={routeName}
								from={from}
								to={to}
								getButtonClassName={getButtonClassName}
								addToFavorites={addToFavorites} />

							<div className="grid grid-cols-2 divide-x divide-transparent h-10 border border-gradient-start rounded-lg overflow-hidden">

								{/* 去回程切換按鈕 */}
								<button className={directionFromStyle}
									onClick={() => setRouteDirection(`${routeName}_0`)}>
									<p className="whitespace-pre">往  </p>
									<span className="font-bold tracking-wide">{from}</span>
								</button>

								<button className={directionToStyle}
									onClick={() => setRouteDirection(`${routeName}_1`)}
								>
									<p className="whitespace-pre">往  </p>
									<span className="font-bold tracking-wide">{to}</span>
								</button>
							</div>

							{/* 公車到站狀態 */}
							<ul className="px-2 py-3 divide-y divide-slate-200 md:py-6 lg:py-4">
								{/* <li className="flex justify-between items-center py-3 h-auto first:pt-0 last:pb-0 relative">
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

										<div className="absolute -right-3 w-0.5 h-10 bg-slate-200 mt-8 
								md:-right-5 md:mt-6 md:h-10 lg:-right-2">
											<div className="relative h-2 w-2 right-[3px] 
					after:content[''] rounded-full border-[2px] border-slate-200 bg-white"/>
										</div>
									</li> */}

								<BusStopStatus stopData={stopData} />
							</ul>
						</main>
					</div>

				</div>

				<Footer />
			</div>
		</>
	)
}


export default BusStatusPage;
