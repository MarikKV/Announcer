import React, { useState, useEffect } from 'react';
import Announce from './Announce';
import { useSelector, useDispatch } from 'react-redux';
import { getAnnounce } from '../actions';
import { db } from '../firebase';
import { Table } from 'react-bootstrap';
import '../styles/Announce.scss';
import ModalReplyMessage from './ModalReplyMessage';


export default function MyAnnounces() {

    //Modal
    const [message, setMessage] = useState({});

    //modal edit announce state
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Saved user data in store
    const allAnnounces = useSelector(state => state.allAnnounces);
    const user = useSelector(state => state.saveUserInStore);

    const dispatch = useDispatch();

    const gettodos = () => {
        db.collection('Announce')
        .get()
        .then( snapsot => {
            let announce = snapsot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            announce = announce.filter( item => item.userId !== user.id)
            announce.sort((a,b)=>a.date - b.date)
            dispatch(getAnnounce(announce))}  
        )
        .catch( err  => console.log(err) )
    }

    const showModal = (id) => {
        db.collection('Announce').doc(id)
        .get()
        .then(doc => {
            if (doc.exists) {
                let data = doc.data()
                let messageData = {
                    id: id,
                    title: data.title,
                    describe: data.describe,
                    userId: data.userId
                }
                setMessage(messageData)
                handleShow();
            }else{
                console.log("Anoounce not found")
                return null
            }
        })
        .catch(error => {
            console.log(error)
        });
    }

    useEffect(() => {
        db.collection('Announce')
        .get()
        .then( snapsot => {
            let announce = snapsot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            announce = announce.filter( item => item.userId !== user.id)
            announce.sort((a,b)=>a.date - b.date)
            dispatch(getAnnounce(announce))}  
        )
        .catch( err  => console.log(err) )
    }, [dispatch, user.id]);
    
    return (
        <div>
            
            <h1 align='center'>All announces</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Describe</th>
                        <th>Add at</th>
                        <th>Reply</th>
                    </tr>
                </thead>
                <tbody>
                    {allAnnounces.map((item, index) =>
                        <Announce key={index} data={item} index={index} gettodos={gettodos} showModal={showModal}/>
                    )}
                </tbody>
            </Table>
           
            <ModalReplyMessage
                handleClose={handleClose} 
                handleShow={handleShow}
                show={show}
                data={message}
            />
        </div>
    )
}
