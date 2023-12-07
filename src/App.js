import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [numImages, setNumImages] = useState(1);
  const [imageData, setImageData] = useState('');

  const handleGenerateImage = async () => {
    try {
      const response = await axios.post('https://pd-aakas-image-gene-d798d0ab2ce34621ab53775282a56c4f.community.saturnenterprise.io/generate_image', {
        prompt: prompt,
        num_images: numImages,
      });
  
      setImageData(response.data.image_data);
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code that falls out of the range of 2xx
        console.error('Error generating image. Server responded with:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error generating image. No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error generating image. Request setup error:', error.message);
      }
    }
  };

  return (
    <div>
      <h1>Flare Stack Image Generator</h1>
      <div>
        <label>Prompt:</label>
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </div>
      <div>
        <label>Number of Images:</label>
        <input type="number" value={numImages} onChange={(e) => setNumImages(e.target.value)} />
      </div>
      <button onClick={handleGenerateImage}>Generate Image</button>
      {imageData && (
        <div>
          <h2>Generated Image</h2>
          <img src={`data:image/jpeg;base64,${imageData}`} alt="Generated" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default App;
