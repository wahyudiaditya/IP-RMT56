import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, submitUpdateProfile } from "../../features/user/userSlice";
import { fetchUserRecommendations } from "../../features/recommendations/recommendationsSlice";
import Modal from "../../components/form/Modal";
import { closeUpdateProfileModal } from "../../features/components/modalSlice";
import { swalError } from "../../utils/swallAlert";

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
  const [genres, setGenres] = useState("");
  const dispatch = useDispatch();

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(submitUpdateProfile(name, actors, genres));
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
                <button className="bg-sky-500 px-2 py-1 rounded-md text-white">
                  Update Profile
                </button>
                {/* {isOpenUpdateModal && (
                  <Modal
                    modalName="Update Profile"
                    handleCloseModal={() => dispatch(closeUpdateProfileModal())}
                    data={
                      <div>
                        <div className="flex justify-center w-full">
                          <form onSubmit={handleSubmitUpdate}>
                            <div>
                              <label>Reason:</label>
                            </div>
                            <textarea
                              placeholder="Tell me why you recommend this movie?"
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                              className="md:w-[400px] md:h-[200px] px-2 py-1 outline-none hover:outline-none border rounded-md"
                            ></textarea>
                            <div className="flex justify-center pt-2">
                              <button className="border rounded-md bg-sky-950 text-yellow-400 px-4 py-1">
                                Add Recommendation
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    }
                  />
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
