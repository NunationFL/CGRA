/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyBillboard extends CGFobject {
	constructor(scene) {
		super(scene);
		this.beam = new MyDoubleSQuad(this.scene);
        this.progress = new MyPlane(this.scene, 40, false);
        this.progressShader = new CGFshader(this.scene.gl,"shaders/progress.vert","shaders/progress.frag");
        this.board = new MyPlane(this.scene, 40, false);
        this.crates = 0;
        this.initMaterials(scene);
    }

    initMaterials(scene) {
    	this.text = new CGFappearance(scene);
        this.text.setAmbient(1, 1, 1, 1.0);
        this.text.setDiffuse(1, 1, 1, 1.0);
        this.text.setDiffuse(1, 1, 1, 1.0);
        this.text.setShininess(10);
        this.text.loadTexture('images/billboard.png');
        this.text.setTextureWrap('REPEAT','REPEAT');

        this.grey = new CGFappearance(scene);
        this.grey.setAmbient(1, 1, 1, 1.0);
        this.grey.setDiffuse(1, 1, 1, 1.0);
        this.grey.setDiffuse(1, 1, 1, 1.0);
        this.grey.setShininess(10);
        this.grey.loadTexture('images/grey.jpg');
        this.grey.setTextureWrap('REPEAT','REPEAT');

        this.progressShader.setUniformsValues({total: 0.0});
    }

    update() {
        if(this.crates<5){
            this.crates++;
        }
        if(this.crates==1){
            this.progressShader.setUniformsValues({total: 1.0});
        }
        else if(this.crates==2){
            this.progressShader.setUniformsValues({total: 2.0});
        }
        else if(this.crates==3){
            this.progressShader.setUniformsValues({total: 3.0});
        }
        else if(this.crates==4){
            this.progressShader.setUniformsValues({total: 4.0});
        }
        else if(this.crates==5){
            this.progressShader.setUniformsValues({total: 5.0});
        }
    }

    reset() {
        this.crates=0.0;
        this.progressShader.setUniformsValues({total: 0.0});
    }
    
    display() {
        this.scene.pushMatrix();
        this.scene.scale(1,3,3);

    	//right beam
        this.scene.pushMatrix();
        this.scene.scale(1,0.75,1);
    	this.scene.translate(-7.5, 0.5, -0.8);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.2,1,1);
        this.grey.apply();
    	this.beam.display();
    	this.scene.popMatrix();

        //left beam
        this.scene.pushMatrix();
        this.scene.scale(1,0.75,1);
    	this.scene.translate(-7.5, 0.5, 0.8);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.2,1,1);
        this.grey.apply();
    	this.beam.display();
        this.scene.popMatrix();
        
        //board
        this.scene.pushMatrix();
        this.scene.translate(-7.5, 0.5+0.5*0.75*2, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(2,1,1);
        this.text.apply();
        this.board.display();
        this.scene.popMatrix();

        //progress bar
        this.scene.pushMatrix();
        this.scene.translate(-7.49, 1.1, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(1.5,0.2,1);
        this.grey.apply();
        this.scene.setActiveShader(this.progressShader);
        this.progress.display();
        this.scene.popMatrix();
        
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix(); 
    }
}