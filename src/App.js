import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MyFavorite from "./pages/MyFavorite";
import BusStatusPage from "./pages/BusStatusPage";



function App() {
  const [routeNumber, setRouteNumber] = useState(""); // 搜尋公車路線
  const [routeName, setRouteName] = useState("");
  const [city, setCity] = useState('臺北市'); // choose city 


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

        <Route path="/myfavorite" element={<MyFavorite />}></Route>

        <Route path="/:city/:RouteUID" element={<BusStatusPage
          routeNumber={routeNumber}
          routeName={routeName}
          city={city} />} >
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
