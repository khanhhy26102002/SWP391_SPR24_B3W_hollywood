import React, { useState } from 'react';

const TestImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      console.log(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {selectedImage && <img src={selectedImage} alt="Selected Image" />}
    </div>
  );
}

export default TestImage;