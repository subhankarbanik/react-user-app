import { useState , useEffect } from 'react'
import './App.css'
import EmployeeTable from './components/EmployeeTable'

function App() {
  
  const employees1 = [
    { id: 1, name: "John Doe", gender: "Male", salary: 50000 },
    { id: 2, name: "Jane Smith", gender: "Female", salary: 60000 },
    { id: 3, name: "Alice Johnson", gender: "Female", salary: 55000 },
    { id: 4, name: "Bob Brown", gender: "Male", salary: 70000 },
  ];
  


   return <>
       <div className='App'>
          <EmployeeTable/>
       </div>
       
    </>
  
}

export default App
