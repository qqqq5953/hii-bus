import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import BusStatusPage from "./pages/BusStatusPage";
import { DataProvider } from "./data/DataContext";



function App() {
  return (
    <div className="App">
      <DataProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/:city/:RouteUID" element={<BusStatusPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
