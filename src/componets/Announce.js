import React, { useState, useEffect } from 'react';
import AddNewAnaunce from './AddNewAnaunce';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from '../actions';
import { db } from '../firebase';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import '../styles/Tasks.scss';


export default function Announce() {
    //modal edit task state
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //for task editing
    const [edit_id, setId] = useState('');
    const [edit_title, setTitle] = useState('');
    const [edit_describe, setDescribe] = useState('');

    //Saved user data in store
    const saveUserInStore = useSelector(state => state.saveUserInStore);
    const allUserTasks = useSelector(state => state.allUserTasks);

    //togle add task block
    const [showForm, setShowForn] = useState(false)

    const dispatch = useDispatch()
    
    const deleteTask = (id) => {
        db.collection('Announce').doc(id).delete()
        .then(() => {
            console.log("Annaunce successfully deleted!");
            gettodos()
        }).catch( err => {
            console.error("Error removing task: ", err);
        });
    }
    const showModal = (id) => {
        db.collection('Announce').doc(id)
        .get()
        .then(doc => {
            if (doc.exists) {
                let data = doc.data()
                setId(id);
                setTitle(data.title);
                setDescribe(data.describe);
                handleShow();
            }else{
                return null
            }
        })
        .catch(error => {
            console.log(error)
        });
    }

    const saveEditedTask = () => {
        db.collection("Announce").doc(edit_id).update({
            title: edit_title,
            describe: edit_describe,
            date: Date.now()
        })
        .then(function() {
            console.log("Task successfully edited!");
        })
        .catch(function(error) {
            console.error("Error edit task: ", error);
        });
        setTimeout(() => { gettodos(); handleClose(); }, 500);
    }

    const gettodos = () => {
        db.collection('Announce')
        .get()
        .then( snapsot => {
            const announce = snapsot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            dispatch(getTasks(announce))}  
        )
        .catch( err  => console.log(err) )
    }

    const togleAddTask = (data) => {
        setShowForn(!data)
    }

    const getDate = (date) => {
        const time = Date(date)
        const MyDate = new Date(time);
        const result = MyDate.getDate() + '/' + (MyDate.getMonth()+1) + '/' + MyDate.getFullYear();
        return result;
    }

    useEffect(() => {
        db.collection('Announce')
        .get()
        .then( snapsot => {
            const announce = snapsot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            dispatch(getTasks(announce))}  
        )
        .catch( err  => console.log(err) )
    }, [dispatch]);
    return (
        <div className='allTasks animate__animated'>
            <div className={showForm ? 'allTasks_Table_Active' : 'allTasks_Table'}>
                <h1 align='center'>All tasks of user - {saveUserInStore.name} {saveUserInStore.lastname}</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Describe</th>
                            <th>Add at</th>
                            <th>Edit task</th>
                            <th>Delete task</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUserTasks.map((item,index) => 
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.title}</td>
                                <td className='table_deskribe'>{item.describe}</td>
                                
                                <td><b>{getDate(item.date)}</b></td>

                                <td><Button variant='warning' value={item.id} onClick={e => showModal(e.target.value)}>Edit</Button></td>
                                <td><Button variant='danger' value={item.id} onClick={e => deleteTask(e.target.value)}>Delete</Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
           
            <div className={showForm ? 'allTasks_Add animate__animated animate__fadeOutRight' : 'allTasks_Add_Active animate__animated animate__fadeInRight'}>
                <AddNewAnaunce/>
            </div>
            <div className='togleForm' onClick={()=>togleAddTask(showForm)}>{showForm ? '<' : '>'}</div>

            {/* Форма для редагування завдання*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Editing task</Modal.Title>
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
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveEditedTask}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
