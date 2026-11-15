import React from 'react';

/**
 * En modo 100% público, todas las rutas del Centro de Mando Táctico,
 * simuladores, satélites, reportes e incidentes están abiertas para todo el público.
 */
export const ProtectedRoute: React.FC<{ children: React.ReactNode; requireAdmin?: boolean }> = ({ children }) => {
  return <>{children}</>;
};
