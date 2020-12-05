---
---
# Col Maps (Texture0, Texture1) - WIP
Col maps control the albedo of a model. This corresponds to the base color input of
<a href="https://docs.blender.org/manual/en/latest/render/shader_nodes/shader/principled.html" target="_blank">Blender's
    Principled Shader</a>.
This is the primary texture to edit when recoloring a model. PRM and NOR maps can greatly improve the quality of a
model,
but they aren't strictly necessary.

## Col Map Channels
Col maps contain color data, so they should be saved with srgb formats. Srgb formats have names that end in _SRGB.
When rendering in programs such as Maya or Blender, set the Col maps to Color, Srgb, etc to ensure they are properly
gamma corrected. The game assumes that Col maps are gamma corrected. Failing to use an Srgb format will result in the
textures being too bright and looking washed out.

### Albedo/Base Color (<span style="color:red">R</span><span style="color:green">G</span><span style="color:blue">B</span>)

### Opacity (Alpha)

## Col Map Naming Conventions
Col maps tend to follow certain naming conventions.
The texture name itself has no impact on how the texture is used.

<table class="table table-striped">
    <thead>
        <tr>
            <th scope="col" class="w-25">Col Texture Name</th>
            <th scope="col">Usage</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>_b</td>
            <td>Default Iris</td>
        </tr>
        <tr>
            <td>_l</td>
            <td>World of Light Enemy Iris (Red)</td>
        </tr>
        <tr>
            <td>_g</td>
            <td>Final Smash Iris (Yellow)</td>
        </tr>
        <tr>
            <td>_w</td>
            <td>Default Eye White</td>
        </tr>
        <tr>
            <td>_d</td>
            <td>World of Light Enemy Dark Iris (Purple)</td>
        </tr>
        <tr>
            <td>_wd</td>
            <td>World of Light Enemy Dark Eye White</td>
        </tr>
        <tr>
            <td>alp_</td>
            <td>Hair Color</td>
        </tr>
        <tr>
            <td>def_</td>
            <td>Main Color</td>
        </tr>
    </tbody>
</table>