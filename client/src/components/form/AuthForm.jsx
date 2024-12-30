import PropTypes from "prop-types";
import googleLogo from "../../../public/img/google.svg";

export default function AuthForm({
  formType,
  handleSubmit,
  inputEmail,
  inputPassword,
  spanNeedRegister,
  buttonSubmit,
}) {
  return (
    <div>
      <div className="flex justify-center">
        <img
          src="/img/auth1.png"
          alt="myRecMovie"
          className="rounded-md w-[120px] block md:hidden"
        />
      </div>
      <div className="text-xl lg:text-4xl lg:pt-10 lg:w-full md:text-2xl md:w-[250px] flex items-center justify-center font-bold">
        {formType}
      </div>
      <form
        className="flex flex-col justify-center gap-2 md:w-64 pt-6 md:pb-0"
        onSubmit={handleSubmit}
      >
        <div className="py-2 mt-2 md:mt-0 lg:w-[240px] md:w-[180px]">
          <label htmlFor="inputEmail" className="lg:text-base  md:text-sm">
            Email
          </label>
          <div>{inputEmail}</div>
        </div>

        <div className="py-2 lg:w-[240px] md:w-[180px]">
          <label htmlFor="inputPassword" className="lg:text-base md:text-sm">
            Password
          </label>
          <div>{inputPassword}</div>
        </div>

        <div className="lg:pt-5 md:pt-3">{buttonSubmit}</div>

        <div className="lg:pt-4 lg:text-sm md:pt-1 md:text-sm mt-5 md:mt-0">
          {spanNeedRegister}
        </div>
      </form>
      <div className="mt-2 grid grid-cols-3 items-center text-gray-400 text-xs md:text-base">
        <hr className="border-gray-400" />
        <p className="text-center">OR</p>
        <hr className="border-gray-400" />
      </div>
      <div className="pt-2 md:pb-10 flex justify-center">
        <p className="flex items-center gap-1 text-sm md:text-xl md:font-semibold">
          <img src={googleLogo} alt="google logo" className="w-6 md:w-10" />
          oogle
        </p>
      </div>
    </div>
  );
}

AuthForm.propTypes = {
  formType: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  spanNeedRegister: PropTypes.element.isRequired,
  buttonSubmit: PropTypes.element.isRequired,
  inputEmail: PropTypes.element.isRequired,
  inputPassword: PropTypes.element.isRequired,
};
