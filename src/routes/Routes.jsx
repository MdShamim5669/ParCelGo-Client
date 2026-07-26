import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ServicesPage from '../pages/ServicesPage/ServicesPage';
import Coverage from '../pages/Coverage/Coverage';
import About from '../pages/About/About';
import BeARider from '../pages/Rider/BeARider';
import AdminRoutes from './AdminRoutes';
import AdminOverview from '../pages/admin/AdminOverview';
import ManageUsers from '../pages/admin/ManageUsers';
import AssignRiders from '../pages/admin/AssignRiders';
import PrivateRoute from './PrivateRoute';
import BookParcel from '../pages/user/BookParcel';
import MyParcels from '../pages/user/MyParcels';
import TrackingDetails from '../pages/user/TrackingDetails';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import RiderRoutes from './RiderRoutes';
import RiderOverview from '../pages/Rider/RiderOverview';
import MyDeliveries from '../pages/Rider/MyDeliveries';
import MyProfile from '../pages/user/MyProfile';
import DashboardRedirect from '../pages/dashboard/DashboardRedirect';
import PaymentSuccess from '../pages/user/Payment/PaymentSuccess';
import PaymentFail from '../pages/user/Payment/PaymentFail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/services',
        element: <ServicesPage />
      },
      {
        path: '/coverage',
        element: <Coverage />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/rider',
        element: <BeARider />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <PrivateRoute><DashboardRedirect /></PrivateRoute>
      },
      // User Routes
      {
        path: 'my-profile',
        element: <PrivateRoute><MyProfile /></PrivateRoute>
      },
      {
        path: 'payment/success',
        element: <PrivateRoute><PaymentSuccess /></PrivateRoute>
      },
      {
        path: 'payment/fail',
        element: <PrivateRoute><PaymentFail /></PrivateRoute>
      },
      {
        path: 'book-parcel',
        element: <PrivateRoute><BookParcel /></PrivateRoute>
      },
      {
        path: 'my-parcels',
        element: <PrivateRoute><MyParcels /></PrivateRoute>
      },
      {
        path: 'track/:id',
        element: <PrivateRoute><TrackingDetails /></PrivateRoute>
      },
      // Rider Routes
      {
        path: 'rider',
        element: <RiderRoutes><RiderOverview /></RiderRoutes>
      },
      {
        path: 'rider/deliveries',
        element: <RiderRoutes><MyDeliveries /></RiderRoutes>
      },
      // Admin Routes
      {
        path: 'admin',
        element: <AdminRoutes><AdminOverview /></AdminRoutes>
      },
      {
        path: 'admin/users',
        element: <AdminRoutes><ManageUsers /></AdminRoutes>
      },
      {
        path: 'admin/assign-riders',
        element: <AdminRoutes><AssignRiders /></AdminRoutes>
      }
    ]
  }
]);

export default router;
