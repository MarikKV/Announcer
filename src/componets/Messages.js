import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../firebase';
import { Table } from 'react-bootstrap';

export default function Messages() {

    const [messages, setMessages] = useState([]);

    const user = useSelector(state => state.saveUserInStore);

    const dispatch = useDispatch();

    useEffect(() => {
        db.collection('Messages')
        .where('to', '==', user.id)
        .get()
        .then( snapsot => {
            let messages = snapsot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            messages.sort((a,b)=>a.date - b.date)
            console.log(messages)
            setMessages(messages)
        })
        .catch( err  => console.log(err) )
    }, [dispatch, user.id]);
    return (
        <div>
            {(messages.length > 0) ? 
            <>
            <h1 align='center'>Ваші повідомлення</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>From</th>
                        <th>Teme</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        messages.map((message,idx) => 
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td><img src={message.photo} alt='foto' width='30px'/> {message.name}</td>
                            <td>{message.title}</td>
                            <td>{message.message}</td>
                        </tr>
                        )
                    }
                </tbody>
            </Table>
            </>
            :
            <h1 align='center'>Повідомлень немає</h1>}

        </div>
    )
}
