import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import { swalError } from "../../../helpers/swallToast";
import { myRecMovie } from "../../../helpers/http-client";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

export default function Homepage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async () => {
    Swal.fire({
      title: "Getting Movies",
      html: "Please wait ...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const { data } = await myRecMovie.get("movies", {
        params: {
          page: page.toString(),
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setMovies(data.results);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
      swalError(error.response.data.message);
    } finally {
      Swal.close();
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

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
      <div className="homepage-banner rounded-b-md">
        <div className="text-white flex h-full">
          <div className="me-auto"></div>
          <div className="bg-gradient-to-l from-black via-transparent to-transparent w-full">
            <div className="h-full flex flex-col justify-center items-end text-4xl font-bold px-10 pt-64">
              <h1>Your Next Favorite Movie,</h1>
              <h1>Recommended by Users & AI!</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="md:container md:mx-auto text-black mt-10 ">
        <div className="md:flex md:items-center">
          <p className="md:text-2xl font-bold md:me-auto border-b-4 border-green-500">
            Popular Movies
          </p>
          <div className="border rounded-md bg-sky-950 md:px-4 md:py-2 text-yellow-300">
            <button>Recomendation By AI</button>
          </div>
        </div>
        <div className="mt-10 max-w-[1000px] mx-auto ">
          <div className="grid grid-cols-5">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="col-span-1 max-w-full flex justify-center py-4"
              >
                <Card
                  movie={{
                    id: movie.id,
                    title: movie.title,
                    posterUrl: movie.posterUrl,
                    rating: movie.rating,
                    releaseDate: movie.releaseDate,
                  }}
                />
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
