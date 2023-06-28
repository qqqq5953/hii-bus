import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoHeart, IoArrowForwardOutline } from "react-icons/io5";


const MyFavorite = ({ favorites, setFavorites }) => {
	// 加入最愛
	const addToFavorites = (item) => {
		setFavorites((prevFavorites) => [...prevFavorites, item]);
	}

	// 移除最愛
	const removeFavorites = (itemId) => {
		setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== itemId));
		console.log('removeFavorites');
	}

	// 加入或移除最愛
	const toggleFavorites = (item) => {
		if (favorites.some((fav) => fav.id === item.id)) {
			removeFavorites(item.id)
		} else {
			addToFavorites(item);
		}
	}

	// 儲存最愛到 localStorage
	useEffect(() => {
		if (favorites.length === 0) return;
		localStorage.setItem('favorites', JSON.stringify(favorites))
	}, [favorites]);

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
			<div className="flex flex-col h-screen">
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
								<p className="w-1/3 text-center">加入 / 移除收藏</p>
							</li>

							{/*我的收藏路線列表 */}
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
											onClick={() => toggleFavorites(item)} />
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>

				<Footer />
			</div>
		</>
	)
}


export default MyFavorite;
