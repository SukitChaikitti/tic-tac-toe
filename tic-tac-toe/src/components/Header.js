import React from 'react';
import './Header.css';


function Header({submitHandler ,Ref ,buttonShow ,resetHandler , historyHandler ,historyDis ,resetBut}) {
    
    

    return (
        <>
            <div className = 'header'>
                <h1>Tic-Tac-Toe</h1>
                <form>
                    <input ref = {Ref} placeholder = 'Number Row ?'></input>
                    <button disabled = {buttonShow} type = 'submit' onClick = {submitHandler}>Select</button>
                </form>
                <div className = 'header__option'>
                    {buttonShow && <button onClick = {resetHandler} disabled = {!resetBut}>Reset game</button>}
                    <button onClick = {historyHandler} disabled = {historyDis}>history</button>
                    
                </div>
            </div>

            
        </>
    )
}

export default Header
