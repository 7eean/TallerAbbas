import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Importa componentes (puedes crear estos archivos después)
import Home from "./pages/Home";
import Order from "./pages/Order";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;
