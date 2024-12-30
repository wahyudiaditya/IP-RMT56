import { Outlet } from "react-router";
import HomeNavbar from "../components/navbar/HomeNavbar";

export default function HomeLayout() {
  return (
    <div>
      <HomeNavbar />
      <Outlet />
    </div>
  );
}
