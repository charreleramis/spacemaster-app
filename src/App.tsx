import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import CustomerLayout from './pages/customer';
import Dashboard from './pages/customer/dashboard';
import Service from './pages/customer/service';
import ServiceDetail from './pages/customer/service/detail';
import Subscription from './pages/customer/subscription';
import Support from './pages/customer/support';
import Settings from './pages/customer/settings';
import NotFound from './pages/404';
import SoftBackdrop from './components/SoftBackdrop';
import Footer from './components/Footer';
import LenisScroll from './components/lenis';

function AppContent() {
	const location = useLocation();
	const hideNavbar = location.pathname === '/signin' || location.pathname === '/signup' || location.pathname.startsWith('/customer');

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
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/customer" element={<CustomerLayout />}>
					<Route index element={<Navigate to="/customer/dashboard" replace />} />
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="service" element={<Service />} />
					<Route path="service/:id" element={<ServiceDetail />} />
					<Route path="subscription" element={<Subscription />} />
					<Route path="support" element={<Support />} />
					<Route path="settings" element={<Settings />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

function App() {
	return (
		<Router>
			<AppContent />
		</Router>
	);
}
export default App;