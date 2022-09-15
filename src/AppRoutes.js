import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function AppRoutes() {
	return (
		<Routes>
			<Route path=''>
				<Route path='/' element={<Signin />} />
				<Route path='/signup' element={<Signup />} />
			</Route>

			<Route path='' element={<ProtectedRoutes redirectTo='/' />}>
				<Route path='/home' element={<Home />} />
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}

function ProtectedRoutes({ redirectTo }) {
	const isAuthenticated = true;
	return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default AppRoutes;
