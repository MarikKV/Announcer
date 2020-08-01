import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../styles/Home.scss'

export default function Home() {

    const [redirect, setRedirect] = useState(false);
    const isLogged = useSelector(state => state.isLogged);
    const saveUserInStore = useSelector(state => state.saveUserInStore);
    const allAnnounces = useSelector(state => state.allAnnounces);

    const [numOfAnnounces, setNumOfTusk] = useState(0);

    const goToAnnounce = () => {
        setRedirect(true);
        setTimeout(()=>setRedirect(false), 3000)
    }

    useEffect(() => {
        setNumOfTusk(allAnnounces.length)
    }, [allAnnounces])

    if(redirect) return <Redirect to='Announce'/>
    return (
        <div>
            {!isLogged 
                ? 
                <h1 align='center'>Please sign in</h1>
                : 
                <div className='mainInfoBlock animate__animated animate__bounceInUp'>
                <div className='infoBlock'>
                    <h1>Welcome back {saveUserInStore.name} {saveUserInStore.lastname}!</h1>
                    <h2>
                        We have <span className="lime">{numOfAnnounces}</span> announces for you<br/>
                    </h2>
                    <br/>
                    <Button type='allert' onClick={goToAnnounce}>Show announces</Button>
                </div>
                </div>
                }
        </div>
    )
}
