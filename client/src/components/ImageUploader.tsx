import React, { useState } from 'react';
import axios from 'axios';

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;  // Define a callback function prop type
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:3000/api/images/upload-image", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onImageUpload(response.data.url);  // Execute callback with the image URL
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button type="submit">Upload Image</button>
    </form>
  );
}

export default ImageUploader;
