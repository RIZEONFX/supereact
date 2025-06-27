import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import defaultPfp from './assets/default-pfp.jpg';
import Message from './components/Message';
import { io } from 'socket.io-client';
import api from './api';

const socket = io('http://localhost:7000');

const GlobalChat = () => {
  const [pfp, setPfp] = useState(defaultPfp);
  const [input, setInput] = useState("");
  const [state, setState] = useState(false);
  const [users, setUsers] = useState(null);
  const [datas, setDatas] = useState([]);
  const [sender, setSender] = useState(null);
  const [error, setError] = useState(null);
  const [messageID, setMessageID] = useState(null);
  const deleter = useRef(null);
  const navigate = useNavigate();
  
  function dateFormat(date){
      //console.log("1 " + date)
      const dateObj = new Date(date)
     // console.log("2 " + dateObj)
      const hour = dateObj.getHours();
      const minute = dateObj.getMinutes();
      return `${String(hour).padStart(2, "0")}.${String(minute).padStart(2, "0")}`;
    }
    
    function dataFormat(dataIn){
      const formatedData = dataIn.map(data => {
       data.spesificTime = new Date(data.time).toISOString().split('T')[0];
       data.time = dateFormat(data.time);
       if(!(data.pfp)) data.pfp = defaultPfp;
        if(data.senderId === sender.id){
          data.isReceiver = false;
        } else {
          data.isReceiver = true;
        }
        return data;
      })
      return formatedData;
    }
  
  async function getPrevMessages(){
    console.log("getting prev data")
    try {
      const response = await api.get('/users/messages')
      const prevDatas = response.data.payload.data;
      const formatDatas = dataFormat(prevDatas);
      console.log(formatDatas)
      setDatas(formatDatas)
    } catch(err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
     sender && getPrevMessages();
  }, [sender])
  
  
  
  useEffect(() => {
    api.get('/profile').then(res => {
       const response = res.data.payload.data;
       setSender(response)
       if(response.pfp) setPfp(response.pfp)
    }).catch(err => { 
      setError(err)
      setTimeout(() => navigate('/login'), 3000);
    })
    
  }, [])
  
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      const formatDatas = dataFormat([data])
      console.log(formatDatas[0])
      setDatas((prev) => [ ...prev, formatDatas[0]])
    }
    const handleDeleteMessage = () => {
      console.log("triggered")
      getPrevMessages();
    }
    socket.on('receive-message', handleReceiveMessage);
    socket.on('update-message', handleDeleteMessage);
    return () => { 
      socket.off('receive-message', handleReceiveMessage);
      socket.off('update-message', handleDeleteMessage);
    }
  }, [sender])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
 //   console.log(sender)
    if(input.trim()){
      /*setDatas(prev => [ ...prev, {
        sender: sender.username,
        pfp: pfp,
        text: input,
        time: dateFormat()
      }])*/
      socket.emit('send-message', {
        senderId: sender.id,
        text: input.trim(),
        time: date
      })
      setInput("");
    }
  }
  
  const deleteMessage = (id, isReceiver) => {
    if(!isReceiver){
      setMessageID(id)
      deleter.current.style.display = "block";
    }
  }
  
  const confirmDeleter = async () => {
    console.log('confirm delete ' + messageID)
    try {
      const response = await api.patch(`/users/messages/${messageID}`);
      console.log(response)
    } catch(err) {
      console.log(err)
    } finally {
      deleter.current.style.display = "none";
    }
  }
  
  const hideDeleter = () => {
    deleter.current.style.display = "none";
  }
  
  if(error) return (
    <>
     <h2>login needed</h2>
     <p>auto redirect to login page..</p>
    </>
  )
  
  return (
    <div className="cnt-message">   
     <div className="top-bar">
        <h1 style={{fontSize: "1.5rem"}}>Global Chat</h1>
        <nav>
          <Link to='/project3' className="topBtn">Back</Link>
        </nav>
      </div>
      <div className="message-list">
        { datas.map((data, i) => (
         <React.Fragment key={i}>
            { i == 0 ?
             ( <p style={{marginTop: "1rem"}}>{data.spesificTime}</p> ) : 
              datas[i - 1].spesificTime !== data.spesificTime ?
                ( <p>{data.spesificTime}</p> )
                : null
            }
           <Message field={data} action={deleteMessage} />
         </React.Fragment>
        ))}
      </div>
      <div className="deleter" ref={deleter}>
        <p style={{fontWeight: "600"}}>Delete this message?</p>
        <div className="icon-wrapper">
         <FontAwesomeIcon icon={faXmark} onClick={hideDeleter}/>
         <FontAwesomeIcon icon={faCheck} onClick={confirmDeleter} />
        </div>
      </div>
      <form className="form-message" onSubmit={handleSubmit}>
        <textarea className="input-message" onChange={e => setInput(e.target.value)} value={input} placeholder="type here.." rows="1"></textarea>
        <button className="btn-send-message" type="submit">SEND</button>
      </form>
    </div>
  )
}

export default GlobalChat;