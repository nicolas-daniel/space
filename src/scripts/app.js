import Meteorites from './modules/meteorites';
import Planet from './modules/planet';
import Lune from './modules/lune';

WAGNER.vertexShadersPath = '/shaders/vertex-shaders';
WAGNER.fragmentShadersPath = '/shaders/fragment-shaders';
WAGNER.assetsPath = '/assets/';

class App {
	
	constructor() {

		// binded
		this.resize = this.resize.bind(this);
		this.animate = this.animate.bind(this);

		// params
		this.bgColor = 0x1a1a1a;
		this.wWidth = window.innerWidth;
		this.wHeight = window.innerHeight;

		// wagner passes
		this.zoomBlurPass = new WAGNER.ZoomBlurPass();
		this.noisePass = new WAGNER.NoisePass();
		this.multiPassBloomPass = new WAGNER.MultiPassBloomPass();
		this.fxaaPass = new WAGNER.FXAAPass();
		this.vignettePass = new WAGNER.VignettePass();
		this.vignette2Pass = new WAGNER.Vignette2Pass();

		// noise pass
		this.noisePass.params.amount = 0.05;
		this.noisePass.params.speed = 0.05;
		
		// zoom blur pass
		this.zoomBlurPass.params.strength = 0.02;
		this.zoomBlurPass.params.applyZoomBlur = 0.02;

		// vignette pass
		this.vignette2Pass.params.boost = 2;
		this.vignette2Pass.params.reduction = 4;
		
		this.init();
		
		window.addEventListener('resize', this.resize, true);

	}

	init() {

		this.scene = new THREE.Scene();
		// this.scene.fog = new THREE.Fog( this.bgColor, 0.1, 1000 );

		this.renderer = new THREE.WebGLRenderer({ antialias:false, alpha:true });
		this.renderer.setClearColor(this.bgColor, 1);
		this.renderer.autoClearColor = true;
		
		this.camera = new THREE.PerspectiveCamera(45, this.wWidth/this.wHeight, 1, 2000);
		this.camera.position.z = 600;

		this.renderer.setSize(this.wWidth, this.wHeight);

		this.container = document.getElementById('container');

		this.canvas = this.renderer.domElement;

		this.container.appendChild( this.canvas );

		this.composer = new WAGNER.Composer( this.renderer );
		this.composer.setSize( this.wWidth, this.wHeight ); // or whatever resolution

		this.addLights();

		this.addControls();
		
		this.meteorites = new Meteorites( this.scene );
		this.planet = new Planet( this.scene );
		this.lune = new Lune( this.scene );

		this.scene.add( this.meteorites );
		this.scene.add( this.planet );
		this.scene.add( this.lune );

		this.update();

	}

	addLights() {

		let light = new THREE.DirectionalLight(0xffffff, 0.5);
		light.position.set(300,300,300);
		this.scene.add(light);
		
		let pointlight = new THREE.PointLight(0xffffff, 2, 2000);
		this.scene.add(pointlight);

    }

	addControls() {

		this.controls = new THREE.TrackballControls( this.camera );
		this.controls.maxDistance = 1000;
		this.controls.minDistance = 100;
		this.controls.dynamicDampingFactor = .15;
		this.controls.addEventListener('change', this.animate);

	}

	update() {

		this.controls.update();
		
		this.animate()

		requestAnimationFrame(this.update.bind(this))
		
	}

	animate() {

		this.composer.reset();
		this.composer.render( this.scene, this.camera );
		this.composer.pass( this.noisePass );
		this.composer.pass( this.vignettePass );
		
		// this.composer.pass( this.multiPassBloomPass );
		// this.composer.pass( this.vignette2Pass );
		// this.composer.pass( this.fxaaPass );
		// this.composer.pass( this.zoomBlurPass );
		
		this.composer.toScreen();
		
		this.scene.rotation.x += 0.002;
		this.scene.rotation.y += 0.002;
		this.scene.rotation.z += 0.002;

		this.planet.update();
		this.meteorites.update();
		this.lune.update();

	}

	resize () {

		this.wWidth = window.innerWidth;
		this.wHeight = window.innerHeight;

		this.camera.aspect = this.wWidth / this.wHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( this.wWidth, this.wHeight );

	}

}

let app = new App();