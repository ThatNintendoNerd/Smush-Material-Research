import * as THREE from "./three.module.js";
import { TextureScene } from "./texturescene.js";

class AlbedoRecoloringDemo {
    /**
     * 
     * @param {*} window 
     * @param {*} canvas 
     * @param {*} albedoColorInput 
     * @param {*} newAlbedoColorInput 
     */
    constructor(window, canvas, albedoColorInput, newAlbedoColorInput, resetButton) {
        const manager = new THREE.LoadingManager();

        const texture = new THREE.TextureLoader(manager).load("./assets/images/albedo_recoloring/corrin.png");
        const mask = new THREE.TextureLoader(manager).load("./assets/images/albedo_recoloring/mask.png");

        // Use a loading manager to render the first frame once all textures are loaded.
        manager.onLoad = function () {
            const material = new THREE.ShaderMaterial({
                vertexShader: `
                    varying vec2 vUv;
                    
                    void main() {
                        vUv = uv;
                        gl_Position = vec4( position, 1.0 );    
                    }`,
                fragmentShader: `
                    varying vec2 vUv;

                    uniform sampler2D image;
                    uniform sampler2D mask;

                    uniform vec3 albedo;
                    uniform vec3 newAlbedo;

                    void main() {
                        vec4 renderColor = texture(image, vUv);
                        vec4 maskColor = texture(mask, vUv);

                        // Clamp albedo to prevent potential divide by 0.
                        vec3 lighting = renderColor.rgb / max(albedo, 0.001);
                        vec3 recolored = lighting * newAlbedo;
                        vec3 composite = mix(renderColor.rgb, recolored, maskColor.r);

                        // Premultiplied alpha.
                        gl_FragColor.rgb = composite * renderColor.a;
                        gl_FragColor.a = renderColor.a;
                    }`,
                uniforms: {
                    image: { value: texture },
                    mask: { value: mask },
                    albedo: { value: new THREE.Color(albedoColorInput.value) },
                    newAlbedo: { value: new THREE.Color(newAlbedoColorInput.value) }
                }
            });

            const textureScene = new TextureScene(window, canvas, material);

            // Update the uniforms when changing colors.
            albedoColorInput.addEventListener("input", function () {
                material.uniforms.albedo.value = new THREE.Color(albedoColorInput.value);
                textureScene.render();
            }, false);

            newAlbedoColorInput.addEventListener("input", function () {
                material.uniforms.newAlbedo.value = new THREE.Color(newAlbedoColorInput.value);
                textureScene.render();
            }, false);

            textureScene.render();
        };
    }
}

export { AlbedoRecoloringDemo };
