var Three = require( 'three.js' );

var EarthUniforms = require( '../shaders/Earth.u.js' );
var EarthGround = {
	fragmentShader: require( '../shaders/EarthGround.fs.js' );
	vertexShader: require( '../shaders/EarthGround.vs.js' );
};
var EarthSky = {
	fragmentShader: require( '../shaders/EarthSky.fs.js' );
	vertexShader: require( '../shaders/EarthSky.vs.js' );
};

class Realistic extends Three.Object3D {
	constructor( context ) {
		super();

		var that = this;
		this.clock = context.clock;
		this.sun = new Orb.Point3( 0, 0, 1 );
		this.camera = camera;

		this.uniforms = Three.UniformsUtils.clone( THREE.UniformsLib.earth );

		// create terrain geometry
		{
			var geometry = new THREE.SphereGeometry( THREE.Constants.atmosphere.innerRadius, 100, 100 );
			geometry = new THREE.BufferGeometry().fromGeometry( geometry );

			var material = new THREE.ShaderMaterial( Object.assign( {
				uniforms: this.uniforms,
				depthWrite: true,
			}, EarthGround ) );

			var mesh = new THREE.Mesh( geometry, material );
			mesh.name = 'terrain';

			this.add( mesh );

		};

		// create sky geometry
		{
			var geometry = new THREE.SphereGeometry( THREE.Constants.atmosphere.outerRadius, 100, 100 );
			geometry = new THREE.BufferGeometry().fromGeometry( geometry );

			var material = new THREE.ShaderMaterial( Object.assign( {
				uniforms: this.uniforms,
				side: THREE.BackSide,
				transparent: true,
				blending: THREE.AdditiveBlending
			}, EarthSky ) );

			var mesh = new THREE.Mesh( geometry, material );
			mesh.name = 'sky';

			this.add( mesh );
		};

		this.loader.load( 'data/earth.color.jpg', ( t ) => {
			t.anisotropy = 16;
			this.uniforms.tDiffuse.value = t;
		} );

	}

	updateMatrixWorld() {
		super.updateMatrixWorld();

		var cameraHeight = this.camera.position.length();

		var date = this.clock.date;
		this.sun.setAstronomical( Orb.Math.solar_position( Orb.Math.day_of_year( date ), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds() ) );

		//Orb.Point3.prototype.setAstronomical.call(this.camera.position, Orb.Math.solar_position(Orb.Math.day_of_year(date), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()), cameraHeight);
		//this.camera.lookAt(new Orb.Point3());

		this.uniforms.v3LightPosition.value.copy( this.sun );
		this.uniforms.fCameraHeight.value = cameraHeight;
		this.uniforms.fCameraHeight2.value = cameraHeight * cameraHeight;
	}
};

module.exports = Realistic;