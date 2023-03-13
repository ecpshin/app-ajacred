import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import useGeral from './hooks/useGeral';
import Client from './pages/Client';
import Clients from './pages/Clients';
import Contracts from './pages/Contracts';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
//import Others from './pages/Others';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path=''>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Route>

      <Route path='' element={<ProtectedRoutes redirectTo='/' />}>
        <Route path='/home' element={<Home />} />
        <Route path='/contratos' element={<Contracts />} />
        <Route path='/clientes' element={<Clients />} />
        <Route path='/cliente' element={<Client />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

function ProtectedRoutes({ redirectTo }) {
  const { token } = useGeral();
  const isAuthenticated = token;
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}
