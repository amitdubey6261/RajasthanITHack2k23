import { EventEmitter } from "events";
import Experience from "../Experience";

export default class Geolocation extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.latitude = null ;
        this.longitude = null ;
        this.speed = null ; 
        this.accuracy = null ; 
        this.updationTime = 0 ;
        this.getGeoLocation();
    }

    getGeoLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                this.latitude = position.coords.latitude ; 
                this.longitude = position.coords.longitude;
                this.speed = position.coords.speed ; 
                this.accuracy = position.coords.accuracy ; 
            })
        }
        else{
            console.log("Your Device Not Supported !")
        }
    }

    update(){
        this.geoLocationStatus();
    }

    geoLocationStatus(){
        let la = this.latitude;
        let lo = this.longitude;
        let ac = this.accuracy;
        let sp = this.speed ; 
        this.emit("update" , {la,lo,ac,sp});
        this.getGeoLocation();
    }
};