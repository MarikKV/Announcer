import React from 'react';
import { useSelector } from 'react-redux';
import LoginWithSocials from './LoginWithSocials';
import '../styles/SignIn.scss'

export default function SignIn() {
    const isLogged = useSelector(state => state.isLogged);
    const saveUserInStore = useSelector(state => state.saveUserInStore)
    return (
        <div>
            {!isLogged ? (
                <>
                    <LoginWithSocials />
                </>
            ) : <h1 align="center">You already logged as {saveUserInStore.name} {saveUserInStore.lastname}</h1>}
        </div>
    )
}
