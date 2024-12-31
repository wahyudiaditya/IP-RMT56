import PropTypes from "prop-types";
import { NavLink } from "react-router";

export default function Card({ movie }) {
  return (
    <div>
      {/* Card Product */}
      <NavLink to={`/products/${movie.id}`}>
        <div className="rounded-md shadow-md bg-white w-[184px] h-[294px] transition-transform duration-500 hover:scale-105">
          <div className="relative flex flex-col">
            <img
              src={movie.posterUrl}
              className="w-full h-[294px] rounded-md bg-black bg-opacity-10 object-cover"
              alt="name"
              srcSet=""
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
      </NavLink>
      {/* Card Product */}
    </div>
  );
}

Card.propTypes = {
  movie: PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    posterUrl: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    releaseDate: PropTypes.number.isRequired,
  }),
};
