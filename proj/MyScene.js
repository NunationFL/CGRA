/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Applied Materials
        this.material=new CGFappearance(this);
        this.material.setAmbient(0.9, 0.9, 0.9, 1);
        this.material.setDiffuse(0.2, 0.2, 0.2, 1);
        this.material.setDiffuse(0.2, 0.2, 0.2, 1);
        this.material.setShininess(10);
        this.material.loadTexture('images/earth.jpg');
        this.material.setTextureWrap('REPEAT','REPEAT');
        
        //TextureIDs
        this.textureIDs = {
            'Cube Map': 0,
            'Forest': 1
        }
        //-----

        this.slices = 16;
        this.stacks = 8;
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, this.slices, this.stacks);
        this.cylinder = new MyCylinder(this, this.slices);
        this.vehicle = new MyVehicle(this, this.slices, this.stacks);
        this.cubeMap = new MyCubeMap(this);
        this.objects = [this.incompleteSphere, this.cylinder, this.vehicle];

        this.objectIDs = {
            'Sphere': 0 , 
            'Cylinder': 1,
            'Vehicle': 2
        };

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayObject = true;
        this.displayCubeMap = true;
        this.displayNormals = false;
        this.selectedObject = 0;
        this.selectedTexture = 0;
        this.scaleFactor = 1.0;
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        //To be done...
    }

    updateObject() {
        this.objects[this.selectedObject];
    }

    updateTexture() {
        this.cubeMap.updateTexture();
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);

        if (this.displayNormals)
            this.objects[this.selectedObject].enableNormalViz();
        else
            this.objects[this.selectedObject].disableNormalViz();
        
        if (this.displayObject) {
            this.pushMatrix();
            this.objects[this.selectedObject].display();
            this.popMatrix();
        }

        if (this.displayCubeMap) {
            this.cubeMap.display();
        }

        // ---- END Primitive drawing section
    }
}