import { ITask, ITaskModel,ITodoModel } from "../types";
import {Reducer} from "redux";

export interface IAppState {
  tasks: ITaskModel[];
}

type Action=TaskAction|InitialAction;

interface TaskAction{
  type:"ADD_TASK"|"DELETE_TASK"|"EDIT_TASK",
  payload:ITaskModel
}
interface InitialAction{
  type:"INITIAL_TASKS",
  payload:ITaskModel[],
}


export const ADD_TASK=(task:ITaskModel):TaskAction=>{
  return{
    type:"ADD_TASK",
    payload:task
  };
};

export const DELETE_TASK=(task:ITaskModel):TaskAction=>{
  return{
    type:"DELETE_TASK",
    payload:task
  };
};

export const EDIT_TASK=(task:ITaskModel):TaskAction=>{
  return{
    type:"EDIT_TASK",
    payload:task
  }
}

export const INITIAL_TASKS=(tasks:ITaskModel[]):InitialAction=>{
  return{
    type:"INITIAL_TASKS",
    payload:tasks
  }
}

const initialState:IAppState={
  tasks:[],
};

const taskReducer=(state=initialState,action:Action):IAppState =>{
  switch (action.type){
    case "INITIAL_TASKS":
      const taskArr=[...action.payload];
      return {
        ...state,
        tasks:taskArr
      }
    case "ADD_TASK":
      const arr=[...state.tasks,action.payload];
      return {
        ...state,
        tasks:arr,
      };
    case "DELETE_TASK":
      const index=state.tasks.findIndex(item=>item._id===action.payload._id);
      const deleteTasks=[...state.tasks];
      if( index!=-1){
        deleteTasks.splice(index,1);
        return{
          ...state,
          tasks:deleteTasks
        }
      }
    case "EDIT_TASK":
      const editIndex=state.tasks.findIndex(item=>item._id===action.payload._id);
      if(editIndex!=-1){
        const editTasks=[...state.tasks];
        editTasks[editIndex]=action.payload;
        return{
          ...state,
          tasks:editTasks
        }
      }
    default:
      return state;
  }
}

export default taskReducer;
