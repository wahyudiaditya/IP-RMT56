import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie } from "../../features/movies/moviesSlice";
import { useParams } from "react-router";
import Card from "../../components/ui/Card";
import { isDetail } from "../../features/components/cardSlice";
import { getYear } from "../../utils/formatDate";

export default function MovieDetail() {
  const movie = useSelector((state) => state.movies.movie);
  const dispatch = useDispatch();
  const { id } = useParams();

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
            className={`bg-[url("${movie.backdropUrl}")] bg-center bg-no-repeat bg-cover h-full opacity-60 absolute top-0 left-0 w-full z-0`}
          ></div>

          <div className="relative z-10 text-black container mx-auto pt-8 flex items-center">
            <Card
              movie={{
                posterUrl: movie.posterUrl,
              }}
            />
            <div className="flex items-center text-5xl">
              <div className="ps-10 font-bold">{movie.title}</div>
              <div className="px-2">({getYear(movie.releaseDate)})</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
