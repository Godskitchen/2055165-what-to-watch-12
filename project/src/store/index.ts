import {configureStore} from '@reduxjs/toolkit';
import { createAPI } from '../services/serverApi';
import { redirect } from './middlewares/redirect';
import { rootReducer } from './root-reducer';

export const serverApi = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({thunk: {extraArgument: serverApi}}).concat(redirect)
});
