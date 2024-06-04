import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RowMovie from './RowMovie'
import RowMovieSkeleton from '../skeletons/RowMovieSkeleton'

const Row = ({title, fetchURL, rowId, count}) => {
  const[movies, setMovies] = useState([])

  useEffect(()=>{
    axios.get(fetchURL).then((response)=>{
      setMovies(response.data.movies)
    })

  },[fetchURL])

  return (
    <>
    <div className='flex justify-center items-center w-full pb-6'>
    <div className='flex flex-col items-center h-full w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]'>
        <h2 className='text-white font-bold md:text-xl'>{title}</h2>
        <div className='relative flex items-center group'>
          <div id={'slider'+rowId} className='mt-2 grid grid-cols-5 gap-2'>
          {
              movies.length > 0
              ?
              movies.map((item, id)=>(<RowMovie key={id} item={item}/>))
              :
              Array.from({ length: count }, (_, index) => (
                <RowMovieSkeleton key={index}/>
            ))
            }
          </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Row
