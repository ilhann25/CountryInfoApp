import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import About from "./components/About";
import CountryList from "./components/CountryList";
import Country from "./components/Country";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<CountryList/>} />
            <Route path="/about" element={<About />} />
            <Route path="/:name" element={<Country />} />
            <Route path="/contact" element={<Contact />} />
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;














