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


	console.log("stopObj", stopObj);
	console.log("plateObj", plateObj);


	return (
		<>
			{stopData.map((stop, index) => {
				const isFirstItem = index === 0;
				const isLastItem = index === (stopData.length - 1);
				return (
					<li className="flex items-center py-3 
						first:pt-0 last:pb-6 lg:last:pb-0 relative" key={stop.StopUID}>
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
								{plateObj[`${stop.StopUID}_${stop.EtaDirection}`]
									&& (
										<div className="flex absolute right-0 w-24 h-9 bg-slate-100/75 rounded-full drop-shadow-sm items-center justify-center ">
											<IoBus className="text-gradient-start mx-0.5" />
											<p className="text-sm font-light text-slate-400">{plateObj[`${stop.StopUID}_${stop.EtaDirection}`]}</p>
										</div>
									)}

							</div>
						</div>

						{/* 旁邊的點點 */}
						<div className={`${isFirstItem ? 'absolute -right-3 w-0.5 h-10 mt-8 bg-slate-200' : isLastItem ? 'absolute -right-3 w-0.5 h-8 pt-6 mb-7 bg-slate-200' : 'absolute -right-3 w-0.5 h-16 py-6 bg-slate-200'}`} >

							<div className="relative h-2 w-2 right-[3px] 
													after:content[''] rounded-full border-[2px] border-slate-200 bg-white">
								{/* 即將到站的閃爍點點 */}
								{(plateObj[`${stop.StopUID}_${stop.EtaDirection}`]) &&
									(
										<span class="relative flex h-2 w-2">
											<span class="animate-ping absolute right-[2px] bottom-[2px] inline-flex h-full w-full rounded-full bg-gradient-start opacity-70"></span>
											<span class="absolute right-[2px] bottom-[2px] rounded-full h-2 w-2 bg-gradient-start"></span>
										</span>
									)}
							</div>
						</div>
					</li>
				)
			})}

		</>
	)
}

export default BusStopStatus;