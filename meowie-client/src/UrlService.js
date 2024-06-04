let baseURL = `https://localhost:7208/api/`

const UrlService = {
    movie : {
        RandomMoviesURL : (count) =>`${baseURL}Movies/random?Count=${count}`,
            MoviesURL : (count, page=0, shuffle=false, ...genres) => {
            let genresUrl = ""
            if(genres) {
            genres.map((genre)=>genresUrl+=`&Genres=${genre}`)
            }
            return `${baseURL}Movies?Page=${page}&Count=${count}${genresUrl}`
        },
        MovieById : (movieId) => `${baseURL}Movies/${movieId}`,
        SearchMovie : (count, page=0, shuffle=false, searchKeyword) => `${baseURL}Movies/search?Page=${page}&Count=${count}&Shuffle=${shuffle}&SearchKeyword=${searchKeyword}`
    },
    comment : {
        GetUserCommentByMovieId : (username, movieId) => `${baseURL}Comments/single-comment?Username=${username}&MovieId=${movieId}`,
        GetUserRatings : (username) => `${baseURL}Comments/user-ratings?Username=${username}`
    },
    image : {
        GetProfileImage : (imagename) => `${baseURL}Images/${imagename}`,
        UploadProfileImage : () => `${baseURL}Upload/image`
    },
    movieList : {
        CreateMovieList : () => `${baseURL}MovieLists/create`,
        GetAllMovieList : (count, page=0, loggedUser, searchKeyword) =>{
            if(loggedUser && searchKeyword){
                return `${baseURL}MovieLists?Page=${page}&Count=${count}&LoggedUsername=${loggedUser}&SearchKeyword=${searchKeyword}`
            }
            else if(loggedUser && !searchKeyword){
                return `${baseURL}MovieLists?Page=${page}&Count=${count}&LoggedUsername=${loggedUser}`
            }
            else if(searchKeyword && !loggedUser){
                return `${baseURL}MovieLists?Page=${page}&Count=${count}&SearchKeyword=${searchKeyword}`
            }
            return `${baseURL}MovieLists?Page=${page}&Count=${count}`
        },
        GetAllUserMovieList : (ownerUser, likerUser) =>{
            if(likerUser){
                return `${baseURL}MovieLists/user-movielist?ListOwnerUsername=${ownerUser}&LoggedUsername=${likerUser}`
            }
            return `${baseURL}MovieLists/user-movielist?ListOwnerUsername=${ownerUser}`
        },
        GetAllUserLikedMovieList : (ownerUser, likerUser) =>{
            if(likerUser){
                return `${baseURL}MovieLists/user-liked-movielist?ListOwnerUsername=${ownerUser}&LoggedUsername=${likerUser}`
            }
            return `${baseURL}MovieLists/user-liked-movielist?ListOwnerUsername=${ownerUser}`
        },
        AddMovieToList : (movieId, movieListId) => `${baseURL}MovieLists/add-movie?MovieId=${movieId}&MovieListId=${movieListId}`,
        GetMovieListDetail : (movieListId) => `${baseURL}MovieLists/${movieListId}`,
        LikeMovieList : (movieListId, username) => `${baseURL}MovieLists/like?MovieListId=${movieListId}&Username=${username}`,
        
    }
}


export const Genres = {
    Action : 'Action',
    Comedy : 'Comedy',
    Drama : 'Drama',
    Romance : 'Romance',
    SciFi : 'Sci-Fi',
    Thriller : 'Thriller',
    Horror : 'Horror',
    Adventure : 'Adventure',
}
export default UrlService
