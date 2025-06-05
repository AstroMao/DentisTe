import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import pb from '@/lib/pocketbase'; // Adjust path if your pocketbase.ts is elsewhere
import type { RecordModel } from 'pocketbase';

interface AuthContextType {
  user: RecordModel | null;
  token: string | null;
  login: (emailOrUsername: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<RecordModel | null>(pb.authStore.model);
  const [token, setToken] = useState<string | null>(pb.authStore.token);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = pb.authStore.onChange((newToken, newModel) => {
      setToken(newToken);
      setUser(newModel);
      // Persist to local storage or handle as needed
      if (newModel) {
        localStorage.setItem('pocketbase_auth', JSON.stringify(pb.authStore.exportToCookie({ httpOnly: false })));
      } else {
        localStorage.removeItem('pocketbase_auth');
      }
    }, true); // true for immediate call with current state

    // Attempt to load from local storage on initial mount
    // This handles page reloads better
    const storedAuth = localStorage.getItem('pocketbase_auth');
    if (storedAuth && !pb.authStore.isValid) {
        try {
            pb.authStore.loadFromCookie(storedAuth);
        } catch (e) {
            console.error("Failed to load auth from storage", e);
            localStorage.removeItem('pocketbase_auth'); // Clear invalid stored auth
        }
    }
    setUser(pb.authStore.model);
    setToken(pb.authStore.token);
    setIsLoading(false);

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (emailOrUsername: string, pass: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await pb.collection('users').authWithPassword(emailOrUsername, pass);
      // AuthProvider's useEffect will handle setting user and token from pb.authStore
      setIsLoading(false);
      return true;
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.message || 'Failed to login. Please check your credentials.');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    pb.authStore.clear();
    // AuthProvider's useEffect will handle setting user and token to null
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};