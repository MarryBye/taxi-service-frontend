import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route } from 'react-router-dom';

import { useCars } from '@/hooks/cars';

import { Table, TableBody, TableHeaderCell, TableHeader, TableCell, TableRow } from '../../components/table';
import { Prettylink } from '@/components/link';
import { QuickActionsPanel } from '@/components/quick_actions';

export const CarsRoute = (
  <Route path="/cars" element={<PageComponent />} />
);

function PageComponent() {
    const { data: cars, loading, error } = useCars();

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
    <div className="flex flex-col gap-4 p-4 w-full overflow-auto">
      <p className='text-2xl font-bold'>Cars List</p>
      <QuickActionsPanel>
        <Prettylink to={`/cars/create`}>Create</Prettylink>
      </QuickActionsPanel>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <input type="text" placeholder="Search by ID" id="search-id" onChange={handleSearch}/>
            </TableHeaderCell>
            <TableHeaderCell>
                <input type="text" placeholder="Search by mark" id="search-mark" onChange={handleSearch}/>
            </TableHeaderCell>
            <TableHeaderCell>
                <input type="text" placeholder="Search by model" id="search-model" onChange={handleSearch}/>
            </TableHeaderCell>
            <TableHeaderCell>
                <input type="text" placeholder="Search by class" id="search-class" onChange={handleSearch}/>
            </TableHeaderCell>
            <TableHeaderCell>
                <input type="text" placeholder="Search by status" id="search-status" onChange={handleSearch}/>
            </TableHeaderCell>
            <TableHeaderCell>
                <input type="text" placeholder="Search by driver" id="search-driver" onChange={handleSearch}/>
            </TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>          
          </TableRow>
      </TableHeader >
        <TableBody>
          {
            cars
              .map(car => (
                <TableRow key={car.id}>
                  <TableCell>{car.id}</TableCell>
                  <TableCell>{car.mark}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.car_class}</TableCell>
                  <TableCell>{car.car_status}</TableCell>
                  <TableCell>{car.driver ? <Prettylink to={`/drivers/${car.driver.id}`}>{`${car.driver.first_name} ${car.driver.last_name}`}</Prettylink> : 'No driver'}</TableCell>
                  <TableCell>
                    <Prettylink to={`/cars/${car.id}`}>View</Prettylink>
                  </TableCell>
                </TableRow>
              ))
            }
        </TableBody>
      </Table>
    </div>
  );
};