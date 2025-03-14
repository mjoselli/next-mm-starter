import CryptoValues from '@/components/crypto-values';

const CryptoValuesPage = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto p-4'>
        <div className='rounded-lg bg-white p-6 shadow-md'>
          <h1 className='mb-4 text-center text-2xl font-bold'>Crypto Values</h1>
          <CryptoValues />
        </div>
      </div>
    </div>
  );
};

export default CryptoValuesPage;
