const Color = require('color');

class Moon extends THREE.Object3D {

	constructor ( opt ) {

		super();

		this.opt = opt;
		this.radius = opt.radius || 20;
		this.color = '#666666';
		this.emissive = Color(this.color);
		this.emissive.lighten(0.4);
		this.colorLight = Color(this.color);
		this.colorLight.lighten(0.2);

		// material
		this.material = new THREE.MeshPhongMaterial({
			color:this.color,
			shininess:0,
			specular:0x000000,
			emissive:this.emissive.hexString().replace( '#','0x' ),//0x999999
			shading:THREE.FlatShading
		});

		// geometry
		this.geometry = new THREE.IcosahedronGeometry( opt.radius, 0 );
				
		// mesh
		this.mesh = new THREE.Mesh( this.geometry, this.material );
		this.mesh.position.x = 100;
		this.mesh.position.y = 100;
		this.mesh.position.z = 100;
		this.add( this.mesh );

		this.frontLight = new THREE.DirectionalLight(this.colorLight.hexString().replace( '#','0x' ), 4);
		this.frontLight.position.set(80,80,80);
		this.add(this.frontLight);

		this.backLight = new THREE.DirectionalLight(this.colorLight.hexString().replace( '#','0x' ), 0.5);
		this.backLight.position.set(-80,-80,-80);
		this.add(this.backLight);

		// gui
		this.initGui();

	}

	initGui () {

		this.luneGui = window.gui.addFolder('Moon');
		this.luneGui.add(this, 'radius', 4, 30);
		this.luneGui.addColor(this, 'color');
		this.luneGui.open();

	}

	update() {

		this.rotation.y += 0.008;

		if (window.app) {
			this.mesh.scale.x = this.radius / this.opt.radius + window.app.soundManager.bass;
			this.mesh.scale.y = this.radius / this.opt.radius + window.app.soundManager.bass;
			this.mesh.scale.z = this.radius / this.opt.radius + window.app.soundManager.bass;
		}

		// mesh color
		this.mesh.material.color.setHex( this.color.replace( '#','0x' ) );
		this.mesh.material.emissive.setHex( this.color.replace( '#','0x' ) );
		this.emissive = Color(this.color);
		this.emissive.lighten(0.4);
		this.mesh.material.emissive.setHex( this.emissive.hexString().replace( '#','0x' ) );

		// light color
		this.colorLight = Color(this.color);
		this.colorLight.lighten(0.2);
		this.frontLight.color.setHex( this.colorLight.hexString().replace( '#','0x' ) );
		this.backLight.color.setHex( this.colorLight.hexString().replace( '#','0x' ) );

	}
	
}

export default Moon;