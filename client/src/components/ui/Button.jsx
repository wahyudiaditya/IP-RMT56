import PropTypes from "prop-types";

export default function Button({
  classButton,
  buttonName,
  handleOnclickButton,
}) {
  return (
    <>
      <button
        className={classButton}
        type="submit"
        onClick={handleOnclickButton}
      >
        {buttonName}
      </button>
    </>
  );
}

Button.propTypes = {
  classButton: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  handleOnclickButton: PropTypes.func,
};
