import React from "react";
import { Link } from "react-router-dom";
import SearchBarDark from "./SearchBarDark";
import LogoWhite from "../images/M-logo-white.svg";
import { IoLocationSharp, IoHeart } from "react-icons/io5";


const Navbar = (props) => {
	return (<>
		<nav className={`${props.className}`}>
			<div className="bg-nav-dark h-14 flex justify-between items-center md:h-16">
				<img src={LogoWhite} alt="hi bus nav logo" className="mx-5 " />
				<SearchBarDark className="hidden md:block" />
				<div className="flex
               md:w-2/5 justify-end mr-2
               lg:w-1/3 lg:mr-10">
					<Link className="flex text-white hover:text-yellow-400"
						id="myLocation"
						to="/nearbystop">
						<IoLocationSharp className="mr-3 md:mr-1" size={22} />
						<span className="hidden md:block font-light mr-3">附近站牌</span>
					</Link>
					<Link className="flex text-white hover:text-yellow-400"
						id="myFavorite"
						to="/myfavorite">
						<IoHeart className="md:mr-1" size={22} />
						<span className="hidden md:block font-light">我的收藏</span>
					</Link>
				</div>
			</div>
			<SearchBarDark className="block md:hidden" />
		</nav>
		<div className="h-1.5 animate-color "></div>
	</>
	)
}


export default Navbar;
