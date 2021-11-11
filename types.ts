export interface IUser{
  fullName:string,
  password:string,
  username:string,
  tasks:{
    _id:string,
    title:string
  }
}

export interface IUserModel extends IUser{
  _id:string
}

export interface ITask{
  title:string,
  todos:string[],
  date:string,
  owner:string
}

export interface ITaskModel extends ITask{
  _id:string,
}

export interface ITodo{
  title:string,
  done:boolean,
  task:string,
}

export interface ITodoModel extends ITodo{
  _id:string,
}