import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import { swalError } from "../../../helpers/swallToast";
import { myRecMovie } from "../../../helpers/http-client";
import Swal from "sweetalert2";

export default function Homepage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const { data } = await myRecMovie.get("movies", {
        params: {
          page: page.toString(),
        },
      });
      setMovies((prevMovies) => [...prevMovies, data.results]);
    } catch (error) {
      console.log(error);
      swalError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    Swal.fire({
      title: "Getting Movies",
      html: "Please wait ...",
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        !loading;
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  }

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handleLoadMore = () => {
    if (!loading) {
      setLoadMoreVisible(false); // Sembunyikan tombol Load More setelah diklik
      setPage((prevPage) => prevPage + 1); // Pindah ke halaman berikutnya
    }
  };

  return (
    <>
      <div className="homepage-banner rounded-md">ini</div>
      <div className="md:container md:mx-auto text-black mt-10 ">
        <div className="md:flex md:items-center">
          <p className="md:text-2xl font-bold md:me-auto">Popular Movies</p>
          <div className="border rounded-md bg-sky-950 md:px-4 md:py-2 text-yellow-300">
            <button>Recomendation By AI</button>
          </div>
        </div>
        <div className="mt-10 max-w-[1000px] mx-auto ">
          <div className="grid grid-cols-5 ">
            <div className="col-span-1 max-w-full flex justify-center py-4">
              <Card />
            </div>
            <div className="col-span-1 max-w-full flex justify-center py-4">
              <Card />
            </div>
            <div className="col-span-1 max-w-full flex justify-center py-4">
              <Card />
            </div>
            <div className="col-span-1 max-w-full flex justify-center py-4">
              <Card />
            </div>
            <div className="col-span-1 max-w-full flex justify-center py-4">
              <Card />
            </div>
            <div className="col-span-1 max-w-full flex justify-center py-4">
              <Card />
            </div>
            <div className="col-span-1 max-w-full flex justify-center py-4">
              <Card />
            </div>
            <div className="col-span-1 max-w-full flex justify-center py-4">
              <Card />
            </div>
            <div className="col-span-1 max-w-full flex justify-center py-4">
              <Card />
            </div>
            <div className="col-span-1 max-w-full flex justify-center py-4">
              <Card />
            </div>
          </div>

          <div className="px-2">
            <button className="border rounded-md w-full py-1 bg-sky-950 text-white hover:scale-105 duration-500">
              Load More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
