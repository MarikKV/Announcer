import React from 'react'
import { Button } from 'react-bootstrap';

export default function MyAnnounce(props) {

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
                    Reply 
                </Button>
            </td>
        </tr>
    )
}
