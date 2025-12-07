import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route } from 'react-router-dom';

import { useOrders } from '@/hooks/orders';

import { Table, TableBody, TableHeaderCell, TableHeader, TableCell, TableRow } from '../../components/table';
import { Prettylink } from '@/components/link';
import { QuickActionsPanel } from '@/components/quick_actions';

export const DriversRoute = (
  <Route path="/drivers" element={<PageComponent />} />
);

function PageComponent() {
    const { data: orders, loading, error } = useOrders();

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
      <p className='text-2xl font-bold'>Drivers List</p>
      <QuickActionsPanel>
        <Prettylink to={`/drivers/create`}>Create</Prettylink>
      </QuickActionsPanel>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <input type="text" placeholder="Search by ID" id="search-id" onChange={handleSearch}/>
            </TableHeaderCell>
            <TableHeaderCell>
                <input type="text" placeholder="Search by status" id="search-status" onChange={handleSearch}/>
            </TableHeaderCell>
            <TableHeaderCell>
                <input type="text" placeholder="Search by client" id="search-client" onChange={handleSearch}/>
            </TableHeaderCell>
            <TableHeaderCell>
                <input type="text" placeholder="Search by driver" id="search-driver" onChange={handleSearch}/>
            </TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>          
          </TableRow>
      </TableHeader >
        <TableBody>
          {
            orders
              .map(order => (
                <TableRow key={order.id}>
                    <TableCell>
                        <Prettylink to={`/orders/${order.id}`}>{order.id}</Prettylink>
                    </TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                        <Prettylink to={`/users/${order.client.id}`}>
                            {order.client.first_name} {order.client.last_name}
                        </Prettylink>
                    </TableCell>
                    <TableCell>
                        {order.driver ? (
                            <Prettylink to={`/drivers/${order.driver.id}`}> 
                                {order.driver.first_name} {order.driver.last_name}
                            </Prettylink>
                        ) : 'N/A'}
                    </TableCell>
                    <TableCell>
                        <Prettylink to={`/orders/${order.id}`}>View</Prettylink>
                    </TableCell>    
                </TableRow>
              ))
            }
        </TableBody>
      </Table>
    </div>
  );
};