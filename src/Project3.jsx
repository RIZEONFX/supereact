import { Link } from 'react-router-dom';

const Project3 = () => {
  return (
    <>
      <div style={{width: "100vw", height: "80vh", marginTop: "4rem", display: "flex", flexDirection: "column", gap: '10px', alignItems: "center"}}>
        <Link to='/global-chat' className="menu-chat" style={{boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)", padding: "0.5rem 0.8rem", borderRadius: "0.2rem"}}>|---------------- Global Chat ----------------|</Link>
        <p style={{padding: "0.5rem 0.8rem", borderRadius: "0.2rem"}}>Note: Double click to delete message</p>
      </div>
    </>
  )
}

export default Project3;