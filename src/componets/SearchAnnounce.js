import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';

import { db } from '../firebase';

export default function SearchAnnounce() {
    
    const [searchResult, setSearchResult] = useState([]);
    const searchValue = useSelector(state => state.searchAnnounce);
    const dispatch = useDispatch();
    function findAnnounce(data, search){
        let result = []
        data.map(item=>{
            if(item.title.toLowerCase().includes(search.toLowerCase())){
                result.push(item)
            }
            return true
        })
        setSearchResult(result.slice(0, 3))
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
        .then(snapsot => {
            const announces = snapsot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            findAnnounce(announces, searchValue);
        }).catch( err => {
            console.error("Error removing task: ", err);
        });
    },[searchValue])

    return (
        <div>
            
            {searchResult.length > 0 ? 
                <>
                <h1 align='center'>Announces that contains -  '{searchValue}' </h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Describe</th>
                            <th>Add at</th>
                        </tr>
                    </thead>

                    <tbody>
                    {searchResult.map((item,index) => 
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.title}</td>
                            <td className='table_deskribe'>{item.describe}</td>
                            <td><b>{getDate(item.date)}</b></td>
                        </tr>
                        )}
                    </tbody>
                </Table>
                </>
                : 
                <h2 align='center'> There is none announce that contains -  '{searchValue}'</h2>
            }
            {console.log(searchValue)}
            
        </div>
    )
}
