import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../features/user/userSlice";

export default function UserProfile() {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const preference = user.Preference;

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  console.log(user, "ini user");

  return (
    <>
      <div className="flex justify-center xl:h-full h-full min-h-svh items-center">
        <div className="rounded shadow-md bg-whitemt-5 mb-5 w-[900px] h-[400px]">
          <div className="flex flex-wrap -mx-2 h-full w-full items-center">
            <div className="md:w-3/12 px-2 ">
              <div className="flex flex-col items-center text-center p-3 py-5">
                <img
                  className="rounded-full mt-5"
                  width="150px"
                  src={user?.profilePicture}
                />
                {user.email ? (
                  <span className="text-black">{user.email}</span>
                ) : (
                  <span className="text-black">-</span>
                )}
              </div>
            </div>
            <div className="md:w-8/12 px-2 border-l-2">
              <div className="p-3 py-5">
                <div className="flex mb-3">
                  <h4 className="text-right font-bold text-2xl border-b-4 border-red-500">
                    My Profile
                  </h4>
                </div>
                <div className="flex mb-3">
                  <span className="label" style={{ width: 144 }}>
                    Name{" "}
                  </span>
                  <span className="ms-5">{user.name}</span>
                </div>
                {preference ? (
                  <>
                    <div className="flex mb-3">
                      <span className="label" style={{ width: 144 }}>
                        Favorite Genres{" "}
                      </span>
                      <span className="ms-5">{preference.favoriteGenres}</span>
                    </div>
                    <div className="flex mb-3">
                      <span className="label" style={{ width: 144 }}>
                        Favorite Actors{" "}
                      </span>
                      <span className="ms-5">{preference.favoriteActors}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex mb-3">
                      <span className="label" style={{ width: 144 }}>
                        Favorite Genres{" "}
                      </span>
                      <span className="ms-5">-</span>
                    </div>
                    <div className="flex mb-3">
                      <span className="label" style={{ width: 144 }}>
                        Favorite Actors{" "}
                      </span>
                      <span className="ms-5">-</span>
                    </div>
                  </>
                )}
                <div className="flex mb-3">
                  <span className="label" style={{ width: 144 }}>
                    Recommendations{" "}
                  </span>
                  <span className="ms-5">gender</span>
                </div>
              </div>
              <div className="pt-4 flex justify-center gap-4">
                <button className="bg-sky-500 px-2 py-1 rounded-md text-white">
                  Update Profile
                </button>
                <button className="bg-yellow-400 px-2 rounded-md">
                  Update Recommendations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
