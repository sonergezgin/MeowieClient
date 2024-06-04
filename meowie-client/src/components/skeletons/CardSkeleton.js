import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CardSkeleton = () => {
  return (
    <div className='mx-3 my-1.5 h-[350px] w-[200px]'>
        <Skeleton height={300} width={200}/>
        <Skeleton/>
    </div>
  )
}

export default CardSkeleton
