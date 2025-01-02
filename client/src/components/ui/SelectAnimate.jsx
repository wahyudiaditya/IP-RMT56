import Select from "react-select";
import makeAnimated from "react-select/animated";
import PropTypes from "prop-types";

export default function SelectAnimate({ data, value, className, onChange }) {
  const animatedComponents = makeAnimated();
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      value={value}
      isMulti
      options={data}
      className={className}
      onChange={onChange}
    />
  );
}

SelectAnimate.propTypes = {
  value: PropTypes.array,
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
};
