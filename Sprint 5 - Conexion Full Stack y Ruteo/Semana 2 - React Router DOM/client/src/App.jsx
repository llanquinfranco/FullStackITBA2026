import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import ContactPage from "./pages/ContactPage";

function App() {

    return (
        <div>
            <Navbar/>
            
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/articles" element={<ArticlesPage/>} />
                <Route path="/contact" element={<ContactPage/>} />
            </Routes>
            
            
        </div>
    );
}

export default App;
