import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, saveUserInLocalStore } from '../actions';
import { firebase } from '../firebase';
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


export default function LiginWithSocials() {
    const dispatch = useDispatch();

    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult : () => false
        }
    }
    useEffect(() => {
        firebase.auth().onAuthStateChanged( user => {
            if(user){
                const currentUserData = {
                    email: user.email,
                    name: user.displayName,
                    photoUrl: user.photoURL,
                    emailVerified: user.emailVerified,
                    id: user.uid
                }
                dispatch(login())
                dispatch(saveUserInLocalStore(currentUserData))
            }
        })
    }, [dispatch])
    return (
        <div>
            <StyleFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
    )
}
