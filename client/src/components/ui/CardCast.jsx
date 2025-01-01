import PropTypes from "prop-types";

export default function CardCast({ cast }) {
  return (
    <div>
      <div className="rounded-md shadow-md bg-white w-[170px] h-[260px]">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${cast?.posterUrl}`}
            className="w-full h-[184px] rounded-t-md object-cover "
            alt={cast.name}
            srcSet=""
          />
        </div>
        <div className="ps-2 pt-4 text-sm">
          <p className="font-bold">{cast.name}</p>
          <p className="font-semibold pt-1">{cast.character}</p>
        </div>
      </div>
    </div>
  );
}

CardCast.propTypes = {
  cast: PropTypes.exact({
    posterUrl: PropTypes.string,
    name: PropTypes.string,
    character: PropTypes.string,
  }),
};
