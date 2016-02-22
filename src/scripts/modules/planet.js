const Color = require('color');

class Planet extends THREE.Object3D {

	constructor ( opt ) {

		super();

		// params
		this.opt = opt;
		this.radius = opt.radius || 100;
		this.color = '#111111';
		this.specular = Color(this.color);
		this.specular.lighten(1.8);

		// material
		this.material = new THREE.MeshPhongMaterial({
			color : this.color,
			shininess : 0,
			specular : this.specular.hexString().replace( '#','0x' ),
			emissive : this.color,
			shading : THREE.FlatShading
		});

		// geometry
		this.geometry = new THREE.IcosahedronGeometry( this.radius, 0 );


		// mesh
		this.mesh = new THREE.Mesh( this.geometry, this.material );

		// gui
		this.initGui();

		this.add( this.mesh );

	}

	initGui () {

		this.planetGui = window.gui.addFolder('Planet');
		this.planetGui.add(this, 'radius', 20, 200);
		this.planetGui.addColor(this, 'color');

	}

	update() {

		if (window.app) {
			this.mesh.scale.x = this.radius / this.opt.radius + window.app.soundManager.drum * 1;
			this.mesh.scale.y = this.radius / this.opt.radius + window.app.soundManager.drum * 1;
			this.mesh.scale.z = this.radius / this.opt.radius + window.app.soundManager.drum * 1;
		}

		// color
		this.mesh.material.color.setHex( this.color.replace( '#','0x' ) );
		this.mesh.material.emissive.setHex( this.color.replace( '#','0x' ) );
		this.specular = Color(this.color);
		this.specular.lighten(1.8);
		this.mesh.material.specular.setHex( this.specular.hexString().replace( '#','0x' ) );

	}
	
}

export default Planet;