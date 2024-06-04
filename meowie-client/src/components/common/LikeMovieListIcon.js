import React, { useContext, useEffect, useState } from 'react'
import { BsFillHeartFill } from 'react-icons/bs';
import MovieListContext from '../../context/MovieListContext';

const LikeMovieListIcon = ({userIsLiked, movieListId, callbackFunc}) => {
  const [isLiked, setIsLiked] = useState(false);
  const {likeMovieList} = useContext(MovieListContext)

  const handleClick = async () => {
    likeMovieList(movieListId).then((likeState)=>{
      setIsLiked(likeState)
      callbackFunc(likeState)
    } );
  };

  useEffect(()=>{
    console.log("user is liked worked")
    setIsLiked(userIsLiked)
  },[])

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer'}} className='z-10'>
      <BsFillHeartFill color={isLiked ? 'red' : 'gray'} size={24} />
    </div>
  );
}

export default LikeMovieListIcon
