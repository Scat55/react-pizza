import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice.ts';
import cart from './slices/cartSlice.ts'

export const store = configureStore({
  reducer: { filter, cart },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
