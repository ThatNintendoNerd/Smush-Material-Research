import * as THREE from "./three.module.js";
import { SphereScene } from "./spherescene.js";
import { CubeScene } from "./cubescene.js";
import { OrbitControls } from "./orbitcontrols.js";

class DifCubeDemo {
    constructor(window, canvas, difCubeDirectory) {
        const manager = new THREE.LoadingManager();

        const cubeTexture = new THREE.CubeTextureLoader(manager)
            .setPath(difCubeDirectory)
            .load([
                'posx.png',
                'negx.png',
                'posy.png',
                'negy.png',
                'posz.png',
                'negz.png'
            ]);

        manager.onLoad = function () {
            this.material = new THREE.ShaderMaterial({
                vertexShader: `
                    varying vec2 vUv;
                    varying vec3 vNormal;
                    varying vec3 vPosition;
                    
                    void main() {
                        vUv = uv;
                        vNormal = normal;
                        vPosition = position.xyz;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);  
                    }`,
                fragmentShader: `
                    varying vec2 vUv;
                    varying vec3 vNormal;
                    varying vec3 vPosition;
    
                    uniform samplerCube difCube;
    
                    void main() {
                        vec3 normal = normalize(vNormal);
                        vec3 viewVector = normalize(cameraPosition - vPosition);
    
                        vec3 reflectionVector = reflect(viewVector, normal);
                        reflectionVector.y *= -1.0;
    
                        vec3 result = texture(difCube, reflectionVector).rgb;
                        gl_FragColor = vec4(result,1.0);
                    }`,
                uniforms: {
                    difCube: { value: cubeTexture }
                }
            });

            this.sphereScene = new SphereScene(window, canvas, this.material);
            this.cubeScene = new CubeScene(window, canvas, this.material);

            const controls = new OrbitControls(this.cubeScene.camera, canvas);
            controls.enablePan = false;
            controls.enableZoom = false;
            controls.update();

            const that = this;

            const animate = function () {
                requestAnimationFrame(animate);

                // required if controls.enableDamping or controls.autoRotate are set to true
                controls.update();

                that.cubeScene.render();
            }

            animate();
        };
    }
}

export { DifCubeDemo };
