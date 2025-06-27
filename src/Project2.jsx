import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from './api';
import defaultPfp from './assets/default-pfp.jpg';
axios.defaults.withCredentials = true;

const Project2 = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [pfpURL, setPfpURL] = useState(defaultPfp);
  const navigate = useNavigate();
  const url = "http://localhost:7000";
  useEffect(() => {
    api.get('/profile').then(res => {
      const response = res.data.payload.data;
      setData(response);
      if(response.pfp) { 
       // console.log("pfp telah siap digunakan")
        setPfpURL(response.pfp);
      }
     // console.log(response)
    }).catch(err => {
      const msg = err.response?.data?.payload?.message || "unknown error";
      setError(msg)
     // console.log(msg)
      let autoNav = setTimeout(() => navigate('/login'), 3000);
    })
  }, [])
  
  const logout = async () => {
    try {
      const response = await axios.post(url + '/users/logout');
      //console.log(response);
      window.location.reload();
    } catch(err){
      //console.log(err)
    }
  }
  
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await api.post('/images/pfp', formData);
      setPfpURL(response.data.imageURL)
    } catch(err){
      console.log(err)
    }
  }
  
  const deleteAccount = async () => {
    try {
      const response = await axios.delete(url + '/users/delete-account');
      //console.log(response)
      window.location.reload();
    } catch(err){
      //console.log(err)
    }
  }
  
  if(error) return (
    <>
     <h2>login needed</h2>
     <p>auto redirect to login page..</p>
    </>
  )
  if(data) return (
    <div className="profile-cnt">
      <img src={pfpURL} onError={() => setPfpURL(defaultPfp)} style={{borderRadius: "50%", width: "150px", height: "150px"}} alt="profile-picture" />
      <form>
        <label id="label-pfp" htmlFor="btn-pfp">Edit</label>
        <input id="btn-pfp" onChange={(e) => handleUpload(e)} type="file" style={{display: "none"}} />
      </form>
       <h2>Hello, {data.username}</h2>
       <div className="btn-profile">
         <button onClick={logout} style={{fontSize: "0.9rem", padding: "0.2rem", width: "100%", fontWeight: "bold"}}>Logout</button>
         <button onClick={deleteAccount} style={{fontSize: "0.9rem", padding: "0.2rem", width: "100%", backgroundColor: "red", fontWeight: "bold"}}>Delete Account</button>
       </div>
    </div>
  )
  return <h2>loading..</h2>
}

export default Project2;