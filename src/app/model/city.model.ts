export interface City {
  id: number;
  name:String;
  _links:{
  self:{
  href:string;
  },
  city:{
  href:string
  },
  Hotels:{
  href:string;
  }
  }
}
