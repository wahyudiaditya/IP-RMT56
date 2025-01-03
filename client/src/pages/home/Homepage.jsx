import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../features/movies/moviesSlice";
import { NavLink } from "react-router";
import { isDetail } from "../../features/components/cardSlice";
import { getYear } from "../../utils/formatDate";

export default function Homepage() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const movies = useSelector((state) => state.movies.list.data);
  const totalPages = useSelector((state) => state.movies.list.totalPages);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies(page, query));
  }, [page, query]);

  useEffect(() => {
    dispatch(isDetail(false));
  }, []);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <div className="homepage-banner rounded-b-md ">
        <div className="text-white flex h-full">
          <div className="me-auto"></div>
          <div className="bg-gradient-to-l from-black via-transparent to-transparent w-full">
            <div className="h-full flex flex-col justify-center items-end md:text-4xl font-bold px-10 pt-64">
              <h1>Your Next Favorite Movie,</h1>
              <h1>Recommended by Users & AI!</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="md:container xl:mx-auto lg:mx-auto md:w-[1200px] text-black mt-10 ">
        <div className="md:flex md:items-center">
          <p className="md:text-2xl font-bold border-b-4 border-green-500">
            Popular Movies
          </p>

          <div className="bg-white flex px-4 py-3 border-b border-[#333] focus-within:border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="18px"
              className="fill-gray-600 mr-3"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
            <input
              type="email"
              placeholder="Search Something..."
              className="w-full outline-none text-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className=" border-green-500 border-b-4 font-bold text-xl">
            <p>Recomendation For All Users</p>
          </div>
        </div>
        <div className="mt-10 max-w-[1000px] mx-auto ">
          <div className="grid grid-cols-5">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="col-span-1 max-w-full flex justify-center py-4 md:py-2"
              >
                <NavLink to={`/movie/${movie.id}`}>
                  <Card
                    movie={{
                      title: movie.title,
                      posterUrl: movie.posterUrl,
                      rating: movie.rating,
                      releaseDate: getYear(movie.releaseDate),
                    }}
                  />
                </NavLink>
              </div>
            ))}
          </div>

          <div className="px-2 py-10 text-2xl flex justify-center w-full">
            <div className="flex gap-3 items-center">
              <button
                onClick={handlePrevPage}
                disabled={page <= 1}
                className={`text-gray-300 ${
                  page <= 1 ? "cursor-not-allowed" : "hover:text-gray-600"
                }`}
              >
                <FaArrowLeft />
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={page >= totalPages}
                className={`text-gray-300 ${
                  page >= totalPages
                    ? "cursor-not-allowed"
                    : "hover:text-gray-600"
                }`}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
