import { createContext, useContext} from "react";
import {toaster} from '../components/toastify/toastConstans'
import UrlService from "../UrlService";
import jwt_decode from "jwt-decode"; 
import UserContext from "./UserContext";

const MovieContext = createContext()

export default MovieContext

export const MovieProvider = ({children}) => {

    const {getUsernameAndToken} = useContext(UserContext)

    let getRandomMovies = async (count) => {
        try {
            let request = fetch(UrlService.movie.RandomMoviesURL(count),{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let response = await request
            if(response.ok){
                let result = await response.json()
                return result.movies
            }
            else{
                let result = await response.json()
                toaster.error(result.message)
            }            
        } catch (error) {
            toaster.error(error.message)
        }
    }

    let getMoviesByUrl = async (url) =>{
        try {
            let request = fetch(url,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let response = await request
            if(response.ok){
                let result = await response.json()
                return result
            }
            else{
                let result = await response.json()
                toaster.error(result.message)
            }            
        } catch (error) {
            toaster.error(error.message)
        }
    }

    
    let rateMovie = async (comment, rate, movieId) =>{
        try {
            const usernameAndToken = getUsernameAndToken()

            if(usernameAndToken){
                let request = fetch('https://localhost:7208/api/Movies/rate',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + usernameAndToken.token
                    },
                    body: JSON.stringify({
                        'comment' : comment,
                        'rate' : rate,
                        'movieId' : movieId,
                        'username' : usernameAndToken.username
                    })
                })  
                let response = await request
                if(response.ok){
                    let result = await response.json()
                    toaster.success(result.message)
                }
                else{
                    toaster.error(response.status)
                }
            }
            else{
                toaster.warning("Please first login")
            }

        } catch (error) {
            toaster.error(error.status)
        }
    }

    let contextData = {
        getRandomMovies:getRandomMovies,
        rateMovie:rateMovie,
        getMoviesByUrl:getMoviesByUrl
    }
    
    return(
        <MovieContext.Provider value={contextData}>
            {children}
        </MovieContext.Provider>
    );

}

