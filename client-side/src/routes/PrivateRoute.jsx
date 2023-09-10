import { Navigate, useLocation } from 'react-router'
import useAuth from '../hooks/useAuth'
import Loader from '../Components/Loader/Loader'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  console.log(loading);

  if (loading) {
    return <Loader />;
  }

  if (user != null) {
    return children
  }
  return <Navigate to='/' state={{ from: location }} replace></Navigate>
}

export default PrivateRoute;
