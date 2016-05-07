module.exports = {

	"v3LightPosition": {
		type: "v3",
		value: new THREE.Vector3( 1e8, 0, 1e8 ).normalize()
	},
	"v3InvWavelength": {
		type: "v3",
		value: new THREE.Vector3( 1 / Math.pow( THREE.Constants.atmosphere.wavelength[ 0 ], 4 ), 1 / Math.pow( THREE.Constants.atmosphere.wavelength[ 1 ], 4 ), 1 / Math.pow( THREE.Constants.atmosphere.wavelength[ 2 ], 4 ) )
	},

	"fCameraHeight": {
		type: "f",
		value: 0
	},
	"fCameraHeight2": {
		type: "f",
		value: 0
	},

	"fInnerRadius": {
		type: "f",
		value: THREE.Constants.atmosphere.innerRadius
	},
	"fInnerRadius2": {
		type: "f",
		value: THREE.Constants.atmosphere.innerRadius * THREE.Constants.atmosphere.innerRadius
	},
	"fOuterRadius": {
		type: "f",
		value: THREE.Constants.atmosphere.outerRadius
	},
	"fOuterRadius2": {
		type: "f",
		value: THREE.Constants.atmosphere.outerRadius * THREE.Constants.atmosphere.outerRadius
	},

	"fKrESun": {
		type: "f",
		value: THREE.Constants.atmosphere.Kr * THREE.Constants.atmosphere.ESun
	},
	"fKmESun": {
		type: "f",
		value: THREE.Constants.atmosphere.Km * THREE.Constants.atmosphere.ESun
	},
	"fKr4PI": {
		type: "f",
		value: THREE.Constants.atmosphere.Kr * 4.0 * Math.PI
	},
	"fKm4PI": {
		type: "f",
		value: THREE.Constants.atmosphere.Km * 4.0 * Math.PI
	},

	"fScale": {
		type: "f",
		value: 1 / ( THREE.Constants.atmosphere.outerRadius - THREE.Constants.atmosphere.innerRadius )
	},
	"fScaleDepth": {
		type: "f",
		value: THREE.Constants.atmosphere.scaleDepth
	},
	"fScaleOverScaleDepth": {
		type: "f",
		value: 1 / ( THREE.Constants.atmosphere.outerRadius - THREE.Constants.atmosphere.innerRadius ) / THREE.Constants.atmosphere.scaleDepth
	},

	"g": {
		type: "f",
		value: THREE.Constants.atmosphere.g
	},
	"g2": {
		type: "f",
		value: THREE.Constants.atmosphere.g * THREE.Constants.atmosphere.g
	},

	"nSamples": {
		type: "i",
		value: 3
	},
	"fSamples": {
		type: "f",
		value: 3.0
	},
	"tDiffuse": {
		type: "t",
		value: undefined
	},
	"tDiffuseNight": {
		type: "t",
		value: undefined
	},
	"tClouds": {
		type: "t",
		value: null
	},
	"fNightScale": {
		type: "f",
		value: 1
	},
	"fMultiplier": {
		type: "f",
		value: 1
	},

};