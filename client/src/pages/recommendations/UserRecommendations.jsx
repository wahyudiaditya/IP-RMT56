// import { useEffect, useState } from "react";
// import { FaHeart } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteRecommendation,
//   submitRecommendation,
// } from "../../features/movies/moviesSlice";
// import { swalError } from "../../utils/swallAlert";
// import Modal from "../../components/form/Modal";
// import {
//   closeRecommendationModal,
//   openRecommendationModal,
// } from "../../features/components/modalSlice";
// import { fetcUsersRecommendations } from "../../features/recommendations/recommendationsSlice";

// export default function UserRecommendations() {
//   const usersRecs = useSelector(
//     (state) => state.recommendation.usersRecommendations
//   );
//   // const isOpenRecommendationModal = useSelector(
//   //   (state) => state.modal.modalRecommendationOpen
//   // );
//   // const [reason, setReason] = useState("");

//   const dispatch = useDispatch();
//   // const handleSubmitRecommendation = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     await dispatch(submitRecommendation(movieId, reason));
//   //     setReason("");
//   //     dispatch(fetcUsersRecommendations());
//   //   } catch (error) {
//   //     swalError(error.response.data.message);
//   //   }
//   // };

//   // const handleDeleteRecommendation = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     await dispatch(deleteRecommendation(movieId));
//   //     dispatch(fetchUserRecommendations());
//   //   } catch (error) {
//   //     swalError(error.response.data.message);
//   //   }
//   // };

//   useEffect(() => {
//     dispatch(fetcUsersRecommendations());
//   }, []);

//   // console.log(usersRecs, "ini dapet gasih ?");

//   // let recommendation = false;

//   // if (user.Recomendations && user.Recomendations.length > 0) {
//   //   recommendation = user.Recomendations.some((el) => el.MovieId == id);
//   // }

//   // if (isLoading) {
//   //   return <></>;
//   // }

//   return (
//     <>
//       <div className="container mx-auto mt-20 md:w-[1200px]">
//         {/* Main Content */}
//         <div className="rounded-md p-5 bg-gray-200">
//           {/* Header */}
//           <div className="flex">
//             <div className="me-auto flex items-center ">
//               <h1 className="text-2xl font-bold border-b-2 border-black">
//                 Users Recommendations
//               </h1>
//             </div>
//             <div>
//               {/* Button add */}
//               <button
//                 id="open-add-btn"
//                 className="border text-white bg-red-500 px-2 py-2 flex items-center rounded-md"
//               >
//                 <i className="bi bi-bag-plus text-xl px-2 " />
//                 Add Product
//               </button>
//               {/* Button add */}
//             </div>
//           </div>
//           {/* Header */}

//           {/* Hero */}
//           <div className="pt-16 ">
//             <table className="table-auto h-[150px] text-center">
//               <thead>
//                 <tr>
//                   <th className="w-10">No.</th>
//                   <th className="w-40 text-center px-2">Name</th>
//                   <th className="text-center w-full">Movies</th>
//                 </tr>
//               </thead>

//               <tbody className="max-h-[150px]">
//                 <tr className="border-t max-h-[150px]">
//                   <td className="w-10 text-center font-bold">
//                     <p>1</p>
//                   </td>
//                   <td>
//                     <p className="w-40 px-4 text-sm line-clamp-3">
//                       Userasdsadasdasdasdasdasdasdsadasdasdasdsadsadsadsadsasdsada
//                       sdsa das das das asd asd adsa das sada
//                     </p>
//                   </td>
//                   {/* {isOpenRecommendationModal && (
//                     <Modal
//                       modalName="Recommendation"
//                       data={
//                         <div className="flex justify-center w-full">
//                           <form onSubmit={handleSubmitRecommendation}>
//                             <div>
//                               <label>Reason:</label>
//                             </div>
//                             <textarea
//                               placeholder="Tell me why you recommend this movie?"
//                               value={reason}
//                               onChange={(e) => setReason(e.target.value)}
//                               className="md:w-[400px] md:h-[200px] px-2 py-1 outline-none hover:outline-none border rounded-md"
//                             ></textarea>
//                             <div className="flex justify-center pt-2">
//                               <button className="border rounded-md bg-sky-950 text-yellow-400 px-4 py-1">
//                                 Add Recommendation
//                               </button>
//                             </div>
//                           </form>
//                         </div>
//                       }
//                       handleCloseModal={() =>
//                         dispatch(closeRecommendationModal())
//                       }
//                     />
//                   )}
//                   <td>
//                     <div className="md:overflow-x-auto md:p-4">
//                       <div className="lg:w-20 md:flex md:space-x-4">
//                         <div className="w-full">
//                           <img
//                             src=" https://image.tmdb.org/t/p/w500/1sQA7lfcF9yUyoLYC0e6Zo3jmxE.jpg"
//                             className="w-full rounded-md bg-black bg-opacity-10 object-cover"
//                             alt="name"
//                           />
//                           {!recommendation ? (
//                             <>
//                               <button
//                                 className="p-2 lg:w-20"
//                                 onClick={() =>
//                                   dispatch(openRecommendationModal(id))
//                                 }
//                               >
//                                 <FaHeart className="md:text-xl w-full text-center text-white" />
//                               </button>
//                             </>
//                           ) : (
//                             <>
//                               <button
//                                 className="group relative flex items-center space-x-2 rounded-full p-2 cursor-pointer bg-sky-950"
//                                 onClick={handleDeleteRecommendation(movieId)}
//                               >
//                                 <FaHeart className="md:text-2xl text-red-500" />
//                                 <span className="opacity-0 group-hover:opacity-100 absolute left-1/2 transform -translate-x-1/2 bottom-[-50px] text-white text-xs bg-sky-950  px-2 py-1 rounded-md shadow-md transition-opacity duration-300">
//                                   Remove Your Recommendations
//                                 </span>
//                               </button>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </td> */}
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           {/* Hero */}
//         </div>
//         {/* Main Content */}
//       </div>
//     </>
//   );
// }
