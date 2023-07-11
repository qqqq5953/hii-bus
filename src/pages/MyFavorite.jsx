import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoHeart, IoArrowForwardOutline, IoSearch, IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";


const MyFavorite = ({ favorites, setFavorites }) => {
	// 移除收藏
	const removeFavorites = (itemId) => {
		if (favorites.some((fav) => fav.id === itemId)) {
			setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== itemId));
			// 移除 localStorage 中的資料
			const updatedFavorites = favorites.filter((item) => item.id !== itemId);
			localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
		}
		console.log('removeFavorites');
	}

	// 從 localStorage 讀取最愛：畫面初始渲染時讀取
	useEffect(() => {
		const storedFavorites = localStorage.getItem('favorites');
		// JSON.parse：JSON字串變物件
		if (storedFavorites) {
			setFavorites(JSON.parse(storedFavorites));
		}
		console.log('storedFavorites', storedFavorites);
	}, []);

	console.log('favorites', favorites);

	return (
		<>
			<div className="flex flex-col h-screen bg-white
							md:bg-opacity-0">
				<Navbar />

				<div className="justify-center flex flex-cols-3 items-center 
								md:mt-8">
					<div className="bg-white w-full h-auto 
									md:w-5/6 md:rounded-lg md:px-2
			                        lg:w-3/4">
						<ul role="list" className="text-center p-1 divide-y divide-slate-200 lg:px-10 py-6">
							<li className="flex text-sm px-3 py-2 first:pt-0 text-gray-400
										   md:text-lg">
								<p className="w-1/3">公車路線</p>
								<p className="w-1/3">起始站與終點站</p>
								<p className="w-1/3 text-center">移除收藏</p>
							</li>

							{favorites.length === 0 &&
								(<div className="text-searchbar-dark font-bold">
									<p className="pt-8 pb-4">
										Oh，你還沒收藏最愛路線，你可以：
									</p>
									<div className="flex justify-center ">
										<Link className="flex px-1.5 items-center" to="/">
											<IoSearch className="mx-1 text-gradient-start" />
											搜尋公車路線
										</Link>
										<Link className="flex px-1.5 items-center" to="/nearbystop">
											<IoLocationSharp className="mx-1 text-yellow-400" />
											查看附近站牌
										</Link>
									</div>
								</div>)}

							{favorites.map((item) => (
								<li className="text-center hover:bg-gray-100 flex px-2 py-4"
									key={item.id}>
									<p className="w-1/3 font-semibold text-nav-dark
 										md:text-lg">
										{item.routeName}
									</p>
									<div className="flex w-1/3 justify-center items-center">
										<p className="text-nav-dark text-md">
											{item.from}</p>
										<p className="text-highlight px-1"><IoArrowForwardOutline /></p>
										<p>{item.to}</p>
									</div>
									<button className="w-1/3 flex justify-center">
										<IoHeart className="text-2xl text-highlight"
											onClick={() => removeFavorites(item.id)} />
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="fixed w-full z-10 bottom-0">
					<Footer />
				</div>
			</div>
		</>
	)
}


export default MyFavorite;
