import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoResult from "./pages/NoResult";
import Search from "./pages/Search";
import BusEstimate from "./pages/BusEstimate";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/busestimate" element={<BusEstimate />}></Route>
        <Route path="*" element={<NoResult />}></Route>
      </Routes>
    </div>
  );
}

export default App;
