import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ListMovieItemSkeleton = () => {
  return (
        <div className=' md:w-[324px] md:h-[480px] sm:w-[421px] sm:h-[624px] inline-block cursor-pointer relative'>
            <Skeleton className='w-full h-full'/>
        </div>
  )
}

export default ListMovieItemSkeleton
