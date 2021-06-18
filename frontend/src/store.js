import { configureStore } from "@reduxjs/toolkit";

import { userSlice} from "./features/user/userSlice";
import counterReducer from "./features/counter/counterSlice";

export default configureStore({
  reducer: {
    // user: userSlice.reducer,
    counter: counterReducer 
  }
});

