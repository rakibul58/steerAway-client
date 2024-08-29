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
  roles: string[] | undefined;
};

const ProtectedRoute = ({ children, roles }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  if (roles !== undefined && !roles?.includes(user?.role as string)) {
    dispatch(logout());
    return <Navigate to="/signIn" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/signIn" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
