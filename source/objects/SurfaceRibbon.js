var Three = require( 'three.js' );

var ScreenUniforms = require( '../shaders/Screen.u.js' );

class SurfaceRibbion extends Three.Mesh {
	constructor( geometry, material ) {

		var geometry = geometry !== undefined ? geometry : new THREE.Geometry();
		var material = material !== undefined ? material : new THREE.ShaderMaterial( {

			uniforms: this.uniforms,
			vertexShader: Orb.Graphics.Shaders[ 'line-ribbon-surface-vertex' ],
			fragmentShader: Orb.Graphics.Shaders[ 'line-ribbon-fragment' ],
			//side:           THREE.DoubleSide,
			blending: THREE.AdditiveBlending,
			//depthTest:      false,
			depthWrite: false,
			transparent: true

		} );

		super( geometry, material );

		this.setDrawMode( Three.TriangleStripDrawMode );

		this.uniforms = Three.UniformsUtils.clone( ScreenUniforms );
		this.uniforms.targetSize.value.set( window.innerWidth, window.innerHeight );
		//this.uniforms.lineWidth.value = 2;

	}
};

module.exports = SurfaceRibbion;