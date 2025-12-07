import { Link, NavLink } from "react-router-dom";

export function NavPanel() {
  return (
    <nav className="p-4 bg-blue-600 text-white flex-col min-h-dvh">
        <div className="text-lg font-regular flex flex-col">
            <NavLink to="/" className="mr-4 hover:underline">Home</NavLink>
            <NavLink to="/dashboard" className="mr-4 hover:underline">Dashboard</NavLink>
            <NavLink to="/users" className="hover:underline">Users</NavLink>
        </div>
    </nav>
  );
};