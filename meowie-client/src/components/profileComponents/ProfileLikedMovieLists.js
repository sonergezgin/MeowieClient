import React, { useContext, useEffect, useState } from 'react'
import MovieListCard from './MovieListCard'
import MovieListContext from '../../context/MovieListContext'

const ProfileLikedMovieLists = ({username}) => {
    const [movieLists, setMovieLists] = useState(null)
    const {getUserLikedMovieLists} = useContext(MovieListContext)
  
    useEffect(() => {
      getMovieLists()
    }, [username])
  
    const getMovieLists = async () =>{
      getUserLikedMovieLists(username).then(lists => {
        setMovieLists(lists);
      })
    }
  
    return (
      <div className="flex flex-wrap">
        {
          movieLists ?
          movieLists.map((movieList, index) => (
            <div className="flex-shrink-0 mx-4 my-4" key={movieList.id}>
              <MovieListCard movieList={movieList} key={index}/>
            </div>
          ))
          :
          "not found"
        }
      </div>
    )
}

export default ProfileLikedMovieLists
