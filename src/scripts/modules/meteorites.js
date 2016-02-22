class Meteorites extends THREE.Object3D {

	constructor ( opt ) {

		super();

		// params
		this.meteorites = [];

		// material
		this.material = new THREE.MeshPhongMaterial({
			color:0x000000,
			shininess:0,
			specular:0x333333,
			emissive:0x000000,
			shading:THREE.FlatShading // THREE.SmoothShading
		});

		// geometry
		this.geometry = new THREE.TetrahedronGeometry( 20, 1 );

		// meshes
		let pos, scale, radius;
		for (let i=0; i<opt.count; ++i) {
			radius = Math.floor(Math.random() * 400) + 800;
			pos = this.getPoint(0,0,0,radius);
			scale = Math.random() * 2 + 1;
			this.mesh = new THREE.Mesh( this.geometry, this.material );
			this.mesh.position.x = pos.x;
			this.mesh.position.y = pos.y;
			this.mesh.position.z = pos.z;
			this.mesh.rotation.x = pos.x;
			this.mesh.rotation.y = pos.y;
			this.mesh.rotation.z = pos.z;
			this.mesh.scale.x = scale;
			this.mesh.scale.y = scale;
			this.mesh.scale.z = scale;
			this.add(this.mesh);
			this.meteorites.push(this.mesh);
		}

	}

	/* get random point on sphere
	 * [x0,y0,z0] : point sphere center
	 * radius : sphere radius
	 */
	getPoint ( x0,y0,z0,radius ) {

		var u = Math.random();
		var v = Math.random();
		var theta = 2 * Math.PI * u;
		var phi = Math.acos(2 * v - 1);
		var x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
		var y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
		var z = z0 + (radius * Math.cos(phi));
		return new THREE.Vector3(x,y,z);

	}

	update () {

		for (let i=0; i<this.meteorites.length; ++i) {
			this.meteorites[i].rotation.x += 0.006;
			this.meteorites[i].rotation.y += 0.006;
			this.meteorites[i].rotation.z += 0.006;

			if (window.app) {
				this.meteorites[i].scale.x = 1 + window.app.soundManager.midBass * 1.2;
				this.meteorites[i].scale.y = 1 + window.app.soundManager.midBass * 1.2;
				this.meteorites[i].scale.z = 1 + window.app.soundManager.midBass * 1.2;
			}
		}

	}

}

export default Meteorites;