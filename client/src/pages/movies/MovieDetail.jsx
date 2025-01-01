import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import {
  fetchFunFacts,
  fetchMovie,
  submitRecommendation,
} from "../../features/movies/moviesSlice";
import { useParams } from "react-router";
import Card from "../../components/ui/Card";
import { isDetail } from "../../features/components/cardSlice";
import { formatToDefaultDate, getYear } from "../../utils/formatDate";
import { convertMinutesToHours } from "../../utils/formatTime";
import StarRating from "../../components/ui/StarRating";
import { FcIdea } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import CardCast from "../../components/ui/CardCast";
import Modal from "../../components/form/Modal";
import {
  closeFunFactsModal,
  closeRecommendationModal,
  openFunFactsModal,
  openRecommendationModal,
} from "../../features/components/modalSlice";
import { swalError } from "../../utils/swallAlert";

export default function MovieDetail() {
  const movie = useSelector((state) => state.movies.movie.movie);
  const cast = useSelector((state) => state.movies.movie.cast);
  const funFacts = useSelector((state) => state.movies.funFacts);
  const isOpenFunFactModal = useSelector(
    (state) => state.modal.modalFunFactsOpen
  );
  const isOpenRecommendationModal = useSelector(
    (state) => state.modal.modalRecommendationOpen
  );
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();

  const rating = movie.rating;

  const handleOpenFunFacts = () => {
    dispatch(openFunFactsModal());
    dispatch(fetchFunFacts(id));
  };

  const handleSubmitRecommendation = async (e) => {
    e.preventDefault();
    try {
      await dispatch(submitRecommendation(id, reason));
    } catch (error) {
      swalError(error.response.data.message);
    }
  };

  useEffect(() => {
    dispatch(fetchMovie(id));
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(isDetail(true));
  }, []);

  return (
    <>
      <div>
        <div className="md:relative w-full h-[600px]">
          <div
            style={{ backgroundImage: `url("${movie.backdropUrl}")` }}
            className={`bg-top bg-no-repeat bg-cover h-full opacity-40 md:absolute top-0 left-0 w-full z-0 md:block hidden`}
          ></div>

          <div className="md:relative z-10 text-black container mx-auto md:w-[1200px] md:pt-8 pt-2 md:flex md:items-center">
            <Card
              movie={{
                posterUrl: movie.posterUrl,
              }}
            />
            <div className="md:ps-10 pt-2 md:pt-0">
              <div className="flex items-center lg:text-5xl md:text-3xl">
                <div className="font-bold">{movie.title}</div>
                <div className="md:px-2">({getYear(movie.releaseDate)})</div>
              </div>

              <div className="md:flex lg:text-xl md:text-base py-1 text-sm">
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
                <div className="lg:text-4xl md:text-2xl text-xl">
                  <StarRating rating={rating} />
                </div>
                <div className="lg:text-2xl px-1 md:text-xl md:pe-10 pe-4 font-semibold text-base">
                  {rating}
                </div>
                <div className="flex items-center py-1 md:px-3 px-2 pt-1 text-xs lg:text-base md:text-sm hover:outline-none outline-none rounded-lg bg-sky-950 text-yellow-500">
                  <FcIdea />
                  <button className="md:px-2 pt-1" onClick={handleOpenFunFacts}>
                    Fun Facts
                  </button>
                  {isOpenFunFactModal && (
                    <Modal
                      modalName="Fun Facts"
                      data={
                        <div className="p-5 text-black rounded-md border bg-gray-200">
                          {parse(funFacts)}
                        </div>
                      }
                      handleCloseModal={() => dispatch(closeFunFactsModal())}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="group relative flex items-center space-x-2 rounded-full p-2 cursor-pointer bg-sky-950"
                  onClick={() => dispatch(openRecommendationModal())}
                >
                  <FcLike className="md:text-2xl" />

                  <span className="opacity-0 group-hover:opacity-100 absolute left-1/2 transform -translate-x-1/2 bottom-[-50px] text-white text-xs bg-sky-950  px-2 py-1 rounded-md shadow-md transition-opacity duration-300">
                    Add To Your Recommendations
                  </span>
                </button>
                {isOpenRecommendationModal && (
                  <Modal
                    modalName="Recommendation"
                    data={
                      <div className="flex justify-center w-full">
                        <form onSubmit={handleSubmitRecommendation}>
                          <div>
                            <label>Reason:</label>
                          </div>
                          <textarea
                            placeholder="Tell me why you recommend this movie ?"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="md:w-[400px] md:h-[200px] px-2 py-1 outline-none hover:outline-none border rounded-md"
                          ></textarea>
                          <div className="flex justify-center pt-2">
                            <button className="border rounded-md bg-sky-950 text-yellow-400 px-4 py-1">
                              Add Recomendation
                            </button>
                          </div>
                        </form>
                      </div>
                    }
                    handleCloseModal={() =>
                      dispatch(closeRecommendationModal())
                    }
                  />
                )}
              </div>
              <div className="md:pt-8 md:w-[900px] w-[300px] pt-4">
                <span className="lg:text-2xl md:text-xl text-base font-bold border-b-2">
                  Overview
                </span>
                <p className="lg:text-xl md:text-base text-sm pt-2">
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container md:pt-5 md:mx-auto md:flex hidden">
          <div className="text-2xl px-10 font-bold h-fit w-fit">CAST</div>
          <div className="md:overflow-x-auto md:p-4">
            <div className="md:flex md:space-x-4">
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
