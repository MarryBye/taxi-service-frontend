import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route } from 'react-router-dom';
import { useUsers } from '@/hooks/users';

export const HomeRoute = (
  <Route path="/" element={<PageComponent />} />
);

function PageComponent() {
  const { data: users, loading, error } = useUsers();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading users.</div>;

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home Page!</p>
      <h2>User List</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>{user.first_name}</li>
        ))}
      </ul>
    </div>
  );
}