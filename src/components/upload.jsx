import React from 'react';

const UploadButton = () => {
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    console.log(file); // Replace with your desired file handling logic
  };

  const handleUploadClick = async () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    // Create a FormData object to store the file data
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3040/api/upload', {
        method: 'POST',
        body: formData,
        headers: {
          // Add any necessary headers, such as authorization token, etc.
        },
      });

      if (response.ok) {
        window.alert('File uploaded successfully'); // Display success message
      } else {
        window.alert('Failed to upload file'); // Display error message
      }
    } catch (error) {
      console.error(error); // Replace with your desired error handling logic
    }
  };

  return (
    <div>
      <input type="file" id="fileInput" onChange={handleFileSelect} />
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
};

export default UploadButton;
