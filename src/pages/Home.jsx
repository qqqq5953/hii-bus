import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import LogoWhite from "../images/M-logo-white.svg";
import MLogo from "../images/M-logo.svg";
import MBackground from "../images/M-bg.svg";
import TBackground from "../images/T-bg.svg";
import DBackground from "../images/D-bg.svg";
import Bus from "../images/M-bus-gif.svg";
import { IoLocationSharp, IoHeart } from "react-icons/io5";

const Home = () => {
	return (
		<>
			<div>
				<div className="bg-nav-dark h-14 flex justify-between items-center">
					<img src={LogoWhite} alt="hi bus logo" className="mx-5" />
					<div className="flex justify-between mx-5 md:mx-8">
						<button className="flex" id="myLocation">
							<IoLocationSharp className="text-white mr-3 md:mr-1" size={22} />
							<span className="hidden md:block text-white font-light mr-3">附近站牌</span>
						</button>
						<button className="flex" id="myFavorite">
							<IoHeart className="text-white md:mr-1" size={22} />
							<span className="hidden md:block text-white font-light">我的收藏</span>
						</button>
					</div>
				</div>
				<div className="h-1.5 bg-gradient-to-r from-gradient-start to-gradient-end ..."></div>
			</div>

			<main>
				<div className="grid justify-items-center mt-14 gap-3 md:gap-5">
					<img src={MLogo} alt="hi bus logo" />
					<h2 className="font-chinese">今天想搭乘哪輛公車呢？</h2>
				</div>

				<SearchBar />

				<div>
					<img src={MBackground} className="absolute bottom-24 w-full h-auto md:hidden" alt="background" />
					<img src={TBackground} className="absolute bottom-32 w-full h-auto hidden md:block lg:hidden" alt="background" />
					<img src={DBackground} className="absolute bottom-28 w-full h-auto hidden lg:block" alt="background" />
					<img src={Bus} className="absolute bottom-14 animate-slide-right md:w-56 md:bottom-16" alt="bus" />
				</div>
			</main>
			<Footer />
		</>
	)
}

export default Home;