import React, { useState, useMemo ,useEffect} from 'react';

const EmployeeTable = () => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editMode, setEditMode] = useState(null);
  useEffect(()=>{
    fetch('https://file.notion.so/f/f/3849cbaa-5010-40df-a27a-f34a3a69c598/ce7879ce-8dee-462f-9a6f-52a31ea104e5/MOCK_DATA.json?table=block&id=5766873f-14ad-4eba-9e97-7c51337fa118&spaceId=3849cbaa-5010-40df-a27a-f34a3a69c598&expirationTimestamp=1724954400000&signature=cj8AAgg-i8tBDBveY3Lbe5QOTrtV9QEWX4x5IX_NhRA&downloadName=MOCK_DATA.json')
    .then(res=>res.json())
    .then(data=>setData(data))
  },[])

  // Sorting employees by salary
  const sortBySalary = () => {
    const sortedData = [...data].sort((a, b) => {
      return sortOrder === 'asc' ? a.salary - b.salary : b.salary - a.salary;
    });
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setData(sortedData);
  };

  // Filtering employees by gender
  const filterByGender = (gender) => {
    setFilter(gender);
  };

  // Custom hook logic to search employees by name
  const searchedData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  // Deleting an employee
  const deleteEmployee = (id) => {
    const updatedData = data.filter(emp => emp.id !== id);
    setData(updatedData);
  };

  // Editing an employee's details
  const editEmployee = (id, key, value) => {
    const updatedData = data.map(emp =>
      emp.id === id ? { ...emp, [key]: value } : emp
    );
    setData(updatedData);
  };

  // Filter and search application
  const filteredData = searchedData.filter(emp => {
    return filter ? emp.gender === filter : true;
  });

  return (
    <div>
      <h1>Employee-System</h1>
      <div>
        <button onClick={sortBySalary}>Sort by Salary ({sortOrder})</button>
        <select onChange={(e) => filterByGender(e.target.value)} value={filter}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>
                {editMode === employee.id ? (
                  <input
                    type="text"
                    value={employee.name}
                    onChange={(e) => editEmployee(employee.id, 'name', e.target.value)}
                  />
                ) : (
                  employee.name
                )}
              </td>
              <td>
                {editMode === employee.id ? (
                  <select
                    value={employee.gender}
                    onChange={(e) => editEmployee(employee.id, 'gender', e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  employee.gender
                )}
              </td>
              <td>
                {editMode === employee.id ? (
                  <input
                    type="number"
                    value={employee.salary}
                    onChange={(e) => editEmployee(employee.id, 'salary', e.target.value)}
                  />
                ) : (
                  employee.salary
                )}
              </td>
              <td>
                {editMode === employee.id ? (
                  <button onClick={() => setEditMode(null)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => setEditMode(employee.id)}>Edit</button>
                    <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
