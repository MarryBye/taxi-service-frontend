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
import DriverOrdersHistoryPage from "@/pages/workers/OrdersHistory";
import DriverStatsPage from "@/pages/workers/Stats";
import AdminDashboard from "@/pages/admin/Dashboard";

import AdminUsersListPage from "@/pages/admin/users/Users";
import AdminUserUpdatePage from "@/pages/admin/users/UserUpdate";
import AdminUserDetailPage from "@/pages/admin/users/UsersDetail";
import AdminUserCreatePage from "@/pages/admin/users/UserCreate";

import AdminMaintenancesListPage from "@/pages/admin/maintenances/Maintenances";
import AdminMaintenanceCreatePage from "@/pages/admin/maintenances/MaintenanceCreate";
import AdminMaintenanceUpdatePage from "@/pages/admin/maintenances/MaintenanceUpdate";
import AdminMaintenanceDetailPage from "@/pages/admin/maintenances/MaintenanceDetail";

import AdminCarsListPage from "@/pages/admin/cars/Cars";
import AdminCarCreatePage from "@/pages/admin/cars/CarsCreate";
import AdminCarUpdatePage from "@/pages/admin/cars/CarsUpdate";
import AdminCarDetailPage from "@/pages/admin/cars/CarsDetail";

import AdminOrdersListPage from "@/pages/admin/orders/Orders";
import AdminOrderCreatePage from "@/pages/admin/orders/OrderCreate";
import AdminOrderUpdatePage from "@/pages/admin/orders/OrderUpdate";
import AdminOrderDetailPage from "@/pages/admin/orders/OrdersDetail";

import AdminTransactionCreatePage from "@/pages/admin/transactions/TransactionCreate";
import AdminTransactionDetailPage from "@/pages/admin/transactions/TransactionDetail";

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
              <Route path='/worker/history' element={<DriverOrdersHistoryPage />} />
              <Route path='/worker/stats' element={<DriverStatsPage />} />
              <Route path='/admin' element={<AdminDashboard />} />

              <Route path='/admin/users' element={<AdminUsersListPage />} />
              <Route path="/admin/users/:userId" element={<AdminUserDetailPage />} />
              <Route path='/admin/users/:userId/edit' element={<AdminUserUpdatePage />} />
              <Route path='/admin/users/create' element={<AdminUserCreatePage />} />

              <Route path='/admin/maintenances' element={<AdminMaintenancesListPage />} />
              <Route path='/admin/maintenances/create' element={<AdminMaintenanceCreatePage />} />
              <Route path='/admin/maintenances/:maintenanceId/edit' element={<AdminMaintenanceUpdatePage />} />
              <Route path='/admin/maintenances/:maintenanceId' element={<AdminMaintenanceDetailPage />} />

              <Route path='/admin/cars' element={<AdminCarsListPage />} />
              <Route path='/admin/cars/create' element={<AdminCarCreatePage />} />
              <Route path='/admin/cars/:carId/edit' element={<AdminCarUpdatePage />} />
              <Route path='/admin/cars/:carId' element={<AdminCarDetailPage />} />

              <Route path='/admin/orders' element={<AdminOrdersListPage />} />
              <Route path='/admin/orders/create' element={<AdminOrderCreatePage />} />
              <Route path='/admin/orders/:orderId/edit' element={<AdminOrderUpdatePage />} />
              <Route path='/admin/orders/:orderId' element={<AdminOrderDetailPage />} />

              <Route path='/admin/transactions/create' element={<AdminTransactionCreatePage />} />
              <Route path='/admin/transactions/:transactionId' element={<AdminTransactionDetailPage />} />
          </Routes>
        </BrowserRouter>
    );
}