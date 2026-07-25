import { createContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '../utils/firebase.config';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Email/Password Registration
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Email/Password Login
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const googleSignIn = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Update Profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL
    });
  };

  // Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Fetch JWT Token from backend
        const userInfo = { email: currentUser.email, name: currentUser.displayName };
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/users/jwt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userInfo)
        })
          .then(res => res.json())
          .then(data => {
            if (data.token) {
              localStorage.setItem('access-token', data.token);
            }
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        // Remove token if logged out
        localStorage.removeItem('access-token');
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    googleSignIn,
    logOut,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
