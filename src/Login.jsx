import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import api from './api';

const Login = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    console.log("succesfull submit")
    setLoad(true);
    try {
      const response = await api.post('/users/login', formData);
      //console.log(response);
      setError(null);
      navigate('/');
    } catch (err) {
      console.log(err);
      const msg = err.response?.data?.payload?.message || "Unknown error";
      //console.log(msg)
      setError(msg)
    } finally {
      //console.log("finally")
      setLoad(false);
    }
  }
  
  return (
    <>
      <div className="form-cnt">
        <h2>LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" onChange={handleChange} placeholder="4-12 characters" minLength="4" maxLength="12" required />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" onChange={handleChange} placeholder="At least 6 characters" minLength="6"/>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" onChange={handleChange} placeholder="yourname@example.com" />
            <button>SUBMIT</button>
          </form>
          { load && ( <p>Sending..</p> )}
          { error && ( <p>Error: {error}</p>)}
      </div>
         <p style={{fontSize: "0.9rem", marginTop: "1rem"}}>Don't have an account? <Link to='/sign-up'>Sign Up</Link></p>
    </>
  )
}

export default Login;