import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router-dom';
import { HeaderComponent } from './components/header';
import { NavPanel } from './components/navpanel';
import { HomeRoute } from './pages/Home';
import { DashboardRoute } from './pages/Dashboard';
import { UsersRoute } from './pages/users/list';
import { UserRoute } from './pages/users/detail';

export function App() {
  return (
    <BrowserRouter>
        <HeaderComponent />
        <div className="flex row min-h-0 overflow-hidden">
          <NavPanel />
          <Routes>
              {HomeRoute}
              {DashboardRoute}
              {UsersRoute}
              {UserRoute}
          </Routes>
        </div>
    </BrowserRouter>
  );
}