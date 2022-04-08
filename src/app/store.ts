import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ProductReducer from "../reducer/ProductReducer";

export const store = configureStore({
  reducer: {
      productReducer: ProductReducer,
  },
});

const next = store.dispatch
store.dispatch = function dispatchAndLog(action: any) {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
