---
---
# Post Processing - WIP

## Bloom 
Bloom adds a glow around bright parts of the image. Any pixel in the frame that is brighter than a certain threshold contributes to bloom. The brighter the pixel, the more intense the bloom. The bloom threshold is calculated as follows. 
```glsl
float componentMax = max(max(inputColor.r, max(inputColor.g, inputColor.b)), 0.001);
float scale = max(0.925 * -0.5 + componentMax, 0.0);
vec3 bloomColor = inputColor.rgb / componentMax * scale * 6.0;
```

The graph below demonstrates the bloom intensity for different brightness values. The brightness threshold is roughly 75%, so any pixels with a brightness of 75% or higher will have some blooming. The graph only shows input values in the range 0.0 to 1.0, but its normal for models to have rendered brightness values much higher than 1.0 due to specular highlights, bright lighting, or certain material parameters.
<img src="{{ "/assets/images/post_processing/bloom_threshold.png" | relative_url }}" height="auto" width="auto">


## Color Grading LUTs
Each stage has a 3D <abbr title="Lookup Table">LUT</abbr> texture to add color grading to the final rendered image. The same technique is used for the snapshot filters. The color grading LUT stores a transformation from the unedited colors to their corresponding edited colors. The <a href="https://docs.unrealengine.com/en-US/RenderingAndGraphics/PostProcessEffects/UsingLUTs/index.html" target="_blank">Unreal Engine Docs</a> have a good description of how a 3D LUT can be used to perform color grading.  *There is no way to edit these textures at this time without hex editing*. 

Each input color is used as 3d texture coordinates for the color grading LUT. If every set of 3d texture coordinates (R,G,B)
has an identical corresponding texture value of (R,G,B), the texture has no effect on the final image color. A useful property of 
color grading LUTs is that any image editing operations that don't target individual pixels such as curves, levels, exposure, color balance, HSL, gradient maps, etc applied to the LUT will also apply to the final image. Simply apply the adjustments to a neutral color grading LUT and then save the result. 

## Post Processing Pass 
<figure class="figure">
    <img src="{{ "/assets/images/post_processing/post_processing.jpg" | relative_url }}" height="auto" width="auto">
    <figcaption class="figure-caption text-center">The base image (left), the image after applying bloom (center), and the final image after post processing (right)</figcaption>
</figure>
Smash Ultimate applies an additional post processing pass after bloom and the color grading LUT has been applied. This step brightens the overall image significantly. The resulting image is roughly 1.4x brighter. The exact code is below. 

```glsl
vec3 GetPostProcessingResult(vec3 linear)
{
    // Convert to SRGB before applying the LUT.
    vec3 srgb = pow(fragColor0.rgb, vec3(0.454545));
    vec3 result = srgb * 0.9375 + 0.03125;

    // Apply the color grading LUT.
    result = texture(colorGradingLut, result.rgb).rgb;

    // Brighten the overall image. 
    result = (result - srgb) * 0.99961 + srgb;
    result *= 1.3703;

    // Convert back to linear.
    result = pow(result, vec3(2.2));
    return result;
}
```