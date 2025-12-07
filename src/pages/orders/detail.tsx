import React, { use } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, useParams } from 'react-router-dom';

import { useOrder } from '@/hooks/orders';
import { Prettylink } from '@/components/link';
import { Table, TableBody, TableHeaderCell, TableHeader, TableCell, TableRow } from '../../components/table';
import { QuickActionsPanel } from '@/components/quick_actions';

export const OrderRoute = (
  <Route path="/orders/:id" element={<PageComponent />} />
);

function PageComponent() { 
    const { id } = useParams<{ id: string }>(); 
    const { data: order, loading, error } = useOrder(id!);    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
        <QuickActionsPanel>
          <Prettylink to={`/orders/${id}/edit`}>Edit</Prettylink>
          <Prettylink to={`/orders/${id}/delete`}>Delete</Prettylink>
        </QuickActionsPanel>
        
        <p className='text-2xl font-bold'>Details for order #{order?.id}</p>
        <div className='flex row justify-between'>
            <div className='flex flex-col gap-2'>
              <p>Status: {order?.status}</p>
              <p>Client: <Prettylink to={`/users/${order?.client.id}`}>{order?.client.first_name} {order?.client.last_name}</Prettylink></p>
              <p>Driver: <Prettylink to={order?.driver ? `/users/${order.driver.id}` : '#'}>{order?.driver ? `${order.driver.first_name} ${order.driver.last_name}` : 'N/A'}</Prettylink></p>
              <p>Finished At: {order!.finished_at ? new Date(order!.finished_at).toLocaleString() : 'N/A'}</p>
              <p>Created At: {new Date(order!.created_at).toLocaleString()}</p>
            </div>
        </div>
    </div>
  );
};