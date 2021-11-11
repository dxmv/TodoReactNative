import axios from "axios";
import { ITaskModel } from "../types";

const createTodo=async(taskId:string,todo:{title:string},token:string):Promise<ITaskModel>=>{
  const res=await axios.post<ITaskModel>(`http://192.168.1.6:8000/api/tasks/${taskId}/todos`,todo,{
    headers:{
      Authorization:`bearer ${token}`
    }
  });
  return res.data;
}

const deleteTodo=async(taskId:string,todoId:string,token:string):Promise<ITaskModel>=>{
  const res=await axios.delete<ITaskModel>(`http://192.168.1.6:8000/api/tasks/${taskId}/todos/${todoId}`,{
    headers:{
      Authorization:`bearer ${token}`
    }
  });
  return res.data;
}

const editTodo=async(taskId:string,todoId:string,token:string):Promise<ITaskModel>=>{
  const res=await axios.patch<ITaskModel>(`http://192.168.1.6:8000/api/tasks/${taskId}/todos/${todoId}`,{},{
    headers:{
      Authorization:`bearer ${token}`
    }
  });
  return res.data;
}

export default {createTodo,deleteTodo,editTodo};