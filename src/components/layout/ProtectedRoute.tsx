import { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import {
  logout,
  TUser,
  useCurrentToken,
} from '../../redux/features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../../utils/verifyToken';

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/signIn" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/signIn" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
