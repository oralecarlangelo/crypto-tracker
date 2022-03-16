import React from "react";
import { Route, Routes } from "react-router-dom";
import Market from "./features/Market";
import MarketDetail from "./features/Market/component/MarketDetail";
import MarketList from "./features/Market/component/MarketList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Market />}>
        <Route path="/" element={<MarketList />} />
        <Route path="/:id" element={<MarketDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
