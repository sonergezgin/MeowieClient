import React, { useContext, useRef } from 'react';
import FileUploadContext from '../../context/FileUploadContext';

const FileUpload = ({ children, onUpload }) => {
  const hiddenFileInput = useRef(null);
  const {uploadImage} = useContext(FileUploadContext);

  const handleClick = () => {
    hiddenFileInput.current.click();
  }

  const handleChange = async (event) =>  {
    const fileUploaded = event.target.files[0];
    uploadImage(fileUploaded).then((response)=> onUpload(response.item2))
    console.log(fileUploaded);
  }

  return (
    <div onClick={handleClick}>
      {children}
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{display: 'none'}} 
        accept="image/*"
      />
    </div>
  );
}

export default FileUpload;
