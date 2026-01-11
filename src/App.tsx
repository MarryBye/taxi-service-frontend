import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import {useAuthStore} from "@/store/auth.store";
import {useProfile} from "@/hooks/useClients";
import {AuthWatcher} from "@/components/AuthWatcher";
/* STATIC */

import HomePage from '@/pages/Home';
import AboutPage from '@/pages/About';
import CareerPage from '@/pages/Career';

/* AUTH */

import LoginPage from '@/pages/Login';
import RegisterPage from "@/pages/Register";

/* CLIENTS */

import ProfilePage from "@/pages/clients/Profile";
import MakeOrderPage from "@/pages/clients/MakeOrder";
import UpdateProfilePage from "@/pages/clients/UpdateProfile";
import OrdersHistoryPage from "@/pages/clients/OrdersHistory";
import OrderDetailPage from "@/pages/clients/OrderDetail";

/* WORKER */

import DriverHomePage from "@/pages/workers/Home";
import DriverOrdersHistoryPage from "@/pages/workers/OrdersHistory";
import DriverOrderDetailPage from "@/pages/workers/AcceptOrder";
import DriverStatsPage from "@/pages/workers/Stats";

/* ADMIN */

import AdminDashboard from "@/pages/admin/Dashboard";
import AdminUsersListPage from "@/pages/admin/users/Users";
import AdminUserDetailPage from "@/pages/admin/users/UsersDetail";
import AdminUserCreatePage from "@/pages/admin/users/UserCreate";
import AdminUserUpdatePage from "@/pages/admin/users/UserUpdate";
import AdminUserDeletePage from "@/pages/admin/users/UsersDelete";

import AdminCarsListPage from "@/pages/admin/cars/Cars";
import AdminCarDetailPage from "@/pages/admin/cars/CarsDetail";

import AdminCarDeletePage from "@/pages/admin/cars/CarsDelete";
import AdminCarUpdatePage from "@/pages/admin/cars/CarUpdate";
import AdminCarCreatePage from "@/pages/admin/cars/CarCreate";

import AdminOrdersListPage from "@/pages/admin/orders/Orders";
import AdminOrderDetailPage from "@/pages/admin/orders/OrdersDetail";

import AdminTransactionsListPage from "@/pages/admin/transactions/Transactions";
import AdminTransactionDetailPage from "@/pages/admin/transactions/TransactionsDetail";
import AdminTransactionCreatePage from "@/pages/admin/transactions/TransactionCreate";

import AdminMaintenancesListPage from "@/pages/admin/maintenances/Maintenances";
import AdminMaintenanceCreatePage from "@/pages/admin/maintenances/MaintenanceCreate";
import AdminMaintenanceDetailPage from "@/pages/admin/maintenances/MaintenancesDetail";
import AdminMaintenanceDeletePage from "@/pages/admin/maintenances/MaintenancesDelete";
import AdminMaintenanceUpdatePage from "@/pages/admin/maintenances/MaintenanceUpdate";

export function App() {
    return (
        <BrowserRouter>
            <AuthWatcher/>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/career' element={<CareerPage />} />

                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />

                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/profile/edit' element={<UpdateProfilePage />} />
                <Route path='/order' element={<MakeOrderPage />} />
                <Route path='/orders/history' element={<OrdersHistoryPage />} />
                <Route path='/orders/:orderId' element={<OrderDetailPage />} />

                <Route path='/driver' element={<DriverHomePage />} />
                <Route path='/driver/history' element={<DriverOrdersHistoryPage />} />
                <Route path='/driver/stats' element={<DriverStatsPage />} />
                <Route path='/driver/orders/:orderId' element={<DriverOrderDetailPage />} />

                <Route path='/admin' element={<AdminDashboard />} />
                <Route path='/admin/users' element={<AdminUsersListPage />} />
                <Route path='/admin/users/:userId' element={<AdminUserDetailPage />} />
                <Route path='/admin/users/:userId/edit' element={<AdminUserUpdatePage />} />
                <Route path='/admin/users/create' element={<AdminUserCreatePage />} />
                <Route path='/admin/users/:userId/delete' element={<AdminUserDeletePage />} />

                <Route path='/admin/cars' element={<AdminCarsListPage />} />
                <Route path='/admin/cars/:carId' element={<AdminCarDetailPage />} />
                <Route path='/admin/cars/:carId/delete' element={<AdminCarDeletePage />} />
                <Route path='/admin/cars/:carId/edit' element={<AdminCarUpdatePage />} />
                <Route path='/admin/cars/create' element={<AdminCarCreatePage />} />

                <Route path='/admin/orders' element={<AdminOrdersListPage />} />
                <Route path='/admin/orders/:orderId' element={<AdminOrderDetailPage />} />

                <Route path='/admin/transactions' element={<AdminTransactionsListPage />} />
                <Route path='/admin/transactions/:transactionId' element={<AdminTransactionDetailPage />} />
                <Route path='/admin/transactions/create' element={<AdminTransactionCreatePage />} />

                <Route path='/admin/maintenances' element={<AdminMaintenancesListPage />} />
                <Route path='/admin/maintenances/create' element={<AdminMaintenanceCreatePage />} />
                <Route path='/admin/maintenances/:maintenanceId' element={<AdminMaintenanceDetailPage />} />
                <Route path='/admin/maintenances/:maintenanceId/delete' element={<AdminMaintenanceDeletePage />} />
                <Route path='/admin/maintenances/:maintenanceId/edit' element={<AdminMaintenanceUpdatePage />} />
            </Routes>
        </BrowserRouter>
    );
}