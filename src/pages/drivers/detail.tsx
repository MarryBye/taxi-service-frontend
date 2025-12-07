import React, { use } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, useParams } from 'react-router-dom';

import { useDriver } from '@/hooks/drivers';
import { useOrders } from '@/hooks/orders';
import { Prettylink } from '@/components/link';
import { Table, TableBody, TableHeaderCell, TableHeader, TableCell, TableRow } from '../../components/table';
import { QuickActionsPanel } from '@/components/quick_actions';

export const DriverRoute = (
  <Route path="/drivers/:id" element={<PageComponent />} />
);

function PageComponent() { 
    const { id } = useParams<{ id: string }>(); 
    const { data: user, loading, error } = useDriver(id!);
    const { data: orders, loading: ordersLoading, error: ordersError } = useOrders(undefined, id);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
        <QuickActionsPanel>
          <Prettylink to={`/users/${id}/edit`}>Edit</Prettylink>
          <Prettylink to={`/users/${id}/delete`}>Delete</Prettylink>
        </QuickActionsPanel>
        
        <p className='text-2xl font-bold'>Details {user?.first_name} {user?.last_name}</p>
        <div className='flex row justify-between'>
            <div className='flex flex-col gap-2'>
              <p>Name: {user?.first_name} {user?.last_name}</p>
              <p>Email: {user?.email}</p>
              <p>Tel Number: {user?.tel_number}</p>
              <p>Role: {user?.role}</p>
              <p>Car: <Prettylink to={`/cars/${user?.car.id}`}>{user?.car.mark} {user?.car.model}</Prettylink></p>
              <p>Created At: {new Date(user!.created_at).toLocaleString()}</p>
            </div>
        </div>

        <p className='text-2xl font-bold'>Orders history</p>

        {
          ordersLoading ? (
            <div>Loading orders...</div>
          ) : ordersError ? (
            <div>Error loading orders: {ordersError.message}</div>
          ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Order ID</TableHeaderCell>
                <TableHeaderCell>Client</TableHeaderCell>
                <TableHeaderCell>Driver</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Action</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    <Prettylink to={`/users/${order.client.id}`}>
                      {order.client.first_name} {order.client.last_name}
                    </Prettylink>
                  </TableCell>
                  <TableCell>
                    <Prettylink to={order.driver ? `/drivers/${order.driver.id}` : '#'}>
                      {order.driver ? `${order.driver.first_name} ${order.driver.last_name}` : 'N/A'}
                    </Prettylink>
                  </TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Prettylink to={`/orders/${order.id}`}>View</Prettylink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          )
        }
    </div>
  );
};