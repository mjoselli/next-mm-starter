'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const CryptoValues = () => {
  const [cryptoData, setCryptoData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: perPage,
              page: page,
              sparkline: false
            }
          }
        );
        setCryptoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, [page, perPage]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setPage(1); // Reset to first page when perPage changes
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='crypto-values container mx-auto p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Latest Cryptocurrency Values</h1>
      <table className='min-w-full border border-gray-200 bg-white'>
        <thead>
          <tr>
            <th className='border-b px-4 py-2'>Position</th>
            <th className='border-b px-4 py-2'>Name</th>
            <th className='border-b px-4 py-2'>Symbol</th>
            <th className='border-b px-4 py-2'>Current Price</th>
            <th className='border-b px-4 py-2'>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((crypto, index) => (
            <tr key={crypto.id}>
              <td className='border-b px-4 py-2'>
                {(page - 1) * perPage + index + 1}
              </td>
              <td className='border-b px-4 py-2'>{crypto.name}</td>
              <td className='border-b px-4 py-2'>
                {crypto.symbol.toUpperCase()}
              </td>
              <td className='border-b px-4 py-2'>${crypto.current_price}</td>
              <td className='border-b px-4 py-2'>${crypto.market_cap}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination-controls mt-4 flex items-center justify-between'>
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className='rounded bg-gray-200 px-4 py-2 disabled:opacity-50'
        >
          Previous
        </button>
        <span className='mx-2'>Page {page}</span>
        <button
          onClick={handleNextPage}
          className='rounded bg-gray-200 px-4 py-2'
        >
          Next
        </button>
        <select
          value={perPage}
          onChange={handlePerPageChange}
          className='ml-4 rounded bg-gray-200 px-4 py-2'
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default CryptoValues;
