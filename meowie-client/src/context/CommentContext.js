import { createContext, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import {toaster} from '../components/toastify/toastConstans'
import UrlService from "../UrlService";
import UserContext from "./UserContext";

const CommentContext = createContext()

export default CommentContext

export const CommentProvider = ({children}) => {

    const {getUsernameAndToken} = useContext(UserContext)

    const getSingleComment = async (username, movieId) =>{
        try {
            let request = fetch(UrlService.comment.GetUserCommentByMovieId(username, movieId),{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let response = await request
            if(response.ok){
                let result = await response.json()
                return result.comment
            }

        } catch (error) {
            toaster.error(error.message)
        }
    }
    const getUserRatings = async (user) =>{
        try {
            var loggedUser = getUsernameAndToken()
            if(!user){
                user = loggedUser
                if(user){
                    user = user.username
                }
            }
            if(user){
                let request = fetch(UrlService.comment.GetUserRatings(user),{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                let response = await request
                if(response.ok){
                    let result = await response.json()
                    return result.ratedMovies
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

    let contextData = {
        getSingleComment:getSingleComment,
        getUserRatings:getUserRatings
    }
    
    return(
        <CommentContext.Provider value={contextData}>
            {children}
        </CommentContext.Provider>
    );

}

