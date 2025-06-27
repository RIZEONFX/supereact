import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Update = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    key: ""
  })
  
  const path = "http://localhost:7000";
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }))
  }
  
  const getData = async () => {
    try {
      const response = await axios.get(path + '/users/' + (localStorage.getItem("id") || "ID not found"));
      setUser(response.data.payload.data)
    } catch(err){
      const msg = err.response?.data?.payload?.message || "Unknown error";
      setError(msg)
    }
  }
  
  useEffect(() => {
    if(error){
      console.log("error fetching data: " + error)
    } else if(!user){
      console.log("load data..")
    } else {
      setFormData(prev => ({
        ...prev,
        ["username"]: user.username,
        ["id"]: parseInt(localStorage.getItem("id"))
      }))
      console.log(user)
    } 
  }, [user, error])
  
  useEffect(() => {
    getData();
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("test");
    console.log(formData)
    console.log("succesfull submit")
    setLoad(true);
    try {
      const response = await axios.put(path + "/users", formData);
      console.log(response);
      setError(null);
      navigate('/project1');
    } catch (err) {
      console.log(err);
      const msg = err.response?.data?.payload?.message || "Unknown error";
      console.log(msg)
      setError(msg)
    } finally {
      console.log("finally")
      setLoad(false);
    }
  }
  
  return (
    <div className="form-cnt">
      <h2>UPDATE DATA</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="usernameUpdate">Username</label>
          <input id="usernameUpdate" value={formData.username} name="username" type="text" onChange={handleChange} placeholder="4-12 characters" minLength="4" maxLength="12" required />
          <label htmlFor="passwordUpdate">Password</label>
          <input id="passwordUpdate" value={formData.password} name="password" type="password" onChange={handleChange} placeholder="At least 6 characters" minLength="6"/>
          <label htmlFor="emailUpdate">Email</label>
          <input id="emailUpdate" value={formData.email} name="email" type="email" onChange={handleChange} placeholder="yourname@example.com" />
          <label htmlFor="keyUpdate">Key</label>
          <input id="keyUpdate" value={formData.key} name="key" type="password" onChange={handleChange} placeholder="Validation" minLength="6" required/>
          <button>SUBMIT</button>
        </form>
        { load && ( <p>Sending..</p> )}
        { error && ( <p>Error: {error}</p>)}
    </div>
  )
}

export default Update;