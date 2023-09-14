import React from 'react';

function Pagination({totalPages, page, changePage}) {
  const pagesArray = totalPages;
  
  return (
    <div className='page__wrapper'>
        {pagesArray.map((p) =>  
          <span
            onClick={() => changePage(p)}
            key={p}
            className={page === p ? 'page__single page__current' : 'page__single'}
          >
            {p}
          </span>
        )}
    </div>
  )
}

export default Pagination