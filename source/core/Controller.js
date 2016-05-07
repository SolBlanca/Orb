var Three = require( 'three.js' );

var Clock = require( './Clock' );
var Context = require( './Context' );

class Controller {

	constructor( element ) {
		this.clock = new Clock();
		this.clock.start();

		this.camera = new Three.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 3000 );
		this.camera.position.z = 400;

		this.loader = new Three.TextureLoader();
		this.scene = new Three.Scene();

		this.controls = new Three.TrackballControls( this.camera );
		this.controls.rotateSpeed = 2.0;
		this.controls.zoomSpeed = 1.2;
		this.controls.panSpeed = 0.8;
		this.controls.noZoom = false;
		this.controls.noPan = true;
		this.controls.staticMoving = true;
		this.controls.dynamicDampingFactor = 0.3;
		this.controls.keys = [ 65, 83, 68 ];
		//this.controls.addEventListener('change', this.render.bind(this));

		this.renderer = new Three.WebGLRenderer();
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( this.renderer.domElement );

		//

		window.addEventListener( 'resize', this.onWindowResize.bind( this ), false );
	}

	onWindowResize() {

		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( window.innerWidth, window.innerHeight );
	}

	animate() {
		requestAnimationFrame( this.animate.bind( this ) );

		this.controls.update();
		this.renderer.render( this.scene, this.camera );

		$( '#datetime' ).text( this.clock.elapsedDate.toDateString() );
	}	

}

module.exports = Controller;