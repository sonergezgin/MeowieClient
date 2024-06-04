import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const MovieListMovieCardSkeleton = () => {
  return (
    <div className='w-[108px] h-[160px] sm:w-[135px] sm:h-[200px] md:w-[160px] md:h-[240px] lg:w-[190px] lg:h-[280px] inline-block cursor-pointer relative p-1'>
        <Skeleton className='w-full h-full'/>
    </div>
  )
}

export default MovieListMovieCardSkeleton
