import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UrlService from '../UrlService'
import { useParams } from 'react-router-dom'
import Banner from '../components/movieDetailComponents/Banner'
import DetailBody from '../components/movieDetailComponents/DetailBody'
import Casts from '../components/movieDetailComponents/Casts'
import CommentList from '../components/movieDetailComponents/CommentList'

const MovieDetail = () => {
    const {id} = useParams()
    const [movie, setMovie] = useState(null)
    const getMovie = () =>{
      axios.get(UrlService.movie.MovieById(id)).then(response => {
        setMovie(response.data.movie)
    })
    }
    useEffect(() => {
        getMovie()
    },[])
  return (
    <div>
        <Banner bannerUrl={movie ? movie?.bannerURL : null}/>
        <DetailBody movie={movie ? movie : null}/>
        <Casts actors={movie ? movie.actors : null} director={movie ? movie.director : null} count={20}/>
        <CommentList movie={movie ? movie : null} comments={movie ? movie.comments : null} onCommentAdded={() => {
        getMovie()
        }}/>
    </div>
  )
}

export default MovieDetail
