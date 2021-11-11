import axios from "axios";
import { IUserModel,IUser} from "../types";

interface Token{
  token:string,
  user:{
    id:string,
    username:string
  }
}

const createUser=async(user:Omit<IUser,"tasks">):Promise<IUserModel>=>{
  console.log("Post");
  const res=await axios.post<IUserModel>("http://192.168.1.6:8000/api/users",user);
  console.log(res.data);
  return res.data;
}

const login=async(user:{username:string,password:string}):Promise<Token>=>{
  const res=await axios.post("http://192.168.1.6:8000/api/login",user);
  return res.data;
}

const getUser=async(id:string):Promise<IUserModel>=>{
  const res=await axios.get(`http://192.168.1.6:8000/api/users/${id}`);
  return res.data;
}


export default {createUser,login,getUser};