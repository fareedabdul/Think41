// src/components/DepartmentList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/departments')
      .then(res => setDepartments(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Departments</h2>
      <ul>
        {departments.map(dep => (
          <li key={dep.id}>
            <Link to={`/departments/${dep.id}`}>
              {dep.name} ({dep.productCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;
