import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State, AllData, Entity } from '../../types/types';
import { Row, TypeConnections } from '../../types/types';
import { APIRoute, NameSpace, EntityType } from '../../const';
import actions from './courses-data';
import { getAddMenu } from '../../pages/courses-table/get-add-menu';
import { dispatchActions } from '../../utils/dispatch-actions';
import { makeRows } from '../../utils/make-rows';
import { filterTypeConnections } from '../../utils/get-type-connections';

export const fetchCourses = createAsyncThunk<Row[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  `${NameSpace.COURSES}/fetchData`,
  async (_arg, {dispatch, extra: api, getState}) => {
    const courses = await api.get<Entity[]>(`${APIRoute.Entities}${APIRoute.List}/${EntityType.Course}?limit=1000`);
    const {data} = await api.get<AllData>(`${APIRoute.Courses}${APIRoute.All}`);
    const typeConnections = await api.get<TypeConnections[]>(`${APIRoute.TypeConnections}${APIRoute.List}`);
    
    const connectionNumber = getState().COURSES.connectionNumber;
    const types = filterTypeConnections({
      typeConnections: typeConnections.data,
      entityType: EntityType.Course
    });
    
    dispatchActions({
      connectionNumber,
      entityType: EntityType.Course,
      dispatch,
      types,
      actions: {
        changeNameColumn: actions.changeNameColumn,
        changeBodyColumn: actions.changeBodyColumn,
        changeAddColumn: actions.changeAddColumn
      },
      getAddMenu
    });

    return makeRows({items: courses.data, types, data, entityType: EntityType.Course, connectionNumber});
  }
);