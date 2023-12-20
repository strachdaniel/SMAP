import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import useSWR from 'swr';
import SearchItemBox from './SearchItemBox';

interface Products {
  products: any[];
  id: number;
  name: string;
  // add more properties as needed
}

interface ApiResponse {
  data: Products;
  // add more properties as needed
}

export default function SearchInput() {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);

  const { data, error, isValidating } = useSWR<ApiResponse>(
    search && `https://dummyjson.com/products/search?q=${search}`,
    axios
  );

  useEffect(() => {
    setActive(search !== '');
  }, [search]);

  return (
    <div className="w-[1000px] relative">
      <input
        placeholder="Vyhledat..."
        className="w-[1000px] border-input_border border-[1px] h-[40px] rounded-[15px] p-5 focus:outline-none"
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      />
      {data && <SearchItemBox books={data.data.products} />}
    </div>
  );
}
