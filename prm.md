---
---
# PRM Maps (Texture6)
PRM maps control most of the important shading parameters for the more physically based materials introduced in Smash
Ultimate.
The different channels of the PRM maps correspond to four separate textures. 
The red channel is metalness, the green channel is roughness, the blue channel is ambient occlusion, and the alpha channel is specular.
PRM maps work similarly
to the inputs to Disney's principled shader, which is the basis for 
<a href="https://docs.blender.org/manual/en/latest/render/shader_nodes/shader/principled.html" target="_blank">Blender's Principled Shader</a>
and the shading in many modern games.

<style>
    #imgCanvas {
        width: 100%;
    }
</style>

<div class="container">
    <div class="row">
        <div class="col-md-5 my-auto">
            <canvas id="imgCanvas"></canvas>
        </div>
        <div class="col my-auto">
            <form>
                <div class="form-group row justify-content-end">
                    <label for="albedo" class="col-md-4 col-form-label">Albedo</label>
                    <input type="color" name="albedo" id="albedo" value="#990000" class="col-md-2">
                    <div class="col"></div>
                </div>
                <div class="form-group row justify-content-end">
                    <label for="prmColor" class="col-md-4 col-form-label">PRM RGB</label>
                    <input type="color" name="prmColor" id="prmColor" value="#007FFF" class="col-md-2">
                    <div class="col"></div>
                </div>
                <div class="form-group row justify-content-end">
                    <label for="metalness" class="col-md-4 col-form-label">Metalness</label>
                    <input type="text" value="0.0" name="metalness" id="metalnessText" class="col-md-2">
                    <input type="range" value="0.0" min="0.0" max="1.0" step="0.001" name="metalness" id="metalness"
                        class="col">
                </div>
                <div class="form-group row justify-content-end">
                    <label for="roughness" class="col-md-4 col-form-label">Roughness</label>
                    <input type="text" value="0.5" name="roughness" id="roughnessText" class="col-md-2">
                    <input type="range" value="0.5" min="0.0" max="1.0" step="0.001" name="roughness" id="roughness"
                        class="col">
                </div>
                <div class="form-group row justify-content-end">
                    <label for="ao" class="col-md-4 col-form-label">Ambient Occlusion</label>
                    <input type="text" value="1.0" name="ao" id="aoText" class="col-md-2">
                    <input type="range" value="1.0" min="0.0" max="1.0" step="0.001" name="ao" id="ao" class="col">
                </div>
                <div class="form-group row justify-content-end">
                    <label for="specular" class="col-md-4 col-form-label">Specular</label>
                    <input type="text" value="0.16" name="specular" id="specularText" class="col-md-2">
                    <input type="range" value="0.16" min="0.0" max="1.0" step="0.001" name="specular" id="specular"
                        class="col">
                </div>
            </form>
        </div>
    </div>
</div>

## PRM Color Channels
Although PRM maps are often very colorful (pink/cyan) when previewed in an image editor, *PRM maps do not contain color data*.
Avoid saving PRM maps as DDS or Nutexb with
srgb formats. Srgb formats have names that end in _SRGB. When rendering in programs such as Maya or Blender, set the PRM
maps to raw, non color data, or linear to ensure
the values aren't gamma corrected.

### Metalness (<span style="color:red">Red</span>)
Metalness determines whether a surface is metallic or not and affects both specular and diffuse shading.
In general, materials should be either fully metallic (1.0) or non metallic (0.0).
Values in between 0.0 and 1.0 enable smoother blending between metallic and non metallic regions of a model.

Non metals have a white specular color and the diffuse component is colored by the albedo.
The specular intensity for non metals is controlled by the PRM's specular. Metals have no diffuse component
and specular intenisty is controlled entirely by albedo. In the demo above, note how the specular highlight becomes
closer in color to the albedo color as metalness increases.

Skin materials are a special case and instead use the metalness map as a mask for the fake subsurface scattering effect. 
See the [Skin Materials](skin_materials) page for details.

### Roughness (<span style="color:green">Green</span>)
Roughness affects the size of the specular highlight. Rougher surfaces have larger specular highlights than glossy
surfaces.

The environment reflections will look blurrier for larger roughness values for both metals and non metals.
This is achieved using a cube map and mipmapping. Higher roughness values use smaller mipmaps,
resulting in more even specular lighting. In the demo above, set metalness to 1.0 and experiment with different
roughness values.

Physically based surfaces shouldn't reflect more light than they receive, so larger roughness values make the specular
highlight darker to preserve the overall amount of light being reflected. A rough, matte screen, for example, has reflections 
that are much darker than a glossy screen. Compare roughness values of 0.0, 0.25, 0.5, and 1.0 in the demo above to see 
the changes in both the size and brightness of the specular highlight.

### Ambient Occlusion (<span style="color:blue">Blue</span>)
Ambient occlusion simulates the shadowing of occluded surfaces that would be difficult to recreate using traditional
lighting and
shadowmapping in game. These maps can be baked using the existing model or from a higher detailed version of the model
such as a sculpt or 3d scan. Ambient occlusion maps can also be painted by hand to reduce unwanted specular reflections
in certain areas like the backside of a cape or the roof of a character's mouth. Setting ambient occlusion to white
(1.0) has no effect.

Ambient occlusion affects the intensity of specular and diffuse ambient lighting. In the demo above, note the
differences between setting ambient occlusion to 0.0 for metallic and non metallic materials.

### Specular (Alpha)
Specular controls the specular reflectivity of a surface. This effects the brightness of specular highlights and 
cube map reflections. 

Surfaces in the real world exhibit something called the *fresnel effect* where the reflectivity 
of the surface depends on the angle between the orientation of the surface and the viewing direction. 
The effect is easiest to see on glossy surfaces such as the screen of a smartphone or television with the screen turned off. 
Imagine watching television in a bright room. When looking directly at the screen, the reflections may not be too distracting. 
When trying to look at the screen while sitting to the side of the screen, the reflections appear much more intense. 

The alpha channel of the PRM map controls the reflectivity of the surface when viewed from head on. 
The reflectivity always approaches 1.0 at glancing angles. Specular is scaled by 0.2, so a specular value of 0.5 
results in a specular reflectivity of 0.1. A reasonable starting value for specular is 0.16 to avoid overly bright highlights. 

Metals work differently and use the albedo color from the col map as the specular reflectivity. This allows for specular to be 
tinted by the albedo color. Specular reflectivity is not scaled by 0.2 for metals, so metals can be significantly more reflective.
A metalness of 1.0 with an albedo set to white will look similar to chrome.

## PRM Compatibility Details
In general, PRM maps aren't identical to the PBR textures used in other games and applications, so models will look
slightly different when PRM maps are used in Blender Cycles or Unreal Engine, for example. This section covers the
necessary technical details for accurately adapting PRM maps to work in other sources or adapting PBR textures from
other sources to work similarly in Smash Ultimate.

### Converting Metalness
PRM metalness maps are generally compatible between different games and applications. Some applications use separate
materials
for metals like gold or chrome and non metals. In that case, assume anything with a PRM metalness close to 1.0 is fully
metallic.

Metalness values between 0.0 and 1.0 in Smash Ultimate are often used to tint the specular color using the albedo color.
A similar effect can be achieved by using a non metallic material and tinting the specular color directly. This is
called "Specular Tint" in [Blender's Principled
Shader](https://docs.blender.org/manual/en/latest/render/shader_nodes/shader/principled.html).

Skin materials in Smash Ultimate are a special case in that they aren't actually metallic. Metalness should be set to
0.0 or use a
standard non metallic material and use the PRM metalness map to control subsurface scattering intensity. Similarly,
maps that mask subsurface scattering can be used as a metalness maps for skin materials in Smash Ultimate.

### Converting Roughness
Smash Ultimate squares it's roughness values, which is common in other PBR renderers. Use this page as a reference to
match roughness values between Smash Ultimate
and other PBR textures. Roughness has values between 0.0 and 1.0, so squaring has the biggest impact on on values closer
to 0.0.
This has the effect of making smooth surfaces much smoother. Squaring roughness can be done in an image editor using a
gamma adjustment of 2.0.
Similarly, taking the square root of roughness is a gamma adjustment of 0.5.

Smash Ultimate clamps roughness values to 0.01 to avoid dividing by 0.0 in the shader. Roughness of 0.0 is a special
case that may be handled differently by different applications.
In general, try to use roughness values close to 0.01 instead of 0.0 for extremely smooth surfaces.

### Converting Ambient Occlusion
Ambient occlusion can be baked and/or painted by hand. Some games have very dark ambient occlusion maps that may not
work well with Smash Ultimate's lighting.
In that case, the original ambient occlusion map can be rebaked, adjusted to be lighter, or set to white (1.0) if the
added contrast and depth to shading isn't required.

Some physically based renderers such as Blender Cycles don't have shader inputs for ambient occlusion.
The shadowing effect of ambient occlusion is already simulated by the simulation of light rays in the scene.
If the PRM ambient occlusion map contains detail not present in the model's geometry (scales, fur, etc), the albedo
color can be multiplied by the
ambient occlusion to achieve a similar effect.

### Converting Specular
Specular defines the reflectance at normal. This may also be referred to as "f0" or "F0" in some applications.
The specular values are scaled by 0.2, so a specular of 1.0 in Smash Ultimate to a reflectance at normal of 0.2 and 0.0
still corresponds to 0.0.

It's common for applications to define their own specular scale. Blender's Principled BSDF has a specular range of 0% to
8%, so the PRM specular should be converted as
`blender_specular = smash_specular / 0.2 * 0.08`. The reverse direction can be computed as `smash_specular =
blender_specular / 0.08 * 0.2`.

Some applications may use <abbr title="Index of Reflection/Refraction">IOR</abbr> instead of specular.


<script type="module">
    import { PrmDemo } from "./assets/javascript/prm.js";
    import * as DataBinding from "./assets/javascript/databinding.js";

    const imgCanvas = document.getElementById("imgCanvas");

    const getRangeValue = function (range) { return parseFloat(range.value); };

    const albedo = document.getElementById("albedo");

    const metalnessText = document.getElementById("metalnessText");
    const metalnessRange = document.getElementById("metalness");

    const roughnessText = document.getElementById("roughnessText");
    const roughnessRange = document.getElementById("roughness");

    const aoText = document.getElementById("aoText");
    const aoRange = document.getElementById("ao");

    const specularText = document.getElementById("specularText");
    const specularRange = document.getElementById("specular");

    const demo = new PrmDemo(window, imgCanvas,
        albedo.value,
        parseFloat(metalnessText.value),
        parseFloat(roughnessText.value),
        parseFloat(aoText.value),
        parseFloat(specularText.value),
        "{{ "/assets/images/spec_cube/" | relative_url }}", 
        6,
        ".png");

    // Databind PRM Color.
    const prmColor = document.getElementById("prmColor");

    DataBinding.twoWayBindInputsToColor(metalnessText, roughnessText, aoText, prmColor);
    DataBinding.twoWayBindInputsToColor(metalnessRange, roughnessRange, aoRange, prmColor);

    prmColor.addEventListener("input", function () {
        // Update the rendering when the color changes.
        const rgb = DataBinding.hexColorToRgb(prmColor.value);
        demo.updateMetalness(rgb[0]);
        demo.updateRoughness(rgb[1]);
        demo.updateAmbientOcclusion(rgb[2]);
    }, false);

    DataBinding.oneWayBindFloat(metalnessText, metalnessRange, demo.updateMetalness.bind(demo));
    DataBinding.oneWayBindFloat(roughnessText, roughnessRange, demo.updateRoughness.bind(demo));
    DataBinding.oneWayBindFloat(aoText, aoRange, demo.updateAmbientOcclusion.bind(demo));
    DataBinding.oneWayBindFloat(specularText, specularRange, demo.updateSpecular.bind(demo));
    DataBinding.oneWayBindColor(albedo, demo.updateAlbedo.bind(demo));
</script>