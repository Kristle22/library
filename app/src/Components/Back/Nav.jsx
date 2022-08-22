import { Link, NavLink } from 'react-router-dom';
import Message from './Message';

function Nav() {
  return (
    <>
      <nav className='nav'>
        <NavLink
          to='/admin/'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Admin
        </NavLink>
        <NavLink
          to='/admin/books'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Books
        </NavLink>
        <NavLink
          to='/admin/cats'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Categories
        </NavLink>
        <NavLink
          to='/admin/comments'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Comments
        </NavLink>
        <NavLink
          to='/admin/orders'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Orders
        </NavLink>
        <Link
          to='/logout'
          className='logout'>
          Logout
        </Link>
      </nav>
      <Message />
    </>
  );
}

export default Nav;
