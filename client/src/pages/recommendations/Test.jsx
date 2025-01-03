import { useDispatch, useSelector } from "react-redux";
import { fetchUsersRecommendations } from "../../features/recommendations/recommendationsSlice";
import { useEffect, useState } from "react";
import { myRecMovie } from "../../utils/http-client";
import { swalError } from "../../utils/swallAlert";

export default function Test() {
  const usersRecs = useSelector((state) => state.recommendation);
  const dispatch = useDispatch();

  //   const [user, setUser] = useState([]);

  //   async function fetchData() {
  //     try {
  //       const { data } = await myRecMovie.get("recommendations/users", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //         },
  //       });
  //       console.log(data.users, "ini apaan ?");
  //       //   setUser(response);
  //     } catch (error) {
  //       swalError(error.response.data.message);
  //     }
  //   }

  useEffect(() => {
    dispatch(fetchUsersRecommendations());
  }, []);

  console.log(usersRecs);

  return <div>{usersRecs}</div>;
}
