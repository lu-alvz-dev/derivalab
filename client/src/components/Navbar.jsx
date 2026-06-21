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
    <nav className="bg-white shadow px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          DerivaLab
        </Link>

        <div className="flex gap-4 items-center">
          {user && (
            <>
              {user.role === "teacher" && (
                <Link to="/teacher/dashboard" className="hover:text-blue-600">
                  Dashboard
                </Link>
              )}

              {user.role === "student" && (
                <Link to="/student/dashboard" className="hover:text-blue-600">
                  Dashboard
                </Link>
              )}

              <Link to="/profile" className="hover:text-blue-600">
                Profile
              </Link>

              <span className="text-gray-500">{user.email}</span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
