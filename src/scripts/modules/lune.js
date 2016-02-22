class Lune extends THREE.Object3D {

	constructor () {

		super();

		// material
		this.material = new THREE.MeshPhongMaterial({
			color:0x666666,
			shininess:0,
			specular:0x000000,
			emissive:0x999999,
			shading:THREE.FlatShading
		});

		// geometry
		this.geometry = new THREE.IcosahedronGeometry( 30, 0 );
				
		// mesh
		this.mesh = new THREE.Mesh( this.geometry, this.material );
		this.mesh.position.x = 100;
		this.mesh.position.y = 100;
		this.mesh.position.z = 100;
		this.add( this.mesh );

		this.light = new THREE.DirectionalLight(0xffffff, 4);
		this.light.position.set(80,80,80);
		this.add(this.light);

		this.light = new THREE.DirectionalLight(0xffffff, 0.5);
		this.light.position.set(-80,-80,-80);
		this.add(this.light);

	}

	update() {

		this.rotation.y += 0.008;

	}
	
}

export default Lune;