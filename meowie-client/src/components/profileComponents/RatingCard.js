import React from 'react'
import { useNavigate } from "react-router-dom";
import profilePicture from '../../images/profile-picture.png'
import { getImageUrl } from '../../utils/ImageUrl'
import UrlService from '../../UrlService'

const RatingCard = ({ rating }) => {
  const navigate = useNavigate()

  const navigateToUserProfile = () => {
    navigate(`/profile/${rating.username}`)
  }

  const navigateToMovieDetails = () => {
    navigate(`/movie/${rating.movieId}`)
  }

  return (
    <div className='w-96 h-44 bg-gray-700 shadow-md rounded-md flex flex-row p-3 group'>
    <div className="flex flex-col justify-between w-[70%]">
      <div className="flex items-center space-x-2">
        <img className="h-6 w-6 object-cover rounded-full border-2 border-white" src={rating.profileImage ? UrlService.image.GetProfileImage(rating.profileImage) : profilePicture} alt="User profile" onClick={navigateToUserProfile} />
        <div className="text-white font-bold text-sm cursor-pointer" onClick={navigateToUserProfile}>{rating.username}</div>
      </div>
      <div className="text-white text-sm truncate">{rating?.comment}</div>
      <div className="text-white text-lg font-medium">{`Rating: ${rating?.rating}`}</div>
    </div>
    <div className="ml-3 w-[30%] h-full justify-end relative cursor-pointer" onClick={navigateToMovieDetails}>
      <img className="object-cover rounded cursor-pointer" src={getImageUrl.originalSize(rating?.movieImage)} alt="Movie"  />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <p className="text-white text-xs">{rating?.movieName}</p>
      </div>
    </div>
  </div>
  

  )
}

export default RatingCard
