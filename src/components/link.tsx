import { Link, NavLink } from "react-router-dom";
import React from "react";

export function Prettylink({ to, children }: { to: string; children: React.ReactNode }): React.JSX.Element {
  return (
    <Link to={to} className="text-blue-500 hover:underline">
        {children}
    </Link>
  );
};