import { Link, NavLink } from "react-router-dom";

export function HeaderComponent() {
  return (
    <header className="p-4 bg-emerald-900 text-white flex row justify-between">
      <div className="text-2xl font-bol flex row items-center gap-4">
        <p className="text-lg font-semibold">Taxi Service</p> 
        <p className="text-lg">Be safe!</p>
      </div>
    <div className="text-lg font-regular">
        <NavLink to="/login" className="mr-4 hover:underline">Login</NavLink>
        <NavLink to="/register" className="mr-4 hover:underline">Register</NavLink>
        <NavLink to="/profile" className="mr-4 hover:underline">Profile</NavLink>
    </div>
    </header>
  );
};