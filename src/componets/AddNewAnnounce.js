import React,  { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addNewAnnounce, getAnnounce } from '../actions';
import { Button, Form } from 'react-bootstrap';
import { db } from '../firebase';
import '../styles/AddNewAnnounce.scss'

export default function AddNewAnaunce() {
    
    const saveUserInStore = useSelector(state => state.saveUserInStore);

    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [describe, setDescribe] = useState("");
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(`Title - ${title}. Describe - ${describe}.`)
        const dataAnnounce = {title, describe, userId: saveUserInStore.id}
        dispatch(addNewAnnounce(dataAnnounce))
        //add Announce to firebase
        db.collection("Announce").doc().set({
            userId: saveUserInStore.id,
            title: title,
            describe: describe,
            date: Date.now()
        })
        .then(function() {
            console.log("Announce successfully added!");
            //redrow Announce
            getAnnounces();
            //clear form inputs
            setTitle('');
            setDescribe('');
        })
        .catch(function(error) {
            console.error("Error adding announce: ", error);
        });

    }

    const getAnnounces = () => {
        db.collection('Announce')
        .get()
        .then( snapsot => {
            const announce = snapsot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            console.log(announce)
            dispatch(getAnnounce(announce))}  
        )
        .catch( rej  => console.log(rej) )
    }
    
    return (
        <div>
           <div className="addNewAnnounceForm">
                <Form onSubmit={handleSubmit} className="form">
                    <Form.Label>Title</Form.Label>
                    
                    <Form.Control 
                        type='text' 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Form.Label>Describe</Form.Label>

                    <Form.Control 
                        as="textarea" rows="3"  
                        value={describe} 
                        onChange={e => setDescribe(e.target.value)}
                    />
                    <Button type='submit'>Add new announce</Button>
                </Form>
            </div>
        </div>
    )
}
