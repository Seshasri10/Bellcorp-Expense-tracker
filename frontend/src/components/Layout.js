import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        <div>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/explorer">Explorer</Link>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="container">
        {children}
      </div>
    </>
  );
};

export default Layout;
