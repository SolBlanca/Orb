var Three = require( 'three.js' );

var SurfaceRibbon = require('./SurfaceRibbon');

class FlowField extends SurfaceRibbon {
	constructor( data ) {

		var particles = 20000;

		var geometry = new Three.RibbonCollectionGeometry( particles, 20 );
		super( geometry );

		this.data = data;
		this.life = [];
		this.maxLife = 2 * 1000;
		this.locations = [];

		this.particles = particles;

		for ( var i = 0; i < particles; ++i ) {
			var lon = Math.random() * 180 - 90;
			lon = ( Math.acos( Math.random() * 2 - 1 ) * 180 / Math.PI ) - 90;
			var lat = Math.random() * 360;
			this.locations.push( new Three.Vector2( lat, lon ) );
			this.life.push( Date.now() + Math.floor( Math.random() * this.maxLife ) );
		}

	}

	updateMatrixWorld() {

		super.updateMatrixWorld();

		var that = this;

		function getPoint( x, y, o ) {
			if ( that.data === undefined ) {
				o.set( 0, 0 );
				return;
			}
			var i = ( -y + 90 ) * 360 + x
			var u = that.data[ 0 ].data[ i ];
			var v = that.data[ 1 ].data[ i ];
			o.set( u, v );
		}

		function getVector( longitude, latitude, vector ) {
			var phi = latitude * ( Math.PI / 180 );
			var theta = -longitude * ( Math.PI / 180 );
			vector.set( Math.cos( theta ) * Math.cos( phi ), Math.sin( phi ), Math.sin( theta ) * Math.cos( phi ) );
		}

		var p0 = new Three.Vector2(),
			p1 = new Three.Vector2(),
			p2 = new Three.Vector2(),
			v0 = new Three.Vector3();

		var r = Date.now() * 0.00005;
		var n = Date.now();

		for ( var i = 0; i < this.particles; i++ ) {
			if ( this.life[ i ] < n ) {
				var lon = Math.random() * 180 - 90;
				lon = ( Math.acos( Math.random() * 2 - 1 ) * 180 / Math.PI ) - 90;
				var lat = Math.random() * 360;
				this.locations[ i ].set( lat, lon );
				this.life[ i ] = n + this.maxLife;
				//geometry.reset( i );
				this.geometry.advance( i, NaN, NaN, NaN );
			} else {
				var l = this.locations[ i ];
				var x0 = Math.floor( l.x );
				var x1 = Math.ceil( l.x );
				var y0 = Math.floor( l.y );
				var y1 = Math.ceil( l.y );
				var u = l.x - x0;
				var v = l.y - y0;
				getPoint( x0, y0, p0 );
				getPoint( x1, y0, p2 );
				p0.lerp( p2, u );
				getPoint( x0, y1, p1 );
				getPoint( x1, y1, p2 );
				p1.lerp( p2, u );
				p0.lerp( p2, v ).multiplyScalar( 0.03 );
				p0.x = p0.x / Math.abs( Math.cos( l.y / 180 * Math.PI ) );
				l.add( p0 );
				if ( l.y > 90 ) {
					l.y = 180 - l.y;
					l.x += 180;
				}
				if ( l.y < -90 ) {
					l.y = -180 + l.y;
					l.x += 180;
				}
				while ( l.x < 0 ) {
					l.x += 360;
				}
				while ( l.x > 360 ) {
					l.x -= 360;
				}
				getVector( l.x, l.y, v0 );
				v0.multiplyScalar( 101 );
				this.geometry.advance( i, v0.x, v0.y, v0.z );
			}
		}
	}
};

module.exports = FlowField;