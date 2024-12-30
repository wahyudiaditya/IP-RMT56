import PropTypes from "prop-types";

export default function InputForm({
  type,
  classInput,
  placeholder,
  value,
  onChange,
  required,
  autoComplete,
}) {
  return (
    <div>
      <input
        type={type}
        className={classInput}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
      />
    </div>
  );
}

InputForm.propTypes = {
  type: PropTypes.string.isRequired,
  classInput: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
};
