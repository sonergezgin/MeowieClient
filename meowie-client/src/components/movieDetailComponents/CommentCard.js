import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaw} from '@fortawesome/fontawesome-free-solid'
import profilePicture from '../../images/profile-picture.png';
import UrlService from '../../UrlService';

const CommentCard = ({comment}) => {
  return (
    <div className="mx-auto rounded overflow-hidden shadow-xl flex items-center w-[480px] sm:w-[720px] pb-5 m-2">
      <img className="w-12 h-12 rounded-full mr-4" src={comment?.profileImage ? UrlService.image.GetProfileImage(comment.profileImage) : profilePicture} alt="Profil Resmi" />
      <div className="flex-1">
        <div className='w-full h-full flex justify-between'>
          <div className="font-bold text-xl mb-2">{comment.username}</div>
          <div className='flex'>
            <FontAwesomeIcon icon={faPaw} size='lg' style={{color: "#ff6473"}}/>
            <p className='pl-1 text-lg'>{comment ? comment.userRating : "0"}</p>
          </div>
        </div>
        <p className="text-gray-400 text-base break-all">{comment.content}</p>
      </div>
    </div>
  );
}

export default CommentCard
