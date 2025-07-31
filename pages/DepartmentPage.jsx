// src/pages/DepartmentPage.jsx
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DepartmentPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [department, setDepartment] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartmentProducts = async () => {
      try {
        const depRes = await axios.get(`http://localhost:3000/api/departments/${id}`);
        const prodRes = await axios.get(`http://localhost:3000/api/departments/${id}/products`);
        setDepartment(depRes.data);
        setProducts(prodRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartmentProducts();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!products.length) return <p>No products found in {department.name}</p>;

  return (
    <div>
      <h1>{department.name} ({products.length} items)</h1>
      <Link to="/">← Back to All Products</Link>
      <div className="products">
        {products.map(prod => (
          <div key={prod.id}>
            <h3>{prod.name}</h3>
            <p>{prod.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentPage;
