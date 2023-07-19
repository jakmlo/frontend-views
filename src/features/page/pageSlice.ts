import { createSlice } from "@reduxjs/toolkit";

export interface PageState {
  page: number;
}

const initialState: PageState = {
  page: 0,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    increment: (state) => {
      state.page += 1;
    },
    decrement: (state) => {
      state.page -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement } = pageSlice.actions;

export default pageSlice.reducer;
