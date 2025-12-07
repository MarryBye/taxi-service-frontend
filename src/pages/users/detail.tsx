import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Link, useParams } from 'react-router-dom';

import { useUser, useUsers } from '../../hooks/users';

export const UserRoute = (
  <Route path="/users/:id" element={<PageComponent />} />
);

function PageComponent() { 
    const { id } = useParams<{ id: string }>(); 
    const { data: user, loading, error } = useUser(id!);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
        <div className="flex flex-row gap-4 rounded items-center">
            <p className='font-bold'>Quick actions</p>
            <div className='flex flex-row gap-4 max-w-full max-y-full'>
                <Link to={`/users/${id}/orders`} className='hover:underline'>User orders</Link>
                <Link to={`/users/${id}/edit`} className='hover:underline'>Edit</Link>
                <Link to={`/users/${id}/delete`} className='hover:underline'>Delete</Link>
            </div>
        </div>
        <p className='text-2xl font-bold'>Details {user?.first_name} {user?.last_name}</p>
        <div className='flex row justify-between'>
            <div className='flex flex-col gap-2'>
            <p>Name: {user?.first_name} {user?.last_name}</p>
            <p>Email: {user?.email}</p>
            <p>Tel Number: {user?.tel_number}</p>
            <p>Role: {user?.role}</p>
            <p>Created At: {new Date(user!.created_at).toLocaleString()}</p>
            </div>
        </div>
    </div>
  );
};