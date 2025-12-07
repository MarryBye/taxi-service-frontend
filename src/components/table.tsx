import { Link, NavLink } from "react-router-dom";
import React from "react";

export function Table({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <table className="min-w-full table-auto border-collapse border border-gray-200">
        {children}
    </table>
  );
};

export function TableHeader({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <thead className="bg-gray-100">
        {children}
    </thead>
  );
}

export function TableHeaderCell({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <th className="border border-gray-300 px-4 py-2 text-left">
        {children}
    </th>
  );
}

export function TableRow({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <tr className="hover:bg-gray-50">
        {children}
    </tr>
  );
}

export function TableCell({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <td className="border border-gray-300 px-4 py-2">
        {children}
    </td>
  );
}

export function TableBody({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <tbody>
        {children}
    </tbody>
  );
}