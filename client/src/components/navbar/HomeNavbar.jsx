import { NavLink, useNavigate } from "react-router";
import { swalError, swalSuccess } from "../../utils/swallAlert";

export default function HomeNavbar() {
  const navigate = useNavigate();
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
      <div className="h-[87px] bg-sky-950 text-white text-xl">
        <div className="flex items-center h-full container mx-auto font-semibold">
          <div className="text-4xl font-bold text-green-500">
            <NavLink to="/">MyRecMovie</NavLink>
          </div>
          <div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:border-b-2 hover:border-green-500 mx-5 ms-20 ${
                  isActive ? "text-green-500" : "text-white"
                }`
              }
            >
              Home
            </NavLink>
          </div>
          <div className="me-auto mx-5">
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
                `hover:border-b-2 hover:border-green-500 ${
                  isActive ? "text-green-500" : "text-white"
                }`
              }
            >
              Profile
            </NavLink>
          </div>
          <div className="mx-5">
            <button
              className="hover:border-b-2 hover:border-green-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
