import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie } from "../../features/movies/moviesSlice";
import { useParams } from "react-router";
import Card from "../../components/ui/Card";
import { isDetail } from "../../features/components/cardSlice";
import { formatToDefaultDate, getYear } from "../../utils/formatDate";
import { convertMinutesToHours } from "../../utils/formatTime";
import StarRating from "../../components/ui/StarRating";
import { FcIdea } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import CardCast from "../../components/ui/CardCast";

export default function MovieDetail() {
  const movie = useSelector((state) => state.movies.movie.movie);
  const cast = useSelector((state) => state.movies.movie.cast);
  const dispatch = useDispatch();
  const { id } = useParams();

  const rating = movie.rating;

  useEffect(() => {
    dispatch(fetchMovie(id));
  }, []);

  useEffect(() => {
    dispatch(isDetail(true));
  }, []);

  return (
    <>
      <div>
        <div className="relative w-full h-[600px]">
          <div
            style={{ backgroundImage: `url("${movie.backdropUrl}")` }}
            className={`bg-top bg-no-repeat bg-cover h-full opacity-40 absolute top-0 left-0 w-full z-0`}
          ></div>

          <div className="relative z-10 text-black container mx-auto pt-8 flex items-center">
            <Card
              movie={{
                posterUrl: movie.posterUrl,
              }}
            />
            <div className="ps-10">
              <div className="flex items-center text-5xl">
                <div className="font-bold">{movie.title}</div>
                <div className="px-2">({getYear(movie.releaseDate)})</div>
              </div>

              <div className="flex text-xl py-1">
                <div className="flex items-center border-r-2 px-2 border-black h-6">
                  {formatToDefaultDate(movie.releaseDate)}
                </div>
                <div className="flex items-center border-r-2 px-2 border-black h-6">
                  {movie.genre}
                </div>
                <div className="flex items-center px-2">
                  {convertMinutesToHours(movie.runTime)}
                </div>
              </div>

              <div className="flex items-center">
                <div className="text-4xl">
                  <StarRating rating={rating} />
                </div>
                <div className="text-2xl px-1 pe-10 font-semibold">
                  {rating}
                </div>
                <div className="flex items-center py-1 px-3 pt-1 hover:outline-none outline-none rounded-lg bg-sky-950 text-yellow-500">
                  <FcIdea />
                  <button className="px-2 pt-1">Fun Facts</button>
                </div>
              </div>
              <div className="flex items-center">
                <button className="group relative flex items-center space-x-2 rounded-full p-2 cursor-pointer bg-sky-950">
                  <FcLike className="text-2xl" />

                  <span className="opacity-0 group-hover:opacity-100 absolute left-1/2 transform -translate-x-1/2 bottom-[-50px] text-white text-xs bg-sky-950  px-2 py-1 rounded-md shadow-md transition-opacity duration-300">
                    Add To Your Recommendations
                  </span>
                </button>
              </div>
              <div className="pt-8 w-[1000px]">
                <span className="text-2xl font-semibold border-b-2">
                  Overview
                </span>
                <p className="text-xl pt-2">{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-5 mx-auto flex">
          <div className="text-2xl px-10 font-bold h-fit w-fit">CAST</div>
          <div className="overflow-x-auto p-4">
            <div className="flex space-x-4">
              {cast.map((el) => (
                <div key={el.id}>
                  <CardCast
                    cast={{
                      posterUrl: el.profile_path,
                      name: el.name,
                      character: el.character,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
