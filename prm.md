---
---
# PRM Maps - WIP

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
                <div class="form-group row justify-content-end">
                    <label for="albedo" class="col-md-5 col-form-label">Albedo</label>
                    <input type="color" name="albedo" id="albedo" value="#3D3D3D" class="col-md-2">
                    <div class="col"></div>
                </div>
                <div class="form-group row justify-content-end">
                    <label for="metalness" class="col-md-5 col-form-label">Metalness</label>
                    <input type="text" value="0.0" name="metalness" id="metalnessText" class="col-md-2">
                    <input type="range" value="0.0" min="0.0" max="1.0" step="0.001" name="metalness" id="metalness"
                        class="col">
                </div>
                <div class="form-group row justify-content-end">
                    <label for="roughness" class="col-md-5 col-form-label">Roughness</label>
                    <input type="text" value="0.5" name="roughness" id="roughnessText" class="col-md-2">
                    <input type="range" value="0.5" min="0.0" max="1.0" step="0.001" name="roughness" id="roughness"
                        class="col">
                </div>
                <div class="form-group row justify-content-end">
                    <label for="ao" class="col-md-5 col-form-label">Ambient Occlusion</label>
                    <input type="text" value="1.0" name="ao" id="aoText" class="col-md-2">
                    <input type="range" value="1.0" min="0.0" max="1.0" step="0.001" name="ao" id="ao"
                        class="col">
                </div>
                <div class="form-group row justify-content-end">
                    <label for="specular" class="col-md-5 col-form-label">Specular</label>
                    <input type="text" value="0.16" name="specular" id="specularText" class="col-md-2">
                    <input type="range" value="0.16" min="0.0" max="1.0" step="0.001" name="specular" id="specular"
                        class="col">
                </div>
            </form>
        </div>
    </div>
</div>

<script type="module">
    import { PrmDemo } from "./assets/javascript/prm.js";
    const imgCanvas = document.getElementById("imgCanvas");

    const getRangeValue = function (range) { return parseFloat(range.value); };

    const albedo = document.getElementById("albedo");

    const metalnessText = document.getElementById("metalnessText");
    const roughnessText = document.getElementById("roughnessText");
    const aoText = document.getElementById("aoText");
    const specularText = document.getElementById("specularText");

    const demo = new PrmDemo(window, imgCanvas, 
        albedo.value, 
        parseFloat(metalnessText.value), 
        parseFloat(roughnessText.value), 
        parseFloat(aoText.value), 
        parseFloat(specularText.value));

    metalnessText.addEventListener("input", function () {
        metalness.value = metalnessText.value;
        demo.updateMetalness(parseFloat(metalnessText.value));
    });
    metalness.addEventListener("input", function () {
        demo.updateMetalness(getRangeValue(metalness));
        metalnessText.value = metalness.value;
    });

    roughnessText.addEventListener("input", function () {
        roughness.value = roughnessText.value;
        demo.updateRoughness(parseFloat(roughnessText.value));
    });
    roughness.addEventListener("input", function () {
        demo.updateRoughness(getRangeValue(roughness));
        roughnessText.value = roughness.value;
    });

    specularText.addEventListener("input", function () {
        specular.value = specularText.value;
        demo.updateSpecular(parseFloat(specularText.value));
    });
    specular.addEventListener("input", function () {
        demo.updateSpecular(getRangeValue(specular));
        specularText.value = specular.value;
    });

    aoText.addEventListener("input", function () {
        ao.value = aoText.value;
        demo.updateAmbientOcclusion(parseFloat(aoText.value));
    });
    ao.addEventListener("input", function () {
        demo.updateAmbientOcclusion(getRangeValue(ao));
        aoText.value = ao.value;
    });

    albedo.addEventListener("input", function () {
        demo.updateAlbedo(albedo.value);
    });
</script>