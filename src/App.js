import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Transactions from "./pages/Transactions";
import Contact from "./pages/Contact";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <ToastContainer />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/transactions" element={<Transactions />} />
                <Route exact path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
