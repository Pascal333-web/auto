import { useState, useEffect } from 'react';
import type { User } from '../services/api';
import { api } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = api.getCurrentUser();
    setUser(currentUser);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const user = await api.login(email, password);
      if (user) {
        setUser(user);
        return true;
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    try {
      const user = await api.register(email, password, name);
      setUser(user);
      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = !!user;

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated
  };
};