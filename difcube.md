---
---
# Diffuse Cube Maps (Texture8) - WIP
Diffuse cube maps are used for special materials that use an environment cube map to color the model. 
Click and drag on desktop or touch and drag on mobile to orbit the camera in the demo below. Switch between a sphere and cube 
to see the impact of different geometry on the resulting reflections.

<style>
    #imgCanvas {
        width: 100%;
        outline: none;
    }
</style>

<div class="container">
    <div class="row">
        <div class="col-md-5 my-auto">
            <canvas id="imgCanvas" class="row"></canvas>
            <form class="row">
                <div class="form-check form-check-inline">
                    <input type="radio" name="shape" id="sphere" class="form-check-input" value="sphere" checked>
                    <label for="sphere" class="form-check-label">Sphere Mesh</label>
                </div>
                <div class="form-check form-check-inline">
                    <input type="radio" name="shape" id="cube" class="form-check-input" value="cube">
                    <label for="cube" class="form-check-label">Cube Mesh</label>
                </div>
            </form>
        </div>
        <div class="col">
            <img src="{{ "/assets/images/dif_cube/cubemap.jpg" | relative_url }}" height="auto" width="auto">
        </div>
    </div>
</div>

## Diffuse Cube Map Channels
### Color (<span style="color:red">R</span><span style="color:green">G</span><span style="color:blue">B</span>)


### Opacity (Alpha)

<script type="module">
    import { DifCubeDemo } from "./assets/javascript/difcube.js";

    const imgCanvas = document.getElementById("imgCanvas");
    const demo = new DifCubeDemo(window, imgCanvas,
        "{{ "/assets/images/dif_cube/" | relative_url }}");

    document.getElementById("sphere").addEventListener("click", function () { demo.setSphere(); }, false);
    document.getElementById("cube").addEventListener("click", function () { demo.setCube(); }, false);
</script>