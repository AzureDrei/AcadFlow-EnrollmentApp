import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Enrollment System</h2>
      <nav>
        <ul>
          <li className="sidebar-li">
            <Link to="/admin-home">Admin Home</Link>
          </li>

          <li className="sidebar-li">
            <Link to="/student-admin">Add / View Students</Link>
          </li>

          <li className="sidebar-li">
            <Link to="/subject">Add / View Subjects</Link>
          </li>

          <li className="sidebar-li">
            <Link to="/enroll">Enroll Student</Link>
          </li>

          <li className="bottom-item">
            <Link to="/">Back to Home</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
