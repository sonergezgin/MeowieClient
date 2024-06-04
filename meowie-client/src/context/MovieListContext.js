import { createContext, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import {toaster} from '../components/toastify/toastConstans'
import UrlService from "../UrlService";
import UserContext from "./UserContext";

const MovieListContext = createContext()

export default MovieListContext

export const MovieListProvider = ({children}) => {

    const {getUsernameAndToken} = useContext(UserContext)

    const createMovieList = async (movieListTitle) =>{
        try {
            var loggedUser = getUsernameAndToken()
            debugger
            if(loggedUser){
                let request = fetch(UrlService.movieList.CreateMovieList(),{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${loggedUser.token}`
                    },
                    body : JSON.stringify({ "username": loggedUser.username, "title": movieListTitle })
                })
                let response = await request
                if(response.ok){
                    let result = await response.json()
                    if(result.success){
                        toaster.success(result.message)
                    }
                    else{
                        toaster.error(result.message)
                    }
                }
                else{
                    let result = await response.json()
                    toaster.error(result.message)
                }         
            }   
        } catch (error) {
            toaster.error(error.message)
        }
    }

    const getAllMovieList = async (count, page, searchKeyword) =>{
        try {

            var loggedUser = getUsernameAndToken()
        let request = fetch(UrlService.movieList.GetAllMovieList(count, page, loggedUser?.username, searchKeyword),{
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

    const getUserMovieLists = async (user) =>{
        try {
            var loggedUser = getUsernameAndToken()
            if(!user){
                user = loggedUser
                if(user){
                    user = user.username
                }
            }
            if(user){
                let request = fetch(UrlService.movieList.GetAllUserMovieList(user, loggedUser.username),{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                let response = await request
                if(response.ok){
                    let result = await response.json()
                    return result.movieLists
                }
                else{
                    let result = await response.json()
                    toaster.error(result.message)
                }         
            }   
        } catch (error) {
            toaster.error(error.message)
        }
    }


    const getUserLikedMovieLists = async (user) =>{
        try {
            var loggedUser = getUsernameAndToken()
            if(!user){
                user = loggedUser
                if(user){
                    user = user.username
                }
            }
            if(user){
                let request = fetch(UrlService.movieList.GetAllUserLikedMovieList(user, loggedUser.username),{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                let response = await request
                if(response.ok){
                    let result = await response.json()
                    return result.movieLists
                }
                else{
                    let result = await response.json()
                    toaster.error(result.message)
                }         
            }   
        } catch (error) {
            toaster.error(error.message)
        }
    }

    const getMovieListDetail = async (movieListId) =>{
        try {
            let request = fetch(UrlService.movieList.GetMovieListDetail(movieListId),{
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

    const addMovieToList = async (movieId, movieListId) =>{
        try {
            const usernameAndToken = getUsernameAndToken()

            if(usernameAndToken){
                let request = fetch(UrlService.movieList.AddMovieToList(movieId, movieListId),{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + usernameAndToken.token
                    },
                })  
                let response = await request
                if(response.ok){
                    let result = await response.json()
                    if(result.success){
                        toaster.success(result.message)
                    }
                    else{
                        toaster.error(result.message)
                    }
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
    const likeMovieList = async (movieListId) =>{
        try {
            const usernameAndToken = getUsernameAndToken()
            if(usernameAndToken){
                let request = fetch(UrlService.movieList.LikeMovieList(movieListId, usernameAndToken.username),{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + usernameAndToken.token
                    },
                })  
                let response = await request
                if(response.ok){
                    let result = await response.json()
                    if(result.success){
                        return result.isLiked
                    }
                    else{
                        toaster.error(result.message)
                    }
                }
                else{
                    toaster.error(response.status)
                }
            }
        } catch (error) {
            
        }
    }

    let contextData = {
        getUserMovieLists:getUserMovieLists,
        addMovieToList:addMovieToList,
        getMovieListDetail:getMovieListDetail,
        likeMovieList:likeMovieList,
        getUserLikedMovieLists:getUserLikedMovieLists,
        getAllMovieList:getAllMovieList,
        createMovieList:createMovieList
    }
    
    return(
        <MovieListContext.Provider value={contextData}>
            {children}
        </MovieListContext.Provider>
    );

}

