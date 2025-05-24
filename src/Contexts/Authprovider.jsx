import React, {createContext, useEffect, useState} from 'react';
import {
    getAuth,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged} from 'firebase/auth'
import {app} from '../firebase.js';


export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const Authprovider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [saveUser, setSaveUser] = useState(null)

    const googleAuth = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const signOutUser = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser)
            setSaveUser(currentUser)
            setLoading(false);
        })
        return () => unsubscribe()
    }, []);

    const userInfo = {
        googleAuth,
        saveUser,
        signOutUser,
        loading,
        setLoading
    }
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default Authprovider;