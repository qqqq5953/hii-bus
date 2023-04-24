import React from "react";
import SearchBarDark from "./SearchBarDark";
import { IoLocationSharp, IoHeart } from "react-icons/io5";
import LogoWhite from "../images/M-logo-white.svg";

const Navbar = () => {
	return (<>
		<nav>
			<div className="bg-nav-dark h-14 flex justify-between items-center">
				<img src={LogoWhite} alt="hi bus logo" className="mx-5" />
				<div className="flex justify-between mx-3">
					<IoLocationSharp className='text-white' size={22} />
					<IoHeart className='text-white mx-4' size={22} />
				</div>
			</div>
			<SearchBarDark />
		</nav>


		<div className="h-1.5 bg-gradient-to-r from-gradient-start to-gradient-end "></div>

	</>
	)
}

export default Navbar;