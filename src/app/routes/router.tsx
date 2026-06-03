import { createBrowserRouter } from 'react-router-dom';
import { LandingPage } from '../../pages/LandingPage';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { MapsPage } from '../../pages/MapsPage';
import { AddressPage } from '../../pages/AddressPage';
import { OrderPage } from '../../pages/OrderPage';
import { OrderHistoryPage } from '../../pages/OrderHistoryPage';
import { OrderDetailPage } from '../../pages/OrderDetailPage';
import { SuccessPage } from '../../pages/SuccessPage';
import { SettingsPage } from '../../pages/SettingsPage';
import { ProtectedRoute } from '../providers/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/maps',
    element: (
      <ProtectedRoute>
        <MapsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/address',
    element: (
      <ProtectedRoute>
        <AddressPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/order',
    element: (
      <ProtectedRoute>
        <OrderPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/history',
    element: (
      <ProtectedRoute>
        <OrderHistoryPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/history/:orderId',
    element: (
      <ProtectedRoute>
        <OrderDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/success',
    element: (
      <ProtectedRoute>
        <SuccessPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
]);
