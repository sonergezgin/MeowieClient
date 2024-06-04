import React from 'react'
import ListMovie from '../components/moviesComponents/ListMovie'
import UrlService from '../UrlService'

const Movies = () => {
  return (
    <div>
        <ListMovie count={21} fetchURL={UrlService.movie.MoviesURL(21,0,false)}/>
    </div>
  )
}

export default Movies
