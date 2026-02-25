import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import CustomerLayout from './pages/customer';
import Dashboard from './pages/customer/dashboard';
import Service from './pages/customer/service';
import ServiceDetail from './pages/customer/service/detail';
import CreateOrder from './pages/customer/service/create';
import Ads from './pages/customer/ads';
import Invoice from './pages/customer/subscription';
import Support from './pages/customer/support';
import Settings from './pages/customer/settings';
import TermsAndPolicy from './pages/customer/terms';
import AdminLayout from './pages/admin';
import AdminDashboard from './pages/admin/dashboard';
import AdminOrders from './pages/admin/orders';
import NotFound from './pages/404';
import SoftBackdrop from './components/SoftBackdrop';
import Footer from './components/Footer';
import LenisScroll from './components/lenis';

function AppContent() {
	const location = useLocation();
	const hideNavbar = location.pathname === '/signin' || location.pathname === '/signup' || location.pathname.startsWith('/customer') || location.pathname.startsWith('/admin');

	return (
		<>
			<SoftBackdrop />
			<LenisScroll />
			{!hideNavbar && <Navbar />}
			<Routes>
				<Route path="/" element={
					<>
						<Home />
						<Footer />
					</>
				} />
				<Route path="/signin" element={
					<PublicRoute>
						<SignIn />
					</PublicRoute>
				} />
				<Route path="/signup" element={
					<PublicRoute>
						<SignUp />
					</PublicRoute>
				} />
				<Route path="/customer" element={
					<ProtectedRoute requiredRole="customer">
						<CustomerLayout />
					</ProtectedRoute>
				}>
					<Route index element={<Navigate to="/customer/dashboard" replace />} />
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="service" element={<Service />} />
					<Route path="service/create" element={<CreateOrder />} />
					<Route path="service/:id" element={<ServiceDetail />} />
					<Route path="ads" element={<Ads />} />
					<Route path="subscription" element={<Invoice />} />
					<Route path="support" element={<Support />} />
					<Route path="settings" element={<Settings />} />
					<Route path="terms" element={<TermsAndPolicy />} />
				</Route>
				<Route path="/admin" element={
					<ProtectedRoute requiredRole="admin">
						<AdminLayout />
					</ProtectedRoute>
				}>
					<Route index element={<Navigate to="/admin/dashboard" replace />} />
					<Route path="dashboard" element={<AdminDashboard />} />
					<Route path="orders" element={<AdminOrders />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

function App() {
	return (
		<Router>
			<AuthProvider>
				<AppContent />
			</AuthProvider>
		</Router>
	);
}
export default App;