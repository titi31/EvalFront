export interface Hotel {
    id:number;
    name:String;
    selected:boolean;
    phone:String;
    adress:String;
    nbStars:number;
    nbRoomDispo:number;
    photoName:String;
    _links:{
        self:{
        href:string;
        },
        hotel:{
        href:string;
        },
        city:{
        href:string
        }
        }
}