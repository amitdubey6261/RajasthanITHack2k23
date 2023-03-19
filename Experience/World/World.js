import * as THREE from 'three'
import * as CANNON from 'cannon-es';
import { Howl } from 'howler';
import CannonDebugger from "cannon-es-debugger";

// import Sketch from './Sketch';

import p5 from 'p5';
import Enviroment from './Enviroment.js'
import Experience from '../Experience.js';

export default class World {
    constructor(){
        this.createObstacles();
    }

    createObstacles(){
        this.obstacleArray = new Array(11);
    }

    update(){
    }
}