/**
 * Stores the state necessary for drawing a textured quad.
 */
class TextureScene {
    constructor(material, canvas) {
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true
        });
    
        this.updateRenderHeight();
        window.addEventListener('resize', function (e) {
            this.updateRenderHeight();
        });
    
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2, 1, 1), material);
        this.scene.add(quad);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Set the renderer dimensions to the max dimension of the canvas.
     * This assumes a 1:1 aspect ratio but improves the output resolution.
     */
    updateRenderHeight() {
        const maxDimension = Math.max(this.renderer.domElement.clientWidth, this.renderer.domElement.clientHeight);
        this.renderer.setSize(maxDimension, maxDimension, false);
    };
}