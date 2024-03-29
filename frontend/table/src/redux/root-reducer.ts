import { combineReducers } from '@reduxjs/toolkit';
import { coursesData } from './courses-data/courses-data';
import { themesData } from './themes-data/themes-data';
import { usersData } from './users-page-data/users-page-data';
import { knowledgesData } from './knowledges-data/knowledges-data';
import { quantumsData } from './quntums-data/quantums-data';
import { targetsData } from './targets-data/targets-data';
import { authProcess } from './auth-actions/auth-proccess';
import { changeData } from './change-data/change-data';
import { NameSpace } from '../const';

export const rootReducer = combineReducers({
  [NameSpace.COURSES]: coursesData.reducer,
  [NameSpace.THEMES]: themesData.reducer,
  [NameSpace.KNOWLEDGES]: knowledgesData.reducer,
  [NameSpace.QUANTUMS]: quantumsData.reducer,
  [NameSpace.TARGETS]: targetsData.reducer,
  [NameSpace.AUTH]: authProcess.reducer,
  [NameSpace.DATA]: changeData.reducer,
  [NameSpace.USERS]: usersData.reducer,
});
