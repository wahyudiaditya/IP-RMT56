import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, submitUpdateProfile } from "../../features/user/userSlice";
import { fetchUserRecommendations } from "../../features/recommendations/recommendationsSlice";
import Modal from "../../components/form/Modal";
import {
  closeUpdateProfileModal,
  openUpdateProfileModal,
} from "../../features/components/modalSlice";
import { swalError, swalSuccess } from "../../utils/swallAlert";
import SelectAnimate from "../../components/ui/SelectAnimate";

export default function UserProfile() {
  const user = useSelector((state) => state.user.data);
  const recommendations = useSelector(
    (state) => state.recommendations.userRecommendations
  );
  const isOpenUpdateModal = useSelector(
    (state) => state.modal.modalUpdateProfile
  );
  const [name, setName] = useState("");
  const [actors, setActors] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const dispatch = useDispatch();
  let genres;
  if (selectedOption && Array.isArray(selectedOption)) {
    const getGenre = selectedOption?.map((option) => option?.value);
    if (getGenre.length > 1) {
      genres = getGenre.join(",");
    } else {
      genres = getGenre[0];
    }
  }

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(submitUpdateProfile(name, profilePicture, actors, genres));
      await dispatch(fetchUser());
      dispatch(closeUpdateProfileModal());
      swalSuccess("Success to Update Profile");
    } catch (error) {
      swalError(error.response.data.message);
    }
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    dispatch(fetchUserRecommendations());
  }, []);

  const preference = user.Preference;

  const handleOpenUpdateModal = () => {
    dispatch(openUpdateProfileModal());
    if (user.name) setName(user.name);
    if (user.profilePicture) setProfilePicture(user.profilePicture);
    if (preference.favoriteActors) setActors(preference?.favoriteActors);
    if (preference.favoriteGenres) {
      const genre = preference.favoriteGenres.split(",").map((el) => {
        return {
          value: el,
          label: el,
        };
      });
      setSelectedOption(genre);
    }
  };

  const data = [
    { value: "Action", label: "Action" },
    { value: "Adventure", label: "Adventure" },
    { value: "Animation", label: "Animation" },
    { value: "Comedy", label: "Comedy" },
    { value: "Crime", label: "Crime" },
    { value: "Documentary", label: "Documentary" },
    { value: "Drama", label: "Drama" },
    { value: "Family", label: "Family" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "History", label: "History" },
    { value: "Horror", label: "Horror" },
    { value: "Music", label: "Music" },
    { value: "Mystery", label: "Mystery" },
    { value: "Romance", label: "Romance" },
    { value: "Science Fiction", label: "Science Fiction" },
    { value: "TV Movie", label: "TV Movie" },
    { value: "Thriller", label: "Thriller" },
    { value: "War", label: "War" },
    { value: "Western", label: "Western" },
  ];

  return (
    <>
      <div className="flex justify-center xl:h-full h-full min-h-svh items-center">
        <div className="rounded shadow-md bg-whitemt-5 mb-5 w-[900px]">
          <div className="flex flex-wrap -mx-2 h-full w-full items-center p-10">
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
                  {user.name ? (
                    <span className="ms-5">{user.name}</span>
                  ) : (
                    <span className="ms-5">-</span>
                  )}
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
                  <ul className="ms-5">
                    {recommendations?.length == 0 ? (
                      <span className="ms-5">-</span>
                    ) : (
                      recommendations.map((el, index) => (
                        <li key={el.id}>
                          {index + 1}. {el.Movie?.title}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              <div className="pt-4 flex justify-center gap-4">
                <button
                  className="bg-sky-500 px-2 py-1 rounded-md text-white"
                  onClick={handleOpenUpdateModal}
                >
                  Update Profile
                </button>
                {isOpenUpdateModal && (
                  <Modal
                    modalName="Update Profile"
                    handleCloseModal={() => dispatch(closeUpdateProfileModal())}
                    data={
                      <div>
                        <div className="flex justify-center w-full">
                          <form onSubmit={handleSubmitUpdate}>
                            <div>
                              <label>Name :</label>
                            </div>
                            <input
                              type="text"
                              placeholder="enter your name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="px-2 py-1 w-[400px] outline-none hover:outline-none border"
                            />
                            <div className="pt-2">
                              <label>Profile Picture Url :</label>
                            </div>
                            <input
                              type="url"
                              placeholder="enter profile picture url"
                              value={profilePicture}
                              onChange={(e) =>
                                setProfilePicture(e.target.value)
                              }
                              className="px-2 py-1 w-[400px] outline-none hover:outline-none border"
                            />
                            <div className="pt-2">
                              <label>Actors :</label>
                            </div>
                            <input
                              type="text"
                              placeholder="enter actors name"
                              value={actors}
                              onChange={(e) => setActors(e.target.value)}
                              className="px-2 py-1 w-[400px] outline-none hover:outline-none border"
                            />
                            <div className="pt-2">
                              <label>Genres :</label>
                            </div>
                            <SelectAnimate
                              value={selectedOption}
                              data={data}
                              className="px-2 py-1 w-[400px] outline-none hover:outline-none border"
                              onChange={(selectedOption) =>
                                setSelectedOption(selectedOption)
                              }
                            />
                            <div className="flex justify-center pt-8">
                              <button className="border rounded-md bg-sky-950 text-yellow-400 px-4 py-1">
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
