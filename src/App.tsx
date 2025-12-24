import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useAuthStore} from "@/store/auth.store";
import {useProfile} from "@/hooks/useClients";
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
import OrdersHistoryPage from "@/pages/clients/OrdersHistory";
import UpdateProfilePage from "@/pages/clients/UpdateProfile";
import OrderDetailPage from "@/pages/clients/OrderDetail";
import DriverOrderDetailPage from "@/pages/workers/AcceptOrder";
import DriverStatsPage from "@/pages/workers/Stats";

/* WORKER */
import DriverHomePage from "@/pages/workers/Home";
import DriverOrdersHistoryPage from "@/pages/workers/OrdersHistory";

/* ADMIN */
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminCarsListPage from "@/pages/admin/cars/Cars";
import AdminUsersListPage from "@/pages/admin/users/Users";
import AdminOrdersListPage from "@/pages/admin/orders/Orders";
import AdminMaintenancesListPage from "@/pages/admin/maintenances/Maintenances";
import AdminTransactionsListPage from "@/pages/admin/transactions/Transactions"
import AdminCarCreatePage from "@/pages/admin/cars/CarsCreate";
import AdminUserCreatePage from "@/pages/admin/users/UserCreate";
import AdminMaintenanceCreatePage from "@/pages/admin/maintenances/MaintenanceCreate";
import AdminTransactionCreatePage from "@/pages/admin/transactions/TransactionCreate";
import AdminCarUpdatePage from "@/pages/admin/cars/CarsUpdate";
import AdminUserUpdatePage from "@/pages/admin/users/UserUpdate";
import AdminMaintenanceUpdatePage from "@/pages/admin/maintenances/MaintenanceUpdate";
import AdminOrderUpdatePage from "@/pages/admin/orders/OrderUpdate";
import AdminCarDetailPage from "@/pages/admin/cars/CarsDetail";
import AdminTransactionDetailPage from "@/pages/admin/transactions/TransactionDetail";
import AdminMaintenanceDetailPage from "@/pages/admin/maintenances/MaintenanceDetail";
import AdminOrderDetailPage from "@/pages/admin/orders/OrdersDetail";
import AdminUserDetailPage from "@/pages/admin/users/UsersDetail";

export function App() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    if (isAuthenticated) {
        useProfile();
    }
    return (
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/career' element={<CareerPage />} />


              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />

              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/order' element={<MakeOrderPage />} />
              <Route path='/orders/history' element={<OrdersHistoryPage />} />
              <Route path='/profile/edit' element={<UpdateProfilePage />} />
              <Route path='/orders/:orderId' element={<OrderDetailPage />} />

              <Route path='/worker' element={<DriverHomePage />} />
              <Route path='/driver/orders/:orderId' element={<DriverOrderDetailPage />} />
              <Route path='/driver/history' element={<DriverOrdersHistoryPage />} />
              <Route path='/driver/stats' element={<DriverStatsPage />} />

              <Route path='/admin' element={<AdminDashboard />} />
              <Route path='/admin/cars' element={<AdminCarsListPage />} />
              <Route path='/admin/cars/create' element={<AdminCarCreatePage />} />
              <Route path='/admin/cars/:carId' element={<AdminCarDetailPage />} />
              <Route path='/admin/cars/:carId/edit' element={<AdminCarUpdatePage />} />

              <Route path='/admin/users' element={<AdminUsersListPage />} />
              <Route path='/admin/users/create' element={<AdminUserCreatePage />} />
              <Route path='/admin/users/:userId' element={<AdminUserDetailPage />} />
              <Route path='/admin/users/:userId/edit' element={<AdminUserUpdatePage />} />

              <Route path='/admin/orders' element={<AdminOrdersListPage />} />
              <Route path='/admin/orders/:orderId' element={<AdminOrderDetailPage />} />
              <Route path='/admin/orders/:orderId/edit' element={<AdminOrderUpdatePage />} />

              <Route path='/admin/maintenances' element={<AdminMaintenancesListPage />} />
              <Route path='/admin/maintenances/create' element={<AdminMaintenanceCreatePage />} />
              <Route path='/admin/maintenances/:maintenanceId' element={<AdminMaintenanceDetailPage />} />
              <Route path='/admin/maintenances/:maintenanceId/edit' element={<AdminMaintenanceUpdatePage />} />
              <Route path='/admin/transactions' element={<AdminTransactionsListPage />} />
              <Route path='/admin/transactions/create' element={<AdminTransactionCreatePage />} />
              <Route path='/admin/transactions/:transactionId' element={<AdminTransactionDetailPage />} />

          </Routes>
        </BrowserRouter>
    );
}