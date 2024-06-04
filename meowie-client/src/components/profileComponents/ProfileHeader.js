import React, { useState, useEffect } from 'react';
import UrlService from '../../UrlService';
import profilePicture from '../../images/profile-picture.png';
import FileUpload from '../common/FileUpload';


const ProfileHeader = ({ name, username, profileImage, biography }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  
  useEffect(() => {
    if (profileImage) {
      setUploadedImage(profileImage);
    }
  }, [profileImage]);

  const handleImageUpload = (image) => {
    setUploadedImage(image);
  };

  const getProfileImageSrc = () => {
    if (uploadedImage) {
      return UrlService.image.GetProfileImage(uploadedImage);
    } else {
      return profilePicture;
    }
  };

  return (
    <div className="flex flex-col items-center py-4 bg-[#505f69] shadow-xl pt-24">
      <FileUpload onUpload={handleImageUpload}>
        <div className="relative">
          <img
            className="w-28 h-28 rounded-full mb-2 outline"
            src={getProfileImageSrc()}
            alt="Profile"
          />
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-0 hover:bg-black/50 hover:opacity-100 rounded-full cursor-pointer">
            <p className="text-white font-bold text-center">Upload Image</p>
          </div>
        </div>
      </FileUpload>
      {name && <h1 className="text-4xl font-bold text-center mb-2">{name}</h1>}
      {username && (
        <h2 className="text-xl font-medium text-[#d2d2d7] text-center mb-2 ">@{username}</h2>
      )}
      {biography ? (
        <h3 className="text-lg font-medium text-center w-[70%] sm:w-[50%]">{biography}</h3>
      ) : (
        ''
      )}
    </div>
  );
};

export default ProfileHeader;
