import React from "react";
import SearchBarDark from "./SearchBarDark";
import { IoLocationSharp, IoHeart } from "react-icons/io5";
import LogoWhite from "../images/M-logo-white.svg";


const Navbar = () => {
	return (<>
		<nav>
			<div className="bg-nav-dark h-14 flex justify-between items-center md:h-16">
				<img src={LogoWhite} alt="hi bus logo" className="mx-5" />
				<SearchBarDark className="hidden md:block" />
				<div className="flex
               md:w-2/5 justify-end mr-2
               lg:w-1/3 lg:mr-10">
					<button className="flex text-white hover:text-yellow-400" id="myLocation">
						<IoLocationSharp className="mr-3 md:mr-1" size={22} />
						<span className="hidden md:block font-light mr-3">附近站牌</span>
					</button>
					<button className="flex text-white hover:text-yellow-400" id="myFavorite">
						<IoHeart className="md:mr-1" size={22} />
						<span className="hidden md:block font-light">我的收藏</span>
					</button>
				</div>
			</div>
			<SearchBarDark className="block md:hidden" />
		</nav>


		<div className="h-1.5 bg-gradient-to-r from-gradient-start to-gradient-end "></div>


	</>
	)
}


export default Navbar;
