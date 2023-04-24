import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoResult from "./pages/NoResult";
import Search from "./pages/Search";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="search" element={<Search />}></Route>
          <Route path="noresult" element={<NoResult />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
