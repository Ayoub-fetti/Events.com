'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authUtils } from '@/services/utils/auth-utils';
import { Role } from '@/types/user.types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = authUtils.getToken();

    if (!token || authUtils.isTokenExpired(token)) {
      authUtils.removeToken();
      router.push('/auth/login');
      return;
    }

    if (allowedRoles && allowedRoles.length > 0) {
      const hasAccess = authUtils.hasRole(allowedRoles);
      if (!hasAccess) {
        const decoded = authUtils.decodeJwt(token);
        const userRole = decoded?.role as Role;

        if (userRole === Role.ADMIN) {
          router.push('/admin/dashboard');
        } else if (userRole === Role.PARTICIPANT) {
          router.push('/participant/dashboard');
        } else {
          router.push('/auth/login');
        }
        return;
      }
    }

    setIsAuthorized(true);
  }, [router, allowedRoles]);

  if (!isAuthorized) return null;

  return <>{children}</>;
}
