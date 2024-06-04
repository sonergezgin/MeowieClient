import React, { useContext, useEffect, useState } from 'react'
import Rate from './Rate'
import {MuiButton} from '../materialui/MuiButton'
import MovieContext from '../../context/MovieContext'
import CommentCard from './CommentCard'
import AuthContext from '../../context/AuthContext'
import CommentContext from '../../context/CommentContext'

const CommentList = ({comments,movie,onCommentAdded}) => {
  const [rating, setRating] = useState(0)
  const {rateMovie} = useContext(MovieContext)
  const {user} = useContext(AuthContext)
  const {getSingleComment} = useContext(CommentContext)
  const [textAreaContent, setTextAreaContent] = useState('');
  const [userComment, setUserComment] = useState(null);
  const [allComments, setAllComments] = useState([]);

  const handleTextAreaChange = (event) => {
    setTextAreaContent(event.target.value);
  };

  useEffect(()=>{
    if(user){
      getSingleComment(user, movie?.id).then(comment => setUserComment(comment))
    }
    setAllComments(comments)
    console.log(userComment)
    },[comments]);

    const rate = (rating, content) =>{
      rateMovie(content, rating, movie.id).then(_ => {
        onCommentAdded();
      })
    }

  return (
    <div className='flex justify-center pt-16 flex-col items-center'>
        <hr className='w-[80%] pb-16'/>
        {allComments?.length > 0 ? 
        allComments.map((comment, index) => (
          <CommentCard comment={comment} key={index}/>
        )) : 
        <p className='text-3xl font-bold text-center'>No comments, be the first to comment</p>
      }

        <hr className='w-[80%] mt-16 mb-10'/>
        {
            userComment ? 
            <div>
            <p className='font-bold text-lg'>Your Comment</p>
              <CommentCard comment={userComment} key={0}/>
            </div>
            :
            ""
          }
        <div className='flex flex-col w-[80%] rounded-3xl items-center bg-[#505f69]'>
            <p className='text-2xl font-bold m-2 mt-4 pb-3 pt-4 text-[#ebebf0]'>Rate this movie 1 to 10 paw</p>
            <Rate rating={rating} onRating={rate => setRating(rate)}/>
            {rating > 0 ? <p className='font-bold text-xl'>{`${rating}/10`}</p> : ""}
            <div className='w-[90%] h-[200px] bg-[#505f69] rounded-3xl m-6'>
                <textarea value={textAreaContent} onChange={handleTextAreaChange} id="message" rows="5" className="block p-8 text-xl w-full h-full resize-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
            </div>
            <MuiButton onClick={() => rate(rating, textAreaContent)} className='w-[200px]'>{userComment ? `UPDATE YOUR RATE` : `RATE`}</MuiButton>
        </div>
    </div>
  )
}

export default CommentList
