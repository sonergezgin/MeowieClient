import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProfileHeaderSkeleton = () => {
    return (
        <div className="flex flex-col items-center py-4 gap-[10px] pt-24">
          <Skeleton width={112} height={112} circle/>
          <Skeleton width={200} height={30} />
          <Skeleton width={180} height={20}/>
          <Skeleton width={400} height={20}/>
        </div>
      );
}

export default ProfileHeaderSkeleton
