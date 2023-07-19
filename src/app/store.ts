import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../features/page/pageSlice";
import usersReducer from "../features/users/usersSlice";
import modalsReducer from "../features/modals/modalsSlice";

export const store = configureStore({
  reducer: {
    page: pageReducer,
    users: usersReducer,
    modals: modalsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
