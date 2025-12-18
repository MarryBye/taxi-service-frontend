import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import HomePage from '@/pages/Home';
import AboutPage from "@/pages/About";
import CareerPage from "@/pages/Career";

import ProfilePage from "@/pages/clients/Profile";
import MakeOrderPage from "@/pages/clients/MakeOrder";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import OrdersHistoryPage from "@/pages/clients/OrdersHistory";
import UpdateProfile from "@/pages/clients/UpdateProfile";
import DriverHomePage from "@/pages/workers/Home"

export function App() {
    return (
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/career' element={<CareerPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/order' element={<MakeOrderPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/orders/history' element={<OrdersHistoryPage />} />
              <Route path='/profile/edit' element={<UpdateProfile />} />
              <Route path='/worker' element={<DriverHomePage />} />
          </Routes>
        </BrowserRouter>
    );
}