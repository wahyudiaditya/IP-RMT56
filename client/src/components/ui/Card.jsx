// import PropTypes from "prop-types";
import { NavLink } from "react-router";

export default function Card({ product }) {
  return (
    <div>
      {/* Card Product */}
      <NavLink to={`/products/2`}>
        <div className="rounded-md shadow-md bg-white w-[184px] h-[294px] transition-transform duration-500 hover:scale-105">
          <div>
            <img
              src="img"
              className="w-full h-[184px] rounded-t-md object-cover"
              alt="name"
              srcSet=""
            />
          </div>
          <div className="ps-2 pt-4 text-sm">
            <p className="truncate">name</p>
            <p className="font-semibold pt-1">price</p>
            <p className="pt-3">Stock</p>
          </div>
        </div>
      </NavLink>
      {/* Card Product */}
    </div>
  );
}

// Card.propTypes = {
//   product: PropTypes.exact({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     imgUrl: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     stock: PropTypes.number.isRequired,
//   }),
// };
