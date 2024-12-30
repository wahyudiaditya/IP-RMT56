import { NavLink } from "react-router";

export default function HomeNavbar() {
  return (
    <>
      <div className="h-[87px] bg-white text-black border-b border-gray-200">
        <div className="flex items-center h-full container mx-auto font-semibold">
          <div className="text-4xl font-bold text-green-500">
            <h1>MyRecMovie</h1>
          </div>
          <div className="hover:border-b-2 hover:border-green-500 mx-5 ms-20">
            <NavLink to="/">Home</NavLink>
          </div>
          <div className="hover:border-b-2 hover:border-green-500 mx-5 me-auto">
            <NavLink to="/">Movie Recommendations</NavLink>
          </div>
          <div className="hover:border-b-2 hover:border-green-500 mx-5">
            search
          </div>
          <div className="hover:border-b-2 hover:border-green-500 mx-5">
            <button>Profile</button>
          </div>
          <div className="hover:border-b-2 hover:border-green-500 mx-5">
            <button>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}
