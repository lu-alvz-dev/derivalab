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
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          DerivaLab
        </Link>

        <div className="flex flex-wrap items-center gap-3">
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
              <Link
                to="/practice"
                className="hover:text-blue-600 transition-colors"
              >
                Practice
              </Link>
              <Link to="/profile" className="hover:text-blue-600">
                Profile
              </Link>

              <span className="text-sm text-slate-500">{user.email}</span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
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
