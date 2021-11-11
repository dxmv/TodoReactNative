import axios from "axios";
import { ITaskModel } from "../types";

const getTasksForUser=async(token:string):Promise<Array<ITaskModel>>=>{
  const res=await axios.get<Array<ITaskModel>>("http://192.168.1.6:8000/api/tasks",{
    headers:{
      Authorization:`bearer ${token}`
    } 
  });
  return res.data;
}

const createTask=async(token:string,task:{title:string}):Promise<ITaskModel>=>{
  const res=await axios.post<ITaskModel>("http://192.168.1.6:8000/api/tasks",task,{
    headers:{
      Authorization:`bearer ${token}`
    } 
  });
  return res.data;
}

const deleteTask=async(token:string,id:string):Promise<{message:string}>=>{
  const res=await axios.delete(`http://192.168.1.6:8000/api/tasks/${id}`,{
    headers:{
      Authorization:`bearer ${token}`
    } 
  });
  return res.data;
}

export default {getTasksForUser,createTask,deleteTask};