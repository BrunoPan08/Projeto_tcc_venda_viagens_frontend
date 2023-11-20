import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import MainPage from './MainPage/MainPage';
import Cart from './Cart/Cart';
import TravelDetail from './TravelDetail/TravelDetail';

const RouterPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mainpage/" element={<MainPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default RouterPage;
