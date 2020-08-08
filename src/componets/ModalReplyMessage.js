import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../firebase';

export default function ModalReplyMessage(props) {
    
    const [message, setMessage] = useState('');
    const user = useSelector(state => state.user);


    const addMessage = () => {
        db.collection("Messages").doc().set({
            message: message,
            from: user.id,
            to: props.id,
            date: Date.now()
        })
        .then(function() {
            console.log("Message successfully edited!");
        })
        .catch(function(error) {
            console.error("Message adding error: ", error);
        });
    }

    useEffect(()=>{
        
    },[props])

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Editing announce</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Label>Message</Form.Label>
                    <Form.Control 
                        as="textarea" rows="4"  
                        value='' 
                        onChange={e => setMessage(e.target.value)}
                    />
                    
                </Form>
            </Modal.Body>

            <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={addMessage}>
                Send Message
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
