import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    key: ""
  })
  
  const path = "https://curious-succinct-jewel.glitch.me";
  
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
      const response = await axios.post(path + "/users", formData);
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
      <h2>POST DATA</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="usernamePost">Username</label>
          <input id="usernamePost" name="username" type="text" onChange={handleChange} placeholder="4-12 characters" minLength="4" maxLength="12" required />
          <label htmlFor="passwordPost">Password</label>
          <input id="passwordPost" name="password" type="password" onChange={handleChange} placeholder="At least 6 characters" minLength="6"/>
          <label htmlFor="emailPost">Email</label>
          <input id="emailPost" name="email" type="email" onChange={handleChange} placeholder="yourname@example.com" />
          <label htmlFor="keyPost">Key</label>
          <input id="keyPost" name="key" type="password" onChange={handleChange} placeholder="Validation" minLength="6" required/>
          <button>SUBMIT</button>
        </form>
        { load && ( <p>Sending..</p> )}
        { error && ( <p>Error: {error}</p>)}
    </div>
  )
}

export default Post;
