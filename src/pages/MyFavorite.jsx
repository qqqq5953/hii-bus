import Navbar from "../components/Navbar";
// import FavoriteList from "../components/FavoriteList";
import Footer from "../components/Footer";


const MyFavorite = () => {
	//{ favorites, handleFavoriteClick }
	// const addFavorite = (productId) => {
	// 	const UpdatedFavorite = [...favorites, productId];
	// 	setFavorites(UpdatedFavorite);
	// 	localStorage.setItem("favorites", JSON.stringify(UpdatedFavorite));
	// }

	// const removeFavorite = (productId) => {
	// 	const UpdatedFavorite = favorites.filter((id) => id !== productId);
	// 	setFavorites(UpdatedFavorite);
	// 	localStorage.setItem("favorites", JSON.stringify(UpdatedFavorite));
	// }


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
							{/* <FavoriteList
								addFavorite={addFavorite}
								removeFavorite={removeFavorite} 
								favorites={favorites}
								handleFavoriteClick={handleFavoriteClick}/> */}
						</ul>
					</div>
				</div>

				<Footer />
			</div>
		</>
	)
}


export default MyFavorite;
