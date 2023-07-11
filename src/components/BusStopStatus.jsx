import Button from "../components/Button";
import { IoBus } from "react-icons/io5";

const BusStopStatus = ({ stopData, plateNumb }) => {
	console.log("BusStopStatus內 plateNumb", plateNumb);
	console.log("BusStopStatus內 stopData", stopData);


	// 重組資料型態 {StopUID_Direction: PlateNumb}
	const stopObj = stopData.reduce((obj, stop) => {
		const stopKey = `${stop.StopUID}_${stop.EtaDirection}`;
		const stopValue = stop.StopName.Zh_tw;
		obj[stopKey] = stopValue;
		return obj;
	}, {});

	const plateObj = plateNumb.reduce((obj, plate) => {
		const plateKey = plate.Key;
		const plateValue = plate.PlateNumb;
		obj[plateKey] = plateValue;
		return obj;
	}, {});


	const matchingPlates = [];
	// 比對 stopUID 及 plateUID 兩物件是否有相符的屬性
	Object.entries(plateObj).forEach(([plateKey, plateValue]) => {
		if (stopObj.hasOwnProperty(plateKey)) {
			const obj = {};
			obj[plateKey] = plateValue;
			matchingPlates.push(obj);
		}
	});

	console.log("matchingPlates", matchingPlates);

	console.log("stopObj", stopObj);
	console.log("plateObj", plateObj);


	return (
		<>
			{stopData.map((stop, index) => {
				const isFirstItem = index === 0;
				// const isLastItem = index === stopData.length - 1;
				return (
					<li className="flex items-center py-3 
						first:pt-0 last:pb-0 relative" key={stop.StopUID}>
						<div className="flex items-center">
							<div className="flex items-center">
								{/* 判斷站牌狀態＆到站時間 */}
								{stop.StopStatus === 4 ?
									(<Button backgroundColor="#FF6464"
										fontSize='12px'
										fontColor='#FFF'>尚未營運
									</Button >) :
									stop.StopStatus === 3 ?
										(<Button backgroundColor="#F8F8FB"
											fontSize='12px'
											fontColor='#8C90AB'>末班駛離
										</Button >) :
										stop.StopStatus === 2 ?
											(<Button backgroundColor="#F8F8FB"
												fontSize='12px'
												fontColor='#8C90AB'>交管<br />不停靠
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

								{/* 即將到站的公車車牌 */}
								<div className="flex w-20 h-10 bg-slate-100 rounded-full text-sm font-light text-slate-400 items-center justify-center mr-1 lg:mx-3">
									<IoBus className="text-gradient-start mx-0.5" />
									<p></p>
								</div>

							</div>
						</div>

						{/* 旁邊的點點 */}
						<div className={`${isFirstItem ? 'absolute -right-3 w-0.5 h-10 bg-slate-200 mt-8 ' : 'absolute -right-3 w-0.5 h-16 py-6 bg-slate-200'}`} >

							<div className="relative h-2 w-2 right-[3px] 
													after:content[''] rounded-full border-[2px] border-slate-200 bg-white"/>
						</div>
					</li>
				)
			})}

		</>
	)
}

export default BusStopStatus;