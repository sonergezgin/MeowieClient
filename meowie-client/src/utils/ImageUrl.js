export const  getImageUrl = {
    originalSize : (dbUrl) =>{
        return _getUrl(dbUrl)
    },
}

const _getUrl = (dbUrl) =>{
    if(dbUrl.includes("http")){
        return dbUrl;
    }
    else{
        return `https://image.tmdb.org/t/p/original/${dbUrl}`
    }
}