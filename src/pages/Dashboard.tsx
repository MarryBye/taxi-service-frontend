import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route } from 'react-router-dom';

export const DashboardRoute = (
  <Route path="/dashboard" element={<PageComponent />} />
);

function PageComponent() {
  return <div>Dashboard Page</div>;
};