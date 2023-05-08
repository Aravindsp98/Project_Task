export interface signUp {
  name: string;
  email: string;
  password: string;
}
export interface login {
  email: String;
  password: String;
}

export interface course{
  name:string,
  price:number,
  category:string,
  image:string,
  description:string,
  id:number,
  courseId:undefined|number
}
export interface cart{
  name:string,
  price:number,
  category:string,
  image:string,
  description:string,
  id:number| undefined,
  courseId:number,
  userId:number
}

export interface priceSummary{
  price:number,
  discount:number,
  tax:number,
  total:number
}

export interface order {
  email:string,
  address:string,
  contact:string,
  totalPrice:number,
  userId:string,
  id:number|undefined
}