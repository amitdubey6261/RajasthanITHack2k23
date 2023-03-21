import * as THREE from 'three'
import * as CANNON from 'cannon-es';
import { Howl } from 'howler';
import CannonDebugger from "cannon-es-debugger";
import Enviroment from './Enviroment.js'
import Experience from '../Experience.js';
import HtmlIntegration from './HtmlIntegration.js';

export default class World {
    constructor() {
        this.timeStep = 1 / 60;
        this.Pspeed = 0.02;
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.size = this.experience.sizes;
        this.resources = this.experience.resources;
        this.obsPos = this.experience.obsPos;
        this.Enviroment = new Enviroment();
        this.htmlIntegration = new HtmlIntegration();
        this.obstacles = new Array();
        this.obstaclesT = new Array();
        this.createSound();
        this.collisionCount = 0 ; 
        this.createCannonWorld();

        this.L = 0;
        this.R = 0;
        this.C = 0;
    }

    createSound(){
        this.beep = new Howl({
            src : ['./beep.mp3']
        })
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
        this.createEventListener();
    }

    createEventListener() {
        window.addEventListener('keydown', (e) => {
            if (e.defaultPrevented) return;
            e.preventDefault();
            if (e.code == 'ArrowUp') {
                this.CarBody.position.z += 1;
            }
            if (e.code == 'ArrowDown') {
                this.CarBody.position.z -= 1;
            }
            if (e.code == 'ArrowLeft') {
                this.CarBody.position.x -= 1;
            }
            if (e.code == 'ArrowRight') {
                this.CarBody.position.x += 1;
            }
        })
    }

    createGround() {
        this.ground = new CANNON.Body({
            id : 0 ,
            shape: new CANNON.Plane(10, 10),
            position: (0, 0, 0),
            mass: 0,
        })

        this.ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
        this.CannonWorld.addBody(this.ground)
    }

    createObstacles(Valx) {
        this.obstacleBody = new CANNON.Body({
            shape: new CANNON.Box(new CANNON.Vec3(0.1, 0.1, 0.1)),
            mass: 500,
            position: new CANNON.Vec3(Valx, 1, -5) , 
        })
        this.obstacleBody.id = 1 ; 
        this.obstacles.push(this.obstacleBody);
        this.CannonWorld.addBody(this.obstacleBody);
    }

    createCar() {

        this.createCar = this.resources.items.car.scene;
        this.scene.add(this.createCar)

        this.CarBody = new CANNON.Body({
            id : 3 , 
            shape: new CANNON.Box(new CANNON.Vec3(0.2, 0.1, 0.1)),
            position: new CANNON.Vec3(0, 1, 5),
            mass: 10000
        })

        this.CarBody.quaternion.setFromEuler( 0 , Math.PI/2 , 0 );

        this.CarBody.addEventListener('collide' , (e)=>{
            // console.log()
            if( e.body.id == 3 || e.body.id == 1 ){
                this.beep.play();
            }
        })

        this.CannonWorld.addBody(this.CarBody)
    }


    update() {
        this.CannonWorld.step(this.timeStep);
        this.CannonDebugger.update();
        this.obstacleBodyUpdate();
        this.checkObsPos();

        this.createCar.position.copy(this.CarBody.position);
        this.createCar.quaternion.copy(this.CarBody.quaternion);
    }

    obstacleBodyUpdate() {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].position.z > 5) {
                this.CannonWorld.removeBody(this.obstacles[i])
            }
            this.obstacles[i].position.z += this.Pspeed;
        }
    }

    checkObsPos() {
        if (this.experience.obsPos) {
            if (this.experience.obsPos == 'C') {
                this.C += 1;
            }
            if (this.experience.obsPos == 'L') {
                this.L += 1;
            }
            if (this.experience.obsPos == 'R') {
                this.R += 1;
            }
        }

        if (this.C == 100) {
            this.createObstacles(0);
            this.C = 0;
        }
        if (this.L == 100) {
            this.createObstacles(-1);
            this.L = 0;
        }
        if (this.R == 100) {
            this.createObstacles(1);
            this.R = 0;
        }

    }

}