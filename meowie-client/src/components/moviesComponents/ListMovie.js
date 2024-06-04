import React, { useState, useEffect, useContext } from 'react'
import ListMovieItem from './ListMovieItem'
import axios from 'axios'
import { Pagination } from '@mui/material'
import UrlService from '../../UrlService'
import ListMovieItemSkeleton from '../skeletons/ListMovieItemSkeleton'
import MovieContext from '../../context/MovieContext'

const ListMovie = ({fetchURL, count}) => {
    const [movies, setMovies] = useState([])
    const [totalMovieCount, setTotalMovieCount] = useState(null)
    const [url,setUrl] = useState(fetchURL)
    const [value, setValue] = useState(0)
    const {getMoviesByUrl} = useContext(MovieContext)
    const [searchInput, setSearchInput] = useState('')

    useEffect(()=>{
        getMoviesByUrl(url).then((response)=>{
            console.log("movies : ",response.movies)
            setMovies(response.movies)
            setTotalMovieCount(response.totalMovieCount)
          })
        window.scrollTo(0, 0)
      },[url])
      
      const handleChange = (e, value) => {
        setValue(value-1)
        setMovies([])
      };
      useEffect(()=>{
        setUrl(UrlService.movie.MoviesURL(count,value,false))
      },[])

      useEffect(()=>{
        changeMovies()
      },[searchInput, value])

      const changeMovies = ()=>{
        if(searchInput.length >= 2){
          console.log(UrlService.movie.SearchMovie(count, value, false, searchInput))
          setUrl(UrlService.movie.SearchMovie(count, value, false, searchInput))
        }else{
          console.log(UrlService.movie.MoviesURL(count,value,false))
          setUrl(UrlService.movie.MoviesURL(count,value,false))
        }
      }
      const handleInputChange = (e)=>{
        setValue(0)
        setSearchInput(e.target.value)
      }

  return (
    <>
    <div className='flex flex-col justify-center pt-24'>
      
        <form className='w-full md:w-1/2 mx-auto pt-3 pb-6'>   
            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input onChange={handleInputChange} name='search-input' type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search movie" required/>
                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        </form>

        <div className='flex justify-center'>
          {
            movies.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {movies.map((item, id) => <ListMovieItem key={id} item={item} />)}
              </div>
            )
            :
            (
              searchInput.length >= 2 ?
              (
                <div className='flex justify-center items-center h-full w-full text-center'>
                  <p className='text-2xl text-gray-400'>Movies Not Found</p>
                </div>
              )
              :
              (
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: count }, (_, index) => (
                    <ListMovieItemSkeleton key={index} />
                  ))}
                </div>
              )
            )
          }
        </div>
        <div className='flex justify-center items-center pt-6 pb-4'>
        {
            totalMovieCount ? 
            <Pagination
            count={Math.floor(totalMovieCount/count)}
            size='large'
            color='primary'
            onChange={handleChange}
            sx={{
                "& .MuiPaginationItem-page": { color: "white" },
                "& .MuiPaginationItem-root.Mui-selected": { backgroundColor: "#ff6473" },
                "& .MuiPaginationItem-root.Mui-selected:hover": { backgroundColor : "#eb5e6b"},
                "& .MuiSvgIcon-root" : {color : "white"},
                "& .MuiPaginationItem-ellipsis" : {color : "white"},
                "& .MuiPaginationItem-root:hover" : {color : "#9e9d9d"}
            }}
            />
            : <p>Loading...</p>
        }
        </div>
    </div>
    </>
  )
}

export default ListMovie



