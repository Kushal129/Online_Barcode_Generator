import React, { useState, useEffect } from 'react';
import Barcode from 'react-barcode';

const App = () => {
  const [barcodeData, setBarcodeData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBarcode, setSelectedBarcode] = useState(null);
  const itemsPerPage = 30;

  const handleGenerate = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleClear = () => {
    setBarcodeData('');
    setCurrentPage(1);
  };

  const handleBarcodeClick = (data) => {
    setSelectedBarcode(data);
  };

  const handleCloseModal = () => {
    setSelectedBarcode(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (selectedBarcode) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedBarcode]);

  const barcodeArray = barcodeData
    .trim()
    .split('\n')
    .filter((data) => data.trim() !== '');

  const totalItems = barcodeArray.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedBarcodes = barcodeArray.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-purple-400 flex items-center justify-center p-2">
      <div className="container max-w-4xl p-2 bg-transparent rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Barcode Generator</h1>

        <form onSubmit={handleGenerate} className="mb-4">
          <div className="mb-4">
            <textarea
              className="form-textarea mt-1 block w-full bg-gray-200 border-black rounded-md p-2"
              rows="10"
              placeholder='Enter Barcode Data (one per line):'
              value={barcodeData}
              onChange={(e) => setBarcodeData(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-center space-x-4">
            <button type="submit" className="relative inline-block px-4 py-2 font-medium group">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
              <span className="relative text-black group-hover:text-white">Generate Barcodes</span>
            </button>
            <button type="button" onClick={handleClear} className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group">
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Clear Data</span>
            </button>
          </div>
        </form>
        {barcodeArray.length > 0 && (
          <>
            <div className="barcode-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {paginatedBarcodes.map((data, index) => (
                <div
                  key={index}
                  className="barcode-box p-4 border rounded bg-gray-50 overflow-hidden cursor-pointer"
                  onClick={() => handleBarcodeClick(data)}
                  tabIndex={0}
                >
                  <p><strong>Barcode Data:</strong> {data}</p>
                  <p><strong>Number:</strong> {(currentPage - 1) * itemsPerPage + index + 1}</p>
                  <div className="barcode-wrapper flex justify-center">
                    <Barcode value={data} height={80} width={2} />
                  </div>
                </div>
              ))}
            </div>
            <nav className="pagination mt-4">
              <ul className="flex flex-wrap justify-center items-center space-x-2 overflow-x-auto">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                    <button
                      className="page-link py-2 px-4 text-sm bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
      </div>

      {selectedBarcode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Barcode Details</h2>
            <div className="flex justify-center mb-4">
              <Barcode value={selectedBarcode} height={150} width={2} />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Developed by Kushal Pipaliya 
// Github :- https://github.com/Kushal129 


export default App;
