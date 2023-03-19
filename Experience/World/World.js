import * as THREE from 'three'
import * as CANNON from 'cannon-es';
import { Howl } from 'howler';
import CannonDebugger from "cannon-es-debugger";

// import Sketch from './Sketch';

import p5 from 'p5';
import Enviroment from './Enviroment.js'
import Experience from '../Experience.js';

export default class World {
    constructor() {
        this.timeStep = 1 / 60;
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.size = this.experience.sizes;
        this.resources = this.experience.resources;
        this.createCannonWorld();
    }

    createCannonWorld() {
        this.CannonWorld = new CANNON.World({
            gravity: new CANNON.Vec3(0, -10, 0)
        });

        this.CannonDebugger = new CannonDebugger(this.scene, this.CannonWorld, {
            color: 0xff0000,
            scale: 1.0
        })
        this.createGround();
        this.createObstacles();
        this.createCar();
    }

    createGround() {
        this.ground = new CANNON.Body({
            shape : new CANNON.Plane(10 , 10),
            position : (0 , 0 , 0 ),
            mass : 0 , 
        })

        this.ground.quaternion.setFromEuler(-Math.PI/2 , 0 , 0 );
        this.CannonWorld.addBody( this.ground)
    }
    createObstacles() {
        this.obstacleArray = new Array(11);
    }

    createCar(){
        this.CarBody = new CANNON.Body({
            shape : new CANNON.Box(new CANNON.Vec3( 0.1 , 0.1 , 0.1)),
            position : new CANNON.Vec3( 0 , 1 , 0 ),
            mass : 10000
        })

        this.CannonWorld.addBody(this.CarBody)
    }


    update() {
        this.CannonWorld.step(this.timeStep);
        this.CannonDebugger.update()
    }
}