import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">{user?.email}</span>

      <Link to="/profile">Profile</Link>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;
