import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Settings from "./components/Settings";
import Export from "./components/Export";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">ホーム</Link>
        <Link to="/settings">設定</Link>
        <Link to="/export">エクスポート</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/export" element={<Export />} />
      </Routes>
    </Router>
  );
}

export default App;