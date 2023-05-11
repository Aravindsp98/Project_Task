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
  quantity:undefined | number,
  course_id:undefined|number
}
export interface cart{
  name:string,
  price:number,
  category:string,
  image:string,
  description:string,
  id:number| undefined,
  quantity:undefined | number,
  course_id:number,
  user_id:number
}

export interface priceSummary{
  price:number,
  discount:number,
  tax:number,
  total:number
}

export interface order {
  total_price:number,
  user_id:string,
  order_id:number|undefined
}