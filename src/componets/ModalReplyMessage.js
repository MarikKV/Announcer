import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { db } from '../firebase';

export default function ModalReplyMessage(props) {
    
    const [message, setMessage] = useState('');
    const user = useSelector(state => state.saveUserInStore);

    const addMessage = () => {
        let newMessage = {
            message: message,
            from: user.id,
            name: user.name,
            photo: user.photoUrl,
            to: props.data.userId,
            title: props.data.title,
            annId: props.data.id,
            date: Date.now()
        }
        db.collection("Messages").doc().set(newMessage)
        .then(function() {
            console.log("Message successfully added!");
        })
        .catch(function(error) {
            console.error("Message adding error: ", error);
        });
        setTimeout(() => { setMessage(''); props.handleClose()}, 500);
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
                        value={message}
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
