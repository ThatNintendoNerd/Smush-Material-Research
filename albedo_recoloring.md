---
# Albedo Recoloring
Renders can be recolored by extracting the lighting information and then applying a new albedo color.
The original albedo color for the armor is provided for both inputs, which has no effect on the final color.
Select a new albedo color to see the effect in real time.

<style>
    label {
        margin-right: 20px;
        margin-top: 0;
        vertical-align: middle;
    }

    button {
        margin-top: 0;
        vertical-align: middle;
    }

    #imgCanvas {
        width: 100%;
        height: 100%;
        display: block;
    }
</style>

<canvas id="imgCanvas"></canvas>
<label for="albedo">
    Previous Albedo
    <input type="color" id="albedo" name="albedo" value="#B0AFA9">
</label>
<label for="newAlbedo">
    New Albedo
    <input type="color" id="newAlbedo" name="newAlbedo" value="#B0AFA9">
</label>
<button id="reset">Reset</button>

# Details
This technique approximates well how fully metallic objects are rendered in game (PRM red channel is 1.0) because
metallic objects have no diffuse component.
Non metallic objects would require extracting the specular and diffuse lighting separately.

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

For custom renders, there are more render passes available that can perfectly recreate the final render. Remember to
composite AOVs in 32 bit floating point for proper blending and to avoid clipping!
See Blender's <a href="https://docs.blender.org/manual/en/latest/render/layers/passes.html#combining"
    target="_blank">AOV Documentation</a>
for details.

# Albedo Recoloring in an Image Editor
The layers should be arranged as follows from top to bottom. This assumes the render is already divided into parts or
layer groups with masks.
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

If the image editor doesn't support the divide blending mode, invert the previous albedo color and set the layer blend
mode to color dodge.
```
1 - Previous Albedo (Color Dodge)
New Albedo (Multiply)
Base Render
```

<script type="module">
    import { AlbedoRecoloringDemo } from "./js/albedorecoloring.js";

    const albedoColorInput = document.getElementById("albedo");
    const newAlbedoColorInput = document.getElementById("newAlbedo");
    const resetButton = document.getElementById("reset");

    const demo = new AlbedoRecoloringDemo(window, albedoColorInput, newAlbedoColorInput, resetButton);
</script>