import React, { useContext, useEffect, useState } from 'react';
import UrlService from '../../UrlService';
import profilePicture from '../../images/profile-picture.png';
import MovieListContext from '../../context/MovieListContext';
import AddMovieToListDialog from '../common/AddMovieToListDialog'
import { useNavigate, useParams } from 'react-router-dom';
import { getImageUrl } from '../../utils/ImageUrl';
import MovieListMovieCardSkeleton from '../skeletons/MovieListMovieCardSkeleton';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const MovieListDetail = () => {
  const { getMovieListDetail } = useContext(MovieListContext);
  const { id } = useParams();
  const navigate = useNavigate()
  const [movies, setMovies] = useState(null);
  const [movieListTitle, setMovieListTitle] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMovieListDetail(id).then((list) => {
      setMovieListTitle(list.title);
      setMovies(list.movies);
      setUser(list.user);
    });
  }, [id]);

  return (
    <div className="flex justify-center items-center w-full pt-20">
      <div className="flex flex-col items-center h-full w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
        <h2 className="font-bold text-3xl pt-6 pb-3 text-[#ffd23c]">
          {movieListTitle ? movieListTitle : <Skeleton width={300}/>}
        </h2>
        <div className="flex items-center">
          <h2 className="ml-1 text-xl font-bold text-[#c23442]">
            <span className="text-[#d2d2d7] font-normal">{user?.username ? "created by" : ""} </span>
            {user?.username ? user?.username : <Skeleton width={330}/>}
          </h2>
          {
            user ? 
            <img
            className="w-8 h-8 rounded-full"
            src={
              user?.profileImage
                ? UrlService.image.GetProfileImage(user?.profileImage)
                : profilePicture
            }
            alt="Profile"
          />
          :
          ""
          }
        </div>
        <div className="mt-8 grid grid-cols-5 gap-2">
          {movies ?
            movies.map((movie) => (
              <div
                key={movie.id}
                className="relative flex flex-col items-center cursor-pointer"
                onClick={()=>navigate(`/detail/${movie.id}`)}
              >
                <div className="relative">
                <div className='absolute top-1 left-1 z-10'>
                  <AddMovieToListDialog movieId={movie?.id} fontsize={20}/>
                </div>
                  <img
                    className="w-full h-auto"
                    src={getImageUrl.originalSize(movie?.imageURL)}
                    alt={movie?.name}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 opacity-0 hover:opacity-100 hover:border-4 transition-opacity">
                    <p className="text-white text-center">{movie?.name}</p>
                  </div>
                </div>
              </div>
            ))
            :
            Array.from({ length: 10 }, (_, index) => (
              <MovieListMovieCardSkeleton/>
          ))
            }
        </div>
      </div>
    </div>
  );
};



export default MovieListDetail;
