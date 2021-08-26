import React, { useEffect, useState } from "react";
import "./Body.css";
import Box from "./Box";
import {db} from '../firebase';



function Body({rowchoose , user}) {

  const [row, setRow] = useState(rowchoose);
  const [enemyTurn, setEnemyturn] = useState(false);
  const [value, setValue] = useState([]);
  const [winner, setWinner] = useState(false);
  const [winnerText , setWinnerText] = useState('');
  
  

  useEffect(() => {
    setRow(rowchoose);
    setWinnerText('');
    
  }, [rowchoose])

  const isDraw = () => {
    
    const draw = value.every((v) => v !== undefined);
    if(draw){
    
    setWinnerText('Draw !!! Please put the row again');
    setValue([]);
    setRow(0);
    setWinner(false);

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;

    db.collection('user').doc(user.name).collection('data').add({
      name: user.name,
      result: "DRAW",
      date: dateTime
    })
    }
  }
  
  useEffect(() => {
    setValue(
      new Array(row * row).fill("value").map((v) => {
        return;
      })
    );
  }, [row]);

  const isWinner = (array) => {
    const winner = [];

    
    for (let i = 0; i < row * row; i += row) {
      winner.push(
        new Array(row).fill("value").map((val, index) => {
          const newIndex = index + i;

          return newIndex;
        })
      );
    }

    for (let i = 0; i < row; i++) {
      const expArray = new Array();
      for (let index = 0; index < row * row; index += row) {
        expArray.push(index + i);
      }
      winner.push(expArray);
    }

    const expArray = new Array();
    for (let index = row - 1; index <= row * row - row; index += row - 1) {
      expArray.push(index);
    }

    const exp2Array = new Array();
    for (let index = 0; index < row * row; index += row + 1) {
      exp2Array.push(index);
    }

    winner.push(expArray);
    winner.push(exp2Array);
    
    
    const wi = winner.some((win , index) => {
      
      const valueWin = win.map((w , i) => {
        return array[w];
      });


      if(valueWin.every((v) => v === valueWin[0] && v)){
        
        return true;
      }else {
        return false;
      }
  
        
  
      })
    
      return wi;
    
  }

  useEffect(() => {
    if (enemyTurn) {
      const enemyPick = checkEnemy();
      

      if (value.every((val) => val == true)) {
        return;
      }

      const newArrayEnemy = value.map((value) => {
        return value;
      });

      newArrayEnemy[enemyPick] = "O";
      setValue(newArrayEnemy);
      const enemyWin = isWinner(newArrayEnemy);
     
      if(enemyWin){
        setWinner(true);
        setValue([])
        return ;
        
        
      }
      
      
      setEnemyturn(false);
      isDraw();
    }
  }, [enemyTurn]);


  useEffect(() => {
    if(winner && enemyTurn){
      setWinnerText('You Lose')

      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date+' '+time;

      db.collection('user').doc(user.name).collection('data').add({
        name: user.name,
        result: "LOSE",
        date: dateTime
      })
      
    }if(winner && !enemyTurn){
      setWinnerText('You Win')

      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date+' '+time;

      db.collection('user').doc(user.name).collection('data').add({
        name: user.name,
        result: "WIN",
        date: dateTime
      })
      
    }


  } ,[winner])
  
  

  const checkEnemy = () => {
    let random = Math.floor(Math.random() * row * row);
    
    if (!value[random]) {
      return random;
    } else {
      if (value.every((val) => val)) {
        return;
      } else {
        return checkEnemy();
      }
    }
  };

  const clickHandler = (index) => {
    const newArray = value.map((value) => {
      return value;
    });

    newArray[index] = "X";

    if (value[index]) {
      return alert("Cannot pick same box");
    }
    setValue(newArray);
    
    
    const defeat = isWinner(newArray);
    
    if(defeat){
      setWinner(true);
      setValue([])
      setRow(0);
      return ;
      
    }
    
    setEnemyturn(true);
    /*const enemyPick = checkEnemy();
        const newArrayEnemy = value.map((value) => {
            return value;
        });
        newArray[enemyPick] = 'O';
        setValue(newArray);*/
    isDraw();
  };

  

  return (
    <div className="body">
      <div
        className="body__container"
        style={!winner ? {
          display: "grid",
          gridTemplateColumns: `repeat(${row}, 1fr)`,
          gridAutoRows: "auto",
        }:{}}
        
      > 
        
        {winnerText && <div className = 'winner'>{winnerText}</div>}
        {!winner && value.map((val, index) => {
          const newIndex = index + 1;

          if (newIndex <= row * (row - 1)) {
            if (newIndex === 1) {
              return (
                <Box
                  run={() => clickHandler(index)}
                  children={value[index]}
                  type={{
                    height: "50px",
                    width: "50px",
                    borderBottom: "2px solid black",
                    borderRight: "2px solid black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "30px",
                  }}
                />
              );
            }
            if (newIndex % row === 0) {
              return (
                <Box
                  run={() => clickHandler(index)}
                  children={value[index]}
                  type={{
                    height: "50px",
                    width: "50px",
                    borderBottom: "2px solid black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "30px",
                  }}
                />
              );
            } else {
              return (
                <Box
                  run={() => clickHandler(index)}
                  children={value[index]}
                  type={{
                    height: "50px",
                    width: "50px",
                    borderBottom: "2px solid black",
                    borderRight: "2px solid black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "30px",
                  }}
                />
              );
            }
          } else {
            if (newIndex % row === 0) {
              return (
                <Box
                  
                  run={() => clickHandler(index)}
                  children={value[index]}
                  type={{
                    height: "50px",
                    width: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "30px",
                  }}
                />
              );
            } else {
              return (
                <Box
                  run={() => clickHandler(index)}
                  children={value[index]}
                  type={{
                    height: "50px",
                    width: "50px",
                    borderRight: "2px solid black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "30px",
                  }}
                />
              );
            }
          }
        })}
      </div>
    </div>
  );
}

export default Body;

/*return (
    <div className = 'firstrow'>
        {Array(row).map((box , index) => (
            <Row/>
        ))}
    </div>
)*/
