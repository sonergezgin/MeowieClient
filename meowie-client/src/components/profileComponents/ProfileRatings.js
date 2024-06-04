import React, { useContext, useEffect, useState } from 'react'
import CommentContext from '../../context/CommentContext'
import RatingCard from './RatingCard'

const ProfileRatings = ({username}) => {

    const [ratings, setRatings] = useState(null)
    const {getUserRatings} = useContext(CommentContext)

    useEffect(() => {
        getAllUserRatings()
      }, [username])
    
      const getAllUserRatings = async () =>{
        getUserRatings(username).then(r => {
            setRatings(r);
        })
      }

  return (
    <div className="flex flex-wrap">
        {
          ratings ?
          ratings.map((rating, index) => (
            <div className="flex-shrink-0 my-4 mx-6 justify-around items-start" key={rating.id}>
              <RatingCard rating={rating} key={index} />
            </div>
          ))
          :
          "not found"
        }
      </div>
  )
}

export default ProfileRatings
