import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import '../styles/Home.scss'

export default function Home() {
    const isLogged = useSelector(state => state.isLogged);
    const saveUserInStore = useSelector(state => state.saveUserInStore);
    const allUserTasks = useSelector(state => state.allUserTasks);

    const [numOfTasks, setNumOfTusk] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [inProgres, setInProgres] = useState(0);
    const [failed, setFailed] = useState(0);
    
    useEffect(() => {
        setNumOfTusk(allUserTasks.length)
        let [completed, inProgres, failed] = [0, 0, 0];
        allUserTasks.map( task => {
            if(task.status === 'done'){
                completed++
            } if(task.status === 'in progress'){ 
                inProgres++
            } if(task.status === 'failed') {
                failed++
            }
            return true
        })
        setCompleted(completed)
        setInProgres(inProgres)
        setFailed(failed)
    }, [allUserTasks])
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
                        You have {numOfTasks} tasks:<br/>
                        <div className='lime'>{completed} - completed</div> 
                        <div className='yellow'>{inProgres} - in progress</div>
                        <div className='red'>{failed} - failed</div>
                    </h2>
                    <br/>
                    <Button type='allert'>Show my tasks</Button>
                </div>
                </div>
                }
        </div>
    )
}
