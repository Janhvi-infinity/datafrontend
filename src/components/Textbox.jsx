import React, { useState, useEffect } from 'react';

function DualTextbox() {
  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);
  const [marathiText, setMarathiText] = useState('');
  const [englishText, setEnglishText] = useState('');
  const [document, setDocument] = useState('');
  
  useEffect(() => {
    const getDocument = async () => {
      try {
        const response = await fetch('http://localhost:3040/getDocuments');
        const documents = await response.json();
        console.log(documents.documents.length)
        if (documents && documents.documents.length > 0) {
          setDocument(documents);
          setMarathiText(documents.documents[currentDocumentIndex].Marathi);
          setEnglishText(documents.documents[currentDocumentIndex].English);
          console.log(documents.documents[currentDocumentIndex].Marathi);
        } else {
          setMarathiText('nnn');
          setEnglishText('bbbn');
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    getDocument();
  }, [currentDocumentIndex, setDocument]);

  const handleNext = () => {
    setCurrentDocumentIndex(currentDocumentIndex + 1);
  };

  const handleBack = () => {
    setCurrentDocumentIndex(currentDocumentIndex - 1);
  };
  
  const handleEdit = async () => {
    try {
      const documentId = document.documents[currentDocumentIndex].id; // Get document ID
      const response = await fetch(`http://localhost:3040/editDocument/${documentId}`, {
        method: 'PUT',
        
        body: JSON.stringify({ 
          marathiText: marathiText,
          englishText: englishText
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // Handle response as needed
      console.log('Document edited:', response);
    } catch (error) {
      console.error('Error editing document:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
            <label htmlFor="marathi-textbox">Marathi </label>
            <textarea
              type="text"
              id="marathi-textbox"
              defaultValue={marathiText} // Use defaultValue instead of value
              style={{ width: '300px', height: '300px' }}
              readOnly
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label htmlFor="english-textbox">English </label>
            <textarea
              type="text"
              id="english-textbox"
              value={englishText}
              onChange={(e) => setEnglishText(e.target.value)} // Add onChange handler for mutable textarea
              style={{ width: '300px', height: '300px' }}
            />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
          <button onClick={handleBack} disabled={currentDocumentIndex === 0}>
            Back
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
        <button onClick={handleNext} >
Next
</button>
</div>
<div style={{ display: 'flex', flexDirection: 'column' }}>
<button onClick={handleEdit}>save</button>
</div>
</div>
</div>
);
}

export default DualTextbox;
