import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import ContactPage from "./pages/ContactPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {

    return (
        <div>
            <Navbar/>
            
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/articles" element={<ArticlesPage/>} />
                <Route path="/contact" element={<ContactPage/>} />
                <Route path="/products" element={<ProductsPage/>} />
                <Route path="/products/:productId" element={<ProductDetailPage/>} />
            </Routes>
            
            
        </div>
    );
}

export default App;
