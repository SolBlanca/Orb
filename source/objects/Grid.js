var Three = require( 'three.js' );

class Grid extends Three.Line {
	constructor( radius, segments ) {
		var geometry = new THREE.Geometry();

		for ( var ilat = -90 + 15; ilat < 90; ilat += 15 ) {
			for ( var ilong = 0; ilong <= 360; ilong += 360 / segments ) {
				geometry.vertices.push( new Orb.Point3().setGeographic( ilat * Orb.Math.deg_to_rad, ilong * Orb.Math.deg_to_rad ).multiplyScalar( radius ) );
			}
		}

		for ( var ilong = 0; ilong < 360; ilong += 15 ) {
			for ( var ilat = -90; ilat <= 90; ilat += 180 / segments ) {
				geometry.vertices.push( new Orb.Point3().setGeographic( ilat * Orb.Math.deg_to_rad, ilong * Orb.Math.deg_to_rad ).multiplyScalar( radius ) );
			}
		}

		var material = new THREE.LineBasicMaterial( {
			color: 0x41879E,
			transparent: true,
			opacity: 0.5,
			blending: THREE.AdditiveBlending
		} );

		super( geometry, material );

		this.type = 'Grid';

		this.parameters = {
			radius: radius,
			segments: segments
		};
	}
};

module.exports = Grid;