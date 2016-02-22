class Planet extends THREE.Object3D {

	constructor () {

		super();

		// material
		this.material = new THREE.MeshPhongMaterial({
			color:0x000000,
			shininess:0,
			specular:0x333333,
			emissive:0x000000,
			shading:THREE.FlatShading
		});

		// geometry
		this.geometry = new THREE.IcosahedronGeometry( 120, 0 );

		// mesh
		this.mesh = new THREE.Mesh( this.geometry, this.material );

		this.add( this.mesh );

	}

	update() {



	}
	
}

export default Planet;