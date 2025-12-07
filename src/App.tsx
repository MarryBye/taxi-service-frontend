import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router-dom';
import { HeaderComponent } from './components/header';
import { NavPanel } from './components/navpanel';
import { HomeRoute } from './pages/Home';
import { DashboardRoute } from './pages/Dashboard';
import { UsersRoute } from './pages/users/list';
import { UserRoute } from './pages/users/detail';
import { OrdersRoute } from './pages/orders/list';
import { OrderRoute } from './pages/orders/detail';
import { DriversRoute } from './pages/drivers/list';
import { DriverRoute } from './pages/drivers/detail';
import { CarsRoute } from './pages/cars/list';
import { CarRoute } from './pages/cars/detail';

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
              {OrderRoute}
              {OrdersRoute}
              {DriversRoute}
              {DriverRoute}
              {CarsRoute}
              {CarRoute}
          </Routes>
        </div>
    </BrowserRouter>
  );
}