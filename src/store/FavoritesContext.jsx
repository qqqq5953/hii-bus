// import { useState } from "react";


// const FavoritesContext = useContext({
// 	favorites: [],
// 	addFavorite: (favorite) => { },
// 	removeFavorite: (favoriteId) => { },
// });

// export const FavoriteContextProvider = (props) => {
// 	const [favorites, setFavorites] = useState([]);

// 	// 	function addFavorite(favorite) {
// 	// 		setUserFavorites((prevUserFavorites) => {
// 	// 			return prevUserFavorites.concat(favorite);
// 	// 		})
// 	// 	}

// 	// 	function removeFavorite(favoriteId) {
// 	// 		setUserFavorites((prevUserFavorites) => {
// 	// 			return prevUserFavorites.filter((busRoute) => busRoute.id !== favoriteId);
// 	// 		})
// 	// 	}

// 	// 	function isFavorite(favoriteId) {
// 	// 		setUserFavorites((prevUserFavorites) => {
// 	// 			return prevUserFavorites.some((busRoute) => busRoute.id === favoriteId);
// 	// 		})
// 	// 	}

// 	// 	const context = {
// 	// 		favorites: userFavorites,
// 	// 		totalFavorites: userFavorites.length,
// 	// 		addFavorite: addFavorite,
// 	// 		removeFavorite: removeFavorite,
// 	// 		isFavorite: isFavorite,
// 	// 	}

// 	return (
// 		<FavoriteContext.Provider value={{
// 			favorites: [],
// 			totalFavorites: 0,
// 			addFavorite: (favorite) => { },
// 			removeFavorite: (favoriteId) => { },
// 			removeFavorite: (favoriteId) => { },
// 		}}>
// 			{props.children}
// 		</FavoriteContext.Provider>
// 	)
// }

// export default FavoritesContext;