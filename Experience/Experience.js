import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js'
import Axios from 'axios';

import Resources from './Utils/Resources.js';
import Assets from './Utils/assets.js';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';

import Helpers from './Helpers.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Controllers from './Controllers.js';

import World from './World/World.js';
import Sketch from './World/Sketch.js';

import p5 from 'p5';

import EventEmitter from 'events';
import Geolocation from './World/Geolocation.js';

export default class Experience {
    static instance
    constructor(canvas) {
        if (Experience.instance) { return Experience.instance }
        Experience.instance = this;
        this.em = new EventEmitter();
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.sizes = new Sizes();
        this.time = new Time();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.helpers = new Helpers();
        this.controllers = new Controllers();
        this.resources = new Resources(Assets);
        this.geoLocation = new Geolocation(this.em);
        this.p5 = new p5(Sketch(this.em));
        this.stats = Stats()
        document.body.appendChild(this.stats.domElement)

        this.uptime = 0;

        //Obstacles
        this.obsPos = null;


        this.resources.on("ready", () => {
            this.world = new World();
            // this.loadScript();
        })

        this.sizes.on("resize", () => {
            this.resize();
        });

        this.time.on("update", () => {
            this.update();
        });

        this.geoLocation.on("update", (x) => {
            this.uptime++;
            if (this.uptime == 20) {
                this.change(x);
            }
        })

    }

    change(x) {
        Axios.put(`http://159.65.236.57:5000/api/v1/users/update/${localStorage.getItem('id')}`, {
            "location": {
                w: x.la,
                x: x.lo,
                y: x.ac,
                z: x.sp,
            }
        }).then((res) => {
            // console.log(res)
        }).catch((err) => {
            console.log(err)
        })
        this.uptime = 0;

        this.updateTop5();
    }



    updateTop5(x) {
        Axios.get(`http://159.65.236.57:5000/api/v1/users/all/`).then((res) => {
            for (let i = 0; i < res.data.user.length; i++) {
                console.log(res.data.user[i].w , res.data.user[i].x);
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    // ======================================================

    myFunction(lat1, lat2, lon1, lon2) {
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = R * c; // in metres
        return d;
    }

    //=========================================================

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update() {
        this.camera.update();
        this.renderer.update();
        this.controllers.update();
        if (this.world) this.world.update();
        this.checkPos();
        if (this.geoLocation) this.geoLocation.update();
        this.stats.update()
    }

    checkPos() {
        this.em.on("L", () => {
            this.obsPos = "L";
        })
        this.em.on("R", () => {
            this.obsPos = "R";
        })
        this.em.on("C", () => {
            this.obsPos = "C";
        })
        this.em.on("N", () => {
            this.obsPos = "N";
        })
    }
}