import React, { useState, useEffect } from 'react';
import AddNewAnnounce from './AddNewAnnounce';
import Announce from './Announce';
import ModalEdditAnnounce from './ModalEdditAnnounce';
import { useSelector, useDispatch } from 'react-redux';
import { getAnnounce } from '../actions';
import { db } from '../firebase';
import { Table } from 'react-bootstrap';
import '../styles/Announce.scss';


export default function MyAnnounces() {

    //Modal
    const [edit_id, setId] = useState('');
    const [edit_title, setTitle] = useState('');
    const [edit_describe, setDescribe] = useState('');

    //modal edit announce state
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Saved user data in store
    const allAnnounces = useSelector(state => state.allAnnounces);

    //togle add announce block
    const [showForm, setShowForm] = useState(false)

    const dispatch = useDispatch();

    const gettodos = () => {
        db.collection('Announce')
        .get()
        .then( snapsot => {
            const announce = snapsot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            announce.sort((a,b)=>a.date - b.date)
            dispatch(getAnnounce(announce))}  
        )
        .catch( err  => console.log(err) )
    }

    const togleAddAnnounce = (data) => {
        setShowForm(!data)
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
                console.log("not found")
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
            const announce = snapsot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            announce.sort((a,b)=>a.date - b.date)
            dispatch(getAnnounce(announce))}  
        )
        .catch( err  => console.log(err) )
    }, [dispatch]);
    
    return (
        <div className='allAnnounces animate__animated'>
            <div className={showForm ? 'allAnnounces_Table_Active' : 'allAnnounces_Table'}>
                <h1 align='center'>All announces</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Describe</th>
                            <th>Add at</th>
                            <th>Edit announce</th>
                            <th>Delete announce</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allAnnounces.map((item, index) => 
                            <Announce key={index} data={item} index={index} gettodos={gettodos} showModal={showModal}/>
                        )}
                    </tbody>
                </Table>
            </div>
           
            <div className={showForm ? 
                'allAnnounces_Add        animate__animated animate__fadeOutRight' : 
                'allAnnounces_Add_Active animate__animated animate__fadeInRight'}>
                <AddNewAnnounce/>
            </div>

            <div className='togleForm' onClick={()=>togleAddAnnounce(showForm)}>{showForm ? '<' : '>'}</div>

            <ModalEdditAnnounce
                handleClose={handleClose} 
                handleShow={handleShow} 
                gettodos={gettodos}
                show={show}
                id={edit_id} 
                title={edit_title}
                describe={edit_describe}
            />
        </div>
    )
}
