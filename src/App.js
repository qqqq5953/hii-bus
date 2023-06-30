import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MyFavorite from "./pages/MyFavorite";
import BusStatusPage from "./pages/BusStatusPage";
import NearByBusStop from "./pages/NearByBusStop";


function App() {
  const [routeNumber, setRouteNumber] = useState(""); // 搜尋公車路線
  const [routeName, setRouteName] = useState("");
  const [city, setCity] = useState('臺北市'); // choose city
  const [stopData, setStopData] = useState([]); // 整理好的站牌資料
  const [favorites, setFavorites] = useState([]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home
          routeNumber={routeNumber}
          setRouteNumber={setRouteNumber}
          routeName={routeName}
          setRouteName={setRouteName}
          city={city}
          setCity={setCity} />}>
        </Route>

        <Route path="/myfavorite" element={<MyFavorite
          stopData={stopData}
          favorites={favorites}
          setFavorites={setFavorites} />}></Route>

        <Route path="/:cityselect/:routeName" element={<BusStatusPage
          routeNumber={routeNumber}
          city={city}
          stopData={stopData}
          setStopData={setStopData}
          favorites={favorites}
          setFavorites={setFavorites} />} >
        </Route>

        <Route path="nearbystop" element={<NearByBusStop
          city={city}
          routeName={routeName} />}>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
