import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function Card({ movie }) {
  const isDetail = useSelector((state) => state.card.detail);

  return (
    <div>
      <div
        className={`rounded-md shadow-md bg-white ${
          isDetail
            ? "md:w-[300px] md:h-[450px] w-[250px] h-[400px]"
            : "w-[184px] h-[294px] transition-transform duration-500 hover:scale-105"
        }`}
      >
        <div className="relative flex flex-col">
          <img
            src={movie.posterUrl}
            className={`w-full rounded-md bg-black bg-opacity-10 object-cover ${
              isDetail ? "md:h-[450px] h-[400px]" : "h-[294px]"
            }`}
            alt="name"
          />
          <div className="absolute bottom-0 left-0 w-full rounded-b-md pt-40 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-3 text-white text-sm">
            <p className="truncate text-lg">{movie.title}</p>
            <div className="flex">
              <p className="bg-yellow-400 text-black pt-1 rounded-md px-2">
                {movie.rating}
              </p>
              <p className="px-3 pt-1">{movie.releaseDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  movie: PropTypes.exact({
    title: PropTypes.string,
    posterUrl: PropTypes.string,
    rating: PropTypes.string,
    releaseDate: PropTypes.number,
  }),
};
