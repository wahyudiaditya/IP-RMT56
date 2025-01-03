import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsersRecommendations } from "../../features/recommendations/recommendationsSlice";
import { NavLink } from "react-router";

export default function UserRecommendations() {
  const usersRecs = useSelector(
    (state) => state.recommendations.usersRecommendations
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersRecommendations());
  }, []);

  return (
    <>
      <div className="container mx-auto mt-20 md:w-[1200px]">
        {/* Main Content */}
        <div className="rounded-md p-5 bg-gray-200">
          {/* Header */}
          <div className="flex">
            <div className="me-auto flex items-center ">
              <h1 className="text-2xl font-bold border-b-2 border-black">
                Users Recommendations
              </h1>
            </div>
          </div>
          {/* Header */}

          {/* Hero */}
          <div className="pt-16 ">
            <table className="table-auto h-[150px] text-center">
              <thead>
                <tr>
                  <th className="w-10">No.</th>
                  <th className="w-40 text-center px-2">Name</th>
                  <th className="text-center w-full">Movies</th>
                </tr>
              </thead>

              <tbody className="max-h-[150px]">
                {usersRecs.map((user) => (
                  <tr key={user.id} className="border-t max-h-[150px]">
                    <td className="w-10 text-center font-bold">
                      <p>{user.id}</p>
                    </td>
                    <td>
                      <p className="w-40 px-4 text-sm line-clamp-3">
                        {user.name}
                      </p>
                    </td>
                    {user.Recomendations?.map((rec) => (
                      <NavLink key={rec.id} to={`/movie/${rec.MovieId}`}>
                        <td>
                          <div className="md:overflow-x-auto md:p-4">
                            <div className="lg:w-20 md:flex md:space-x-4">
                              <div className="w-full">
                                <img
                                  src={rec.Movie.posterUrl}
                                  className="w-full rounded-md bg-black bg-opacity-10 object-cover"
                                  alt="name"
                                />
                                <p className="text-sm">{rec.Movie.title}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </NavLink>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Hero */}
        </div>
        {/* Main Content */}
      </div>
    </>
  );
}
