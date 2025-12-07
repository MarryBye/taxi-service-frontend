import React, { use } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, useParams } from 'react-router-dom';

import { useCar } from '@/hooks/cars';
import { Prettylink } from '@/components/link';
import { Table, TableBody, TableHeaderCell, TableHeader, TableCell, TableRow } from '../../components/table';
import { QuickActionsPanel } from '@/components/quick_actions';

export const CarRoute = (
  <Route path="/cars/:id" element={<PageComponent />} />
);

function PageComponent() { 
    const { id } = useParams<{ id: string }>(); 
    const { data: car, loading, error } = useCar(id!);    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
        <QuickActionsPanel>
          <Prettylink to={`/orders/${id}/edit`}>Edit</Prettylink>
          <Prettylink to={`/orders/${id}/delete`}>Delete</Prettylink>
        </QuickActionsPanel>
        
        <p className='text-2xl font-bold'>Details for car #{car?.id}</p>
        <div className='flex row justify-between'>
            <div className='flex flex-col gap-2'>
                <p>Driver: <Prettylink to={car?.driver ? `/users/${car.driver.id}` : '#'}>{car?.driver ? `${car.driver.first_name} ${car.driver.last_name}` : 'N/A'}</Prettylink></p>
                <p>Mark: {car?.mark}</p>
                <p>Model: {car?.model}</p>
                <p>Full name: {car?.mark} {car?.model}</p>
                <p>License Plate: {car?.car_number}</p>
                <p>Class: {car?.car_class}</p>
                <p>Status: {car?.car_status}</p>
                <p>Created At: {new Date(car!.created_at).toLocaleString()}</p>
            </div>
        </div>
    </div>
  );
};