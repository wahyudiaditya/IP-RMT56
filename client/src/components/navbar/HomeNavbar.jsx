import { NavLink, useNavigate } from "react-router";
import { swalError, swalSuccess } from "../../utils/swallAlert";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

export default function HomeNavbar() {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const content = (
    <>
      <div className="lg:hidden block absolute top-12 w-full left-0 right-0 bg-sky-950 transition">
        <ul className="text-center text-sm p-4 w-full">
          <NavLink>
            <li className="my-4 py-4 border-b border-sky-900 hover:bg-sky-900 hover:rounded-md">
              Home
            </li>
          </NavLink>
          <NavLink>
            <li className="my-4 py-4 border-b border-sky-900 hover:bg-sky-900 hover:rounded-md">
              Movie Recommendations
            </li>
          </NavLink>
          <NavLink>
            <li className="my-4 py-4 border-b border-sky-900 hover:bg-sky-900 hover:rounded-md">
              Profile
            </li>
          </NavLink>
          <NavLink>
            <li className="my-4 py-4 border-b border-sky-900 hover:bg-sky-900 hover:rounded-md">
              Logout
            </li>
          </NavLink>
        </ul>
      </div>
    </>
  );
  function handleLogout() {
    try {
      localStorage.removeItem("access_token");
      navigate("/login");
      swalSuccess("Logout Successfully");
    } catch (error) {
      console.log(error);
      swalError(error.response.data.message);
    }
  }
  return (
    <>
      <div className="md:h-[70px] h-[50px] bg-sky-950 text-white text-xl">
        <div className="flex items-center h-full container md:mx-auto w-full font-semibold">
          <div className="lg:text-4xl md:text-2xl text-base font-bold me-auto md:px-0 px-4 text-green-500">
            <NavLink to="/">MyRecMovie</NavLink>
          </div>
          <div className="md:flex md:w-full hidden">
            <div>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:border-b-2 hover:border-green-500 py-1 mx-5 ms-20 ${
                    isActive ? "text-green-500" : "text-white"
                  }`
                }
              >
                Home
              </NavLink>
            </div>
            <div className="flex text-end w-full mx-5">
              <NavLink
                to="/recomendations"
                className={({ isActive }) =>
                  `hover:border-b-2 hover:border-green-500 ${
                    isActive ? "text-green-500" : "text-white"
                  }`
                }
              >
                Movie Recommendations
              </NavLink>
            </div>
            <div className="hover:border-b-2 hover:border-green-500 mx-5">
              search
            </div>
            <div className="mx-5">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `hover:border-b-2 py-1 hover:border-green-500 ${
                    isActive ? "text-green-500" : "text-white"
                  }`
                }
              >
                Profile
              </NavLink>
            </div>
            <div className="mx-5">
              <button
                className="hover:border-b-2 border-b-2 border-transparent hover:border-green-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          <div>{click && content}</div>
          <button className="sm:hidden transiton px-4" onClick={handleClick}>
            {click ? <FaTimes /> : <CiMenuFries />}
          </button>
        </div>
      </div>
    </>
  );
}
