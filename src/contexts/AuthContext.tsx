import React, { createContext, useContext, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { checkEmailVerification } from 'services/authService';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  isEmailVerified: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const verified = await checkEmailVerification();
        setIsEmailVerified(verified);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        isEmailVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return ctx;
}; 