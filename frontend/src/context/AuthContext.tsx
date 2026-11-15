import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UsuarioAuth } from '../types';
import { loginApi, logoutApi } from '../services/api';

interface AuthContextType {
  user: UsuarioAuth | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isOperador: boolean;
  rolDisplay: string;
  rolCodigo: 'administrador' | 'operador_emergencia';
  loading: boolean;
  login: (username: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'willai_auth_user';
const STORAGE_KEY_TOKEN = 'willai_auth_token';

// Usuario público por defecto para acceso 100% libre sin barreras de inicio de sesión
const DEFAULT_PUBLIC_USER: UsuarioAuth = {
  id: 1,
  username: 'operador_publico',
  email: 'publico@willai.pe',
  nombre: 'Acceso Público General',
  is_admin: true,
  is_operador: true,
  is_staff: true,
  is_superuser: true,
  roles: ['administrador', 'operador_emergencia'],
  rol_principal: 'administrador'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UsuarioAuth>(DEFAULT_PUBLIC_USER);
  const [token, setToken] = useState<string>('public_session_active');

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      const savedToken = localStorage.getItem(STORAGE_KEY_TOKEN);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      if (savedToken) {
        setToken(savedToken);
      }
    } catch (e) {
      console.warn('Error al leer sesión previa:', e);
    }
  }, []);

  const login = async (username: string, pass: string) => {
    try {
      const res = await loginApi(username, pass);
      if (res.success && res.user) {
        setUser(res.user);
        setToken(res.token || 'public_session_active');
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(res.user));
        localStorage.setItem(STORAGE_KEY_TOKEN, res.token || 'public_session_active');
      }
    } catch (e) {
      console.warn('Login omitido, manteniendo sesión pública activa:', e);
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (e) {
      // Ignorar en modo público
    } finally {
      setUser(DEFAULT_PUBLIC_USER);
      setToken('public_session_active');
      localStorage.removeItem(STORAGE_KEY_USER);
      localStorage.removeItem(STORAGE_KEY_TOKEN);
    }
  };

  const isAdmin = true;
  const isOperador = true;
  const rolCodigo: 'administrador' | 'operador_emergencia' = 'administrador';
  const rolDisplay = 'Acceso Público Completo (Operaciones & Análisis)';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: true,
        isAdmin,
        isOperador,
        rolDisplay,
        rolCodigo,
        loading: false,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de un AuthProvider');
  }
  return context;
};
