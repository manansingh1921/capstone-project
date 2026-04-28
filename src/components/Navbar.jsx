import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="topbar">

      <div className="logo">
        TASK FORGE
      </div>

      <div className="nav-links">
        <Link to="/">DASHBOARD</Link>
        <Link to="/tasks">TASKS</Link>
      </div>

    </div>
  );
}
