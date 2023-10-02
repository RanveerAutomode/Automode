"use client";

import { useSearchParams } from 'next/navigation';

function Dashboard() {
  const searchParams = useSearchParams()
  const pageNumber= searchParams.get('org-id'); 

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Organization ID: {pageNumber}</p>
    </div>
  );
}


export default Dashboard; 