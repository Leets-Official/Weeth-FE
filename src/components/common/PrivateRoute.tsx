import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={`/?redirect=${location.pathname}`} replace />;
  }
  return element;
};

export default PrivateRoute;
