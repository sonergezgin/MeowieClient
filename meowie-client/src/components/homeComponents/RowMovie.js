import React from 'react'
import loadingSvg from '../../images/loading.svg'
import { useNavigate } from 'react-router-dom'
import { getImageUrl } from '../../utils/ImageUrl'
const RowMovie = ({item}) => {
  const navigate = useNavigate()
  return (


<div onClick={()=>navigate(`/detail/${item.id}`,{replace: false})} 
 className="relative cursor-pointer">
  <img
    className="w-full h-auto"
    src={getImageUrl.originalSize(item?.imageURL)}
    alt={item?.name}
  />
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 opacity-0 hover:opacity-100 hover:border-4 transition-opacity">
      <p className="text-white text-center">{item?.name}</p>
    </div>
</div>
    
  )
}

export default RowMovie
