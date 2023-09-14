import { useMemo } from "react";

let pages = [];

export const usePagination = (totalPages) => {
  const pagesCount = useMemo(() => {
    for (let i = 0; i < totalPages; i++) {
      pages.push(i + 1);
      console.log('counted');
    }
  }, [totalPages]);
  
  return pages;
}