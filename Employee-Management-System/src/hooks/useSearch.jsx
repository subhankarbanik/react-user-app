import { useMemo } from 'react';

const useSearch = (data, query) => {
  return useMemo(() => {
    if (!query) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [data, query]);
};

export default useSearch;
