import "./App.css";
import React from "react";
import Slide from "./Components/Slide.js";
import Header from "./Components/Header";
import Contact from "./Components/Contact.js";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Slide />
      <Contact />
    </div>
  );
}
