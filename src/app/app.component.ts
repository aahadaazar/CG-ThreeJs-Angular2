import { Component } from '@angular/core';
import * as THREE from '../CDN/three.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  width = 400;
  height = 300;
  view_angle = 45;
  ASPECT = this.width / this.height;
  NEAR = 0.1;
  FAR = 10000;
  scene: any;
  renderer: any;
  camera: any;
  cube: any;
  light: any;
  light_two: any;
  lightAmbient: any;
  distance: any = 400;

  constructor() {
    this.camera = new THREE.PerspectiveCamera(75, this.ASPECT, this.NEAR, this.FAR);
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x140b33, 2);
    this.camera.position.set(100, -400, 2000);
    this.scene.add(this.camera);
    document.body.appendChild(this.renderer.domElement);
    this.light = new THREE.PointLight(0xffffff, 1, 4000);
    this.light.position.set(50, 0, 0);
    this.light_two = new THREE.PointLight(0xffffff, 1, 4000);
    this.light_two.position.set(-100, 800, 800);
    this.lightAmbient = new THREE.AmbientLight(0x404040);
    this.scene.add(this.light, this.light_two, this.lightAmbient);

  }

  createCube() {
    this.createSpheres();
    // createDiamond();
    // createSpace();
    this.renderer.render(this.scene, this.camera);
  }
  createSpheres() {
    const spheres: any = new THREE.Object3D();
    for (let i = 0; i < 80; i++) {
      const sphere: any = new THREE.SphereGeometry(4, Math.random() * 12, Math.random() * 12);
      const material: any = new THREE.MeshPhongMaterial({
        color: Math.random() * 0xff00000 - 0xff00000,
        shading: THREE.FlatShading,
      });

      const particle: any = new THREE.Mesh(sphere, material);
      particle.position.x = Math.random() * this.distance * 10;
      particle.position.y = Math.random() * -this.distance * 6;
      particle.position.z = Math.random() * this.distance * 4;
      particle.rotation.y = Math.random() * 2 * Math.PI;
      particle.scale.x = particle.scale.y = particle.scale.z = Math.random() * 12 + 5;
      // add particle to the spheres group
      spheres.add(particle);
    }

    spheres.position.y = 500;
    spheres.position.x = -2000;
    spheres.position.z = -100;
    spheres.rotation.y = Math.PI * 600;
    this.scene.add(spheres);
  }
}
