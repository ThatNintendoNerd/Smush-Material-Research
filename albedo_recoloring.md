---
# Albedo Recoloring
Select a new albedo color to see the effect in real time.
<style>
label {
    margin-right: 20px;
}
</style>

<canvas id="imgCanvas"></canvas>
<form>
    <label for="albedo">
        Previous Albedo
        <input type="color" id="albedo" name="albedo" value="#B0AFA9">
    </label>
    <label for="newAlbedo">
        New Albedo
        <input type="color" id="newAlbedo" name="newAlbedo" value="#B0AFA9">
    </label>
</form>

<script src="js/three.js"></script>
<script>
    const renderer = new THREE.WebGLRenderer({
        canvas: imgCanvas,
        alpha: true
    });

    renderer.setSize(600, 600, false);

    window.addEventListener('resize', function (e) {

        renderer.setSize(600, 600, false);

    });

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const texture = new THREE.TextureLoader().load("images/albedo_recoloring/corrin.png");
    const mask = new THREE.TextureLoader().load("images/albedo_recoloring/mask.png");

    const albedoColorInput = document.getElementById("albedo");
    const newAlbedoColorInput = document.getElementById("newAlbedo");

    const material = new THREE.ShaderMaterial({
        vertexShader: `
    varying vec2 vUv;
    
    void main() {
        vUv = uv;
        gl_Position = vec4( position, 1.0 );    
    }
    `,
        fragmentShader: `
    varying vec2 vUv;

    uniform sampler2D image;
    uniform sampler2D mask;

    uniform vec3 albedo;
    uniform vec3 newAlbedo;

    void main() {
        vec4 renderColor = texture(image, vUv);
        vec4 maskColor = texture(mask, vUv);

        vec3 lighting = renderColor.rgb / albedo;
        vec3 result = lighting * newAlbedo;

        // Premultiplied alpha.
        gl_FragColor.rgb = mix(renderColor.rgb, result, maskColor.r) * renderColor.a;
        gl_FragColor.a = renderColor.a;
    }
    `,
        uniforms: {
            image: { value: texture },
            mask: { value: mask },
            albedo: { value: new THREE.Color(albedoColorInput.value) },
            newAlbedo: { value: new THREE.Color(newAlbedoColorInput.value) }
        }
    });

    // Update the uniforms when changing colors.
    albedoColorInput.addEventListener("input", function () { material.uniforms.albedo.value = new THREE.Color(albedoColorInput.value); }, false);
    newAlbedoColorInput.addEventListener("input", function () { material.uniforms.newAlbedo.value = new THREE.Color(newAlbedoColorInput.value); }, false);

    const quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2, 1, 1), material);
    scene.add(quad);

    function animate() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    }

    animate();
</script>