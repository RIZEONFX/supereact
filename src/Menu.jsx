import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="menu">
      <Link to='/project1'>CONNECTION</Link>
      <Link to='/project2'>PROFILE</Link>
      <Link to='/project3'>CHAT ROOM</Link>
      <Link to='/project4'>ABOUT</Link>
    </nav>
  )
}

export default Menu;