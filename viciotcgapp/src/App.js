import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Obtener datos del endpoint
    axios.get('http://127.0.0.1:5000/get_products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los datos: ", error);
      })
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <div>
              <a href={product.product_link} target="_blank" rel="noopener noreferrer">
                <img src={product.product_image} alt={product.product_name} width="100" />
              </a>
              <h2>{product.product_name}</h2>
              <p>Tienda: {product.store_name}</p>
              <p>Precio: ${product.product_price}</p>
              <p>Disponibilidad: {product.product_available_label || 'Información no disponible'}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
