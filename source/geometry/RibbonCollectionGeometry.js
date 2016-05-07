class RibbonCollectionGeometry extends Three.BufferGeometry {

	constructor( count, segments, duration ) {

		super();

		var points = count * ( segments + 2 );

		this.positions = new Float32Array( points * 3 * 2 );
		this.normals = new Float32Array( points * 3 * 2 );
		this.uvs = new Float32Array( points * 2 * 2 );
		this.indices = [];
		this.needsReset = [];

		this.addAttribute( 'position', new THREE.BufferAttribute( this.positions, 3 ) );
		this.addAttribute( 'normal', new THREE.BufferAttribute( this.normals, 3 ) );
		this.addAttribute( 'uv', new THREE.BufferAttribute( this.uvs, 2 ) );
		this.attributes.position.setDynamic( true );
		this.attributes.normal.setDynamic( true );

		this.previous = [];
		this.temp = new THREE.Vector3();

		for ( var i = 0; i < count; ++i ) {

			this.indices.push( 0 );
			this.needsReset.push( true );
			this.previous.push( new THREE.Vector3() );

		}

		for ( var i = 0; i < points; ++i ) {

			this.uvs[ i * 4 + 0 ] = 1;
			this.uvs[ i * 4 + 2 ] = -1;

		}

		this.computeBoundingSphere();

		for ( var i = 0; i < this.positions.length; ++i ) {

			this.positions[ i ] = 0;
			this.normals[ i ] = 0;

		}

		this.count = count;
		this.segments = segments;
		this.duration = duration;

	}

	reset( index ) {

		var positions = this.positions;
		this.indices[ index ] = 0;

		var offset = index * ( this.segments + 2 ) * 6;

		for ( var j = 0; j < ( this.segments + 1 ) * 2; ++j ) {

			positions[ j * 3 + 0 + offset ] = NaN;
			positions[ j * 3 + 1 + offset ] = NaN;
			positions[ j * 3 + 2 + offset ] = NaN;

		}

		positions[ ( this.segments + 1 ) * 6 + 0 + offset ] = NaN;
		positions[ ( this.segments + 1 ) * 6 + 1 + offset ] = NaN;
		positions[ ( this.segments + 1 ) * 6 + 2 + offset ] = NaN;
		positions[ ( this.segments + 1 ) * 6 + 3 + offset ] = NaN;
		positions[ ( this.segments + 1 ) * 6 + 4 + offset ] = NaN;
		positions[ ( this.segments + 1 ) * 6 + 6 + offset ] = NaN;

		this.needsReset[ index ] = false;

		this.attributes.position.needsUpdate = true;

	}

	advance( index, x, y, z ) {

		var positions = this.positions;
		var normals = this.normals;
		var i = this.indices[ index ];
		var offset = index * ( this.segments + 2 ) * 6;
		var t = this.temp;
		t.set( x, y, z ).sub( this.previous[ index ] );

		if ( this.needsReset[ index ] ) {

			for ( var j = 0; j < ( this.segments + 1 ) * 2; ++j ) {

				positions[ j * 3 + 0 + offset ] = NaN;
				positions[ j * 3 + 1 + offset ] = NaN;
				positions[ j * 3 + 2 + offset ] = NaN;

			}

			positions[ ( this.segments + 1 ) * 6 + 0 + offset ] = NaN;
			positions[ ( this.segments + 1 ) * 6 + 1 + offset ] = NaN;
			positions[ ( this.segments + 1 ) * 6 + 2 + offset ] = NaN;
			positions[ ( this.segments + 1 ) * 6 + 3 + offset ] = NaN;
			positions[ ( this.segments + 1 ) * 6 + 4 + offset ] = NaN;
			positions[ ( this.segments + 1 ) * 6 + 6 + offset ] = NaN;

			this.needsReset[ index ] = false;

		}

		var v = i * 6 + offset;

		normals[ v + 0 ] = t.x;
		normals[ v + 1 ] = t.y;
		normals[ v + 2 ] = t.z;
		normals[ v + 3 ] = t.x;
		normals[ v + 4 ] = t.y;
		normals[ v + 5 ] = t.z;

		positions[ v + 0 ] = x;
		positions[ v + 1 ] = y;
		positions[ v + 2 ] = z;
		positions[ v + 3 ] = x;
		positions[ v + 4 ] = y;
		positions[ v + 5 ] = z;

		i = i + 1;

		if ( i > this.segments ) {

			i = 0;

			var v = i * 6 + offset;

			normals[ v + 0 ] = t.x;
			normals[ v + 1 ] = t.y;
			normals[ v + 2 ] = t.z;
			normals[ v + 3 ] = t.x;
			normals[ v + 4 ] = t.y;
			normals[ v + 5 ] = t.z;

			positions[ v + 0 ] = x;
			positions[ v + 1 ] = y;
			positions[ v + 2 ] = z;
			positions[ v + 3 ] = x;
			positions[ v + 4 ] = y;
			positions[ v + 5 ] = z;

			i = 1;
		}

		v = i * 6 + offset;

		positions[ v + 0 ] = NaN;
		positions[ v + 1 ] = NaN;
		positions[ v + 2 ] = NaN;
		positions[ v + 3 ] = NaN;
		positions[ v + 4 ] = NaN;
		positions[ v + 5 ] = NaN;

		this.indices[ index ] = i;
		this.attributes.position.needsUpdate = true;
		this.attributes.normal.needsUpdate = true;
		this.previous[ index ].set( x, y, z );

	}
};

module.exports = RibbonCollectionGeometry;