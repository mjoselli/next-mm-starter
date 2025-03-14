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
      <h1 className='mb-6 text-center text-3xl font-bold'>
        Latest Cryptocurrency Values
      </h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full border-collapse rounded-lg bg-white shadow-md'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border-b px-4 py-2 text-left'>Position</th>
              <th className='border-b px-4 py-2 text-left'>Name</th>
              <th className='border-b px-4 py-2 text-left'>Symbol</th>
              <th className='border-b px-4 py-2 text-left'>Current Price</th>
              <th className='border-b px-4 py-2 text-left'>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto, index) => (
              <tr
                key={crypto.id}
                className={`hover:bg-gray-100 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <td className='border-b px-4 py-2'>
                  {(page - 1) * perPage + index + 1}
                </td>
                <td className='border-b px-4 py-2'>{crypto.name}</td>
                <td className='border-b px-4 py-2'>
                  {crypto.symbol.toUpperCase()}
                </td>
                <td className='border-b px-4 py-2'>
                  ${crypto.current_price.toLocaleString()}
                </td>
                <td className='border-b px-4 py-2'>
                  ${crypto.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='pagination-controls mt-6 flex items-center justify-between'>
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className='rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50'
        >
          Previous
        </button>
        <span className='mx-2'>Page {page}</span>
        <button
          onClick={handleNextPage}
          className='rounded bg-blue-500 px-4 py-2 text-white'
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
