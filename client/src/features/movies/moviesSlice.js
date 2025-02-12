import { createSlice } from "@reduxjs/toolkit";
import { swalError, swalSuccess } from "../../utils/swallAlert";
import Swal from "sweetalert2";
import { myRecMovie } from "../../utils/http-client";
import { closeRecommendationModal } from "../components/modalSlice";

export const moivesSlice = createSlice({
  name: "movies",
  initialState: {
    list: {
      data: [],
      totalPages: 0,
    },
    movie: {
      movie: {},
      cast: [],
    },
    funFacts: "",
    loading: false,
  },
  reducers: {
    setMovies: (state, action) => {
      state.list.data = action.payload;
    },
    setTotalPages: (state, action) => {
      state.list.totalPages = action.payload;
    },
    setMovie: (state, action) => {
      state.movie = action.payload;
    },
    setFunFacts: (state, action) => {
      state.funFacts = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setMovies, setTotalPages, setMovie, setFunFacts, setLoading } =
  moivesSlice.actions;

export const fetchMovies = (page, query) => {
  return async (dispatch) => {
    if (query < 3) {
      Swal.fire({
        title: "Getting Movies",
        html: "Please wait ...",
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    try {
      const { data } = await myRecMovie.get("movies", {
        params: {
          query,
          page: page.toString(),
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      dispatch(setMovies(data.results));
      dispatch(setTotalPages(data.totalPages));
    } catch (error) {
      console.log(error);
      swalError(error.response.data.message);
    } finally {
      if (!query) {
        Swal.close();
      }
    }
  };
};

export const fetchMovie = (id) => {
  return async (dispatch) => {
    Swal.fire({
      title: "Getting Movies",
      html: "Please wait ...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    dispatch(setLoading(true));
    try {
      const { data } = await myRecMovie.get(`movies/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      dispatch(setMovie(data));
    } catch (error) {
      console.log(error);
      swalError(error.response.data.message);
    } finally {
      Swal.close();
      dispatch(setLoading(false));
    }
  };
};

export const fetchFunFacts = (id) => {
  return async (dispatch) => {
    Swal.fire({
      title: "Getting Fun Facts By AI",
      html: "Please wait ...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const { data } = await myRecMovie.get(`movies/funFacts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      dispatch(setFunFacts(data));
    } catch (error) {
      swalError(error.response.data.message);
    } finally {
      Swal.close();
    }
  };
};
export const submitRecommendation = (movieId, reason) => {
  return async (dispatch) => {
    await myRecMovie.post(
      `recommendations/${movieId}`,
      {
        reason,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    swalSuccess("Success add Movie to Your Recommendation");
    dispatch(closeRecommendationModal());
  };
};

export const deleteRecommendation = (movieId) => {
  return async () => {
    await myRecMovie.delete(`recommendations/${movieId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    swalSuccess("Success Delete Recommendation");
  };
};

export default moivesSlice.reducer;
