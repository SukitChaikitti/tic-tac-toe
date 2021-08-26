import React , {useRef , useState} from 'react';
import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import History from './components/History';
import {auth , provider} from './firebase';
import Login from './components/Login';

function App() {

  const [isUser , setIsUser] = useState(false);
  const [user , setUser] = useState({});
  const [row , setRow] = useState(0);
  const rowRef = useRef();
  const [start , setStart] = useState(false)
  const [show , setShow] = useState(false)
  const [history , setHistory] = useState(false);

  console.log(user);

  const signIn = () => {
    auth.signInWithPopup(provider)
    .then((result) => {
        let user = result.user
      
        setUser({
          name: user.displayName,
          email: user.email,
        })

        setIsUser(true)
    })
  }

  const submitHandler = (e) => {
      e.preventDefault();
      if(Number.isInteger(parseInt(rowRef.current.value)) === false || parseInt(rowRef.current.value) <= 2 ){
        rowRef.current.value = '';
        return alert('Put only number and more than 2 also not float')
      }
      setRow(parseInt(rowRef.current.value));
      setStart(true);
      setShow(true);
      setHistory(false);
      rowRef.current.value = '';
  }

  const resetGame = (e) => {
    if(start){
    e.preventDefault();

    setRow(0);
    setStart(false);
    setShow(false);}
    else{

    };
  };

  const historyShow = () => {
    setHistory(true);
    
  }

  const closeHistory = () => {
    setStart(false);
    setShow(false);
    setHistory(false);
  }

  console.log(row);

  return (
    <div className="app">
      {isUser ? <>
      <Header resetBut = {start} historyDis = {history || start} historyHandler = {historyShow} Ref = {rowRef} buttonShow = {show || history} resetHandler = {resetGame} submitHandler = {submitHandler}/>
      {!start && !history && <div className = 'start'>Please Select row</div>}
      {start && <Body rowchoose = {row} user = {user}/>}
      {history && <History closeHandler = {closeHistory} user = {user}/>}
      </>:(<Login loginHandler = {signIn}/>)
      }
    </div>
  );
}


export default App;
