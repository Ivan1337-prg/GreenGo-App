import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  onAuthStateChange, 
  signInWithGoogle, 
  signInWithEmail,
  signUpWithEmail,
  logoutUser,
  getCurrentUser
} from './firebase';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((firebaseUser) => {
      if (firebaseUser) {
        const appUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'UNT Student',
          photoURL: firebaseUser.photoURL || `https://ui-avatars.com/api/?name=${firebaseUser.email?.split('@')[0]}&background=7fb983&color=fff`,
          isDriver: false
        };
        
        setUser(appUser);
        localStorage.setItem('greengo_user', JSON.stringify(appUser));
        
        // Redirect if on login page
        if (window.location.pathname === '/login') {
          navigate('/request-ride');
        }
      } else {
        setUser(null);
        localStorage.removeItem('greengo_user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const loginWithGoogle = async () => {
    try {
      setError('');
      const result = await signInWithGoogle();
      return result.user;
    } catch (error) {
      console.error('Google login error:', error);
      setError('Google login failed. Please try again.');
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      setError('');
      const result = await signInWithEmail(email, password);
      return result.user;
    } catch (error) {
      console.error('Email login error:', error.code);
      
      // User-friendly error messages
      switch (error.code) {
        case 'auth/invalid-credential':
          setError('Invalid email or password.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        default:
          setError('Login failed. Please try again.');
      }
      throw error;
    }
  };

  const registerWithEmail = async (email, password, name) => {
    try {
      setError('');
      const result = await signUpWithEmail(email, password);
      
      // Note: To set display name, you'd need to update profile
      // For now, we'll store name locally
      const userWithName = {
        ...result.user,
        displayName: name
      };
      
      return userWithName;
    } catch (error) {
      console.error('Registration error:', error.code);
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Email already registered. Try logging in instead.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        default:
          setError('Registration failed. Please try again.');
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem('greengo_user');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      setError('Logout failed. Please try again.');
    }
  };

  const value = {
    user,
    loading,
    error,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
    getCurrentUser: () => user,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};