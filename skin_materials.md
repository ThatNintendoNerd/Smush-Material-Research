---
# Skin Materials
TODO

<canvas id="imgCanvas"></canvas>
<label for="metalness">
    Metalness
    <input type="range" value="255" min="0" max="255" name="metalness" id="metalness">
</label>
<br>
<label for="albedo">
    Albedo
    <input type="color" name="albedo" id="albedo" value="#808080">
</label>
<br>
<label for="customVector11">
    CustomVector11.rgb
    <input type="color" name="customVector11" id="customVector11" value="#592626">
</label>
<br>
<label for="customVector30x">
    CustomVector30.x
    <input type="range" value="128" min="0" max="255" name="customVector30x" id="customVector30x">
</label>
<br>
<label for="customVector30y">
    CustomVector30.y
    <input type="range" value="255" min="0" max="255" name="customVector30y" id="customVector30y">
</label>

<script type="module">
    import { SssDemo } from "./js/skin_materials.js";
    const imgCanvas = document.getElementById("imgCanvas");

    const albedo = document.getElementById("albedo");
    const customVector11 = document.getElementById("customVector11");
    const metalness = document.getElementById("metalness");
    const customVector30x = document.getElementById("customVector30x");
    const customVector30y = document.getElementById("customVector30y");

    const getRangeValue = function (range, maxValue = 1.0) { return range.value / range.max * maxValue; };

    const demo = new SssDemo(window, imgCanvas,
        albedo.value,
        customVector11.value,
        getRangeValue(customVector30x),
        getRangeValue(customVector30y, 30),
        getRangeValue(metalness));

    albedo.addEventListener("input", function () {
        demo.updateAlbedo(albedo.value);
    });

    customVector11.addEventListener("input", function () {
        demo.updateCustomVector11(customVector11.value);
    });

    metalness.addEventListener("input", function () {
        demo.updateMetalness(getRangeValue(metalness));
    });

    customVector30x.addEventListener("input", function () {
        demo.updateCustomVector30x(getRangeValue(customVector30x));
    });

    customVector30y.addEventListener("input", function () {
        demo.updateCustomVector30y(getRangeValue(customVector30y, 30));
    });
</script>