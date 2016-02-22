import Meteorites from './modules/meteorites';
import Planet from './modules/planet';
import Moon from './modules/moon';
import SoundManager from './managers/soundManager';
import GuiManager from './managers/guiManager';

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
		this.useNoise = true;
		this.useVignette = true;
		this.autoRotate = true;
		this.gui = window.gui = new dat.GUI();

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
		
		this.guiManager = new GuiManager();

		// init gui
		this.wagnerGui = this.gui.addFolder('Wagner');
		this.wagnerGui.add(this, 'useNoise');
		this.wagnerGui.add(this, 'useVignette');
		this.wagnerGui.open();

		this.init();
		
		window.addEventListener('resize', this.resize, true);

	}

	init() {

		this.scene = new THREE.Scene();
		// this.scene.fog = new THREE.Fog( this.bgColor, 0.1, 1000 );

		this.renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
		this.renderer.setClearColor(this.bgColor, 1);
		this.renderer.autoClearColor = true;
		
		this.camera = new THREE.PerspectiveCamera(45, this.wWidth/this.wHeight, 1, 2000);
		this.camera.position.z = 700;

		this.renderer.setSize(this.wWidth, this.wHeight);

		this.container = document.getElementById('container');

		this.canvas = this.renderer.domElement;

		this.container.appendChild( this.canvas );

		this.composer = new WAGNER.Composer( this.renderer );
		this.composer.setSize( this.wWidth, this.wHeight ); // or whatever resolution

		this.addLights();

		this.addControls();
		
		this.meteorites = new Meteorites({ count:100 });
		this.planet = new Planet({ radius:100 });
		this.moon = new Moon({ radius:20 });

		this.scene.add( this.meteorites );
		this.scene.add( this.planet );
		this.scene.add( this.moon );

		// add sound manager
		this.soundManager = new SoundManager();
		
		this.update();
		
		this.gui.add(this, 'autoRotate');

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
		this.controls.noZoom = true;
		this.controls.noPan = true;
		this.controls.noRoll = true;
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
		if (this.useNoise) this.composer.pass( this.noisePass );
		if (this.useVignette) this.composer.pass( this.vignettePass );
		
		// this.composer.pass( this.multiPassBloomPass );
		// this.composer.pass( this.vignette2Pass );
		// this.composer.pass( this.fxaaPass );
		// this.composer.pass( this.zoomBlurPass );
		
		this.composer.toScreen();
		
		if (this.autoRotate) {
			this.scene.rotation.x += 0.002;
			this.scene.rotation.y += 0.002;
			this.scene.rotation.z += 0.002;
		}

		this.soundManager.update();
		this.planet.update();
		this.meteorites.update();
		this.moon.update();

	}

	resize () {

		this.wWidth = window.innerWidth;
		this.wHeight = window.innerHeight;

		this.camera.aspect = this.wWidth / this.wHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( this.wWidth, this.wHeight );

	}

}

window.app = new App();