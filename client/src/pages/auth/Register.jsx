import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import Button from "../../components/ui/Button";
import InputForm from "../../components/ui/InputForm";
import AuthForm from "../../components/form/AuthForm";
import { swalError } from "../../../helpers/swallToast";
import { useDispatch } from "react-redux";
import { register } from "../../features/auth/authSlice";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await dispatch(register(email, password));

      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.log(error);
      swalError(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="flex min-h-screen bg-gray-200 max-w-full items-center justify-center">
        <div className="flex rounded-md bg-slate-100 md:shadow-lg md:max-w-5xl">
          <div className="lg:w-1/2 lg:h-full md:h-[400px] md:w-[300px] hidden md:block">
            <img
              src="/img/auth1.png"
              className="rounded-l-md h-full"
              alt="Login Picture"
            />
          </div>

          <div className="lg:w-1/2 flex justify-center lg:h-full p-5 md:h-[400px] md:w-[300px] w-full">
            <AuthForm
              formType="Register"
              handleSubmit={handleRegister}
              inputEmail={
                <InputForm
                  type="email"
                  classInput="bg-transparent w-full min-w-[222px] text-xs lg:text-base md:text-sm hover:outline-none outline-none border-b border-gray-400"
                  placeholder="enter your email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              }
              inputPassword={
                <InputForm
                  type="password"
                  classInput="bg-transparent w-full text-xs lg:text-base md:text-sm hover:outline-none outline-none border-b border-gray-400"
                  placeholder="enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              }
              buttonSubmit={
                <Button
                  classButton="md:px-6 w-full px-4 lg:py-2 bg-yellow-400 rounded-md lg:text-base text-sm font-semibold text-black py-1"
                  buttonName="Register"
                />
              }
              spanNeedRegister={
                <span className="text-xs md:text-sm lg:text-base ">
                  Already have Account ?{" "}
                  <NavLink to="/login" className="font-semibold">
                    Login
                  </NavLink>{" "}
                  here
                </span>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
