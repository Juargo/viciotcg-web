import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationIn from './Pagination';

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20); 
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedStores, setSelectedStores] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://viciotcg-api.onrender.com/get_products')
      .then(response => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los datos: ", error);
        setIsLoading(false);
      })
  }, []);

  const toggleStore = (store) => {
    setSelectedStores(prevSelectedStores =>
      prevSelectedStores.includes(store)
        ? prevSelectedStores.filter(s => s !== store)
        : [...prevSelectedStores, store]
    );
  };

   // Lógica para filtrar productos
   const filteredProducts = products.filter(product => {
    const price = parseInt(product.product_price);
    return (
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!minPrice || price >= parseInt(minPrice)) &&
      (!maxPrice || price <= parseInt(maxPrice)) &&
      (selectedStores.length === 0 || selectedStores.includes(product.store_name))
    );
  });

  const getUniqueStores = () => {
    const storeNames = products.map(product => product.store_name);
    return [...new Set(storeNames)];
  };

  const uniqueStores = getUniqueStores();

    // Obtener productos actuales
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
    // Cambiar página
    const paginate = (event, value)  => setCurrentPage(value);
    
    const formatPrice = (price) => {
      return parseInt(price).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
    };

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <div className="flex bg-[#f6f6f6] text-[#232323]">
      <div className=" text-[.7rem] p-[10px] border border-[#ccc] h-[100vh] overflow-y-auto">
        <h2>Filtros</h2>
        <div className="filter-section">
          <label>Precio desde:</label>
          <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
        </div>
        <div className="filter-section">
          <label>Precio hasta:</label>
          <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
        </div>
        <div className="filter-section">
          <label>Buscar por nombre:</label>
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="filter-section">
          <label>Buscar por tienda:</label>
          {uniqueStores.map(store => (
            <div key={store}>
              <input type="checkbox" id={store} onChange={() => toggleStore(store)} />
              <label htmlFor={store}>{store}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-[3] p-[10px] ">
      <h1 className='p-[10px] bg-white rounded-sm	font-[700] uppercase text-center'>Aumenta tu colección TCG cotizando con nosotros</h1>
      <ul className='p-0 m-0 flex flex-wrap justify-center text-[.7rem]'>
        {currentProducts.map((product, index) => (
            <li key={index} className='w-[200px] m-[10px] p-[10px] bg-white rounded-md overflow-hidden text-center shadow-md'>
              <div>
                <a href={product.product_link} target="_blank" rel="noopener noreferrer" className='flex justify-center'>
                  <img src={product.product_image} alt={product.product_name} width="100" className='max-w-[100%]'/>
                </a>
                <h2 className='font-[700]'>{product.product_name}</h2>
                <p>Tienda: {product.store_name}</p>
                <span>Precio: <strong>{formatPrice(product.product_price)}</strong></span>
                {/* <p>Disponibilidad: {product.product_available_label || 'Información no disponible'}</p> */}
              </div>
            </li>
        ))}
      </ul>
      <PaginationIn 
        productsPerPage={productsPerPage} 
        totalProducts={products.length}
        currentPage={currentPage}
        paginate={paginate}
      />
      </div>
    </div>
  );
}

export default App;
