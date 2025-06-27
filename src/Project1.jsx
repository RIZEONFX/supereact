import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Project1 = () => {
  const [users, setUsers] = useState(null)
  const [error, setError] = useState(null);
  const [method, setMethod] = useState("mtdGet");
  const navigate = useNavigate();
  const path = 'http://localhost:7000';
  
  const getData = async () => {
    setMethod("mtdGet")
    try {
      const response = await axios.get(path + '/users');
      setUsers(response.data.payload.data)
    } catch(err){
      setError(err)
    }
  }
  
  const redir = (id) => {
    localStorage.setItem("id", id);
    if(method == "mtdUpdate"){
      navigate('/project1/update');
    } else {
      navigate('/project1/delete');
    }
  }
  
  useEffect(() => {
    if(error){
      console.log("error fetching data: " + error)
    } else if(!users){
      console.log("load data..")
    } else {
      console.log(users)
    } 
  }, [users, error])
  
  useEffect(() => {
    localStorage.clear();
    getData();
  }, [])
  
  return (
    <div className="table-container">
      <div className="btn-group">
        {(error || users) && (
          <button onClick={getData}>GET DATA</button>
        )}
        { !error && users && (
          <>
           <button onClick={() => navigate('/project1/post')}>POST DATA</button>
            { users.length > 0 && (
             <>
              <button onClick={() => setMethod("mtdUpdate")}>UPDATE DATA</button>
              <button onClick={() => setMethod("mtdDelete")}>DELETE DATA</button>
             </>
            )}
          </>
        )}
      </div>
      { error ? ( <p>Error fetching data: {error.message}</p> ) : 
       !users ? ( <p>load data..</p>) :
        users.length == 0 ? ( <p>No data Available</p> ) : 
        (
        <div className="table-wrapper">
          <table>
             <colgroup>
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>id</th>
                <th>username</th>
                <th>password</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              { users.map(user =>
                (
                  <tr key={user.id}>
                    <td className={method} onClick={() => method !== "mtdGet" && redir(user.id)}>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>{user.email}</td>
                  </tr>
              ))}
            </tbody>
          </table>
         </div>
        )
      }
    </div>
  )
}

export default Project1;