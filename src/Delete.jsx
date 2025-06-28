import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Delete = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);;
  const [formData, setFormData] = useState({
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
  
  useEffect(() => {
    setFormData(prev => ({
        ...prev,
        ["id"]: parseInt(localStorage.getItem("id"))
      }))
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("test");
    console.log(formData)
    console.log("succesfull submit")
    setLoad(true);
    try {
      const response = await axios.delete(`${path}/users/${formData.id}/${formData.key}`);
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
      <h2>DELETE DATA</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="keyUpdate">Key</label>
          <input id="keyUpdate" value={formData.key} name="key" type="password" onChange={handleChange} placeholder="Validation" minLength="6" required/>
          <button>SUBMIT</button>
        </form>
        { load && ( <p>Deleting..</p> )}
        { error && ( <p>Error: {error}</p>)}
    </div>
  )
}
export default Delete;
