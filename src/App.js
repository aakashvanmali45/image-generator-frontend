import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [numImages, setNumImages] = useState(1);
  const [imageUrl, setImageUrl] = useState('');

  const handleGenerateImage = async () => {
    try {
      const response = await axios.post('http://localhost:8000/generate_image', {
        prompt,
        num_images: numImages,
      });

      setImageUrl(response.data.image_url);
    } catch (error) {
      console.error('Error generating image:', error);
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
      {imageUrl && (
        <div>
          <h2>Generated Image</h2>
          <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default App;
