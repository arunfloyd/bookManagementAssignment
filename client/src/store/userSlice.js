import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setUserEmail } = userSlice.actions;
export default userSlice.reducer;
