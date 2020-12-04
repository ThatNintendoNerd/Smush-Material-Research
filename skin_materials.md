---
---
# Skin Materials
Many fighters have separate materials for approximating the subsurface scattering of skin.
The parameters can also be tweaked for more stylized diffuse shading, such as cel-shading or toon shading.

<style>
    #imgCanvas {
        width: 100%;
    }
</style>

<div class="container">
    <div class="row">
        <div class="col-md-5">
            <canvas id="imgCanvas"></canvas>
        </div>
        <div class="col">
            <form>
                <div class="form-group row">
                    <p>Edit the values below to see the effect on diffuse shading in real time.</p>
                </div>
                <div class="form-group row justify-content-end">
                    <label for="metalness" class="col-md-5 col-form-label">Metalness</label>
                    <input type="text" value="1.0" name="metalness" id="metalnessText" class="col-md-2">
                    <input type="range" value="1.0" min="0.0" max="1.0" step="0.001" name="metalness" id="metalness"
                        class="col">
                </div>
                <div class="form-group row justify-content-end">
                    <label for="albedo" class="col-md-5 col-form-label">Albedo</label>
                    <input type="color" name="albedo" id="albedo" value="#E6DEC7" class="col-md-2">
                    <div class="col"></div>
                </div>
                <div class="form-group row justify-content-end">
                    <label for="customVector11" class="col-md-5 col-form-label">CustomVector11.rgb</label>
                    <input type="color" name="customVector11" id="customVector11" value="#401200" class="col-md-2">
                    <div class="col"></div>
                </div>
                <div class="form-group row justify-content-end">
                    <label for="customVector30x" class="col-md-5 col-form-label">CustomVector30.x</label>
                    <input type="text" value="0.5" name="customVector30x" id="customVector30xText"
                        class="col-md-2">
                    <input type="range" value="0.5" min="0.0" max="1.0" step="0.001" name="customVector30x"
                        id="customVector30x" class="col">
                </div>
                <div class="form-group row justify-content-end">
                    <label for="customVector30y" class="col-md-5 col-form-label">CustomVector30.y</label>
                    <input type="text" value="1.5" name="customVector30y" id="customVector30yText"
                        class="col-md-2">
                    <input type="range" value="1.5" min="0.0" max="30.0" step="0.01" name="customVector30y"
                        id="customVector30y" class="col">
                </div>
            </form>
        </div>
    </div>
</div>

## Blending Intensity 
The overall intensity of the effect is controlled by CustomVector30.x, which should have values between 0.0 and 1.0 to avoid artifacts. 
The metalness map stored in the PRM red channel for skin materials doesn't make the material metallic and instead is used to mask the effect.
For full effect, both the metalness map and CustomVector30.x should be set to 1.0. 
If either CustomVector30.x or the metalness map are 0.0, the material will use the default diffuse shading.

```glsl
// CustomVector30.x is the overall intensity.
// Metalness acts like a "mask".
float sssBlend = CustomVector30.x * metalness;
```

## Albedo Color
The RGB values for CustomVector11 control the subsurface color. This is typically a dark red color to approximate skin.
Bright colors will likely cause unwanted bloom.
The albedo color is calculated using the col map color as well as CustomVector11's color.

```glsl
// Blend the col map color with the subsurface color.
// Note that CustomVector11 makes the albedo brighter.
vec3 albedoFinal = mix(col.rgb, CustomVector11.rgb, sssBlend);
albedoFinal += CustomVector11.rgb * sssBlend;
```

### Diffuse Shading
CustomVector30.y is multiplied by the diffuse shading to control the smoothness of the shading.
Using a very high value for the second value of CustomVector30 creates a cel-shaded look because diffuse shading is clamped to 1.0.
A very similar technique is used for Breath of the Wild's shaders, for example.

```glsl
float skinShading = diffuseShading * CustomVector30.y;
float finalDiffuseShading = mix(nDotL, skinShading, sssBlend);
finalDiffuseShading = clamp(finalDiffuseShading, 0.0, 1.0);
```

The third and fourth parameters are unused, despite having values set for some models.




<script type="module">
    import { SssDemo } from "./assets/javascript/skin_materials.js";
    const imgCanvas = document.getElementById("imgCanvas");

    const albedo = document.getElementById("albedo");
    const customVector11 = document.getElementById("customVector11");
    const metalness = document.getElementById("metalness");
    const customVector30x = document.getElementById("customVector30x");
    const customVector30y = document.getElementById("customVector30y");

    const getRangeValue = function (range) { return parseFloat(range.value); };

    const demo = new SssDemo(window, imgCanvas,
        albedo.value,
        customVector11.value,
        getRangeValue(customVector30x),
        getRangeValue(customVector30y),
        getRangeValue(metalness));

    albedo.addEventListener("input", function () {
        demo.updateAlbedo(albedo.value);
    });

    customVector11.addEventListener("input", function () {
        demo.updateCustomVector11(customVector11.value);
    });

    const metalnessText = document.getElementById("metalnessText");
    metalnessText.addEventListener("input", function () {
        metalness.value = metalnessText.value;
        demo.updateMetalness(parseFloat(metalnessText.value));
    });
    metalness.addEventListener("input", function () {
        demo.updateMetalness(getRangeValue(metalness));
        metalnessText.value = metalness.value;
    });

    const customVector30xText = document.getElementById("customVector30xText");
    customVector30x.addEventListener("input", function () {
        customVector30xText.value = customVector30x.value;
        demo.updateCustomVector30x(getRangeValue(customVector30x));
    });
    customVector30xText.addEventListener("input", function () {
        customVector30x.value = customVector30xText.value;
        demo.updateCustomVector30x(parseFloat(customVector30xText.value));
    });

    const customVector30yText = document.getElementById("customVector30yText");
    customVector30y.addEventListener("input", function () {
        customVector30yText.value = customVector30y.value;
        demo.updateCustomVector30y(getRangeValue(customVector30y, 30));
    });
    customVector30yText.addEventListener("input", function () {
        customVector30y.value = customVector30yText.value;
        demo.updateCustomVector30y(parseFloat(customVector30yText.value));
    });
</script>