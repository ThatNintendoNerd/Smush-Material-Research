---
---
# Diffuse Cube Maps (Texture8) - WIP

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
    </div>
</div>

<script type="module">
    import { DifCubeDemo } from "./assets/javascript/difcube.js";

    const imgCanvas = document.getElementById("imgCanvas");
    const demo = new DifCubeDemo(window, imgCanvas,
        "{{ "/assets/images/dif_cube/" | relative_url }}");

    document.getElementById("sphere").addEventListener("click", function () { demo.setSphere(); }, false);
    document.getElementById("cube").addEventListener("click", function () { demo.setCube(); }, false);
</script>