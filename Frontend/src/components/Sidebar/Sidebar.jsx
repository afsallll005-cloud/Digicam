import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">Admin Panel</h2>

      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/listproducts">Products</Link></li>
        <li><Link to="">Orders</Link></li>
        <li><Link to="">Chats</Link></li>
        <li><Link to="">Users</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;