import { Navigate, useLocation } from 'react-router'
import Loading from '../Loading/Loading'
import useAuth from '../hooks/useAuth'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  console.log(loading);

  if (loading) {
    return <Loading />
  }

  if (user != null) {
    return children
  }
  return <Navigate to='/' state={{ from: location }} replace></Navigate>
}

export default PrivateRoute
