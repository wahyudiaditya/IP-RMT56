import PropTypes from "prop-types";

export default function StarRating({ rating }) {
  if (!rating) {
    return "-";
  }
  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 >= 1;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const stars = [
    ...Array(fullStars).fill("full"),
    ...Array(halfStar).fill("half"),
    ...Array(emptyStars).fill("empty"),
  ];

  return (
    <div className="flex items-center">
      {stars.map((star, index) => (
        <span
          key={index}
          className={`text-yellow-500 ${star === "half" ? "opacity-50" : ""}`}
        >
          {star === "full" ? "★" : star === "half" ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number,
};
