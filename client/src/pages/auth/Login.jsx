import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { myRecMovie } from "../../../helpers/http-client";
import AuthForm from "../../components/form/AuthForm";
import InputForm from "../../components/ui/InputForm";
import Button from "../../components/ui/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await myRecMovie.post("login", {
        email,
        password,
      });
      localStorage.setItem("access_token", data.access_token);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Login Successfully",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  };
  return (
    <div>
      <div className="flex min-h-screen bg-gray-200 max-w-full items-center justify-center">
        <div className="flex rounded-md bg-slate-100 md:shadow-lg md:max-w-5xl ">
          <div className="lg:w-1/2 lg:h-full md:h-[400px] md:w-[300px] hidden md:block lg:block">
            <img
              src="/img/auth1.png"
              className="rounded-l-md h-full"
              alt="Login Picture"
            />
          </div>

          <div className="lg:w-1/2 flex justify-center lg:h-full p-5 md:h-[400px] md:w-[300px] w-full">
            <AuthForm
              formType="Login"
              handleSubmit={handleLogin}
              inputEmail={
                <InputForm
                  type="email"
                  classInput="bg-transparent w-full text-xs lg:text-base md:text-sm hover:outline-none outline-none border-b border-gray-400"
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
                  buttonName="Login"
                />
              }
              spanNeedRegister={
                <span className="text-xs md:text-sm lg:text-base">
                  You not have account yet ?{" "}
                  <NavLink to="/register" className="font-semibold">
                    Register
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