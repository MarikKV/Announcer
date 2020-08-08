import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import { db } from '../firebase';

export default function ModalEdditAnnounce(props) {
    
    const [edit_title, setTitle] = useState('');
    const [edit_describe, setDescribe] = useState('');

    const saveEditedAnnounce = () => {
        db.collection("Announce").doc(props.id).update({
            title: edit_title,
            describe: edit_describe,
            date: Date.now()
        })
        .then(function() {
            console.log("Announce successfully edited!");
        })
        .catch(function(error) {
            console.error("Error edit announce: ", error);
        });
        setTimeout(() => { props.gettodos(); props.handleClose(); }, 500);
    }

    useEffect(()=>{
        setTitle(props.title)
        setDescribe(props.describe)
    },[props])

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Editing announce</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Label>Title</Form.Label>
                    <Form.Control   
                        value={edit_title} 
                        onChange={e => setTitle(e.target.value)}
                    />

                    <Form.Label>Describe</Form.Label>
                    <Form.Control 
                        as="textarea" rows="4"  
                        value={edit_describe} 
                        onChange={e => setDescribe(e.target.value)}
                    />
                    
                </Form>
            </Modal.Body>

            <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={saveEditedAnnounce}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
