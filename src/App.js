import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductListView from "./pages/ProductListView";
import ProductView from "./pages/ProductView";

function App() {
  return (
      <Routes>
        <Route path="/" element={<ProductListView />} />
      <Route path="/product/:id" element={<ProductView />} />
      </Routes>
  );
}

export default App;
