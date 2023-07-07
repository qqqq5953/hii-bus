import React from "react";
import { Link } from "react-router-dom";
import SearchBarDark from "./SearchBarDark";
import LogoWhite from "../images/M-logo-white.svg";
import { IoLocationSharp, IoHeart } from "react-icons/io5";


const Navbar = () => {
	return (
		<>
			<nav>
				<div className="bg-nav-dark h-14 flex items-center justify-around md:h-1/12">
					{/* Logo */}
					<Link to="/">
						<img src={LogoWhite} alt="hi bus nav logo" className="w-24" />
					</Link>
					{/* 搜尋欄 */}
					<SearchBarDark className="hidden md:block" />
					{/* 分頁連結 */}
					<div className="flex
               					md:w-1/3 justify-center md:mr-2
               					lg:w-1/3 lg:justify-end">
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
			</nav>
			<div className="h-1.5 animate-color "></div>
		</>
	)
}


export default Navbar;
