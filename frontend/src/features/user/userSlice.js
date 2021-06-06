import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    //   [signupUser.fulfilled]: (state, { payload }) => {
    //     state.isFetching = false;
    //     state.isSuccess = true;
    //     state.email = payload.user.email;
    //     state.username = payload.user.name;
    //   },
    //   [signupUser.pending]: (state) => {
    //     state.isFetching = true;
    //   },
    //   [signupUser.rejected]: (state, { payload }) => {
    //     state.isFetching = false;
    //     state.isError = true;
    //     state.errorMessage = payload.message;
    //   },
  },
});

export const userSelector = (state) => state.user;

// export const signupUser = createAsyncThunk(
//   "users/signupUser",
//   async ({ name, email, password }, thunkAPI) => {
//     try {
//       const response = await fetch(
//         "https://mock-user-auth-server.herokuapp.com/api/v1/users",
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name,
//             email,
//             password,
//           }),
//         }
//       );
//       let data = await response.json();
//       console.log("data", data);

//       if (response.status === 200) {
//         localStorage.setItem("token", data.token);
//         return { ...data, username: name, email: email };
//       } else {
//         return thunkAPI.rejectWithValue(data);
//       }
//     } catch (e) {
//       console.log("Error", e.response.data);
//       return thunkAPI.rejectWithValue(e.response.data);
//     }
//   }
// );
