import React from 'react'
import { getImageUrl } from '../../utils/ImageUrl'

const Card = (props) => {
  return (
    <div  className='mx-3 my-1.5 cursor-pointer h-[280px] w-[200px] pb-4'>
        <img src={getImageUrl.originalSize(props?.imageURL)} className='w-full h-full' alt=''/>
        <p className='font-semibold w-full h-full text-center'>{props.name}</p>
    </div>
  )
}

export default Card
