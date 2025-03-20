import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-60 bg-gray-900 text-white p-6 h-screen">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul>
        <li className="mb-4">
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/upload-tasks" className="hover:text-gray-300">
            Upload Tasks
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/agents" className="hover:text-gray-300">
            Agents
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
