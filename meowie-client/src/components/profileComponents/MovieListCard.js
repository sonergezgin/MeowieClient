import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import LikeMovieListIcon from '../common/LikeMovieListIcon';

const MovieListCard = ({movieList}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(()=>{
    setLikesCount(movieList?.likesCount)
  },[])

  const updateLikesCount = (isLiked) =>{
    if(isLiked){
      setLikesCount(likesCount+1)
    }
    else{
      setLikesCount(likesCount-1)
    }
  }
  const handleHover = () => {
    setIsHovered(!isHovered);
  };
  const navigate = useNavigate()
  return (
    <div className='w-48 h-24'>
      <div
        className="bg-gray-700 shadow-md rounded-md relative w-full h-full first-letter:flex flex-col justify-center items-center cursor-pointer"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <div onClick={()=>navigate(`/list-detail/${movieList?.id}`)} className='w-full h-full'>
        <div className="text-white font-bold text-sm absolute top-2 left-2">
          {movieList.movieCount} movies
        </div>
        <div className="text-white font-bold text-sm absolute top-2 right-2">
          {likesCount} likes
        </div>
        </div>
        <div className={`absolute left-3 bottom-3 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-white text-sm text-center">
            <div className="mb-1">View</div>
          </div>
        </div>
        <span className='absolute bottom-3 right-3 z-10'>
          <LikeMovieListIcon userIsLiked={movieList.isLiked} movieListId={movieList?.id} callbackFunc={updateLikesCount}/>
        </span>
      </div>
      
      <div className="truncate text-center">{movieList.title}</div>
    </div>
  );
}

export default MovieListCard
