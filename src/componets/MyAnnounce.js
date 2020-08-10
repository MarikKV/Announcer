import React from 'react'
import { Button } from 'react-bootstrap';

import { db } from '../firebase';

export default function Announce(props) {

    const getDate = (date) => {
        const time = Date(date)
        const MyDate = new Date(time);
        let thisDate = '';
        let thisMonth = '';
        if(MyDate.getDate() < 10){
            thisDate =  `0${MyDate.getDate()}`;
        } else {
            thisDate = MyDate.getDate()
        }
        if((MyDate.getMonth()+1) < 10){
            thisMonth =  `0${(MyDate.getMonth()+1)}`;
        } else {
            thisMonth = (MyDate.getMonth()+1)
        }
        const result = thisDate + '/' + thisMonth + '/' + MyDate.getFullYear();
        return result;
    }

    const deleteAnnounce = (id) => {
        db.collection('Announce').doc(id).delete()
        .then(() => {
            console.log("Annaunce successfully deleted!");
            props.gettodos()
        }).catch( err => {
            console.error("Error removing announce: ", err);
        });    
    }

    return (
        <tr key={props.index}>
            <td>{props.index+1}</td>
            <td>{props.data.title}</td>
            <td className='table_deskribe'>{props.data.describe}</td>
             
            <td><b>{getDate(props.data.date)}</b></td>

            <td>
                <Button 
                    variant='warning' 
                    value={props.data.id} 
                    onClick={e => props.showModal(e.target.value)}
                >
                    Edit
                </Button>
            </td>

            <td>
                <Button 
                    variant='danger' 
                    value={props.data.id} 
                    onClick={e => deleteAnnounce(e.target.value)}
                >
                    Delete
                </Button>
            </td>
        </tr>
    )
}
