import React from 'react'
import loadingSvg from '../../images/loading.svg'
import { getImageUrl } from '../../utils/ImageUrl'
const Banner = ({bannerUrl}) => {
  return (
    <div className='flex flex-col justify-center w-[full] h-[650px] text-white'>
    <div className='w-full h-full'>
      <div className='relative w-full h-full'>
        <div className='absolute w-full h-full bg-gradient-to-tr from-black'></div>
        <img className='w-full h-full object-cover md:object-cover' src={bannerUrl ? getImageUrl.originalSize(bannerUrl) : loadingSvg} alt={"NOT FOUND"}/>
        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-[#222831]"></div>
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-[#222831]"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#222831]"></div>
      </div>
    </div>
  </div>
  )
}

export default Banner
