import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UnAuthLayout from "./layouts/UnAuthLayout";
import Homepage from "./pages/home/Homepage";
import AuthLayout from "./layouts/AuthLayout";
import HomeLayout from "./layouts/HomeLayout";
import MovieDetail from "./pages/movies/MovieDetail";
import UserProfile from "./pages/user/UserProfile";
// import UserRecommendations from "./pages/recommendations/UserRecommendations";
import Test from "./pages/recommendations/test";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<UnAuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/recommendations" element={<Test />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
