import * as THREE from 'three'
import Experience from "./Experience";
import { CSS3DRenderer , CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

export default class Renderer{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas= this.experience.canvas;
        this.camera= this.experience.camera;

        this.setRenderer();

    }

    setRenderer(){

        this.renderer = new THREE.WebGLRenderer({
            canvas : this.canvas ,
            antialias : true , 
            alpha : true ,
        });

        
        
        this.renderer.physicallyCorrectLights = true ;
        this.renderer.shadowMap.enabled = true ;
        this.renderer.shadowMap.type = THREE.PCFShadowMap ;
        this.renderer.outputEncoding = THREE.sRGBEncoding ;
        this.renderer.toneMapping = THREE.CineonToneMapping ;
        this.renderer.toneMappingExposure = 1.75 ;
        this.renderer.setSize(this.sizes.width , this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
        this.setCSS3Render();
        this.renderer.xr.enabled = true ;
        this.btn = ARButton.createButton(this.renderer)
        this.btn.style.color = 'white';
        this.btn.style.backgroundColor = 'black';
        document.body.appendChild(this.btn)
    
    }

    setCSS3Render(){
        this.css3Renderer = new CSS3DRenderer({
            canvas : this.canvas , 
        });
        this.css3Renderer.setSize(this.sizes.width , this.sizes.height)
    }


    resize(){
        this.renderer.setSize(this.sizes.width , this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update(){
        this.renderer.render(this.scene , this.camera.perspectiveCam);
    }

}