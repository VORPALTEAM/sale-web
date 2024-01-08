import { configureStore } from '@reduxjs/toolkit';
import { RootReducer } from './reducer';

const store = configureStore({
  reducer: RootReducer,
});

export default store;