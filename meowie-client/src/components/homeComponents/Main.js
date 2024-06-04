import React, { useContext, useEffect, useState } from 'react'
import { MuiButton } from '../materialui/MuiButton'
import MovieContext from '../../context/MovieContext'
import { getImageUrl } from '../../utils/ImageUrl'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate()
  let { getRandomMovies } = useContext(MovieContext);
  
  useEffect(() => {
    getRandomMovies(1).then((movies) =>{
      setMovie(movies[0])
    })
  },[]);

const truncateString = (str, num) => {
  if(str?.length > num){
    return str.slice(0, num)+'...';
  }
  return str;
}
return (
    
  <div className='flex flex-col justify-center w-[full] h-[650px] text-white'>
    <div className='w-full h-full'>
      <div className='relative w-full h-full'>
        <div className='absolute w-full h-full bg-gradient-to-r from-black'></div>
        <img className='w-full h-full object-cover md:object-cover' src={movie ? getImageUrl.originalSize(movie?.bannerURL) : ""} alt={movie?.name}/>
        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-[#222831]"></div>
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-[#222831]"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#222831]"></div>
      </div>
      <div className='absolute w-full top-[20%] p-4 md:p-8'>
        <h1 className='text-3xl md:text-5xl font-bold'>{movie ? movie?.name : ""}</h1>
        <div>
          <p className='text-gray-400 text-sm py-2'> {movie ? "Released : "+new Date(movie.releaseDate).getUTCFullYear() : ""}</p>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
          {movie ? truncateString(movie?.description, 150) : ""}
          </p>
        </div>
        {movie ? <MuiButton className='w-36' onClick={()=>navigate(`/detail/${movie?.id}`)}>View</MuiButton> : ""}
      </div>
    </div>
  </div>
)


}

export default Main

/*


*/