import React, { useState } from 'react'
import ProfileMovieLists from './ProfileMovieLists';
import ProfileLikedMovieLists from './ProfileLikedMovieLists';
import ProfileRatings from './ProfileRatings';

const ProfileBody = ({username}) => {
    const [selectedButton, setSelectedButton] = useState("movie-lists");

    const handleButtonClick = (button) => {
      setSelectedButton(button);
    };
  
    return (
      <div className="flex flex-wrap w-full">
        <button
          className={`w-full md:w-1/3 text-white font-bold py-2 px-4 
            ${selectedButton === "movie-lists" ? "bg-[#222831]" : "bg-[#c23442]"} 
            ${selectedButton === "movie-lists" ? "hover:bg-[#3f505c]" : "hover:bg-[#ff6473]"}
          `}
          onClick={() => handleButtonClick("movie-lists")}
        >
          Movie Lists
        </button>

        <button
          className={`w-full md:w-1/3 text-white font-bold py-2 px-4 
            ${selectedButton === "liked-movie-lists" ? "bg-[#222831]" : "bg-[#c23442]"} 
            ${selectedButton === "liked-movie-lists" ? "hover:bg-[#3f505c]" : "hover:bg-[#ff6473]"}
          `}
          onClick={() => handleButtonClick("liked-movie-lists")}
        >
          Liked Movie Lists
        </button>

        <button
          className={`w-full md:w-1/3 text-white font-bold py-2 px-4
            ${selectedButton === "ratings" ? "bg-[#222831]" : "bg-[#c23442]"} 
            ${selectedButton === "ratings" ? "hover:bg-[#3f505c]" : "hover:bg-[#ff6473]"}
          `}
          onClick={() => handleButtonClick("ratings")}
        >
          Ratings
        </button>

        <div className="w-full">
          {selectedButton === "movie-lists" && <ProfileMovieLists username={username}/>}
          {selectedButton === "liked-movie-lists" && <ProfileLikedMovieLists username={username}/>}
          {selectedButton === "ratings" && <ProfileRatings username={username}/>}
        </div>
      </div>
    );
  };

export default ProfileBody
