/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-0.5, 0.5, -0.5,    //0 top back left
			-0.5, 0.5, 0.5,     //1 top front left
			0.5, 0.5, 0.5,      //2 top front right
			0.5, 0.5, -0.5,     //3 top back right
			-0.5, -0.5, -0.5,   //4 bottom back left
			-0.5, -0.5, 0.5,    //5 bottom front left
			0.5, -0.5, 0.5,     //6 bottom front right
			0.5, -0.5, -0.5,     //7 bottom back right

			-0.5, 0.5, -0.5,    //8 top back left
			-0.5, 0.5, 0.5,     //9 top front left
			0.5, 0.5, 0.5,      //10 top front right
			0.5, 0.5, -0.5,     //11 top back right
			-0.5, -0.5, -0.5,   //12 bottom back left
			-0.5, -0.5, 0.5,    //13 bottom front left
			0.5, -0.5, 0.5,     //14 bottom front right
			0.5, -0.5, -0.5,     //15 bottom back right

			-0.5, 0.5, -0.5,    //16 top back left
			-0.5, 0.5, 0.5,     //17 top front left
			0.5, 0.5, 0.5,      //18 top front right
			0.5, 0.5, -0.5,     //19 top back right
			-0.5, -0.5, -0.5,   //20 bottom back left
			-0.5, -0.5, 0.5,    //21 bottom front left
			0.5, -0.5, 0.5,     //22 bottom front right
			0.5, -0.5, -0.5,     //23 bottom back right
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 3,    //face de cima
            3, 1, 2,
            
			6, 5, 4,    //face de baixo
            6, 4, 7,
            
			2, 1, 5,    //face no eixo dos z positivos
            2, 5, 6,
            
			4, 0, 3,    //face no eixo dos z negativos
            7, 4, 3,
            
			3, 2, 6,    //face no eixo dos x positivos
            3, 6, 7,
            
			5, 1, 0,    //face no eixo dos x negativos
			4, 5, 0
		];

		this.normals = [
			0,1,0,
			0,1,0,
			0,1,0,
			0,1,0,
			0,-1,0,
			0,-1,0,
			0,-1,0,
			0,-1,0,

			0,0,-1,
			0,0,1,
			0,0,1,
			0,0,-1,
			0,0,-1,
			0,0,1,
			0,0,1,
			0,0,-1,

			-1,0,0,
			-1,0,0,
			1,0,0,
			1,0,0,
			-1,0,0,
			-1,0,0,
			1,0,0,
			1,0,0,

		]
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
	updateBuffers(complexity){
	}
}