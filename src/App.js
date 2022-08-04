import './assets/styles/App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { LoginPage } from './components/LoginPage';
import Test from './components/TestPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
