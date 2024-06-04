import React from 'react'
import Skeleton from 'react-loading-skeleton'

const RowMovieSkeleton = ({count}) => {
  return (
    <div className='w-[108px] h-[160px] sm:w-[135px] sm:h-[200px] md:w-[160px] md:h-[240px] lg:w-[190px] lg:h-[280px] inline-block cursor-pointer relative p-2'>
      <Skeleton className='w-full h-full'/>
    </div>
  )
}

export default RowMovieSkeleton
