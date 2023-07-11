import MBackground from "../images/M-bg.svg";
import TBackground from "../images/T-bg.svg";
import DBackground from "../images/D-bg.svg";
import Bus from "../images/M-bus-gif.png";

const Loading = () => {
	return (
		<>
			{/* 背景+公車 */}
			<div className="flex justify-center">
				<img src={MBackground} className="absolute bottom-24 w-full object-cover block md:hidden" alt="background" />
				<img src={TBackground} className="absolute bottom-32 w-full object-cover hidden md:block lg:hidden" alt="background" />
				<img src={DBackground} className="absolute bottom-28 w-full object-cover hidden lg:block" alt="background" />
				<img src={Bus} className="w-1/3 absolute animate-slide bottom-14 lg:w-1/6" alt="busIcon" />

				<div className="absolute text-2xl text-searchbar-dark top-1/2 tracking-wide
								md:text-4xl lg:text-3xl">
					公車行駛中，請稍候...
				</div>
			</div>
		</>
	)
}

export default Loading;