import React, { useEffect, useState } from 'react';
import './History.css';
import {db} from '../firebase';

function History({closeHandler , user}) {

    const [data , setData] = useState([])
    
    const dateString = '2021-8-25 16:46:29';
    console.log(Date.parse(dateString));

    useEffect(() => {
        db.collection('user').doc(user.name).collection('data').get().then((res) => {

            const datas = []

            res.forEach((data) => {
                datas.push(data.data());
            })

            const datatoDate = datas.map((data) => {
                return {
                    name : data.name,
                    date: Date.parse(data.date),
                    result: data.result
                };
            })

            datatoDate.sort((prev , cur) => new Date(prev.date) - new Date(cur.date))

            setData(datatoDate);
        })
    }, [])

    console.log(data);

    return (
        <div className = 'history'>
            <div className = 'history__container'>
                <h2>{user.name}</h2>
                <div className = 'history__result'>
                    <div className = 'history__index'>
                        {data.map((d , index) => <p>{index + 1}</p>)}
                    </div>
                    <div className = 'history__date'>
                        {data.map((d , index) => <p>{new Date(d.date).toString().slice(0,24)}</p>)}
                    </div>
                    <div className = 'history__win'>
                        {data.map((d , index) => <p>{d.result}</p>)}
                    </div>
                </div>
                <button onClick = {closeHandler}>Close</button>
            </div>  
        </div>
    )
}

export default History
