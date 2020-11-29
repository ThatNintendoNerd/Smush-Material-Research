---
# Albedo Recoloring
Renders can be recolored by extracting the lighting information and then applying a new albedo color. 
The original albedo color for the armor is provided for both inputs, which has no effect on the final color. 
Select a new albedo color to see the effect in real time.

<style>
label {
    margin-right: 20px;
}
#imgCanvas {
   width: 100%;
   height: 100%;
   display: block;
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

# Details
This technique approximates well how fully metallic objects are rendered in game (PRM red channel is 1.0) because metallic objects have no diffuse component.
Non metallic objects would require extracting the specular and diffuse lighting separately.
For custom renders, there are more render passes available that can perfectly recreate the final render. Remember to composite AOVs in 32 bit floating point for proper blending and to avoid clipping!
See Blender's [AOV Documentation](https://docs.blender.org/manual/en/latest/render/layers/passes.html#render-cycles-passes-aov) for details.

```c
// Metals 
final = albedo x specular_light

// Non Metals
final = (albedo x diffuse_light) + (specular_light)

// Recoloring Metals
lighting = final / col_rgb
recolored = lighting * new_albedo

// TODO: Recoloring Non Metals
```

# Albedo Recoloring in an Image Editor
The layers should be arranged as follows from top to bottom. This assumes the render is already divided into parts or layer groups with masks.
The new and previous albedo colors can be copied from the col map for non skin materials. 

```
Previous Albedo (Divide)
New Albedo (Multiply)
Base Render
```  

The order is important when working in 8 bits per channel images. Multiplying first prevents potential clipping issues.
If the effect introduces noticeable banding artifacts, try switching to 16 bits per channel. 

If the final result is very discolored, double check the color used for the original albedo. 
Another copy of the new albedo layer can be added to even out the color with the opacity adjusted as needed.

```
New Albedo (Color)
Previous Albedo (Divide)
New Albedo (Multiply)
Base Render
```  

If the image editor doesn't support the divide blending mode, invert the previous albedo color and set the layer blend mode to color dodge.   
```
1 - Previous Albedo (Color Dodge)
New Albedo (Multiply)
Base Render
```  

<script src="js/three.js"></script>
<script>
    // TODO: Most of this can be put in a separate script file to use with other demos.
    const renderer = new THREE.WebGLRenderer({
        canvas: imgCanvas,
        alpha: true
    });

    // Set the renderer dimensions to the max dimension of the html element.
    // This assumes a 1:1 aspect ratio but improves the output resolution.
    const updateRenderHeight = function() {
        const maxDimension = Math.max(renderer.domElement.clientWidth, renderer.domElement.clientHeight);
        renderer.setSize(maxDimension, maxDimension, false);
    };

    updateRenderHeight();
    window.addEventListener('resize', function (e) {
        updateRenderHeight();
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