import React from 'react'
import loadingSvg from '../../images/loading.svg'
import { getImageUrl } from '../../utils/ImageUrl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaw} from '@fortawesome/fontawesome-free-solid'
import imdbSvg from '../../images/imdb.svg'
import AddMovieToListDialog from '../common/AddMovieToListDialog'

const DetailBody = ({movie}) => {
  return (
    <div className='-mt-[400px] flex flex-col md:flex-row items-center relative z-10 mobile:block pl-0 md:pl-24'>
        <img src={movie ? getImageUrl.originalSize(movie.imageURL) : loadingSvg} alt=''
        className='w-[400px] min-w-[400px] h-[600px]'/>
        <div className='px-6 flex flex-col items-center md:items-start gap-3'>
            <p className='text-3xl md:text-5xl bold pt-4 md:pt-16'>{movie ? movie?.name : "Loading..."}</p>
            <ul className='flex items-center gap-2'>
                {movie ? movie?.genres.map((genre, i)=>{
                    return(
                        <li className={`px-3 py-1.5 bg-[#c23442] rounded-lg text-sm`} key={i}>
                            {genre}
                        </li>
                    )
                }): ""}
            </ul>
            <div className='flex pt-2'>
                <div className='flex'>
                    <img className='w-[35px]' src={imdbSvg} alt='imdb rating'/>
                    <p className='text-2xl text-center pl-1'>{movie ? movie.imdbRating : "0.0"}</p>
                </div>
                <div className='flex pl-8'>
                    <FontAwesomeIcon icon={faPaw} size='2xl' style={{color: "#ff6473"}}/>
                    <p className='text-2xl text-center pl-1'>{movie ? movie.userRating.toFixed(1) : "0.0"}</p>
                </div>
            </div>
            <div className='flex'>
                <p className='text-lg font-bold text-center pt-2'>Add this movie to list</p>
                <AddMovieToListDialog movieId={movie?.id}/>
            </div>
            <p className='opacity-80 text-xl pt-2 pr-2 md:pr-96'>{movie?.description}</p>
        </div>
    </div>
  )
}

export default DetailBody
