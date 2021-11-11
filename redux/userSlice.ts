import { IUserModel } from "../types";
import {Reducer} from "redux";

export interface IAppState {
  user:IUserModel|null
}


interface ADD_ACTION{
  type:"ADD_USER",
  payload:IUserModel
}

interface LOGOUT_ACTION{
  type:"LOGOUT",
}

type Action=ADD_ACTION|LOGOUT_ACTION;

export const ADD_USER=(user:IUserModel):ADD_ACTION=>{
  return{
    type:"ADD_USER",
    payload:user
  }
}

export const LOGOUT=():LOGOUT_ACTION=>{
  return{
    type:"LOGOUT",
  }
}

const initialState:IAppState={
  user:null
}

const userReducer=(state=initialState,action:Action):IAppState =>{
  switch(action.type){
    case "ADD_USER":
      return{
        ...state,
        user:action.payload
      }
    case "LOGOUT":
      return{
        ...state,
        user:null
      }
    default:
      return state
  }
}

export default userReducer;