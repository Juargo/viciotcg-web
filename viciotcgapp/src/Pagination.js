// Pagination.js
import React from 'react';
import Pagination from '@mui/material/Pagination';

const PaginationIn = ({ productsPerPage, totalProducts,currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex justify-center'>
      {/* <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul> */}
      <Pagination count={pageNumbers.length} page={currentPage} onChange={paginate} color="primary"  shape="rounded"/>
    </div>
  );
};

export default PaginationIn;
