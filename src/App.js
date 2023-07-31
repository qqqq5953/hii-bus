import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import MyFavorite from './pages/MyFavorite'
import BusStatusPage from './pages/BusStatusPage'
import NearByBusStop from './pages/NearByBusStop'
import cityList from './data/cityList'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  const [routeNumber, setRouteNumber] = useState('') // 搜尋公車路線
  const [routeName, setRouteName] = useState('')
  const [city, setCity] = useState('臺北市')
  const [stopData, setStopData] = useState([]) // 整理好的站牌資料
  const [favorites, setFavorites] = useState([])

  // 把 city 陣列轉成中英對照的物件型態 ex. {"台北市" : "Taipei"}
  const CityObj = cityList.reduce((acc, item) => {
    const chName = item.city_zh
    const enName = item.city_en
    acc[chName] = enName
    return acc
  }, {})

  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                routeNumber={routeNumber}
                setRouteNumber={setRouteNumber}
                routeName={routeName}
                setRouteName={setRouteName}
                setCity={setCity}
                city={city}
                CityObj={CityObj}
              />
            }
          ></Route>

          <Route
            path="/myfavorite"
            element={
              <MyFavorite
                favorites={favorites}
                setFavorites={setFavorites}
                city={city}
                routeName={routeName}
              />
            }
          ></Route>

          <Route
            path="/:cityselect/:routeName"
            element={
              <BusStatusPage
                CityObj={CityObj}
                routeNumber={routeNumber}
                setRouteNumber={setRouteNumber}
                city={city}
                setCity={setCity}
                stopData={stopData}
                setStopData={setStopData}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          ></Route>

          <Route
            path="nearbystop"
            element={
              <NearByBusStop
                CityObj={CityObj}
                city={city}
                routeName={routeName}
              />
            }
          ></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
