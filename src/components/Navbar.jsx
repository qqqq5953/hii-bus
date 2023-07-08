import React from "react";
import { Link } from "react-router-dom";
import LogoWhite from "../images/M-logo-white.svg";
import { IoLocationSharp, IoHeart } from "react-icons/io5";


const Navbar = () => {
	return (
		<>
			<nav>
				<div className="bg-nav-dark h-14 flex items-center justify-between
								 md:h-1/12">
					{/* Logo */}
					<Link to="/">
						<img src={LogoWhite} alt="hi bus nav logo" className="w-24 ml-5" />
					</Link>
					{/* 分頁連結 */}
					<div className="flex mr-5
               					md:w-1/3 justify-center md:mr-0
               					lg:w-1/3 lg:-mr-4">
						<Link className="flex text-white hover:text-yellow-400"
							id="myLocation"
							to="/nearbystop">
							<IoLocationSharp className="mx-3 md:mr-1" size={22} />
							<span className="hidden md:block font-light mr-3">附近站牌</span>
						</Link>
						<Link className="flex text-white hover:text-yellow-400"
							id="myFavorite"
							to="/myfavorite">
							<IoHeart size={22} />
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
