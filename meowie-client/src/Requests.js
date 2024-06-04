let baseURL = `https://localhost:7208/api/`

let requests = {
    getRandomMovies : (count)=>`${baseURL}Movies/random?Count=${count}`,
    getActionMovies : `${baseURL}Movies/genre?Genres=Action&Count=20`,
    getComedyMovies : `${baseURL}Movies/genre?Genres=Comedy&Count=20`,
    getDramaMovies : `${baseURL}Movies/genre?Genres=Drama&Count=20`,
    getRomanceMovies : `${baseURL}Movies/genre?Genres=Romance&Count=20`,
    getSciFiMovies : `${baseURL}Movies/genre?Genres=Sci-Fi&Count=20`,
    getThrillerAndHorrorMovies : `${baseURL}Movies/genre?Genres=Thriller&Genres=Horror&Count=20`,
    getAdventureMovies : `${baseURL}Movies/genre?Genres=Adventure&Count=20`,
}

export default requests
