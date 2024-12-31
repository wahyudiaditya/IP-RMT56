import { createSlice } from "@reduxjs/toolkit";
import { swalError } from "../../utils/swallAlert";
import Swal from "sweetalert2";
import { myRecMovie } from "../../utils/http-client";

export const moivesSlice = createSlice({
  name: "movies",
  initialState: {
    list: {
      data: [],
      totalPages: 0,
    },
    movie: {},
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
  },
});

export const { setMovies, setTotalPages, setMovie } = moivesSlice.actions;

export const fetchMovies = (page) => {
  return async (dispatch) => {
    Swal.fire({
      title: "Getting Movies",
      html: "Please wait ...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const { data } = await myRecMovie.get("movies", {
        params: {
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
      Swal.close();
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
    }
  };
};

export default moivesSlice.reducer;
