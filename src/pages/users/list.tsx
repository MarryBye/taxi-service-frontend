import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Link } from 'react-router-dom';

import { useUsers } from '../../hooks/users';

export const UsersRoute = (
  <Route path="/users" element={<PageComponent />} />
);

function PageComponent() {
    const { data: users, loading, error } = useUsers();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    function handleSearch() {
        const input = document.getElementById('search-id') as HTMLInputElement;
        const filter = input.value.toUpperCase();
        const table = document.querySelector('table');
        const tr = table?.getElementsByTagName('tr');

        if (tr) {
            for (let i = 1; i < tr.length; i++) {
                const td = tr[i].getElementsByTagName('td')[0];
                if (td) {
                    const txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = '';
                    } else {
                        tr[i].style.display = 'none';
                    }
                }
            }
        }
    }

  return (
    <div className="overflow-x-scroll">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">
              <input type='text' placeholder='Search by ID' id="search-id" onChange={handleSearch}></input>
            </th>
            <th className="border border-gray-300 px-4 py-2">
              <input type='text' placeholder='Search by Name' id="search-name" onChange={handleSearch}></input>
            </th>
            <th>
              <input type='text' placeholder='Search by Email' id="search-email" onChange={handleSearch}></input>
            </th>
            <th className="border border-gray-300 px-4 py-2">
              <input type='text' placeholder='Search by Tel Number' id="search-tel" onChange={handleSearch}></input>
            </th>
            <th className="border border-gray-300 px-4 py-2">
              <input type='text' placeholder='Search by Role' id="search-role" onChange={handleSearch}></input>
            </th>
          </tr>
        </thead>
        <tbody>
          {users
            .map(user => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link 
                  to={`/users/${user.id}`}
                  className="text-blue-500 hover:underline"
                  >
                    {user.first_name + " " + user.last_name}
                  </Link>
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.tel_number}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};