import React, { useState } from 'react';
import './Box.css';

function Box({type , index , children , run}) {

    

    return (
        <div onClick = {run} style = {type} className = {children === 'X' ? 'blue':'red'}>
            {children}
        </div>
    )
    
}

export default Box
