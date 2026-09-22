import { Link, useNavigate } from 'react-router-dom';
import { logout, isLoggedIn } from '../utils/auth';

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  return (
    <nav className="navbar">
      <Link to={loggedIn ? '/dashboard' : '/login'} className="navbar-logo">
        🗺️ TripVault
      </Link>

      {loggedIn && (
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={() => logout(navigate)} className="navbar-logout">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;