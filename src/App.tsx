import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router-dom';
import { HomeRoute } from './pages/Home';
import { DashboardRoute } from './pages/Dashboard';

export function App() {
  return (
    <BrowserRouter>
        <Routes>
            {HomeRoute}
            {DashboardRoute}
        </Routes>
    </BrowserRouter>
  );
}