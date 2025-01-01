import PropTypes from "prop-types";

export default function CardCast({ cast }) {
  return (
    <div>
      <div className="rounded-md shadow-md bg-white md:w-[170px] md:h-[260px] w-28 h-[130px]">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${cast?.posterUrl}`}
            className="w-full md:h-[184px] h-[100px] rounded-t-md object-cover "
            alt={cast.name}
            srcSet=""
          />
        </div>
        <div className="ps-2 md:pt-4 md:text-sm text-xs">
          <p className="font-bold">{cast.name}</p>
          <p className="font-semibold md:pt-1 truncate">{cast.character}</p>
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
