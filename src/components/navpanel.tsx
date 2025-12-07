import { Link, NavLink } from "react-router-dom";

export function NavPanel() {
  return (
    <nav className="p-4 bg-emerald-900 text-white flex-col min-h-dvh">
        <div className="text-lg font-regular flex flex-col">
            <NavLink to="/" className="mr-4 hover:underline">Home</NavLink>
            <NavLink to="/dashboard" className="mr-4 hover:underline">Dashboard</NavLink>
            <NavLink to="/users" className="hover:underline">Users</NavLink>
            <NavLink to="/drivers" className="hover:underline">Drivers</NavLink>
            <NavLink to="/orders" className="hover:underline">Orders</NavLink>
            <NavLink to="/cars" className="hover:underline">Cars</NavLink>
            <NavLink to="/maintenances" className="hover:underline">Maintenances</NavLink>
        </div>
    </nav>
  );
};