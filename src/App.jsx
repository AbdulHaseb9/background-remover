import React, { useState } from 'react';
import './App.css'

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [downloadLink, setDownloadLink] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const removeBackground = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage('Please select a JPG image.');
      return;
    }

    const formData = new FormData();
    formData.append('image_file', file);

    try {
      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': 'D5wsxUuSCUxY4o2VAxLRZgxe', // Replace YOUR_API_KEY with your actual remove.bg API key
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Background removal failed');
      }

      const blob = await response.blob();
      console.log(blob);
      const url = URL.createObjectURL(blob);
      setDownloadLink(url);
      setMessage('');
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-2">
      <form onSubmit={removeBackground} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl text-center font-bold mb-4">Remove Background</h1>
        <input
          type="file"
          accept=".jpg, .jpeg"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-indigo-500 mb-4"
        />
        {downloadLink && (
          <div className='flex justify-center'>
            <img src={downloadLink} alt="Preview" className="mb-4 max-w-40 h-auto" />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Remove Background
        </button>
        <div id="output" className="mt-4">
          {message && <p className="text-red-500">{message}</p>}
          {downloadLink && (
            <div className='flex justify-center text-center'>
              <a
                href={downloadLink}
                download="image.png"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Download PNG
              </a>
            </div>
          )}
        </div>
      </form>
    </div>
  );

}

export default App
