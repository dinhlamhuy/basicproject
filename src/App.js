import { Routes, Route } from "react-router-dom";

import HomeScreen from "./screens/home/HomeScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import DetailScreen from "./screens/home/DetailScreen.js";
import AboutScreen from "./screens/home/AboutScreen.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route path="/detail" element={<DetailScreen />} />
    </Routes>
  );
}

export default App;
