import { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import {
  logout,
  TUser,
  useCurrentToken,
} from '../../redux/features/auth/authSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { verifyToken } from '../../utils/verifyToken';

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();
  const dispatch = useAppDispatch();

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }
  if (!token) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
