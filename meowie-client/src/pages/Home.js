import React from 'react'
import Main from '../components/homeComponents/Main'
import JoinUs from '../components/homeComponents/JoinUs'
import Row from '../components/homeComponents/Row'
import UrlService from '../UrlService'
const Home = () => {
  return (
    <div>
      <Main/>
      <JoinUs/>
      <Row rowId={1} title='Top rated 5 movie' fetchURL={UrlService.movie.MoviesURL(5,0,true)} count={5}/>
      <Row rowId={2} title='Popular Now' fetchURL={UrlService.movie.RandomMoviesURL(5)} count={5}/>
    </div>
  )
}

export default Home

/*
      <Row rowId={1} title='Action' fetchURL={requests.getActionMovies} />
      <Row rowId={2} title='Comedy' fetchURL={requests.getComedyMovies} />
      <Row rowId={3} title='Drama' fetchURL={requests.getDramaMovies} />
      <Row rowId={4} title='Romance' fetchURL={requests.getRomanceMovies} />
      <Row rowId={5} title='Adventure' fetchURL={requests.getAdventureMovies} />
      <Row rowId={6} title='Science Fiction' fetchURL={requests.getSciFiMovies} />
      <Row rowId={7} title='Thriller & Horror' fetchURL={requests.getThrillerAndHorrorMovies} />
*/