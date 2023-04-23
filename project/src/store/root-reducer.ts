import { combineReducers } from '@reduxjs/toolkit';
import { appData } from './app-data/app-data';
import { mainProcess } from './main-process/main-process';
import { userProcess } from './user-process/user-process';
import { SliceNameSpace } from '../const';

export const rootReducer = combineReducers({
  [SliceNameSpace.Data]: appData.reducer,
  [SliceNameSpace.Main]: mainProcess.reducer,
  [SliceNameSpace.User]: userProcess.reducer,
});
