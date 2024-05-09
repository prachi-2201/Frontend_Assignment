import React from 'react';
import Table from './Table';

const data = [
  { name: 'John Doe', age: 30, email: 'john@example.com' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  { name: 'Bob Johnson', age: 35, email: 'bob@example.com' },
  // Add more sample data as needed
];

function App() {
  return (
    <div className="App">
      <h1>Table with Search</h1>
      <Table data={data} />
    </div>
  );
}

export default App;
