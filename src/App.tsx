import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';
import CurrentOrderPage from '@/pages/CurrentOrder';
import MakeOrderPage from '@/pages/MakeOrder';
import CareersPage from "@/pages/Careers";
import AboutPage from "@/pages/About";

export function App() {
    return (
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/careers' element={<CareersPage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/current-order' element={<CurrentOrderPage />} />
              <Route path='/make-order' element={<MakeOrderPage />} />
          </Routes>
        </BrowserRouter>
    );
}