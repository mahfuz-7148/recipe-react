import React, { createContext, useEffect, useState } from 'react';
import {
    getAuth,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { app } from '../firebase.js';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Authprovider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [saveUser, setSaveUser] = useState(null);

    const createUser = async (email, password, { displayName, photoURL }) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Update user profile with displayName and photoURL
            await updateProfile(userCredential.user, {
                displayName: displayName || 'Anonymous',
                photoURL: photoURL || '' // Default photoURL
            });
            // Force refresh user data to ensure profile is updated
            await userCredential.user.reload();
            const updatedUser = auth.currentUser;
            setSaveUser(updatedUser);
            console.log('User created:', {
                uid: updatedUser.uid,
                displayName: updatedUser.displayName,
                photoURL: updatedUser.photoURL,
                email: updatedUser.email
            });
            return userCredential;
        } catch (error) {
            console.error('Create user error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const loginUser = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await userCredential.user.reload();
            setSaveUser(auth.currentUser);
            console.log('User logged in:', {
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL,
                email: auth.currentUser.email
            });
            return userCredential;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const googleAuth = async () => {
        try {
            googleProvider.addScope('profile email'); // Ensure profile data is requested
            const userCredential = await signInWithPopup(auth, googleProvider);
            await userCredential.user.reload();
            setSaveUser(auth.currentUser);
            console.log('Google auth user:', {
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL,
                email: auth.currentUser.email
            });
            return userCredential;
        } catch (error) {
            console.error('Google auth error:', error);
            throw error;
        }
    };

    const signOutUser = () => {
        return signOut(auth).finally(() => setLoading(false));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                await currentUser.reload(); // Ensure latest profile data
                setSaveUser({ ...currentUser });
                console.log('Auth state changed:', {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    email: currentUser.email
                });
            } else {
                setSaveUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const userInfo = {
        googleAuth,
        saveUser,
        signOutUser,
        loading,
        setLoading,
        createUser,
        loginUser
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;