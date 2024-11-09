import React, { useState } from 'react';
import Canvas from './components/Canvas';


function App() {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div>
        <h1>Image Annotation Tool</h1>
        <div className='upload'>
          <input type="file" onChange={handleImageUpload} /></div>
      </div>
      {imageSrc && <div className='img-container'> <Canvas imageSrc={imageSrc} /> </div>}
    </div>
  );
}

export default App;
