import taskReducer,{IAppState as TodoState} from "./todoSlice";
import { combineReducers,createStore } from 'redux'
import userReducer,{IAppState as UserState} from "./userSlice";
import { ITask, IUser } from "../types";
const reducers=combineReducers({
  tasks:taskReducer,
  user:userReducer
});
const store=createStore(reducers);
export default store;
export type RootState = ReturnType<typeof store.getState>;
