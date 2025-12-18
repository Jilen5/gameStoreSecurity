import React from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from './components/Header';

function App() {
  return (
    <>
      <Header></Header>
      <main>
        <Routes>
          <Route path="/" element={ <Home/>} />
          <Route path="/login" element={ <Login/>} />
        </Routes>
      </main>        
    </>
  );
}

export default App
