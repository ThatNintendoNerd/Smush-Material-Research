---
---
# Diffuse Cube Maps (Texture8) - WIP

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
    </div>
</div>

<script type="module">
    import { DifCubeDemo } from "./assets/javascript/difcube.js";

    const imgCanvas = document.getElementById("imgCanvas");
    const demo = new DifCubeDemo(window, imgCanvas,
        "{{ "/assets/images/dif_cube/" | relative_url }}");
</script>