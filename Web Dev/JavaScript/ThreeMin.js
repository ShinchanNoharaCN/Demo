// three.js - http://github.com/mrdoob/three.js
'use strict';
var THREE = THREE ||
{
	REVISION: "55"
};
self.console = self.console ||
{
	info: function() {},
	log: function() {},
	debug: function() {},
	warn: function() {},
	error: function() {}
};
self.Int32Array = self.Int32Array || Array;
self.Float32Array = self.Float32Array || Array;
String.prototype.startsWith = String.prototype.startsWith || function(a)
{
	return this.slice(0, a.length) === a
};
String.prototype.endsWith = String.prototype.endsWith || function(a)
{
	var a = String(a),
		b = this.lastIndexOf(a);
	return (-1 < b && b) === this.length - a.length
};
String.prototype.trim = String.prototype.trim || function()
{
	return this.replace(/^\s+|\s+$/g, "")
};
(function()
{
	for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
	void 0 === window.requestAnimationFrame && (window.requestAnimationFrame = function(b)
	{
		var c = Date.now(),
			f = Math.max(0, 16 - (c - a)),
			g = window.setTimeout(function()
			{
				b(c + f)
			}, f);
		a = c + f;
		return g
	});
	window.cancelAnimationFrame = window.cancelAnimationFrame ||
		function(a)
		{
			window.clearTimeout(a)
		}
})();
THREE.CullFaceNone = 0;
THREE.CullFaceBack = 1;
THREE.CullFaceFront = 2;
THREE.CullFaceFrontBack = 3;
THREE.FrontFaceDirectionCW = 0;
THREE.FrontFaceDirectionCCW = 1;
THREE.BasicShadowMap = 0;
THREE.PCFShadowMap = 1;
THREE.PCFSoftShadowMap = 2;
THREE.FrontSide = 0;
THREE.BackSide = 1;
THREE.DoubleSide = 2;
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.CustomBlending = 5;
THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;
THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.AddOperation = 2;
THREE.UVMapping = function() {};
THREE.CubeReflectionMapping = function() {};
THREE.CubeRefractionMapping = function() {};
THREE.SphericalReflectionMapping = function() {};
THREE.SphericalRefractionMapping = function() {};
THREE.RepeatWrapping = 1E3;
THREE.ClampToEdgeWrapping = 1001;
THREE.MirroredRepeatWrapping = 1002;
THREE.NearestFilter = 1003;
THREE.NearestMipMapNearestFilter = 1004;
THREE.NearestMipMapLinearFilter = 1005;
THREE.LinearFilter = 1006;
THREE.LinearMipMapNearestFilter = 1007;
THREE.LinearMipMapLinearFilter = 1008;
THREE.UnsignedByteType = 1009;
THREE.ByteType = 1010;
THREE.ShortType = 1011;
THREE.UnsignedShortType = 1012;
THREE.IntType = 1013;
THREE.UnsignedIntType = 1014;
THREE.FloatType = 1015;
THREE.UnsignedShort4444Type = 1016;
THREE.UnsignedShort5551Type = 1017;
THREE.UnsignedShort565Type = 1018;
THREE.AlphaFormat = 1019;
THREE.RGBFormat = 1020;
THREE.RGBAFormat = 1021;
THREE.LuminanceFormat = 1022;
THREE.LuminanceAlphaFormat = 1023;
THREE.RGB_S3TC_DXT1_Format = 2001;
THREE.RGBA_S3TC_DXT1_Format = 2002;
THREE.RGBA_S3TC_DXT3_Format = 2003;
THREE.RGBA_S3TC_DXT5_Format = 2004;
THREE.Color = function(a)
{
	void 0 !== a && this.set(a);
	return this
};
THREE.Color.prototype = {
	constructor: THREE.Color,
	r: 1,
	g: 1,
	b: 1,
	set: function(a)
	{
		switch (typeof a)
		{
			case "number":
				this.setHex(a);
				break;
			case "string":
				this.setStyle(a)
		}
	},
	setHex: function(a)
	{
		a = Math.floor(a);
		this.r = (a >> 16 & 255) / 255;
		this.g = (a >> 8 & 255) / 255;
		this.b = (a & 255) / 255;
		return this
	},
	setRGB: function(a, b, c)
	{
		this.r = a;
		this.g = b;
		this.b = c;
		return this
	},
	setHSV: function(a, b, c)
	{
		var d, e, f;
		0 === c ? this.r = this.g = this.b = 0 : (d = Math.floor(6 * a), e = 6 * a - d, a = c * (1 - b), f = c * (1 - b * e), b = c * (1 - b * (1 - e)), 0 === d ? (this.r = c, this.g = b, this.b = a) : 1 ===
			d ? (this.r = f, this.g = c, this.b = a) : 2 === d ? (this.r = a, this.g = c, this.b = b) : 3 === d ? (this.r = a, this.g = f, this.b = c) : 4 === d ? (this.r = b, this.g = a, this.b = c) : 5 === d && (this.r = c, this.g = a, this.b = f));
		return this
	},
	setStyle: function(a)
	{
		if (/^rgb\((\d+),(\d+),(\d+)\)$/i.test(a)) return a = /^rgb\((\d+),(\d+),(\d+)\)$/i.exec(a), this.r = Math.min(255, parseInt(a[1], 10)) / 255, this.g = Math.min(255, parseInt(a[2], 10)) / 255, this.b = Math.min(255, parseInt(a[3], 10)) / 255, this;
		if (/^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.test(a)) return a = /^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.exec(a),
			this.r = Math.min(100, parseInt(a[1], 10)) / 100, this.g = Math.min(100, parseInt(a[2], 10)) / 100, this.b = Math.min(100, parseInt(a[3], 10)) / 100, this;
		if (/^\#([0-9a-f]{6})$/i.test(a)) return a = /^\#([0-9a-f]{6})$/i.exec(a), this.setHex(parseInt(a[1], 16)), this;
		if (/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(a)) return a = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a), this.setHex(parseInt(a[1] + a[1] + a[2] + a[2] + a[3] + a[3], 16)), this;
		if (/^(\w+)$/i.test(a)) return this.setHex(THREE.ColorKeywords[a]), this
	},
	copy: function(a)
	{
		this.r = a.r;
		this.g = a.g;
		this.b = a.b;
		return this
	},
	copyGammaToLinear: function(a)
	{
		this.r = a.r * a.r;
		this.g = a.g * a.g;
		this.b = a.b * a.b;
		return this
	},
	copyLinearToGamma: function(a)
	{
		this.r = Math.sqrt(a.r);
		this.g = Math.sqrt(a.g);
		this.b = Math.sqrt(a.b);
		return this
	},
	convertGammaToLinear: function()
	{
		var a = this.r,
			b = this.g,
			c = this.b;
		this.r = a * a;
		this.g = b * b;
		this.b = c * c;
		return this
	},
	convertLinearToGamma: function()
	{
		this.r = Math.sqrt(this.r);
		this.g = Math.sqrt(this.g);
		this.b = Math.sqrt(this.b);
		return this
	},
	getHex: function()
	{
		return 255 * this.r << 16 ^
			255 * this.g << 8 ^ 255 * this.b << 0
	},
	getHexString: function()
	{
		return ("000000" + this.getHex()
				.toString(16))
			.slice(-6)
	},
	getStyle: function()
	{
		return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
	},
	getHSV: function(a)
	{
		var b = this.r,
			c = this.g,
			d = this.b,
			e = Math.max(Math.max(b, c), d),
			f = Math.min(Math.min(b, c), d);
		if (f === e) f = b = 0;
		else
		{
			var g = e - f,
				f = g / e,
				b = (b === e ? (c - d) / g : c === e ? 2 + (d - b) / g : 4 + (b - c) / g) / 6;
			0 > b && (b += 1);
			1 < b && (b -= 1)
		}
		void 0 === a && (a = {
			h: 0,
			s: 0,
			v: 0
		});
		a.h = b;
		a.s = f;
		a.v = e;
		return a
	},
	add: function(a)
	{
		this.r += a.r;
		this.g +=
			a.g;
		this.b += a.b;
		return this
	},
	addColors: function(a, b)
	{
		this.r = a.r + b.r;
		this.g = a.g + b.g;
		this.b = a.b + b.b;
		return this
	},
	addScalar: function(a)
	{
		this.r += a;
		this.g += a;
		this.b += a;
		return this
	},
	multiply: function(a)
	{
		this.r *= a.r;
		this.g *= a.g;
		this.b *= a.b;
		return this
	},
	multiplyScalar: function(a)
	{
		this.r *= a;
		this.g *= a;
		this.b *= a;
		return this
	},
	lerp: function(a, b)
	{
		this.r += (a.r - this.r) * b;
		this.g += (a.g - this.g) * b;
		this.b += (a.b - this.b) * b;
		return this
	},
	clone: function()
	{
		return (new THREE.Color)
			.setRGB(this.r, this.g, this.b)
	}
};
THREE.ColorKeywords = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
THREE.Quaternion = function(a, b, c, d)
{
	this.x = a || 0;
	this.y = b || 0;
	this.z = c || 0;
	this.w = void 0 !== d ? d : 1
};
THREE.Quaternion.prototype = {
	constructor: THREE.Quaternion,
	set: function(a, b, c, d)
	{
		this.x = a;
		this.y = b;
		this.z = c;
		this.w = d;
		return this
	},
	copy: function(a)
	{
		this.x = a.x;
		this.y = a.y;
		this.z = a.z;
		this.w = a.w;
		return this
	},
	setFromEuler: function(a, b)
	{
		var c = Math.cos(a.x / 2),
			d = Math.cos(a.y / 2),
			e = Math.cos(a.z / 2),
			f = Math.sin(a.x / 2),
			g = Math.sin(a.y / 2),
			i = Math.sin(a.z / 2);
		void 0 === b || "XYZ" === b ? (this.x = f * d * e + c * g * i, this.y = c * g * e - f * d * i, this.z = c * d * i + f * g * e, this.w = c * d * e - f * g * i) : "YXZ" === b ? (this.x = f * d * e + c * g * i, this.y = c * g * e - f * d * i, this.z = c * d *
			i - f * g * e, this.w = c * d * e + f * g * i) : "ZXY" === b ? (this.x = f * d * e - c * g * i, this.y = c * g * e + f * d * i, this.z = c * d * i + f * g * e, this.w = c * d * e - f * g * i) : "ZYX" === b ? (this.x = f * d * e - c * g * i, this.y = c * g * e + f * d * i, this.z = c * d * i - f * g * e, this.w = c * d * e + f * g * i) : "YZX" === b ? (this.x = f * d * e + c * g * i, this.y = c * g * e + f * d * i, this.z = c * d * i - f * g * e, this.w = c * d * e - f * g * i) : "XZY" === b && (this.x = f * d * e - c * g * i, this.y = c * g * e - f * d * i, this.z = c * d * i + f * g * e, this.w = c * d * e + f * g * i);
		return this
	},
	setFromAxisAngle: function(a, b)
	{
		var c = b / 2,
			d = Math.sin(c);
		this.x = a.x * d;
		this.y = a.y * d;
		this.z = a.z * d;
		this.w = Math.cos(c);
		return this
	},
	setFromRotationMatrix: function(a)
	{
		var b = a.elements,
			c = b[0],
			a = b[4],
			d = b[8],
			e = b[1],
			f = b[5],
			g = b[9],
			i = b[2],
			h = b[6],
			b = b[10],
			k = c + f + b;
		0 < k ? (c = 0.5 / Math.sqrt(k + 1), this.w = 0.25 / c, this.x = (h - g) * c, this.y = (d - i) * c, this.z = (e - a) * c) : c > f && c > b ? (c = 2 * Math.sqrt(1 + c - f - b), this.w = (h - g) / c, this.x = 0.25 * c, this.y = (a + e) / c, this.z = (d + i) / c) : f > b ? (c = 2 * Math.sqrt(1 + f - c - b), this.w = (d - i) / c, this.x = (a + e) / c, this.y = 0.25 * c, this.z = (g + h) / c) : (c = 2 * Math.sqrt(1 + b - c - f), this.w = (e - a) / c, this.x = (d + i) / c, this.y = (g + h) / c, this.z = 0.25 * c);
		return this
	},
	inverse: function()
	{
		this.conjugate()
			.normalize();
		return this
	},
	conjugate: function()
	{
		this.x *= -1;
		this.y *= -1;
		this.z *= -1;
		return this
	},
	lengthSq: function()
	{
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
	},
	length: function()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
	},
	normalize: function()
	{
		var a = this.length();
		0 === a ? (this.z = this.y = this.x = 0, this.w = 1) : (a = 1 / a, this.x *= a, this.y *= a, this.z *= a, this.w *= a);
		return this
	},
	multiply: function(a, b)
	{
		return void 0 !== b ? (console.warn("DEPRECATED: Quaternion's .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),
			this.multiplyQuaternions(a, b)) : this.multiplyQuaternions(this, a)
	},
	multiplyQuaternions: function(a, b)
	{
		var c = a.x,
			d = a.y,
			e = a.z,
			f = a.w,
			g = b.x,
			i = b.y,
			h = b.z,
			k = b.w;
		this.x = c * k + f * g + d * h - e * i;
		this.y = d * k + f * i + e * g - c * h;
		this.z = e * k + f * h + c * i - d * g;
		this.w = f * k - c * g - d * i - e * h;
		return this
	},
	multiplyVector3: function(a)
	{
		console.warn("DEPRECATED: Quaternion's .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.");
		return a.applyQuaternion(this)
	},
	slerp: function(a, b)
	{
		var c = this.x,
			d = this.y,
			e = this.z,
			f = this.w,
			g = f * a.w + c * a.x + d * a.y + e * a.z;
		0 > g ? (this.w = -a.w, this.x = -a.x, this.y = -a.y, this.z = -a.z, g = -g) : this.copy(a);
		if (1 <= g) return this.w = f, this.x = c, this.y = d, this.z = e, this;
		var i = Math.acos(g),
			h = Math.sqrt(1 - g * g);
		if (0.001 > Math.abs(h)) return this.w = 0.5 * (f + this.w), this.x = 0.5 * (c + this.x), this.y = 0.5 * (d + this.y), this.z = 0.5 * (e + this.z), this;
		g = Math.sin((1 - b) * i) / h;
		i = Math.sin(b * i) / h;
		this.w = f * g + this.w * i;
		this.x = c * g + this.x * i;
		this.y = d * g + this.y * i;
		this.z = e * g + this.z * i;
		return this
	},
	equals: function(a)
	{
		return a.x === this.x && a.y ===
			this.y && a.z === this.z && a.w === this.w
	},
	clone: function()
	{
		return new THREE.Quaternion(this.x, this.y, this.z, this.w)
	}
};
THREE.Quaternion.slerp = function(a, b, c, d)
{
	return c.copy(a)
		.slerp(b, d)
};
THREE.Vector2 = function(a, b)
{
	this.x = a || 0;
	this.y = b || 0
};
THREE.Vector2.prototype = {
	constructor: THREE.Vector2,
	set: function(a, b)
	{
		this.x = a;
		this.y = b;
		return this
	},
	setX: function(a)
	{
		this.x = a;
		return this
	},
	setY: function(a)
	{
		this.y = a;
		return this
	},
	setComponent: function(a, b)
	{
		switch (a)
		{
			case 0:
				this.x = b;
				break;
			case 1:
				this.y = b;
				break;
			default:
				throw Error("index is out of range: " + a);
		}
	},
	getComponent: function(a)
	{
		switch (a)
		{
			case 0:
				return this.x;
			case 1:
				return this.y;
			default:
				throw Error("index is out of range: " + a);
		}
	},
	copy: function(a)
	{
		this.x = a.x;
		this.y = a.y;
		return this
	},
	add: function(a,
		b)
	{
		if (void 0 !== b) return console.warn("DEPRECATED: Vector2's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b);
		this.x += a.x;
		this.y += a.y;
		return this
	},
	addVectors: function(a, b)
	{
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		return this
	},
	addScalar: function(a)
	{
		this.x += a;
		this.y += a;
		return this
	},
	sub: function(a, b)
	{
		if (void 0 !== b) return console.warn("DEPRECATED: Vector2's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a, b);
		this.x -= a.x;
		this.y -=
			a.y;
		return this
	},
	subVectors: function(a, b)
	{
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		return this
	},
	multiplyScalar: function(a)
	{
		this.x *= a;
		this.y *= a;
		return this
	},
	divideScalar: function(a)
	{
		0 !== a ? (this.x /= a, this.y /= a) : this.set(0, 0);
		return this
	},
	min: function(a)
	{
		this.x > a.x && (this.x = a.x);
		this.y > a.y && (this.y = a.y);
		return this
	},
	max: function(a)
	{
		this.x < a.x && (this.x = a.x);
		this.y < a.y && (this.y = a.y);
		return this
	},
	clamp: function(a, b)
	{
		this.x < a.x ? this.x = a.x : this.x > b.x && (this.x = b.x);
		this.y < a.y ? this.y = a.y : this.y > b.y && (this.y = b.y);
		return this
	},
	negate: function()
	{
		return this.multiplyScalar(-1)
	},
	dot: function(a)
	{
		return this.x * a.x + this.y * a.y
	},
	lengthSq: function()
	{
		return this.x * this.x + this.y * this.y
	},
	length: function()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y)
	},
	normalize: function()
	{
		return this.divideScalar(this.length())
	},
	distanceTo: function(a)
	{
		return Math.sqrt(this.distanceToSquared(a))
	},
	distanceToSquared: function(a)
	{
		var b = this.x - a.x,
			a = this.y - a.y;
		return b * b + a * a
	},
	setLength: function(a)
	{
		var b = this.length();
		0 !== b && a !== b && this.multiplyScalar(a /
			b);
		return this
	},
	lerp: function(a, b)
	{
		this.x += (a.x - this.x) * b;
		this.y += (a.y - this.y) * b;
		return this
	},
	equals: function(a)
	{
		return a.x === this.x && a.y === this.y
	},
	clone: function()
	{
		return new THREE.Vector2(this.x, this.y)
	}
};
THREE.Vector3 = function(a, b, c)
{
	this.x = a || 0;
	this.y = b || 0;
	this.z = c || 0
};
THREE.Vector3.prototype = {
	constructor: THREE.Vector3,
	set: function(a, b, c)
	{
		this.x = a;
		this.y = b;
		this.z = c;
		return this
	},
	setX: function(a)
	{
		this.x = a;
		return this
	},
	setY: function(a)
	{
		this.y = a;
		return this
	},
	setZ: function(a)
	{
		this.z = a;
		return this
	},
	setComponent: function(a, b)
	{
		switch (a)
		{
			case 0:
				this.x = b;
				break;
			case 1:
				this.y = b;
				break;
			case 2:
				this.z = b;
				break;
			default:
				throw Error("index is out of range: " + a);
		}
	},
	getComponent: function(a)
	{
		switch (a)
		{
			case 0:
				return this.x;
			case 1:
				return this.y;
			case 2:
				return this.z;
			default:
				throw Error("index is out of range: " +
					a);
		}
	},
	copy: function(a)
	{
		this.x = a.x;
		this.y = a.y;
		this.z = a.z;
		return this
	},
	add: function(a, b)
	{
		if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b);
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;
		return this
	},
	addScalar: function(a)
	{
		this.x += a;
		this.y += a;
		this.z += a;
		return this
	},
	addVectors: function(a, b)
	{
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		return this
	},
	sub: function(a, b)
	{
		if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
			this.subVectors(a, b);
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;
		return this
	},
	subVectors: function(a, b)
	{
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		return this
	},
	multiply: function(a, b)
	{
		if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(a, b);
		this.x *= a.x;
		this.y *= a.y;
		this.z *= a.z;
		return this
	},
	multiplyScalar: function(a)
	{
		this.x *= a;
		this.y *= a;
		this.z *= a;
		return this
	},
	multiplyVectors: function(a, b)
	{
		this.x = a.x *
			b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;
		return this
	},
	applyMatrix3: function(a)
	{
		var b = this.x,
			c = this.y,
			d = this.z,
			a = a.elements;
		this.x = a[0] * b + a[3] * c + a[6] * d;
		this.y = a[1] * b + a[4] * c + a[7] * d;
		this.z = a[2] * b + a[5] * c + a[8] * d;
		return this
	},
	applyMatrix4: function(a)
	{
		var b = this.x,
			c = this.y,
			d = this.z,
			a = a.elements;
		this.x = a[0] * b + a[4] * c + a[8] * d + a[12];
		this.y = a[1] * b + a[5] * c + a[9] * d + a[13];
		this.z = a[2] * b + a[6] * c + a[10] * d + a[14];
		return this
	},
	applyProjection: function(a)
	{
		var b = this.x,
			c = this.y,
			d = this.z,
			a = a.elements,
			e = 1 / (a[3] * b + a[7] * c + a[11] * d + a[15]);
		this.x = (a[0] * b + a[4] * c + a[8] * d + a[12]) * e;
		this.y = (a[1] * b + a[5] * c + a[9] * d + a[13]) * e;
		this.z = (a[2] * b + a[6] * c + a[10] * d + a[14]) * e;
		return this
	},
	applyQuaternion: function(a)
	{
		var b = this.x,
			c = this.y,
			d = this.z,
			e = a.x,
			f = a.y,
			g = a.z,
			a = a.w,
			i = a * b + f * d - g * c,
			h = a * c + g * b - e * d,
			k = a * d + e * c - f * b,
			b = -e * b - f * c - g * d;
		this.x = i * a + b * -e + h * -g - k * -f;
		this.y = h * a + b * -f + k * -e - i * -g;
		this.z = k * a + b * -g + i * -f - h * -e;
		return this
	},
	applyEuler: function(a, b)
	{
		var c = THREE.Vector3.__q1.setFromEuler(a, b);
		this.applyQuaternion(c);
		return this
	},
	applyAxisAngle: function(a, b)
	{
		var c = THREE.Vector3.__q1.setFromAxisAngle(a,
			b);
		this.applyQuaternion(c);
		return this
	},
	divide: function(a)
	{
		this.x /= a.x;
		this.y /= a.y;
		this.z /= a.z;
		return this
	},
	divideScalar: function(a)
	{
		0 !== a ? (this.x /= a, this.y /= a, this.z /= a) : this.z = this.y = this.x = 0;
		return this
	},
	min: function(a)
	{
		this.x > a.x && (this.x = a.x);
		this.y > a.y && (this.y = a.y);
		this.z > a.z && (this.z = a.z);
		return this
	},
	max: function(a)
	{
		this.x < a.x && (this.x = a.x);
		this.y < a.y && (this.y = a.y);
		this.z < a.z && (this.z = a.z);
		return this
	},
	clamp: function(a, b)
	{
		this.x < a.x ? this.x = a.x : this.x > b.x && (this.x = b.x);
		this.y < a.y ? this.y = a.y :
			this.y > b.y && (this.y = b.y);
		this.z < a.z ? this.z = a.z : this.z > b.z && (this.z = b.z);
		return this
	},
	negate: function()
	{
		return this.multiplyScalar(-1)
	},
	dot: function(a)
	{
		return this.x * a.x + this.y * a.y + this.z * a.z
	},
	lengthSq: function()
	{
		return this.x * this.x + this.y * this.y + this.z * this.z
	},
	length: function()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
	},
	lengthManhattan: function()
	{
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
	},
	normalize: function()
	{
		return this.divideScalar(this.length())
	},
	setLength: function(a)
	{
		var b =
			this.length();
		0 !== b && a !== b && this.multiplyScalar(a / b);
		return this
	},
	lerp: function(a, b)
	{
		this.x += (a.x - this.x) * b;
		this.y += (a.y - this.y) * b;
		this.z += (a.z - this.z) * b;
		return this
	},
	cross: function(a, b)
	{
		if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(a, b);
		var c = this.x,
			d = this.y,
			e = this.z;
		this.x = d * a.z - e * a.y;
		this.y = e * a.x - c * a.z;
		this.z = c * a.y - d * a.x;
		return this
	},
	crossVectors: function(a, b)
	{
		this.x = a.y * b.z - a.z * b.y;
		this.y =
			a.z * b.x - a.x * b.z;
		this.z = a.x * b.y - a.y * b.x;
		return this
	},
	angleTo: function(a)
	{
		return Math.acos(this.dot(a) / this.length() / a.length())
	},
	distanceTo: function(a)
	{
		return Math.sqrt(this.distanceToSquared(a))
	},
	distanceToSquared: function(a)
	{
		var b = this.x - a.x,
			c = this.y - a.y,
			a = this.z - a.z;
		return b * b + c * c + a * a
	},
	getPositionFromMatrix: function(a)
	{
		this.x = a.elements[12];
		this.y = a.elements[13];
		this.z = a.elements[14];
		return this
	},
	setEulerFromRotationMatrix: function(a, b)
	{
		function c(a)
		{
			return Math.min(Math.max(a, -1), 1)
		}
		var d = a.elements,
			e = d[0],
			f = d[4],
			g = d[8],
			i = d[1],
			h = d[5],
			k = d[9],
			l = d[2],
			m = d[6],
			d = d[10];
		void 0 === b || "XYZ" === b ? (this.y = Math.asin(c(g)), 0.99999 > Math.abs(g) ? (this.x = Math.atan2(-k, d), this.z = Math.atan2(-f, e)) : (this.x = Math.atan2(m, h), this.z = 0)) : "YXZ" === b ? (this.x = Math.asin(-c(k)), 0.99999 > Math.abs(k) ? (this.y = Math.atan2(g, d), this.z = Math.atan2(i, h)) : (this.y = Math.atan2(-l, e), this.z = 0)) : "ZXY" === b ? (this.x = Math.asin(c(m)), 0.99999 > Math.abs(m) ? (this.y = Math.atan2(-l, d), this.z = Math.atan2(-f, h)) : (this.y = 0, this.z = Math.atan2(i, e))) : "ZYX" ===
			b ? (this.y = Math.asin(-c(l)), 0.99999 > Math.abs(l) ? (this.x = Math.atan2(m, d), this.z = Math.atan2(i, e)) : (this.x = 0, this.z = Math.atan2(-f, h))) : "YZX" === b ? (this.z = Math.asin(c(i)), 0.99999 > Math.abs(i) ? (this.x = Math.atan2(-k, h), this.y = Math.atan2(-l, e)) : (this.x = 0, this.y = Math.atan2(g, d))) : "XZY" === b && (this.z = Math.asin(-c(f)), 0.99999 > Math.abs(f) ? (this.x = Math.atan2(m, h), this.y = Math.atan2(g, e)) : (this.x = Math.atan2(-k, d), this.y = 0));
		return this
	},
	setEulerFromQuaternion: function(a, b)
	{
		function c(a)
		{
			return Math.min(Math.max(a,
				-1), 1)
		}
		var d = a.x * a.x,
			e = a.y * a.y,
			f = a.z * a.z,
			g = a.w * a.w;
		void 0 === b || "XYZ" === b ? (this.x = Math.atan2(2 * (a.x * a.w - a.y * a.z), g - d - e + f), this.y = Math.asin(c(2 * (a.x * a.z + a.y * a.w))), this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g + d - e - f)) : "YXZ" === b ? (this.x = Math.asin(c(2 * (a.x * a.w - a.y * a.z))), this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g - d - e + f), this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g - d + e - f)) : "ZXY" === b ? (this.x = Math.asin(c(2 * (a.x * a.w + a.y * a.z))), this.y = Math.atan2(2 * (a.y * a.w - a.z * a.x), g - d - e + f), this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g - d + e - f)) :
			"ZYX" === b ? (this.x = Math.atan2(2 * (a.x * a.w + a.z * a.y), g - d - e + f), this.y = Math.asin(c(2 * (a.y * a.w - a.x * a.z))), this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g + d - e - f)) : "YZX" === b ? (this.x = Math.atan2(2 * (a.x * a.w - a.z * a.y), g - d + e - f), this.y = Math.atan2(2 * (a.y * a.w - a.x * a.z), g + d - e - f), this.z = Math.asin(c(2 * (a.x * a.y + a.z * a.w)))) : "XZY" === b && (this.x = Math.atan2(2 * (a.x * a.w + a.y * a.z), g - d + e - f), this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g + d - e - f), this.z = Math.asin(c(2 * (a.z * a.w - a.x * a.y))));
		return this
	},
	getScaleFromMatrix: function(a)
	{
		var b = this.set(a.elements[0],
				a.elements[1], a.elements[2])
			.length(),
			c = this.set(a.elements[4], a.elements[5], a.elements[6])
			.length(),
			a = this.set(a.elements[8], a.elements[9], a.elements[10])
			.length();
		this.x = b;
		this.y = c;
		this.z = a;
		return this
	},
	equals: function(a)
	{
		return a.x === this.x && a.y === this.y && a.z === this.z
	},
	clone: function()
	{
		return new THREE.Vector3(this.x, this.y, this.z)
	}
};
THREE.Vector3.__q1 = new THREE.Quaternion;
THREE.Vector4 = function(a, b, c, d)
{
	this.x = a || 0;
	this.y = b || 0;
	this.z = c || 0;
	this.w = void 0 !== d ? d : 1
};
THREE.Vector4.prototype = {
	constructor: THREE.Vector4,
	set: function(a, b, c, d)
	{
		this.x = a;
		this.y = b;
		this.z = c;
		this.w = d;
		return this
	},
	setX: function(a)
	{
		this.x = a;
		return this
	},
	setY: function(a)
	{
		this.y = a;
		return this
	},
	setZ: function(a)
	{
		this.z = a;
		return this
	},
	setW: function(a)
	{
		this.w = a;
		return this
	},
	setComponent: function(a, b)
	{
		switch (a)
		{
			case 0:
				this.x = b;
				break;
			case 1:
				this.y = b;
				break;
			case 2:
				this.z = b;
				break;
			case 3:
				this.w = b;
				break;
			default:
				throw Error("index is out of range: " + a);
		}
	},
	getComponent: function(a)
	{
		switch (a)
		{
			case 0:
				return this.x;
			case 1:
				return this.y;
			case 2:
				return this.z;
			case 3:
				return this.w;
			default:
				throw Error("index is out of range: " + a);
		}
	},
	copy: function(a)
	{
		this.x = a.x;
		this.y = a.y;
		this.z = a.z;
		this.w = void 0 !== a.w ? a.w : 1;
		return this
	},
	add: function(a, b)
	{
		if (void 0 !== b) return console.warn("DEPRECATED: Vector4's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b);
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;
		this.w += a.w;
		return this
	},
	addScalar: function(a)
	{
		this.x += a;
		this.y += a;
		this.z += a;
		this.w += a;
		return this
	},
	addVectors: function(a, b)
	{
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		this.w = a.w + b.w;
		return this
	},
	sub: function(a, b)
	{
		if (void 0 !== b) return console.warn("DEPRECATED: Vector4's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a, b);
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;
		this.w -= a.w;
		return this
	},
	subVectors: function(a, b)
	{
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.w = a.w - b.w;
		return this
	},
	multiplyScalar: function(a)
	{
		this.x *= a;
		this.y *= a;
		this.z *= a;
		this.w *= a;
		return this
	},
	applyMatrix4: function(a)
	{
		var b = this.x,
			c = this.y,
			d = this.z,
			e = this.w,
			a = a.elements;
		this.x = a[0] * b + a[4] * c + a[8] * d + a[12] * e;
		this.y = a[1] * b + a[5] * c + a[9] * d + a[13] * e;
		this.z = a[2] * b + a[6] * c + a[10] * d + a[14] * e;
		this.w = a[3] * b + a[7] * c + a[11] * d + a[15] * e;
		return this
	},
	divideScalar: function(a)
	{
		0 !== a ? (this.x /= a, this.y /= a, this.z /= a, this.w /= a) : (this.z = this.y = this.x = 0, this.w = 1);
		return this
	},
	min: function(a)
	{
		this.x > a.x && (this.x = a.x);
		this.y > a.y && (this.y = a.y);
		this.z > a.z && (this.z = a.z);
		this.w > a.w && (this.w = a.w);
		return this
	},
	max: function(a)
	{
		this.x <
			a.x && (this.x = a.x);
		this.y < a.y && (this.y = a.y);
		this.z < a.z && (this.z = a.z);
		this.w < a.w && (this.w = a.w);
		return this
	},
	clamp: function(a, b)
	{
		this.x < a.x ? this.x = a.x : this.x > b.x && (this.x = b.x);
		this.y < a.y ? this.y = a.y : this.y > b.y && (this.y = b.y);
		this.z < a.z ? this.z = a.z : this.z > b.z && (this.z = b.z);
		this.w < a.w ? this.w = a.w : this.w > b.w && (this.w = b.w);
		return this
	},
	negate: function()
	{
		return this.multiplyScalar(-1)
	},
	dot: function(a)
	{
		return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
	},
	lengthSq: function()
	{
		return this.x * this.x + this.y * this.y + this.z *
			this.z + this.w * this.w
	},
	length: function()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
	},
	lengthManhattan: function()
	{
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
	},
	normalize: function()
	{
		return this.divideScalar(this.length())
	},
	setLength: function(a)
	{
		var b = this.length();
		0 !== b && a !== b && this.multiplyScalar(a / b);
		return this
	},
	lerp: function(a, b)
	{
		this.x += (a.x - this.x) * b;
		this.y += (a.y - this.y) * b;
		this.z += (a.z - this.z) * b;
		this.w += (a.w - this.w) * b;
		return this
	},
	equals: function(a)
	{
		return a.x ===
			this.x && a.y === this.y && a.z === this.z && a.w === this.w
	},
	clone: function()
	{
		return new THREE.Vector4(this.x, this.y, this.z, this.w)
	},
	setAxisAngleFromQuaternion: function(a)
	{
		this.w = 2 * Math.acos(a.w);
		var b = Math.sqrt(1 - a.w * a.w);
		1E-4 > b ? (this.x = 1, this.z = this.y = 0) : (this.x = a.x / b, this.y = a.y / b, this.z = a.z / b);
		return this
	},
	setAxisAngleFromRotationMatrix: function(a)
	{
		var b, c, d, a = a.elements,
			e = a[0];
		d = a[4];
		var f = a[8],
			g = a[1],
			i = a[5],
			h = a[9];
		c = a[2];
		b = a[6];
		var k = a[10];
		if (0.01 > Math.abs(d - g) && 0.01 > Math.abs(f - c) && 0.01 > Math.abs(h - b))
		{
			if (0.1 >
				Math.abs(d + g) && 0.1 > Math.abs(f + c) && 0.1 > Math.abs(h + b) && 0.1 > Math.abs(e + i + k - 3)) return this.set(1, 0, 0, 0), this;
			a = Math.PI;
			e = (e + 1) / 2;
			i = (i + 1) / 2;
			k = (k + 1) / 2;
			d = (d + g) / 4;
			f = (f + c) / 4;
			h = (h + b) / 4;
			e > i && e > k ? 0.01 > e ? (b = 0, d = c = 0.707106781) : (b = Math.sqrt(e), c = d / b, d = f / b) : i > k ? 0.01 > i ? (b = 0.707106781, c = 0, d = 0.707106781) : (c = Math.sqrt(i), b = d / c, d = h / c) : 0.01 > k ? (c = b = 0.707106781, d = 0) : (d = Math.sqrt(k), b = f / d, c = h / d);
			this.set(b, c, d, a);
			return this
		}
		a = Math.sqrt((b - h) * (b - h) + (f - c) * (f - c) + (g - d) * (g - d));
		0.001 > Math.abs(a) && (a = 1);
		this.x = (b - h) / a;
		this.y = (f -
			c) / a;
		this.z = (g - d) / a;
		this.w = Math.acos((e + i + k - 1) / 2);
		return this
	}
};
THREE.Box2 = function(a, b)
{
	this.min = void 0 !== a ? a : new THREE.Vector2(Infinity, Infinity);
	this.max = void 0 !== b ? b : new THREE.Vector2(-Infinity, -Infinity)
};
THREE.Box2.prototype = {
	constructor: THREE.Box2,
	set: function(a, b)
	{
		this.min.copy(a);
		this.max.copy(b);
		return this
	},
	setFromPoints: function(a)
	{
		if (0 < a.length)
		{
			var b = a[0];
			this.min.copy(b);
			this.max.copy(b);
			for (var c = 1, d = a.length; c < d; c++) b = a[c], b.x < this.min.x ? this.min.x = b.x : b.x > this.max.x && (this.max.x = b.x), b.y < this.min.y ? this.min.y = b.y : b.y > this.max.y && (this.max.y = b.y)
		}
		else this.makeEmpty();
		return this
	},
	setFromCenterAndSize: function(a, b)
	{
		var c = THREE.Box2.__v1.copy(b)
			.multiplyScalar(0.5);
		this.min.copy(a)
			.sub(c);
		this.max.copy(a)
			.add(c);
		return this
	},
	copy: function(a)
	{
		this.min.copy(a.min);
		this.max.copy(a.max);
		return this
	},
	makeEmpty: function()
	{
		this.min.x = this.min.y = Infinity;
		this.max.x = this.max.y = -Infinity;
		return this
	},
	empty: function()
	{
		return this.max.x < this.min.x || this.max.y < this.min.y
	},
	center: function(a)
	{
		return (a || new THREE.Vector2)
			.addVectors(this.min, this.max)
			.multiplyScalar(0.5)
	},
	size: function(a)
	{
		return (a || new THREE.Vector2)
			.subVectors(this.max, this.min)
	},
	expandByPoint: function(a)
	{
		this.min.min(a);
		this.max.max(a);
		return this
	},
	expandByVector: function(a)
	{
		this.min.sub(a);
		this.max.add(a);
		return this
	},
	expandByScalar: function(a)
	{
		this.min.addScalar(-a);
		this.max.addScalar(a);
		return this
	},
	containsPoint: function(a)
	{
		return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y ? !1 : !0
	},
	containsBox: function(a)
	{
		return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y ? !0 : !1
	},
	getParameter: function(a)
	{
		return new THREE.Vector2((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) /
			(this.max.y - this.min.y))
	},
	isIntersectionBox: function(a)
	{
		return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y ? !1 : !0
	},
	clampPoint: function(a, b)
	{
		return (b || new THREE.Vector2)
			.copy(a)
			.clamp(this.min, this.max)
	},
	distanceToPoint: function(a)
	{
		return THREE.Box2.__v1.copy(a)
			.clamp(this.min, this.max)
			.sub(a)
			.length()
	},
	intersect: function(a)
	{
		this.min.max(a.min);
		this.max.min(a.max);
		return this
	},
	union: function(a)
	{
		this.min.min(a.min);
		this.max.max(a.max);
		return this
	},
	translate: function(a)
	{
		this.min.add(a);
		this.max.add(a);
		return this
	},
	equals: function(a)
	{
		return a.min.equals(this.min) && a.max.equals(this.max)
	},
	clone: function()
	{
		return (new THREE.Box2)
			.copy(this)
	}
};
THREE.Box2.__v1 = new THREE.Vector2;
THREE.Box3 = function(a, b)
{
	this.min = void 0 !== a ? a : new THREE.Vector3(Infinity, Infinity, Infinity);
	this.max = void 0 !== b ? b : new THREE.Vector3(-Infinity, -Infinity, -Infinity)
};
THREE.Box3.prototype = {
	constructor: THREE.Box3,
	set: function(a, b)
	{
		this.min.copy(a);
		this.max.copy(b);
		return this
	},
	setFromPoints: function(a)
	{
		if (0 < a.length)
		{
			var b = a[0];
			this.min.copy(b);
			this.max.copy(b);
			for (var c = 1, d = a.length; c < d; c++) b = a[c], b.x < this.min.x ? this.min.x = b.x : b.x > this.max.x && (this.max.x = b.x), b.y < this.min.y ? this.min.y = b.y : b.y > this.max.y && (this.max.y = b.y), b.z < this.min.z ? this.min.z = b.z : b.z > this.max.z && (this.max.z = b.z)
		}
		else this.makeEmpty();
		return this
	},
	setFromCenterAndSize: function(a, b)
	{
		var c = THREE.Box3.__v1.copy(b)
			.multiplyScalar(0.5);
		this.min.copy(a)
			.sub(c);
		this.max.copy(a)
			.add(c);
		return this
	},
	copy: function(a)
	{
		this.min.copy(a.min);
		this.max.copy(a.max);
		return this
	},
	makeEmpty: function()
	{
		this.min.x = this.min.y = this.min.z = Infinity;
		this.max.x = this.max.y = this.max.z = -Infinity;
		return this
	},
	empty: function()
	{
		return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
	},
	center: function(a)
	{
		return (a || new THREE.Vector3)
			.addVectors(this.min, this.max)
			.multiplyScalar(0.5)
	},
	size: function(a)
	{
		return (a || new THREE.Vector3)
			.subVectors(this.max,
				this.min)
	},
	expandByPoint: function(a)
	{
		this.min.min(a);
		this.max.max(a);
		return this
	},
	expandByVector: function(a)
	{
		this.min.sub(a);
		this.max.add(a);
		return this
	},
	expandByScalar: function(a)
	{
		this.min.addScalar(-a);
		this.max.addScalar(a);
		return this
	},
	containsPoint: function(a)
	{
		return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y || a.z < this.min.z || a.z > this.max.z ? !1 : !0
	},
	containsBox: function(a)
	{
		return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y && this.min.z <=
			a.min.z && a.max.z <= this.max.z ? !0 : !1
	},
	getParameter: function(a)
	{
		return new THREE.Vector3((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y), (a.z - this.min.z) / (this.max.z - this.min.z))
	},
	isIntersectionBox: function(a)
	{
		return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y || a.max.z < this.min.z || a.min.z > this.max.z ? !1 : !0
	},
	clampPoint: function(a, b)
	{
		b || new THREE.Vector3;
		return (new THREE.Vector3)
			.copy(a)
			.clamp(this.min, this.max)
	},
	distanceToPoint: function(a)
	{
		return THREE.Box3.__v1.copy(a)
			.clamp(this.min,
				this.max)
			.sub(a)
			.length()
	},
	getBoundingSphere: function(a)
	{
		a = a || new THREE.Sphere;
		a.center = this.center();
		a.radius = 0.5 * this.size(THREE.Box3.__v0)
			.length();
		return a
	},
	intersect: function(a)
	{
		this.min.max(a.min);
		this.max.min(a.max);
		return this
	},
	union: function(a)
	{
		this.min.min(a.min);
		this.max.max(a.max);
		return this
	},
	transform: function(a)
	{
		a = [THREE.Box3.__v0.set(this.min.x, this.min.y, this.min.z)
			.applyMatrix4(a), THREE.Box3.__v0.set(this.min.x, this.min.y, this.min.z)
			.applyMatrix4(a), THREE.Box3.__v1.set(this.min.x,
				this.min.y, this.max.z)
			.applyMatrix4(a), THREE.Box3.__v2.set(this.min.x, this.max.y, this.min.z)
			.applyMatrix4(a), THREE.Box3.__v3.set(this.min.x, this.max.y, this.max.z)
			.applyMatrix4(a), THREE.Box3.__v4.set(this.max.x, this.min.y, this.min.z)
			.applyMatrix4(a), THREE.Box3.__v5.set(this.max.x, this.min.y, this.max.z)
			.applyMatrix4(a), THREE.Box3.__v6.set(this.max.x, this.max.y, this.min.z)
			.applyMatrix4(a), THREE.Box3.__v7.set(this.max.x, this.max.y, this.max.z)
			.applyMatrix4(a)
		];
		this.makeEmpty();
		this.setFromPoints(a);
		return this
	},
	translate: function(a)
	{
		this.min.add(a);
		this.max.add(a);
		return this
	},
	equals: function(a)
	{
		return a.min.equals(this.min) && a.max.equals(this.max)
	},
	clone: function()
	{
		return (new THREE.Box3)
			.copy(this)
	}
};
THREE.Box3.__v0 = new THREE.Vector3;
THREE.Box3.__v1 = new THREE.Vector3;
THREE.Box3.__v2 = new THREE.Vector3;
THREE.Box3.__v3 = new THREE.Vector3;
THREE.Box3.__v4 = new THREE.Vector3;
THREE.Box3.__v5 = new THREE.Vector3;
THREE.Box3.__v6 = new THREE.Vector3;
THREE.Box3.__v7 = new THREE.Vector3;
THREE.Matrix3 = function(a, b, c, d, e, f, g, i, h)
{
	this.elements = new Float32Array(9);
	this.set(void 0 !== a ? a : 1, b || 0, c || 0, d || 0, void 0 !== e ? e : 1, f || 0, g || 0, i || 0, void 0 !== h ? h : 1)
};
THREE.Matrix3.prototype = {
	constructor: THREE.Matrix3,
	set: function(a, b, c, d, e, f, g, i, h)
	{
		var k = this.elements;
		k[0] = a;
		k[3] = b;
		k[6] = c;
		k[1] = d;
		k[4] = e;
		k[7] = f;
		k[2] = g;
		k[5] = i;
		k[8] = h;
		return this
	},
	identity: function()
	{
		this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
		return this
	},
	copy: function(a)
	{
		a = a.elements;
		this.set(a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8]);
		return this
	},
	multiplyVector3: function(a)
	{
		console.warn("DEPRECATED: Matrix3's .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.");
		return a.applyMatrix3(this)
	},
	multiplyVector3Array: function(a)
	{
		for (var b = THREE.Matrix3.__v1, c = 0, d = a.length; c < d; c += 3) b.x = a[c], b.y = a[c + 1], b.z = a[c + 2], b.applyMatrix3(this), a[c] = b.x, a[c + 1] = b.y, a[c + 2] = b.z;
		return a
	},
	multiplyScalar: function(a)
	{
		var b = this.elements;
		b[0] *= a;
		b[3] *= a;
		b[6] *= a;
		b[1] *= a;
		b[4] *= a;
		b[7] *= a;
		b[2] *= a;
		b[5] *= a;
		b[8] *= a;
		return this
	},
	determinant: function()
	{
		var a = this.elements,
			b = a[0],
			c = a[1],
			d = a[2],
			e = a[3],
			f = a[4],
			g = a[5],
			i = a[6],
			h = a[7],
			a = a[8];
		return b * f * a - b * g * h - c * e * a + c * g * i + d * e * h - d * f * i
	},
	getInverse: function(a, b)
	{
		var c = a.elements,
			d = this.elements;
		d[0] = c[10] * c[5] - c[6] * c[9];
		d[1] = -c[10] * c[1] + c[2] * c[9];
		d[2] = c[6] * c[1] - c[2] * c[5];
		d[3] = -c[10] * c[4] + c[6] * c[8];
		d[4] = c[10] * c[0] - c[2] * c[8];
		d[5] = -c[6] * c[0] + c[2] * c[4];
		d[6] = c[9] * c[4] - c[5] * c[8];
		d[7] = -c[9] * c[0] + c[1] * c[8];
		d[8] = c[5] * c[0] - c[1] * c[4];
		c = c[0] * d[0] + c[1] * d[3] + c[2] * d[6];
		if (0 === c)
		{
			if (b) throw Error("Matrix3.getInverse(): can't invert matrix, determinant is 0");
			console.warn("Matrix3.getInverse(): can't invert matrix, determinant is 0");
			this.identity();
			return this
		}
		this.multiplyScalar(1 / c);
		return this
	},
	transpose: function()
	{
		var a, b = this.elements;
		a = b[1];
		b[1] = b[3];
		b[3] = a;
		a = b[2];
		b[2] = b[6];
		b[6] = a;
		a = b[5];
		b[5] = b[7];
		b[7] = a;
		return this
	},
	transposeIntoArray: function(a)
	{
		var b = this.elements;
		a[0] = b[0];
		a[1] = b[3];
		a[2] = b[6];
		a[3] = b[1];
		a[4] = b[4];
		a[5] = b[7];
		a[6] = b[2];
		a[7] = b[5];
		a[8] = b[8];
		return this
	},
	clone: function()
	{
		var a = this.elements;
		return new THREE.Matrix3(a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8])
	}
};
THREE.Matrix3.__v1 = new THREE.Vector3;
THREE.Matrix4 = function(a, b, c, d, e, f, g, i, h, k, l, m, n, r, p, q)
{
	this.elements = new Float32Array(16);
	this.set(void 0 !== a ? a : 1, b || 0, c || 0, d || 0, e || 0, void 0 !== f ? f : 1, g || 0, i || 0, h || 0, k || 0, void 0 !== l ? l : 1, m || 0, n || 0, r || 0, p || 0, void 0 !== q ? q : 1)
};
THREE.Matrix4.prototype = {
	constructor: THREE.Matrix4,
	set: function(a, b, c, d, e, f, g, i, h, k, l, m, n, r, p, q)
	{
		var s = this.elements;
		s[0] = a;
		s[4] = b;
		s[8] = c;
		s[12] = d;
		s[1] = e;
		s[5] = f;
		s[9] = g;
		s[13] = i;
		s[2] = h;
		s[6] = k;
		s[10] = l;
		s[14] = m;
		s[3] = n;
		s[7] = r;
		s[11] = p;
		s[15] = q;
		return this
	},
	identity: function()
	{
		this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
		return this
	},
	copy: function(a)
	{
		a = a.elements;
		this.set(a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15]);
		return this
	},
	setRotationFromEuler: function(a, b)
	{
		var c =
			this.elements,
			d = a.x,
			e = a.y,
			f = a.z,
			g = Math.cos(d),
			d = Math.sin(d),
			i = Math.cos(e),
			e = Math.sin(e),
			h = Math.cos(f),
			f = Math.sin(f);
		if (void 0 === b || "XYZ" === b)
		{
			var k = g * h,
				l = g * f,
				m = d * h,
				n = d * f;
			c[0] = i * h;
			c[4] = -i * f;
			c[8] = e;
			c[1] = l + m * e;
			c[5] = k - n * e;
			c[9] = -d * i;
			c[2] = n - k * e;
			c[6] = m + l * e;
			c[10] = g * i
		}
		else "YXZ" === b ? (k = i * h, l = i * f, m = e * h, n = e * f, c[0] = k + n * d, c[4] = m * d - l, c[8] = g * e, c[1] = g * f, c[5] = g * h, c[9] = -d, c[2] = l * d - m, c[6] = n + k * d, c[10] = g * i) : "ZXY" === b ? (k = i * h, l = i * f, m = e * h, n = e * f, c[0] = k - n * d, c[4] = -g * f, c[8] = m + l * d, c[1] = l + m * d, c[5] = g * h, c[9] = n - k * d, c[2] = -g * e, c[6] =
			d, c[10] = g * i) : "ZYX" === b ? (k = g * h, l = g * f, m = d * h, n = d * f, c[0] = i * h, c[4] = m * e - l, c[8] = k * e + n, c[1] = i * f, c[5] = n * e + k, c[9] = l * e - m, c[2] = -e, c[6] = d * i, c[10] = g * i) : "YZX" === b ? (k = g * i, l = g * e, m = d * i, n = d * e, c[0] = i * h, c[4] = n - k * f, c[8] = m * f + l, c[1] = f, c[5] = g * h, c[9] = -d * h, c[2] = -e * h, c[6] = l * f + m, c[10] = k - n * f) : "XZY" === b && (k = g * i, l = g * e, m = d * i, n = d * e, c[0] = i * h, c[4] = -f, c[8] = e * h, c[1] = k * f + n, c[5] = g * h, c[9] = l * f - m, c[2] = m * f - l, c[6] = d * h, c[10] = n * f + k);
		return this
	},
	setRotationFromQuaternion: function(a)
	{
		var b = this.elements,
			c = a.x,
			d = a.y,
			e = a.z,
			f = a.w,
			g = c + c,
			i = d + d,
			h = e +
			e,
			a = c * g,
			k = c * i,
			c = c * h,
			l = d * i,
			d = d * h,
			e = e * h,
			g = f * g,
			i = f * i,
			f = f * h;
		b[0] = 1 - (l + e);
		b[4] = k - f;
		b[8] = c + i;
		b[1] = k + f;
		b[5] = 1 - (a + e);
		b[9] = d - g;
		b[2] = c - i;
		b[6] = d + g;
		b[10] = 1 - (a + l);
		return this
	},
	lookAt: function(a, b, c)
	{
		var d = this.elements,
			e = THREE.Matrix4.__v1,
			f = THREE.Matrix4.__v2,
			g = THREE.Matrix4.__v3;
		g.subVectors(a, b)
			.normalize();
		0 === g.length() && (g.z = 1);
		e.crossVectors(c, g)
			.normalize();
		0 === e.length() && (g.x += 1E-4, e.crossVectors(c, g)
			.normalize());
		f.crossVectors(g, e);
		d[0] = e.x;
		d[4] = f.x;
		d[8] = g.x;
		d[1] = e.y;
		d[5] = f.y;
		d[9] = g.y;
		d[2] = e.z;
		d[6] =
			f.z;
		d[10] = g.z;
		return this
	},
	multiply: function(a, b)
	{
		return void 0 !== b ? (console.warn("DEPRECATED: Matrix4's .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(a, b)) : this.multiplyMatrices(this, a)
	},
	multiplyMatrices: function(a, b)
	{
		var c = a.elements,
			d = b.elements,
			e = this.elements,
			f = c[0],
			g = c[4],
			i = c[8],
			h = c[12],
			k = c[1],
			l = c[5],
			m = c[9],
			n = c[13],
			r = c[2],
			p = c[6],
			q = c[10],
			s = c[14],
			t = c[3],
			x = c[7],
			z = c[11],
			c = c[15],
			v = d[0],
			I = d[4],
			H = d[8],
			D = d[12],
			y = d[1],
			F = d[5],
			E = d[9],
			G = d[13],
			W = d[2],
			A = d[6],
			X = d[10],
			B = d[14],
			K = d[3],
			L = d[7],
			U = d[11],
			d = d[15];
		e[0] = f * v + g * y + i * W + h * K;
		e[4] = f * I + g * F + i * A + h * L;
		e[8] = f * H + g * E + i * X + h * U;
		e[12] = f * D + g * G + i * B + h * d;
		e[1] = k * v + l * y + m * W + n * K;
		e[5] = k * I + l * F + m * A + n * L;
		e[9] = k * H + l * E + m * X + n * U;
		e[13] = k * D + l * G + m * B + n * d;
		e[2] = r * v + p * y + q * W + s * K;
		e[6] = r * I + p * F + q * A + s * L;
		e[10] = r * H + p * E + q * X + s * U;
		e[14] = r * D + p * G + q * B + s * d;
		e[3] = t * v + x * y + z * W + c * K;
		e[7] = t * I + x * F + z * A + c * L;
		e[11] = t * H + x * E + z * X + c * U;
		e[15] = t * D + x * G + z * B + c * d;
		return this
	},
	multiplyToArray: function(a, b, c)
	{
		var d = this.elements;
		this.multiplyMatrices(a, b);
		c[0] = d[0];
		c[1] = d[1];
		c[2] = d[2];
		c[3] = d[3];
		c[4] = d[4];
		c[5] = d[5];
		c[6] = d[6];
		c[7] = d[7];
		c[8] = d[8];
		c[9] = d[9];
		c[10] = d[10];
		c[11] = d[11];
		c[12] = d[12];
		c[13] = d[13];
		c[14] = d[14];
		c[15] = d[15];
		return this
	},
	multiplyScalar: function(a)
	{
		var b = this.elements;
		b[0] *= a;
		b[4] *= a;
		b[8] *= a;
		b[12] *= a;
		b[1] *= a;
		b[5] *= a;
		b[9] *= a;
		b[13] *= a;
		b[2] *= a;
		b[6] *= a;
		b[10] *= a;
		b[14] *= a;
		b[3] *= a;
		b[7] *= a;
		b[11] *= a;
		b[15] *= a;
		return this
	},
	multiplyVector3: function(a)
	{
		console.warn("DEPRECATED: Matrix4's .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead.");
		return a.applyProjection(this)
	},
	multiplyVector4: function(a)
	{
		console.warn("DEPRECATED: Matrix4's .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.");
		return a.applyMatrix4(this)
	},
	multiplyVector3Array: function(a)
	{
		for (var b = THREE.Matrix4.__v1, c = 0, d = a.length; c < d; c += 3) b.x = a[c], b.y = a[c + 1], b.z = a[c + 2], b.applyProjection(this), a[c] = b.x, a[c + 1] = b.y, a[c + 2] = b.z;
		return a
	},
	rotateAxis: function(a)
	{
		var b = this.elements,
			c = a.x,
			d = a.y,
			e = a.z;
		a.x = c * b[0] + d * b[4] + e * b[8];
		a.y = c * b[1] + d * b[5] + e * b[9];
		a.z =
			c * b[2] + d * b[6] + e * b[10];
		a.normalize();
		return a
	},
	crossVector: function(a)
	{
		var b = this.elements,
			c = new THREE.Vector4;
		c.x = b[0] * a.x + b[4] * a.y + b[8] * a.z + b[12] * a.w;
		c.y = b[1] * a.x + b[5] * a.y + b[9] * a.z + b[13] * a.w;
		c.z = b[2] * a.x + b[6] * a.y + b[10] * a.z + b[14] * a.w;
		c.w = a.w ? b[3] * a.x + b[7] * a.y + b[11] * a.z + b[15] * a.w : 1;
		return c
	},
	determinant: function()
	{
		var a = this.elements,
			b = a[0],
			c = a[4],
			d = a[8],
			e = a[12],
			f = a[1],
			g = a[5],
			i = a[9],
			h = a[13],
			k = a[2],
			l = a[6],
			m = a[10],
			n = a[14];
		return a[3] * (+e * i * l - d * h * l - e * g * m + c * h * m + d * g * n - c * i * n) + a[7] * (+b * i * n - b * h * m + e * f * m - d *
			f * n + d * h * k - e * i * k) + a[11] * (+b * h * l - b * g * n - e * f * l + c * f * n + e * g * k - c * h * k) + a[15] * (-d * g * k - b * i * l + b * g * m + d * f * l - c * f * m + c * i * k)
	},
	transpose: function()
	{
		var a = this.elements,
			b;
		b = a[1];
		a[1] = a[4];
		a[4] = b;
		b = a[2];
		a[2] = a[8];
		a[8] = b;
		b = a[6];
		a[6] = a[9];
		a[9] = b;
		b = a[3];
		a[3] = a[12];
		a[12] = b;
		b = a[7];
		a[7] = a[13];
		a[13] = b;
		b = a[11];
		a[11] = a[14];
		a[14] = b;
		return this
	},
	flattenToArray: function(a)
	{
		var b = this.elements;
		a[0] = b[0];
		a[1] = b[1];
		a[2] = b[2];
		a[3] = b[3];
		a[4] = b[4];
		a[5] = b[5];
		a[6] = b[6];
		a[7] = b[7];
		a[8] = b[8];
		a[9] = b[9];
		a[10] = b[10];
		a[11] = b[11];
		a[12] = b[12];
		a[13] =
			b[13];
		a[14] = b[14];
		a[15] = b[15];
		return a
	},
	flattenToArrayOffset: function(a, b)
	{
		var c = this.elements;
		a[b] = c[0];
		a[b + 1] = c[1];
		a[b + 2] = c[2];
		a[b + 3] = c[3];
		a[b + 4] = c[4];
		a[b + 5] = c[5];
		a[b + 6] = c[6];
		a[b + 7] = c[7];
		a[b + 8] = c[8];
		a[b + 9] = c[9];
		a[b + 10] = c[10];
		a[b + 11] = c[11];
		a[b + 12] = c[12];
		a[b + 13] = c[13];
		a[b + 14] = c[14];
		a[b + 15] = c[15];
		return a
	},
	getPosition: function()
	{
		var a = this.elements;
		return THREE.Matrix4.__v1.set(a[12], a[13], a[14])
	},
	setPosition: function(a)
	{
		var b = this.elements;
		b[12] = a.x;
		b[13] = a.y;
		b[14] = a.z;
		return this
	},
	getColumnX: function()
	{
		var a =
			this.elements;
		return THREE.Matrix4.__v1.set(a[0], a[1], a[2])
	},
	getColumnY: function()
	{
		var a = this.elements;
		return THREE.Matrix4.__v1.set(a[4], a[5], a[6])
	},
	getColumnZ: function()
	{
		var a = this.elements;
		return THREE.Matrix4.__v1.set(a[8], a[9], a[10])
	},
	getInverse: function(a, b)
	{
		var c = this.elements,
			d = a.elements,
			e = d[0],
			f = d[4],
			g = d[8],
			i = d[12],
			h = d[1],
			k = d[5],
			l = d[9],
			m = d[13],
			n = d[2],
			r = d[6],
			p = d[10],
			q = d[14],
			s = d[3],
			t = d[7],
			x = d[11],
			z = d[15];
		c[0] = l * q * t - m * p * t + m * r * x - k * q * x - l * r * z + k * p * z;
		c[4] = i * p * t - g * q * t - i * r * x + f * q * x + g * r * z - f * p * z;
		c[8] =
			g * m * t - i * l * t + i * k * x - f * m * x - g * k * z + f * l * z;
		c[12] = i * l * r - g * m * r - i * k * p + f * m * p + g * k * q - f * l * q;
		c[1] = m * p * s - l * q * s - m * n * x + h * q * x + l * n * z - h * p * z;
		c[5] = g * q * s - i * p * s + i * n * x - e * q * x - g * n * z + e * p * z;
		c[9] = i * l * s - g * m * s - i * h * x + e * m * x + g * h * z - e * l * z;
		c[13] = g * m * n - i * l * n + i * h * p - e * m * p - g * h * q + e * l * q;
		c[2] = k * q * s - m * r * s + m * n * t - h * q * t - k * n * z + h * r * z;
		c[6] = i * r * s - f * q * s - i * n * t + e * q * t + f * n * z - e * r * z;
		c[10] = f * m * s - i * k * s + i * h * t - e * m * t - f * h * z + e * k * z;
		c[14] = i * k * n - f * m * n - i * h * r + e * m * r + f * h * q - e * k * q;
		c[3] = l * r * s - k * p * s - l * n * t + h * p * t + k * n * x - h * r * x;
		c[7] = f * p * s - g * r * s + g * n * t - e * p * t - f * n * x + e * r * x;
		c[11] = g * k *
			s - f * l * s - g * h * t + e * l * t + f * h * x - e * k * x;
		c[15] = f * l * n - g * k * n + g * h * r - e * l * r - f * h * p + e * k * p;
		c = d[0] * c[0] + d[1] * c[4] + d[2] * c[8] + d[3] * c[12];
		if (0 == c)
		{
			if (b) throw Error("Matrix4.getInverse(): can't invert matrix, determinant is 0");
			console.warn("Matrix4.getInverse(): can't invert matrix, determinant is 0");
			this.identity();
			return this
		}
		this.multiplyScalar(1 / c);
		return this
	},
	compose: function(a, b, c)
	{
		var d = this.elements,
			e = THREE.Matrix4.__m1,
			f = THREE.Matrix4.__m2;
		e.identity();
		e.setRotationFromQuaternion(b);
		f.makeScale(c.x, c.y, c.z);
		this.multiplyMatrices(e, f);
		d[12] = a.x;
		d[13] = a.y;
		d[14] = a.z;
		return this
	},
	decompose: function(a, b, c)
	{
		var d = this.elements,
			e = THREE.Matrix4.__v1,
			f = THREE.Matrix4.__v2,
			g = THREE.Matrix4.__v3;
		e.set(d[0], d[1], d[2]);
		f.set(d[4], d[5], d[6]);
		g.set(d[8], d[9], d[10]);
		a = a instanceof THREE.Vector3 ? a : new THREE.Vector3;
		b = b instanceof THREE.Quaternion ? b : new THREE.Quaternion;
		c = c instanceof THREE.Vector3 ? c : new THREE.Vector3;
		c.x = e.length();
		c.y = f.length();
		c.z = g.length();
		a.x = d[12];
		a.y = d[13];
		a.z = d[14];
		d = THREE.Matrix4.__m1;
		d.copy(this);
		d.elements[0] /= c.x;
		d.elements[1] /= c.x;
		d.elements[2] /= c.x;
		d.elements[4] /= c.y;
		d.elements[5] /= c.y;
		d.elements[6] /= c.y;
		d.elements[8] /= c.z;
		d.elements[9] /= c.z;
		d.elements[10] /= c.z;
		b.setFromRotationMatrix(d);
		return [a, b, c]
	},
	extractPosition: function(a)
	{
		var b = this.elements,
			a = a.elements;
		b[12] = a[12];
		b[13] = a[13];
		b[14] = a[14];
		return this
	},
	extractRotation: function(a)
	{
		var b = this.elements,
			a = a.elements,
			c = THREE.Matrix4.__v1,
			d = 1 / c.set(a[0], a[1], a[2])
			.length(),
			e = 1 / c.set(a[4], a[5], a[6])
			.length(),
			c = 1 / c.set(a[8], a[9], a[10])
			.length();
		b[0] = a[0] * d;
		b[1] = a[1] * d;
		b[2] = a[2] * d;
		b[4] = a[4] * e;
		b[5] = a[5] * e;
		b[6] = a[6] * e;
		b[8] = a[8] * c;
		b[9] = a[9] * c;
		b[10] = a[10] * c;
		return this
	},
	translate: function(a)
	{
		var b = this.elements,
			c = a.x,
			d = a.y,
			a = a.z;
		b[12] = b[0] * c + b[4] * d + b[8] * a + b[12];
		b[13] = b[1] * c + b[5] * d + b[9] * a + b[13];
		b[14] = b[2] * c + b[6] * d + b[10] * a + b[14];
		b[15] = b[3] * c + b[7] * d + b[11] * a + b[15];
		return this
	},
	rotateX: function(a)
	{
		var b = this.elements,
			c = b[4],
			d = b[5],
			e = b[6],
			f = b[7],
			g = b[8],
			i = b[9],
			h = b[10],
			k = b[11],
			l = Math.cos(a),
			a = Math.sin(a);
		b[4] = l * c + a * g;
		b[5] = l * d + a * i;
		b[6] = l * e + a * h;
		b[7] = l *
			f + a * k;
		b[8] = l * g - a * c;
		b[9] = l * i - a * d;
		b[10] = l * h - a * e;
		b[11] = l * k - a * f;
		return this
	},
	rotateY: function(a)
	{
		var b = this.elements,
			c = b[0],
			d = b[1],
			e = b[2],
			f = b[3],
			g = b[8],
			i = b[9],
			h = b[10],
			k = b[11],
			l = Math.cos(a),
			a = Math.sin(a);
		b[0] = l * c - a * g;
		b[1] = l * d - a * i;
		b[2] = l * e - a * h;
		b[3] = l * f - a * k;
		b[8] = l * g + a * c;
		b[9] = l * i + a * d;
		b[10] = l * h + a * e;
		b[11] = l * k + a * f;
		return this
	},
	rotateZ: function(a)
	{
		var b = this.elements,
			c = b[0],
			d = b[1],
			e = b[2],
			f = b[3],
			g = b[4],
			i = b[5],
			h = b[6],
			k = b[7],
			l = Math.cos(a),
			a = Math.sin(a);
		b[0] = l * c + a * g;
		b[1] = l * d + a * i;
		b[2] = l * e + a * h;
		b[3] = l * f + a * k;
		b[4] = l *
			g - a * c;
		b[5] = l * i - a * d;
		b[6] = l * h - a * e;
		b[7] = l * k - a * f;
		return this
	},
	rotateByAxis: function(a, b)
	{
		var c = this.elements;
		if (1 === a.x && 0 === a.y && 0 === a.z) return this.rotateX(b);
		if (0 === a.x && 1 === a.y && 0 === a.z) return this.rotateY(b);
		if (0 === a.x && 0 === a.y && 1 === a.z) return this.rotateZ(b);
		var d = a.x,
			e = a.y,
			f = a.z,
			g = Math.sqrt(d * d + e * e + f * f),
			d = d / g,
			e = e / g,
			f = f / g,
			g = d * d,
			i = e * e,
			h = f * f,
			k = Math.cos(b),
			l = Math.sin(b),
			m = 1 - k,
			n = d * e * m,
			r = d * f * m,
			m = e * f * m,
			d = d * l,
			p = e * l,
			l = f * l,
			f = g + (1 - g) * k,
			g = n + l,
			e = r - p,
			n = n - l,
			i = i + (1 - i) * k,
			l = m + d,
			r = r + p,
			m = m - d,
			h = h + (1 - h) * k,
			k = c[0],
			d =
			c[1],
			p = c[2],
			q = c[3],
			s = c[4],
			t = c[5],
			x = c[6],
			z = c[7],
			v = c[8],
			I = c[9],
			H = c[10],
			D = c[11];
		c[0] = f * k + g * s + e * v;
		c[1] = f * d + g * t + e * I;
		c[2] = f * p + g * x + e * H;
		c[3] = f * q + g * z + e * D;
		c[4] = n * k + i * s + l * v;
		c[5] = n * d + i * t + l * I;
		c[6] = n * p + i * x + l * H;
		c[7] = n * q + i * z + l * D;
		c[8] = r * k + m * s + h * v;
		c[9] = r * d + m * t + h * I;
		c[10] = r * p + m * x + h * H;
		c[11] = r * q + m * z + h * D;
		return this
	},
	scale: function(a)
	{
		var b = this.elements,
			c = a.x,
			d = a.y,
			a = a.z;
		b[0] *= c;
		b[4] *= d;
		b[8] *= a;
		b[1] *= c;
		b[5] *= d;
		b[9] *= a;
		b[2] *= c;
		b[6] *= d;
		b[10] *= a;
		b[3] *= c;
		b[7] *= d;
		b[11] *= a;
		return this
	},
	getMaxScaleOnAxis: function()
	{
		var a = this.elements;
		return Math.sqrt(Math.max(a[0] * a[0] + a[1] * a[1] + a[2] * a[2], Math.max(a[4] * a[4] + a[5] * a[5] + a[6] * a[6], a[8] * a[8] + a[9] * a[9] + a[10] * a[10])))
	},
	makeTranslation: function(a, b, c)
	{
		this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1);
		return this
	},
	makeRotationX: function(a)
	{
		var b = Math.cos(a),
			a = Math.sin(a);
		this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1);
		return this
	},
	makeRotationY: function(a)
	{
		var b = Math.cos(a),
			a = Math.sin(a);
		this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1);
		return this
	},
	makeRotationZ: function(a)
	{
		var b = Math.cos(a),
			a = Math.sin(a);
		this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
		return this
	},
	makeRotationAxis: function(a, b)
	{
		var c = Math.cos(b),
			d = Math.sin(b),
			e = 1 - c,
			f = a.x,
			g = a.y,
			i = a.z,
			h = e * f,
			k = e * g;
		this.set(h * f + c, h * g - d * i, h * i + d * g, 0, h * g + d * i, k * g + c, k * i - d * f, 0, h * i - d * g, k * i + d * f, e * i * i + c, 0, 0, 0, 0, 1);
		return this
	},
	makeScale: function(a, b, c)
	{
		this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1);
		return this
	},
	makeFrustum: function(a, b, c, d, e, f)
	{
		var g = this.elements;
		g[0] = 2 * e / (b - a);
		g[4] = 0;
		g[8] = (b + a) / (b - a);
		g[12] = 0;
		g[1] = 0;
		g[5] = 2 * e / (d - c);
		g[9] = (d + c) / (d - c);
		g[13] = 0;
		g[2] = 0;
		g[6] =
			0;
		g[10] = -(f + e) / (f - e);
		g[14] = -2 * f * e / (f - e);
		g[3] = 0;
		g[7] = 0;
		g[11] = -1;
		g[15] = 0;
		return this
	},
	makePerspective: function(a, b, c, d)
	{
		var a = c * Math.tan(THREE.Math.degToRad(0.5 * a)),
			e = -a;
		return this.makeFrustum(e * b, a * b, e, a, c, d)
	},
	makeOrthographic: function(a, b, c, d, e, f)
	{
		var g = this.elements,
			i = b - a,
			h = c - d,
			k = f - e;
		g[0] = 2 / i;
		g[4] = 0;
		g[8] = 0;
		g[12] = -((b + a) / i);
		g[1] = 0;
		g[5] = 2 / h;
		g[9] = 0;
		g[13] = -((c + d) / h);
		g[2] = 0;
		g[6] = 0;
		g[10] = -2 / k;
		g[14] = -((f + e) / k);
		g[3] = 0;
		g[7] = 0;
		g[11] = 0;
		g[15] = 1;
		return this
	},
	clone: function()
	{
		var a = this.elements;
		return new THREE.Matrix4(a[0],
			a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15])
	}
};
THREE.Matrix4.__v1 = new THREE.Vector3;
THREE.Matrix4.__v2 = new THREE.Vector3;
THREE.Matrix4.__v3 = new THREE.Vector3;
THREE.Matrix4.__m1 = new THREE.Matrix4;
THREE.Matrix4.__m2 = new THREE.Matrix4;
THREE.Ray = function(a, b)
{
	this.origin = void 0 !== a ? a : new THREE.Vector3;
	this.direction = void 0 !== b ? b : new THREE.Vector3
};
THREE.Ray.prototype = {
	constructor: THREE.Ray,
	set: function(a, b)
	{
		this.origin.copy(a);
		this.direction.copy(b);
		return this
	},
	copy: function(a)
	{
		this.origin.copy(a.origin);
		this.direction.copy(a.direction);
		return this
	},
	at: function(a, b)
	{
		return (b || new THREE.Vector3)
			.copy(this.direction)
			.multiplyScalar(a)
			.add(this.origin)
	},
	recast: function(a)
	{
		this.origin.copy(this.at(a, THREE.Ray.__v1));
		return this
	},
	closestPointToPoint: function(a, b)
	{
		var c = b || new THREE.Vector3;
		c.subVectors(a, this.origin);
		var d = c.dot(this.direction);
		return c.copy(this.direction)
			.multiplyScalar(d)
			.add(this.origin)
	},
	distanceToPoint: function(a)
	{
		var b = THREE.Ray.__v1.subVectors(a, this.origin)
			.dot(this.direction);
		THREE.Ray.__v1.copy(this.direction)
			.multiplyScalar(b)
			.add(this.origin);
		return THREE.Ray.__v1.distanceTo(a)
	},
	isIntersectionSphere: function(a)
	{
		return this.distanceToPoint(a.center) <= a.radius
	},
	isIntersectionPlane: function(a)
	{
		return 0 != a.normal.dot(this.direction) || 0 == a.distanceToPoint(this.origin) ? !0 : !1
	},
	distanceToPlane: function(a)
	{
		var b = a.normal.dot(this.direction);
		if (0 == b)
		{
			if (0 == a.distanceToPoint(this.origin)) return 0
		}
		else return -(this.origin.dot(a.normal) + a.constant) / b
	},
	intersectPlane: function(a, b)
	{
		var c = this.distanceToPlane(a);
		return void 0 === c ? void 0 : this.at(c, b)
	},
	transform: function(a)
	{
		this.direction.add(this.origin)
			.applyMatrix4(a);
		this.origin.applyMatrix4(a);
		this.direction.sub(this.origin);
		return this
	},
	equals: function(a)
	{
		return a.origin.equals(this.origin) && a.direction.equals(this.direction)
	},
	clone: function()
	{
		return (new THREE.Ray)
			.copy(this)
	}
};
THREE.Ray.__v1 = new THREE.Vector3;
THREE.Ray.__v2 = new THREE.Vector3;
THREE.Sphere = function(a, b)
{
	this.center = void 0 !== a ? a : new THREE.Vector3;
	this.radius = void 0 !== b ? b : 0
};
THREE.Sphere.prototype = {
	constructor: THREE.Sphere,
	set: function(a, b)
	{
		this.center.copy(a);
		this.radius = b;
		return this
	},
	setFromCenterAndPoints: function(a, b)
	{
		for (var c = 0, d = 0, e = b.length; d < e; d++) var f = a.distanceToSquared(b[d]),
			c = Math.max(c, f);
		this.center = a;
		this.radius = Math.sqrt(c);
		return this
	},
	copy: function(a)
	{
		this.center.copy(a.center);
		this.radius = a.radius;
		return this
	},
	empty: function()
	{
		return 0 >= this.radius
	},
	containsPoint: function(a)
	{
		return a.distanceToSquared(this.center) <= this.radius * this.radius
	},
	distanceToPoint: function(a)
	{
		return a.distanceTo(this.center) -
			this.radius
	},
	intersectsSphere: function(a)
	{
		var b = this.radius + a.radius;
		return a.center.distanceToSquared(this.center) <= b * b
	},
	clampPoint: function(a, b)
	{
		var c = this.center.distanceToSquared(a),
			d = b || new THREE.Vector3;
		d.copy(a);
		c > this.radius * this.radius && (d.sub(this.center)
			.normalize(), d.multiplyScalar(this.radius)
			.add(this.center));
		return d
	},
	getBoundingBox: function(a)
	{
		a = a || new THREE.Box3;
		a.set(this.center, this.center);
		a.expandByScalar(this.radius);
		return a
	},
	transform: function(a)
	{
		this.center.applyMatrix4(a);
		this.radius *= a.getMaxScaleOnAxis();
		return this
	},
	translate: function(a)
	{
		this.center.add(a);
		return this
	},
	equals: function(a)
	{
		return a.center.equals(this.center) && a.radius === this.radius
	},
	clone: function()
	{
		return (new THREE.Sphere)
			.copy(this)
	}
};
THREE.Frustum = function(a, b, c, d, e, f)
{
	this.planes = [void 0 !== a ? a : new THREE.Plane, void 0 !== b ? b : new THREE.Plane, void 0 !== c ? c : new THREE.Plane, void 0 !== d ? d : new THREE.Plane, void 0 !== e ? e : new THREE.Plane, void 0 !== f ? f : new THREE.Plane]
};
THREE.Frustum.prototype = {
	set: function(a, b, c, d, e, f)
	{
		var g = this.planes;
		g[0].copy(a);
		g[1].copy(b);
		g[2].copy(c);
		g[3].copy(d);
		g[4].copy(e);
		g[5].copy(f);
		return this
	},
	copy: function(a)
	{
		for (var b = this.planes, c = 0; 6 > c; c++) b[c].copy(a.planes[c]);
		return this
	},
	setFromMatrix: function(a)
	{
		var b = this.planes,
			c = a.elements,
			a = c[0],
			d = c[1],
			e = c[2],
			f = c[3],
			g = c[4],
			i = c[5],
			h = c[6],
			k = c[7],
			l = c[8],
			m = c[9],
			n = c[10],
			r = c[11],
			p = c[12],
			q = c[13],
			s = c[14],
			c = c[15];
		b[0].setComponents(f - a, k - g, r - l, c - p)
			.normalize();
		b[1].setComponents(f + a, k + g, r + l,
				c + p)
			.normalize();
		b[2].setComponents(f + d, k + i, r + m, c + q)
			.normalize();
		b[3].setComponents(f - d, k - i, r - m, c - q)
			.normalize();
		b[4].setComponents(f - e, k - h, r - n, c - s)
			.normalize();
		b[5].setComponents(f + e, k + h, r + n, c + s)
			.normalize();
		return this
	},
	intersectsObject: function(a)
	{
		for (var b = a.matrixWorld, c = this.planes, d = b.getPosition(), a = -a.geometry.boundingSphere.radius * b.getMaxScaleOnAxis(), b = 0; 6 > b; b++)
			if (c[b].distanceToPoint(d) < a) return !1;
		return !0
	},
	intersectsSphere: function(a)
	{
		for (var b = this.planes, c = a.center, a = -a.radius, d =
			0; 6 > d; d++)
			if (b[d].distanceToPoint(c) < a) return !1;
		return !0
	},
	containsPoint: function(a)
	{
		for (var b = this.planes, c = 0; 6 > c; c++)
			if (0 > b[c].distanceToPoint(a)) return !1;
		return !0
	},
	clone: function()
	{
		return (new THREE.Frustum)
			.copy(this)
	}
};
THREE.Plane = function(a, b)
{
	this.normal = void 0 !== a ? a : new THREE.Vector3(1, 0, 0);
	this.constant = void 0 !== b ? b : 0
};
THREE.Plane.prototype = {
	constructor: THREE.Plane,
	set: function(a, b)
	{
		this.normal.copy(a);
		this.constant = b;
		return this
	},
	setComponents: function(a, b, c, d)
	{
		this.normal.set(a, b, c);
		this.constant = d;
		return this
	},
	setFromNormalAndCoplanarPoint: function(a, b)
	{
		this.normal.copy(a);
		this.constant = -b.dot(this.normal);
		return this
	},
	setFromCoplanarPoints: function(a, b, c)
	{
		b = THREE.Plane.__v1.subVectors(c, b)
			.cross(THREE.Plane.__v2.subVectors(a, b))
			.normalize();
		this.setFromNormalAndCoplanarPoint(b, a);
		return this
	},
	copy: function(a)
	{
		this.normal.copy(a.normal);
		this.constant = a.constant;
		return this
	},
	normalize: function()
	{
		var a = 1 / this.normal.length();
		this.normal.multiplyScalar(a);
		this.constant *= a;
		return this
	},
	negate: function()
	{
		this.constant *= -1;
		this.normal.negate();
		return this
	},
	distanceToPoint: function(a)
	{
		return this.normal.dot(a) + this.constant
	},
	distanceToSphere: function(a)
	{
		return this.distanceToPoint(a.center) - a.radius
	},
	projectPoint: function(a, b)
	{
		return this.orthoPoint(a, b)
			.sub(a)
			.negate()
	},
	orthoPoint: function(a, b)
	{
		var c = this.distanceToPoint(a);
		return (b ||
				new THREE.Vector3)
			.copy(this.normal)
			.multiplyScalar(c)
	},
	isIntersectionLine: function(a, b)
	{
		var c = this.distanceToPoint(a),
			d = this.distanceToPoint(b);
		return 0 > c && 0 < d || 0 > d && 0 < c
	},
	intersectLine: function(a, b, c)
	{
		var c = c || new THREE.Vector3,
			b = THREE.Plane.__v1.subVectors(b, a),
			d = this.normal.dot(b);
		if (0 == d)
		{
			if (0 == this.distanceToPoint(a)) return c.copy(a)
		}
		else return d = -(a.dot(this.normal) + this.constant) / d, 0 > d || 1 < d ? void 0 : c.copy(b)
			.multiplyScalar(d)
			.add(a)
	},
	coplanarPoint: function(a)
	{
		return (a || new THREE.Vector3)
			.copy(this.normal)
			.multiplyScalar(-this.constant)
	},
	transform: function(a, b)
	{
		var b = b || (new THREE.Matrix3)
			.getInverse(a)
			.transpose(),
			c = THREE.Plane.__v1.copy(this.normal)
			.applyMatrix3(b),
			d = this.coplanarPoint(THREE.Plane.__v2);
		d.applyMatrix4(a);
		this.setFromNormalAndCoplanarPoint(c, d);
		return this
	},
	translate: function(a)
	{
		this.constant -= a.dot(this.normal);
		return this
	},
	equals: function(a)
	{
		return a.normal.equals(this.normal) && a.constant == this.constant
	},
	clone: function()
	{
		return (new THREE.Plane)
			.copy(this)
	}
};
THREE.Plane.__vZero = new THREE.Vector3(0, 0, 0);
THREE.Plane.__v1 = new THREE.Vector3;
THREE.Plane.__v2 = new THREE.Vector3;
THREE.Math = {
	clamp: function(a, b, c)
	{
		return a < b ? b : a > c ? c : a
	},
	clampBottom: function(a, b)
	{
		return a < b ? b : a
	},
	mapLinear: function(a, b, c, d, e)
	{
		return d + (a - b) * (e - d) / (c - b)
	},
	random16: function()
	{
		return (65280 * Math.random() + 255 * Math.random()) / 65535
	},
	randInt: function(a, b)
	{
		return a + Math.floor(Math.random() * (b - a + 1))
	},
	randFloat: function(a, b)
	{
		return a + Math.random() * (b - a)
	},
	randFloatSpread: function(a)
	{
		return a * (0.5 - Math.random())
	},
	sign: function(a)
	{
		return 0 > a ? -1 : 0 < a ? 1 : 0
	},
	degToRad: function(a)
	{
		return a * THREE.Math.__d2r
	},
	radToDeg: function(a)
	{
		return a *
			THREE.Math.__r2d
	}
};
THREE.Math.__d2r = Math.PI / 180;
THREE.Math.__r2d = 180 / Math.PI;
THREE.Spline = function(a)
{
	function b(a, b, c, d, e, f, g)
	{
		a = 0.5 * (c - a);
		d = 0.5 * (d - b);
		return (2 * (b - c) + a + d) * g + (-3 * (b - c) - 2 * a - d) * f + a * e + b
	}
	this.points = a;
	var c = [],
		d = {
			x: 0,
			y: 0,
			z: 0
		},
		e, f, g, i, h, k, l, m, n;
	this.initFromArray = function(a)
	{
		this.points = [];
		for (var b = 0; b < a.length; b++) this.points[b] = {
			x: a[b][0],
			y: a[b][1],
			z: a[b][2]
		}
	};
	this.getPoint = function(a)
	{
		e = (this.points.length - 1) * a;
		f = Math.floor(e);
		g = e - f;
		c[0] = 0 === f ? f : f - 1;
		c[1] = f;
		c[2] = f > this.points.length - 2 ? this.points.length - 1 : f + 1;
		c[3] = f > this.points.length - 3 ? this.points.length - 1 :
			f + 2;
		k = this.points[c[0]];
		l = this.points[c[1]];
		m = this.points[c[2]];
		n = this.points[c[3]];
		i = g * g;
		h = g * i;
		d.x = b(k.x, l.x, m.x, n.x, g, i, h);
		d.y = b(k.y, l.y, m.y, n.y, g, i, h);
		d.z = b(k.z, l.z, m.z, n.z, g, i, h);
		return d
	};
	this.getControlPointsArray = function()
	{
		var a, b, c = this.points.length,
			d = [];
		for (a = 0; a < c; a++) b = this.points[a], d[a] = [b.x, b.y, b.z];
		return d
	};
	this.getLength = function(a)
	{
		var b, c, d, e = b = b = 0,
			f = new THREE.Vector3,
			g = new THREE.Vector3,
			i = [],
			h = 0;
		i[0] = 0;
		a || (a = 100);
		c = this.points.length * a;
		f.copy(this.points[0]);
		for (a = 1; a < c; a++) b =
			a / c, d = this.getPoint(b), g.copy(d), h += g.distanceTo(f), f.copy(d), b *= this.points.length - 1, b = Math.floor(b), b != e && (i[b] = h, e = b);
		i[i.length] = h;
		return {
			chunks: i,
			total: h
		}
	};
	this.reparametrizeByArcLength = function(a)
	{
		var b, c, d, e, f, g, i = [],
			h = new THREE.Vector3,
			k = this.getLength();
		i.push(h.copy(this.points[0])
			.clone());
		for (b = 1; b < this.points.length; b++)
		{
			c = k.chunks[b] - k.chunks[b - 1];
			g = Math.ceil(a * c / k.total);
			e = (b - 1) / (this.points.length - 1);
			f = b / (this.points.length - 1);
			for (c = 1; c < g - 1; c++) d = e + c * (1 / g) * (f - e), d = this.getPoint(d),
				i.push(h.copy(d)
					.clone());
			i.push(h.copy(this.points[b])
				.clone())
		}
		this.points = i
	}
};
THREE.Triangle = function(a, b, c)
{
	this.a = void 0 !== a ? a : new THREE.Vector3;
	this.b = void 0 !== b ? b : new THREE.Vector3;
	this.c = void 0 !== c ? c : new THREE.Vector3
};
THREE.Triangle.normal = function(a, b, c, d)
{
	d = d || new THREE.Vector3;
	d.subVectors(c, b);
	THREE.Triangle.__v0.subVectors(a, b);
	d.cross(THREE.Triangle.__v0);
	a = d.lengthSq();
	return 0 < a ? d.multiplyScalar(1 / Math.sqrt(a)) : d.set(0, 0, 0)
};
THREE.Triangle.barycoordFromPoint = function(a, b, c, d, e)
{
	THREE.Triangle.__v0.subVectors(d, b);
	THREE.Triangle.__v1.subVectors(c, b);
	THREE.Triangle.__v2.subVectors(a, b);
	var a = THREE.Triangle.__v0.dot(THREE.Triangle.__v0),
		b = THREE.Triangle.__v0.dot(THREE.Triangle.__v1),
		c = THREE.Triangle.__v0.dot(THREE.Triangle.__v2),
		f = THREE.Triangle.__v1.dot(THREE.Triangle.__v1),
		d = THREE.Triangle.__v1.dot(THREE.Triangle.__v2),
		g = a * f - b * b,
		e = e || new THREE.Vector3;
	if (0 == g) return e.set(-2, -1, -1);
	g = 1 / g;
	f = (f * c - b * d) * g;
	a = (a * d - b * c) * g;
	return e.set(1 -
		f - a, a, f)
};
THREE.Triangle.containsPoint = function(a, b, c, d)
{
	a = THREE.Triangle.barycoordFromPoint(a, b, c, d, THREE.Triangle.__v3);
	return 0 <= a.x && 0 <= a.y && 1 >= a.x + a.y
};
THREE.Triangle.prototype = {
	constructor: THREE.Triangle,
	set: function(a, b, c)
	{
		this.a.copy(a);
		this.b.copy(b);
		this.c.copy(c);
		return this
	},
	setFromPointsAndIndices: function(a, b, c, d)
	{
		this.a.copy(a[b]);
		this.b.copy(a[c]);
		this.c.copy(a[d]);
		return this
	},
	copy: function(a)
	{
		this.a.copy(a.a);
		this.b.copy(a.b);
		this.c.copy(a.c);
		return this
	},
	area: function()
	{
		THREE.Triangle.__v0.subVectors(this.c, this.b);
		THREE.Triangle.__v1.subVectors(this.a, this.b);
		return 0.5 * THREE.Triangle.__v0.cross(THREE.Triangle.__v1)
			.length()
	},
	midpoint: function(a)
	{
		return (a ||
				new THREE.Vector3)
			.addVectors(this.a, this.b)
			.add(this.c)
			.multiplyScalar(1 / 3)
	},
	normal: function(a)
	{
		return THREE.Triangle.normal(this.a, this.b, this.c, a)
	},
	plane: function(a)
	{
		return (a || new THREE.Plane)
			.setFromCoplanarPoints(this.a, this.b, this.c)
	},
	barycoordFromPoint: function(a, b)
	{
		return THREE.Triangle.barycoordFromPoint(a, this.a, this.b, this.c, b)
	},
	containsPoint: function(a)
	{
		return THREE.Triangle.containsPoint(a, this.a, this.b, this.c)
	},
	equals: function(a)
	{
		return a.a.equals(this.a) && a.b.equals(this.b) && a.c.equals(this.c)
	},
	clone: function()
	{
		return (new THREE.Triangle)
			.copy(this)
	}
};
THREE.Triangle.__v0 = new THREE.Vector3;
THREE.Triangle.__v1 = new THREE.Vector3;
THREE.Triangle.__v2 = new THREE.Vector3;
THREE.Triangle.__v3 = new THREE.Vector3;
THREE.Vertex = function(a)
{
	console.warn("THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead.");
	return a
};
THREE.UV = function(a, b)
{
	console.warn("THREE.UV has been DEPRECATED. Use THREE.Vector2 instead.");
	return new THREE.Vector2(a, b)
};
THREE.Clock = function(a)
{
	this.autoStart = void 0 !== a ? a : !0;
	this.elapsedTime = this.oldTime = this.startTime = 0;
	this.running = !1
};
THREE.Clock.prototype.start = function()
{
	this.oldTime = this.startTime = Date.now();
	this.running = !0
};
THREE.Clock.prototype.stop = function()
{
	this.getElapsedTime();
	this.running = !1
};
THREE.Clock.prototype.getElapsedTime = function()
{
	this.getDelta();
	return this.elapsedTime
};
THREE.Clock.prototype.getDelta = function()
{
	var a = 0;
	this.autoStart && !this.running && this.start();
	if (this.running)
	{
		var b = Date.now(),
			a = 0.001 * (b - this.oldTime);
		this.oldTime = b;
		this.elapsedTime += a
	}
	return a
};
THREE.EventDispatcher = function()
{
	var a = {};
	this.addEventListener = function(b, c)
	{
		void 0 === a[b] && (a[b] = []); - 1 === a[b].indexOf(c) && a[b].push(c)
	};
	this.removeEventListener = function(b, c)
	{
		var d = a[b].indexOf(c); - 1 !== d && a[b].splice(d, 1)
	};
	this.dispatchEvent = function(b)
	{
		var c = a[b.type];
		if (void 0 !== c)
		{
			b.target = this;
			for (var d = 0, e = c.length; d < e; d++) c[d].call(this, b)
		}
	}
};
(function(a)
{
	a.Raycaster = function(b, c, d, e)
	{
		this.ray = new a.Ray(b, c);
		0 < this.ray.direction.length() && this.ray.direction.normalize();
		this.near = d || 0;
		this.far = e || Infinity
	};
	var b = new a.Sphere,
		c = new a.Ray,
		d = new a.Plane,
		e = new a.Vector3,
		f = new a.Matrix4,
		g = function(a, b)
		{
			return a.distance - b.distance
		},
		i = function(g, i, h)
		{
			if (g instanceof a.Particle)
			{
				i = i.ray.distanceToPoint(g.matrixWorld.getPosition());
				if (i > g.scale.x) return h;
				h.push(
				{
					distance: i,
					point: g.position,
					face: null,
					object: g
				})
			}
			else if (g instanceof a.Mesh)
			{
				b.set(g.matrixWorld.getPosition(),
					g.geometry.boundingSphere.radius * g.matrixWorld.getMaxScaleOnAxis());
				if (!i.ray.isIntersectionSphere(b)) return h;
				var n = g.geometry,
					r = n.vertices,
					p = g.material instanceof a.MeshFaceMaterial,
					q = !0 === p ? g.material.materials : null,
					s = g.material.side,
					t, x, z, v = i.precision;
				g.matrixRotationWorld.extractRotation(g.matrixWorld);
				f.getInverse(g.matrixWorld);
				c.copy(i.ray)
					.transform(f);
				for (var I = 0, H = n.faces.length; I < H; I++)
				{
					var D = n.faces[I],
						s = !0 === p ? q[D.materialIndex] : g.material;
					if (void 0 !== s)
					{
						d.setFromNormalAndCoplanarPoint(D.normal,
							r[D.a]);
						var y = c.distanceToPlane(d);
						if (!(Math.abs(y) < v) && !(0 > y))
						{
							s = s.side;
							if (s !== a.DoubleSide && (t = c.direction.dot(d.normal), !(s === a.FrontSide ? 0 > t : 0 < t))) continue;
							if (!(y < i.near || y > i.far))
							{
								e = c.at(y, e);
								if (D instanceof a.Face3)
								{
									if (s = r[D.a], t = r[D.b], x = r[D.c], !a.Triangle.containsPoint(e, s, t, x)) continue
								}
								else if (D instanceof a.Face4)
								{
									if (s = r[D.a], t = r[D.b], x = r[D.c], z = r[D.d], !a.Triangle.containsPoint(e, s, t, z) && !a.Triangle.containsPoint(e, t, x, z)) continue
								}
								else throw Error("face type not supported");
								h.push(
								{
									distance: y,
									point: i.ray.at(y),
									face: D,
									faceIndex: I,
									object: g
								})
							}
						}
					}
				}
			}
		},
		h = function(a, b, c)
		{
			for (var a = a.getDescendants(), d = 0, e = a.length; d < e; d++) i(a[d], b, c)
		};
	a.Raycaster.prototype.precision = 1E-4;
	a.Raycaster.prototype.set = function(a, b)
	{
		this.ray.set(a, b);
		0 < this.ray.direction.length() && this.ray.direction.normalize()
	};
	a.Raycaster.prototype.intersectObject = function(a, b)
	{
		var c = [];
		!0 === b && h(a, this, c);
		i(a, this, c);
		c.sort(g);
		return c
	};
	a.Raycaster.prototype.intersectObjects = function(a, b)
	{
		for (var c = [], d = 0, e = a.length; d < e; d++) i(a[d],
			this, c), !0 === b && h(a[d], this, c);
		c.sort(g);
		return c
	}
})(THREE);
THREE.Object3D = function()
{
	this.id = THREE.Object3DIdCount++;
	this.name = "";
	this.properties = {};
	this.parent = void 0;
	this.children = [];
	this.up = new THREE.Vector3(0, 1, 0);
	this.position = new THREE.Vector3;
	this.rotation = new THREE.Vector3;
	this.eulerOrder = THREE.Object3D.defaultEulerOrder;
	this.scale = new THREE.Vector3(1, 1, 1);
	this.renderDepth = null;
	this.rotationAutoUpdate = !0;
	this.matrix = new THREE.Matrix4;
	this.matrixWorld = new THREE.Matrix4;
	this.matrixRotationWorld = new THREE.Matrix4;
	this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0;
	this.quaternion = new THREE.Quaternion;
	this.useQuaternion = !1;
	this.visible = !0;
	this.receiveShadow = this.castShadow = !1;
	this.frustumCulled = !0;
	this._vector = new THREE.Vector3
};
THREE.Object3D.prototype = {
	constructor: THREE.Object3D,
	applyMatrix: function(a)
	{
		this.matrix.multiplyMatrices(a, this.matrix);
		this.scale.getScaleFromMatrix(this.matrix);
		a = (new THREE.Matrix4)
			.extractRotation(this.matrix);
		this.rotation.setEulerFromRotationMatrix(a, this.eulerOrder);
		this.position.getPositionFromMatrix(this.matrix)
	},
	translate: function(a, b)
	{
		this.matrix.rotateAxis(b);
		this.position.add(b.multiplyScalar(a))
	},
	translateX: function(a)
	{
		this.translate(a, this._vector.set(1, 0, 0))
	},
	translateY: function(a)
	{
		this.translate(a,
			this._vector.set(0, 1, 0))
	},
	translateZ: function(a)
	{
		this.translate(a, this._vector.set(0, 0, 1))
	},
	localToWorld: function(a)
	{
		return a.applyMatrix4(this.matrixWorld)
	},
	worldToLocal: function(a)
	{
		return a.applyMatrix4(THREE.Object3D.__m1.getInverse(this.matrixWorld))
	},
	lookAt: function(a)
	{
		this.matrix.lookAt(a, this.position, this.up);
		this.rotationAutoUpdate && (!1 === this.useQuaternion ? this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder) : this.quaternion.copy(this.matrix.decompose()[1]))
	},
	add: function(a)
	{
		if (a ===
			this) console.warn("THREE.Object3D.add: An object can't be added as a child of itself.");
		else if (a instanceof THREE.Object3D)
		{
			void 0 !== a.parent && a.parent.remove(a);
			a.parent = this;
			this.children.push(a);
			for (var b = this; void 0 !== b.parent;) b = b.parent;
			void 0 !== b && b instanceof THREE.Scene && b.__addObject(a)
		}
	},
	remove: function(a)
	{
		var b = this.children.indexOf(a);
		if (-1 !== b)
		{
			a.parent = void 0;
			this.children.splice(b, 1);
			for (b = this; void 0 !== b.parent;) b = b.parent;
			void 0 !== b && b instanceof THREE.Scene && b.__removeObject(a)
		}
	},
	traverse: function(a)
	{
		a(this);
		for (var b = 0, c = this.children.length; b < c; b++) this.children[b].traverse(a)
	},
	getChildByName: function(a, b)
	{
		for (var c = 0, d = this.children.length; c < d; c++)
		{
			var e = this.children[c];
			if (e.name === a || !0 === b && (e = e.getChildByName(a, b), void 0 !== e)) return e
		}
	},
	getDescendants: function(a)
	{
		void 0 === a && (a = []);
		Array.prototype.push.apply(a, this.children);
		for (var b = 0, c = this.children.length; b < c; b++) this.children[b].getDescendants(a);
		return a
	},
	updateMatrix: function()
	{
		this.matrix.setPosition(this.position);
		!1 === this.useQuaternion ? this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder) : this.matrix.setRotationFromQuaternion(this.quaternion);
		(1 !== this.scale.x || 1 !== this.scale.y || 1 !== this.scale.z) && this.matrix.scale(this.scale);
		this.matrixWorldNeedsUpdate = !0
	},
	updateMatrixWorld: function(a)
	{
		!0 === this.matrixAutoUpdate && this.updateMatrix();
		if (!0 === this.matrixWorldNeedsUpdate || !0 === a) void 0 === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
			this.matrixWorldNeedsUpdate = !1, a = !0;
		for (var b = 0, c = this.children.length; b < c; b++) this.children[b].updateMatrixWorld(a)
	},
	clone: function(a)
	{
		void 0 === a && (a = new THREE.Object3D);
		a.name = this.name;
		a.up.copy(this.up);
		a.position.copy(this.position);
		a.rotation instanceof THREE.Vector3 && a.rotation.copy(this.rotation);
		a.eulerOrder = this.eulerOrder;
		a.scale.copy(this.scale);
		a.renderDepth = this.renderDepth;
		a.rotationAutoUpdate = this.rotationAutoUpdate;
		a.matrix.copy(this.matrix);
		a.matrixWorld.copy(this.matrixWorld);
		a.matrixRotationWorld.copy(this.matrixRotationWorld);
		a.matrixAutoUpdate = this.matrixAutoUpdate;
		a.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;
		a.quaternion.copy(this.quaternion);
		a.useQuaternion = this.useQuaternion;
		a.visible = this.visible;
		a.castShadow = this.castShadow;
		a.receiveShadow = this.receiveShadow;
		a.frustumCulled = this.frustumCulled;
		for (var b = 0; b < this.children.length; b++) a.add(this.children[b].clone());
		return a
	}
};
THREE.Object3D.__m1 = new THREE.Matrix4;
THREE.Object3D.defaultEulerOrder = "XYZ";
THREE.Object3DIdCount = 0;
THREE.Projector = function()
{
	function a()
	{
		if (f === i)
		{
			var a = new THREE.RenderableObject;
			g.push(a);
			i++;
			f++;
			return a
		}
		return g[f++]
	}

	function b()
	{
		if (k === m)
		{
			var a = new THREE.RenderableVertex;
			l.push(a);
			m++;
			k++;
			return a
		}
		return l[k++]
	}

	function c(a, b)
	{
		return b.z - a.z
	}

	function d(a, b)
	{
		var c = 0,
			d = 1,
			e = a.z + a.w,
			f = b.z + b.w,
			g = -a.z + a.w,
			i = -b.z + b.w;
		if (0 <= e && 0 <= f && 0 <= g && 0 <= i) return !0;
		if (0 > e && 0 > f || 0 > g && 0 > i) return !1;
		0 > e ? c = Math.max(c, e / (e - f)) : 0 > f && (d = Math.min(d, e / (e - f)));
		0 > g ? c = Math.max(c, g / (g - i)) : 0 > i && (d = Math.min(d, g / (g - i)));
		if (d <
			c) return !1;
		a.lerp(b, c);
		b.lerp(a, 1 - d);
		return !0
	}
	var e, f, g = [],
		i = 0,
		h, k, l = [],
		m = 0,
		n, r, p = [],
		q = 0,
		s, t = [],
		x = 0,
		z, v, I = [],
		H = 0,
		D, y, F = [],
		E = 0,
		G = {
			objects: [],
			sprites: [],
			lights: [],
			elements: []
		},
		W = new THREE.Vector3,
		A = new THREE.Vector4,
		X = new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1)),
		B = new THREE.Box3,
		K = Array(3),
		L = Array(4),
		U = new THREE.Matrix4,
		aa = new THREE.Matrix4,
		ba, xa = new THREE.Matrix4,
		J = new THREE.Matrix3,
		ha = new THREE.Matrix3,
		ua = new THREE.Vector3,
		Oa = new THREE.Frustum,
		M = new THREE.Vector4,
		fa = new THREE.Vector4;
	this.projectVector = function(a, b)
	{
		b.matrixWorldInverse.getInverse(b.matrixWorld);
		aa.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse);
		return a.applyProjection(aa)
	};
	this.unprojectVector = function(a, b)
	{
		b.projectionMatrixInverse.getInverse(b.projectionMatrix);
		aa.multiplyMatrices(b.matrixWorld, b.projectionMatrixInverse);
		return a.applyProjection(aa)
	};
	this.pickingRay = function(a, b)
	{
		a.z = -1;
		var c = new THREE.Vector3(a.x, a.y, 1);
		this.unprojectVector(a, b);
		this.unprojectVector(c, b);
		c.sub(a)
			.normalize();
		return new THREE.Raycaster(a,
			c)
	};
	this.projectScene = function(g, i, m, Ja)
	{
		var ma = !1,
			wa, Ta, Ra, ia, ra, ga, Z, pa, gb, hb, Ea, yb, Cb;
		y = v = s = r = 0;
		G.elements.length = 0;
		g.updateMatrixWorld();
		void 0 === i.parent && i.updateMatrixWorld();
		U.copy(i.matrixWorldInverse.getInverse(i.matrixWorld));
		aa.multiplyMatrices(i.projectionMatrix, U);
		ha.getInverse(U);
		ha.transpose();
		Oa.setFromMatrix(aa);
		f = 0;
		G.objects.length = 0;
		G.sprites.length = 0;
		G.lights.length = 0;
		var Lb = function(b)
		{
			for (var c = 0, d = b.children.length; c < d; c++)
			{
				var f = b.children[c];
				if (!1 !== f.visible)
				{
					if (f instanceof THREE.Light) G.lights.push(f);
					else if (f instanceof THREE.Mesh || f instanceof THREE.Line)
					{
						if (!1 === f.frustumCulled || !0 === Oa.intersectsObject(f)) e = a(), e.object = f, null !== f.renderDepth ? e.z = f.renderDepth : (W.copy(f.matrixWorld.getPosition()), W.applyProjection(aa), e.z = W.z), G.objects.push(e)
					}
					else f instanceof THREE.Sprite || f instanceof THREE.Particle ? (e = a(), e.object = f, null !== f.renderDepth ? e.z = f.renderDepth : (W.copy(f.matrixWorld.getPosition()), W.applyProjection(aa), e.z = W.z), G.sprites.push(e)) : (e = a(), e.object =
						f, null !== f.renderDepth ? e.z = f.renderDepth : (W.copy(f.matrixWorld.getPosition()), W.applyProjection(aa), e.z = W.z), G.objects.push(e));
					Lb(f)
				}
			}
		};
		Lb(g);
		!0 === m && G.objects.sort(c);
		g = 0;
		for (m = G.objects.length; g < m; g++)
			if (pa = G.objects[g].object, ba = pa.matrixWorld, k = 0, pa instanceof THREE.Mesh)
			{
				gb = pa.geometry;
				Ra = gb.vertices;
				hb = gb.faces;
				gb = gb.faceVertexUvs;
				J.getInverse(ba);
				J.transpose();
				yb = pa.material instanceof THREE.MeshFaceMaterial;
				Cb = !0 === yb ? pa.material : null;
				wa = 0;
				for (Ta = Ra.length; wa < Ta; wa++) h = b(), h.positionWorld.copy(Ra[wa])
					.applyMatrix4(ba),
					h.positionScreen.copy(h.positionWorld)
					.applyMatrix4(aa), h.positionScreen.x /= h.positionScreen.w, h.positionScreen.y /= h.positionScreen.w, h.positionScreen.z /= h.positionScreen.w, h.visible = !(-1 > h.positionScreen.x || 1 < h.positionScreen.x || -1 > h.positionScreen.y || 1 < h.positionScreen.y || -1 > h.positionScreen.z || 1 < h.positionScreen.z);
				Ra = 0;
				for (wa = hb.length; Ra < wa; Ra++)
				{
					Ta = hb[Ra];
					var Ua = !0 === yb ? Cb.materials[Ta.materialIndex] : pa.material;
					if (void 0 !== Ua)
					{
						ga = Ua.side;
						if (Ta instanceof THREE.Face3)
							if (ia = l[Ta.a], ra = l[Ta.b],
								Z = l[Ta.c], K[0] = ia.positionScreen, K[1] = ra.positionScreen, K[2] = Z.positionScreen, !0 === ia.visible || !0 === ra.visible || !0 === Z.visible || X.isIntersectionBox(B.setFromPoints(K)))
								if (ma = 0 > (Z.positionScreen.x - ia.positionScreen.x) * (ra.positionScreen.y - ia.positionScreen.y) - (Z.positionScreen.y - ia.positionScreen.y) * (ra.positionScreen.x - ia.positionScreen.x), ga === THREE.DoubleSide || ma === (ga === THREE.FrontSide)) r === q ? (Ea = new THREE.RenderableFace3, p.push(Ea), q++, r++, n = Ea) : n = p[r++], n.v1.copy(ia), n.v2.copy(ra), n.v3.copy(Z);
								else continue;
						else continue;
						else if (Ta instanceof THREE.Face4)
							if (ia = l[Ta.a], ra = l[Ta.b], Z = l[Ta.c], Ea = l[Ta.d], L[0] = ia.positionScreen, L[1] = ra.positionScreen, L[2] = Z.positionScreen, L[3] = Ea.positionScreen, !0 === ia.visible || !0 === ra.visible || !0 === Z.visible || !0 === Ea.visible || X.isIntersectionBox(B.setFromPoints(L)))
								if (ma = 0 > (Ea.positionScreen.x - ia.positionScreen.x) * (ra.positionScreen.y - ia.positionScreen.y) - (Ea.positionScreen.y - ia.positionScreen.y) * (ra.positionScreen.x - ia.positionScreen.x) || 0 > (ra.positionScreen.x -
									Z.positionScreen.x) * (Ea.positionScreen.y - Z.positionScreen.y) - (ra.positionScreen.y - Z.positionScreen.y) * (Ea.positionScreen.x - Z.positionScreen.x), ga === THREE.DoubleSide || ma === (ga === THREE.FrontSide))
								{
									if (s === x)
									{
										var na = new THREE.RenderableFace4;
										t.push(na);
										x++;
										s++;
										n = na
									}
									else n = t[s++];
									n.v1.copy(ia);
									n.v2.copy(ra);
									n.v3.copy(Z);
									n.v4.copy(Ea)
								}
						else continue;
						else continue;
						n.normalModel.copy(Ta.normal);
						!1 === ma && (ga === THREE.BackSide || ga === THREE.DoubleSide) && n.normalModel.negate();
						n.normalModel.applyMatrix3(J)
							.normalize();
						n.normalModelView.copy(n.normalModel)
							.applyMatrix3(ha);
						n.centroidModel.copy(Ta.centroid)
							.applyMatrix4(ba);
						Z = Ta.vertexNormals;
						ia = 0;
						for (ra = Z.length; ia < ra; ia++) Ea = n.vertexNormalsModel[ia], Ea.copy(Z[ia]), !1 === ma && (ga === THREE.BackSide || ga === THREE.DoubleSide) && Ea.negate(), Ea.applyMatrix3(J)
							.normalize(), n.vertexNormalsModelView[ia].copy(Ea)
							.applyMatrix3(ha);
						n.vertexNormalsLength = Z.length;
						ia = 0;
						for (ra = gb.length; ia < ra; ia++)
							if (Ea = gb[ia][Ra], void 0 !== Ea)
							{
								ga = 0;
								for (Z = Ea.length; ga < Z; ga++) n.uvs[ia][ga] = Ea[ga]
							} n.color =
							Ta.color;
						n.material = Ua;
						ua.copy(n.centroidModel)
							.applyProjection(aa);
						n.z = ua.z;
						G.elements.push(n)
					}
				}
			}
		else if (pa instanceof THREE.Line)
		{
			xa.multiplyMatrices(aa, ba);
			Ra = pa.geometry.vertices;
			ia = b();
			ia.positionScreen.copy(Ra[0])
				.applyMatrix4(xa);
			hb = pa.type === THREE.LinePieces ? 2 : 1;
			wa = 1;
			for (Ta = Ra.length; wa < Ta; wa++) ia = b(), ia.positionScreen.copy(Ra[wa])
				.applyMatrix4(xa), 0 < (wa + 1) % hb || (ra = l[k - 2], M.copy(ia.positionScreen), fa.copy(ra.positionScreen), !0 === d(M, fa) && (M.multiplyScalar(1 / M.w), fa.multiplyScalar(1 / fa.w),
					v === H ? (gb = new THREE.RenderableLine, I.push(gb), H++, v++, z = gb) : z = I[v++], z.v1.positionScreen.copy(M), z.v2.positionScreen.copy(fa), z.z = Math.max(M.z, fa.z), z.material = pa.material, G.elements.push(z)))
		}
		g = 0;
		for (m = G.sprites.length; g < m; g++) pa = G.sprites[g].object, ba = pa.matrixWorld, pa instanceof THREE.Particle && (A.set(ba.elements[12], ba.elements[13], ba.elements[14], 1), A.applyMatrix4(aa), A.z /= A.w, 0 < A.z && 1 > A.z && (y === E ? (ma = new THREE.RenderableParticle, F.push(ma), E++, y++, D = ma) : D = F[y++], D.object = pa, D.x = A.x / A.w, D.y =
			A.y / A.w, D.z = A.z, D.rotation = pa.rotation.z, D.scale.x = pa.scale.x * Math.abs(D.x - (A.x + i.projectionMatrix.elements[0]) / (A.w + i.projectionMatrix.elements[12])), D.scale.y = pa.scale.y * Math.abs(D.y - (A.y + i.projectionMatrix.elements[5]) / (A.w + i.projectionMatrix.elements[13])), D.material = pa.material, G.elements.push(D)));
		!0 === Ja && G.elements.sort(c);
		return G
	}
};
THREE.Face3 = function(a, b, c, d, e, f)
{
	this.a = a;
	this.b = b;
	this.c = c;
	this.normal = d instanceof THREE.Vector3 ? d : new THREE.Vector3;
	this.vertexNormals = d instanceof Array ? d : [];
	this.color = e instanceof THREE.Color ? e : new THREE.Color;
	this.vertexColors = e instanceof Array ? e : [];
	this.vertexTangents = [];
	this.materialIndex = void 0 !== f ? f : 0;
	this.centroid = new THREE.Vector3
};
THREE.Face3.prototype = {
	constructor: THREE.Face3,
	clone: function()
	{
		var a = new THREE.Face3(this.a, this.b, this.c);
		a.normal.copy(this.normal);
		a.color.copy(this.color);
		a.centroid.copy(this.centroid);
		a.materialIndex = this.materialIndex;
		var b, c;
		b = 0;
		for (c = this.vertexNormals.length; b < c; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
		b = 0;
		for (c = this.vertexColors.length; b < c; b++) a.vertexColors[b] = this.vertexColors[b].clone();
		b = 0;
		for (c = this.vertexTangents.length; b < c; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
		return a
	}
};
THREE.Face4 = function(a, b, c, d, e, f, g)
{
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.normal = e instanceof THREE.Vector3 ? e : new THREE.Vector3;
	this.vertexNormals = e instanceof Array ? e : [];
	this.color = f instanceof THREE.Color ? f : new THREE.Color;
	this.vertexColors = f instanceof Array ? f : [];
	this.vertexTangents = [];
	this.materialIndex = void 0 !== g ? g : 0;
	this.centroid = new THREE.Vector3
};
THREE.Face4.prototype = {
	constructor: THREE.Face4,
	clone: function()
	{
		var a = new THREE.Face4(this.a, this.b, this.c, this.d);
		a.normal.copy(this.normal);
		a.color.copy(this.color);
		a.centroid.copy(this.centroid);
		a.materialIndex = this.materialIndex;
		var b, c;
		b = 0;
		for (c = this.vertexNormals.length; b < c; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
		b = 0;
		for (c = this.vertexColors.length; b < c; b++) a.vertexColors[b] = this.vertexColors[b].clone();
		b = 0;
		for (c = this.vertexTangents.length; b < c; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
		return a
	}
};
THREE.Geometry = function()
{
	THREE.EventDispatcher.call(this);
	this.id = THREE.GeometryIdCount++;
	this.name = "";
	this.vertices = [];
	this.colors = [];
	this.normals = [];
	this.faces = [];
	this.faceUvs = [
		[]
	];
	this.faceVertexUvs = [
		[]
	];
	this.morphTargets = [];
	this.morphColors = [];
	this.morphNormals = [];
	this.skinWeights = [];
	this.skinIndices = [];
	this.lineDistances = [];
	this.boundingSphere = this.boundingBox = null;
	this.hasTangents = !1;
	this.dynamic = !0;
	this.buffersNeedUpdate = this.lineDistancesNeedUpdate = this.colorsNeedUpdate = this.tangentsNeedUpdate =
		this.normalsNeedUpdate = this.uvsNeedUpdate = this.elementsNeedUpdate = this.verticesNeedUpdate = !1
};
THREE.Geometry.prototype = {
	constructor: THREE.Geometry,
	applyMatrix: function(a)
	{
		for (var b = (new THREE.Matrix3)
			.getInverse(a)
			.transpose(), c = 0, d = this.vertices.length; c < d; c++) this.vertices[c].applyMatrix4(a);
		c = 0;
		for (d = this.faces.length; c < d; c++)
		{
			var e = this.faces[c];
			e.normal.applyMatrix3(b)
				.normalize();
			for (var f = 0, g = e.vertexNormals.length; f < g; f++) e.vertexNormals[f].applyMatrix3(b)
				.normalize();
			e.centroid.applyMatrix4(a)
		}
	},
	computeCentroids: function()
	{
		var a, b, c;
		a = 0;
		for (b = this.faces.length; a < b; a++) c = this.faces[a],
			c.centroid.set(0, 0, 0), c instanceof THREE.Face3 ? (c.centroid.add(this.vertices[c.a]), c.centroid.add(this.vertices[c.b]), c.centroid.add(this.vertices[c.c]), c.centroid.divideScalar(3)) : c instanceof THREE.Face4 && (c.centroid.add(this.vertices[c.a]), c.centroid.add(this.vertices[c.b]), c.centroid.add(this.vertices[c.c]), c.centroid.add(this.vertices[c.d]), c.centroid.divideScalar(4))
	},
	computeFaceNormals: function()
	{
		var a, b, c, d, e, f, g = new THREE.Vector3,
			i = new THREE.Vector3;
		a = 0;
		for (b = this.faces.length; a < b; a++) c =
			this.faces[a], d = this.vertices[c.a], e = this.vertices[c.b], f = this.vertices[c.c], g.subVectors(f, e), i.subVectors(d, e), g.cross(i), g.normalize(), c.normal.copy(g)
	},
	computeVertexNormals: function(a)
	{
		var b, c, d, e;
		if (void 0 === this.__tmpVertices)
		{
			e = this.__tmpVertices = Array(this.vertices.length);
			b = 0;
			for (c = this.vertices.length; b < c; b++) e[b] = new THREE.Vector3;
			b = 0;
			for (c = this.faces.length; b < c; b++) d = this.faces[b], d instanceof THREE.Face3 ? d.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3] : d instanceof
			THREE.Face4 && (d.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3])
		}
		else
		{
			e = this.__tmpVertices;
			b = 0;
			for (c = this.vertices.length; b < c; b++) e[b].set(0, 0, 0)
		}
		if (a)
		{
			var f, g, i, h = new THREE.Vector3,
				k = new THREE.Vector3,
				l = new THREE.Vector3,
				m = new THREE.Vector3,
				n = new THREE.Vector3;
			b = 0;
			for (c = this.faces.length; b < c; b++) d = this.faces[b], d instanceof THREE.Face3 ? (a = this.vertices[d.a], f = this.vertices[d.b], g = this.vertices[d.c], h.subVectors(g, f), k.subVectors(a, f), h.cross(k), e[d.a].add(h),
				e[d.b].add(h), e[d.c].add(h)) : d instanceof THREE.Face4 && (a = this.vertices[d.a], f = this.vertices[d.b], g = this.vertices[d.c], i = this.vertices[d.d], l.subVectors(i, f), k.subVectors(a, f), l.cross(k), e[d.a].add(l), e[d.b].add(l), e[d.d].add(l), m.subVectors(i, g), n.subVectors(f, g), m.cross(n), e[d.b].add(m), e[d.c].add(m), e[d.d].add(m))
		}
		else
		{
			b = 0;
			for (c = this.faces.length; b < c; b++) d = this.faces[b], d instanceof THREE.Face3 ? (e[d.a].add(d.normal), e[d.b].add(d.normal), e[d.c].add(d.normal)) : d instanceof THREE.Face4 && (e[d.a].add(d.normal),
				e[d.b].add(d.normal), e[d.c].add(d.normal), e[d.d].add(d.normal))
		}
		b = 0;
		for (c = this.vertices.length; b < c; b++) e[b].normalize();
		b = 0;
		for (c = this.faces.length; b < c; b++) d = this.faces[b], d instanceof THREE.Face3 ? (d.vertexNormals[0].copy(e[d.a]), d.vertexNormals[1].copy(e[d.b]), d.vertexNormals[2].copy(e[d.c])) : d instanceof THREE.Face4 && (d.vertexNormals[0].copy(e[d.a]), d.vertexNormals[1].copy(e[d.b]), d.vertexNormals[2].copy(e[d.c]), d.vertexNormals[3].copy(e[d.d]))
	},
	computeMorphNormals: function()
	{
		var a, b, c, d, e;
		c = 0;
		for (d = this.faces.length; c < d; c++)
		{
			e = this.faces[c];
			e.__originalFaceNormal ? e.__originalFaceNormal.copy(e.normal) : e.__originalFaceNormal = e.normal.clone();
			e.__originalVertexNormals || (e.__originalVertexNormals = []);
			a = 0;
			for (b = e.vertexNormals.length; a < b; a++) e.__originalVertexNormals[a] ? e.__originalVertexNormals[a].copy(e.vertexNormals[a]) : e.__originalVertexNormals[a] = e.vertexNormals[a].clone()
		}
		var f = new THREE.Geometry;
		f.faces = this.faces;
		a = 0;
		for (b = this.morphTargets.length; a < b; a++)
		{
			if (!this.morphNormals[a])
			{
				this.morphNormals[a] = {};
				this.morphNormals[a].faceNormals = [];
				this.morphNormals[a].vertexNormals = [];
				var g = this.morphNormals[a].faceNormals,
					i = this.morphNormals[a].vertexNormals,
					h, k;
				c = 0;
				for (d = this.faces.length; c < d; c++) e = this.faces[c], h = new THREE.Vector3, k = e instanceof THREE.Face3 ?
				{
					a: new THREE.Vector3,
					b: new THREE.Vector3,
					c: new THREE.Vector3
				} :
				{
					a: new THREE.Vector3,
					b: new THREE.Vector3,
					c: new THREE.Vector3,
					d: new THREE.Vector3
				}, g.push(h), i.push(k)
			}
			g = this.morphNormals[a];
			f.vertices = this.morphTargets[a].vertices;
			f.computeFaceNormals();
			f.computeVertexNormals();
			c = 0;
			for (d = this.faces.length; c < d; c++) e = this.faces[c], h = g.faceNormals[c], k = g.vertexNormals[c], h.copy(e.normal), e instanceof THREE.Face3 ? (k.a.copy(e.vertexNormals[0]), k.b.copy(e.vertexNormals[1]), k.c.copy(e.vertexNormals[2])) : (k.a.copy(e.vertexNormals[0]), k.b.copy(e.vertexNormals[1]), k.c.copy(e.vertexNormals[2]), k.d.copy(e.vertexNormals[3]))
		}
		c = 0;
		for (d = this.faces.length; c < d; c++) e = this.faces[c], e.normal = e.__originalFaceNormal, e.vertexNormals = e.__originalVertexNormals
	},
	computeTangents: function()
	{
		function a(a,
			b, c, d, e, f, y)
		{
			i = a.vertices[b];
			h = a.vertices[c];
			k = a.vertices[d];
			l = g[e];
			m = g[f];
			n = g[y];
			r = h.x - i.x;
			p = k.x - i.x;
			q = h.y - i.y;
			s = k.y - i.y;
			t = h.z - i.z;
			x = k.z - i.z;
			z = m.x - l.x;
			v = n.x - l.x;
			I = m.y - l.y;
			H = n.y - l.y;
			D = 1 / (z * H - v * I);
			G.set((H * r - I * p) * D, (H * q - I * s) * D, (H * t - I * x) * D);
			W.set((z * p - v * r) * D, (z * s - v * q) * D, (z * x - v * t) * D);
			F[b].add(G);
			F[c].add(G);
			F[d].add(G);
			E[b].add(W);
			E[c].add(W);
			E[d].add(W)
		}
		var b, c, d, e, f, g, i, h, k, l, m, n, r, p, q, s, t, x, z, v, I, H, D, y, F = [],
			E = [],
			G = new THREE.Vector3,
			W = new THREE.Vector3,
			A = new THREE.Vector3,
			X = new THREE.Vector3,
			B = new THREE.Vector3;
		b = 0;
		for (c = this.vertices.length; b < c; b++) F[b] = new THREE.Vector3, E[b] = new THREE.Vector3;
		b = 0;
		for (c = this.faces.length; b < c; b++) f = this.faces[b], g = this.faceVertexUvs[0][b], f instanceof THREE.Face3 ? a(this, f.a, f.b, f.c, 0, 1, 2) : f instanceof THREE.Face4 && (a(this, f.a, f.b, f.d, 0, 1, 3), a(this, f.b, f.c, f.d, 1, 2, 3));
		var K = ["a", "b", "c", "d"];
		b = 0;
		for (c = this.faces.length; b < c; b++)
		{
			f = this.faces[b];
			for (d = 0; d < f.vertexNormals.length; d++) B.copy(f.vertexNormals[d]), e = f[K[d]], y = F[e], A.copy(y), A.sub(B.multiplyScalar(B.dot(y)))
				.normalize(),
				X.crossVectors(f.vertexNormals[d], y), e = X.dot(E[e]), e = 0 > e ? -1 : 1, f.vertexTangents[d] = new THREE.Vector4(A.x, A.y, A.z, e)
		}
		this.hasTangents = !0
	},
	computeLineDistances: function()
	{
		for (var a = 0, b = this.vertices, c = 0, d = b.length; c < d; c++) 0 < c && (a += b[c].distanceTo(b[c - 1])), this.lineDistances[c] = a
	},
	computeBoundingBox: function()
	{
		null === this.boundingBox && (this.boundingBox = new THREE.Box3);
		this.boundingBox.setFromPoints(this.vertices)
	},
	computeBoundingSphere: function()
	{
		null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere);
		this.boundingSphere.setFromCenterAndPoints(this.boundingSphere.center, this.vertices)
	},
	mergeVertices: function()
	{
		var a = {},
			b = [],
			c = [],
			d, e = Math.pow(10, 4),
			f, g, i, h, k;
		this.__tmpVertices = void 0;
		f = 0;
		for (g = this.vertices.length; f < g; f++) d = this.vertices[f], d = [Math.round(d.x * e), Math.round(d.y * e), Math.round(d.z * e)].join("_"), void 0 === a[d] ? (a[d] = f, b.push(this.vertices[f]), c[f] = b.length - 1) : c[f] = c[a[d]];
		e = [];
		f = 0;
		for (g = this.faces.length; f < g; f++)
			if (a = this.faces[f], a instanceof THREE.Face3)
			{
				a.a = c[a.a];
				a.b = c[a.b];
				a.c = c[a.c];
				i = [a.a, a.b, a.c];
				d = -1;
				for (h = 0; 3 > h; h++)
					if (i[h] == i[(h + 1) % 3])
					{
						e.push(f);
						break
					}
			}
		else if (a instanceof THREE.Face4)
		{
			a.a = c[a.a];
			a.b = c[a.b];
			a.c = c[a.c];
			a.d = c[a.d];
			i = [a.a, a.b, a.c, a.d];
			d = -1;
			for (h = 0; 4 > h; h++) i[h] == i[(h + 1) % 4] && (0 <= d && e.push(f), d = h);
			if (0 <= d)
			{
				i.splice(d, 1);
				var l = new THREE.Face3(i[0], i[1], i[2], a.normal, a.color, a.materialIndex);
				i = 0;
				for (h = this.faceVertexUvs.length; i < h; i++)(k = this.faceVertexUvs[i][f]) && k.splice(d, 1);
				a.vertexNormals && 0 < a.vertexNormals.length && (l.vertexNormals = a.vertexNormals, l.vertexNormals.splice(d,
					1));
				a.vertexColors && 0 < a.vertexColors.length && (l.vertexColors = a.vertexColors, l.vertexColors.splice(d, 1));
				this.faces[f] = l
			}
		}
		for (f = e.length - 1; 0 <= f; f--)
		{
			this.faces.splice(f, 1);
			i = 0;
			for (h = this.faceVertexUvs.length; i < h; i++) this.faceVertexUvs[i].splice(f, 1)
		}
		c = this.vertices.length - b.length;
		this.vertices = b;
		return c
	},
	clone: function()
	{
		for (var a = new THREE.Geometry, b = this.vertices, c = 0, d = b.length; c < d; c++) a.vertices.push(b[c].clone());
		b = this.faces;
		c = 0;
		for (d = b.length; c < d; c++) a.faces.push(b[c].clone());
		b = this.faceVertexUvs[0];
		c = 0;
		for (d = b.length; c < d; c++)
		{
			for (var e = b[c], f = [], g = 0, i = e.length; g < i; g++) f.push(new THREE.Vector2(e[g].x, e[g].y));
			a.faceVertexUvs[0].push(f)
		}
		return a
	},
	dispose: function()
	{
		this.dispatchEvent(
		{
			type: "dispose"
		})
	}
};
THREE.GeometryIdCount = 0;
THREE.BufferGeometry = function()
{
	THREE.EventDispatcher.call(this);
	this.id = THREE.GeometryIdCount++;
	this.attributes = {};
	this.dynamic = !1;
	this.offsets = [];
	this.boundingSphere = this.boundingBox = null;
	this.hasTangents = !1;
	this.morphTargets = []
};
THREE.BufferGeometry.prototype = {
	constructor: THREE.BufferGeometry,
	applyMatrix: function(a)
	{
		var b, c;
		this.attributes.position && (b = this.attributes.position.array);
		this.attributes.normal && (c = this.attributes.normal.array);
		void 0 !== b && (a.multiplyVector3Array(b), this.verticesNeedUpdate = !0);
		void 0 !== c && (b = new THREE.Matrix3, b.getInverse(a)
			.transpose(), b.multiplyVector3Array(c), this.normalizeNormals(), this.normalsNeedUpdate = !0)
	},
	computeBoundingBox: function()
	{
		null === this.boundingBox && (this.boundingBox = new THREE.Box3);
		var a = this.attributes.position.array;
		if (a)
		{
			var b = this.boundingBox,
				c, d, e;
			3 <= a.length && (b.min.x = b.max.x = a[0], b.min.y = b.max.y = a[1], b.min.z = b.max.z = a[2]);
			for (var f = 3, g = a.length; f < g; f += 3) c = a[f], d = a[f + 1], e = a[f + 2], c < b.min.x ? b.min.x = c : c > b.max.x && (b.max.x = c), d < b.min.y ? b.min.y = d : d > b.max.y && (b.max.y = d), e < b.min.z ? b.min.z = e : e > b.max.z && (b.max.z = e)
		}
		if (void 0 === a || 0 === a.length) this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0)
	},
	computeBoundingSphere: function()
	{
		null === this.boundingSphere && (this.boundingSphere =
			new THREE.Sphere);
		var a = this.attributes.position.array;
		if (a)
		{
			for (var b, c = 0, d, e, f = 0, g = a.length; f < g; f += 3) b = a[f], d = a[f + 1], e = a[f + 2], b = b * b + d * d + e * e, b > c && (c = b);
			this.boundingSphere.radius = Math.sqrt(c)
		}
	},
	computeVertexNormals: function()
	{
		if (this.attributes.position)
		{
			var a, b, c, d;
			a = this.attributes.position.array.length;
			if (void 0 === this.attributes.normal) this.attributes.normal = {
				itemSize: 3,
				array: new Float32Array(a),
				numItems: a
			};
			else
			{
				a = 0;
				for (b = this.attributes.normal.array.length; a < b; a++) this.attributes.normal.array[a] =
					0
			}
			var e = this.attributes.position.array,
				f = this.attributes.normal.array,
				g, i, h, k, l, m, n = new THREE.Vector3,
				r = new THREE.Vector3,
				p = new THREE.Vector3,
				q = new THREE.Vector3,
				s = new THREE.Vector3;
			if (this.attributes.index)
			{
				var t = this.attributes.index.array,
					x = this.offsets;
				c = 0;
				for (d = x.length; c < d; ++c)
				{
					b = x[c].start;
					g = x[c].count;
					var z = x[c].index;
					a = b;
					for (b += g; a < b; a += 3) g = z + t[a], i = z + t[a + 1], h = z + t[a + 2], k = e[3 * g], l = e[3 * g + 1], m = e[3 * g + 2], n.set(k, l, m), k = e[3 * i], l = e[3 * i + 1], m = e[3 * i + 2], r.set(k, l, m), k = e[3 * h], l = e[3 * h + 1], m = e[3 * h + 2], p.set(k,
						l, m), q.subVectors(p, r), s.subVectors(n, r), q.cross(s), f[3 * g] += q.x, f[3 * g + 1] += q.y, f[3 * g + 2] += q.z, f[3 * i] += q.x, f[3 * i + 1] += q.y, f[3 * i + 2] += q.z, f[3 * h] += q.x, f[3 * h + 1] += q.y, f[3 * h + 2] += q.z
				}
			}
			else
			{
				a = 0;
				for (b = e.length; a < b; a += 9) k = e[a], l = e[a + 1], m = e[a + 2], n.set(k, l, m), k = e[a + 3], l = e[a + 4], m = e[a + 5], r.set(k, l, m), k = e[a + 6], l = e[a + 7], m = e[a + 8], p.set(k, l, m), q.subVectors(p, r), s.subVectors(n, r), q.cross(s), f[a] = q.x, f[a + 1] = q.y, f[a + 2] = q.z, f[a + 3] = q.x, f[a + 4] = q.y, f[a + 5] = q.z, f[a + 6] = q.x, f[a + 7] = q.y, f[a + 8] = q.z
			}
			this.normalizeNormals();
			this.normalsNeedUpdate = !0
		}
	},
	normalizeNormals: function()
	{
		for (var a = this.attributes.normal.array, b, c, d, e = 0, f = a.length; e < f; e += 3) b = a[e], c = a[e + 1], d = a[e + 2], b = 1 / Math.sqrt(b * b + c * c + d * d), a[e] *= b, a[e + 1] *= b, a[e + 2] *= b
	},
	computeTangents: function()
	{
		function a(a)
		{
			ba.x = d[3 * a];
			ba.y = d[3 * a + 1];
			ba.z = d[3 * a + 2];
			xa.copy(ba);
			ha = h[a];
			U.copy(ha);
			U.sub(ba.multiplyScalar(ba.dot(ha)))
				.normalize();
			aa.crossVectors(xa, ha);
			ua = aa.dot(k[a]);
			J = 0 > ua ? -1 : 1;
			i[4 * a] = U.x;
			i[4 * a + 1] = U.y;
			i[4 * a + 2] = U.z;
			i[4 * a + 3] = J
		}
		if (void 0 === this.attributes.index || void 0 === this.attributes.position ||
			void 0 === this.attributes.normal || void 0 === this.attributes.uv) console.warn("Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");
		else
		{
			var b = this.attributes.index.array,
				c = this.attributes.position.array,
				d = this.attributes.normal.array,
				e = this.attributes.uv.array,
				f = c.length / 3;
			if (void 0 === this.attributes.tangent)
			{
				var g = 4 * f;
				this.attributes.tangent = {
					itemSize: 4,
					array: new Float32Array(g),
					numItems: g
				}
			}
			for (var i = this.attributes.tangent.array, h = [], k = [], g = 0; g < f; g++) h[g] =
				new THREE.Vector3, k[g] = new THREE.Vector3;
			var l, m, n, r, p, q, s, t, x, z, v, I, H, D, y, f = new THREE.Vector3,
				g = new THREE.Vector3,
				F, E, G, W, A, X, B, K = this.offsets;
			G = 0;
			for (W = K.length; G < W; ++G)
			{
				E = K[G].start;
				A = K[G].count;
				var L = K[G].index;
				F = E;
				for (E += A; F < E; F += 3) A = L + b[F], X = L + b[F + 1], B = L + b[F + 2], l = c[3 * A], m = c[3 * A + 1], n = c[3 * A + 2], r = c[3 * X], p = c[3 * X + 1], q = c[3 * X + 2], s = c[3 * B], t = c[3 * B + 1], x = c[3 * B + 2], z = e[2 * A], v = e[2 * A + 1], I = e[2 * X], H = e[2 * X + 1], D = e[2 * B], y = e[2 * B + 1], r -= l, l = s - l, p -= m, m = t - m, q -= n, n = x - n, I -= z, z = D - z, H -= v, v = y - v, y = 1 / (I * v - z * H), f.set((v * r -
					H * l) * y, (v * p - H * m) * y, (v * q - H * n) * y), g.set((I * l - z * r) * y, (I * m - z * p) * y, (I * n - z * q) * y), h[A].add(f), h[X].add(f), h[B].add(f), k[A].add(g), k[X].add(g), k[B].add(g)
			}
			var U = new THREE.Vector3,
				aa = new THREE.Vector3,
				ba = new THREE.Vector3,
				xa = new THREE.Vector3,
				J, ha, ua;
			G = 0;
			for (W = K.length; G < W; ++G)
			{
				E = K[G].start;
				A = K[G].count;
				L = K[G].index;
				F = E;
				for (E += A; F < E; F += 3) A = L + b[F], X = L + b[F + 1], B = L + b[F + 2], a(A), a(X), a(B)
			}
			this.tangentsNeedUpdate = this.hasTangents = !0
		}
	},
	dispose: function()
	{
		this.dispatchEvent(
		{
			type: "dispose"
		})
	}
};
THREE.Camera = function()
{
	THREE.Object3D.call(this);
	this.matrixWorldInverse = new THREE.Matrix4;
	this.projectionMatrix = new THREE.Matrix4;
	this.projectionMatrixInverse = new THREE.Matrix4
};
THREE.Camera.prototype = Object.create(THREE.Object3D.prototype);
THREE.Camera.prototype.lookAt = function(a)
{
	this.matrix.lookAt(this.position, a, this.up);
	!0 === this.rotationAutoUpdate && (!1 === this.useQuaternion ? this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder) : this.quaternion.copy(this.matrix.decompose()[1]))
};
THREE.OrthographicCamera = function(a, b, c, d, e, f)
{
	THREE.Camera.call(this);
	this.left = a;
	this.right = b;
	this.top = c;
	this.bottom = d;
	this.near = void 0 !== e ? e : 0.1;
	this.far = void 0 !== f ? f : 2E3;
	this.updateProjectionMatrix()
};
THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function()
{
	this.projectionMatrix.makeOrthographic(this.left, this.right, this.top, this.bottom, this.near, this.far)
};
THREE.PerspectiveCamera = function(a, b, c, d)
{
	THREE.Camera.call(this);
	this.fov = void 0 !== a ? a : 50;
	this.aspect = void 0 !== b ? b : 1;
	this.near = void 0 !== c ? c : 0.1;
	this.far = void 0 !== d ? d : 2E3;
	this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.PerspectiveCamera.prototype.setLens = function(a, b)
{
	void 0 === b && (b = 24);
	this.fov = 2 * THREE.Math.radToDeg(Math.atan(b / (2 * a)));
	this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.setViewOffset = function(a, b, c, d, e, f)
{
	this.fullWidth = a;
	this.fullHeight = b;
	this.x = c;
	this.y = d;
	this.width = e;
	this.height = f;
	this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function()
{
	if (this.fullWidth)
	{
		var a = this.fullWidth / this.fullHeight,
			b = Math.tan(THREE.Math.degToRad(0.5 * this.fov)) * this.near,
			c = -b,
			d = a * c,
			a = Math.abs(a * b - d),
			c = Math.abs(b - c);
		this.projectionMatrix.makeFrustum(d + this.x * a / this.fullWidth, d + (this.x + this.width) * a / this.fullWidth, b - (this.y + this.height) * c / this.fullHeight, b - this.y * c / this.fullHeight, this.near, this.far)
	}
	else this.projectionMatrix.makePerspective(this.fov, this.aspect, this.near, this.far)
};
THREE.Light = function(a)
{
	THREE.Object3D.call(this);
	this.color = new THREE.Color(a)
};
THREE.Light.prototype = Object.create(THREE.Object3D.prototype);
THREE.AmbientLight = function(a)
{
	THREE.Light.call(this, a)
};
THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype);
THREE.AreaLight = function(a, b)
{
	THREE.Light.call(this, a);
	this.normal = new THREE.Vector3(0, -1, 0);
	this.right = new THREE.Vector3(1, 0, 0);
	this.intensity = void 0 !== b ? b : 1;
	this.height = this.width = 1;
	this.constantAttenuation = 1.5;
	this.linearAttenuation = 0.5;
	this.quadraticAttenuation = 0.1
};
THREE.AreaLight.prototype = Object.create(THREE.Light.prototype);
THREE.DirectionalLight = function(a, b)
{
	THREE.Light.call(this, a);
	this.position = new THREE.Vector3(0, 1, 0);
	this.target = new THREE.Object3D;
	this.intensity = void 0 !== b ? b : 1;
	this.onlyShadow = this.castShadow = !1;
	this.shadowCameraNear = 50;
	this.shadowCameraFar = 5E3;
	this.shadowCameraLeft = -500;
	this.shadowCameraTop = this.shadowCameraRight = 500;
	this.shadowCameraBottom = -500;
	this.shadowCameraVisible = !1;
	this.shadowBias = 0;
	this.shadowDarkness = 0.5;
	this.shadowMapHeight = this.shadowMapWidth = 512;
	this.shadowCascade = !1;
	this.shadowCascadeOffset =
		new THREE.Vector3(0, 0, -1E3);
	this.shadowCascadeCount = 2;
	this.shadowCascadeBias = [0, 0, 0];
	this.shadowCascadeWidth = [512, 512, 512];
	this.shadowCascadeHeight = [512, 512, 512];
	this.shadowCascadeNearZ = [-1, 0.99, 0.998];
	this.shadowCascadeFarZ = [0.99, 0.998, 1];
	this.shadowCascadeArray = [];
	this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
};
THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype);
THREE.HemisphereLight = function(a, b, c)
{
	THREE.Light.call(this, a);
	this.groundColor = new THREE.Color(b);
	this.position = new THREE.Vector3(0, 100, 0);
	this.intensity = void 0 !== c ? c : 1
};
THREE.HemisphereLight.prototype = Object.create(THREE.Light.prototype);
THREE.PointLight = function(a, b, c)
{
	THREE.Light.call(this, a);
	this.position = new THREE.Vector3(0, 0, 0);
	this.intensity = void 0 !== b ? b : 1;
	this.distance = void 0 !== c ? c : 0
};
THREE.PointLight.prototype = Object.create(THREE.Light.prototype);
THREE.SpotLight = function(a, b, c, d, e)
{
	THREE.Light.call(this, a);
	this.position = new THREE.Vector3(0, 1, 0);
	this.target = new THREE.Object3D;
	this.intensity = void 0 !== b ? b : 1;
	this.distance = void 0 !== c ? c : 0;
	this.angle = void 0 !== d ? d : Math.PI / 2;
	this.exponent = void 0 !== e ? e : 10;
	this.onlyShadow = this.castShadow = !1;
	this.shadowCameraNear = 50;
	this.shadowCameraFar = 5E3;
	this.shadowCameraFov = 50;
	this.shadowCameraVisible = !1;
	this.shadowBias = 0;
	this.shadowDarkness = 0.5;
	this.shadowMapHeight = this.shadowMapWidth = 512;
	this.shadowMatrix = this.shadowCamera =
		this.shadowMapSize = this.shadowMap = null
};
THREE.SpotLight.prototype = Object.create(THREE.Light.prototype);
THREE.Loader = function(a)
{
	this.statusDomElement = (this.showStatus = a) ? THREE.Loader.prototype.addStatusElement() : null;
	this.onLoadStart = function() {};
	this.onLoadProgress = function() {};
	this.onLoadComplete = function() {}
};
THREE.Loader.prototype = {
	constructor: THREE.Loader,
	crossOrigin: "anonymous",
	addStatusElement: function()
	{
		var a = document.createElement("div");
		a.style.position = "absolute";
		a.style.right = "0px";
		a.style.top = "0px";
		a.style.fontSize = "0.8em";
		a.style.textAlign = "left";
		a.style.background = "rgba(0,0,0,0.25)";
		a.style.color = "#fff";
		a.style.width = "120px";
		a.style.padding = "0.5em 0.5em 0.5em 0.5em";
		a.style.zIndex = 1E3;
		a.innerHTML = "Loading ...";
		return a
	},
	updateProgress: function(a)
	{
		var b = "Loaded ",
			b = a.total ? b + ((100 * a.loaded /
					a.total)
				.toFixed(0) + "%") : b + ((a.loaded / 1E3)
				.toFixed(2) + " KB");
		this.statusDomElement.innerHTML = b
	},
	extractUrlBase: function(a)
	{
		a = a.split("/");
		a.pop();
		return (1 > a.length ? "." : a.join("/")) + "/"
	},
	initMaterials: function(a, b)
	{
		for (var c = [], d = 0; d < a.length; ++d) c[d] = THREE.Loader.prototype.createMaterial(a[d], b);
		return c
	},
	needsTangents: function(a)
	{
		for (var b = 0, c = a.length; b < c; b++)
			if (a[b] instanceof THREE.ShaderMaterial) return !0;
		return !1
	},
	createMaterial: function(a, b)
	{
		function c(a)
		{
			a = Math.log(a) / Math.LN2;
			return Math.floor(a) ==
				a
		}

		function d(a)
		{
			a = Math.log(a) / Math.LN2;
			return Math.pow(2, Math.round(a))
		}

		function e(a, e, f, i, h, k, s)
		{
			var t = f.toLowerCase()
				.endsWith(".dds"),
				x = b + "/" + f;
			if (t)
			{
				var z = THREE.ImageUtils.loadCompressedTexture(x);
				a[e] = z
			}
			else z = document.createElement("canvas"), a[e] = new THREE.Texture(z);
			a[e].sourceFile = f;
			i && (a[e].repeat.set(i[0], i[1]), 1 !== i[0] && (a[e].wrapS = THREE.RepeatWrapping), 1 !== i[1] && (a[e].wrapT = THREE.RepeatWrapping));
			h && a[e].offset.set(h[0], h[1]);
			k && (f = {
					repeat: THREE.RepeatWrapping,
					mirror: THREE.MirroredRepeatWrapping
				},
				void 0 !== f[k[0]] && (a[e].wrapS = f[k[0]]), void 0 !== f[k[1]] && (a[e].wrapT = f[k[1]]));
			s && (a[e].anisotropy = s);
			if (!t)
			{
				var v = a[e],
					a = new Image;
				a.onload = function()
				{
					if (!c(this.width) || !c(this.height))
					{
						var a = d(this.width),
							b = d(this.height);
						v.image.width = a;
						v.image.height = b;
						v.image.getContext("2d")
							.drawImage(this, 0, 0, a, b)
					}
					else v.image = this;
					v.needsUpdate = !0
				};
				a.crossOrigin = g.crossOrigin;
				a.src = x
			}
		}

		function f(a)
		{
			return (255 * a[0] << 16) + (255 * a[1] << 8) + 255 * a[2]
		}
		var g = this,
			i = "MeshLambertMaterial",
			h = {
				color: 15658734,
				opacity: 1,
				map: null,
				lightMap: null,
				normalMap: null,
				bumpMap: null,
				wireframe: !1
			};
		if (a.shading)
		{
			var k = a.shading.toLowerCase();
			"phong" === k ? i = "MeshPhongMaterial" : "basic" === k && (i = "MeshBasicMaterial")
		}
		void 0 !== a.blending && void 0 !== THREE[a.blending] && (h.blending = THREE[a.blending]);
		if (void 0 !== a.transparent || 1 > a.opacity) h.transparent = a.transparent;
		void 0 !== a.depthTest && (h.depthTest = a.depthTest);
		void 0 !== a.depthWrite && (h.depthWrite = a.depthWrite);
		void 0 !== a.visible && (h.visible = a.visible);
		void 0 !== a.flipSided && (h.side = THREE.BackSide);
		void 0 !== a.doubleSided && (h.side = THREE.DoubleSide);
		void 0 !== a.wireframe && (h.wireframe = a.wireframe);
		void 0 !== a.vertexColors && ("face" === a.vertexColors ? h.vertexColors = THREE.FaceColors : a.vertexColors && (h.vertexColors = THREE.VertexColors));
		a.colorDiffuse ? h.color = f(a.colorDiffuse) : a.DbgColor && (h.color = a.DbgColor);
		a.colorSpecular && (h.specular = f(a.colorSpecular));
		a.colorAmbient && (h.ambient = f(a.colorAmbient));
		a.transparency && (h.opacity = a.transparency);
		a.specularCoef && (h.shininess = a.specularCoef);
		a.mapDiffuse &&
			b && e(h, "map", a.mapDiffuse, a.mapDiffuseRepeat, a.mapDiffuseOffset, a.mapDiffuseWrap, a.mapDiffuseAnisotropy);
		a.mapLight && b && e(h, "lightMap", a.mapLight, a.mapLightRepeat, a.mapLightOffset, a.mapLightWrap, a.mapLightAnisotropy);
		a.mapBump && b && e(h, "bumpMap", a.mapBump, a.mapBumpRepeat, a.mapBumpOffset, a.mapBumpWrap, a.mapBumpAnisotropy);
		a.mapNormal && b && e(h, "normalMap", a.mapNormal, a.mapNormalRepeat, a.mapNormalOffset, a.mapNormalWrap, a.mapNormalAnisotropy);
		a.mapSpecular && b && e(h, "specularMap", a.mapSpecular, a.mapSpecularRepeat,
			a.mapSpecularOffset, a.mapSpecularWrap, a.mapSpecularAnisotropy);
		a.mapBumpScale && (h.bumpScale = a.mapBumpScale);
		a.mapNormal ? (i = THREE.ShaderLib.normalmap, k = THREE.UniformsUtils.clone(i.uniforms), k.tNormal.value = h.normalMap, a.mapNormalFactor && k.uNormalScale.value.set(a.mapNormalFactor, a.mapNormalFactor), h.map && (k.tDiffuse.value = h.map, k.enableDiffuse.value = !0), h.specularMap && (k.tSpecular.value = h.specularMap, k.enableSpecular.value = !0), h.lightMap && (k.tAO.value = h.lightMap, k.enableAO.value = !0), k.uDiffuseColor.value.setHex(h.color),
			k.uSpecularColor.value.setHex(h.specular), k.uAmbientColor.value.setHex(h.ambient), k.uShininess.value = h.shininess, void 0 !== h.opacity && (k.uOpacity.value = h.opacity), i = new THREE.ShaderMaterial(
			{
				fragmentShader: i.fragmentShader,
				vertexShader: i.vertexShader,
				uniforms: k,
				lights: !0,
				fog: !0
			}), h.transparent && (i.transparent = !0)) : i = new THREE[i](h);
		void 0 !== a.DbgName && (i.name = a.DbgName);
		return i
	}
};
THREE.ImageLoader = function()
{
	THREE.EventDispatcher.call(this);
	this.crossOrigin = null
};
THREE.ImageLoader.prototype = {
	constructor: THREE.ImageLoader,
	load: function(a, b)
	{
		var c = this;
		void 0 === b && (b = new Image);
		b.addEventListener("load", function()
		{
			c.dispatchEvent(
			{
				type: "load",
				content: b
			})
		}, !1);
		b.addEventListener("error", function()
		{
			c.dispatchEvent(
			{
				type: "error",
				message: "Couldn't load URL [" + a + "]"
			})
		}, !1);
		c.crossOrigin && (b.crossOrigin = c.crossOrigin);
		b.src = a
	}
};
THREE.JSONLoader = function(a)
{
	THREE.Loader.call(this, a);
	this.withCredentials = !1
};
THREE.JSONLoader.prototype = Object.create(THREE.Loader.prototype);
THREE.JSONLoader.prototype.load = function(a, b, c)
{
	c = c && "string" === typeof c ? c : this.extractUrlBase(a);
	this.onLoadStart();
	this.loadAjaxJSON(this, a, b, c)
};
THREE.JSONLoader.prototype.loadAjaxJSON = function(a, b, c, d, e)
{
	var f = new XMLHttpRequest,
		g = 0;
	f.onreadystatechange = function()
	{
		if (f.readyState === f.DONE)
			if (200 === f.status || 0 === f.status)
			{
				if (f.responseText)
				{
					var i = JSON.parse(f.responseText);
					a.createModel(i, c, d)
				}
				else console.warn("THREE.JSONLoader: [" + b + "] seems to be unreachable or file there is empty");
				a.onLoadComplete()
			}
		else console.error("THREE.JSONLoader: Couldn't load [" + b + "] [" + f.status + "]");
		else f.readyState === f.LOADING ? e && (0 === g && (g = f.getResponseHeader("Content-Length")),
			e(
			{
				total: g,
				loaded: f.responseText.length
			})) : f.readyState === f.HEADERS_RECEIVED && (g = f.getResponseHeader("Content-Length"))
	};
	f.open("GET", b, !0);
	f.withCredentials = this.withCredentials;
	f.send(null)
};
THREE.JSONLoader.prototype.createModel = function(a, b, c)
{
	var d = new THREE.Geometry,
		e = void 0 !== a.scale ? 1 / a.scale : 1,
		f, g, i, h, k, l, m, n, r, p, q, s, t, x, z, v = a.faces;
	p = a.vertices;
	var I = a.normals,
		H = a.colors,
		D = 0;
	for (f = 0; f < a.uvs.length; f++) a.uvs[f].length && D++;
	for (f = 0; f < D; f++) d.faceUvs[f] = [], d.faceVertexUvs[f] = [];
	h = 0;
	for (k = p.length; h < k;) l = new THREE.Vector3, l.x = p[h++] * e, l.y = p[h++] * e, l.z = p[h++] * e, d.vertices.push(l);
	h = 0;
	for (k = v.length; h < k;)
	{
		p = v[h++];
		l = p & 1;
		i = p & 2;
		f = p & 4;
		g = p & 8;
		n = p & 16;
		m = p & 32;
		q = p & 64;
		p &= 128;
		l ? (s = new THREE.Face4,
			s.a = v[h++], s.b = v[h++], s.c = v[h++], s.d = v[h++], l = 4) : (s = new THREE.Face3, s.a = v[h++], s.b = v[h++], s.c = v[h++], l = 3);
		i && (i = v[h++], s.materialIndex = i);
		i = d.faces.length;
		if (f)
			for (f = 0; f < D; f++) t = a.uvs[f], r = v[h++], z = t[2 * r], r = t[2 * r + 1], d.faceUvs[f][i] = new THREE.Vector2(z, r);
		if (g)
			for (f = 0; f < D; f++)
			{
				t = a.uvs[f];
				x = [];
				for (g = 0; g < l; g++) r = v[h++], z = t[2 * r], r = t[2 * r + 1], x[g] = new THREE.Vector2(z, r);
				d.faceVertexUvs[f][i] = x
			}
		n && (n = 3 * v[h++], g = new THREE.Vector3, g.x = I[n++], g.y = I[n++], g.z = I[n], s.normal = g);
		if (m)
			for (f = 0; f < l; f++) n = 3 * v[h++], g =
				new THREE.Vector3, g.x = I[n++], g.y = I[n++], g.z = I[n], s.vertexNormals.push(g);
		q && (m = v[h++], m = new THREE.Color(H[m]), s.color = m);
		if (p)
			for (f = 0; f < l; f++) m = v[h++], m = new THREE.Color(H[m]), s.vertexColors.push(m);
		d.faces.push(s)
	}
	if (a.skinWeights)
	{
		h = 0;
		for (k = a.skinWeights.length; h < k; h += 2) v = a.skinWeights[h], I = a.skinWeights[h + 1], d.skinWeights.push(new THREE.Vector4(v, I, 0, 0))
	}
	if (a.skinIndices)
	{
		h = 0;
		for (k = a.skinIndices.length; h < k; h += 2) v = a.skinIndices[h], I = a.skinIndices[h + 1], d.skinIndices.push(new THREE.Vector4(v, I, 0, 0))
	}
	d.bones =
		a.bones;
	d.animation = a.animation;
	if (void 0 !== a.morphTargets)
	{
		h = 0;
		for (k = a.morphTargets.length; h < k; h++)
		{
			d.morphTargets[h] = {};
			d.morphTargets[h].name = a.morphTargets[h].name;
			d.morphTargets[h].vertices = [];
			H = d.morphTargets[h].vertices;
			D = a.morphTargets[h].vertices;
			v = 0;
			for (I = D.length; v < I; v += 3) p = new THREE.Vector3, p.x = D[v] * e, p.y = D[v + 1] * e, p.z = D[v + 2] * e, H.push(p)
		}
	}
	if (void 0 !== a.morphColors)
	{
		h = 0;
		for (k = a.morphColors.length; h < k; h++)
		{
			d.morphColors[h] = {};
			d.morphColors[h].name = a.morphColors[h].name;
			d.morphColors[h].colors = [];
			I = d.morphColors[h].colors;
			H = a.morphColors[h].colors;
			e = 0;
			for (v = H.length; e < v; e += 3) D = new THREE.Color(16755200), D.setRGB(H[e], H[e + 1], H[e + 2]), I.push(D)
		}
	}
	d.computeCentroids();
	d.computeFaceNormals();
	a = this.initMaterials(a.materials, c);
	this.needsTangents(a) && d.computeTangents();
	b(d, a)
};
THREE.LoadingMonitor = function()
{
	THREE.EventDispatcher.call(this);
	var a = this,
		b = 0,
		c = 0,
		d = function()
		{
			b++;
			a.dispatchEvent(
			{
				type: "progress",
				loaded: b,
				total: c
			});
			b === c && a.dispatchEvent(
			{
				type: "load"
			})
		};
	this.add = function(a)
	{
		c++;
		a.addEventListener("load", d, !1)
	}
};
THREE.SceneLoader = function()
{
	this.onLoadStart = function() {};
	this.onLoadProgress = function() {};
	this.onLoadComplete = function() {};
	this.callbackSync = function() {};
	this.callbackProgress = function() {};
	this.geometryHandlerMap = {};
	this.hierarchyHandlerMap = {};
	this.addGeometryHandler("ascii", THREE.JSONLoader)
};
THREE.SceneLoader.prototype.constructor = THREE.SceneLoader;
THREE.SceneLoader.prototype.load = function(a, b)
{
	var c = this,
		d = new XMLHttpRequest;
	d.onreadystatechange = function()
	{
		if (4 === d.readyState)
			if (200 === d.status || 0 === d.status)
			{
				var e = JSON.parse(d.responseText);
				c.parse(e, b, a)
			}
		else console.error("THREE.SceneLoader: Couldn't load [" + a + "] [" + d.status + "]")
	};
	d.open("GET", a, !0);
	d.send(null)
};
THREE.SceneLoader.prototype.addGeometryHandler = function(a, b)
{
	this.geometryHandlerMap[a] = {
		loaderClass: b
	}
};
THREE.SceneLoader.prototype.addHierarchyHandler = function(a, b)
{
	this.hierarchyHandlerMap[a] = {
		loaderClass: b
	}
};
THREE.SceneLoader.prototype.parse = function(a, b, c)
{
	function d(a, b)
	{
		return "relativeToHTML" == b ? a : m + "/" + a
	}

	function e()
	{
		f(y.scene, E.objects)
	}

	function f(a, b)
	{
		var c, e, g, h, k, m, q;
		for (q in b)
			if (void 0 === y.objects[q])
			{
				var s = b[q],
					v = null;
				if (s.type && s.type in l.hierarchyHandlerMap)
				{
					if (void 0 === s.loading)
					{
						e = {
							type: 1,
							url: 1,
							material: 1,
							position: 1,
							rotation: 1,
							scale: 1,
							visible: 1,
							children: 1,
							properties: 1,
							skin: 1,
							morph: 1,
							mirroredLoop: 1,
							duration: 1
						};
						g = {};
						for (var A in s) A in e || (g[A] = s[A]);
						r = y.materials[s.material];
						s.loading = !0;
						e = l.hierarchyHandlerMap[s.type].loaderObject;
						e.options ? e.load(d(s.url, E.urlBaseType), i(q, a, r, s)) : e.load(d(s.url, E.urlBaseType), i(q, a, r, s), g)
					}
				}
				else if (void 0 !== s.geometry)
				{
					if (n = y.geometries[s.geometry])
					{
						v = !1;
						r = y.materials[s.material];
						v = r instanceof THREE.ShaderMaterial;
						g = s.position;
						h = s.rotation;
						k = s.scale;
						c = s.matrix;
						m = s.quaternion;
						s.material || (r = new THREE.MeshFaceMaterial(y.face_materials[s.geometry]));
						r instanceof THREE.MeshFaceMaterial && 0 === r.materials.length && (r = new THREE.MeshFaceMaterial(y.face_materials[s.geometry]));
						if (r instanceof THREE.MeshFaceMaterial)
							for (e = 0; e < r.materials.length; e++) v = v || r.materials[e] instanceof THREE.ShaderMaterial;
						v && n.computeTangents();
						s.skin ? v = new THREE.SkinnedMesh(n, r) : s.morph ? (v = new THREE.MorphAnimMesh(n, r), void 0 !== s.duration && (v.duration = s.duration), void 0 !== s.time && (v.time = s.time), void 0 !== s.mirroredLoop && (v.mirroredLoop = s.mirroredLoop), r.morphNormals && n.computeMorphNormals()) : v = new THREE.Mesh(n, r);
						v.name = q;
						c ? (v.matrixAutoUpdate = !1, v.matrix.set(c[0], c[1], c[2], c[3], c[4], c[5], c[6],
							c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15])) : (v.position.set(g[0], g[1], g[2]), m ? (v.quaternion.set(m[0], m[1], m[2], m[3]), v.useQuaternion = !0) : v.rotation.set(h[0], h[1], h[2]), v.scale.set(k[0], k[1], k[2]));
						v.visible = s.visible;
						v.castShadow = s.castShadow;
						v.receiveShadow = s.receiveShadow;
						a.add(v);
						y.objects[q] = v
					}
				}
				else "DirectionalLight" === s.type || "PointLight" === s.type || "AmbientLight" === s.type ? (x = void 0 !== s.color ? s.color : 16777215, z = void 0 !== s.intensity ? s.intensity : 1, "DirectionalLight" === s.type ? (g = s.direction,
					t = new THREE.DirectionalLight(x, z), t.position.set(g[0], g[1], g[2]), s.target && (F.push(
					{
						object: t,
						targetName: s.target
					}), t.target = null)) : "PointLight" === s.type ? (g = s.position, e = s.distance, t = new THREE.PointLight(x, z, e), t.position.set(g[0], g[1], g[2])) : "AmbientLight" === s.type && (t = new THREE.AmbientLight(x)), a.add(t), t.name = q, y.lights[q] = t, y.objects[q] = t) : "PerspectiveCamera" === s.type || "OrthographicCamera" === s.type ? ("PerspectiveCamera" === s.type ? p = new THREE.PerspectiveCamera(s.fov, s.aspect, s.near, s.far) : "OrthographicCamera" ===
					s.type && (p = new THREE.OrthographicCamera(s.left, s.right, s.top, s.bottom, s.near, s.far)), g = s.position, p.position.set(g[0], g[1], g[2]), a.add(p), p.name = q, y.cameras[q] = p, y.objects[q] = p) : (g = s.position, h = s.rotation, k = s.scale, m = s.quaternion, v = new THREE.Object3D, v.name = q, v.position.set(g[0], g[1], g[2]), m ? (v.quaternion.set(m[0], m[1], m[2], m[3]), v.useQuaternion = !0) : v.rotation.set(h[0], h[1], h[2]), v.scale.set(k[0], k[1], k[2]), v.visible = void 0 !== s.visible ? s.visible : !1, a.add(v), y.objects[q] = v, y.empties[q] = v);
				if (v)
				{
					if (void 0 !==
						s.properties)
						for (var D in s.properties) v.properties[D] = s.properties[D];
					if (void 0 !== s.groups)
						for (e = 0; e < s.groups.length; e++) g = s.groups[e], void 0 === y.groups[g] && (y.groups[g] = []), y.groups[g].push(q);
					void 0 !== s.children && f(v, s.children)
				}
			}
	}

	function g(a)
	{
		return function(b, c)
		{
			y.geometries[a] = b;
			y.face_materials[a] = c;
			e();
			v -= 1;
			l.onLoadComplete();
			k()
		}
	}

	function i(a, b, c, d)
	{
		return function(f)
		{
			var f = f.content ? f.content : f.dae ? f.scene : f,
				g = d.position,
				i = d.rotation,
				h = d.quaternion,
				n = d.scale;
			f.position.set(g[0], g[1], g[2]);
			h ? (f.quaternion.set(h[0], h[1], h[2], h[3]), f.useQuaternion = !0) : f.rotation.set(i[0], i[1], i[2]);
			f.scale.set(n[0], n[1], n[2]);
			c && f.traverse(function(a)
			{
				a.material = c
			});
			var m = void 0 !== d.visible ? d.visible : !0;
			f.traverse(function(a)
			{
				a.visible = m
			});
			b.add(f);
			f.name = a;
			y.objects[a] = f;
			e();
			v -= 1;
			l.onLoadComplete();
			k()
		}
	}

	function h(a)
	{
		return function(b, c)
		{
			y.geometries[a] = b;
			y.face_materials[a] = c
		}
	}

	function k()
	{
		l.callbackProgress(
		{
			totalModels: H,
			totalTextures: D,
			loadedModels: H - v,
			loadedTextures: D - I
		}, y);
		l.onLoadProgress();
		if (0 ===
			v && 0 === I)
		{
			for (var a = 0; a < F.length; a++)
			{
				var c = F[a],
					d = y.objects[c.targetName];
				d ? c.object.target = d : (c.object.target = new THREE.Object3D, y.scene.add(c.object.target));
				c.object.target.properties.targetInverse = c.object
			}
			b(y)
		}
	}
	var l = this,
		m = THREE.Loader.prototype.extractUrlBase(c),
		n, r, p, q, s, t, x, z, v, I, H, D, y, F = [],
		E = a,
		G;
	for (G in this.geometryHandlerMap) a = this.geometryHandlerMap[G].loaderClass, this.geometryHandlerMap[G].loaderObject = new a;
	for (G in this.hierarchyHandlerMap) a = this.hierarchyHandlerMap[G].loaderClass,
		this.hierarchyHandlerMap[G].loaderObject = new a;
	I = v = 0;
	y = {
		scene: new THREE.Scene,
		geometries:
		{},
		face_materials:
		{},
		materials:
		{},
		textures:
		{},
		objects:
		{},
		cameras:
		{},
		lights:
		{},
		fogs:
		{},
		empties:
		{},
		groups:
		{}
	};
	if (E.transform && (G = E.transform.position, a = E.transform.rotation, c = E.transform.scale, G && y.scene.position.set(G[0], G[1], G[2]), a && y.scene.rotation.set(a[0], a[1], a[2]), c && y.scene.scale.set(c[0], c[1], c[2]), G || a || c)) y.scene.updateMatrix(), y.scene.updateMatrixWorld();
	G = function(a)
	{
		return function()
		{
			I -= a;
			k();
			l.onLoadComplete()
		}
	};
	for (var W in E.fogs) a = E.fogs[W], "linear" === a.type ? q = new THREE.Fog(0, a.near, a.far) : "exp2" === a.type && (q = new THREE.FogExp2(0, a.density)), a = a.color, q.color.setRGB(a[0], a[1], a[2]), y.fogs[W] = q;
	for (var A in E.geometries) q = E.geometries[A], q.type in this.geometryHandlerMap && (v += 1, l.onLoadStart());
	for (var X in E.objects) q = E.objects[X], q.type && q.type in this.hierarchyHandlerMap && (v += 1, l.onLoadStart());
	H = v;
	for (A in E.geometries)
		if (q = E.geometries[A], "cube" === q.type) n = new THREE.CubeGeometry(q.width, q.height, q.depth,
			q.widthSegments, q.heightSegments, q.depthSegments), y.geometries[A] = n;
		else if ("plane" === q.type) n = new THREE.PlaneGeometry(q.width, q.height, q.widthSegments, q.heightSegments), y.geometries[A] = n;
	else if ("sphere" === q.type) n = new THREE.SphereGeometry(q.radius, q.widthSegments, q.heightSegments), y.geometries[A] = n;
	else if ("cylinder" === q.type) n = new THREE.CylinderGeometry(q.topRad, q.botRad, q.height, q.radSegs, q.heightSegs), y.geometries[A] = n;
	else if ("torus" === q.type) n = new THREE.TorusGeometry(q.radius, q.tube, q.segmentsR,
		q.segmentsT), y.geometries[A] = n;
	else if ("icosahedron" === q.type) n = new THREE.IcosahedronGeometry(q.radius, q.subdivisions), y.geometries[A] = n;
	else if (q.type in this.geometryHandlerMap)
	{
		X = {};
		for (s in q) "type" !== s && "url" !== s && (X[s] = q[s]);
		this.geometryHandlerMap[q.type].loaderObject.load(d(q.url, E.urlBaseType), g(A), X)
	}
	else "embedded" === q.type && (X = E.embeds[q.id], X.metadata = E.metadata, X && this.geometryHandlerMap.ascii.loaderObject.createModel(X, h(A), ""));
	for (var B in E.textures)
		if (A = E.textures[B], A.url instanceof Array)
		{
			I += A.url.length;
			for (s = 0; s < A.url.length; s++) l.onLoadStart()
		}
	else I += 1, l.onLoadStart();
	D = I;
	for (B in E.textures)
	{
		A = E.textures[B];
		void 0 !== A.mapping && void 0 !== THREE[A.mapping] && (A.mapping = new THREE[A.mapping]);
		if (A.url instanceof Array)
		{
			X = A.url.length;
			q = [];
			for (s = 0; s < X; s++) q[s] = d(A.url[s], E.urlBaseType);
			s = (s = q[0].endsWith(".dds")) ? THREE.ImageUtils.loadCompressedTextureCube(q, A.mapping, G(X)) : THREE.ImageUtils.loadTextureCube(q, A.mapping, G(X))
		}
		else s = A.url.toLowerCase()
			.endsWith(".dds"), X = d(A.url,
				E.urlBaseType), q = G(1), s = s ? THREE.ImageUtils.loadCompressedTexture(X, A.mapping, q) : THREE.ImageUtils.loadTexture(X, A.mapping, q), void 0 !== THREE[A.minFilter] && (s.minFilter = THREE[A.minFilter]), void 0 !== THREE[A.magFilter] && (s.magFilter = THREE[A.magFilter]), A.anisotropy && (s.anisotropy = A.anisotropy), A.repeat && (s.repeat.set(A.repeat[0], A.repeat[1]), 1 !== A.repeat[0] && (s.wrapS = THREE.RepeatWrapping), 1 !== A.repeat[1] && (s.wrapT = THREE.RepeatWrapping)), A.offset && s.offset.set(A.offset[0], A.offset[1]), A.wrap && (X = {
				repeat: THREE.RepeatWrapping,
				mirror: THREE.MirroredRepeatWrapping
			}, void 0 !== X[A.wrap[0]] && (s.wrapS = X[A.wrap[0]]), void 0 !== X[A.wrap[1]] && (s.wrapT = X[A.wrap[1]]));
		y.textures[B] = s
	}
	var K, L;
	for (K in E.materials)
	{
		B = E.materials[K];
		for (L in B.parameters) "envMap" === L || "map" === L || "lightMap" === L || "bumpMap" === L ? B.parameters[L] = y.textures[B.parameters[L]] : "shading" === L ? B.parameters[L] = "flat" === B.parameters[L] ? THREE.FlatShading : THREE.SmoothShading : "side" === L ? B.parameters[L] = "double" == B.parameters[L] ? THREE.DoubleSide : "back" == B.parameters[L] ?
			THREE.BackSide : THREE.FrontSide : "blending" === L ? B.parameters[L] = B.parameters[L] in THREE ? THREE[B.parameters[L]] : THREE.NormalBlending : "combine" === L ? B.parameters[L] = B.parameters[L] in THREE ? THREE[B.parameters[L]] : THREE.MultiplyOperation : "vertexColors" === L ? "face" == B.parameters[L] ? B.parameters[L] = THREE.FaceColors : B.parameters[L] && (B.parameters[L] = THREE.VertexColors) : "wrapRGB" === L && (G = B.parameters[L], B.parameters[L] = new THREE.Vector3(G[0], G[1], G[2]));
		void 0 !== B.parameters.opacity && 1 > B.parameters.opacity &&
			(B.parameters.transparent = !0);
		B.parameters.normalMap ? (G = THREE.ShaderLib.normalmap, A = THREE.UniformsUtils.clone(G.uniforms), s = B.parameters.color, X = B.parameters.specular, q = B.parameters.ambient, W = B.parameters.shininess, A.tNormal.value = y.textures[B.parameters.normalMap], B.parameters.normalScale && A.uNormalScale.value.set(B.parameters.normalScale[0], B.parameters.normalScale[1]), B.parameters.map && (A.tDiffuse.value = B.parameters.map, A.enableDiffuse.value = !0), B.parameters.envMap && (A.tCube.value = B.parameters.envMap,
				A.enableReflection.value = !0, A.uReflectivity.value = B.parameters.reflectivity), B.parameters.lightMap && (A.tAO.value = B.parameters.lightMap, A.enableAO.value = !0), B.parameters.specularMap && (A.tSpecular.value = y.textures[B.parameters.specularMap], A.enableSpecular.value = !0), B.parameters.displacementMap && (A.tDisplacement.value = y.textures[B.parameters.displacementMap], A.enableDisplacement.value = !0, A.uDisplacementBias.value = B.parameters.displacementBias, A.uDisplacementScale.value = B.parameters.displacementScale),
			A.uDiffuseColor.value.setHex(s), A.uSpecularColor.value.setHex(X), A.uAmbientColor.value.setHex(q), A.uShininess.value = W, B.parameters.opacity && (A.uOpacity.value = B.parameters.opacity), r = new THREE.ShaderMaterial(
			{
				fragmentShader: G.fragmentShader,
				vertexShader: G.vertexShader,
				uniforms: A,
				lights: !0,
				fog: !0
			})) : r = new THREE[B.type](B.parameters);
		y.materials[K] = r
	}
	for (K in E.materials)
		if (B = E.materials[K], B.parameters.materials)
		{
			L = [];
			for (s = 0; s < B.parameters.materials.length; s++) L.push(y.materials[B.parameters.materials[s]]);
			y.materials[K].materials = L
		} e();
	y.cameras && E.defaults.camera && (y.currentCamera = y.cameras[E.defaults.camera]);
	y.fogs && E.defaults.fog && (y.scene.fog = y.fogs[E.defaults.fog]);
	l.callbackSync(y);
	k()
};
THREE.TextureLoader = function()
{
	THREE.EventDispatcher.call(this);
	this.crossOrigin = null
};
THREE.TextureLoader.prototype = {
	constructor: THREE.TextureLoader,
	load: function(a)
	{
		var b = this,
			c = new Image;
		c.addEventListener("load", function()
		{
			var a = new THREE.Texture(c);
			a.needsUpdate = !0;
			b.dispatchEvent(
			{
				type: "load",
				content: a
			})
		}, !1);
		c.addEventListener("error", function()
		{
			b.dispatchEvent(
			{
				type: "error",
				message: "Couldn't load URL [" + a + "]"
			})
		}, !1);
		b.crossOrigin && (c.crossOrigin = b.crossOrigin);
		c.src = a
	}
};
THREE.Material = function()
{
	THREE.EventDispatcher.call(this);
	this.id = THREE.MaterialIdCount++;
	this.name = "";
	this.side = THREE.FrontSide;
	this.opacity = 1;
	this.transparent = !1;
	this.blending = THREE.NormalBlending;
	this.blendSrc = THREE.SrcAlphaFactor;
	this.blendDst = THREE.OneMinusSrcAlphaFactor;
	this.blendEquation = THREE.AddEquation;
	this.depthWrite = this.depthTest = !0;
	this.polygonOffset = !1;
	this.alphaTest = this.polygonOffsetUnits = this.polygonOffsetFactor = 0;
	this.overdraw = !1;
	this.needsUpdate = this.visible = !0
};
THREE.Material.prototype.setValues = function(a)
{
	if (void 0 !== a)
		for (var b in a)
		{
			var c = a[b];
			if (void 0 === c) console.warn("THREE.Material: '" + b + "' parameter is undefined.");
			else if (b in this)
			{
				var d = this[b];
				d instanceof THREE.Color && c instanceof THREE.Color ? d.copy(c) : d instanceof THREE.Color ? d.set(c) : d instanceof THREE.Vector3 && c instanceof THREE.Vector3 ? d.copy(c) : this[b] = c
			}
		}
};
THREE.Material.prototype.clone = function(a)
{
	void 0 === a && (a = new THREE.Material);
	a.name = this.name;
	a.side = this.side;
	a.opacity = this.opacity;
	a.transparent = this.transparent;
	a.blending = this.blending;
	a.blendSrc = this.blendSrc;
	a.blendDst = this.blendDst;
	a.blendEquation = this.blendEquation;
	a.depthTest = this.depthTest;
	a.depthWrite = this.depthWrite;
	a.polygonOffset = this.polygonOffset;
	a.polygonOffsetFactor = this.polygonOffsetFactor;
	a.polygonOffsetUnits = this.polygonOffsetUnits;
	a.alphaTest = this.alphaTest;
	a.overdraw = this.overdraw;
	a.visible = this.visible;
	return a
};
THREE.Material.prototype.dispose = function()
{
	this.dispatchEvent(
	{
		type: "dispose"
	})
};
THREE.MaterialIdCount = 0;
THREE.LineBasicMaterial = function(a)
{
	THREE.Material.call(this);
	this.color = new THREE.Color(16777215);
	this.linewidth = 1;
	this.linejoin = this.linecap = "round";
	this.vertexColors = !1;
	this.fog = !0;
	this.setValues(a)
};
THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineBasicMaterial.prototype.clone = function()
{
	var a = new THREE.LineBasicMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.linewidth = this.linewidth;
	a.linecap = this.linecap;
	a.linejoin = this.linejoin;
	a.vertexColors = this.vertexColors;
	a.fog = this.fog;
	return a
};
THREE.LineDashedMaterial = function(a)
{
	THREE.Material.call(this);
	this.color = new THREE.Color(16777215);
	this.scale = this.linewidth = 1;
	this.dashSize = 3;
	this.gapSize = 1;
	this.vertexColors = !1;
	this.fog = !0;
	this.setValues(a)
};
THREE.LineDashedMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineDashedMaterial.prototype.clone = function()
{
	var a = new THREE.LineDashedMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.linewidth = this.linewidth;
	a.scale = this.scale;
	a.dashSize = this.dashSize;
	a.gapSize = this.gapSize;
	a.vertexColors = this.vertexColors;
	a.fog = this.fog;
	return a
};
THREE.MeshBasicMaterial = function(a)
{
	THREE.Material.call(this);
	this.color = new THREE.Color(16777215);
	this.envMap = this.specularMap = this.lightMap = this.map = null;
	this.combine = THREE.MultiplyOperation;
	this.reflectivity = 1;
	this.refractionRatio = 0.98;
	this.fog = !0;
	this.shading = THREE.SmoothShading;
	this.wireframe = !1;
	this.wireframeLinewidth = 1;
	this.wireframeLinejoin = this.wireframeLinecap = "round";
	this.vertexColors = THREE.NoColors;
	this.morphTargets = this.skinning = !1;
	this.setValues(a)
};
THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshBasicMaterial.prototype.clone = function()
{
	var a = new THREE.MeshBasicMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.map = this.map;
	a.lightMap = this.lightMap;
	a.specularMap = this.specularMap;
	a.envMap = this.envMap;
	a.combine = this.combine;
	a.reflectivity = this.reflectivity;
	a.refractionRatio = this.refractionRatio;
	a.fog = this.fog;
	a.shading = this.shading;
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	a.wireframeLinecap = this.wireframeLinecap;
	a.wireframeLinejoin =
		this.wireframeLinejoin;
	a.vertexColors = this.vertexColors;
	a.skinning = this.skinning;
	a.morphTargets = this.morphTargets;
	return a
};
THREE.MeshLambertMaterial = function(a)
{
	THREE.Material.call(this);
	this.color = new THREE.Color(16777215);
	this.ambient = new THREE.Color(16777215);
	this.emissive = new THREE.Color(0);
	this.wrapAround = !1;
	this.wrapRGB = new THREE.Vector3(1, 1, 1);
	this.envMap = this.specularMap = this.lightMap = this.map = null;
	this.combine = THREE.MultiplyOperation;
	this.reflectivity = 1;
	this.refractionRatio = 0.98;
	this.fog = !0;
	this.shading = THREE.SmoothShading;
	this.wireframe = !1;
	this.wireframeLinewidth = 1;
	this.wireframeLinejoin = this.wireframeLinecap =
		"round";
	this.vertexColors = THREE.NoColors;
	this.morphNormals = this.morphTargets = this.skinning = !1;
	this.setValues(a)
};
THREE.MeshLambertMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshLambertMaterial.prototype.clone = function()
{
	var a = new THREE.MeshLambertMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.ambient.copy(this.ambient);
	a.emissive.copy(this.emissive);
	a.wrapAround = this.wrapAround;
	a.wrapRGB.copy(this.wrapRGB);
	a.map = this.map;
	a.lightMap = this.lightMap;
	a.specularMap = this.specularMap;
	a.envMap = this.envMap;
	a.combine = this.combine;
	a.reflectivity = this.reflectivity;
	a.refractionRatio = this.refractionRatio;
	a.fog = this.fog;
	a.shading = this.shading;
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	a.wireframeLinecap = this.wireframeLinecap;
	a.wireframeLinejoin = this.wireframeLinejoin;
	a.vertexColors = this.vertexColors;
	a.skinning = this.skinning;
	a.morphTargets = this.morphTargets;
	a.morphNormals = this.morphNormals;
	return a
};
THREE.MeshPhongMaterial = function(a)
{
	THREE.Material.call(this);
	this.color = new THREE.Color(16777215);
	this.ambient = new THREE.Color(16777215);
	this.emissive = new THREE.Color(0);
	this.specular = new THREE.Color(1118481);
	this.shininess = 30;
	this.metal = !1;
	this.perPixel = !0;
	this.wrapAround = !1;
	this.wrapRGB = new THREE.Vector3(1, 1, 1);
	this.bumpMap = this.lightMap = this.map = null;
	this.bumpScale = 1;
	this.normalMap = null;
	this.normalScale = new THREE.Vector2(1, 1);
	this.envMap = this.specularMap = null;
	this.combine = THREE.MultiplyOperation;
	this.reflectivity = 1;
	this.refractionRatio = 0.98;
	this.fog = !0;
	this.shading = THREE.SmoothShading;
	this.wireframe = !1;
	this.wireframeLinewidth = 1;
	this.wireframeLinejoin = this.wireframeLinecap = "round";
	this.vertexColors = THREE.NoColors;
	this.morphNormals = this.morphTargets = this.skinning = !1;
	this.setValues(a)
};
THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshPhongMaterial.prototype.clone = function()
{
	var a = new THREE.MeshPhongMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.ambient.copy(this.ambient);
	a.emissive.copy(this.emissive);
	a.specular.copy(this.specular);
	a.shininess = this.shininess;
	a.metal = this.metal;
	a.perPixel = this.perPixel;
	a.wrapAround = this.wrapAround;
	a.wrapRGB.copy(this.wrapRGB);
	a.map = this.map;
	a.lightMap = this.lightMap;
	a.bumpMap = this.bumpMap;
	a.bumpScale = this.bumpScale;
	a.normalMap = this.normalMap;
	a.normalScale.copy(this.normalScale);
	a.specularMap = this.specularMap;
	a.envMap = this.envMap;
	a.combine = this.combine;
	a.reflectivity = this.reflectivity;
	a.refractionRatio = this.refractionRatio;
	a.fog = this.fog;
	a.shading = this.shading;
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	a.wireframeLinecap = this.wireframeLinecap;
	a.wireframeLinejoin = this.wireframeLinejoin;
	a.vertexColors = this.vertexColors;
	a.skinning = this.skinning;
	a.morphTargets = this.morphTargets;
	a.morphNormals = this.morphNormals;
	return a
};
THREE.MeshDepthMaterial = function(a)
{
	THREE.Material.call(this);
	this.wireframe = !1;
	this.wireframeLinewidth = 1;
	this.setValues(a)
};
THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshDepthMaterial.prototype.clone = function()
{
	var a = new THREE.LineBasicMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	return a
};
THREE.MeshNormalMaterial = function(a)
{
	THREE.Material.call(this, a);
	this.shading = THREE.FlatShading;
	this.wireframe = !1;
	this.wireframeLinewidth = 1;
	this.setValues(a)
};
THREE.MeshNormalMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshNormalMaterial.prototype.clone = function()
{
	var a = new THREE.MeshNormalMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.shading = this.shading;
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	return a
};
THREE.MeshFaceMaterial = function(a)
{
	this.materials = a instanceof Array ? a : []
};
THREE.MeshFaceMaterial.prototype.clone = function()
{
	return new THREE.MeshFaceMaterial(this.materials.slice(0))
};
THREE.ParticleBasicMaterial = function(a)
{
	THREE.Material.call(this);
	this.color = new THREE.Color(16777215);
	this.map = null;
	this.size = 1;
	this.sizeAttenuation = !0;
	this.vertexColors = !1;
	this.fog = !0;
	this.setValues(a)
};
THREE.ParticleBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ParticleBasicMaterial.prototype.clone = function()
{
	var a = new THREE.ParticleBasicMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.map = this.map;
	a.size = this.size;
	a.sizeAttenuation = this.sizeAttenuation;
	a.vertexColors = this.vertexColors;
	a.fog = this.fog;
	return a
};
THREE.ParticleCanvasMaterial = function(a)
{
	THREE.Material.call(this);
	this.color = new THREE.Color(16777215);
	this.program = function() {};
	this.setValues(a)
};
THREE.ParticleCanvasMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ParticleCanvasMaterial.prototype.clone = function()
{
	var a = new THREE.ParticleCanvasMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.program = this.program;
	return a
};
THREE.ShaderMaterial = function(a)
{
	THREE.Material.call(this);
	this.vertexShader = this.fragmentShader = "void main() {}";
	this.uniforms = {};
	this.defines = {};
	this.attributes = null;
	this.shading = THREE.SmoothShading;
	this.wireframe = !1;
	this.wireframeLinewidth = 1;
	this.lights = this.fog = !1;
	this.vertexColors = THREE.NoColors;
	this.morphNormals = this.morphTargets = this.skinning = !1;
	this.setValues(a)
};
THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ShaderMaterial.prototype.clone = function()
{
	var a = new THREE.ShaderMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.fragmentShader = this.fragmentShader;
	a.vertexShader = this.vertexShader;
	a.uniforms = THREE.UniformsUtils.clone(this.uniforms);
	a.attributes = this.attributes;
	a.defines = this.defines;
	a.shading = this.shading;
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	a.fog = this.fog;
	a.lights = this.lights;
	a.vertexColors = this.vertexColors;
	a.skinning = this.skinning;
	a.morphTargets =
		this.morphTargets;
	a.morphNormals = this.morphNormals;
	return a
};
THREE.SpriteMaterial = function(a)
{
	THREE.Material.call(this);
	this.color = new THREE.Color(16777215);
	this.map = new THREE.Texture;
	this.useScreenCoordinates = !0;
	this.depthTest = !this.useScreenCoordinates;
	this.sizeAttenuation = !this.useScreenCoordinates;
	this.scaleByViewport = !this.sizeAttenuation;
	this.alignment = THREE.SpriteAlignment.center.clone();
	this.fog = !1;
	this.uvOffset = new THREE.Vector2(0, 0);
	this.uvScale = new THREE.Vector2(1, 1);
	this.setValues(a);
	a = a ||
	{};
	void 0 === a.depthTest && (this.depthTest = !this.useScreenCoordinates);
	void 0 === a.sizeAttenuation && (this.sizeAttenuation = !this.useScreenCoordinates);
	void 0 === a.scaleByViewport && (this.scaleByViewport = !this.sizeAttenuation)
};
THREE.SpriteMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.SpriteMaterial.prototype.clone = function()
{
	var a = new THREE.SpriteMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.map = this.map;
	a.useScreenCoordinates = this.useScreenCoordinates;
	a.sizeAttenuation = this.sizeAttenuation;
	a.scaleByViewport = this.scaleByViewport;
	a.alignment.copy(this.alignment);
	a.uvOffset.copy(this.uvOffset);
	a.uvScale.copy(this.uvScale);
	a.fog = this.fog;
	return a
};
THREE.SpriteAlignment = {};
THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1);
THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1);
THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, -1);
THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0);
THREE.SpriteAlignment.center = new THREE.Vector2(0, 0);
THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0);
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1);
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1);
THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1);
THREE.Texture = function(a, b, c, d, e, f, g, i, h)
{
	THREE.EventDispatcher.call(this);
	this.id = THREE.TextureIdCount++;
	this.name = "";
	this.image = a;
	this.mipmaps = [];
	this.mapping = void 0 !== b ? b : new THREE.UVMapping;
	this.wrapS = void 0 !== c ? c : THREE.ClampToEdgeWrapping;
	this.wrapT = void 0 !== d ? d : THREE.ClampToEdgeWrapping;
	this.magFilter = void 0 !== e ? e : THREE.LinearFilter;
	this.minFilter = void 0 !== f ? f : THREE.LinearMipMapLinearFilter;
	this.anisotropy = void 0 !== h ? h : 1;
	this.format = void 0 !== g ? g : THREE.RGBAFormat;
	this.type = void 0 !== i ? i : THREE.UnsignedByteType;
	this.offset = new THREE.Vector2(0, 0);
	this.repeat = new THREE.Vector2(1, 1);
	this.generateMipmaps = !0;
	this.premultiplyAlpha = !1;
	this.flipY = !0;
	this.unpackAlignment = 4;
	this.needsUpdate = !1;
	this.onUpdate = null
};
THREE.Texture.prototype = {
	constructor: THREE.Texture,
	clone: function(a)
	{
		void 0 === a && (a = new THREE.Texture);
		a.image = this.image;
		a.mipmaps = this.mipmaps.slice(0);
		a.mapping = this.mapping;
		a.wrapS = this.wrapS;
		a.wrapT = this.wrapT;
		a.magFilter = this.magFilter;
		a.minFilter = this.minFilter;
		a.anisotropy = this.anisotropy;
		a.format = this.format;
		a.type = this.type;
		a.offset.copy(this.offset);
		a.repeat.copy(this.repeat);
		a.generateMipmaps = this.generateMipmaps;
		a.premultiplyAlpha = this.premultiplyAlpha;
		a.flipY = this.flipY;
		a.unpackAlignment =
			this.unpackAlignment;
		return a
	},
	dispose: function()
	{
		this.dispatchEvent(
		{
			type: "dispose"
		})
	}
};
THREE.TextureIdCount = 0;
THREE.CompressedTexture = function(a, b, c, d, e, f, g, i, h, k, l)
{
	THREE.Texture.call(this, null, f, g, i, h, k, d, e, l);
	this.image = {
		width: b,
		height: c
	};
	this.mipmaps = a;
	this.generateMipmaps = !1
};
THREE.CompressedTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.CompressedTexture.prototype.clone = function()
{
	var a = new THREE.CompressedTexture;
	THREE.Texture.prototype.clone.call(this, a);
	return a
};
THREE.DataTexture = function(a, b, c, d, e, f, g, i, h, k, l)
{
	THREE.Texture.call(this, null, f, g, i, h, k, d, e, l);
	this.image = {
		data: a,
		width: b,
		height: c
	}
};
THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.DataTexture.prototype.clone = function()
{
	var a = new THREE.DataTexture;
	THREE.Texture.prototype.clone.call(this, a);
	return a
};
THREE.Particle = function(a)
{
	THREE.Object3D.call(this);
	this.material = a
};
THREE.Particle.prototype = Object.create(THREE.Object3D.prototype);
THREE.Particle.prototype.clone = function(a)
{
	void 0 === a && (a = new THREE.Particle(this.material));
	THREE.Object3D.prototype.clone.call(this, a);
	return a
};
THREE.ParticleSystem = function(a, b)
{
	THREE.Object3D.call(this);
	this.geometry = a;
	this.material = void 0 !== b ? b : new THREE.ParticleBasicMaterial(
	{
		color: 16777215 * Math.random()
	});
	this.sortParticles = !1;
	this.geometry && null === this.geometry.boundingSphere && this.geometry.computeBoundingSphere();
	this.frustumCulled = !1
};
THREE.ParticleSystem.prototype = Object.create(THREE.Object3D.prototype);
THREE.ParticleSystem.prototype.clone = function(a)
{
	void 0 === a && (a = new THREE.ParticleSystem(this.geometry, this.material));
	a.sortParticles = this.sortParticles;
	THREE.Object3D.prototype.clone.call(this, a);
	return a
};
THREE.Line = function(a, b, c)
{
	THREE.Object3D.call(this);
	this.geometry = a;
	this.material = void 0 !== b ? b : new THREE.LineBasicMaterial(
	{
		color: 16777215 * Math.random()
	});
	this.type = void 0 !== c ? c : THREE.LineStrip;
	this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere())
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = Object.create(THREE.Object3D.prototype);
THREE.Line.prototype.clone = function(a)
{
	void 0 === a && (a = new THREE.Line(this.geometry, this.material, this.type));
	THREE.Object3D.prototype.clone.call(this, a);
	return a
};
THREE.Mesh = function(a, b)
{
	THREE.Object3D.call(this);
	this.geometry = a;
	this.material = void 0 !== b ? b : new THREE.MeshBasicMaterial(
	{
		color: 16777215 * Math.random(),
		wireframe: !0
	});
	void 0 !== this.geometry && (null === this.geometry.boundingSphere && this.geometry.computeBoundingSphere(), this.updateMorphTargets())
};
THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype);
THREE.Mesh.prototype.updateMorphTargets = function()
{
	if (0 < this.geometry.morphTargets.length)
	{
		this.morphTargetBase = -1;
		this.morphTargetForcedOrder = [];
		this.morphTargetInfluences = [];
		this.morphTargetDictionary = {};
		for (var a = 0, b = this.geometry.morphTargets.length; a < b; a++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[a].name] = a
	}
};
THREE.Mesh.prototype.getMorphTargetIndexByName = function(a)
{
	if (void 0 !== this.morphTargetDictionary[a]) return this.morphTargetDictionary[a];
	console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + a + " does not exist. Returning 0.");
	return 0
};
THREE.Mesh.prototype.clone = function(a)
{
	void 0 === a && (a = new THREE.Mesh(this.geometry, this.material));
	THREE.Object3D.prototype.clone.call(this, a);
	return a
};
THREE.Bone = function(a)
{
	THREE.Object3D.call(this);
	this.skin = a;
	this.skinMatrix = new THREE.Matrix4
};
THREE.Bone.prototype = Object.create(THREE.Object3D.prototype);
THREE.Bone.prototype.update = function(a, b)
{
	this.matrixAutoUpdate && (b |= this.updateMatrix());
	if (b || this.matrixWorldNeedsUpdate) a ? this.skinMatrix.multiplyMatrices(a, this.matrix) : this.skinMatrix.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, b = !0;
	var c, d = this.children.length;
	for (c = 0; c < d; c++) this.children[c].update(this.skinMatrix, b)
};
THREE.SkinnedMesh = function(a, b, c)
{
	THREE.Mesh.call(this, a, b);
	this.useVertexTexture = void 0 !== c ? c : !0;
	this.identityMatrix = new THREE.Matrix4;
	this.bones = [];
	this.boneMatrices = [];
	var d, e, f;
	if (this.geometry && void 0 !== this.geometry.bones)
	{
		for (a = 0; a < this.geometry.bones.length; a++) c = this.geometry.bones[a], d = c.pos, e = c.rotq, f = c.scl, b = this.addBone(), b.name = c.name, b.position.set(d[0], d[1], d[2]), b.quaternion.set(e[0], e[1], e[2], e[3]), b.useQuaternion = !0, void 0 !== f ? b.scale.set(f[0], f[1], f[2]) : b.scale.set(1, 1, 1);
		for (a =
			0; a < this.bones.length; a++) c = this.geometry.bones[a], b = this.bones[a], -1 === c.parent ? this.add(b) : this.bones[c.parent].add(b);
		a = this.bones.length;
		this.useVertexTexture ? (this.boneTextureHeight = this.boneTextureWidth = a = 256 < a ? 64 : 64 < a ? 32 : 16 < a ? 16 : 8, this.boneMatrices = new Float32Array(4 * this.boneTextureWidth * this.boneTextureHeight), this.boneTexture = new THREE.DataTexture(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, THREE.RGBAFormat, THREE.FloatType), this.boneTexture.minFilter = THREE.NearestFilter,
			this.boneTexture.magFilter = THREE.NearestFilter, this.boneTexture.generateMipmaps = !1, this.boneTexture.flipY = !1) : this.boneMatrices = new Float32Array(16 * a);
		this.pose()
	}
};
THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.SkinnedMesh.prototype.addBone = function(a)
{
	void 0 === a && (a = new THREE.Bone(this));
	this.bones.push(a);
	return a
};
THREE.SkinnedMesh.prototype.updateMatrixWorld = function(a)
{
	this.matrixAutoUpdate && this.updateMatrix();
	if (this.matrixWorldNeedsUpdate || a) this.parent ? this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1;
	for (var a = 0, b = this.children.length; a < b; a++)
	{
		var c = this.children[a];
		c instanceof THREE.Bone ? c.update(this.identityMatrix, !1) : c.updateMatrixWorld(!0)
	}
	if (void 0 == this.boneInverses)
	{
		this.boneInverses = [];
		a = 0;
		for (b = this.bones.length; a <
			b; a++) c = new THREE.Matrix4, c.getInverse(this.bones[a].skinMatrix), this.boneInverses.push(c)
	}
	a = 0;
	for (b = this.bones.length; a < b; a++) THREE.SkinnedMesh.offsetMatrix.multiplyMatrices(this.bones[a].skinMatrix, this.boneInverses[a]), THREE.SkinnedMesh.offsetMatrix.flattenToArrayOffset(this.boneMatrices, 16 * a);
	this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
};
THREE.SkinnedMesh.prototype.pose = function()
{
	this.updateMatrixWorld(!0);
	for (var a = 0; a < this.geometry.skinIndices.length; a++)
	{
		var b = this.geometry.skinWeights[a],
			c = 1 / b.lengthManhattan();
		Infinity !== c ? b.multiplyScalar(c) : b.set(1)
	}
};
THREE.SkinnedMesh.prototype.clone = function(a)
{
	void 0 === a && (a = new THREE.SkinnedMesh(this.geometry, this.material, this.useVertexTexture));
	THREE.Mesh.prototype.clone.call(this, a);
	return a
};
THREE.SkinnedMesh.offsetMatrix = new THREE.Matrix4;
THREE.MorphAnimMesh = function(a, b)
{
	THREE.Mesh.call(this, a, b);
	this.duration = 1E3;
	this.mirroredLoop = !1;
	this.currentKeyframe = this.lastKeyframe = this.time = 0;
	this.direction = 1;
	this.directionBackwards = !1;
	this.setFrameRange(0, this.geometry.morphTargets.length - 1)
};
THREE.MorphAnimMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphAnimMesh.prototype.setFrameRange = function(a, b)
{
	this.startKeyframe = a;
	this.endKeyframe = b;
	this.length = this.endKeyframe - this.startKeyframe + 1
};
THREE.MorphAnimMesh.prototype.setDirectionForward = function()
{
	this.direction = 1;
	this.directionBackwards = !1
};
THREE.MorphAnimMesh.prototype.setDirectionBackward = function()
{
	this.direction = -1;
	this.directionBackwards = !0
};
THREE.MorphAnimMesh.prototype.parseAnimations = function()
{
	var a = this.geometry;
	a.animations || (a.animations = {});
	for (var b, c = a.animations, d = /([a-z]+)(\d+)/, e = 0, f = a.morphTargets.length; e < f; e++)
	{
		var g = a.morphTargets[e].name.match(d);
		if (g && 1 < g.length)
		{
			g = g[1];
			c[g] || (c[g] = {
				start: Infinity,
				end: -Infinity
			});
			var i = c[g];
			e < i.start && (i.start = e);
			e > i.end && (i.end = e);
			b || (b = g)
		}
	}
	a.firstAnimation = b
};
THREE.MorphAnimMesh.prototype.setAnimationLabel = function(a, b, c)
{
	this.geometry.animations || (this.geometry.animations = {});
	this.geometry.animations[a] = {
		start: b,
		end: c
	}
};
THREE.MorphAnimMesh.prototype.playAnimation = function(a, b)
{
	var c = this.geometry.animations[a];
	c ? (this.setFrameRange(c.start, c.end), this.duration = 1E3 * ((c.end - c.start) / b), this.time = 0) : console.warn("animation[" + a + "] undefined")
};
THREE.MorphAnimMesh.prototype.updateAnimation = function(a)
{
	var b = this.duration / this.length;
	this.time += this.direction * a;
	if (this.mirroredLoop)
	{
		if (this.time > this.duration || 0 > this.time) this.direction *= -1, this.time > this.duration && (this.time = this.duration, this.directionBackwards = !0), 0 > this.time && (this.time = 0, this.directionBackwards = !1)
	}
	else this.time %= this.duration, 0 > this.time && (this.time += this.duration);
	a = this.startKeyframe + THREE.Math.clamp(Math.floor(this.time / b), 0, this.length - 1);
	a !== this.currentKeyframe &&
		(this.morphTargetInfluences[this.lastKeyframe] = 0, this.morphTargetInfluences[this.currentKeyframe] = 1, this.morphTargetInfluences[a] = 0, this.lastKeyframe = this.currentKeyframe, this.currentKeyframe = a);
	b = this.time % b / b;
	this.directionBackwards && (b = 1 - b);
	this.morphTargetInfluences[this.currentKeyframe] = b;
	this.morphTargetInfluences[this.lastKeyframe] = 1 - b
};
THREE.MorphAnimMesh.prototype.clone = function(a)
{
	void 0 === a && (a = new THREE.MorphAnimMesh(this.geometry, this.material));
	a.duration = this.duration;
	a.mirroredLoop = this.mirroredLoop;
	a.time = this.time;
	a.lastKeyframe = this.lastKeyframe;
	a.currentKeyframe = this.currentKeyframe;
	a.direction = this.direction;
	a.directionBackwards = this.directionBackwards;
	THREE.Mesh.prototype.clone.call(this, a);
	return a
};
THREE.Ribbon = function(a, b)
{
	THREE.Object3D.call(this);
	this.geometry = a;
	this.material = b
};
THREE.Ribbon.prototype = Object.create(THREE.Object3D.prototype);
THREE.Ribbon.prototype.clone = function(a)
{
	void 0 === a && (a = new THREE.Ribbon(this.geometry, this.material));
	THREE.Object3D.prototype.clone.call(this, a);
	return a
};
THREE.LOD = function()
{
	THREE.Object3D.call(this);
	this.LODs = []
};
THREE.LOD.prototype = Object.create(THREE.Object3D.prototype);
THREE.LOD.prototype.addLevel = function(a, b)
{
	void 0 === b && (b = 0);
	for (var b = Math.abs(b), c = 0; c < this.LODs.length && !(b < this.LODs[c].visibleAtDistance); c++);
	this.LODs.splice(c, 0,
	{
		visibleAtDistance: b,
		object3D: a
	});
	this.add(a)
};
THREE.LOD.prototype.update = function(a)
{
	if (1 < this.LODs.length)
	{
		a.matrixWorldInverse.getInverse(a.matrixWorld);
		a = a.matrixWorldInverse;
		a = -(a.elements[2] * this.matrixWorld.elements[12] + a.elements[6] * this.matrixWorld.elements[13] + a.elements[10] * this.matrixWorld.elements[14] + a.elements[14]);
		this.LODs[0].object3D.visible = !0;
		for (var b = 1; b < this.LODs.length; b++)
			if (a >= this.LODs[b].visibleAtDistance) this.LODs[b - 1].object3D.visible = !1, this.LODs[b].object3D.visible = !0;
			else break;
		for (; b < this.LODs.length; b++) this.LODs[b].object3D.visible = !1
	}
};
THREE.LOD.prototype.clone = function() {};
THREE.Sprite = function(a)
{
	THREE.Object3D.call(this);
	this.material = void 0 !== a ? a : new THREE.SpriteMaterial;
	this.rotation3d = this.rotation;
	this.rotation = 0
};
THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype);
THREE.Sprite.prototype.updateMatrix = function()
{
	this.matrix.setPosition(this.position);
	this.rotation3d.set(0, 0, this.rotation);
	this.matrix.setRotationFromEuler(this.rotation3d);
	(1 !== this.scale.x || 1 !== this.scale.y) && this.matrix.scale(this.scale);
	this.matrixWorldNeedsUpdate = !0
};
THREE.Sprite.prototype.clone = function(a)
{
	void 0 === a && (a = new THREE.Sprite(this.material));
	THREE.Object3D.prototype.clone.call(this, a);
	return a
};
THREE.Scene = function()
{
	THREE.Object3D.call(this);
	this.overrideMaterial = this.fog = null;
	this.matrixAutoUpdate = !1;
	this.__objects = [];
	this.__lights = [];
	this.__objectsAdded = [];
	this.__objectsRemoved = []
};
THREE.Scene.prototype = Object.create(THREE.Object3D.prototype);
THREE.Scene.prototype.__addObject = function(a)
{
	if (a instanceof THREE.Light) - 1 === this.__lights.indexOf(a) && this.__lights.push(a), a.target && void 0 === a.target.parent && this.add(a.target);
	else if (!(a instanceof THREE.Camera || a instanceof THREE.Bone) && -1 === this.__objects.indexOf(a))
	{
		this.__objects.push(a);
		this.__objectsAdded.push(a);
		var b = this.__objectsRemoved.indexOf(a); - 1 !== b && this.__objectsRemoved.splice(b, 1)
	}
	for (b = 0; b < a.children.length; b++) this.__addObject(a.children[b])
};
THREE.Scene.prototype.__removeObject = function(a)
{
	if (a instanceof THREE.Light)
	{
		var b = this.__lights.indexOf(a); - 1 !== b && this.__lights.splice(b, 1)
	}
	else a instanceof THREE.Camera || (b = this.__objects.indexOf(a), -1 !== b && (this.__objects.splice(b, 1), this.__objectsRemoved.push(a), b = this.__objectsAdded.indexOf(a), -1 !== b && this.__objectsAdded.splice(b, 1)));
	for (b = 0; b < a.children.length; b++) this.__removeObject(a.children[b])
};
THREE.Fog = function(a, b, c)
{
	this.name = "";
	this.color = new THREE.Color(a);
	this.near = void 0 !== b ? b : 1;
	this.far = void 0 !== c ? c : 1E3
};
THREE.Fog.prototype.clone = function()
{
	return new THREE.Fog(this.color.getHex(), this.near, this.far)
};
THREE.FogExp2 = function(a, b)
{
	this.name = "";
	this.color = new THREE.Color(a);
	this.density = void 0 !== b ? b : 2.5E-4
};
THREE.FogExp2.prototype.clone = function()
{
	return new THREE.FogExp2(this.color.getHex(), this.density)
};
THREE.CanvasRenderer = function(a)
{
	function b(a)
	{
		x !== a && (x = q.globalAlpha = a)
	}

	function c(a)
	{
		z !== a && (a === THREE.NormalBlending ? q.globalCompositeOperation = "source-over" : a === THREE.AdditiveBlending ? q.globalCompositeOperation = "lighter" : a === THREE.SubtractiveBlending && (q.globalCompositeOperation = "darker"), z = a)
	}

	function d(a)
	{
		v !== a && (v = q.strokeStyle = a)
	}

	function e(a)
	{
		I !== a && (I = q.fillStyle = a)
	}
	console.log("THREE.CanvasRenderer", THREE.REVISION);
	var a = a ||
		{},
		f = this,
		g, i, h, k = new THREE.Projector,
		l = void 0 !== a.canvas ? a.canvas :
		document.createElement("canvas"),
		m, n, r, p, q = l.getContext("2d"),
		s = new THREE.Color(0),
		t = 0,
		x = 1,
		z = 0,
		v = null,
		I = null,
		H = null,
		D = null,
		y = null,
		F, E, G, W, A = new THREE.RenderableVertex,
		X = new THREE.RenderableVertex,
		B, K, L, U, aa, ba, xa, J, ha, ua, Oa, M, fa = new THREE.Color,
		Da = new THREE.Color,
		Aa = new THREE.Color,
		Ia = new THREE.Color,
		Ja = new THREE.Color,
		ma = new THREE.Color,
		wa = new THREE.Color,
		Ta = new THREE.Color,
		Ra = {},
		ia = {},
		ra, ga, Z, pa, gb, hb, Ea, yb, Cb, Lb, Ua = new THREE.Box2,
		na = new THREE.Box2,
		Ya = new THREE.Box2,
		Db = !1,
		nb = new THREE.Color,
		kc =
		new THREE.Color,
		Mb = new THREE.Color,
		ib = new THREE.Vector3,
		zb, Ob, rc, ob, Fa, sb, pb = 16;
	zb = document.createElement("canvas");
	zb.width = zb.height = 2;
	Ob = zb.getContext("2d");
	Ob.fillStyle = "rgba(0,0,0,1)";
	Ob.fillRect(0, 0, 2, 2);
	rc = Ob.getImageData(0, 0, 2, 2);
	ob = rc.data;
	Fa = document.createElement("canvas");
	Fa.width = Fa.height = pb;
	sb = Fa.getContext("2d");
	sb.translate(-pb / 2, -pb / 2);
	sb.scale(pb, pb);
	pb--;
	this.domElement = l;
	this.devicePixelRatio = void 0 !== a.devicePixelRatio ? a.devicePixelRatio : void 0 !== window.devicePixelRatio ? window.devicePixelRatio :
		1;
	this.sortElements = this.sortObjects = this.autoClear = !0;
	this.info = {
		render:
		{
			vertices: 0,
			faces: 0
		}
	};
	this.supportsVertexTextures = function() {};
	this.setFaceCulling = function() {};
	this.setSize = function(a, b)
	{
		m = a * this.devicePixelRatio;
		n = b * this.devicePixelRatio;
		r = Math.floor(m / 2);
		p = Math.floor(n / 2);
		l.width = m;
		l.height = n;
		l.style.width = a + "px";
		l.style.height = b + "px";
		Ua.set(new THREE.Vector2(-r, -p), new THREE.Vector2(r, p));
		na.set(new THREE.Vector2(-r, -p), new THREE.Vector2(r, p));
		x = 1;
		z = 0;
		y = D = H = I = v = null
	};
	this.setClearColor =
		function(a, b)
		{
			s.copy(a);
			t = void 0 !== b ? b : 1;
			na.set(new THREE.Vector2(-r, -p), new THREE.Vector2(r, p))
		};
	this.setClearColorHex = function(a, b)
	{
		s.setHex(a);
		t = void 0 !== b ? b : 1;
		na.set(new THREE.Vector2(-r, -p), new THREE.Vector2(r, p))
	};
	this.getMaxAnisotropy = function()
	{
		return 0
	};
	this.clear = function()
	{
		q.setTransform(1, 0, 0, -1, r, p);
		!1 === na.empty() && (na.intersect(Ua), na.expandByScalar(2), 1 > t && q.clearRect(na.min.x | 0, na.min.y | 0, na.max.x - na.min.x | 0, na.max.y - na.min.y | 0), 0 < t && (c(THREE.NormalBlending), b(1), e("rgba(" + Math.floor(255 *
			s.r) + "," + Math.floor(255 * s.g) + "," + Math.floor(255 * s.b) + "," + t + ")"), q.fillRect(na.min.x | 0, na.min.y | 0, na.max.x - na.min.x | 0, na.max.y - na.min.y | 0)), na.makeEmpty())
	};
	this.render = function(a, l)
	{
		function n(a, b, c)
		{
			for (var d = 0, e = h.length; d < e; d++)
			{
				var f = h[d];
				Ta.copy(f.color);
				if (f instanceof THREE.DirectionalLight)
				{
					var g = f.matrixWorld.getPosition()
						.normalize(),
						j = b.dot(g);
					0 >= j || (j *= f.intensity, c.add(Ta.multiplyScalar(j)))
				}
				else f instanceof THREE.PointLight && (g = f.matrixWorld.getPosition(), j = b.dot(ib.subVectors(g, a)
						.normalize()),
					0 >= j || (j *= 0 == f.distance ? 1 : 1 - Math.min(a.distanceTo(g) / f.distance, 1), 0 != j && (j *= f.intensity, c.add(Ta.multiplyScalar(j)))))
			}
		}

		function m(a, d, e, g, j, i, h, Y)
		{
			f.info.render.vertices += 3;
			f.info.render.faces++;
			b(Y.opacity);
			c(Y.blending);
			B = a.positionScreen.x;
			K = a.positionScreen.y;
			L = d.positionScreen.x;
			U = d.positionScreen.y;
			aa = e.positionScreen.x;
			ba = e.positionScreen.y;
			s(B, K, L, U, aa, ba);
			(Y instanceof THREE.MeshLambertMaterial || Y instanceof THREE.MeshPhongMaterial) && null === Y.map && null === Y.map ? (ma.copy(Y.color), wa.copy(Y.emissive),
					Y.vertexColors === THREE.FaceColors && ma.multiply(h.color), !0 === Db ? !1 === Y.wireframe && Y.shading == THREE.SmoothShading && 3 == h.vertexNormalsLength ? (Da.copy(nb), Aa.copy(nb), Ia.copy(nb), n(h.v1.positionWorld, h.vertexNormalsModel[0], Da), n(h.v2.positionWorld, h.vertexNormalsModel[1], Aa), n(h.v3.positionWorld, h.vertexNormalsModel[2], Ia), Da.multiply(ma)
						.add(wa), Aa.multiply(ma)
						.add(wa), Ia.multiply(ma)
						.add(wa), Ja.addColors(Aa, Ia)
						.multiplyScalar(0.5), Z = jb(Da, Aa, Ia, Ja), I(B, K, L, U, aa, ba, 0, 0, 1, 0, 0, 1, Z)) : (fa.copy(nb), n(h.centroidModel,
							h.normalModel, fa), fa.multiply(ma)
						.add(wa), !0 === Y.wireframe ? v(fa, Y.wireframeLinewidth, Y.wireframeLinecap, Y.wireframeLinejoin) : x(fa)) : !0 === Y.wireframe ? v(Y.color, Y.wireframeLinewidth, Y.wireframeLinecap, Y.wireframeLinejoin) : x(Y.color)) : Y instanceof THREE.MeshBasicMaterial || Y instanceof THREE.MeshLambertMaterial || Y instanceof THREE.MeshPhongMaterial ? null !== Y.map ? Y.map.mapping instanceof THREE.UVMapping && (pa = h.uvs[0], z(B, K, L, U, aa, ba, pa[g].x, pa[g].y, pa[j].x, pa[j].y, pa[i].x, pa[i].y, Y.map)) : null !== Y.envMap ?
				Y.envMap.mapping instanceof THREE.SphericalReflectionMapping && (ib.copy(h.vertexNormalsModelView[g]), gb = 0.5 * ib.x + 0.5, hb = 0.5 * ib.y + 0.5, ib.copy(h.vertexNormalsModelView[j]), Ea = 0.5 * ib.x + 0.5, yb = 0.5 * ib.y + 0.5, ib.copy(h.vertexNormalsModelView[i]), Cb = 0.5 * ib.x + 0.5, Lb = 0.5 * ib.y + 0.5, z(B, K, L, U, aa, ba, gb, hb, Ea, yb, Cb, Lb, Y.envMap)) : (fa.copy(Y.color), Y.vertexColors === THREE.FaceColors && fa.multiply(h.color), !0 === Y.wireframe ? v(fa, Y.wireframeLinewidth, Y.wireframeLinecap, Y.wireframeLinejoin) : x(fa)) : Y instanceof THREE.MeshDepthMaterial ?
				(ra = l.near, ga = l.far, j = 1 - cb(a.positionScreen.z * a.positionScreen.w, ra, ga), Da.setRGB(j, j, j), j = 1 - cb(d.positionScreen.z * d.positionScreen.w, ra, ga), Aa.setRGB(j, j, j), j = 1 - cb(e.positionScreen.z * e.positionScreen.w, ra, ga), Ia.setRGB(j, j, j), Ja.addColors(Aa, Ia)
					.multiplyScalar(0.5), Z = jb(Da, Aa, Ia, Ja), I(B, K, L, U, aa, ba, 0, 0, 1, 0, 0, 1, Z)) : Y instanceof THREE.MeshNormalMaterial && (Y.shading == THREE.FlatShading ? (d = h.normalModelView, fa.setRGB(d.x, d.y, d.z)
					.multiplyScalar(0.5)
					.addScalar(0.5), !0 === Y.wireframe ? v(fa, Y.wireframeLinewidth,
						Y.wireframeLinecap, Y.wireframeLinejoin) : x(fa)) : Y.shading == THREE.SmoothShading && (d = h.vertexNormalsModelView[g], Da.setRGB(d.x, d.y, d.z)
					.multiplyScalar(0.5)
					.addScalar(0.5), d = h.vertexNormalsModelView[j], Aa.setRGB(d.x, d.y, d.z)
					.multiplyScalar(0.5)
					.addScalar(0.5), d = h.vertexNormalsModelView[i], Ia.setRGB(d.x, d.y, d.z)
					.multiplyScalar(0.5)
					.addScalar(0.5), Ja.addColors(Aa, Ia)
					.multiplyScalar(0.5), Z = jb(Da, Aa, Ia, Ja), I(B, K, L, U, aa, ba, 0, 0, 1, 0, 0, 1, Z)))
		}

		function s(a, b, c, d, e, f)
		{
			q.beginPath();
			q.moveTo(a, b);
			q.lineTo(c, d);
			q.lineTo(e, f);
			q.closePath()
		}

		function t(a, b, c, d, e, f, g, j)
		{
			q.beginPath();
			q.moveTo(a, b);
			q.lineTo(c, d);
			q.lineTo(e, f);
			q.lineTo(g, j);
			q.closePath()
		}

		function v(a, b, c, e)
		{
			H !== b && (H = q.lineWidth = b);
			D !== c && (D = q.lineCap = c);
			y !== e && (y = q.lineJoin = e);
			d(a.getStyle());
			q.stroke();
			Ya.expandByScalar(2 * b)
		}

		function x(a)
		{
			e(a.getStyle());
			q.fill()
		}

		function z(a, b, c, d, f, g, j, i, h, Y, k, l, n)
		{
			if (!(n instanceof THREE.DataTexture || void 0 === n.image || 0 == n.image.width))
			{
				if (!0 === n.needsUpdate)
				{
					var m = n.wrapS == THREE.RepeatWrapping,
						p = n.wrapT ==
						THREE.RepeatWrapping;
					Ra[n.id] = q.createPattern(n.image, !0 === m && !0 === p ? "repeat" : !0 === m && !1 === p ? "repeat-x" : !1 === m && !0 === p ? "repeat-y" : "no-repeat");
					n.needsUpdate = !1
				}
				void 0 === Ra[n.id] ? e("rgba(0,0,0,1)") : e(Ra[n.id]);
				var m = n.offset.x / n.repeat.x,
					p = n.offset.y / n.repeat.y,
					s = n.image.width * n.repeat.x,
					r = n.image.height * n.repeat.y,
					j = (j + m) * s,
					i = (1 - i + p) * r,
					c = c - a,
					d = d - b,
					f = f - a,
					g = g - b,
					h = (h + m) * s - j,
					Y = (1 - Y + p) * r - i,
					k = (k + m) * s - j,
					l = (1 - l + p) * r - i,
					m = h * l - k * Y;
				0 === m ? (void 0 === ia[n.id] && (b = document.createElement("canvas"), b.width = n.image.width,
					b.height = n.image.height, b = b.getContext("2d"), b.drawImage(n.image, 0, 0), ia[n.id] = b.getImageData(0, 0, n.image.width, n.image.height)
					.data), b = ia[n.id], j = 4 * (Math.floor(j) + Math.floor(i) * n.image.width), fa.setRGB(b[j] / 255, b[j + 1] / 255, b[j + 2] / 255), x(fa)) : (m = 1 / m, n = (l * c - Y * f) * m, Y = (l * d - Y * g) * m, c = (h * f - k * c) * m, d = (h * g - k * d) * m, a = a - n * j - c * i, j = b - Y * j - d * i, q.save(), q.transform(n, Y, c, d, a, j), q.fill(), q.restore())
			}
		}

		function I(a, b, c, d, e, f, g, j, i, h, Y, k, n)
		{
			var l, m;
			l = n.width - 1;
			m = n.height - 1;
			g *= l;
			j *= m;
			c -= a;
			d -= b;
			e -= a;
			f -= b;
			i = i * l - g;
			h = h * m -
				j;
			Y = Y * l - g;
			k = k * m - j;
			m = 1 / (i * k - Y * h);
			l = (k * c - h * e) * m;
			h = (k * d - h * f) * m;
			c = (i * e - Y * c) * m;
			d = (i * f - Y * d) * m;
			a = a - l * g - c * j;
			b = b - h * g - d * j;
			q.save();
			q.transform(l, h, c, d, a, b);
			q.clip();
			q.drawImage(n, 0, 0);
			q.restore()
		}

		function jb(a, b, c, d)
		{
			ob[0] = 255 * a.r | 0;
			ob[1] = 255 * a.g | 0;
			ob[2] = 255 * a.b | 0;
			ob[4] = 255 * b.r | 0;
			ob[5] = 255 * b.g | 0;
			ob[6] = 255 * b.b | 0;
			ob[8] = 255 * c.r | 0;
			ob[9] = 255 * c.g | 0;
			ob[10] = 255 * c.b | 0;
			ob[12] = 255 * d.r | 0;
			ob[13] = 255 * d.g | 0;
			ob[14] = 255 * d.b | 0;
			Ob.putImageData(rc, 0, 0);
			sb.drawImage(zb, 0, 0);
			return Fa
		}

		function cb(a, b, c)
		{
			a = (a - b) / (c - b);
			return a * a *
				(3 - 2 * a)
		}

		function kb(a, b)
		{
			var c = b.x - a.x,
				d = b.y - a.y,
				e = c * c + d * d;
			0 !== e && (e = 1 / Math.sqrt(e), c *= e, d *= e, b.x += c, b.y += d, a.x -= c, a.y -= d)
		}
		if (!1 === l instanceof THREE.Camera) console.error("THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera.");
		else
		{
			!0 === this.autoClear && this.clear();
			q.setTransform(1, 0, 0, -1, r, p);
			f.info.render.vertices = 0;
			f.info.render.faces = 0;
			g = k.projectScene(a, l, this.sortObjects, this.sortElements);
			i = g.elements;
			h = g.lights;
			Db = 0 < h.length;
			if (!0 === Db)
			{
				nb.setRGB(0, 0, 0);
				kc.setRGB(0, 0, 0);
				Mb.setRGB(0, 0, 0);
				for (var pb = 0, Nb = h.length; pb < Nb; pb++)
				{
					var S = h[pb],
						T = S.color;
					S instanceof THREE.AmbientLight ? nb.add(T) : S instanceof THREE.DirectionalLight ? kc.add(T) : S instanceof THREE.PointLight && Mb.add(T)
				}
			}
			pb = 0;
			for (Nb = i.length; pb < Nb; pb++)
			{
				var ja = i[pb],
					S = ja.material;
				if (!(void 0 === S || !1 === S.visible))
				{
					Ya.makeEmpty();
					if (ja instanceof THREE.RenderableParticle)
					{
						F = ja;
						F.x *= r;
						F.y *= p;
						var T = F,
							Za = ja;
						b(S.opacity);
						c(S.blending);
						var Va = void 0,
							$a = void 0,
							Wa = void 0,
							Pa = void 0,
							Y = ja = void 0,
							dd = void 0;
						S instanceof THREE.ParticleBasicMaterial ?
							null === S.map ? (Wa = Za.object.scale.x, Pa = Za.object.scale.y, Wa *= Za.scale.x * r, Pa *= Za.scale.y * p, Ya.min.set(T.x - Wa, T.y - Pa), Ya.max.set(T.x + Wa, T.y + Pa), !1 !== Ua.isIntersectionBox(Ya) && (e(S.color.getStyle()), q.save(), q.translate(T.x, T.y), q.rotate(-Za.rotation), q.scale(Wa, Pa), q.fillRect(-1, -1, 2, 2), q.restore())) : (ja = S.map.image, Y = ja.width >> 1, dd = ja.height >> 1, Wa = Za.scale.x * r, Pa = Za.scale.y * p, Va = Wa * Y, $a = Pa * dd, Ya.min.set(T.x - Va, T.y - $a), Ya.max.set(T.x + Va, T.y + $a), !1 !== Ua.isIntersectionBox(Ya) && (q.save(), q.translate(T.x,
								T.y), q.rotate(-Za.rotation), q.scale(Wa, -Pa), q.translate(-Y, -dd), q.drawImage(ja, 0, 0), q.restore())) : S instanceof THREE.ParticleCanvasMaterial && (Va = Za.scale.x * r, $a = Za.scale.y * p, Ya.min.set(T.x - Va, T.y - $a), Ya.max.set(T.x + Va, T.y + $a), !1 !== Ua.isIntersectionBox(Ya) && (d(S.color.getStyle()), e(S.color.getStyle()), q.save(), q.translate(T.x, T.y), q.rotate(-Za.rotation), q.scale(Va, $a), S.program(q), q.restore()))
					}
					else if (ja instanceof THREE.RenderableLine) F = ja.v1, E = ja.v2, F.positionScreen.x *= r, F.positionScreen.y *= p, E.positionScreen.x *=
						r, E.positionScreen.y *= p, Ya.setFromPoints([F.positionScreen, E.positionScreen]), !0 === Ua.isIntersectionBox(Ya) && (T = F, Za = E, b(S.opacity), c(S.blending), q.beginPath(), q.moveTo(T.positionScreen.x, T.positionScreen.y), q.lineTo(Za.positionScreen.x, Za.positionScreen.y), S instanceof THREE.LineBasicMaterial && (T = S.linewidth, H !== T && (H = q.lineWidth = T), T = S.linecap, D !== T && (D = q.lineCap = T), T = S.linejoin, y !== T && (y = q.lineJoin = T), d(S.color.getStyle()), q.stroke(), Ya.expandByScalar(2 * S.linewidth)));
					else if (ja instanceof THREE.RenderableFace3)
					{
						F =
							ja.v1;
						E = ja.v2;
						G = ja.v3;
						if (-1 > F.positionScreen.z || 1 < F.positionScreen.z) continue;
						if (-1 > E.positionScreen.z || 1 < E.positionScreen.z) continue;
						if (-1 > G.positionScreen.z || 1 < G.positionScreen.z) continue;
						F.positionScreen.x *= r;
						F.positionScreen.y *= p;
						E.positionScreen.x *= r;
						E.positionScreen.y *= p;
						G.positionScreen.x *= r;
						G.positionScreen.y *= p;
						!0 === S.overdraw && (kb(F.positionScreen, E.positionScreen), kb(E.positionScreen, G.positionScreen), kb(G.positionScreen, F.positionScreen));
						Ya.setFromPoints([F.positionScreen, E.positionScreen,
							G.positionScreen
						]);
						m(F, E, G, 0, 1, 2, ja, S, a)
					}
					else if (ja instanceof THREE.RenderableFace4)
					{
						F = ja.v1;
						E = ja.v2;
						G = ja.v3;
						W = ja.v4;
						if (-1 > F.positionScreen.z || 1 < F.positionScreen.z) continue;
						if (-1 > E.positionScreen.z || 1 < E.positionScreen.z) continue;
						if (-1 > G.positionScreen.z || 1 < G.positionScreen.z) continue;
						if (-1 > W.positionScreen.z || 1 < W.positionScreen.z) continue;
						F.positionScreen.x *= r;
						F.positionScreen.y *= p;
						E.positionScreen.x *= r;
						E.positionScreen.y *= p;
						G.positionScreen.x *= r;
						G.positionScreen.y *= p;
						W.positionScreen.x *= r;
						W.positionScreen.y *=
							p;
						A.positionScreen.copy(E.positionScreen);
						X.positionScreen.copy(W.positionScreen);
						!0 === S.overdraw && (kb(F.positionScreen, E.positionScreen), kb(E.positionScreen, W.positionScreen), kb(W.positionScreen, F.positionScreen), kb(G.positionScreen, A.positionScreen), kb(G.positionScreen, X.positionScreen));
						Ya.setFromPoints([F.positionScreen, E.positionScreen, G.positionScreen, W.positionScreen]);
						T = F;
						Za = E;
						Va = G;
						$a = W;
						Wa = A;
						Pa = X;
						Y = a;
						f.info.render.vertices += 4;
						f.info.render.faces++;
						b(S.opacity);
						c(S.blending);
						void 0 !== S.map &&
							null !== S.map || void 0 !== S.envMap && null !== S.envMap ? (m(T, Za, $a, 0, 1, 3, ja, S, Y), m(Wa, Va, Pa, 1, 2, 3, ja, S, Y)) : (B = T.positionScreen.x, K = T.positionScreen.y, L = Za.positionScreen.x, U = Za.positionScreen.y, aa = Va.positionScreen.x, ba = Va.positionScreen.y, xa = $a.positionScreen.x, J = $a.positionScreen.y, ha = Wa.positionScreen.x, ua = Wa.positionScreen.y, Oa = Pa.positionScreen.x, M = Pa.positionScreen.y, S instanceof THREE.MeshLambertMaterial || S instanceof THREE.MeshPhongMaterial ? (ma.copy(S.color), wa.copy(S.emissive), S.vertexColors ===
								THREE.FaceColors && ma.multiply(ja.color), !0 === Db ? !1 === S.wireframe && S.shading == THREE.SmoothShading && 4 == ja.vertexNormalsLength ? (Da.copy(nb), Aa.copy(nb), Ia.copy(nb), Ja.copy(nb), n(ja.v1.positionWorld, ja.vertexNormalsModel[0], Da), n(ja.v2.positionWorld, ja.vertexNormalsModel[1], Aa), n(ja.v4.positionWorld, ja.vertexNormalsModel[3], Ia), n(ja.v3.positionWorld, ja.vertexNormalsModel[2], Ja), Da.multiply(ma)
									.add(wa), Aa.multiply(ma)
									.add(wa), Ia.multiply(ma)
									.add(wa), Ja.multiply(ma)
									.add(wa), Z = jb(Da, Aa, Ia, Ja), s(B, K, L, U,
										xa, J), I(B, K, L, U, xa, J, 0, 0, 1, 0, 0, 1, Z), s(ha, ua, aa, ba, Oa, M), I(ha, ua, aa, ba, Oa, M, 1, 0, 1, 1, 0, 1, Z)) : (fa.copy(nb), n(ja.centroidModel, ja.normalModel, fa), fa.multiply(ma)
									.add(wa), t(B, K, L, U, aa, ba, xa, J), !0 === S.wireframe ? v(fa, S.wireframeLinewidth, S.wireframeLinecap, S.wireframeLinejoin) : x(fa)) : (fa.addColors(ma, wa), t(B, K, L, U, aa, ba, xa, J), !0 === S.wireframe ? v(fa, S.wireframeLinewidth, S.wireframeLinecap, S.wireframeLinejoin) : x(fa))) : S instanceof THREE.MeshBasicMaterial ? (fa.copy(S.color), S.vertexColors === THREE.FaceColors &&
								fa.multiply(ja.color), t(B, K, L, U, aa, ba, xa, J), !0 === S.wireframe ? v(fa, S.wireframeLinewidth, S.wireframeLinecap, S.wireframeLinejoin) : x(fa)) : S instanceof THREE.MeshNormalMaterial ? (T = void 0, S.shading == THREE.FlatShading ? (T = ja.normalModelView, fa.setRGB(T.x, T.y, T.z)
								.multiplyScalar(0.5)
								.addScalar(0.5), t(B, K, L, U, aa, ba, xa, J), !0 === S.wireframe ? v(fa, S.wireframeLinewidth, S.wireframeLinecap, S.wireframeLinejoin) : x(fa)) : S.shading == THREE.SmoothShading && (T = ja.vertexNormalsModelView[0], Da.setRGB(T.x, T.y, T.z)
								.multiplyScalar(0.5)
								.addScalar(0.5),
								T = ja.vertexNormalsModelView[1], Aa.setRGB(T.x, T.y, T.z)
								.multiplyScalar(0.5)
								.addScalar(0.5), T = ja.vertexNormalsModelView[3], Ia.setRGB(T.x, T.y, T.z)
								.multiplyScalar(0.5)
								.addScalar(0.5), T = ja.vertexNormalsModelView[2], Ja.setRGB(T.x, T.y, T.z)
								.multiplyScalar(0.5)
								.addScalar(0.5), Z = jb(Da, Aa, Ia, Ja), s(B, K, L, U, xa, J), I(B, K, L, U, xa, J, 0, 0, 1, 0, 0, 1, Z), s(ha, ua, aa, ba, Oa, M), I(ha, ua, aa, ba, Oa, M, 1, 0, 1, 1, 0, 1, Z))) : S instanceof THREE.MeshDepthMaterial && (ra = l.near, ga = l.far, Da.r = Da.g = Da.b = 1 - cb(T.positionScreen.z * T.positionScreen.w,
								ra, ga), Aa.r = Aa.g = Aa.b = 1 - cb(Za.positionScreen.z * Za.positionScreen.w, ra, ga), Ia.r = Ia.g = Ia.b = 1 - cb($a.positionScreen.z * $a.positionScreen.w, ra, ga), Ja.r = Ja.g = Ja.b = 1 - cb(Va.positionScreen.z * Va.positionScreen.w, ra, ga), Z = jb(Da, Aa, Ia, Ja), s(B, K, L, U, xa, J), I(B, K, L, U, xa, J, 0, 0, 1, 0, 0, 1, Z), s(ha, ua, aa, ba, Oa, M), I(ha, ua, aa, ba, Oa, M, 1, 0, 1, 1, 0, 1, Z)))
					}
					na.union(Ya)
				}
			}
			q.setTransform(1, 0, 0, 1, 0, 0)
		}
	}
};
THREE.ShaderChunk = {
	fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
	fog_fragment: "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
	envmap_pars_fragment: "#ifdef USE_ENVMAP\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nuniform bool useRefract;\nuniform float refractionRatio;\n#else\nvarying vec3 vReflect;\n#endif\n#endif",
	envmap_fragment: "#ifdef USE_ENVMAP\nvec3 reflectVec;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nreflectVec = refract( cameraToVertex, normal, refractionRatio );\n} else { \nreflectVec = reflect( cameraToVertex, normal );\n}\n#else\nreflectVec = vReflect;\n#endif\n#ifdef DOUBLE_SIDED\nfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\nvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#else\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#endif\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\n} else if ( combine == 2 ) {\ngl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;\n} else {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\n}\n#endif",
	envmap_pars_vertex: "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
	worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n#ifdef USE_SKINNING\nvec4 worldPosition = modelMatrix * skinned;\n#endif\n#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n#endif\n#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n#endif\n#endif",
	envmap_vertex: "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;\nworldNormal = normalize( worldNormal );\nvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, worldNormal );\n}\n#endif",
	map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
	map_particle_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n#endif",
	map_pars_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
	map_pars_fragment: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
	map_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
	map_fragment: "#ifdef USE_MAP\nvec4 texelColor = texture2D( map, vUv );\n#ifdef GAMMA_INPUT\ntexelColor.xyz *= texelColor.xyz;\n#endif\ngl_FragColor = gl_FragColor * texelColor;\n#endif",
	lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
	lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
	lightmap_fragment: "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
	lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
	bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\nuniform sampler2D bumpMap;\nuniform float bumpScale;\nvec2 dHdxy_fwd() {\nvec2 dSTdx = dFdx( vUv );\nvec2 dSTdy = dFdy( vUv );\nfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\nfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\nfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\nreturn vec2( dBx, dBy );\n}\nvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\nvec3 vSigmaX = dFdx( surf_pos );\nvec3 vSigmaY = dFdy( surf_pos );\nvec3 vN = surf_norm;\nvec3 R1 = cross( vSigmaY, vN );\nvec3 R2 = cross( vN, vSigmaX );\nfloat fDet = dot( vSigmaX, R1 );\nvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\nreturn normalize( abs( fDet ) * surf_norm - vGrad );\n}\n#endif",
	normalmap_pars_fragment: "#ifdef USE_NORMALMAP\nuniform sampler2D normalMap;\nuniform vec2 normalScale;\nvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\nvec3 q0 = dFdx( eye_pos.xyz );\nvec3 q1 = dFdy( eye_pos.xyz );\nvec2 st0 = dFdx( vUv.st );\nvec2 st1 = dFdy( vUv.st );\nvec3 S = normalize(  q0 * st1.t - q1 * st0.t );\nvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\nvec3 N = normalize( surf_norm );\nvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\nmapN.xy = normalScale * mapN.xy;\nmat3 tsn = mat3( S, T, N );\nreturn normalize( tsn * mapN );\n}\n#endif",
	specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\nuniform sampler2D specularMap;\n#endif",
	specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\nvec4 texelSpecular = texture2D( specularMap, vUv );\nspecularStrength = texelSpecular.r;\n#else\nspecularStrength = 1.0;\n#endif",
	lights_lambert_pars_vertex: "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
	lights_lambert_vertex: "vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\nvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, dirVector );\nvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\ndirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\ndirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n#ifdef DOUBLE_SIDED\nvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\npointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\npointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef DOUBLE_SIDED\nvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\nspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\nspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n#ifdef DOUBLE_SIDED\nvLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nfloat hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\nvLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n#ifdef DOUBLE_SIDED\nvLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n#endif\n}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\nvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
	lights_phong_pars_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif",
	lights_phong_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nvSpotLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvWorldPosition = worldPosition.xyz;\n#endif",
	lights_phong_pars_fragment: "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#else\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
	lights_phong_fragment: "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\nnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#ifdef USE_NORMALMAP\nnormal = perturbNormal2Arb( -viewPosition, normal );\n#elif defined( USE_BUMPMAP )\nnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse  = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vSpotLight[ i ].xyz );\nfloat lDistance = vSpotLight[ i ].w;\n#endif\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n#endif\nspotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\nvec3 spotHalfVector = normalize( lVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, dirVector );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += diffuse * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += specular * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
	color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
	color_fragment: "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
	color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
	color_vertex: "#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",
	skinning_pars_vertex: "#ifdef USE_SKINNING\n#ifdef BONE_TEXTURE\nuniform sampler2D boneTexture;\nmat4 getBoneMatrix( const in float i ) {\nfloat j = i * 4.0;\nfloat x = mod( j, N_BONE_PIXEL_X );\nfloat y = floor( j / N_BONE_PIXEL_X );\nconst float dx = 1.0 / N_BONE_PIXEL_X;\nconst float dy = 1.0 / N_BONE_PIXEL_Y;\ny = dy * ( y + 0.5 );\nvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\nvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\nvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\nvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\nmat4 bone = mat4( v1, v2, v3, v4 );\nreturn bone;\n}\n#else\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\nmat4 getBoneMatrix( const in float i ) {\nmat4 bone = boneGlobalMatrices[ int(i) ];\nreturn bone;\n}\n#endif\n#endif",
	skinbase_vertex: "#ifdef USE_SKINNING\nmat4 boneMatX = getBoneMatrix( skinIndex.x );\nmat4 boneMatY = getBoneMatrix( skinIndex.y );\n#endif",
	skinning_vertex: "#ifdef USE_SKINNING\n#ifdef USE_MORPHTARGETS\nvec4 skinVertex = vec4( morphed, 1.0 );\n#else\nvec4 skinVertex = vec4( position, 1.0 );\n#endif\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\n#endif",
	morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[ 8 ];\n#else\nuniform float morphTargetInfluences[ 4 ];\n#endif\n#endif",
	morphtarget_vertex: "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n#ifndef USE_MORPHNORMALS\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n#endif\nmorphed += position;\n#endif",
	default_vertex: "vec4 mvPosition;\n#ifdef USE_SKINNING\nmvPosition = modelViewMatrix * skinned;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( position, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;",
	morphnormal_vertex: "#ifdef USE_MORPHNORMALS\nvec3 morphedNormal = vec3( 0.0 );\nmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\nmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\nmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\nmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\nmorphedNormal += normal;\n#endif",
	skinnormal_vertex: "#ifdef USE_SKINNING\nmat4 skinMatrix = skinWeight.x * boneMatX;\nskinMatrix \t+= skinWeight.y * boneMatY;\n#ifdef USE_MORPHNORMALS\nvec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n#else\nvec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n#endif\n#endif",
	defaultnormal_vertex: "vec3 objectNormal;\n#ifdef USE_SKINNING\nobjectNormal = skinnedNormal.xyz;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )\nobjectNormal = morphedNormal;\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )\nobjectNormal = normal;\n#endif\n#ifdef FLIP_SIDED\nobjectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;",
	shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
	shadowmap_fragment: "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_DEBUG\nvec3 frustumColors[3];\nfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\nfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\nfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n#endif\n#ifdef SHADOWMAP_CASCADE\nint inFrustumCount = 0;\n#endif\nfloat fDepth;\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nbool inFrustum = all( inFrustumVec );\n#ifdef SHADOWMAP_CASCADE\ninFrustumCount += int( inFrustum );\nbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n#else\nbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n#endif\nbool frustumTest = all( frustumTestVec );\nif ( frustumTest ) {\nshadowCoord.z += shadowBias[ i ];\n#if defined( SHADOWMAP_TYPE_PCF )\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\nfloat shadow = 0.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.0 * xPixelOffset;\nfloat dy0 = -1.0 * yPixelOffset;\nfloat dx1 = 1.0 * xPixelOffset;\nfloat dy1 = 1.0 * yPixelOffset;\nmat3 shadowKernel;\nmat3 depthKernel;\ndepthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( depthKernel[0][0] < shadowCoord.z ) shadowKernel[0][0] = 0.25;\nelse shadowKernel[0][0] = 0.0;\ndepthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( depthKernel[0][1] < shadowCoord.z ) shadowKernel[0][1] = 0.25;\nelse shadowKernel[0][1] = 0.0;\ndepthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( depthKernel[0][2] < shadowCoord.z ) shadowKernel[0][2] = 0.25;\nelse shadowKernel[0][2] = 0.0;\ndepthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( depthKernel[1][0] < shadowCoord.z ) shadowKernel[1][0] = 0.25;\nelse shadowKernel[1][0] = 0.0;\ndepthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( depthKernel[1][1] < shadowCoord.z ) shadowKernel[1][1] = 0.25;\nelse shadowKernel[1][1] = 0.0;\ndepthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( depthKernel[1][2] < shadowCoord.z ) shadowKernel[1][2] = 0.25;\nelse shadowKernel[1][2] = 0.0;\ndepthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( depthKernel[2][0] < shadowCoord.z ) shadowKernel[2][0] = 0.25;\nelse shadowKernel[2][0] = 0.0;\ndepthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( depthKernel[2][1] < shadowCoord.z ) shadowKernel[2][1] = 0.25;\nelse shadowKernel[2][1] = 0.0;\ndepthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( depthKernel[2][2] < shadowCoord.z ) shadowKernel[2][2] = 0.25;\nelse shadowKernel[2][2] = 0.0;\nvec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\nshadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\nshadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\nvec4 shadowValues;\nshadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\nshadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\nshadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\nshadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\nshadow = dot( shadowValues, vec4( 1.0 ) );\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n#ifdef SHADOWMAP_DEBUG\n#ifdef SHADOWMAP_CASCADE\nif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n#else\nif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n#endif\n#endif\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
	shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
	shadowmap_vertex: "#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif",
	alphatest_fragment: "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
	linear_to_gamma_fragment: "#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif"
};
THREE.UniformsUtils = {
	merge: function(a)
	{
		var b, c, d, e = {};
		for (b = 0; b < a.length; b++)
			for (c in d = this.clone(a[b]), d) e[c] = d[c];
		return e
	},
	clone: function(a)
	{
		var b, c, d, e = {};
		for (b in a)
			for (c in e[b] = {}, a[b]) d = a[b][c], e[b][c] = d instanceof THREE.Color || d instanceof THREE.Vector2 || d instanceof THREE.Vector3 || d instanceof THREE.Vector4 || d instanceof THREE.Matrix4 || d instanceof THREE.Texture ? d.clone() : d instanceof Array ? d.slice() : d;
		return e
	}
};
THREE.UniformsLib = {
	common:
	{
		diffuse:
		{
			type: "c",
			value: new THREE.Color(15658734)
		},
		opacity:
		{
			type: "f",
			value: 1
		},
		map:
		{
			type: "t",
			value: null
		},
		offsetRepeat:
		{
			type: "v4",
			value: new THREE.Vector4(0, 0, 1, 1)
		},
		lightMap:
		{
			type: "t",
			value: null
		},
		specularMap:
		{
			type: "t",
			value: null
		},
		envMap:
		{
			type: "t",
			value: null
		},
		flipEnvMap:
		{
			type: "f",
			value: -1
		},
		useRefract:
		{
			type: "i",
			value: 0
		},
		reflectivity:
		{
			type: "f",
			value: 1
		},
		refractionRatio:
		{
			type: "f",
			value: 0.98
		},
		combine:
		{
			type: "i",
			value: 0
		},
		morphTargetInfluences:
		{
			type: "f",
			value: 0
		}
	},
	bump:
	{
		bumpMap:
		{
			type: "t",
			value: null
		},
		bumpScale:
		{
			type: "f",
			value: 1
		}
	},
	normalmap:
	{
		normalMap:
		{
			type: "t",
			value: null
		},
		normalScale:
		{
			type: "v2",
			value: new THREE.Vector2(1, 1)
		}
	},
	fog:
	{
		fogDensity:
		{
			type: "f",
			value: 2.5E-4
		},
		fogNear:
		{
			type: "f",
			value: 1
		},
		fogFar:
		{
			type: "f",
			value: 2E3
		},
		fogColor:
		{
			type: "c",
			value: new THREE.Color(16777215)
		}
	},
	lights:
	{
		ambientLightColor:
		{
			type: "fv",
			value: []
		},
		directionalLightDirection:
		{
			type: "fv",
			value: []
		},
		directionalLightColor:
		{
			type: "fv",
			value: []
		},
		hemisphereLightDirection:
		{
			type: "fv",
			value: []
		},
		hemisphereLightSkyColor:
		{
			type: "fv",
			value: []
		},
		hemisphereLightGroundColor:
		{
			type: "fv",
			value: []
		},
		pointLightColor:
		{
			type: "fv",
			value: []
		},
		pointLightPosition:
		{
			type: "fv",
			value: []
		},
		pointLightDistance:
		{
			type: "fv1",
			value: []
		},
		spotLightColor:
		{
			type: "fv",
			value: []
		},
		spotLightPosition:
		{
			type: "fv",
			value: []
		},
		spotLightDirection:
		{
			type: "fv",
			value: []
		},
		spotLightDistance:
		{
			type: "fv1",
			value: []
		},
		spotLightAngleCos:
		{
			type: "fv1",
			value: []
		},
		spotLightExponent:
		{
			type: "fv1",
			value: []
		}
	},
	particle:
	{
		psColor:
		{
			type: "c",
			value: new THREE.Color(15658734)
		},
		opacity:
		{
			type: "f",
			value: 1
		},
		size:
		{
			type: "f",
			value: 1
		},
		scale:
		{
			type: "f",
			value: 1
		},
		map:
		{
			type: "t",
			value: null
		},
		fogDensity:
		{
			type: "f",
			value: 2.5E-4
		},
		fogNear:
		{
			type: "f",
			value: 1
		},
		fogFar:
		{
			type: "f",
			value: 2E3
		},
		fogColor:
		{
			type: "c",
			value: new THREE.Color(16777215)
		}
	},
	shadowmap:
	{
		shadowMap:
		{
			type: "tv",
			value: []
		},
		shadowMapSize:
		{
			type: "v2v",
			value: []
		},
		shadowBias:
		{
			type: "fv1",
			value: []
		},
		shadowDarkness:
		{
			type: "fv1",
			value: []
		},
		shadowMatrix:
		{
			type: "m4v",
			value: []
		}
	}
};
THREE.ShaderLib = {
	basic:
	{
		uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.shadowmap]),
		vertexShader: [THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex,
			THREE.ShaderChunk.skinbase_vertex, "#ifdef USE_ENVMAP", THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "#endif", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"
		].join("\n"),
		fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment,
			THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment,
			THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"
		].join("\n")
	},
	lambert:
	{
		uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap,
		{
			ambient:
			{
				type: "c",
				value: new THREE.Color(16777215)
			},
			emissive:
			{
				type: "c",
				value: new THREE.Color(0)
			},
			wrapRGB:
			{
				type: "v3",
				value: new THREE.Vector3(1, 1, 1)
			}
		}]),
		vertexShader: ["#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",
			THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_lambert_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex,
			THREE.ShaderChunk.defaultnormal_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_lambert_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"
		].join("\n"),
		fragmentShader: ["uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment,
			THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, "#ifdef DOUBLE_SIDED\nif ( gl_FrontFacing )\ngl_FragColor.xyz *= vLightFront;\nelse\ngl_FragColor.xyz *= vLightBack;\n#else\ngl_FragColor.xyz *= vLightFront;\n#endif", THREE.ShaderChunk.lightmap_fragment,
			THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"
		].join("\n")
	},
	phong:
	{
		uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.bump, THREE.UniformsLib.normalmap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap,
		{
			ambient:
			{
				type: "c",
				value: new THREE.Color(16777215)
			},
			emissive:
			{
				type: "c",
				value: new THREE.Color(0)
			},
			specular:
			{
				type: "c",
				value: new THREE.Color(1118481)
			},
			shininess:
			{
				type: "f",
				value: 30
			},
			wrapRGB:
			{
				type: "v3",
				value: new THREE.Vector3(1, 1, 1)
			}
		}]),
		vertexShader: ["#define PHONG\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex,
			"void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "vNormal = normalize( transformedNormal );", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, "vViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex,
			THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"
		].join("\n"),
		fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment,
			THREE.ShaderChunk.bumpmap_pars_fragment, THREE.ShaderChunk.normalmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment,
			THREE.ShaderChunk.fog_fragment, "}"
		].join("\n")
	},
	particle_basic:
	{
		uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.particle, THREE.UniformsLib.shadowmap]),
		vertexShader: ["uniform float size;\nuniform float scale;", THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;",
			THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"
		].join("\n"),
		fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( psColor, opacity );", THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.shadowmap_fragment,
			THREE.ShaderChunk.fog_fragment, "}"
		].join("\n")
	},
	dashed:
	{
		uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog,
		{
			scale:
			{
				type: "f",
				value: 1
			},
			dashSize:
			{
				type: "f",
				value: 1
			},
			totalSize:
			{
				type: "f",
				value: 2
			}
		}]),
		vertexShader: ["uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;", THREE.ShaderChunk.color_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vLineDistance = scale * lineDistance;\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n}"].join("\n"),
		fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\nif ( mod( vLineDistance, totalSize ) > dashSize ) {\ndiscard;\n}\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
	},
	depth:
	{
		uniforms:
		{
			mNear:
			{
				type: "f",
				value: 1
			},
			mFar:
			{
				type: "f",
				value: 2E3
			},
			opacity:
			{
				type: "f",
				value: 1
			}
		},
		vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
		fragmentShader: "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}"
	},
	normal:
	{
		uniforms:
		{
			opacity:
			{
				type: "f",
				value: 1
			}
		},
		vertexShader: "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * mvPosition;\n}",
		fragmentShader: "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}"
	},
	normalmap:
	{
		uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap,
		{
			enableAO:
			{
				type: "i",
				value: 0
			},
			enableDiffuse:
			{
				type: "i",
				value: 0
			},
			enableSpecular:
			{
				type: "i",
				value: 0
			},
			enableReflection:
			{
				type: "i",
				value: 0
			},
			enableDisplacement:
			{
				type: "i",
				value: 0
			},
			tDisplacement:
			{
				type: "t",
				value: null
			},
			tDiffuse:
			{
				type: "t",
				value: null
			},
			tCube:
			{
				type: "t",
				value: null
			},
			tNormal:
			{
				type: "t",
				value: null
			},
			tSpecular:
			{
				type: "t",
				value: null
			},
			tAO:
			{
				type: "t",
				value: null
			},
			uNormalScale:
			{
				type: "v2",
				value: new THREE.Vector2(1, 1)
			},
			uDisplacementBias:
			{
				type: "f",
				value: 0
			},
			uDisplacementScale:
			{
				type: "f",
				value: 1
			},
			uDiffuseColor:
			{
				type: "c",
				value: new THREE.Color(16777215)
			},
			uSpecularColor:
			{
				type: "c",
				value: new THREE.Color(1118481)
			},
			uAmbientColor:
			{
				type: "c",
				value: new THREE.Color(16777215)
			},
			uShininess:
			{
				type: "f",
				value: 30
			},
			uOpacity:
			{
				type: "f",
				value: 1
			},
			useRefract:
			{
				type: "i",
				value: 0
			},
			uRefractionRatio:
			{
				type: "f",
				value: 0.98
			},
			uReflectivity:
			{
				type: "f",
				value: 0.5
			},
			uOffset:
			{
				type: "v2",
				value: new THREE.Vector2(0, 0)
			},
			uRepeat:
			{
				type: "v2",
				value: new THREE.Vector2(1, 1)
			},
			wrapRGB:
			{
				type: "v3",
				value: new THREE.Vector3(1, 1, 1)
			}
		}]),
		fragmentShader: ["uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform vec2 uNormalScale;\nuniform bool useRefract;\nuniform float uRefractionRatio;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;",
			THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse ) {\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( tDiffuse, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n#endif\n}\nif( enableAO ) {\n#ifdef GAMMA_INPUT\nvec4 aoColor = texture2D( tAO, vUv );\naoColor.xyz *= aoColor.xyz;\ngl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n#endif\n}\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\nvec3 finalNormal = tsb * normalTex;\n#ifdef FLIP_SIDED\nfinalNormal = -finalNormal;\n#endif\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 pointVector = lPosition.xyz + vViewPosition.xyz;\nfloat pointDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\npointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );\npointVector = normalize( pointVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n#endif\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\nvec3 pointHalfVector = normalize( pointVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\n#else\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 spotVector = lPosition.xyz + vViewPosition.xyz;\nfloat spotDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nspotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );\nspotVector = normalize( spotVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );\n#endif\nspotDiffuse += spotDistance * spotLightColor[ i ] * uDiffuseColor * spotDiffuseWeight * spotEffect;\nvec3 spotHalfVector = normalize( spotVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += spotDistance * spotLightColor[ i ] * uSpecularColor * spotSpecularWeight * spotDiffuseWeight * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\nfloat directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n#endif\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += uDiffuseColor * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularTex.r * max( pow( hemiDotNormalHalfSky, uShininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularTex.r * max( pow( hemiDotNormalHalfGround, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlickSky = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += uSpecularColor * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor ) + totalSpecular;\n#endif\nif ( enableReflection ) {\nvec3 vReflect;\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, normal, uRefractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, normal );\n}\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );\n}",
			THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"
		].join("\n"),
		vertexShader: ["attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\nuniform bool enableDisplacement;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;",
			THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, "#ifdef USE_SKINNING\nvNormal = normalize( normalMatrix * skinnedNormal.xyz );\nvec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );\nvTangent = normalize( normalMatrix * skinnedTangent.xyz );\n#else\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\n#endif\nvBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );\nvUv = uv * uRepeat + uOffset;\nvec3 displacedPosition;\n#ifdef VERTEX_TEXTURES\nif ( enableDisplacement ) {\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\ndisplacedPosition = position + normalize( normal ) * df;\n} else {\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n}\n#else\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n#endif\nvec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );\nvec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\nvWorldPosition = worldPosition.xyz;\nvViewPosition = -mvPosition.xyz;\n#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif\n}"
		].join("\n")
	},
	cube:
	{
		uniforms:
		{
			tCube:
			{
				type: "t",
				value: null
			},
			tFlip:
			{
				type: "f",
				value: -1
			}
		},
		vertexShader: "varying vec3 vWorldPosition;\nvoid main() {\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\nvWorldPosition = worldPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
		fragmentShader: "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\nvoid main() {\ngl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n}"
	},
	depthRGBA:
	{
		uniforms:
		{},
		vertexShader: [THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n"),
		fragmentShader: "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}"
	}
};
THREE.WebGLRenderer = function(a)
{
	function b(a)
	{
		if (a.__webglCustomAttributesList)
			for (var b in a.__webglCustomAttributesList) j.deleteBuffer(a.__webglCustomAttributesList[b].buffer)
	}

	function c(a, b)
	{
		var c = a.vertices.length,
			d = b.material;
		if (d.attributes)
		{
			void 0 === a.__webglCustomAttributesList && (a.__webglCustomAttributesList = []);
			for (var e in d.attributes)
			{
				var f = d.attributes[e];
				if (!f.__webglInitialized || f.createUniqueBuffers)
				{
					f.__webglInitialized = !0;
					var g = 1;
					"v2" === f.type ? g = 2 : "v3" === f.type ? g = 3 : "v4" === f.type ?
						g = 4 : "c" === f.type && (g = 3);
					f.size = g;
					f.array = new Float32Array(c * g);
					f.buffer = j.createBuffer();
					f.buffer.belongsToAttribute = e;
					f.needsUpdate = !0
				}
				a.__webglCustomAttributesList.push(f)
			}
		}
	}

	function d(a, b)
	{
		var c = b.geometry,
			d = a.faces3,
			i = a.faces4,
			h = 3 * d.length + 4 * i.length,
			k = 1 * d.length + 2 * i.length,
			i = 3 * d.length + 4 * i.length,
			d = e(b, a),
			n = g(d),
			l = f(d),
			m = d.vertexColors ? d.vertexColors : !1;
		a.__vertexArray = new Float32Array(3 * h);
		l && (a.__normalArray = new Float32Array(3 * h));
		c.hasTangents && (a.__tangentArray = new Float32Array(4 * h));
		m &&
			(a.__colorArray = new Float32Array(3 * h));
		if (n)
		{
			if (0 < c.faceUvs.length || 0 < c.faceVertexUvs.length) a.__uvArray = new Float32Array(2 * h);
			if (1 < c.faceUvs.length || 1 < c.faceVertexUvs.length) a.__uv2Array = new Float32Array(2 * h)
		}
		b.geometry.skinWeights.length && b.geometry.skinIndices.length && (a.__skinIndexArray = new Float32Array(4 * h), a.__skinWeightArray = new Float32Array(4 * h));
		a.__faceArray = new Uint16Array(3 * k);
		a.__lineArray = new Uint16Array(2 * i);
		if (a.numMorphTargets)
		{
			a.__morphTargetsArrays = [];
			c = 0;
			for (n = a.numMorphTargets; c <
				n; c++) a.__morphTargetsArrays.push(new Float32Array(3 * h))
		}
		if (a.numMorphNormals)
		{
			a.__morphNormalsArrays = [];
			c = 0;
			for (n = a.numMorphNormals; c < n; c++) a.__morphNormalsArrays.push(new Float32Array(3 * h))
		}
		a.__webglFaceCount = 3 * k;
		a.__webglLineCount = 2 * i;
		if (d.attributes)
		{
			void 0 === a.__webglCustomAttributesList && (a.__webglCustomAttributesList = []);
			for (var q in d.attributes)
			{
				var k = d.attributes[q],
					c = {},
					p;
				for (p in k) c[p] = k[p];
				if (!c.__webglInitialized || c.createUniqueBuffers) c.__webglInitialized = !0, i = 1, "v2" === c.type ? i = 2 :
					"v3" === c.type ? i = 3 : "v4" === c.type ? i = 4 : "c" === c.type && (i = 3), c.size = i, c.array = new Float32Array(h * i), c.buffer = j.createBuffer(), c.buffer.belongsToAttribute = q, k.needsUpdate = !0, c.__original = k;
				a.__webglCustomAttributesList.push(c)
			}
		}
		a.__inittedArrays = !0
	}

	function e(a, b)
	{
		return a.material instanceof THREE.MeshFaceMaterial ? a.material.materials[b.materialIndex] : a.material
	}

	function f(a)
	{
		return a instanceof THREE.MeshBasicMaterial && !a.envMap || a instanceof THREE.MeshDepthMaterial ? !1 : a && void 0 !== a.shading && a.shading ===
			THREE.SmoothShading ? THREE.SmoothShading : THREE.FlatShading
	}

	function g(a)
	{
		return a.map || a.lightMap || a.bumpMap || a.normalMap || a.specularMap || a instanceof THREE.ShaderMaterial ? !0 : !1
	}

	function i(a)
	{
		var b, c, d;
		for (b in a.attributes) d = "index" === b ? j.ELEMENT_ARRAY_BUFFER : j.ARRAY_BUFFER, c = a.attributes[b], c.buffer = j.createBuffer(), j.bindBuffer(d, c.buffer), j.bufferData(d, c.array, j.STATIC_DRAW)
	}

	function h(a, b, c)
	{
		var d = a.attributes,
			e = d.index,
			f = d.position,
			g = d.normal,
			i = d.uv,
			h = d.color,
			d = d.tangent;
		a.elementsNeedUpdate &&
			void 0 !== e && (j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, e.buffer), j.bufferData(j.ELEMENT_ARRAY_BUFFER, e.array, b));
		a.verticesNeedUpdate && void 0 !== f && (j.bindBuffer(j.ARRAY_BUFFER, f.buffer), j.bufferData(j.ARRAY_BUFFER, f.array, b));
		a.normalsNeedUpdate && void 0 !== g && (j.bindBuffer(j.ARRAY_BUFFER, g.buffer), j.bufferData(j.ARRAY_BUFFER, g.array, b));
		a.uvsNeedUpdate && void 0 !== i && (j.bindBuffer(j.ARRAY_BUFFER, i.buffer), j.bufferData(j.ARRAY_BUFFER, i.array, b));
		a.colorsNeedUpdate && void 0 !== h && (j.bindBuffer(j.ARRAY_BUFFER,
			h.buffer), j.bufferData(j.ARRAY_BUFFER, h.array, b));
		a.tangentsNeedUpdate && void 0 !== d && (j.bindBuffer(j.ARRAY_BUFFER, d.buffer), j.bufferData(j.ARRAY_BUFFER, d.array, b));
		if (c)
			for (var k in a.attributes) delete a.attributes[k].array
	}

	function k(a)
	{
		ib[a] || (j.enableVertexAttribArray(a), ib[a] = !0)
	}

	function l()
	{
		for (var a in ib) ib[a] && (j.disableVertexAttribArray(a), ib[a] = !1)
	}

	function m(a, b)
	{
		return a.z !== b.z ? b.z - a.z : b.id - a.id
	}

	function n(a, b)
	{
		return b[0] - a[0]
	}

	function r(a, b, c)
	{
		if (a.length)
			for (var d = 0, e = a.length; d < e; d++) wa =
				Aa = null, Ja = ma = ra = ia = Ea = hb = ga = -1, sb = !0, a[d].render(b, c, kc, Mb), wa = Aa = null, Ja = ma = ra = ia = Ea = hb = ga = -1, sb = !0
	}

	function p(a, b, c, d, e, f, g, j)
	{
		var i, h, k, n;
		b ? (h = a.length - 1, n = b = -1) : (h = 0, b = a.length, n = 1);
		for (var l = h; l !== b; l += n)
			if (i = a[l], i.render)
			{
				h = i.object;
				k = i.buffer;
				if (j) i = j;
				else
				{
					i = i[c];
					if (!i) continue;
					g && M.setBlending(i.blending, i.blendEquation, i.blendSrc, i.blendDst);
					M.setDepthTest(i.depthTest);
					M.setDepthWrite(i.depthWrite);
					E(i.polygonOffset, i.polygonOffsetFactor, i.polygonOffsetUnits)
				}
				M.setMaterialFaces(i);
				k instanceof
				THREE.BufferGeometry ? M.renderBufferDirect(d, e, f, i, k, h) : M.renderBuffer(d, e, f, i, k, h)
			}
	}

	function q(a, b, c, d, e, f, g)
	{
		for (var j, i, h = 0, k = a.length; h < k; h++)
			if (j = a[h], i = j.object, i.visible)
			{
				if (g) j = g;
				else
				{
					j = j[b];
					if (!j) continue;
					f && M.setBlending(j.blending, j.blendEquation, j.blendSrc, j.blendDst);
					M.setDepthTest(j.depthTest);
					M.setDepthWrite(j.depthWrite);
					E(j.polygonOffset, j.polygonOffsetFactor, j.polygonOffsetUnits)
				}
				M.renderImmediateObject(c, d, e, j, i)
			}
	}

	function s(a, b, c)
	{
		a.push(
		{
			buffer: b,
			object: c,
			opaque: null,
			transparent: null
		})
	}

	function t(a)
	{
		for (var b in a.attributes)
			if (a.attributes[b].needsUpdate) return !0;
		return !1
	}

	function x(a)
	{
		for (var b in a.attributes) a.attributes[b].needsUpdate = !1
	}

	function z(a, b)
	{
		for (var c = a.length - 1; 0 <= c; c--) a[c].object === b && a.splice(c, 1)
	}

	function v(a, b)
	{
		for (var c = a.length - 1; 0 <= c; c--) a[c] === b && a.splice(c, 1)
	}

	function I(a, b, c, d, e)
	{
		Ra = 0;
		d.needsUpdate && (d.program && Pa(d), M.initMaterial(d, b, c, e), d.needsUpdate = !1);
		d.morphTargets && !e.__webglMorphTargetInfluences && (e.__webglMorphTargetInfluences = new Float32Array(M.maxMorphTargets));
		var f = !1,
			g = d.program,
			i = g.uniforms,
			h = d.uniforms;
		g !== Aa && (j.useProgram(g), Aa = g, f = !0);
		d.id !== Ja && (Ja = d.id, f = !0);
		if (f || a !== wa) j.uniformMatrix4fv(i.projectionMatrix, !1, a.projectionMatrix.elements), a !== wa && (wa = a);
		if (d.skinning)
			if (cb && e.useVertexTexture)
			{
				if (null !== i.boneTexture)
				{
					var k = H();
					j.uniform1i(i.boneTexture, k);
					M.setTexture(e.boneTexture, k)
				}
			}
		else null !== i.boneGlobalMatrices && j.uniformMatrix4fv(i.boneGlobalMatrices, !1, e.boneMatrices);
		if (f)
		{
			c && d.fog && (h.fogColor.value = c.color, c instanceof THREE.Fog ?
				(h.fogNear.value = c.near, h.fogFar.value = c.far) : c instanceof THREE.FogExp2 && (h.fogDensity.value = c.density));
			if (d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial || d.lights)
			{
				if (sb)
				{
					for (var n, l = k = 0, m = 0, q, p, s, r = pb, t = r.directional.colors, v = r.directional.positions, x = r.point.colors, z = r.point.positions, D = r.point.distances, B = r.spot.colors, E = r.spot.positions, G = r.spot.distances, I = r.spot.directions, J = r.spot.anglesCos, fa = r.spot.exponents, S = r.hemi.skyColors, U = r.hemi.groundColors, W = r.hemi.positions,
						X = 0, T = 0, aa = 0, ia = 0, Da = 0, ja = 0, ma = 0, ba = 0, N = n = 0, c = s = N = 0, f = b.length; c < f; c++) n = b[c], n.onlyShadow || (q = n.color, p = n.intensity, s = n.distance, n instanceof THREE.AmbientLight ? n.visible && (M.gammaInput ? (k += q.r * q.r, l += q.g * q.g, m += q.b * q.b) : (k += q.r, l += q.g, m += q.b)) : n instanceof THREE.DirectionalLight ? (Da += 1, n.visible && (Fa.copy(n.matrixWorld.getPosition()), Fa.sub(n.target.matrixWorld.getPosition()), Fa.normalize(), 0 === Fa.x && 0 === Fa.y && 0 === Fa.z || (n = 3 * X, v[n] = Fa.x, v[n + 1] = Fa.y, v[n + 2] = Fa.z, M.gammaInput ? y(t, n, q, p * p) : F(t, n, q,
						p), X += 1))) : n instanceof THREE.PointLight ? (ja += 1, n.visible && (N = 3 * T, M.gammaInput ? y(x, N, q, p * p) : F(x, N, q, p), p = n.matrixWorld.getPosition(), z[N] = p.x, z[N + 1] = p.y, z[N + 2] = p.z, D[T] = s, T += 1)) : n instanceof THREE.SpotLight ? (ma += 1, n.visible && (N = 3 * aa, M.gammaInput ? y(B, N, q, p * p) : F(B, N, q, p), p = n.matrixWorld.getPosition(), E[N] = p.x, E[N + 1] = p.y, E[N + 2] = p.z, G[aa] = s, Fa.copy(p), Fa.sub(n.target.matrixWorld.getPosition()), Fa.normalize(), I[N] = Fa.x, I[N + 1] = Fa.y, I[N + 2] = Fa.z, J[aa] = Math.cos(n.angle), fa[aa] = n.exponent, aa += 1)) : n instanceof THREE.HemisphereLight && (ba += 1, n.visible && (Fa.copy(n.matrixWorld.getPosition()), Fa.normalize(), 0 === Fa.x && 0 === Fa.y && 0 === Fa.z || (s = 3 * ia, W[s] = Fa.x, W[s + 1] = Fa.y, W[s + 2] = Fa.z, q = n.color, n = n.groundColor, M.gammaInput ? (p *= p, y(S, s, q, p), y(U, s, n, p)) : (F(S, s, q, p), F(U, s, n, p)), ia += 1))));
					c = 3 * X;
					for (f = Math.max(t.length, 3 * Da); c < f; c++) t[c] = 0;
					c = 3 * T;
					for (f = Math.max(x.length, 3 * ja); c < f; c++) x[c] = 0;
					c = 3 * aa;
					for (f = Math.max(B.length, 3 * ma); c < f; c++) B[c] = 0;
					c = 3 * ia;
					for (f = Math.max(S.length, 3 * ba); c < f; c++) S[c] = 0;
					c = 3 * ia;
					for (f = Math.max(U.length,
						3 * ba); c < f; c++) U[c] = 0;
					r.directional.length = X;
					r.point.length = T;
					r.spot.length = aa;
					r.hemi.length = ia;
					r.ambient[0] = k;
					r.ambient[1] = l;
					r.ambient[2] = m;
					sb = !1
				}
				c = pb;
				h.ambientLightColor.value = c.ambient;
				h.directionalLightColor.value = c.directional.colors;
				h.directionalLightDirection.value = c.directional.positions;
				h.pointLightColor.value = c.point.colors;
				h.pointLightPosition.value = c.point.positions;
				h.pointLightDistance.value = c.point.distances;
				h.spotLightColor.value = c.spot.colors;
				h.spotLightPosition.value = c.spot.positions;
				h.spotLightDistance.value = c.spot.distances;
				h.spotLightDirection.value = c.spot.directions;
				h.spotLightAngleCos.value = c.spot.anglesCos;
				h.spotLightExponent.value = c.spot.exponents;
				h.hemisphereLightSkyColor.value = c.hemi.skyColors;
				h.hemisphereLightGroundColor.value = c.hemi.groundColors;
				h.hemisphereLightDirection.value = c.hemi.positions
			}
			if (d instanceof THREE.MeshBasicMaterial || d instanceof THREE.MeshLambertMaterial || d instanceof THREE.MeshPhongMaterial)
			{
				h.opacity.value = d.opacity;
				M.gammaInput ? h.diffuse.value.copyGammaToLinear(d.color) :
					h.diffuse.value = d.color;
				h.map.value = d.map;
				h.lightMap.value = d.lightMap;
				h.specularMap.value = d.specularMap;
				d.bumpMap && (h.bumpMap.value = d.bumpMap, h.bumpScale.value = d.bumpScale);
				d.normalMap && (h.normalMap.value = d.normalMap, h.normalScale.value.copy(d.normalScale));
				var Z;
				d.map ? Z = d.map : d.specularMap ? Z = d.specularMap : d.normalMap ? Z = d.normalMap : d.bumpMap && (Z = d.bumpMap);
				void 0 !== Z && (c = Z.offset, Z = Z.repeat, h.offsetRepeat.value.set(c.x, c.y, Z.x, Z.y));
				h.envMap.value = d.envMap;
				h.flipEnvMap.value = d.envMap instanceof THREE.WebGLRenderTargetCube ?
					1 : -1;
				h.reflectivity.value = d.reflectivity;
				h.refractionRatio.value = d.refractionRatio;
				h.combine.value = d.combine;
				h.useRefract.value = d.envMap && d.envMap.mapping instanceof THREE.CubeRefractionMapping
			}
			d instanceof THREE.LineBasicMaterial ? (h.diffuse.value = d.color, h.opacity.value = d.opacity) : d instanceof THREE.LineDashedMaterial ? (h.diffuse.value = d.color, h.opacity.value = d.opacity, h.dashSize.value = d.dashSize, h.totalSize.value = d.dashSize + d.gapSize, h.scale.value = d.scale) : d instanceof THREE.ParticleBasicMaterial ?
				(h.psColor.value = d.color, h.opacity.value = d.opacity, h.size.value = d.size, h.scale.value = L.height / 2, h.map.value = d.map) : d instanceof THREE.MeshPhongMaterial ? (h.shininess.value = d.shininess, M.gammaInput ? (h.ambient.value.copyGammaToLinear(d.ambient), h.emissive.value.copyGammaToLinear(d.emissive), h.specular.value.copyGammaToLinear(d.specular)) : (h.ambient.value = d.ambient, h.emissive.value = d.emissive, h.specular.value = d.specular), d.wrapAround && h.wrapRGB.value.copy(d.wrapRGB)) : d instanceof THREE.MeshLambertMaterial ?
				(M.gammaInput ? (h.ambient.value.copyGammaToLinear(d.ambient), h.emissive.value.copyGammaToLinear(d.emissive)) : (h.ambient.value = d.ambient, h.emissive.value = d.emissive), d.wrapAround && h.wrapRGB.value.copy(d.wrapRGB)) : d instanceof THREE.MeshDepthMaterial ? (h.mNear.value = a.near, h.mFar.value = a.far, h.opacity.value = d.opacity) : d instanceof THREE.MeshNormalMaterial && (h.opacity.value = d.opacity);
			if (e.receiveShadow && !d._shadowPass && h.shadowMatrix)
			{
				c = Z = 0;
				for (f = b.length; c < f; c++)
					if (k = b[c], k.castShadow && (k instanceof THREE.SpotLight || k instanceof THREE.DirectionalLight && !k.shadowCascade)) h.shadowMap.value[Z] = k.shadowMap, h.shadowMapSize.value[Z] = k.shadowMapSize, h.shadowMatrix.value[Z] = k.shadowMatrix, h.shadowDarkness.value[Z] = k.shadowDarkness, h.shadowBias.value[Z] = k.shadowBias, Z++
			}
			b = d.uniformsList;
			h = 0;
			for (Z = b.length; h < Z; h++)
				if (f = g.uniforms[b[h][1]])
					if (c = b[h][0], l = c.type, k = c.value, "i" === l) j.uniform1i(f, k);
					else if ("f" === l) j.uniform1f(f, k);
			else if ("v2" === l) j.uniform2f(f, k.x, k.y);
			else if ("v3" === l) j.uniform3f(f, k.x,
				k.y, k.z);
			else if ("v4" === l) j.uniform4f(f, k.x, k.y, k.z, k.w);
			else if ("c" === l) j.uniform3f(f, k.r, k.g, k.b);
			else if ("iv1" === l) j.uniform1iv(f, k);
			else if ("iv" === l) j.uniform3iv(f, k);
			else if ("fv1" === l) j.uniform1fv(f, k);
			else if ("fv" === l) j.uniform3fv(f, k);
			else if ("v2v" === l)
			{
				void 0 === c._array && (c._array = new Float32Array(2 * k.length));
				l = 0;
				for (m = k.length; l < m; l++) r = 2 * l, c._array[r] = k[l].x, c._array[r + 1] = k[l].y;
				j.uniform2fv(f, c._array)
			}
			else if ("v3v" === l)
			{
				void 0 === c._array && (c._array = new Float32Array(3 * k.length));
				l = 0;
				for (m =
					k.length; l < m; l++) r = 3 * l, c._array[r] = k[l].x, c._array[r + 1] = k[l].y, c._array[r + 2] = k[l].z;
				j.uniform3fv(f, c._array)
			}
			else if ("v4v" === l)
			{
				void 0 === c._array && (c._array = new Float32Array(4 * k.length));
				l = 0;
				for (m = k.length; l < m; l++) r = 4 * l, c._array[r] = k[l].x, c._array[r + 1] = k[l].y, c._array[r + 2] = k[l].z, c._array[r + 3] = k[l].w;
				j.uniform4fv(f, c._array)
			}
			else if ("m4" === l) void 0 === c._array && (c._array = new Float32Array(16)), k.flattenToArray(c._array), j.uniformMatrix4fv(f, !1, c._array);
			else if ("m4v" === l)
			{
				void 0 === c._array && (c._array =
					new Float32Array(16 * k.length));
				l = 0;
				for (m = k.length; l < m; l++) k[l].flattenToArrayOffset(c._array, 16 * l);
				j.uniformMatrix4fv(f, !1, c._array)
			}
			else if ("t" === l)
			{
				if (r = k, k = H(), j.uniform1i(f, k), r)
					if (r.image instanceof Array && 6 === r.image.length)
					{
						if (c = r, f = k, 6 === c.image.length)
							if (c.needsUpdate)
							{
								c.image.__webglTextureCube || (c.image.__webglTextureCube = j.createTexture(), M.info.memory.textures++);
								j.activeTexture(j.TEXTURE0 + f);
								j.bindTexture(j.TEXTURE_CUBE_MAP, c.image.__webglTextureCube);
								j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,
									c.flipY);
								f = c instanceof THREE.CompressedTexture;
								k = [];
								for (l = 0; 6 > l; l++) M.autoScaleCubemaps && !f ? (m = k, r = l, t = c.image[l], x = ad, t.width <= x && t.height <= x || (z = Math.max(t.width, t.height), v = Math.floor(t.width * x / z), x = Math.floor(t.height * x / z), z = document.createElement("canvas"), z.width = v, z.height = x, z.getContext("2d")
									.drawImage(t, 0, 0, t.width, t.height, 0, 0, v, x), t = z), m[r] = t) : k[l] = c.image[l];
								l = k[0];
								m = 0 === (l.width & l.width - 1) && 0 === (l.height & l.height - 1);
								r = K(c.format);
								t = K(c.type);
								A(j.TEXTURE_CUBE_MAP, c, m);
								for (l = 0; 6 > l; l++)
									if (f)
									{
										x =
											k[l].mipmaps;
										z = 0;
										for (D = x.length; z < D; z++) v = x[z], j.compressedTexImage2D(j.TEXTURE_CUBE_MAP_POSITIVE_X + l, z, r, v.width, v.height, 0, v.data)
									}
								else j.texImage2D(j.TEXTURE_CUBE_MAP_POSITIVE_X + l, 0, r, r, t, k[l]);
								c.generateMipmaps && m && j.generateMipmap(j.TEXTURE_CUBE_MAP);
								c.needsUpdate = !1;
								if (c.onUpdate) c.onUpdate()
							}
						else j.activeTexture(j.TEXTURE0 + f), j.bindTexture(j.TEXTURE_CUBE_MAP, c.image.__webglTextureCube)
					}
				else r instanceof THREE.WebGLRenderTargetCube ? (c = r, j.activeTexture(j.TEXTURE0 + k), j.bindTexture(j.TEXTURE_CUBE_MAP,
					c.__webglTexture)) : M.setTexture(r, k)
			}
			else if ("tv" === l)
			{
				void 0 === c._array && (c._array = []);
				l = 0;
				for (m = c.value.length; l < m; l++) c._array[l] = H();
				j.uniform1iv(f, c._array);
				l = 0;
				for (m = c.value.length; l < m; l++) r = c.value[l], k = c._array[l], r && M.setTexture(r, k)
			}
			if ((d instanceof THREE.ShaderMaterial || d instanceof THREE.MeshPhongMaterial || d.envMap) && null !== i.cameraPosition) b = a.matrixWorld.getPosition(), j.uniform3f(i.cameraPosition, b.x, b.y, b.z);
			(d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial ||
				d instanceof THREE.ShaderMaterial || d.skinning) && null !== i.viewMatrix && j.uniformMatrix4fv(i.viewMatrix, !1, a.matrixWorldInverse.elements)
		}
		j.uniformMatrix4fv(i.modelViewMatrix, !1, e._modelViewMatrix.elements);
		i.normalMatrix && j.uniformMatrix3fv(i.normalMatrix, !1, e._normalMatrix.elements);
		null !== i.modelMatrix && j.uniformMatrix4fv(i.modelMatrix, !1, e.matrixWorld.elements);
		return g
	}

	function H()
	{
		var a = Ra;
		a >= Bc && console.warn("WebGLRenderer: trying to use " + a + " texture units while this GPU supports only " + Bc);
		Ra += 1;
		return a
	}

	function D(a, b)
	{
		a._modelViewMatrix.multiplyMatrices(b.matrixWorldInverse, a.matrixWorld);
		a._normalMatrix.getInverse(a._modelViewMatrix);
		a._normalMatrix.transpose()
	}

	function y(a, b, c, d)
	{
		a[b] = c.r * c.r * d;
		a[b + 1] = c.g * c.g * d;
		a[b + 2] = c.b * c.b * d
	}

	function F(a, b, c, d)
	{
		a[b] = c.r * d;
		a[b + 1] = c.g * d;
		a[b + 2] = c.b * d
	}

	function E(a, b, c)
	{
		yb !== a && (a ? j.enable(j.POLYGON_OFFSET_FILL) : j.disable(j.POLYGON_OFFSET_FILL), yb = a);
		if (a && (Cb !== b || Lb !== c)) j.polygonOffset(b, c), Cb = b, Lb = c
	}

	function G(a)
	{
		for (var a = a.split("\n"), b = 0, c =
			a.length; b < c; b++) a[b] = b + 1 + ": " + a[b];
		return a.join("\n")
	}

	function W(a, b)
	{
		var c;
		"fragment" === a ? c = j.createShader(j.FRAGMENT_SHADER) : "vertex" === a && (c = j.createShader(j.VERTEX_SHADER));
		j.shaderSource(c, b);
		j.compileShader(c);
		return !j.getShaderParameter(c, j.COMPILE_STATUS) ? (console.error(j.getShaderInfoLog(c)), console.error(G(b)), null) : c
	}

	function A(a, b, c)
	{
		c ? (j.texParameteri(a, j.TEXTURE_WRAP_S, K(b.wrapS)), j.texParameteri(a, j.TEXTURE_WRAP_T, K(b.wrapT)), j.texParameteri(a, j.TEXTURE_MAG_FILTER, K(b.magFilter)),
			j.texParameteri(a, j.TEXTURE_MIN_FILTER, K(b.minFilter))) : (j.texParameteri(a, j.TEXTURE_WRAP_S, j.CLAMP_TO_EDGE), j.texParameteri(a, j.TEXTURE_WRAP_T, j.CLAMP_TO_EDGE), j.texParameteri(a, j.TEXTURE_MAG_FILTER, B(b.magFilter)), j.texParameteri(a, j.TEXTURE_MIN_FILTER, B(b.minFilter)));
		if (Eb && b.type !== THREE.FloatType && (1 < b.anisotropy || b.__oldAnisotropy)) j.texParameterf(a, Eb.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(b.anisotropy, Jc)), b.__oldAnisotropy = b.anisotropy
	}

	function X(a, b)
	{
		j.bindRenderbuffer(j.RENDERBUFFER, a);
		b.depthBuffer &&
			!b.stencilBuffer ? (j.renderbufferStorage(j.RENDERBUFFER, j.DEPTH_COMPONENT16, b.width, b.height), j.framebufferRenderbuffer(j.FRAMEBUFFER, j.DEPTH_ATTACHMENT, j.RENDERBUFFER, a)) : b.depthBuffer && b.stencilBuffer ? (j.renderbufferStorage(j.RENDERBUFFER, j.DEPTH_STENCIL, b.width, b.height), j.framebufferRenderbuffer(j.FRAMEBUFFER, j.DEPTH_STENCIL_ATTACHMENT, j.RENDERBUFFER, a)) : j.renderbufferStorage(j.RENDERBUFFER, j.RGBA4, b.width, b.height)
	}

	function B(a)
	{
		return a === THREE.NearestFilter || a === THREE.NearestMipMapNearestFilter ||
			a === THREE.NearestMipMapLinearFilter ? j.NEAREST : j.LINEAR
	}

	function K(a)
	{
		if (a === THREE.RepeatWrapping) return j.REPEAT;
		if (a === THREE.ClampToEdgeWrapping) return j.CLAMP_TO_EDGE;
		if (a === THREE.MirroredRepeatWrapping) return j.MIRRORED_REPEAT;
		if (a === THREE.NearestFilter) return j.NEAREST;
		if (a === THREE.NearestMipMapNearestFilter) return j.NEAREST_MIPMAP_NEAREST;
		if (a === THREE.NearestMipMapLinearFilter) return j.NEAREST_MIPMAP_LINEAR;
		if (a === THREE.LinearFilter) return j.LINEAR;
		if (a === THREE.LinearMipMapNearestFilter) return j.LINEAR_MIPMAP_NEAREST;
		if (a === THREE.LinearMipMapLinearFilter) return j.LINEAR_MIPMAP_LINEAR;
		if (a === THREE.UnsignedByteType) return j.UNSIGNED_BYTE;
		if (a === THREE.UnsignedShort4444Type) return j.UNSIGNED_SHORT_4_4_4_4;
		if (a === THREE.UnsignedShort5551Type) return j.UNSIGNED_SHORT_5_5_5_1;
		if (a === THREE.UnsignedShort565Type) return j.UNSIGNED_SHORT_5_6_5;
		if (a === THREE.ByteType) return j.BYTE;
		if (a === THREE.ShortType) return j.SHORT;
		if (a === THREE.UnsignedShortType) return j.UNSIGNED_SHORT;
		if (a === THREE.IntType) return j.INT;
		if (a === THREE.UnsignedIntType) return j.UNSIGNED_INT;
		if (a === THREE.FloatType) return j.FLOAT;
		if (a === THREE.AlphaFormat) return j.ALPHA;
		if (a === THREE.RGBFormat) return j.RGB;
		if (a === THREE.RGBAFormat) return j.RGBA;
		if (a === THREE.LuminanceFormat) return j.LUMINANCE;
		if (a === THREE.LuminanceAlphaFormat) return j.LUMINANCE_ALPHA;
		if (a === THREE.AddEquation) return j.FUNC_ADD;
		if (a === THREE.SubtractEquation) return j.FUNC_SUBTRACT;
		if (a === THREE.ReverseSubtractEquation) return j.FUNC_REVERSE_SUBTRACT;
		if (a === THREE.ZeroFactor) return j.ZERO;
		if (a === THREE.OneFactor) return j.ONE;
		if (a ===
			THREE.SrcColorFactor) return j.SRC_COLOR;
		if (a === THREE.OneMinusSrcColorFactor) return j.ONE_MINUS_SRC_COLOR;
		if (a === THREE.SrcAlphaFactor) return j.SRC_ALPHA;
		if (a === THREE.OneMinusSrcAlphaFactor) return j.ONE_MINUS_SRC_ALPHA;
		if (a === THREE.DstAlphaFactor) return j.DST_ALPHA;
		if (a === THREE.OneMinusDstAlphaFactor) return j.ONE_MINUS_DST_ALPHA;
		if (a === THREE.DstColorFactor) return j.DST_COLOR;
		if (a === THREE.OneMinusDstColorFactor) return j.ONE_MINUS_DST_COLOR;
		if (a === THREE.SrcAlphaSaturateFactor) return j.SRC_ALPHA_SATURATE;
		if (void 0 !== Ab)
		{
			if (a === THREE.RGB_S3TC_DXT1_Format) return Ab.COMPRESSED_RGB_S3TC_DXT1_EXT;
			if (a === THREE.RGBA_S3TC_DXT1_Format) return Ab.COMPRESSED_RGBA_S3TC_DXT1_EXT;
			if (a === THREE.RGBA_S3TC_DXT3_Format) return Ab.COMPRESSED_RGBA_S3TC_DXT3_EXT;
			if (a === THREE.RGBA_S3TC_DXT5_Format) return Ab.COMPRESSED_RGBA_S3TC_DXT5_EXT
		}
		return 0
	}
	console.log("THREE.WebGLRenderer", THREE.REVISION);
	var a = a ||
		{},
		L = void 0 !== a.canvas ? a.canvas : document.createElement("canvas"),
		U = void 0 !== a.precision ? a.precision : "highp",
		aa = void 0 !==
		a.alpha ? a.alpha : !0,
		ba = void 0 !== a.premultipliedAlpha ? a.premultipliedAlpha : !0,
		xa = void 0 !== a.antialias ? a.antialias : !1,
		J = void 0 !== a.stencil ? a.stencil : !0,
		ha = void 0 !== a.preserveDrawingBuffer ? a.preserveDrawingBuffer : !1,
		ua = void 0 !== a.clearColor ? new THREE.Color(a.clearColor) : new THREE.Color(0),
		Oa = void 0 !== a.clearAlpha ? a.clearAlpha : 0;
	this.domElement = L;
	this.context = null;
	this.devicePixelRatio = void 0 !== a.devicePixelRatio ? a.devicePixelRatio : void 0 !== window.devicePixelRatio ? window.devicePixelRatio : 1;
	this.autoUpdateScene =
		this.autoUpdateObjects = this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0;
	this.shadowMapEnabled = this.physicallyBasedShading = this.gammaOutput = this.gammaInput = !1;
	this.shadowMapAutoUpdate = !0;
	this.shadowMapType = THREE.PCFShadowMap;
	this.shadowMapCullFace = THREE.CullFaceFront;
	this.shadowMapCascade = this.shadowMapDebug = !1;
	this.maxMorphTargets = 8;
	this.maxMorphNormals = 4;
	this.autoScaleCubemaps = !0;
	this.renderPluginsPre = [];
	this.renderPluginsPost = [];
	this.info = {
		memory:
		{
			programs: 0,
			geometries: 0,
			textures: 0
		},
		render:
		{
			calls: 0,
			vertices: 0,
			faces: 0,
			points: 0
		}
	};
	var M = this,
		fa = [],
		Da = 0,
		Aa = null,
		Ia = null,
		Ja = -1,
		ma = null,
		wa = null,
		Ta = 0,
		Ra = 0,
		ia = -1,
		ra = -1,
		ga = -1,
		Z = -1,
		pa = -1,
		gb = -1,
		hb = -1,
		Ea = -1,
		yb = null,
		Cb = null,
		Lb = null,
		Ua = null,
		na = 0,
		Ya = 0,
		Db = 0,
		nb = 0,
		kc = 0,
		Mb = 0,
		ib = {},
		zb = new THREE.Frustum,
		Ob = new THREE.Matrix4,
		rc = new THREE.Matrix4,
		ob = new THREE.Vector3,
		Fa = new THREE.Vector3,
		sb = !0,
		pb = {
			ambient: [0, 0, 0],
			directional:
			{
				length: 0,
				colors: [],
				positions: []
			},
			point:
			{
				length: 0,
				colors: [],
				positions: [],
				distances: []
			},
			spot:
			{
				length: 0,
				colors: [],
				positions: [],
				distances: [],
				directions: [],
				anglesCos: [],
				exponents: []
			},
			hemi:
			{
				length: 0,
				skyColors: [],
				groundColors: [],
				positions: []
			}
		},
		j, lc, sc, Eb, Ab;
	try
	{
		if (!(j = L.getContext("experimental-webgl",
		{
			alpha: aa,
			premultipliedAlpha: ba,
			antialias: xa,
			stencil: J,
			preserveDrawingBuffer: ha
		}))) throw "Error creating WebGL context.";
	}
	catch (bd)
	{
		console.error(bd)
	}
	lc = j.getExtension("OES_texture_float");
	sc = j.getExtension("OES_standard_derivatives");
	Eb = j.getExtension("EXT_texture_filter_anisotropic") || j.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
		j.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
	Ab = j.getExtension("WEBGL_compressed_texture_s3tc") || j.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || j.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
	lc || console.log("THREE.WebGLRenderer: Float textures not supported.");
	sc || console.log("THREE.WebGLRenderer: Standard derivatives not supported.");
	Eb || console.log("THREE.WebGLRenderer: Anisotropic texture filtering not supported.");
	Ab || console.log("THREE.WebGLRenderer: S3TC compressed textures not supported.");
	j.clearColor(0, 0, 0, 1);
	j.clearDepth(1);
	j.clearStencil(0);
	j.enable(j.DEPTH_TEST);
	j.depthFunc(j.LEQUAL);
	j.frontFace(j.CCW);
	j.cullFace(j.BACK);
	j.enable(j.CULL_FACE);
	j.enable(j.BLEND);
	j.blendEquation(j.FUNC_ADD);
	j.blendFunc(j.SRC_ALPHA, j.ONE_MINUS_SRC_ALPHA);
	j.clearColor(ua.r, ua.g, ua.b, Oa);
	this.context = j;
	var Bc = j.getParameter(j.MAX_TEXTURE_IMAGE_UNITS),
		$c = j.getParameter(j.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
	j.getParameter(j.MAX_TEXTURE_SIZE);
	var ad = j.getParameter(j.MAX_CUBE_MAP_TEXTURE_SIZE),
		Jc = Eb ? j.getParameter(Eb.MAX_TEXTURE_MAX_ANISOTROPY_EXT) :
		0,
		jb = 0 < $c,
		cb = jb && lc;
	Ab && j.getParameter(j.COMPRESSED_TEXTURE_FORMATS);
	var kb = j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.HIGH_FLOAT),
		cd = j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.MEDIUM_FLOAT);
	j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.LOW_FLOAT);
	var Nb = j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.HIGH_FLOAT),
		S = j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.MEDIUM_FLOAT);
	j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.LOW_FLOAT);
	j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.HIGH_INT);
	j.getShaderPrecisionFormat(j.VERTEX_SHADER,
		j.MEDIUM_INT);
	j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.LOW_INT);
	j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.HIGH_INT);
	j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.MEDIUM_INT);
	j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.LOW_INT);
	var T = 0 < kb.precision && 0 < Nb.precision,
		ja = 0 < cd.precision && 0 < S.precision;
	"highp" === U && !T && (ja ? (U = "mediump", console.warn("WebGLRenderer: highp not supported, using mediump")) : (U = "lowp", console.warn("WebGLRenderer: highp and mediump not supported, using lowp")));
	"mediump" ===
	U && !ja && (U = "lowp", console.warn("WebGLRenderer: mediump not supported, using lowp"));
	this.getContext = function()
	{
		return j
	};
	this.supportsVertexTextures = function()
	{
		return jb
	};
	this.supportsFloatTextures = function()
	{
		return lc
	};
	this.supportsStandardDerivatives = function()
	{
		return sc
	};
	this.supportsCompressedTextureS3TC = function()
	{
		return Ab
	};
	this.getMaxAnisotropy = function()
	{
		return Jc
	};
	this.getPrecision = function()
	{
		return U
	};
	this.setSize = function(a, b)
	{
		L.width = a * this.devicePixelRatio;
		L.height = b * this.devicePixelRatio;
		L.style.width = a + "px";
		L.style.height = b + "px";
		this.setViewport(0, 0, L.width, L.height)
	};
	this.setViewport = function(a, b, c, d)
	{
		na = void 0 !== a ? a : 0;
		Ya = void 0 !== b ? b : 0;
		Db = void 0 !== c ? c : L.width;
		nb = void 0 !== d ? d : L.height;
		j.viewport(na, Ya, Db, nb)
	};
	this.setScissor = function(a, b, c, d)
	{
		j.scissor(a, b, c, d)
	};
	this.enableScissorTest = function(a)
	{
		a ? j.enable(j.SCISSOR_TEST) : j.disable(j.SCISSOR_TEST)
	};
	this.setClearColorHex = function(a, b)
	{
		ua.setHex(a);
		Oa = b;
		j.clearColor(ua.r, ua.g, ua.b, Oa)
	};
	this.setClearColor = function(a, b)
	{
		ua.copy(a);
		Oa = b;
		j.clearColor(ua.r, ua.g, ua.b, Oa)
	};
	this.getClearColor = function()
	{
		return ua
	};
	this.getClearAlpha = function()
	{
		return Oa
	};
	this.clear = function(a, b, c)
	{
		var d = 0;
		if (void 0 === a || a) d |= j.COLOR_BUFFER_BIT;
		if (void 0 === b || b) d |= j.DEPTH_BUFFER_BIT;
		if (void 0 === c || c) d |= j.STENCIL_BUFFER_BIT;
		j.clear(d)
	};
	this.clearTarget = function(a, b, c, d)
	{
		this.setRenderTarget(a);
		this.clear(b, c, d)
	};
	this.addPostPlugin = function(a)
	{
		a.init(this);
		this.renderPluginsPost.push(a)
	};
	this.addPrePlugin = function(a)
	{
		a.init(this);
		this.renderPluginsPre.push(a)
	};
	this.updateShadowMap = function(a, b)
	{
		Aa = null;
		Ja = ma = Ea = hb = ga = -1;
		sb = !0;
		ra = ia = -1;
		this.shadowMapPlugin.update(a, b)
	};
	var Za = function(a)
		{
			a = a.target;
			a.removeEventListener("dispose", Za);
			a.__webglInit = void 0;
			void 0 !== a.__webglVertexBuffer && j.deleteBuffer(a.__webglVertexBuffer);
			void 0 !== a.__webglNormalBuffer && j.deleteBuffer(a.__webglNormalBuffer);
			void 0 !== a.__webglTangentBuffer && j.deleteBuffer(a.__webglTangentBuffer);
			void 0 !== a.__webglColorBuffer && j.deleteBuffer(a.__webglColorBuffer);
			void 0 !== a.__webglUVBuffer &&
				j.deleteBuffer(a.__webglUVBuffer);
			void 0 !== a.__webglUV2Buffer && j.deleteBuffer(a.__webglUV2Buffer);
			void 0 !== a.__webglSkinIndicesBuffer && j.deleteBuffer(a.__webglSkinIndicesBuffer);
			void 0 !== a.__webglSkinWeightsBuffer && j.deleteBuffer(a.__webglSkinWeightsBuffer);
			void 0 !== a.__webglFaceBuffer && j.deleteBuffer(a.__webglFaceBuffer);
			void 0 !== a.__webglLineBuffer && j.deleteBuffer(a.__webglLineBuffer);
			void 0 !== a.__webglLineDistanceBuffer && j.deleteBuffer(a.__webglLineDistanceBuffer);
			if (void 0 !== a.geometryGroups)
				for (var c in a.geometryGroups)
				{
					var d =
						a.geometryGroups[c];
					if (void 0 !== d.numMorphTargets)
						for (var e = 0, f = d.numMorphTargets; e < f; e++) j.deleteBuffer(d.__webglMorphTargetsBuffers[e]);
					if (void 0 !== d.numMorphNormals)
					{
						e = 0;
						for (f = d.numMorphNormals; e < f; e++) j.deleteBuffer(d.__webglMorphNormalsBuffers[e])
					}
					b(d)
				}
			b(a);
			M.info.memory.geometries--
		},
		Va = function(a)
		{
			a = a.target;
			a.removeEventListener("dispose", Va);
			a.image && a.image.__webglTextureCube ? j.deleteTexture(a.image.__webglTextureCube) : a.__webglInit && (a.__webglInit = !1, j.deleteTexture(a.__webglTexture));
			M.info.memory.textures--
		},
		$a = function(a)
		{
			a = a.target;
			a.removeEventListener("dispose", $a);
			if (a && a.__webglTexture)
				if (j.deleteTexture(a.__webglTexture), a instanceof THREE.WebGLRenderTargetCube)
					for (var b = 0; 6 > b; b++) j.deleteFramebuffer(a.__webglFramebuffer[b]), j.deleteRenderbuffer(a.__webglRenderbuffer[b]);
				else j.deleteFramebuffer(a.__webglFramebuffer), j.deleteRenderbuffer(a.__webglRenderbuffer);
			M.info.memory.textures--
		},
		Wa = function(a)
		{
			a = a.target;
			a.removeEventListener("dispose", Wa);
			Pa(a)
		},
		Pa = function(a)
		{
			var b =
				a.program;
			if (void 0 !== b)
			{
				a.program = void 0;
				var c, d, e = !1,
					a = 0;
				for (c = fa.length; a < c; a++)
					if (d = fa[a], d.program === b)
					{
						d.usedTimes--;
						0 === d.usedTimes && (e = !0);
						break
					} if (!0 === e)
				{
					e = [];
					a = 0;
					for (c = fa.length; a < c; a++) d = fa[a], d.program !== b && e.push(d);
					fa = e;
					j.deleteProgram(b);
					M.info.memory.programs--
				}
			}
		};
	this.renderBufferImmediate = function(a, b, c)
	{
		a.hasPositions && !a.__webglVertexBuffer && (a.__webglVertexBuffer = j.createBuffer());
		a.hasNormals && !a.__webglNormalBuffer && (a.__webglNormalBuffer = j.createBuffer());
		a.hasUvs && !a.__webglUvBuffer &&
			(a.__webglUvBuffer = j.createBuffer());
		a.hasColors && !a.__webglColorBuffer && (a.__webglColorBuffer = j.createBuffer());
		a.hasPositions && (j.bindBuffer(j.ARRAY_BUFFER, a.__webglVertexBuffer), j.bufferData(j.ARRAY_BUFFER, a.positionArray, j.DYNAMIC_DRAW), j.enableVertexAttribArray(b.attributes.position), j.vertexAttribPointer(b.attributes.position, 3, j.FLOAT, !1, 0, 0));
		if (a.hasNormals)
		{
			j.bindBuffer(j.ARRAY_BUFFER, a.__webglNormalBuffer);
			if (c.shading === THREE.FlatShading)
			{
				var d, e, f, g, h, i, k, l, n, m, p, q = 3 * a.count;
				for (p = 0; p <
					q; p += 9) m = a.normalArray, d = m[p], e = m[p + 1], f = m[p + 2], g = m[p + 3], i = m[p + 4], l = m[p + 5], h = m[p + 6], k = m[p + 7], n = m[p + 8], d = (d + g + h) / 3, e = (e + i + k) / 3, f = (f + l + n) / 3, m[p] = d, m[p + 1] = e, m[p + 2] = f, m[p + 3] = d, m[p + 4] = e, m[p + 5] = f, m[p + 6] = d, m[p + 7] = e, m[p + 8] = f
			}
			j.bufferData(j.ARRAY_BUFFER, a.normalArray, j.DYNAMIC_DRAW);
			j.enableVertexAttribArray(b.attributes.normal);
			j.vertexAttribPointer(b.attributes.normal, 3, j.FLOAT, !1, 0, 0)
		}
		a.hasUvs && c.map && (j.bindBuffer(j.ARRAY_BUFFER, a.__webglUvBuffer), j.bufferData(j.ARRAY_BUFFER, a.uvArray, j.DYNAMIC_DRAW),
			j.enableVertexAttribArray(b.attributes.uv), j.vertexAttribPointer(b.attributes.uv, 2, j.FLOAT, !1, 0, 0));
		a.hasColors && c.vertexColors !== THREE.NoColors && (j.bindBuffer(j.ARRAY_BUFFER, a.__webglColorBuffer), j.bufferData(j.ARRAY_BUFFER, a.colorArray, j.DYNAMIC_DRAW), j.enableVertexAttribArray(b.attributes.color), j.vertexAttribPointer(b.attributes.color, 3, j.FLOAT, !1, 0, 0));
		j.drawArrays(j.TRIANGLES, 0, a.count);
		a.count = 0
	};
	this.renderBufferDirect = function(a, b, c, d, e, f)
	{
		if (!1 !== d.visible)
			if (c = I(a, b, c, d, f), a = c.attributes,
				b = !1, d = 16777215 * e.id + 2 * c.id + (d.wireframe ? 1 : 0), d !== ma && (ma = d, b = !0), b && l(), f instanceof THREE.Mesh)
				if (f = e.attributes.index)
				{
					d = e.offsets;
					1 < d.length && (b = !0);
					for (var c = 0, g = d.length; c < g; c++)
					{
						var h = d[c].index;
						if (b)
						{
							var i = e.attributes.position,
								n = i.itemSize;
							j.bindBuffer(j.ARRAY_BUFFER, i.buffer);
							k(a.position);
							j.vertexAttribPointer(a.position, n, j.FLOAT, !1, 0, 4 * h * n);
							n = e.attributes.normal;
							if (0 <= a.normal && n)
							{
								var m = n.itemSize;
								j.bindBuffer(j.ARRAY_BUFFER, n.buffer);
								k(a.normal);
								j.vertexAttribPointer(a.normal, m, j.FLOAT,
									!1, 0, 4 * h * m)
							}
							n = e.attributes.uv;
							0 <= a.uv && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER, n.buffer), k(a.uv), j.vertexAttribPointer(a.uv, m, j.FLOAT, !1, 0, 4 * h * m));
							n = e.attributes.color;
							0 <= a.color && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER, n.buffer), k(a.color), j.vertexAttribPointer(a.color, m, j.FLOAT, !1, 0, 4 * h * m));
							n = e.attributes.tangent;
							0 <= a.tangent && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER, n.buffer), k(a.tangent), j.vertexAttribPointer(a.tangent, m, j.FLOAT, !1, 0, 4 * h * m));
							j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, f.buffer)
						}
						j.drawElements(j.TRIANGLES,
							d[c].count, j.UNSIGNED_SHORT, 2 * d[c].start);
						M.info.render.calls++;
						M.info.render.vertices += d[c].count;
						M.info.render.faces += d[c].count / 3
					}
				}
		else b && (i = e.attributes.position, n = i.itemSize, j.bindBuffer(j.ARRAY_BUFFER, i.buffer), k(a.position), j.vertexAttribPointer(a.position, n, j.FLOAT, !1, 0, 0), n = e.attributes.normal, 0 <= a.normal && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER, n.buffer), k(a.normal), j.vertexAttribPointer(a.normal, m, j.FLOAT, !1, 0, 0)), n = e.attributes.uv, 0 <= a.uv && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER,
				n.buffer), k(a.uv), j.vertexAttribPointer(a.uv, m, j.FLOAT, !1, 0, 0)), n = e.attributes.color, 0 <= a.color && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER, n.buffer), k(a.color), j.vertexAttribPointer(a.color, m, j.FLOAT, !1, 0, 0)), n = e.attributes.tangent, 0 <= a.tangent && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER, n.buffer), k(a.tangent), j.vertexAttribPointer(a.tangent, m, j.FLOAT, !1, 0, 0))), j.drawArrays(j.TRIANGLES, 0, i.numItems / 3), M.info.render.calls++, M.info.render.vertices += i.numItems / 3, M.info.render.faces += i.numItems /
			3 / 3;
		else f instanceof THREE.ParticleSystem ? b && (i = e.attributes.position, n = i.itemSize, j.bindBuffer(j.ARRAY_BUFFER, i.buffer), k(a.position), j.vertexAttribPointer(a.position, n, j.FLOAT, !1, 0, 0), n = e.attributes.color, 0 <= a.color && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER, n.buffer), k(a.color), j.vertexAttribPointer(a.color, m, j.FLOAT, !1, 0, 0)), j.drawArrays(j.POINTS, 0, i.numItems / 3), M.info.render.calls++, M.info.render.points += i.numItems / 3) : f instanceof THREE.Line && b && (i = e.attributes.position, n = i.itemSize, j.bindBuffer(j.ARRAY_BUFFER,
			i.buffer), k(a.position), j.vertexAttribPointer(a.position, n, j.FLOAT, !1, 0, 0), n = e.attributes.color, 0 <= a.color && n && (m = n.itemSize, j.bindBuffer(j.ARRAY_BUFFER, n.buffer), k(a.color), j.vertexAttribPointer(a.color, m, j.FLOAT, !1, 0, 0)), j.drawArrays(j.LINE_STRIP, 0, i.numItems / 3), M.info.render.calls++, M.info.render.points += i.numItems)
	};
	this.renderBuffer = function(a, b, c, d, e, f)
	{
		if (!1 !== d.visible)
		{
			var g, h, c = I(a, b, c, d, f),
				b = c.attributes,
				a = !1,
				c = 16777215 * e.id + 2 * c.id + (d.wireframe ? 1 : 0);
			c !== ma && (ma = c, a = !0);
			a && l();
			if (!d.morphTargets &&
				0 <= b.position) a && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglVertexBuffer), k(b.position), j.vertexAttribPointer(b.position, 3, j.FLOAT, !1, 0, 0));
			else if (f.morphTargetBase)
			{
				c = d.program.attributes; - 1 !== f.morphTargetBase && 0 <= c.position ? (j.bindBuffer(j.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[f.morphTargetBase]), k(c.position), j.vertexAttribPointer(c.position, 3, j.FLOAT, !1, 0, 0)) : 0 <= c.position && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglVertexBuffer), k(c.position), j.vertexAttribPointer(c.position, 3, j.FLOAT, !1, 0, 0));
				if (f.morphTargetForcedOrder.length)
				{
					var i =
						0;
					h = f.morphTargetForcedOrder;
					for (g = f.morphTargetInfluences; i < d.numSupportedMorphTargets && i < h.length;) 0 <= c["morphTarget" + i] && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[h[i]]), k(c["morphTarget" + i]), j.vertexAttribPointer(c["morphTarget" + i], 3, j.FLOAT, !1, 0, 0)), 0 <= c["morphNormal" + i] && d.morphNormals && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[h[i]]), k(c["morphNormal" + i]), j.vertexAttribPointer(c["morphNormal" + i], 3, j.FLOAT, !1, 0, 0)), f.__webglMorphTargetInfluences[i] = g[h[i]], i++
				}
				else
				{
					h = [];
					g = f.morphTargetInfluences;
					var m, p = g.length;
					for (m = 0; m < p; m++) i = g[m], 0 < i && h.push([i, m]);
					h.length > d.numSupportedMorphTargets ? (h.sort(n), h.length = d.numSupportedMorphTargets) : h.length > d.numSupportedMorphNormals ? h.sort(n) : 0 === h.length && h.push([0, 0]);
					for (i = 0; i < d.numSupportedMorphTargets;) h[i] ? (m = h[i][1], 0 <= c["morphTarget" + i] && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[m]), k(c["morphTarget" + i]), j.vertexAttribPointer(c["morphTarget" + i], 3, j.FLOAT, !1, 0, 0)), 0 <= c["morphNormal" + i] && d.morphNormals &&
						(j.bindBuffer(j.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[m]), k(c["morphNormal" + i]), j.vertexAttribPointer(c["morphNormal" + i], 3, j.FLOAT, !1, 0, 0)), f.__webglMorphTargetInfluences[i] = g[m]) : f.__webglMorphTargetInfluences[i] = 0, i++
				}
				null !== d.program.uniforms.morphTargetInfluences && j.uniform1fv(d.program.uniforms.morphTargetInfluences, f.__webglMorphTargetInfluences)
			}
			if (a)
			{
				if (e.__webglCustomAttributesList)
				{
					g = 0;
					for (h = e.__webglCustomAttributesList.length; g < h; g++) c = e.__webglCustomAttributesList[g], 0 <= b[c.buffer.belongsToAttribute] &&
						(j.bindBuffer(j.ARRAY_BUFFER, c.buffer), k(b[c.buffer.belongsToAttribute]), j.vertexAttribPointer(b[c.buffer.belongsToAttribute], c.size, j.FLOAT, !1, 0, 0))
				}
				0 <= b.color && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglColorBuffer), k(b.color), j.vertexAttribPointer(b.color, 3, j.FLOAT, !1, 0, 0));
				0 <= b.normal && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglNormalBuffer), k(b.normal), j.vertexAttribPointer(b.normal, 3, j.FLOAT, !1, 0, 0));
				0 <= b.tangent && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglTangentBuffer), k(b.tangent), j.vertexAttribPointer(b.tangent,
					4, j.FLOAT, !1, 0, 0));
				0 <= b.uv && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglUVBuffer), k(b.uv), j.vertexAttribPointer(b.uv, 2, j.FLOAT, !1, 0, 0));
				0 <= b.uv2 && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglUV2Buffer), k(b.uv2), j.vertexAttribPointer(b.uv2, 2, j.FLOAT, !1, 0, 0));
				d.skinning && (0 <= b.skinIndex && 0 <= b.skinWeight) && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglSkinIndicesBuffer), k(b.skinIndex), j.vertexAttribPointer(b.skinIndex, 4, j.FLOAT, !1, 0, 0), j.bindBuffer(j.ARRAY_BUFFER, e.__webglSkinWeightsBuffer), k(b.skinWeight), j.vertexAttribPointer(b.skinWeight,
					4, j.FLOAT, !1, 0, 0));
				0 <= b.lineDistance && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglLineDistanceBuffer), k(b.lineDistance), j.vertexAttribPointer(b.lineDistance, 1, j.FLOAT, !1, 0, 0))
			}
			f instanceof THREE.Mesh ? (d.wireframe ? (d = d.wireframeLinewidth, d !== Ua && (j.lineWidth(d), Ua = d), a && j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, e.__webglLineBuffer), j.drawElements(j.LINES, e.__webglLineCount, j.UNSIGNED_SHORT, 0)) : (a && j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, e.__webglFaceBuffer), j.drawElements(j.TRIANGLES, e.__webglFaceCount, j.UNSIGNED_SHORT,
				0)), M.info.render.calls++, M.info.render.vertices += e.__webglFaceCount, M.info.render.faces += e.__webglFaceCount / 3) : f instanceof THREE.Line ? (f = f.type === THREE.LineStrip ? j.LINE_STRIP : j.LINES, d = d.linewidth, d !== Ua && (j.lineWidth(d), Ua = d), j.drawArrays(f, 0, e.__webglLineCount), M.info.render.calls++) : f instanceof THREE.ParticleSystem ? (j.drawArrays(j.POINTS, 0, e.__webglParticleCount), M.info.render.calls++, M.info.render.points += e.__webglParticleCount) : f instanceof THREE.Ribbon && (j.drawArrays(j.TRIANGLE_STRIP, 0, e.__webglVertexCount),
				M.info.render.calls++)
		}
	};
	this.render = function(a, b, c, d)
	{
		if (!1 === b instanceof THREE.Camera) console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
		else
		{
			var e, f, g, h, i = a.__lights,
				k = a.fog;
			Ja = -1;
			sb = !0;
			this.autoUpdateScene && a.updateMatrixWorld();
			void 0 === b.parent && b.updateMatrixWorld();
			b.matrixWorldInverse.getInverse(b.matrixWorld);
			Ob.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse);
			zb.setFromMatrix(Ob);
			this.autoUpdateObjects && this.initWebGLObjects(a);
			r(this.renderPluginsPre,
				a, b);
			M.info.render.calls = 0;
			M.info.render.vertices = 0;
			M.info.render.faces = 0;
			M.info.render.points = 0;
			this.setRenderTarget(c);
			(this.autoClear || d) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil);
			h = a.__webglObjects;
			d = 0;
			for (e = h.length; d < e; d++)
				if (f = h[d], g = f.object, f.render = !1, g.visible && (!(g instanceof THREE.Mesh || g instanceof THREE.ParticleSystem) || !g.frustumCulled || zb.intersectsObject(g)))
				{
					D(g, b);
					var n = f,
						l = n.buffer,
						s = void 0,
						t = s = void 0,
						t = n.object.material;
					if (t instanceof THREE.MeshFaceMaterial) s =
						l.materialIndex, s = t.materials[s], s.transparent ? (n.transparent = s, n.opaque = null) : (n.opaque = s, n.transparent = null);
					else if (s = t) s.transparent ? (n.transparent = s, n.opaque = null) : (n.opaque = s, n.transparent = null);
					f.render = !0;
					!0 === this.sortObjects && (null !== g.renderDepth ? f.z = g.renderDepth : (ob.copy(g.matrixWorld.getPosition()), ob.applyProjection(Ob), f.z = ob.z), f.id = g.id)
				} this.sortObjects && h.sort(m);
			h = a.__webglObjectsImmediate;
			d = 0;
			for (e = h.length; d < e; d++) f = h[d], g = f.object, g.visible && (D(g, b), g = f.object.material, g.transparent ?
				(f.transparent = g, f.opaque = null) : (f.opaque = g, f.transparent = null));
			a.overrideMaterial ? (d = a.overrideMaterial, this.setBlending(d.blending, d.blendEquation, d.blendSrc, d.blendDst), this.setDepthTest(d.depthTest), this.setDepthWrite(d.depthWrite), E(d.polygonOffset, d.polygonOffsetFactor, d.polygonOffsetUnits), p(a.__webglObjects, !1, "", b, i, k, !0, d), q(a.__webglObjectsImmediate, "", b, i, k, !1, d)) : (d = null, this.setBlending(THREE.NoBlending), p(a.__webglObjects, !0, "opaque", b, i, k, !1, d), q(a.__webglObjectsImmediate, "opaque",
				b, i, k, !1, d), p(a.__webglObjects, !1, "transparent", b, i, k, !0, d), q(a.__webglObjectsImmediate, "transparent", b, i, k, !0, d));
			r(this.renderPluginsPost, a, b);
			c && (c.generateMipmaps && c.minFilter !== THREE.NearestFilter && c.minFilter !== THREE.LinearFilter) && (c instanceof THREE.WebGLRenderTargetCube ? (j.bindTexture(j.TEXTURE_CUBE_MAP, c.__webglTexture), j.generateMipmap(j.TEXTURE_CUBE_MAP), j.bindTexture(j.TEXTURE_CUBE_MAP, null)) : (j.bindTexture(j.TEXTURE_2D, c.__webglTexture), j.generateMipmap(j.TEXTURE_2D), j.bindTexture(j.TEXTURE_2D,
				null)));
			this.setDepthTest(!0);
			this.setDepthWrite(!0)
		}
	};
	this.renderImmediateObject = function(a, b, c, d, e)
	{
		var f = I(a, b, c, d, e);
		ma = -1;
		M.setMaterialFaces(d);
		e.immediateRenderCallback ? e.immediateRenderCallback(f, j, zb) : e.render(function(a)
		{
			M.renderBufferImmediate(a, f, d)
		})
	};
	this.initWebGLObjects = function(a)
	{
		a.__webglObjects || (a.__webglObjects = [], a.__webglObjectsImmediate = [], a.__webglSprites = [], a.__webglFlares = []);
		for (; a.__objectsAdded.length;)
		{
			var b = a.__objectsAdded[0],
				k = a,
				l = void 0,
				m = void 0,
				p = void 0,
				q = void 0;
			if (!b.__webglInit)
				if (b.__webglInit = !0, b._modelViewMatrix = new THREE.Matrix4, b._normalMatrix = new THREE.Matrix3, void 0 !== b.geometry && void 0 === b.geometry.__webglInit && (b.geometry.__webglInit = !0, b.geometry.addEventListener("dispose", Za)), b instanceof THREE.Mesh)
					if (m = b.geometry, p = b.material, m instanceof THREE.Geometry)
					{
						if (void 0 === m.geometryGroups)
						{
							var r = m,
								y = void 0,
								A = void 0,
								D = void 0,
								B = void 0,
								F = void 0,
								E = void 0,
								G = {},
								H = r.morphTargets.length,
								I = r.morphNormals.length,
								K = p instanceof THREE.MeshFaceMaterial;
							r.geometryGroups = {};
							y = 0;
							for (A = r.faces.length; y < A; y++) D = r.faces[y], B = K ? D.materialIndex : 0, void 0 === G[B] && (G[B] = {
								hash: B,
								counter: 0
							}), E = G[B].hash + "_" + G[B].counter, void 0 === r.geometryGroups[E] && (r.geometryGroups[E] = {
								faces3: [],
								faces4: [],
								materialIndex: B,
								vertices: 0,
								numMorphTargets: H,
								numMorphNormals: I
							}), F = D instanceof THREE.Face3 ? 3 : 4, 65535 < r.geometryGroups[E].vertices + F && (G[B].counter += 1, E = G[B].hash + "_" + G[B].counter, void 0 === r.geometryGroups[E] && (r.geometryGroups[E] = {
								faces3: [],
								faces4: [],
								materialIndex: B,
								vertices: 0,
								numMorphTargets: H,
								numMorphNormals: I
							})), D instanceof THREE.Face3 ? r.geometryGroups[E].faces3.push(y) : r.geometryGroups[E].faces4.push(y), r.geometryGroups[E].vertices += F;
							r.geometryGroupsList = [];
							var L = void 0;
							for (L in r.geometryGroups) r.geometryGroups[L].id = Ta++, r.geometryGroupsList.push(r.geometryGroups[L])
						}
						for (l in m.geometryGroups)
							if (q = m.geometryGroups[l], !q.__webglVertexBuffer)
							{
								var J = q;
								J.__webglVertexBuffer = j.createBuffer();
								J.__webglNormalBuffer = j.createBuffer();
								J.__webglTangentBuffer = j.createBuffer();
								J.__webglColorBuffer =
									j.createBuffer();
								J.__webglUVBuffer = j.createBuffer();
								J.__webglUV2Buffer = j.createBuffer();
								J.__webglSkinIndicesBuffer = j.createBuffer();
								J.__webglSkinWeightsBuffer = j.createBuffer();
								J.__webglFaceBuffer = j.createBuffer();
								J.__webglLineBuffer = j.createBuffer();
								var fa = void 0,
									S = void 0;
								if (J.numMorphTargets)
								{
									J.__webglMorphTargetsBuffers = [];
									fa = 0;
									for (S = J.numMorphTargets; fa < S; fa++) J.__webglMorphTargetsBuffers.push(j.createBuffer())
								}
								if (J.numMorphNormals)
								{
									J.__webglMorphNormalsBuffers = [];
									fa = 0;
									for (S = J.numMorphNormals; fa <
										S; fa++) J.__webglMorphNormalsBuffers.push(j.createBuffer())
								}
								M.info.memory.geometries++;
								d(q, b);
								m.verticesNeedUpdate = !0;
								m.morphTargetsNeedUpdate = !0;
								m.elementsNeedUpdate = !0;
								m.uvsNeedUpdate = !0;
								m.normalsNeedUpdate = !0;
								m.tangentsNeedUpdate = !0;
								m.colorsNeedUpdate = !0
							}
					}
			else m instanceof THREE.BufferGeometry && i(m);
			else if (b instanceof THREE.Ribbon)
			{
				if (m = b.geometry, !m.__webglVertexBuffer)
				{
					var U = m;
					U.__webglVertexBuffer = j.createBuffer();
					U.__webglColorBuffer = j.createBuffer();
					U.__webglNormalBuffer = j.createBuffer();
					M.info.memory.geometries++;
					var T = m,
						X = b,
						W = T.vertices.length;
					T.__vertexArray = new Float32Array(3 * W);
					T.__colorArray = new Float32Array(3 * W);
					T.__normalArray = new Float32Array(3 * W);
					T.__webglVertexCount = W;
					c(T, X);
					m.verticesNeedUpdate = !0;
					m.colorsNeedUpdate = !0;
					m.normalsNeedUpdate = !0
				}
			}
			else if (b instanceof THREE.Line)
			{
				if (m = b.geometry, !m.__webglVertexBuffer)
					if (m instanceof THREE.Geometry)
					{
						var Z = m;
						Z.__webglVertexBuffer = j.createBuffer();
						Z.__webglColorBuffer = j.createBuffer();
						Z.__webglLineDistanceBuffer = j.createBuffer();
						M.info.memory.geometries++;
						var aa = m,
							ia = b,
							Aa = aa.vertices.length;
						aa.__vertexArray = new Float32Array(3 * Aa);
						aa.__colorArray = new Float32Array(3 * Aa);
						aa.__lineDistanceArray = new Float32Array(1 * Aa);
						aa.__webglLineCount = Aa;
						c(aa, ia);
						m.verticesNeedUpdate = !0;
						m.colorsNeedUpdate = !0;
						m.lineDistancesNeedUpdate = !0
					}
				else m instanceof THREE.BufferGeometry && i(m)
			}
			else if (b instanceof THREE.ParticleSystem && (m = b.geometry, !m.__webglVertexBuffer))
				if (m instanceof THREE.Geometry)
				{
					var wa = m;
					wa.__webglVertexBuffer = j.createBuffer();
					wa.__webglColorBuffer = j.createBuffer();
					M.info.memory.geometries++;
					var Da = m,
						ja = b,
						ma = Da.vertices.length;
					Da.__vertexArray = new Float32Array(3 * ma);
					Da.__colorArray = new Float32Array(3 * ma);
					Da.__sortArray = [];
					Da.__webglParticleCount = ma;
					c(Da, ja);
					m.verticesNeedUpdate = !0;
					m.colorsNeedUpdate = !0
				}
			else m instanceof THREE.BufferGeometry && i(m);
			if (!b.__webglActive)
			{
				if (b instanceof THREE.Mesh)
					if (m = b.geometry, m instanceof THREE.BufferGeometry) s(k.__webglObjects, m, b);
					else
					{
						if (m instanceof THREE.Geometry)
							for (l in m.geometryGroups) q =
								m.geometryGroups[l], s(k.__webglObjects, q, b)
					}
				else b instanceof THREE.Ribbon || b instanceof THREE.Line || b instanceof THREE.ParticleSystem ? (m = b.geometry, s(k.__webglObjects, m, b)) : b instanceof THREE.ImmediateRenderObject || b.immediateRenderCallback ? k.__webglObjectsImmediate.push(
				{
					object: b,
					opaque: null,
					transparent: null
				}) : b instanceof THREE.Sprite ? k.__webglSprites.push(b) : b instanceof THREE.LensFlare && k.__webglFlares.push(b);
				b.__webglActive = !0
			}
			a.__objectsAdded.splice(0, 1)
		}
		for (; a.__objectsRemoved.length;)
		{
			var ba =
				a.__objectsRemoved[0],
				Ia = a;
			ba instanceof THREE.Mesh || ba instanceof THREE.ParticleSystem || ba instanceof THREE.Ribbon || ba instanceof THREE.Line ? z(Ia.__webglObjects, ba) : ba instanceof THREE.Sprite ? v(Ia.__webglSprites, ba) : ba instanceof THREE.LensFlare ? v(Ia.__webglFlares, ba) : (ba instanceof THREE.ImmediateRenderObject || ba.immediateRenderCallback) && z(Ia.__webglObjectsImmediate, ba);
			ba.__webglActive = !1;
			a.__objectsRemoved.splice(0, 1)
		}
		for (var Ja = 0, ra = a.__webglObjects.length; Ja < ra; Ja++)
		{
			var ha = a.__webglObjects[Ja].object,
				N = ha.geometry,
				Ra = void 0,
				pa = void 0,
				ga = void 0;
			if (ha instanceof THREE.Mesh)
				if (N instanceof THREE.BufferGeometry)(N.verticesNeedUpdate || N.elementsNeedUpdate || N.uvsNeedUpdate || N.normalsNeedUpdate || N.colorsNeedUpdate || N.tangentsNeedUpdate) && h(N, j.DYNAMIC_DRAW, !N.dynamic), N.verticesNeedUpdate = !1, N.elementsNeedUpdate = !1, N.uvsNeedUpdate = !1, N.normalsNeedUpdate = !1, N.colorsNeedUpdate = !1, N.tangentsNeedUpdate = !1;
				else
				{
					for (var ua = 0, Ea = N.geometryGroupsList.length; ua < Ea; ua++)
						if (Ra = N.geometryGroupsList[ua], ga = e(ha,
							Ra), N.buffersNeedUpdate && d(Ra, ha), pa = ga.attributes && t(ga), N.verticesNeedUpdate || N.morphTargetsNeedUpdate || N.elementsNeedUpdate || N.uvsNeedUpdate || N.normalsNeedUpdate || N.colorsNeedUpdate || N.tangentsNeedUpdate || pa)
						{
							var qa = Ra,
								Fa = ha,
								na = j.DYNAMIC_DRAW,
								Oa = !N.dynamic,
								xa = ga;
							if (qa.__inittedArrays)
							{
								var Ya = f(xa),
									gb = xa.vertexColors ? xa.vertexColors : !1,
									pb = g(xa),
									ib = Ya === THREE.SmoothShading,
									C = void 0,
									V = void 0,
									Va = void 0,
									O = void 0,
									$a = void 0,
									Wa = void 0,
									Pa = void 0,
									nb = void 0,
									Ua = void 0,
									hb = void 0,
									sb = void 0,
									P = void 0,
									Q = void 0,
									R = void 0,
									oa = void 0,
									cb = void 0,
									jb = void 0,
									kb = void 0,
									yb = void 0,
									Pb = void 0,
									Qb = void 0,
									Rb = void 0,
									zb = void 0,
									Sb = void 0,
									Tb = void 0,
									Ub = void 0,
									Ab = void 0,
									Vb = void 0,
									Wb = void 0,
									Xb = void 0,
									Cb = void 0,
									Yb = void 0,
									Zb = void 0,
									$b = void 0,
									Db = void 0,
									va = void 0,
									Lb = void 0,
									mc = void 0,
									Eb = void 0,
									xc = void 0,
									db = void 0,
									kc = void 0,
									ab = void 0,
									bb = void 0,
									nc = void 0,
									fc = void 0,
									Qa = 0,
									Xa = 0,
									gc = 0,
									hc = 0,
									Fb = 0,
									qb = 0,
									Ba = 0,
									tb = 0,
									Sa = 0,
									ca = 0,
									ka = 0,
									w = 0,
									ya = void 0,
									eb = qa.__vertexArray,
									Mb = qa.__uvArray,
									Nb = qa.__uv2Array,
									Gb = qa.__normalArray,
									Ka = qa.__tangentArray,
									fb = qa.__colorArray,
									La = qa.__skinIndexArray,
									Ma = qa.__skinWeightArray,
									lc = qa.__morphTargetsArrays,
									sc = qa.__morphNormalsArrays,
									ed = qa.__webglCustomAttributesList,
									u = void 0,
									ac = qa.__faceArray,
									Bb = qa.__lineArray,
									ub = Fa.geometry,
									Jc = ub.elementsNeedUpdate,
									Bc = ub.uvsNeedUpdate,
									$c = ub.normalsNeedUpdate,
									ad = ub.tangentsNeedUpdate,
									bd = ub.colorsNeedUpdate,
									cd = ub.morphTargetsNeedUpdate,
									tc = ub.vertices,
									sa = qa.faces3,
									ta = qa.faces4,
									rb = ub.faces,
									fd = ub.faceVertexUvs[0],
									gd = ub.faceVertexUvs[1],
									uc = ub.skinIndices,
									oc = ub.skinWeights,
									pc = ub.morphTargets,
									Kc = ub.morphNormals;
								if (ub.verticesNeedUpdate)
								{
									C = 0;
									for (V = sa.length; C < V; C++) O = rb[sa[C]], P = tc[O.a], Q = tc[O.b], R = tc[O.c], eb[Xa] = P.x, eb[Xa + 1] = P.y, eb[Xa + 2] = P.z, eb[Xa + 3] = Q.x, eb[Xa + 4] = Q.y, eb[Xa + 5] = Q.z, eb[Xa + 6] = R.x, eb[Xa + 7] = R.y, eb[Xa + 8] = R.z, Xa += 9;
									C = 0;
									for (V = ta.length; C < V; C++) O = rb[ta[C]], P = tc[O.a], Q = tc[O.b], R = tc[O.c], oa = tc[O.d], eb[Xa] = P.x, eb[Xa + 1] = P.y, eb[Xa + 2] = P.z, eb[Xa + 3] = Q.x, eb[Xa + 4] = Q.y, eb[Xa + 5] = Q.z, eb[Xa + 6] = R.x, eb[Xa + 7] = R.y, eb[Xa + 8] = R.z, eb[Xa + 9] = oa.x, eb[Xa + 10] = oa.y, eb[Xa + 11] = oa.z, Xa += 12;
									j.bindBuffer(j.ARRAY_BUFFER, qa.__webglVertexBuffer);
									j.bufferData(j.ARRAY_BUFFER, eb, na)
								}
								if (cd)
								{
									db = 0;
									for (kc = pc.length; db < kc; db++)
									{
										C = ka = 0;
										for (V = sa.length; C < V; C++) nc = sa[C], O = rb[nc], P = pc[db].vertices[O.a], Q = pc[db].vertices[O.b], R = pc[db].vertices[O.c], ab = lc[db], ab[ka] = P.x, ab[ka + 1] = P.y, ab[ka + 2] = P.z, ab[ka + 3] = Q.x, ab[ka + 4] = Q.y, ab[ka + 5] = Q.z, ab[ka + 6] = R.x, ab[ka + 7] = R.y, ab[ka + 8] = R.z, xa.morphNormals && (ib ? (fc = Kc[db].vertexNormals[nc], Pb = fc.a, Qb = fc.b, Rb = fc.c) : Rb = Qb = Pb = Kc[db].faceNormals[nc], bb = sc[db], bb[ka] = Pb.x, bb[ka + 1] = Pb.y, bb[ka + 2] = Pb.z, bb[ka + 3] = Qb.x, bb[ka + 4] = Qb.y,
											bb[ka + 5] = Qb.z, bb[ka + 6] = Rb.x, bb[ka + 7] = Rb.y, bb[ka + 8] = Rb.z), ka += 9;
										C = 0;
										for (V = ta.length; C < V; C++) nc = ta[C], O = rb[nc], P = pc[db].vertices[O.a], Q = pc[db].vertices[O.b], R = pc[db].vertices[O.c], oa = pc[db].vertices[O.d], ab = lc[db], ab[ka] = P.x, ab[ka + 1] = P.y, ab[ka + 2] = P.z, ab[ka + 3] = Q.x, ab[ka + 4] = Q.y, ab[ka + 5] = Q.z, ab[ka + 6] = R.x, ab[ka + 7] = R.y, ab[ka + 8] = R.z, ab[ka + 9] = oa.x, ab[ka + 10] = oa.y, ab[ka + 11] = oa.z, xa.morphNormals && (ib ? (fc = Kc[db].vertexNormals[nc], Pb = fc.a, Qb = fc.b, Rb = fc.c, zb = fc.d) : zb = Rb = Qb = Pb = Kc[db].faceNormals[nc], bb = sc[db], bb[ka] =
											Pb.x, bb[ka + 1] = Pb.y, bb[ka + 2] = Pb.z, bb[ka + 3] = Qb.x, bb[ka + 4] = Qb.y, bb[ka + 5] = Qb.z, bb[ka + 6] = Rb.x, bb[ka + 7] = Rb.y, bb[ka + 8] = Rb.z, bb[ka + 9] = zb.x, bb[ka + 10] = zb.y, bb[ka + 11] = zb.z), ka += 12;
										j.bindBuffer(j.ARRAY_BUFFER, qa.__webglMorphTargetsBuffers[db]);
										j.bufferData(j.ARRAY_BUFFER, lc[db], na);
										xa.morphNormals && (j.bindBuffer(j.ARRAY_BUFFER, qa.__webglMorphNormalsBuffers[db]), j.bufferData(j.ARRAY_BUFFER, sc[db], na))
									}
								}
								if (oc.length)
								{
									C = 0;
									for (V = sa.length; C < V; C++) O = rb[sa[C]], Vb = oc[O.a], Wb = oc[O.b], Xb = oc[O.c], Ma[ca] = Vb.x, Ma[ca + 1] =
										Vb.y, Ma[ca + 2] = Vb.z, Ma[ca + 3] = Vb.w, Ma[ca + 4] = Wb.x, Ma[ca + 5] = Wb.y, Ma[ca + 6] = Wb.z, Ma[ca + 7] = Wb.w, Ma[ca + 8] = Xb.x, Ma[ca + 9] = Xb.y, Ma[ca + 10] = Xb.z, Ma[ca + 11] = Xb.w, Yb = uc[O.a], Zb = uc[O.b], $b = uc[O.c], La[ca] = Yb.x, La[ca + 1] = Yb.y, La[ca + 2] = Yb.z, La[ca + 3] = Yb.w, La[ca + 4] = Zb.x, La[ca + 5] = Zb.y, La[ca + 6] = Zb.z, La[ca + 7] = Zb.w, La[ca + 8] = $b.x, La[ca + 9] = $b.y, La[ca + 10] = $b.z, La[ca + 11] = $b.w, ca += 12;
									C = 0;
									for (V = ta.length; C < V; C++) O = rb[ta[C]], Vb = oc[O.a], Wb = oc[O.b], Xb = oc[O.c], Cb = oc[O.d], Ma[ca] = Vb.x, Ma[ca + 1] = Vb.y, Ma[ca + 2] = Vb.z, Ma[ca + 3] = Vb.w, Ma[ca + 4] =
										Wb.x, Ma[ca + 5] = Wb.y, Ma[ca + 6] = Wb.z, Ma[ca + 7] = Wb.w, Ma[ca + 8] = Xb.x, Ma[ca + 9] = Xb.y, Ma[ca + 10] = Xb.z, Ma[ca + 11] = Xb.w, Ma[ca + 12] = Cb.x, Ma[ca + 13] = Cb.y, Ma[ca + 14] = Cb.z, Ma[ca + 15] = Cb.w, Yb = uc[O.a], Zb = uc[O.b], $b = uc[O.c], Db = uc[O.d], La[ca] = Yb.x, La[ca + 1] = Yb.y, La[ca + 2] = Yb.z, La[ca + 3] = Yb.w, La[ca + 4] = Zb.x, La[ca + 5] = Zb.y, La[ca + 6] = Zb.z, La[ca + 7] = Zb.w, La[ca + 8] = $b.x, La[ca + 9] = $b.y, La[ca + 10] = $b.z, La[ca + 11] = $b.w, La[ca + 12] = Db.x, La[ca + 13] = Db.y, La[ca + 14] = Db.z, La[ca + 15] = Db.w, ca += 16;
									0 < ca && (j.bindBuffer(j.ARRAY_BUFFER, qa.__webglSkinIndicesBuffer),
										j.bufferData(j.ARRAY_BUFFER, La, na), j.bindBuffer(j.ARRAY_BUFFER, qa.__webglSkinWeightsBuffer), j.bufferData(j.ARRAY_BUFFER, Ma, na))
								}
								if (bd && gb)
								{
									C = 0;
									for (V = sa.length; C < V; C++) O = rb[sa[C]], Pa = O.vertexColors, nb = O.color, 3 === Pa.length && gb === THREE.VertexColors ? (Sb = Pa[0], Tb = Pa[1], Ub = Pa[2]) : Ub = Tb = Sb = nb, fb[Sa] = Sb.r, fb[Sa + 1] = Sb.g, fb[Sa + 2] = Sb.b, fb[Sa + 3] = Tb.r, fb[Sa + 4] = Tb.g, fb[Sa + 5] = Tb.b, fb[Sa + 6] = Ub.r, fb[Sa + 7] = Ub.g, fb[Sa + 8] = Ub.b, Sa += 9;
									C = 0;
									for (V = ta.length; C < V; C++) O = rb[ta[C]], Pa = O.vertexColors, nb = O.color, 4 === Pa.length &&
										gb === THREE.VertexColors ? (Sb = Pa[0], Tb = Pa[1], Ub = Pa[2], Ab = Pa[3]) : Ab = Ub = Tb = Sb = nb, fb[Sa] = Sb.r, fb[Sa + 1] = Sb.g, fb[Sa + 2] = Sb.b, fb[Sa + 3] = Tb.r, fb[Sa + 4] = Tb.g, fb[Sa + 5] = Tb.b, fb[Sa + 6] = Ub.r, fb[Sa + 7] = Ub.g, fb[Sa + 8] = Ub.b, fb[Sa + 9] = Ab.r, fb[Sa + 10] = Ab.g, fb[Sa + 11] = Ab.b, Sa += 12;
									0 < Sa && (j.bindBuffer(j.ARRAY_BUFFER, qa.__webglColorBuffer), j.bufferData(j.ARRAY_BUFFER, fb, na))
								}
								if (ad && ub.hasTangents)
								{
									C = 0;
									for (V = sa.length; C < V; C++) O = rb[sa[C]], Ua = O.vertexTangents, cb = Ua[0], jb = Ua[1], kb = Ua[2], Ka[Ba] = cb.x, Ka[Ba + 1] = cb.y, Ka[Ba + 2] = cb.z, Ka[Ba +
										3] = cb.w, Ka[Ba + 4] = jb.x, Ka[Ba + 5] = jb.y, Ka[Ba + 6] = jb.z, Ka[Ba + 7] = jb.w, Ka[Ba + 8] = kb.x, Ka[Ba + 9] = kb.y, Ka[Ba + 10] = kb.z, Ka[Ba + 11] = kb.w, Ba += 12;
									C = 0;
									for (V = ta.length; C < V; C++) O = rb[ta[C]], Ua = O.vertexTangents, cb = Ua[0], jb = Ua[1], kb = Ua[2], yb = Ua[3], Ka[Ba] = cb.x, Ka[Ba + 1] = cb.y, Ka[Ba + 2] = cb.z, Ka[Ba + 3] = cb.w, Ka[Ba + 4] = jb.x, Ka[Ba + 5] = jb.y, Ka[Ba + 6] = jb.z, Ka[Ba + 7] = jb.w, Ka[Ba + 8] = kb.x, Ka[Ba + 9] = kb.y, Ka[Ba + 10] = kb.z, Ka[Ba + 11] = kb.w, Ka[Ba + 12] = yb.x, Ka[Ba + 13] = yb.y, Ka[Ba + 14] = yb.z, Ka[Ba + 15] = yb.w, Ba += 16;
									j.bindBuffer(j.ARRAY_BUFFER, qa.__webglTangentBuffer);
									j.bufferData(j.ARRAY_BUFFER, Ka, na)
								}
								if ($c && Ya)
								{
									C = 0;
									for (V = sa.length; C < V; C++)
										if (O = rb[sa[C]], $a = O.vertexNormals, Wa = O.normal, 3 === $a.length && ib)
											for (va = 0; 3 > va; va++) mc = $a[va], Gb[qb] = mc.x, Gb[qb + 1] = mc.y, Gb[qb + 2] = mc.z, qb += 3;
										else
											for (va = 0; 3 > va; va++) Gb[qb] = Wa.x, Gb[qb + 1] = Wa.y, Gb[qb + 2] = Wa.z, qb += 3;
									C = 0;
									for (V = ta.length; C < V; C++)
										if (O = rb[ta[C]], $a = O.vertexNormals, Wa = O.normal, 4 === $a.length && ib)
											for (va = 0; 4 > va; va++) mc = $a[va], Gb[qb] = mc.x, Gb[qb + 1] = mc.y, Gb[qb + 2] = mc.z, qb += 3;
										else
											for (va = 0; 4 > va; va++) Gb[qb] = Wa.x, Gb[qb + 1] = Wa.y, Gb[qb +
												2] = Wa.z, qb += 3;
									j.bindBuffer(j.ARRAY_BUFFER, qa.__webglNormalBuffer);
									j.bufferData(j.ARRAY_BUFFER, Gb, na)
								}
								if (Bc && fd && pb)
								{
									C = 0;
									for (V = sa.length; C < V; C++)
										if (Va = sa[C], hb = fd[Va], void 0 !== hb)
											for (va = 0; 3 > va; va++) Eb = hb[va], Mb[gc] = Eb.x, Mb[gc + 1] = Eb.y, gc += 2;
									C = 0;
									for (V = ta.length; C < V; C++)
										if (Va = ta[C], hb = fd[Va], void 0 !== hb)
											for (va = 0; 4 > va; va++) Eb = hb[va], Mb[gc] = Eb.x, Mb[gc + 1] = Eb.y, gc += 2;
									0 < gc && (j.bindBuffer(j.ARRAY_BUFFER, qa.__webglUVBuffer), j.bufferData(j.ARRAY_BUFFER, Mb, na))
								}
								if (Bc && gd && pb)
								{
									C = 0;
									for (V = sa.length; C < V; C++)
										if (Va =
											sa[C], sb = gd[Va], void 0 !== sb)
											for (va = 0; 3 > va; va++) xc = sb[va], Nb[hc] = xc.x, Nb[hc + 1] = xc.y, hc += 2;
									C = 0;
									for (V = ta.length; C < V; C++)
										if (Va = ta[C], sb = gd[Va], void 0 !== sb)
											for (va = 0; 4 > va; va++) xc = sb[va], Nb[hc] = xc.x, Nb[hc + 1] = xc.y, hc += 2;
									0 < hc && (j.bindBuffer(j.ARRAY_BUFFER, qa.__webglUV2Buffer), j.bufferData(j.ARRAY_BUFFER, Nb, na))
								}
								if (Jc)
								{
									C = 0;
									for (V = sa.length; C < V; C++) ac[Fb] = Qa, ac[Fb + 1] = Qa + 1, ac[Fb + 2] = Qa + 2, Fb += 3, Bb[tb] = Qa, Bb[tb + 1] = Qa + 1, Bb[tb + 2] = Qa, Bb[tb + 3] = Qa + 2, Bb[tb + 4] = Qa + 1, Bb[tb + 5] = Qa + 2, tb += 6, Qa += 3;
									C = 0;
									for (V = ta.length; C < V; C++) ac[Fb] =
										Qa, ac[Fb + 1] = Qa + 1, ac[Fb + 2] = Qa + 3, ac[Fb + 3] = Qa + 1, ac[Fb + 4] = Qa + 2, ac[Fb + 5] = Qa + 3, Fb += 6, Bb[tb] = Qa, Bb[tb + 1] = Qa + 1, Bb[tb + 2] = Qa, Bb[tb + 3] = Qa + 3, Bb[tb + 4] = Qa + 1, Bb[tb + 5] = Qa + 2, Bb[tb + 6] = Qa + 2, Bb[tb + 7] = Qa + 3, tb += 8, Qa += 4;
									j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, qa.__webglFaceBuffer);
									j.bufferData(j.ELEMENT_ARRAY_BUFFER, ac, na);
									j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, qa.__webglLineBuffer);
									j.bufferData(j.ELEMENT_ARRAY_BUFFER, Bb, na)
								}
								if (ed)
								{
									va = 0;
									for (Lb = ed.length; va < Lb; va++)
										if (u = ed[va], u.__original.needsUpdate)
										{
											w = 0;
											if (1 === u.size)
												if (void 0 ===
													u.boundTo || "vertices" === u.boundTo)
												{
													C = 0;
													for (V = sa.length; C < V; C++) O = rb[sa[C]], u.array[w] = u.value[O.a], u.array[w + 1] = u.value[O.b], u.array[w + 2] = u.value[O.c], w += 3;
													C = 0;
													for (V = ta.length; C < V; C++) O = rb[ta[C]], u.array[w] = u.value[O.a], u.array[w + 1] = u.value[O.b], u.array[w + 2] = u.value[O.c], u.array[w + 3] = u.value[O.d], w += 4
												}
											else
											{
												if ("faces" === u.boundTo)
												{
													C = 0;
													for (V = sa.length; C < V; C++) ya = u.value[sa[C]], u.array[w] = ya, u.array[w + 1] = ya, u.array[w + 2] = ya, w += 3;
													C = 0;
													for (V = ta.length; C < V; C++) ya = u.value[ta[C]], u.array[w] = ya, u.array[w + 1] =
														ya, u.array[w + 2] = ya, u.array[w + 3] = ya, w += 4
												}
											}
											else if (2 === u.size)
												if (void 0 === u.boundTo || "vertices" === u.boundTo)
												{
													C = 0;
													for (V = sa.length; C < V; C++) O = rb[sa[C]], P = u.value[O.a], Q = u.value[O.b], R = u.value[O.c], u.array[w] = P.x, u.array[w + 1] = P.y, u.array[w + 2] = Q.x, u.array[w + 3] = Q.y, u.array[w + 4] = R.x, u.array[w + 5] = R.y, w += 6;
													C = 0;
													for (V = ta.length; C < V; C++) O = rb[ta[C]], P = u.value[O.a], Q = u.value[O.b], R = u.value[O.c], oa = u.value[O.d], u.array[w] = P.x, u.array[w + 1] = P.y, u.array[w + 2] = Q.x, u.array[w + 3] = Q.y, u.array[w + 4] = R.x, u.array[w + 5] = R.y, u.array[w +
														6] = oa.x, u.array[w + 7] = oa.y, w += 8
												}
											else
											{
												if ("faces" === u.boundTo)
												{
													C = 0;
													for (V = sa.length; C < V; C++) R = Q = P = ya = u.value[sa[C]], u.array[w] = P.x, u.array[w + 1] = P.y, u.array[w + 2] = Q.x, u.array[w + 3] = Q.y, u.array[w + 4] = R.x, u.array[w + 5] = R.y, w += 6;
													C = 0;
													for (V = ta.length; C < V; C++) oa = R = Q = P = ya = u.value[ta[C]], u.array[w] = P.x, u.array[w + 1] = P.y, u.array[w + 2] = Q.x, u.array[w + 3] = Q.y, u.array[w + 4] = R.x, u.array[w + 5] = R.y, u.array[w + 6] = oa.x, u.array[w + 7] = oa.y, w += 8
												}
											}
											else if (3 === u.size)
											{
												var $;
												$ = "c" === u.type ? ["r", "g", "b"] : ["x", "y", "z"];
												if (void 0 === u.boundTo ||
													"vertices" === u.boundTo)
												{
													C = 0;
													for (V = sa.length; C < V; C++) O = rb[sa[C]], P = u.value[O.a], Q = u.value[O.b], R = u.value[O.c], u.array[w] = P[$[0]], u.array[w + 1] = P[$[1]], u.array[w + 2] = P[$[2]], u.array[w + 3] = Q[$[0]], u.array[w + 4] = Q[$[1]], u.array[w + 5] = Q[$[2]], u.array[w + 6] = R[$[0]], u.array[w + 7] = R[$[1]], u.array[w + 8] = R[$[2]], w += 9;
													C = 0;
													for (V = ta.length; C < V; C++) O = rb[ta[C]], P = u.value[O.a], Q = u.value[O.b], R = u.value[O.c], oa = u.value[O.d], u.array[w] = P[$[0]], u.array[w + 1] = P[$[1]], u.array[w + 2] = P[$[2]], u.array[w + 3] = Q[$[0]], u.array[w + 4] = Q[$[1]],
														u.array[w + 5] = Q[$[2]], u.array[w + 6] = R[$[0]], u.array[w + 7] = R[$[1]], u.array[w + 8] = R[$[2]], u.array[w + 9] = oa[$[0]], u.array[w + 10] = oa[$[1]], u.array[w + 11] = oa[$[2]], w += 12
												}
												else if ("faces" === u.boundTo)
												{
													C = 0;
													for (V = sa.length; C < V; C++) R = Q = P = ya = u.value[sa[C]], u.array[w] = P[$[0]], u.array[w + 1] = P[$[1]], u.array[w + 2] = P[$[2]], u.array[w + 3] = Q[$[0]], u.array[w + 4] = Q[$[1]], u.array[w + 5] = Q[$[2]], u.array[w + 6] = R[$[0]], u.array[w + 7] = R[$[1]], u.array[w + 8] = R[$[2]], w += 9;
													C = 0;
													for (V = ta.length; C < V; C++) oa = R = Q = P = ya = u.value[ta[C]], u.array[w] = P[$[0]],
														u.array[w + 1] = P[$[1]], u.array[w + 2] = P[$[2]], u.array[w + 3] = Q[$[0]], u.array[w + 4] = Q[$[1]], u.array[w + 5] = Q[$[2]], u.array[w + 6] = R[$[0]], u.array[w + 7] = R[$[1]], u.array[w + 8] = R[$[2]], u.array[w + 9] = oa[$[0]], u.array[w + 10] = oa[$[1]], u.array[w + 11] = oa[$[2]], w += 12
												}
												else if ("faceVertices" === u.boundTo)
												{
													C = 0;
													for (V = sa.length; C < V; C++) ya = u.value[sa[C]], P = ya[0], Q = ya[1], R = ya[2], u.array[w] = P[$[0]], u.array[w + 1] = P[$[1]], u.array[w + 2] = P[$[2]], u.array[w + 3] = Q[$[0]], u.array[w + 4] = Q[$[1]], u.array[w + 5] = Q[$[2]], u.array[w + 6] = R[$[0]], u.array[w +
														7] = R[$[1]], u.array[w + 8] = R[$[2]], w += 9;
													C = 0;
													for (V = ta.length; C < V; C++) ya = u.value[ta[C]], P = ya[0], Q = ya[1], R = ya[2], oa = ya[3], u.array[w] = P[$[0]], u.array[w + 1] = P[$[1]], u.array[w + 2] = P[$[2]], u.array[w + 3] = Q[$[0]], u.array[w + 4] = Q[$[1]], u.array[w + 5] = Q[$[2]], u.array[w + 6] = R[$[0]], u.array[w + 7] = R[$[1]], u.array[w + 8] = R[$[2]], u.array[w + 9] = oa[$[0]], u.array[w + 10] = oa[$[1]], u.array[w + 11] = oa[$[2]], w += 12
												}
											}
											else if (4 === u.size)
												if (void 0 === u.boundTo || "vertices" === u.boundTo)
												{
													C = 0;
													for (V = sa.length; C < V; C++) O = rb[sa[C]], P = u.value[O.a], Q =
														u.value[O.b], R = u.value[O.c], u.array[w] = P.x, u.array[w + 1] = P.y, u.array[w + 2] = P.z, u.array[w + 3] = P.w, u.array[w + 4] = Q.x, u.array[w + 5] = Q.y, u.array[w + 6] = Q.z, u.array[w + 7] = Q.w, u.array[w + 8] = R.x, u.array[w + 9] = R.y, u.array[w + 10] = R.z, u.array[w + 11] = R.w, w += 12;
													C = 0;
													for (V = ta.length; C < V; C++) O = rb[ta[C]], P = u.value[O.a], Q = u.value[O.b], R = u.value[O.c], oa = u.value[O.d], u.array[w] = P.x, u.array[w + 1] = P.y, u.array[w + 2] = P.z, u.array[w + 3] = P.w, u.array[w + 4] = Q.x, u.array[w + 5] = Q.y, u.array[w + 6] = Q.z, u.array[w + 7] = Q.w, u.array[w + 8] = R.x, u.array[w + 9] =
														R.y, u.array[w + 10] = R.z, u.array[w + 11] = R.w, u.array[w + 12] = oa.x, u.array[w + 13] = oa.y, u.array[w + 14] = oa.z, u.array[w + 15] = oa.w, w += 16
												}
											else if ("faces" === u.boundTo)
											{
												C = 0;
												for (V = sa.length; C < V; C++) R = Q = P = ya = u.value[sa[C]], u.array[w] = P.x, u.array[w + 1] = P.y, u.array[w + 2] = P.z, u.array[w + 3] = P.w, u.array[w + 4] = Q.x, u.array[w + 5] = Q.y, u.array[w + 6] = Q.z, u.array[w + 7] = Q.w, u.array[w + 8] = R.x, u.array[w + 9] = R.y, u.array[w + 10] = R.z, u.array[w + 11] = R.w, w += 12;
												C = 0;
												for (V = ta.length; C < V; C++) oa = R = Q = P = ya = u.value[ta[C]], u.array[w] = P.x, u.array[w + 1] = P.y, u.array[w +
													2] = P.z, u.array[w + 3] = P.w, u.array[w + 4] = Q.x, u.array[w + 5] = Q.y, u.array[w + 6] = Q.z, u.array[w + 7] = Q.w, u.array[w + 8] = R.x, u.array[w + 9] = R.y, u.array[w + 10] = R.z, u.array[w + 11] = R.w, u.array[w + 12] = oa.x, u.array[w + 13] = oa.y, u.array[w + 14] = oa.z, u.array[w + 15] = oa.w, w += 16
											}
											else if ("faceVertices" === u.boundTo)
											{
												C = 0;
												for (V = sa.length; C < V; C++) ya = u.value[sa[C]], P = ya[0], Q = ya[1], R = ya[2], u.array[w] = P.x, u.array[w + 1] = P.y, u.array[w + 2] = P.z, u.array[w + 3] = P.w, u.array[w + 4] = Q.x, u.array[w + 5] = Q.y, u.array[w + 6] = Q.z, u.array[w + 7] = Q.w, u.array[w + 8] = R.x,
													u.array[w + 9] = R.y, u.array[w + 10] = R.z, u.array[w + 11] = R.w, w += 12;
												C = 0;
												for (V = ta.length; C < V; C++) ya = u.value[ta[C]], P = ya[0], Q = ya[1], R = ya[2], oa = ya[3], u.array[w] = P.x, u.array[w + 1] = P.y, u.array[w + 2] = P.z, u.array[w + 3] = P.w, u.array[w + 4] = Q.x, u.array[w + 5] = Q.y, u.array[w + 6] = Q.z, u.array[w + 7] = Q.w, u.array[w + 8] = R.x, u.array[w + 9] = R.y, u.array[w + 10] = R.z, u.array[w + 11] = R.w, u.array[w + 12] = oa.x, u.array[w + 13] = oa.y, u.array[w + 14] = oa.z, u.array[w + 15] = oa.w, w += 16
											}
											j.bindBuffer(j.ARRAY_BUFFER, u.buffer);
											j.bufferData(j.ARRAY_BUFFER, u.array, na)
										}
								}
								Oa &&
									(delete qa.__inittedArrays, delete qa.__colorArray, delete qa.__normalArray, delete qa.__tangentArray, delete qa.__uvArray, delete qa.__uv2Array, delete qa.__faceArray, delete qa.__vertexArray, delete qa.__lineArray, delete qa.__skinIndexArray, delete qa.__skinWeightArray)
							}
						} N.verticesNeedUpdate = !1;
					N.morphTargetsNeedUpdate = !1;
					N.elementsNeedUpdate = !1;
					N.uvsNeedUpdate = !1;
					N.normalsNeedUpdate = !1;
					N.colorsNeedUpdate = !1;
					N.tangentsNeedUpdate = !1;
					N.buffersNeedUpdate = !1;
					ga.attributes && x(ga)
				}
			else if (ha instanceof THREE.Ribbon)
			{
				ga =
					e(ha, N);
				pa = ga.attributes && t(ga);
				if (N.verticesNeedUpdate || N.colorsNeedUpdate || N.normalsNeedUpdate || pa)
				{
					var Hb = N,
						Lc = j.DYNAMIC_DRAW,
						Cc = void 0,
						Dc = void 0,
						Ec = void 0,
						Mc = void 0,
						za = void 0,
						Nc = void 0,
						Oc = void 0,
						Pc = void 0,
						md = void 0,
						lb = void 0,
						yc = void 0,
						Ga = void 0,
						vb = void 0,
						nd = Hb.vertices,
						od = Hb.colors,
						pd = Hb.normals,
						yd = nd.length,
						zd = od.length,
						Ad = pd.length,
						Qc = Hb.__vertexArray,
						Rc = Hb.__colorArray,
						Sc = Hb.__normalArray,
						Bd = Hb.colorsNeedUpdate,
						Cd = Hb.normalsNeedUpdate,
						hd = Hb.__webglCustomAttributesList;
					if (Hb.verticesNeedUpdate)
					{
						for (Cc =
							0; Cc < yd; Cc++) Mc = nd[Cc], za = 3 * Cc, Qc[za] = Mc.x, Qc[za + 1] = Mc.y, Qc[za + 2] = Mc.z;
						j.bindBuffer(j.ARRAY_BUFFER, Hb.__webglVertexBuffer);
						j.bufferData(j.ARRAY_BUFFER, Qc, Lc)
					}
					if (Bd)
					{
						for (Dc = 0; Dc < zd; Dc++) Nc = od[Dc], za = 3 * Dc, Rc[za] = Nc.r, Rc[za + 1] = Nc.g, Rc[za + 2] = Nc.b;
						j.bindBuffer(j.ARRAY_BUFFER, Hb.__webglColorBuffer);
						j.bufferData(j.ARRAY_BUFFER, Rc, Lc)
					}
					if (Cd)
					{
						for (Ec = 0; Ec < Ad; Ec++) Oc = pd[Ec], za = 3 * Ec, Sc[za] = Oc.x, Sc[za + 1] = Oc.y, Sc[za + 2] = Oc.z;
						j.bindBuffer(j.ARRAY_BUFFER, Hb.__webglNormalBuffer);
						j.bufferData(j.ARRAY_BUFFER, Sc, Lc)
					}
					if (hd)
					{
						Pc =
							0;
						for (md = hd.length; Pc < md; Pc++)
							if (Ga = hd[Pc], Ga.needsUpdate && (void 0 === Ga.boundTo || "vertices" === Ga.boundTo))
							{
								za = 0;
								yc = Ga.value.length;
								if (1 === Ga.size)
									for (lb = 0; lb < yc; lb++) Ga.array[lb] = Ga.value[lb];
								else if (2 === Ga.size)
									for (lb = 0; lb < yc; lb++) vb = Ga.value[lb], Ga.array[za] = vb.x, Ga.array[za + 1] = vb.y, za += 2;
								else if (3 === Ga.size)
									if ("c" === Ga.type)
										for (lb = 0; lb < yc; lb++) vb = Ga.value[lb], Ga.array[za] = vb.r, Ga.array[za + 1] = vb.g, Ga.array[za + 2] = vb.b, za += 3;
									else
										for (lb = 0; lb < yc; lb++) vb = Ga.value[lb], Ga.array[za] = vb.x, Ga.array[za + 1] =
											vb.y, Ga.array[za + 2] = vb.z, za += 3;
								else if (4 === Ga.size)
									for (lb = 0; lb < yc; lb++) vb = Ga.value[lb], Ga.array[za] = vb.x, Ga.array[za + 1] = vb.y, Ga.array[za + 2] = vb.z, Ga.array[za + 3] = vb.w, za += 4;
								j.bindBuffer(j.ARRAY_BUFFER, Ga.buffer);
								j.bufferData(j.ARRAY_BUFFER, Ga.array, Lc)
							}
					}
				}
				N.verticesNeedUpdate = !1;
				N.colorsNeedUpdate = !1;
				N.normalsNeedUpdate = !1;
				ga.attributes && x(ga)
			}
			else if (ha instanceof THREE.Line)
				if (N instanceof THREE.BufferGeometry)(N.verticesNeedUpdate || N.colorsNeedUpdate) && h(N, j.DYNAMIC_DRAW, !N.dynamic), N.verticesNeedUpdate = !1, N.colorsNeedUpdate = !1;
				else
				{
					ga = e(ha, N);
					pa = ga.attributes && t(ga);
					if (N.verticesNeedUpdate || N.colorsNeedUpdate || N.lineDistancesNeedUpdate || pa)
					{
						var Ib = N,
							Tc = j.DYNAMIC_DRAW,
							Fc = void 0,
							Gc = void 0,
							Hc = void 0,
							Uc = void 0,
							Na = void 0,
							Vc = void 0,
							qd = Ib.vertices,
							rd = Ib.colors,
							sd = Ib.lineDistances,
							Dd = qd.length,
							Ed = rd.length,
							Fd = sd.length,
							Wc = Ib.__vertexArray,
							Xc = Ib.__colorArray,
							td = Ib.__lineDistanceArray,
							Gd = Ib.colorsNeedUpdate,
							Hd = Ib.lineDistancesNeedUpdate,
							id = Ib.__webglCustomAttributesList,
							Yc = void 0,
							ud = void 0,
							mb = void 0,
							zc = void 0,
							wb = void 0,
							Ha = void 0;
						if (Ib.verticesNeedUpdate)
						{
							for (Fc = 0; Fc < Dd; Fc++) Uc = qd[Fc], Na = 3 * Fc, Wc[Na] = Uc.x, Wc[Na + 1] = Uc.y, Wc[Na + 2] = Uc.z;
							j.bindBuffer(j.ARRAY_BUFFER, Ib.__webglVertexBuffer);
							j.bufferData(j.ARRAY_BUFFER, Wc, Tc)
						}
						if (Gd)
						{
							for (Gc = 0; Gc < Ed; Gc++) Vc = rd[Gc], Na = 3 * Gc, Xc[Na] = Vc.r, Xc[Na + 1] = Vc.g, Xc[Na + 2] = Vc.b;
							j.bindBuffer(j.ARRAY_BUFFER, Ib.__webglColorBuffer);
							j.bufferData(j.ARRAY_BUFFER, Xc, Tc)
						}
						if (Hd)
						{
							for (Hc = 0; Hc < Fd; Hc++) td[Hc] = sd[Hc];
							j.bindBuffer(j.ARRAY_BUFFER, Ib.__webglLineDistanceBuffer);
							j.bufferData(j.ARRAY_BUFFER,
								td, Tc)
						}
						if (id)
						{
							Yc = 0;
							for (ud = id.length; Yc < ud; Yc++)
								if (Ha = id[Yc], Ha.needsUpdate && (void 0 === Ha.boundTo || "vertices" === Ha.boundTo))
								{
									Na = 0;
									zc = Ha.value.length;
									if (1 === Ha.size)
										for (mb = 0; mb < zc; mb++) Ha.array[mb] = Ha.value[mb];
									else if (2 === Ha.size)
										for (mb = 0; mb < zc; mb++) wb = Ha.value[mb], Ha.array[Na] = wb.x, Ha.array[Na + 1] = wb.y, Na += 2;
									else if (3 === Ha.size)
										if ("c" === Ha.type)
											for (mb = 0; mb < zc; mb++) wb = Ha.value[mb], Ha.array[Na] = wb.r, Ha.array[Na + 1] = wb.g, Ha.array[Na + 2] = wb.b, Na += 3;
										else
											for (mb = 0; mb < zc; mb++) wb = Ha.value[mb], Ha.array[Na] = wb.x,
												Ha.array[Na + 1] = wb.y, Ha.array[Na + 2] = wb.z, Na += 3;
									else if (4 === Ha.size)
										for (mb = 0; mb < zc; mb++) wb = Ha.value[mb], Ha.array[Na] = wb.x, Ha.array[Na + 1] = wb.y, Ha.array[Na + 2] = wb.z, Ha.array[Na + 3] = wb.w, Na += 4;
									j.bindBuffer(j.ARRAY_BUFFER, Ha.buffer);
									j.bufferData(j.ARRAY_BUFFER, Ha.array, Tc)
								}
						}
					}
					N.verticesNeedUpdate = !1;
					N.colorsNeedUpdate = !1;
					N.lineDistancesNeedUpdate = !1;
					ga.attributes && x(ga)
				}
			else if (ha instanceof THREE.ParticleSystem)
				if (N instanceof THREE.BufferGeometry)(N.verticesNeedUpdate || N.colorsNeedUpdate) && h(N, j.DYNAMIC_DRAW,
					!N.dynamic), N.verticesNeedUpdate = !1, N.colorsNeedUpdate = !1;
				else
				{
					ga = e(ha, N);
					pa = ga.attributes && t(ga);
					if (N.verticesNeedUpdate || N.colorsNeedUpdate || ha.sortParticles || pa)
					{
						var bc = N,
							jd = j.DYNAMIC_DRAW,
							Ic = ha,
							xb = void 0,
							cc = void 0,
							dc = void 0,
							ea = void 0,
							ec = void 0,
							qc = void 0,
							Zc = bc.vertices,
							kd = Zc.length,
							ld = bc.colors,
							vd = ld.length,
							vc = bc.__vertexArray,
							wc = bc.__colorArray,
							ic = bc.__sortArray,
							wd = bc.verticesNeedUpdate,
							xd = bc.colorsNeedUpdate,
							jc = bc.__webglCustomAttributesList,
							Jb = void 0,
							Ac = void 0,
							la = void 0,
							Kb = void 0,
							Ca = void 0,
							da = void 0;
						if (Ic.sortParticles)
						{
							rc.copy(Ob);
							rc.multiply(Ic.matrixWorld);
							for (xb = 0; xb < kd; xb++) dc = Zc[xb], ob.copy(dc), ob.applyProjection(rc), ic[xb] = [ob.z, xb];
							ic.sort(n);
							for (xb = 0; xb < kd; xb++) dc = Zc[ic[xb][1]], ea = 3 * xb, vc[ea] = dc.x, vc[ea + 1] = dc.y, vc[ea + 2] = dc.z;
							for (cc = 0; cc < vd; cc++) ea = 3 * cc, qc = ld[ic[cc][1]], wc[ea] = qc.r, wc[ea + 1] = qc.g, wc[ea + 2] = qc.b;
							if (jc)
							{
								Jb = 0;
								for (Ac = jc.length; Jb < Ac; Jb++)
									if (da = jc[Jb], void 0 === da.boundTo || "vertices" === da.boundTo)
										if (ea = 0, Kb = da.value.length, 1 === da.size)
											for (la = 0; la < Kb; la++) ec = ic[la][1],
												da.array[la] = da.value[ec];
										else if (2 === da.size)
									for (la = 0; la < Kb; la++) ec = ic[la][1], Ca = da.value[ec], da.array[ea] = Ca.x, da.array[ea + 1] = Ca.y, ea += 2;
								else if (3 === da.size)
									if ("c" === da.type)
										for (la = 0; la < Kb; la++) ec = ic[la][1], Ca = da.value[ec], da.array[ea] = Ca.r, da.array[ea + 1] = Ca.g, da.array[ea + 2] = Ca.b, ea += 3;
									else
										for (la = 0; la < Kb; la++) ec = ic[la][1], Ca = da.value[ec], da.array[ea] = Ca.x, da.array[ea + 1] = Ca.y, da.array[ea + 2] = Ca.z, ea += 3;
								else if (4 === da.size)
									for (la = 0; la < Kb; la++) ec = ic[la][1], Ca = da.value[ec], da.array[ea] = Ca.x, da.array[ea +
										1] = Ca.y, da.array[ea + 2] = Ca.z, da.array[ea + 3] = Ca.w, ea += 4
							}
						}
						else
						{
							if (wd)
								for (xb = 0; xb < kd; xb++) dc = Zc[xb], ea = 3 * xb, vc[ea] = dc.x, vc[ea + 1] = dc.y, vc[ea + 2] = dc.z;
							if (xd)
								for (cc = 0; cc < vd; cc++) qc = ld[cc], ea = 3 * cc, wc[ea] = qc.r, wc[ea + 1] = qc.g, wc[ea + 2] = qc.b;
							if (jc)
							{
								Jb = 0;
								for (Ac = jc.length; Jb < Ac; Jb++)
									if (da = jc[Jb], da.needsUpdate && (void 0 === da.boundTo || "vertices" === da.boundTo))
										if (Kb = da.value.length, ea = 0, 1 === da.size)
											for (la = 0; la < Kb; la++) da.array[la] = da.value[la];
										else if (2 === da.size)
									for (la = 0; la < Kb; la++) Ca = da.value[la], da.array[ea] = Ca.x,
										da.array[ea + 1] = Ca.y, ea += 2;
								else if (3 === da.size)
									if ("c" === da.type)
										for (la = 0; la < Kb; la++) Ca = da.value[la], da.array[ea] = Ca.r, da.array[ea + 1] = Ca.g, da.array[ea + 2] = Ca.b, ea += 3;
									else
										for (la = 0; la < Kb; la++) Ca = da.value[la], da.array[ea] = Ca.x, da.array[ea + 1] = Ca.y, da.array[ea + 2] = Ca.z, ea += 3;
								else if (4 === da.size)
									for (la = 0; la < Kb; la++) Ca = da.value[la], da.array[ea] = Ca.x, da.array[ea + 1] = Ca.y, da.array[ea + 2] = Ca.z, da.array[ea + 3] = Ca.w, ea += 4
							}
						}
						if (wd || Ic.sortParticles) j.bindBuffer(j.ARRAY_BUFFER, bc.__webglVertexBuffer), j.bufferData(j.ARRAY_BUFFER,
							vc, jd);
						if (xd || Ic.sortParticles) j.bindBuffer(j.ARRAY_BUFFER, bc.__webglColorBuffer), j.bufferData(j.ARRAY_BUFFER, wc, jd);
						if (jc)
						{
							Jb = 0;
							for (Ac = jc.length; Jb < Ac; Jb++)
								if (da = jc[Jb], da.needsUpdate || Ic.sortParticles) j.bindBuffer(j.ARRAY_BUFFER, da.buffer), j.bufferData(j.ARRAY_BUFFER, da.array, jd)
						}
					}
					N.verticesNeedUpdate = !1;
					N.colorsNeedUpdate = !1;
					ga.attributes && x(ga)
				}
		}
	};
	this.initMaterial = function(a, b, c, d)
	{
		var e, f, g, h;
		a.addEventListener("dispose", Wa);
		var i, k, n, l, m;
		a instanceof THREE.MeshDepthMaterial ? m = "depth" : a instanceof
		THREE.MeshNormalMaterial ? m = "normal" : a instanceof THREE.MeshBasicMaterial ? m = "basic" : a instanceof THREE.MeshLambertMaterial ? m = "lambert" : a instanceof THREE.MeshPhongMaterial ? m = "phong" : a instanceof THREE.LineBasicMaterial ? m = "basic" : a instanceof THREE.LineDashedMaterial ? m = "dashed" : a instanceof THREE.ParticleBasicMaterial && (m = "particle_basic");
		if (m)
		{
			var p = THREE.ShaderLib[m];
			a.uniforms = THREE.UniformsUtils.clone(p.uniforms);
			a.vertexShader = p.vertexShader;
			a.fragmentShader = p.fragmentShader
		}
		var r, q, s;
		e = g = q = s =
			p = 0;
		for (f = b.length; e < f; e++) r = b[e], r.onlyShadow || (r instanceof THREE.DirectionalLight && g++, r instanceof THREE.PointLight && q++, r instanceof THREE.SpotLight && s++, r instanceof THREE.HemisphereLight && p++);
		e = g;
		f = q;
		g = s;
		h = p;
		p = r = 0;
		for (s = b.length; p < s; p++) q = b[p], q.castShadow && (q instanceof THREE.SpotLight && r++, q instanceof THREE.DirectionalLight && !q.shadowCascade && r++);
		l = r;
		cb && d && d.useVertexTexture ? n = 1024 : (b = j.getParameter(j.MAX_VERTEX_UNIFORM_VECTORS), b = Math.floor((b - 20) / 4), void 0 !== d && d instanceof THREE.SkinnedMesh &&
			(b = Math.min(d.bones.length, b), b < d.bones.length && console.warn("WebGLRenderer: too many bones - " + d.bones.length + ", this GPU supports just " + b + " (try OpenGL instead of ANGLE)")), n = b);
		a:
		{
			q = a.fragmentShader;s = a.vertexShader;p = a.uniforms;b = a.attributes;r = a.defines;
			var c = {
					map: !!a.map,
					envMap: !!a.envMap,
					lightMap: !!a.lightMap,
					bumpMap: !!a.bumpMap,
					normalMap: !!a.normalMap,
					specularMap: !!a.specularMap,
					vertexColors: a.vertexColors,
					fog: c,
					useFog: a.fog,
					fogExp: c instanceof THREE.FogExp2,
					sizeAttenuation: a.sizeAttenuation,
					skinning: a.skinning,
					maxBones: n,
					useVertexTexture: cb && d && d.useVertexTexture,
					boneTextureWidth: d && d.boneTextureWidth,
					boneTextureHeight: d && d.boneTextureHeight,
					morphTargets: a.morphTargets,
					morphNormals: a.morphNormals,
					maxMorphTargets: this.maxMorphTargets,
					maxMorphNormals: this.maxMorphNormals,
					maxDirLights: e,
					maxPointLights: f,
					maxSpotLights: g,
					maxHemiLights: h,
					maxShadows: l,
					shadowMapEnabled: this.shadowMapEnabled && d.receiveShadow,
					shadowMapType: this.shadowMapType,
					shadowMapDebug: this.shadowMapDebug,
					shadowMapCascade: this.shadowMapCascade,
					alphaTest: a.alphaTest,
					metal: a.metal,
					perPixel: a.perPixel,
					wrapAround: a.wrapAround,
					doubleSided: a.side === THREE.DoubleSide,
					flipSided: a.side === THREE.BackSide
				},
				t, v, x, d = [];m ? d.push(m) : (d.push(q), d.push(s));
			for (v in r) d.push(v),
			d.push(r[v]);
			for (t in c) d.push(t),
			d.push(c[t]);m = d.join();t = 0;
			for (v = fa.length; t < v; t++)
				if (d = fa[t], d.code === m)
				{
					d.usedTimes++;
					k = d.program;
					break a
				} t = "SHADOWMAP_TYPE_BASIC";c.shadowMapType === THREE.PCFShadowMap ? t = "SHADOWMAP_TYPE_PCF" : c.shadowMapType === THREE.PCFSoftShadowMap && (t = "SHADOWMAP_TYPE_PCF_SOFT");
			v = [];
			for (x in r) d = r[x],
			!1 !== d && (d = "#define " + x + " " + d, v.push(d));d = v.join("\n");x = j.createProgram();v = ["precision " + U + " float;", d, jb ? "#define VERTEX_TEXTURES" : "", M.gammaInput ? "#define GAMMA_INPUT" : "", M.gammaOutput ? "#define GAMMA_OUTPUT" : "", M.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", "#define MAX_DIR_LIGHTS " + c.maxDirLights, "#define MAX_POINT_LIGHTS " + c.maxPointLights, "#define MAX_SPOT_LIGHTS " + c.maxSpotLights, "#define MAX_HEMI_LIGHTS " + c.maxHemiLights, "#define MAX_SHADOWS " + c.maxShadows,
				"#define MAX_BONES " + c.maxBones, c.map ? "#define USE_MAP" : "", c.envMap ? "#define USE_ENVMAP" : "", c.lightMap ? "#define USE_LIGHTMAP" : "", c.bumpMap ? "#define USE_BUMPMAP" : "", c.normalMap ? "#define USE_NORMALMAP" : "", c.specularMap ? "#define USE_SPECULARMAP" : "", c.vertexColors ? "#define USE_COLOR" : "", c.skinning ? "#define USE_SKINNING" : "", c.useVertexTexture ? "#define BONE_TEXTURE" : "", c.boneTextureWidth ? "#define N_BONE_PIXEL_X " + c.boneTextureWidth.toFixed(1) : "", c.boneTextureHeight ? "#define N_BONE_PIXEL_Y " + c.boneTextureHeight.toFixed(1) :
				"", c.morphTargets ? "#define USE_MORPHTARGETS" : "", c.morphNormals ? "#define USE_MORPHNORMALS" : "", c.perPixel ? "#define PHONG_PER_PIXEL" : "", c.wrapAround ? "#define WRAP_AROUND" : "", c.doubleSided ? "#define DOUBLE_SIDED" : "", c.flipSided ? "#define FLIP_SIDED" : "", c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", c.shadowMapEnabled ? "#define " + t : "", c.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", c.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", c.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", "uniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\n#ifdef USE_MORPHNORMALS\nattribute vec3 morphNormal0;\nattribute vec3 morphNormal1;\nattribute vec3 morphNormal2;\nattribute vec3 morphNormal3;\n#else\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"
			].join("\n");
			t = ["precision " + U + " float;", c.bumpMap || c.normalMap ? "#extension GL_OES_standard_derivatives : enable" : "", d, "#define MAX_DIR_LIGHTS " + c.maxDirLights, "#define MAX_POINT_LIGHTS " + c.maxPointLights, "#define MAX_SPOT_LIGHTS " + c.maxSpotLights, "#define MAX_HEMI_LIGHTS " + c.maxHemiLights, "#define MAX_SHADOWS " + c.maxShadows, c.alphaTest ? "#define ALPHATEST " + c.alphaTest : "", M.gammaInput ? "#define GAMMA_INPUT" : "", M.gammaOutput ? "#define GAMMA_OUTPUT" : "", M.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "",
				c.useFog && c.fog ? "#define USE_FOG" : "", c.useFog && c.fogExp ? "#define FOG_EXP2" : "", c.map ? "#define USE_MAP" : "", c.envMap ? "#define USE_ENVMAP" : "", c.lightMap ? "#define USE_LIGHTMAP" : "", c.bumpMap ? "#define USE_BUMPMAP" : "", c.normalMap ? "#define USE_NORMALMAP" : "", c.specularMap ? "#define USE_SPECULARMAP" : "", c.vertexColors ? "#define USE_COLOR" : "", c.metal ? "#define METAL" : "", c.perPixel ? "#define PHONG_PER_PIXEL" : "", c.wrapAround ? "#define WRAP_AROUND" : "", c.doubleSided ? "#define DOUBLE_SIDED" : "", c.flipSided ? "#define FLIP_SIDED" :
				"", c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", c.shadowMapEnabled ? "#define " + t : "", c.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", c.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"
			].join("\n");t = W("fragment", t + q);v = W("vertex", v + s);j.attachShader(x, v);j.attachShader(x, t);j.linkProgram(x);j.getProgramParameter(x, j.LINK_STATUS) || console.error("Could not initialise shader\nVALIDATE_STATUS: " + j.getProgramParameter(x, j.VALIDATE_STATUS) + ", gl error [" +
				j.getError() + "]");j.deleteShader(t);j.deleteShader(v);x.uniforms = {};x.attributes = {};
			var y;t = "viewMatrix modelViewMatrix projectionMatrix normalMatrix modelMatrix cameraPosition morphTargetInfluences".split(" ");c.useVertexTexture ? t.push("boneTexture") : t.push("boneGlobalMatrices");
			for (y in p) t.push(y);y = t;t = 0;
			for (v = y.length; t < v; t++) p = y[t],
			x.uniforms[p] = j.getUniformLocation(x, p);t = "position normal uv uv2 tangent color skinIndex skinWeight lineDistance".split(" ");
			for (y = 0; y < c.maxMorphTargets; y++) t.push("morphTarget" +
				y);
			for (y = 0; y < c.maxMorphNormals; y++) t.push("morphNormal" + y);
			for (k in b) t.push(k);k = t;y = 0;
			for (b = k.length; y < b; y++) t = k[y],
			x.attributes[t] = j.getAttribLocation(x, t);x.id = Da++;fa.push(
			{
				program: x,
				code: m,
				usedTimes: 1
			});M.info.memory.programs = fa.length;k = x
		}
		a.program = k;
		y = a.program.attributes;
		if (a.morphTargets)
		{
			a.numSupportedMorphTargets = 0;
			b = "morphTarget";
			for (k = 0; k < this.maxMorphTargets; k++) x = b + k, 0 <= y[x] && a.numSupportedMorphTargets++
		}
		if (a.morphNormals)
		{
			a.numSupportedMorphNormals = 0;
			b = "morphNormal";
			for (k = 0; k < this.maxMorphNormals; k++) x =
				b + k, 0 <= y[x] && a.numSupportedMorphNormals++
		}
		a.uniformsList = [];
		for (i in a.uniforms) a.uniformsList.push([a.uniforms[i], i])
	};
	this.setFaceCulling = function(a, b)
	{
		a === THREE.CullFaceNone ? j.disable(j.CULL_FACE) : (b === THREE.FrontFaceDirectionCW ? j.frontFace(j.CW) : j.frontFace(j.CCW), a === THREE.CullFaceBack ? j.cullFace(j.BACK) : a === THREE.CullFaceFront ? j.cullFace(j.FRONT) : j.cullFace(j.FRONT_AND_BACK), j.enable(j.CULL_FACE))
	};
	this.setMaterialFaces = function(a)
	{
		var b = a.side === THREE.DoubleSide,
			a = a.side === THREE.BackSide;
		ia !==
			b && (b ? j.disable(j.CULL_FACE) : j.enable(j.CULL_FACE), ia = b);
		ra !== a && (a ? j.frontFace(j.CW) : j.frontFace(j.CCW), ra = a)
	};
	this.setDepthTest = function(a)
	{
		hb !== a && (a ? j.enable(j.DEPTH_TEST) : j.disable(j.DEPTH_TEST), hb = a)
	};
	this.setDepthWrite = function(a)
	{
		Ea !== a && (j.depthMask(a), Ea = a)
	};
	this.setBlending = function(a, b, c, d)
	{
		a !== ga && (a === THREE.NoBlending ? j.disable(j.BLEND) : a === THREE.AdditiveBlending ? (j.enable(j.BLEND), j.blendEquation(j.FUNC_ADD), j.blendFunc(j.SRC_ALPHA, j.ONE)) : a === THREE.SubtractiveBlending ? (j.enable(j.BLEND),
			j.blendEquation(j.FUNC_ADD), j.blendFunc(j.ZERO, j.ONE_MINUS_SRC_COLOR)) : a === THREE.MultiplyBlending ? (j.enable(j.BLEND), j.blendEquation(j.FUNC_ADD), j.blendFunc(j.ZERO, j.SRC_COLOR)) : a === THREE.CustomBlending ? j.enable(j.BLEND) : (j.enable(j.BLEND), j.blendEquationSeparate(j.FUNC_ADD, j.FUNC_ADD), j.blendFuncSeparate(j.SRC_ALPHA, j.ONE_MINUS_SRC_ALPHA, j.ONE, j.ONE_MINUS_SRC_ALPHA)), ga = a);
		if (a === THREE.CustomBlending)
		{
			if (b !== Z && (j.blendEquation(K(b)), Z = b), c !== pa || d !== gb) j.blendFunc(K(c), K(d)), pa = c, gb = d
		}
		else gb = pa =
			Z = null
	};
	this.setTexture = function(a, b)
	{
		if (a.needsUpdate)
		{
			a.__webglInit || (a.__webglInit = !0, a.addEventListener("dispose", Va), a.__webglTexture = j.createTexture(), M.info.memory.textures++);
			j.activeTexture(j.TEXTURE0 + b);
			j.bindTexture(j.TEXTURE_2D, a.__webglTexture);
			j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL, a.flipY);
			j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultiplyAlpha);
			j.pixelStorei(j.UNPACK_ALIGNMENT, a.unpackAlignment);
			var c = a.image,
				d = 0 === (c.width & c.width - 1) && 0 === (c.height & c.height - 1),
				e = K(a.format),
				f = K(a.type);
			A(j.TEXTURE_2D, a, d);
			var g = a.mipmaps;
			if (a instanceof THREE.DataTexture)
				if (0 < g.length && d)
				{
					for (var h = 0, i = g.length; h < i; h++) c = g[h], j.texImage2D(j.TEXTURE_2D, h, e, c.width, c.height, 0, e, f, c.data);
					a.generateMipmaps = !1
				}
			else j.texImage2D(j.TEXTURE_2D, 0, e, c.width, c.height, 0, e, f, c.data);
			else if (a instanceof THREE.CompressedTexture)
			{
				h = 0;
				for (i = g.length; h < i; h++) c = g[h], j.compressedTexImage2D(j.TEXTURE_2D, h, e, c.width, c.height, 0, c.data)
			}
			else if (0 < g.length && d)
			{
				h = 0;
				for (i = g.length; h < i; h++) c = g[h], j.texImage2D(j.TEXTURE_2D,
					h, e, e, f, c);
				a.generateMipmaps = !1
			}
			else j.texImage2D(j.TEXTURE_2D, 0, e, e, f, a.image);
			a.generateMipmaps && d && j.generateMipmap(j.TEXTURE_2D);
			a.needsUpdate = !1;
			if (a.onUpdate) a.onUpdate()
		}
		else j.activeTexture(j.TEXTURE0 + b), j.bindTexture(j.TEXTURE_2D, a.__webglTexture)
	};
	this.setRenderTarget = function(a)
	{
		var b = a instanceof THREE.WebGLRenderTargetCube;
		if (a && !a.__webglFramebuffer)
		{
			void 0 === a.depthBuffer && (a.depthBuffer = !0);
			void 0 === a.stencilBuffer && (a.stencilBuffer = !0);
			a.addEventListener("dispose", $a);
			a.__webglTexture =
				j.createTexture();
			M.info.memory.textures++;
			var c = 0 === (a.width & a.width - 1) && 0 === (a.height & a.height - 1),
				d = K(a.format),
				e = K(a.type);
			if (b)
			{
				a.__webglFramebuffer = [];
				a.__webglRenderbuffer = [];
				j.bindTexture(j.TEXTURE_CUBE_MAP, a.__webglTexture);
				A(j.TEXTURE_CUBE_MAP, a, c);
				for (var f = 0; 6 > f; f++)
				{
					a.__webglFramebuffer[f] = j.createFramebuffer();
					a.__webglRenderbuffer[f] = j.createRenderbuffer();
					j.texImage2D(j.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, d, a.width, a.height, 0, d, e, null);
					var g = a,
						h = j.TEXTURE_CUBE_MAP_POSITIVE_X + f;
					j.bindFramebuffer(j.FRAMEBUFFER,
						a.__webglFramebuffer[f]);
					j.framebufferTexture2D(j.FRAMEBUFFER, j.COLOR_ATTACHMENT0, h, g.__webglTexture, 0);
					X(a.__webglRenderbuffer[f], a)
				}
				c && j.generateMipmap(j.TEXTURE_CUBE_MAP)
			}
			else a.__webglFramebuffer = j.createFramebuffer(), a.__webglRenderbuffer = a.shareDepthFrom ? a.shareDepthFrom.__webglRenderbuffer : j.createRenderbuffer(), j.bindTexture(j.TEXTURE_2D, a.__webglTexture), A(j.TEXTURE_2D, a, c), j.texImage2D(j.TEXTURE_2D, 0, d, a.width, a.height, 0, d, e, null), d = j.TEXTURE_2D, j.bindFramebuffer(j.FRAMEBUFFER, a.__webglFramebuffer),
				j.framebufferTexture2D(j.FRAMEBUFFER, j.COLOR_ATTACHMENT0, d, a.__webglTexture, 0), a.shareDepthFrom ? a.depthBuffer && !a.stencilBuffer ? j.framebufferRenderbuffer(j.FRAMEBUFFER, j.DEPTH_ATTACHMENT, j.RENDERBUFFER, a.__webglRenderbuffer) : a.depthBuffer && a.stencilBuffer && j.framebufferRenderbuffer(j.FRAMEBUFFER, j.DEPTH_STENCIL_ATTACHMENT, j.RENDERBUFFER, a.__webglRenderbuffer) : X(a.__webglRenderbuffer, a), c && j.generateMipmap(j.TEXTURE_2D);
			b ? j.bindTexture(j.TEXTURE_CUBE_MAP, null) : j.bindTexture(j.TEXTURE_2D, null);
			j.bindRenderbuffer(j.RENDERBUFFER,
				null);
			j.bindFramebuffer(j.FRAMEBUFFER, null)
		}
		a ? (b = b ? a.__webglFramebuffer[a.activeCubeFace] : a.__webglFramebuffer, c = a.width, a = a.height, e = d = 0) : (b = null, c = Db, a = nb, d = na, e = Ya);
		b !== Ia && (j.bindFramebuffer(j.FRAMEBUFFER, b), j.viewport(d, e, c, a), Ia = b);
		kc = c;
		Mb = a
	};
	this.shadowMapPlugin = new THREE.ShadowMapPlugin;
	this.addPrePlugin(this.shadowMapPlugin);
	this.addPostPlugin(new THREE.SpritePlugin);
	this.addPostPlugin(new THREE.LensFlarePlugin)
};
THREE.WebGLRenderTarget = function(a, b, c)
{
	THREE.EventDispatcher.call(this);
	this.width = a;
	this.height = b;
	c = c ||
	{};
	this.wrapS = void 0 !== c.wrapS ? c.wrapS : THREE.ClampToEdgeWrapping;
	this.wrapT = void 0 !== c.wrapT ? c.wrapT : THREE.ClampToEdgeWrapping;
	this.magFilter = void 0 !== c.magFilter ? c.magFilter : THREE.LinearFilter;
	this.minFilter = void 0 !== c.minFilter ? c.minFilter : THREE.LinearMipMapLinearFilter;
	this.anisotropy = void 0 !== c.anisotropy ? c.anisotropy : 1;
	this.offset = new THREE.Vector2(0, 0);
	this.repeat = new THREE.Vector2(1, 1);
	this.format = void 0 !== c.format ? c.format : THREE.RGBAFormat;
	this.type = void 0 !== c.type ? c.type : THREE.UnsignedByteType;
	this.depthBuffer = void 0 !== c.depthBuffer ? c.depthBuffer : !0;
	this.stencilBuffer = void 0 !== c.stencilBuffer ? c.stencilBuffer : !0;
	this.generateMipmaps = !0;
	this.shareDepthFrom = null
};
THREE.WebGLRenderTarget.prototype.clone = function()
{
	var a = new THREE.WebGLRenderTarget(this.width, this.height);
	a.wrapS = this.wrapS;
	a.wrapT = this.wrapT;
	a.magFilter = this.magFilter;
	a.minFilter = this.minFilter;
	a.anisotropy = this.anisotropy;
	a.offset.copy(this.offset);
	a.repeat.copy(this.repeat);
	a.format = this.format;
	a.type = this.type;
	a.depthBuffer = this.depthBuffer;
	a.stencilBuffer = this.stencilBuffer;
	a.generateMipmaps = this.generateMipmaps;
	a.shareDepthFrom = this.shareDepthFrom;
	return a
};
THREE.WebGLRenderTarget.prototype.dispose = function()
{
	this.dispatchEvent(
	{
		type: "dispose"
	})
};
THREE.WebGLRenderTargetCube = function(a, b, c)
{
	THREE.WebGLRenderTarget.call(this, a, b, c);
	this.activeCubeFace = 0
};
THREE.WebGLRenderTargetCube.prototype = Object.create(THREE.WebGLRenderTarget.prototype);
THREE.RenderableVertex = function()
{
	this.positionWorld = new THREE.Vector3;
	this.positionScreen = new THREE.Vector4;
	this.visible = !0
};
THREE.RenderableVertex.prototype.copy = function(a)
{
	this.positionWorld.copy(a.positionWorld);
	this.positionScreen.copy(a.positionScreen)
};
THREE.RenderableFace3 = function()
{
	this.v1 = new THREE.RenderableVertex;
	this.v2 = new THREE.RenderableVertex;
	this.v3 = new THREE.RenderableVertex;
	this.centroidModel = new THREE.Vector3;
	this.normalModel = new THREE.Vector3;
	this.normalModelView = new THREE.Vector3;
	this.vertexNormalsLength = 0;
	this.vertexNormalsModel = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
	this.vertexNormalsModelView = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
	this.material = this.color = null;
	this.uvs = [
		[]
	];
	this.z = null
};
THREE.RenderableFace4 = function()
{
	this.v1 = new THREE.RenderableVertex;
	this.v2 = new THREE.RenderableVertex;
	this.v3 = new THREE.RenderableVertex;
	this.v4 = new THREE.RenderableVertex;
	this.centroidModel = new THREE.Vector3;
	this.normalModel = new THREE.Vector3;
	this.normalModelView = new THREE.Vector3;
	this.vertexNormalsLength = 0;
	this.vertexNormalsModel = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
	this.vertexNormalsModelView = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
	this.material = this.color = null;
	this.uvs = [
		[]
	];
	this.z = null
};
THREE.RenderableObject = function()
{
	this.z = this.object = null
};
THREE.RenderableParticle = function()
{
	this.rotation = this.z = this.y = this.x = this.object = null;
	this.scale = new THREE.Vector2;
	this.material = null
};
THREE.RenderableLine = function()
{
	this.z = null;
	this.v1 = new THREE.RenderableVertex;
	this.v2 = new THREE.RenderableVertex;
	this.material = null
};
THREE.ColorUtils = {
	adjustHSV: function(a, b, c, d)
	{
		var e = THREE.ColorUtils.__hsv;
		a.getHSV(e);
		e.h = THREE.Math.clamp(e.h + b, 0, 1);
		e.s = THREE.Math.clamp(e.s + c, 0, 1);
		e.v = THREE.Math.clamp(e.v + d, 0, 1);
		a.setHSV(e.h, e.s, e.v)
	}
};
THREE.ColorUtils.__hsv = {
	h: 0,
	s: 0,
	v: 0
};
THREE.GeometryUtils = {
	merge: function(a, b)
	{
		var c, d, e = a.vertices.length,
			f = b instanceof THREE.Mesh ? b.geometry : b,
			g = a.vertices,
			i = f.vertices,
			h = a.faces,
			k = f.faces,
			l = a.faceVertexUvs[0],
			f = f.faceVertexUvs[0];
		b instanceof THREE.Mesh && (b.matrixAutoUpdate && b.updateMatrix(), c = b.matrix, d = new THREE.Matrix3, d.getInverse(c), d.transpose());
		for (var m = 0, n = i.length; m < n; m++)
		{
			var r = i[m].clone();
			c && r.applyMatrix4(c);
			g.push(r)
		}
		m = 0;
		for (n = k.length; m < n; m++)
		{
			var r = k[m],
				p, q, s = r.vertexNormals,
				t = r.vertexColors;
			r instanceof THREE.Face3 ?
				p = new THREE.Face3(r.a + e, r.b + e, r.c + e) : r instanceof THREE.Face4 && (p = new THREE.Face4(r.a + e, r.b + e, r.c + e, r.d + e));
			p.normal.copy(r.normal);
			d && p.normal.applyMatrix3(d)
				.normalize();
			g = 0;
			for (i = s.length; g < i; g++) q = s[g].clone(), d && q.applyMatrix3(d)
				.normalize(), p.vertexNormals.push(q);
			p.color.copy(r.color);
			g = 0;
			for (i = t.length; g < i; g++) q = t[g], p.vertexColors.push(q.clone());
			p.materialIndex = r.materialIndex;
			p.centroid.copy(r.centroid);
			c && p.centroid.applyMatrix4(c);
			h.push(p)
		}
		m = 0;
		for (n = f.length; m < n; m++)
		{
			c = f[m];
			d = [];
			g = 0;
			for (i = c.length; g < i; g++) d.push(new THREE.Vector2(c[g].x, c[g].y));
			l.push(d)
		}
	},
	removeMaterials: function(a, b)
	{
		for (var c = {}, d = 0, e = b.length; d < e; d++) c[b[d]] = !0;
		for (var f, g = [], d = 0, e = a.faces.length; d < e; d++) f = a.faces[d], f.materialIndex in c || g.push(f);
		a.faces = g
	},
	randomPointInTriangle: function(a, b, c)
	{
		var d, e, f, g = new THREE.Vector3,
			i = THREE.GeometryUtils.__v1;
		d = THREE.GeometryUtils.random();
		e = THREE.GeometryUtils.random();
		1 < d + e && (d = 1 - d, e = 1 - e);
		f = 1 - d - e;
		g.copy(a);
		g.multiplyScalar(d);
		i.copy(b);
		i.multiplyScalar(e);
		g.add(i);
		i.copy(c);
		i.multiplyScalar(f);
		g.add(i);
		return g
	},
	randomPointInFace: function(a, b, c)
	{
		var d, e, f;
		if (a instanceof THREE.Face3) return d = b.vertices[a.a], e = b.vertices[a.b], f = b.vertices[a.c], THREE.GeometryUtils.randomPointInTriangle(d, e, f);
		if (a instanceof THREE.Face4)
		{
			d = b.vertices[a.a];
			e = b.vertices[a.b];
			f = b.vertices[a.c];
			var b = b.vertices[a.d],
				g;
			c ? a._area1 && a._area2 ? (c = a._area1, g = a._area2) : (c = THREE.GeometryUtils.triangleArea(d, e, b), g = THREE.GeometryUtils.triangleArea(e, f, b), a._area1 = c, a._area2 = g) : (c = THREE.GeometryUtils.triangleArea(d,
				e, b), g = THREE.GeometryUtils.triangleArea(e, f, b));
			return THREE.GeometryUtils.random() * (c + g) < c ? THREE.GeometryUtils.randomPointInTriangle(d, e, b) : THREE.GeometryUtils.randomPointInTriangle(e, f, b)
		}
	},
	randomPointsInGeometry: function(a, b)
	{
		function c(a)
		{
			function b(c, d)
			{
				if (d < c) return c;
				var e = c + Math.floor((d - c) / 2);
				return k[e] > a ? b(c, e - 1) : k[e] < a ? b(e + 1, d) : e
			}
			return b(0, k.length - 1)
		}
		var d, e, f = a.faces,
			g = a.vertices,
			i = f.length,
			h = 0,
			k = [],
			l, m, n, r;
		for (e = 0; e < i; e++) d = f[e], d instanceof THREE.Face3 ? (l = g[d.a], m = g[d.b], n = g[d.c],
			d._area = THREE.GeometryUtils.triangleArea(l, m, n)) : d instanceof THREE.Face4 && (l = g[d.a], m = g[d.b], n = g[d.c], r = g[d.d], d._area1 = THREE.GeometryUtils.triangleArea(l, m, r), d._area2 = THREE.GeometryUtils.triangleArea(m, n, r), d._area = d._area1 + d._area2), h += d._area, k[e] = h;
		d = [];
		for (e = 0; e < b; e++) g = THREE.GeometryUtils.random() * h, g = c(g), d[e] = THREE.GeometryUtils.randomPointInFace(f[g], a, !0);
		return d
	},
	triangleArea: function(a, b, c)
	{
		var d = THREE.GeometryUtils.__v1,
			e = THREE.GeometryUtils.__v2;
		d.subVectors(b, a);
		e.subVectors(c, a);
		d.cross(e);
		return 0.5 * d.length()
	},
	center: function(a)
	{
		a.computeBoundingBox();
		var b = a.boundingBox,
			c = new THREE.Vector3;
		c.addVectors(b.min, b.max);
		c.multiplyScalar(-0.5);
		a.applyMatrix((new THREE.Matrix4)
			.makeTranslation(c.x, c.y, c.z));
		a.computeBoundingBox();
		return c
	},
	normalizeUVs: function(a)
	{
		for (var a = a.faceVertexUvs[0], b = 0, c = a.length; b < c; b++)
			for (var d = a[b], e = 0, f = d.length; e < f; e++) 1 !== d[e].x && (d[e].x -= Math.floor(d[e].x)), 1 !== d[e].y && (d[e].y -= Math.floor(d[e].y))
	},
	triangulateQuads: function(a)
	{
		var b, c, d, e,
			f = [],
			g = [],
			i = [];
		b = 0;
		for (c = a.faceUvs.length; b < c; b++) g[b] = [];
		b = 0;
		for (c = a.faceVertexUvs.length; b < c; b++) i[b] = [];
		b = 0;
		for (c = a.faces.length; b < c; b++)
			if (d = a.faces[b], d instanceof THREE.Face4)
			{
				e = d.a;
				var h = d.b,
					k = d.c,
					l = d.d,
					m = new THREE.Face3,
					n = new THREE.Face3;
				m.color.copy(d.color);
				n.color.copy(d.color);
				m.materialIndex = d.materialIndex;
				n.materialIndex = d.materialIndex;
				m.a = e;
				m.b = h;
				m.c = l;
				n.a = h;
				n.b = k;
				n.c = l;
				4 === d.vertexColors.length && (m.vertexColors[0] = d.vertexColors[0].clone(), m.vertexColors[1] = d.vertexColors[1].clone(),
					m.vertexColors[2] = d.vertexColors[3].clone(), n.vertexColors[0] = d.vertexColors[1].clone(), n.vertexColors[1] = d.vertexColors[2].clone(), n.vertexColors[2] = d.vertexColors[3].clone());
				f.push(m, n);
				d = 0;
				for (e = a.faceVertexUvs.length; d < e; d++) a.faceVertexUvs[d].length && (m = a.faceVertexUvs[d][b], h = m[1], k = m[2], l = m[3], m = [m[0].clone(), h.clone(), l.clone()], h = [h.clone(), k.clone(), l.clone()], i[d].push(m, h));
				d = 0;
				for (e = a.faceUvs.length; d < e; d++) a.faceUvs[d].length && (h = a.faceUvs[d][b], g[d].push(h, h))
			}
		else
		{
			f.push(d);
			d = 0;
			for (e =
				a.faceUvs.length; d < e; d++) g[d].push(a.faceUvs[d][b]);
			d = 0;
			for (e = a.faceVertexUvs.length; d < e; d++) i[d].push(a.faceVertexUvs[d][b])
		}
		a.faces = f;
		a.faceUvs = g;
		a.faceVertexUvs = i;
		a.computeCentroids();
		a.computeFaceNormals();
		a.computeVertexNormals();
		a.hasTangents && a.computeTangents()
	},
	setMaterialIndex: function(a, b, c, d)
	{
		a = a.faces;
		d = d || a.length - 1;
		for (c = c || 0; c <= d; c++) a[c].materialIndex = b
	}
};
THREE.GeometryUtils.random = THREE.Math.random16;
THREE.GeometryUtils.__v1 = new THREE.Vector3;
THREE.GeometryUtils.__v2 = new THREE.Vector3;
THREE.ImageUtils = {
	crossOrigin: "anonymous",
	loadTexture: function(a, b, c, d)
	{
		var e = new Image,
			f = new THREE.Texture(e, b),
			b = new THREE.ImageLoader;
		b.addEventListener("load", function(a)
		{
			f.image = a.content;
			f.needsUpdate = !0;
			c && c(f)
		});
		b.addEventListener("error", function(a)
		{
			d && d(a.message)
		});
		b.crossOrigin = this.crossOrigin;
		b.load(a, e);
		f.sourceFile = a;
		return f
	},
	loadCompressedTexture: function(a, b, c, d)
	{
		var e = new THREE.CompressedTexture;
		e.mapping = b;
		var f = new XMLHttpRequest;
		f.onload = function()
		{
			var a = THREE.ImageUtils.parseDDS(f.response,
				!0);
			e.format = a.format;
			e.mipmaps = a.mipmaps;
			e.image.width = a.width;
			e.image.height = a.height;
			e.generateMipmaps = !1;
			e.needsUpdate = !0;
			c && c(e)
		};
		f.onerror = d;
		f.open("GET", a, !0);
		f.responseType = "arraybuffer";
		f.send(null);
		return e
	},
	loadTextureCube: function(a, b, c, d)
	{
		var e = [];
		e.loadCount = 0;
		var f = new THREE.Texture;
		f.image = e;
		void 0 !== b && (f.mapping = b);
		f.flipY = !1;
		for (var b = 0, g = a.length; b < g; ++b)
		{
			var i = new Image;
			e[b] = i;
			i.onload = function()
			{
				e.loadCount += 1;
				6 === e.loadCount && (f.needsUpdate = !0, c && c(f))
			};
			i.onerror = d;
			i.crossOrigin =
				this.crossOrigin;
			i.src = a[b]
		}
		return f
	},
	loadCompressedTextureCube: function(a, b, c, d)
	{
		var e = [];
		e.loadCount = 0;
		var f = new THREE.CompressedTexture;
		f.image = e;
		void 0 !== b && (f.mapping = b);
		f.flipY = !1;
		f.generateMipmaps = !1;
		b = function(a, b)
		{
			return function()
			{
				var d = THREE.ImageUtils.parseDDS(a.response, !0);
				b.format = d.format;
				b.mipmaps = d.mipmaps;
				b.width = d.width;
				b.height = d.height;
				e.loadCount += 1;
				6 === e.loadCount && (f.format = d.format, f.needsUpdate = !0, c && c(f))
			}
		};
		if (a instanceof Array)
			for (var g = 0, i = a.length; g < i; ++g)
			{
				var h = {};
				e[g] = h;
				var k = new XMLHttpRequest;
				k.onload = b(k, h);
				k.onerror = d;
				h = a[g];
				k.open("GET", h, !0);
				k.responseType = "arraybuffer";
				k.send(null)
			}
		else k = new XMLHttpRequest, k.onload = function()
			{
				var a = THREE.ImageUtils.parseDDS(k.response, !0);
				if (a.isCubemap)
				{
					for (var b = a.mipmaps.length / a.mipmapCount, d = 0; d < b; d++)
					{
						e[d] = {
							mipmaps: []
						};
						for (var g = 0; g < a.mipmapCount; g++) e[d].mipmaps.push(a.mipmaps[d * a.mipmapCount + g]), e[d].format = a.format, e[d].width = a.width, e[d].height = a.height
					}
					f.format = a.format;
					f.needsUpdate = !0;
					c && c(f)
				}
			}, k.onerror =
			d, k.open("GET", a, !0), k.responseType = "arraybuffer", k.send(null);
		return f
	},
	parseDDS: function(a, b)
	{
		function c(a)
		{
			return a.charCodeAt(0) + (a.charCodeAt(1) << 8) + (a.charCodeAt(2) << 16) + (a.charCodeAt(3) << 24)
		}
		var d = {
				mipmaps: [],
				width: 0,
				height: 0,
				format: null,
				mipmapCount: 1
			},
			e = c("DXT1"),
			f = c("DXT3"),
			g = c("DXT5"),
			i = new Int32Array(a, 0, 31);
		if (542327876 !== i[0]) return console.error("ImageUtils.parseDDS(): Invalid magic number in DDS header"), d;
		if (!i[20] & 4) return console.error("ImageUtils.parseDDS(): Unsupported format, must contain a FourCC code"),
			d;
		var h = i[21];
		switch (h)
		{
			case e:
				e = 8;
				d.format = THREE.RGB_S3TC_DXT1_Format;
				break;
			case f:
				e = 16;
				d.format = THREE.RGBA_S3TC_DXT3_Format;
				break;
			case g:
				e = 16;
				d.format = THREE.RGBA_S3TC_DXT5_Format;
				break;
			default:
				return console.error("ImageUtils.parseDDS(): Unsupported FourCC code: ", String.fromCharCode(h & 255, h >> 8 & 255, h >> 16 & 255, h >> 24 & 255)), d
		}
		d.mipmapCount = 1;
		i[2] & 131072 && !1 !== b && (d.mipmapCount = Math.max(1, i[7]));
		d.isCubemap = i[28] & 512 ? !0 : !1;
		d.width = i[4];
		d.height = i[3];
		for (var i = i[1] + 4, f = d.width, g = d.height, h = d.isCubemap ?
			6 : 1, k = 0; k < h; k++)
		{
			for (var l = 0; l < d.mipmapCount; l++)
			{
				var m = Math.max(4, f) / 4 * Math.max(4, g) / 4 * e,
					n = {
						data: new Uint8Array(a, i, m),
						width: f,
						height: g
					};
				d.mipmaps.push(n);
				i += m;
				f = Math.max(0.5 * f, 1);
				g = Math.max(0.5 * g, 1)
			}
			f = d.width;
			g = d.height
		}
		return d
	},
	getNormalMap: function(a, b)
	{
		var c = function(a)
			{
				var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
				return [a[0] / b, a[1] / b, a[2] / b]
			},
			b = b | 1,
			d = a.width,
			e = a.height,
			f = document.createElement("canvas");
		f.width = d;
		f.height = e;
		var g = f.getContext("2d");
		g.drawImage(a, 0, 0);
		for (var i = g.getImageData(0,
				0, d, e)
			.data, h = g.createImageData(d, e), k = h.data, l = 0; l < d; l++)
			for (var m = 0; m < e; m++)
			{
				var n = 0 > m - 1 ? 0 : m - 1,
					r = m + 1 > e - 1 ? e - 1 : m + 1,
					p = 0 > l - 1 ? 0 : l - 1,
					q = l + 1 > d - 1 ? d - 1 : l + 1,
					s = [],
					t = [0, 0, i[4 * (m * d + l)] / 255 * b];
				s.push([-1, 0, i[4 * (m * d + p)] / 255 * b]);
				s.push([-1, -1, i[4 * (n * d + p)] / 255 * b]);
				s.push([0, -1, i[4 * (n * d + l)] / 255 * b]);
				s.push([1, -1, i[4 * (n * d + q)] / 255 * b]);
				s.push([1, 0, i[4 * (m * d + q)] / 255 * b]);
				s.push([1, 1, i[4 * (r * d + q)] / 255 * b]);
				s.push([0, 1, i[4 * (r * d + l)] / 255 * b]);
				s.push([-1, 1, i[4 * (r * d + p)] / 255 * b]);
				n = [];
				p = s.length;
				for (r = 0; r < p; r++)
				{
					var q = s[r],
						x = s[(r + 1) %
							p],
						q = [q[0] - t[0], q[1] - t[1], q[2] - t[2]],
						x = [x[0] - t[0], x[1] - t[1], x[2] - t[2]];
					n.push(c([q[1] * x[2] - q[2] * x[1], q[2] * x[0] - q[0] * x[2], q[0] * x[1] - q[1] * x[0]]))
				}
				s = [0, 0, 0];
				for (r = 0; r < n.length; r++) s[0] += n[r][0], s[1] += n[r][1], s[2] += n[r][2];
				s[0] /= n.length;
				s[1] /= n.length;
				s[2] /= n.length;
				t = 4 * (m * d + l);
				k[t] = 255 * ((s[0] + 1) / 2) | 0;
				k[t + 1] = 255 * ((s[1] + 1) / 2) | 0;
				k[t + 2] = 255 * s[2] | 0;
				k[t + 3] = 255
			}
		g.putImageData(h, 0, 0);
		return f
	},
	generateDataTexture: function(a, b, c)
	{
		for (var d = a * b, e = new Uint8Array(3 * d), f = Math.floor(255 * c.r), g = Math.floor(255 * c.g),
			c = Math.floor(255 * c.b), i = 0; i < d; i++) e[3 * i] = f, e[3 * i + 1] = g, e[3 * i + 2] = c;
		a = new THREE.DataTexture(e, a, b, THREE.RGBFormat);
		a.needsUpdate = !0;
		return a
	}
};
THREE.SceneUtils = {
	createMultiMaterialObject: function(a, b)
	{
		for (var c = new THREE.Object3D, d = 0, e = b.length; d < e; d++) c.add(new THREE.Mesh(a, b[d]));
		return c
	},
	detach: function(a, b, c)
	{
		a.applyMatrix(b.matrixWorld);
		b.remove(a);
		c.add(a)
	},
	attach: function(a, b, c)
	{
		var d = new THREE.Matrix4;
		d.getInverse(c.matrixWorld);
		a.applyMatrix(d);
		b.remove(a);
		c.add(a)
	}
};
THREE.FontUtils = {
	faces:
	{},
	face: "helvetiker",
	weight: "normal",
	style: "normal",
	size: 150,
	divisions: 10,
	getFace: function()
	{
		return this.faces[this.face][this.weight][this.style]
	},
	loadFace: function(a)
	{
		var b = a.familyName.toLowerCase();
		this.faces[b] = this.faces[b] ||
		{};
		this.faces[b][a.cssFontWeight] = this.faces[b][a.cssFontWeight] ||
		{};
		this.faces[b][a.cssFontWeight][a.cssFontStyle] = a;
		return this.faces[b][a.cssFontWeight][a.cssFontStyle] = a
	},
	drawText: function(a)
	{
		for (var b = this.getFace(), c = this.size / b.resolution, d =
			0, e = String(a)
			.split(""), f = e.length, g = [], a = 0; a < f; a++)
		{
			var i = new THREE.Path,
				i = this.extractGlyphPoints(e[a], b, c, d, i),
				d = d + i.offset;
			g.push(i.path)
		}
		return {
			paths: g,
			offset: d / 2
		}
	},
	extractGlyphPoints: function(a, b, c, d, e)
	{
		var f = [],
			g, i, h, k, l, m, n, r, p, q, s, t = b.glyphs[a] || b.glyphs["?"];
		if (t)
		{
			if (t.o)
			{
				b = t._cachedOutline || (t._cachedOutline = t.o.split(" "));
				k = b.length;
				for (a = 0; a < k;) switch (h = b[a++], h)
				{
					case "m":
						h = b[a++] * c + d;
						l = b[a++] * c;
						e.moveTo(h, l);
						break;
					case "l":
						h = b[a++] * c + d;
						l = b[a++] * c;
						e.lineTo(h, l);
						break;
					case "q":
						h = b[a++] *
							c + d;
						l = b[a++] * c;
						r = b[a++] * c + d;
						p = b[a++] * c;
						e.quadraticCurveTo(r, p, h, l);
						if (g = f[f.length - 1])
						{
							m = g.x;
							n = g.y;
							g = 1;
							for (i = this.divisions; g <= i; g++)
							{
								var x = g / i;
								THREE.Shape.Utils.b2(x, m, r, h);
								THREE.Shape.Utils.b2(x, n, p, l)
							}
						}
						break;
					case "b":
						if (h = b[a++] * c + d, l = b[a++] * c, r = b[a++] * c + d, p = b[a++] * -c, q = b[a++] * c + d, s = b[a++] * -c, e.bezierCurveTo(h, l, r, p, q, s), g = f[f.length - 1])
						{
							m = g.x;
							n = g.y;
							g = 1;
							for (i = this.divisions; g <= i; g++) x = g / i, THREE.Shape.Utils.b3(x, m, r, q, h), THREE.Shape.Utils.b3(x, n, p, s, l)
						}
				}
			}
			return {
				offset: t.ha * c,
				path: e
			}
		}
	}
};
THREE.FontUtils.generateShapes = function(a, b)
{
	var b = b ||
		{},
		c = void 0 !== b.curveSegments ? b.curveSegments : 4,
		d = void 0 !== b.font ? b.font : "helvetiker",
		e = void 0 !== b.weight ? b.weight : "normal",
		f = void 0 !== b.style ? b.style : "normal";
	THREE.FontUtils.size = void 0 !== b.size ? b.size : 100;
	THREE.FontUtils.divisions = c;
	THREE.FontUtils.face = d;
	THREE.FontUtils.weight = e;
	THREE.FontUtils.style = f;
	c = THREE.FontUtils.drawText(a)
		.paths;
	d = [];
	e = 0;
	for (f = c.length; e < f; e++) Array.prototype.push.apply(d, c[e].toShapes());
	return d
};
(function(a)
{
	var b = function(a)
	{
		for (var b = a.length, e = 0, f = b - 1, g = 0; g < b; f = g++) e += a[f].x * a[g].y - a[g].x * a[f].y;
		return 0.5 * e
	};
	a.Triangulate = function(a, d)
	{
		var e = a.length;
		if (3 > e) return null;
		var f = [],
			g = [],
			i = [],
			h, k, l;
		if (0 < b(a))
			for (k = 0; k < e; k++) g[k] = k;
		else
			for (k = 0; k < e; k++) g[k] = e - 1 - k;
		var m = 2 * e;
		for (k = e - 1; 2 < e;)
		{
			if (0 >= m--)
			{
				console.log("Warning, unable to triangulate polygon!");
				break
			}
			h = k;
			e <= h && (h = 0);
			k = h + 1;
			e <= k && (k = 0);
			l = k + 1;
			e <= l && (l = 0);
			var n;
			a:
			{
				var r = n = void 0,
					p = void 0,
					q = void 0,
					s = void 0,
					t = void 0,
					x = void 0,
					z = void 0,
					v =
					void 0,
					r = a[g[h]].x,
					p = a[g[h]].y,
					q = a[g[k]].x,
					s = a[g[k]].y,
					t = a[g[l]].x,
					x = a[g[l]].y;
				if (1E-10 > (q - r) * (x - p) - (s - p) * (t - r)) n = !1;
				else
				{
					var I = void 0,
						H = void 0,
						D = void 0,
						y = void 0,
						F = void 0,
						E = void 0,
						G = void 0,
						W = void 0,
						A = void 0,
						X = void 0,
						A = W = G = v = z = void 0,
						I = t - q,
						H = x - s,
						D = r - t,
						y = p - x,
						F = q - r,
						E = s - p;
					for (n = 0; n < e; n++)
						if (!(n === h || n === k || n === l))
							if (z = a[g[n]].x, v = a[g[n]].y, G = z - r, W = v - p, A = z - q, X = v - s, z -= t, v -= x, A = I * X - H * A, G = F * W - E * G, W = D * v - y * z, 0 <= A && 0 <= W && 0 <= G)
							{
								n = !1;
								break a
							} n = !0
				}
			}
			if (n)
			{
				f.push([a[g[h]], a[g[k]], a[g[l]]]);
				i.push([g[h], g[k], g[l]]);
				h = k;
				for (l = k + 1; l < e; h++, l++) g[h] = g[l];
				e--;
				m = 2 * e
			}
		}
		return d ? i : f
	};
	a.Triangulate.area = b;
	return a
})(THREE.FontUtils);
self._typeface_js = {
	faces: THREE.FontUtils.faces,
	loadFace: THREE.FontUtils.loadFace
};
THREE.Curve = function() {};
THREE.Curve.prototype.getPoint = function()
{
	console.log("Warning, getPoint() not implemented!");
	return null
};
THREE.Curve.prototype.getPointAt = function(a)
{
	a = this.getUtoTmapping(a);
	return this.getPoint(a)
};
THREE.Curve.prototype.getPoints = function(a)
{
	a || (a = 5);
	var b, c = [];
	for (b = 0; b <= a; b++) c.push(this.getPoint(b / a));
	return c
};
THREE.Curve.prototype.getSpacedPoints = function(a)
{
	a || (a = 5);
	var b, c = [];
	for (b = 0; b <= a; b++) c.push(this.getPointAt(b / a));
	return c
};
THREE.Curve.prototype.getLength = function()
{
	var a = this.getLengths();
	return a[a.length - 1]
};
THREE.Curve.prototype.getLengths = function(a)
{
	a || (a = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200);
	if (this.cacheArcLengths && this.cacheArcLengths.length == a + 1 && !this.needsUpdate) return this.cacheArcLengths;
	this.needsUpdate = !1;
	var b = [],
		c, d = this.getPoint(0),
		e, f = 0;
	b.push(0);
	for (e = 1; e <= a; e++) c = this.getPoint(e / a), f += c.distanceTo(d), b.push(f), d = c;
	return this.cacheArcLengths = b
};
THREE.Curve.prototype.updateArcLengths = function()
{
	this.needsUpdate = !0;
	this.getLengths()
};
THREE.Curve.prototype.getUtoTmapping = function(a, b)
{
	var c = this.getLengths(),
		d = 0,
		e = c.length,
		f;
	f = b ? b : a * c[e - 1];
	for (var g = 0, i = e - 1, h; g <= i;)
		if (d = Math.floor(g + (i - g) / 2), h = c[d] - f, 0 > h) g = d + 1;
		else if (0 < h) i = d - 1;
	else
	{
		i = d;
		break
	}
	d = i;
	if (c[d] == f) return d / (e - 1);
	g = c[d];
	return c = (d + (f - g) / (c[d + 1] - g)) / (e - 1)
};
THREE.Curve.prototype.getTangent = function(a)
{
	var b = a - 1E-4,
		a = a + 1E-4;
	0 > b && (b = 0);
	1 < a && (a = 1);
	b = this.getPoint(b);
	return this.getPoint(a)
		.clone()
		.sub(b)
		.normalize()
};
THREE.Curve.prototype.getTangentAt = function(a)
{
	a = this.getUtoTmapping(a);
	return this.getTangent(a)
};
THREE.LineCurve = function(a, b)
{
	this.v1 = a;
	this.v2 = b
};
THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.LineCurve.prototype.getPoint = function(a)
{
	var b = this.v2.clone()
		.sub(this.v1);
	b.multiplyScalar(a)
		.add(this.v1);
	return b
};
THREE.LineCurve.prototype.getPointAt = function(a)
{
	return this.getPoint(a)
};
THREE.LineCurve.prototype.getTangent = function()
{
	return this.v2.clone()
		.sub(this.v1)
		.normalize()
};
THREE.QuadraticBezierCurve = function(a, b, c)
{
	this.v0 = a;
	this.v1 = b;
	this.v2 = c
};
THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.QuadraticBezierCurve.prototype.getPoint = function(a)
{
	var b;
	b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
	a = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
	return new THREE.Vector2(b, a)
};
THREE.QuadraticBezierCurve.prototype.getTangent = function(a)
{
	var b;
	b = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.x, this.v1.x, this.v2.x);
	a = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.y, this.v1.y, this.v2.y);
	b = new THREE.Vector2(b, a);
	b.normalize();
	return b
};
THREE.CubicBezierCurve = function(a, b, c, d)
{
	this.v0 = a;
	this.v1 = b;
	this.v2 = c;
	this.v3 = d
};
THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.CubicBezierCurve.prototype.getPoint = function(a)
{
	var b;
	b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
	a = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
	return new THREE.Vector2(b, a)
};
THREE.CubicBezierCurve.prototype.getTangent = function(a)
{
	var b;
	b = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
	a = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
	b = new THREE.Vector2(b, a);
	b.normalize();
	return b
};
THREE.SplineCurve = function(a)
{
	this.points = void 0 == a ? [] : a
};
THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.SplineCurve.prototype.getPoint = function(a)
{
	var b = new THREE.Vector2,
		c = [],
		d = this.points,
		e;
	e = (d.length - 1) * a;
	a = Math.floor(e);
	e -= a;
	c[0] = 0 == a ? a : a - 1;
	c[1] = a;
	c[2] = a > d.length - 2 ? d.length - 1 : a + 1;
	c[3] = a > d.length - 3 ? d.length - 1 : a + 2;
	b.x = THREE.Curve.Utils.interpolate(d[c[0]].x, d[c[1]].x, d[c[2]].x, d[c[3]].x, e);
	b.y = THREE.Curve.Utils.interpolate(d[c[0]].y, d[c[1]].y, d[c[2]].y, d[c[3]].y, e);
	return b
};
THREE.EllipseCurve = function(a, b, c, d, e, f, g)
{
	this.aX = a;
	this.aY = b;
	this.xRadius = c;
	this.yRadius = d;
	this.aStartAngle = e;
	this.aEndAngle = f;
	this.aClockwise = g
};
THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.EllipseCurve.prototype.getPoint = function(a)
{
	var b = this.aEndAngle - this.aStartAngle;
	this.aClockwise || (a = 1 - a);
	b = this.aStartAngle + a * b;
	a = this.aX + this.xRadius * Math.cos(b);
	b = this.aY + this.yRadius * Math.sin(b);
	return new THREE.Vector2(a, b)
};
THREE.ArcCurve = function(a, b, c, d, e, f)
{
	THREE.EllipseCurve.call(this, a, b, c, c, d, e, f)
};
THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype);
THREE.Curve.Utils = {
	tangentQuadraticBezier: function(a, b, c, d)
	{
		return 2 * (1 - a) * (c - b) + 2 * a * (d - c)
	},
	tangentCubicBezier: function(a, b, c, d, e)
	{
		return -3 * b * (1 - a) * (1 - a) + 3 * c * (1 - a) * (1 - a) - 6 * a * c * (1 - a) + 6 * a * d * (1 - a) - 3 * a * a * d + 3 * a * a * e
	},
	tangentSpline: function(a)
	{
		return 6 * a * a - 6 * a + (3 * a * a - 4 * a + 1) + (-6 * a * a + 6 * a) + (3 * a * a - 2 * a)
	},
	interpolate: function(a, b, c, d, e)
	{
		var a = 0.5 * (c - a),
			d = 0.5 * (d - b),
			f = e * e;
		return (2 * b - 2 * c + a + d) * e * f + (-3 * b + 3 * c - 2 * a - d) * f + a * e + b
	}
};
THREE.Curve.create = function(a, b)
{
	a.prototype = Object.create(THREE.Curve.prototype);
	a.prototype.getPoint = b;
	return a
};
THREE.LineCurve3 = THREE.Curve.create(function(a, b)
{
	this.v1 = a;
	this.v2 = b
}, function(a)
{
	var b = new THREE.Vector3;
	b.subVectors(this.v2, this.v1);
	b.multiplyScalar(a);
	b.add(this.v1);
	return b
});
THREE.QuadraticBezierCurve3 = THREE.Curve.create(function(a, b, c)
{
	this.v0 = a;
	this.v1 = b;
	this.v2 = c
}, function(a)
{
	var b, c;
	b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
	c = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
	a = THREE.Shape.Utils.b2(a, this.v0.z, this.v1.z, this.v2.z);
	return new THREE.Vector3(b, c, a)
});
THREE.CubicBezierCurve3 = THREE.Curve.create(function(a, b, c, d)
{
	this.v0 = a;
	this.v1 = b;
	this.v2 = c;
	this.v3 = d
}, function(a)
{
	var b, c;
	b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
	c = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
	a = THREE.Shape.Utils.b3(a, this.v0.z, this.v1.z, this.v2.z, this.v3.z);
	return new THREE.Vector3(b, c, a)
});
THREE.SplineCurve3 = THREE.Curve.create(function(a)
{
	this.points = void 0 == a ? [] : a
}, function(a)
{
	var b = new THREE.Vector3,
		c = [],
		d = this.points,
		e, a = (d.length - 1) * a;
	e = Math.floor(a);
	a -= e;
	c[0] = 0 == e ? e : e - 1;
	c[1] = e;
	c[2] = e > d.length - 2 ? d.length - 1 : e + 1;
	c[3] = e > d.length - 3 ? d.length - 1 : e + 2;
	e = d[c[0]];
	var f = d[c[1]],
		g = d[c[2]],
		c = d[c[3]];
	b.x = THREE.Curve.Utils.interpolate(e.x, f.x, g.x, c.x, a);
	b.y = THREE.Curve.Utils.interpolate(e.y, f.y, g.y, c.y, a);
	b.z = THREE.Curve.Utils.interpolate(e.z, f.z, g.z, c.z, a);
	return b
});
THREE.ClosedSplineCurve3 = THREE.Curve.create(function(a)
{
	this.points = void 0 == a ? [] : a
}, function(a)
{
	var b = new THREE.Vector3,
		c = [],
		d = this.points,
		e;
	e = (d.length - 0) * a;
	a = Math.floor(e);
	e -= a;
	a += 0 < a ? 0 : (Math.floor(Math.abs(a) / d.length) + 1) * d.length;
	c[0] = (a - 1) % d.length;
	c[1] = a % d.length;
	c[2] = (a + 1) % d.length;
	c[3] = (a + 2) % d.length;
	b.x = THREE.Curve.Utils.interpolate(d[c[0]].x, d[c[1]].x, d[c[2]].x, d[c[3]].x, e);
	b.y = THREE.Curve.Utils.interpolate(d[c[0]].y, d[c[1]].y, d[c[2]].y, d[c[3]].y, e);
	b.z = THREE.Curve.Utils.interpolate(d[c[0]].z,
		d[c[1]].z, d[c[2]].z, d[c[3]].z, e);
	return b
});
THREE.CurvePath = function()
{
	this.curves = [];
	this.bends = [];
	this.autoClose = !1
};
THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype);
THREE.CurvePath.prototype.add = function(a)
{
	this.curves.push(a)
};
THREE.CurvePath.prototype.checkConnection = function() {};
THREE.CurvePath.prototype.closePath = function()
{
	var a = this.curves[0].getPoint(0),
		b = this.curves[this.curves.length - 1].getPoint(1);
	a.equals(b) || this.curves.push(new THREE.LineCurve(b, a))
};
THREE.CurvePath.prototype.getPoint = function(a)
{
	for (var b = a * this.getLength(), c = this.getCurveLengths(), a = 0; a < c.length;)
	{
		if (c[a] >= b) return b = c[a] - b, a = this.curves[a], b = 1 - b / a.getLength(), a.getPointAt(b);
		a++
	}
	return null
};
THREE.CurvePath.prototype.getLength = function()
{
	var a = this.getCurveLengths();
	return a[a.length - 1]
};
THREE.CurvePath.prototype.getCurveLengths = function()
{
	if (this.cacheLengths && this.cacheLengths.length == this.curves.length) return this.cacheLengths;
	var a = [],
		b = 0,
		c, d = this.curves.length;
	for (c = 0; c < d; c++) b += this.curves[c].getLength(), a.push(b);
	return this.cacheLengths = a
};
THREE.CurvePath.prototype.getBoundingBox = function()
{
	var a = this.getPoints(),
		b, c, d, e, f, g;
	b = c = Number.NEGATIVE_INFINITY;
	e = f = Number.POSITIVE_INFINITY;
	var i, h, k, l, m = a[0] instanceof THREE.Vector3;
	l = m ? new THREE.Vector3 : new THREE.Vector2;
	h = 0;
	for (k = a.length; h < k; h++) i = a[h], i.x > b ? b = i.x : i.x < e && (e = i.x), i.y > c ? c = i.y : i.y < f && (f = i.y), m && (i.z > d ? d = i.z : i.z < g && (g = i.z)), l.add(i);
	a = {
		minX: e,
		minY: f,
		maxX: b,
		maxY: c,
		centroid: l.divideScalar(k)
	};
	m && (a.maxZ = d, a.minZ = g);
	return a
};
THREE.CurvePath.prototype.createPointsGeometry = function(a)
{
	a = this.getPoints(a, !0);
	return this.createGeometry(a)
};
THREE.CurvePath.prototype.createSpacedPointsGeometry = function(a)
{
	a = this.getSpacedPoints(a, !0);
	return this.createGeometry(a)
};
THREE.CurvePath.prototype.createGeometry = function(a)
{
	for (var b = new THREE.Geometry, c = 0; c < a.length; c++) b.vertices.push(new THREE.Vector3(a[c].x, a[c].y, a[c].z || 0));
	return b
};
THREE.CurvePath.prototype.addWrapPath = function(a)
{
	this.bends.push(a)
};
THREE.CurvePath.prototype.getTransformedPoints = function(a, b)
{
	var c = this.getPoints(a),
		d, e;
	b || (b = this.bends);
	d = 0;
	for (e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
	return c
};
THREE.CurvePath.prototype.getTransformedSpacedPoints = function(a, b)
{
	var c = this.getSpacedPoints(a),
		d, e;
	b || (b = this.bends);
	d = 0;
	for (e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
	return c
};
THREE.CurvePath.prototype.getWrapPoints = function(a, b)
{
	var c = this.getBoundingBox(),
		d, e, f, g, i, h;
	d = 0;
	for (e = a.length; d < e; d++) f = a[d], g = f.x, i = f.y, h = g / c.maxX, h = b.getUtoTmapping(h, g), g = b.getPoint(h), i = b.getNormalVector(h)
		.multiplyScalar(i), f.x = g.x + i.x, f.y = g.y + i.y;
	return a
};
THREE.Gyroscope = function()
{
	THREE.Object3D.call(this)
};
THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype);
THREE.Gyroscope.prototype.updateMatrixWorld = function(a)
{
	this.matrixAutoUpdate && this.updateMatrix();
	if (this.matrixWorldNeedsUpdate || a) this.parent ? (this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorld.decompose(this.translationWorld, this.rotationWorld, this.scaleWorld), this.matrix.decompose(this.translationObject, this.rotationObject, this.scaleObject), this.matrixWorld.compose(this.translationWorld, this.rotationObject, this.scaleWorld)) : this.matrixWorld.copy(this.matrix),
		this.matrixWorldNeedsUpdate = !1, a = !0;
	for (var b = 0, c = this.children.length; b < c; b++) this.children[b].updateMatrixWorld(a)
};
THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3;
THREE.Gyroscope.prototype.translationObject = new THREE.Vector3;
THREE.Gyroscope.prototype.rotationWorld = new THREE.Quaternion;
THREE.Gyroscope.prototype.rotationObject = new THREE.Quaternion;
THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3;
THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3;
THREE.Path = function(a)
{
	THREE.CurvePath.call(this);
	this.actions = [];
	a && this.fromPoints(a)
};
THREE.Path.prototype = Object.create(THREE.CurvePath.prototype);
THREE.PathActions = {
	MOVE_TO: "moveTo",
	LINE_TO: "lineTo",
	QUADRATIC_CURVE_TO: "quadraticCurveTo",
	BEZIER_CURVE_TO: "bezierCurveTo",
	CSPLINE_THRU: "splineThru",
	ARC: "arc",
	ELLIPSE: "ellipse"
};
THREE.Path.prototype.fromPoints = function(a)
{
	this.moveTo(a[0].x, a[0].y);
	for (var b = 1, c = a.length; b < c; b++) this.lineTo(a[b].x, a[b].y)
};
THREE.Path.prototype.moveTo = function(a, b)
{
	var c = Array.prototype.slice.call(arguments);
	this.actions.push(
	{
		action: THREE.PathActions.MOVE_TO,
		args: c
	})
};
THREE.Path.prototype.lineTo = function(a, b)
{
	var c = Array.prototype.slice.call(arguments),
		d = this.actions[this.actions.length - 1].args,
		d = new THREE.LineCurve(new THREE.Vector2(d[d.length - 2], d[d.length - 1]), new THREE.Vector2(a, b));
	this.curves.push(d);
	this.actions.push(
	{
		action: THREE.PathActions.LINE_TO,
		args: c
	})
};
THREE.Path.prototype.quadraticCurveTo = function(a, b, c, d)
{
	var e = Array.prototype.slice.call(arguments),
		f = this.actions[this.actions.length - 1].args,
		f = new THREE.QuadraticBezierCurve(new THREE.Vector2(f[f.length - 2], f[f.length - 1]), new THREE.Vector2(a, b), new THREE.Vector2(c, d));
	this.curves.push(f);
	this.actions.push(
	{
		action: THREE.PathActions.QUADRATIC_CURVE_TO,
		args: e
	})
};
THREE.Path.prototype.bezierCurveTo = function(a, b, c, d, e, f)
{
	var g = Array.prototype.slice.call(arguments),
		i = this.actions[this.actions.length - 1].args,
		i = new THREE.CubicBezierCurve(new THREE.Vector2(i[i.length - 2], i[i.length - 1]), new THREE.Vector2(a, b), new THREE.Vector2(c, d), new THREE.Vector2(e, f));
	this.curves.push(i);
	this.actions.push(
	{
		action: THREE.PathActions.BEZIER_CURVE_TO,
		args: g
	})
};
THREE.Path.prototype.splineThru = function(a)
{
	var b = Array.prototype.slice.call(arguments),
		c = this.actions[this.actions.length - 1].args,
		c = [new THREE.Vector2(c[c.length - 2], c[c.length - 1])];
	Array.prototype.push.apply(c, a);
	c = new THREE.SplineCurve(c);
	this.curves.push(c);
	this.actions.push(
	{
		action: THREE.PathActions.CSPLINE_THRU,
		args: b
	})
};
THREE.Path.prototype.arc = function(a, b, c, d, e, f)
{
	var g = this.actions[this.actions.length - 1].args;
	this.absarc(a + g[g.length - 2], b + g[g.length - 1], c, d, e, f)
};
THREE.Path.prototype.absarc = function(a, b, c, d, e, f)
{
	this.absellipse(a, b, c, c, d, e, f)
};
THREE.Path.prototype.ellipse = function(a, b, c, d, e, f, g)
{
	var i = this.actions[this.actions.length - 1].args;
	this.absellipse(a + i[i.length - 2], b + i[i.length - 1], c, d, e, f, g)
};
THREE.Path.prototype.absellipse = function(a, b, c, d, e, f, g)
{
	var i = Array.prototype.slice.call(arguments),
		h = new THREE.EllipseCurve(a, b, c, d, e, f, g);
	this.curves.push(h);
	h = h.getPoint(g ? 1 : 0);
	i.push(h.x);
	i.push(h.y);
	this.actions.push(
	{
		action: THREE.PathActions.ELLIPSE,
		args: i
	})
};
THREE.Path.prototype.getSpacedPoints = function(a)
{
	a || (a = 40);
	for (var b = [], c = 0; c < a; c++) b.push(this.getPoint(c / a));
	return b
};
THREE.Path.prototype.getPoints = function(a, b)
{
	if (this.useSpacedPoints) return console.log("tata"), this.getSpacedPoints(a, b);
	var a = a || 12,
		c = [],
		d, e, f, g, i, h, k, l, m, n, r, p, q;
	d = 0;
	for (e = this.actions.length; d < e; d++) switch (f = this.actions[d], g = f.action, f = f.args, g)
	{
		case THREE.PathActions.MOVE_TO:
			c.push(new THREE.Vector2(f[0], f[1]));
			break;
		case THREE.PathActions.LINE_TO:
			c.push(new THREE.Vector2(f[0], f[1]));
			break;
		case THREE.PathActions.QUADRATIC_CURVE_TO:
			i = f[2];
			h = f[3];
			m = f[0];
			n = f[1];
			0 < c.length ? (g = c[c.length - 1], r = g.x,
				p = g.y) : (g = this.actions[d - 1].args, r = g[g.length - 2], p = g[g.length - 1]);
			for (f = 1; f <= a; f++) q = f / a, g = THREE.Shape.Utils.b2(q, r, m, i), q = THREE.Shape.Utils.b2(q, p, n, h), c.push(new THREE.Vector2(g, q));
			break;
		case THREE.PathActions.BEZIER_CURVE_TO:
			i = f[4];
			h = f[5];
			m = f[0];
			n = f[1];
			k = f[2];
			l = f[3];
			0 < c.length ? (g = c[c.length - 1], r = g.x, p = g.y) : (g = this.actions[d - 1].args, r = g[g.length - 2], p = g[g.length - 1]);
			for (f = 1; f <= a; f++) q = f / a, g = THREE.Shape.Utils.b3(q, r, m, k, i), q = THREE.Shape.Utils.b3(q, p, n, l, h), c.push(new THREE.Vector2(g, q));
			break;
		case THREE.PathActions.CSPLINE_THRU:
			g =
				this.actions[d - 1].args;
			q = [new THREE.Vector2(g[g.length - 2], g[g.length - 1])];
			g = a * f[0].length;
			q = q.concat(f[0]);
			q = new THREE.SplineCurve(q);
			for (f = 1; f <= g; f++) c.push(q.getPointAt(f / g));
			break;
		case THREE.PathActions.ARC:
			i = f[0];
			h = f[1];
			n = f[2];
			k = f[3];
			g = f[4];
			m = !!f[5];
			r = g - k;
			p = 2 * a;
			for (f = 1; f <= p; f++) q = f / p, m || (q = 1 - q), q = k + q * r, g = i + n * Math.cos(q), q = h + n * Math.sin(q), c.push(new THREE.Vector2(g, q));
			break;
		case THREE.PathActions.ELLIPSE:
			i = f[0];
			h = f[1];
			n = f[2];
			l = f[3];
			k = f[4];
			g = f[5];
			m = !!f[6];
			r = g - k;
			p = 2 * a;
			for (f = 1; f <= p; f++) q = f / p, m ||
				(q = 1 - q), q = k + q * r, g = i + n * Math.cos(q), q = h + l * Math.sin(q), c.push(new THREE.Vector2(g, q))
	}
	d = c[c.length - 1];
	1E-10 > Math.abs(d.x - c[0].x) && 1E-10 > Math.abs(d.y - c[0].y) && c.splice(c.length - 1, 1);
	b && c.push(c[0]);
	return c
};
THREE.Path.prototype.toShapes = function()
{
	var a, b, c, d, e = [],
		f = new THREE.Path;
	a = 0;
	for (b = this.actions.length; a < b; a++) c = this.actions[a], d = c.args, c = c.action, c == THREE.PathActions.MOVE_TO && 0 != f.actions.length && (e.push(f), f = new THREE.Path), f[c].apply(f, d);
	0 != f.actions.length && e.push(f);
	if (0 == e.length) return [];
	var g;
	d = [];
	a = !THREE.Shape.Utils.isClockWise(e[0].getPoints());
	if (1 == e.length) return f = e[0], g = new THREE.Shape, g.actions = f.actions, g.curves = f.curves, d.push(g), d;
	if (a)
	{
		g = new THREE.Shape;
		a = 0;
		for (b = e.length; a <
			b; a++) f = e[a], THREE.Shape.Utils.isClockWise(f.getPoints()) ? (g.actions = f.actions, g.curves = f.curves, d.push(g), g = new THREE.Shape) : g.holes.push(f)
	}
	else
	{
		a = 0;
		for (b = e.length; a < b; a++) f = e[a], THREE.Shape.Utils.isClockWise(f.getPoints()) ? (g && d.push(g), g = new THREE.Shape, g.actions = f.actions, g.curves = f.curves) : g.holes.push(f);
		d.push(g)
	}
	return d
};
THREE.Shape = function()
{
	THREE.Path.apply(this, arguments);
	this.holes = []
};
THREE.Shape.prototype = Object.create(THREE.Path.prototype);
THREE.Shape.prototype.extrude = function(a)
{
	return new THREE.ExtrudeGeometry(this, a)
};
THREE.Shape.prototype.makeGeometry = function(a)
{
	return new THREE.ShapeGeometry(this, a)
};
THREE.Shape.prototype.getPointsHoles = function(a)
{
	var b, c = this.holes.length,
		d = [];
	for (b = 0; b < c; b++) d[b] = this.holes[b].getTransformedPoints(a, this.bends);
	return d
};
THREE.Shape.prototype.getSpacedPointsHoles = function(a)
{
	var b, c = this.holes.length,
		d = [];
	for (b = 0; b < c; b++) d[b] = this.holes[b].getTransformedSpacedPoints(a, this.bends);
	return d
};
THREE.Shape.prototype.extractAllPoints = function(a)
{
	return {
		shape: this.getTransformedPoints(a),
		holes: this.getPointsHoles(a)
	}
};
THREE.Shape.prototype.extractPoints = function(a)
{
	return this.useSpacedPoints ? this.extractAllSpacedPoints(a) : this.extractAllPoints(a)
};
THREE.Shape.prototype.extractAllSpacedPoints = function(a)
{
	return {
		shape: this.getTransformedSpacedPoints(a),
		holes: this.getSpacedPointsHoles(a)
	}
};
THREE.Shape.Utils = {
	removeHoles: function(a, b)
	{
		var c = a.concat(),
			d = c.concat(),
			e, f, g, i, h, k, l, m, n, r, p = [];
		for (h = 0; h < b.length; h++)
		{
			k = b[h];
			Array.prototype.push.apply(d, k);
			f = Number.POSITIVE_INFINITY;
			for (e = 0; e < k.length; e++)
			{
				n = k[e];
				r = [];
				for (m = 0; m < c.length; m++) l = c[m], l = n.distanceToSquared(l), r.push(l), l < f && (f = l, g = e, i = m)
			}
			e = 0 <= i - 1 ? i - 1 : c.length - 1;
			f = 0 <= g - 1 ? g - 1 : k.length - 1;
			var q = [k[g], c[i], c[e]];
			m = THREE.FontUtils.Triangulate.area(q);
			var s = [k[g], k[f], c[i]];
			n = THREE.FontUtils.Triangulate.area(s);
			r = i;
			l = g;
			i += 1;
			g += -1;
			0 >
				i && (i += c.length);
			i %= c.length;
			0 > g && (g += k.length);
			g %= k.length;
			e = 0 <= i - 1 ? i - 1 : c.length - 1;
			f = 0 <= g - 1 ? g - 1 : k.length - 1;
			q = [k[g], c[i], c[e]];
			q = THREE.FontUtils.Triangulate.area(q);
			s = [k[g], k[f], c[i]];
			s = THREE.FontUtils.Triangulate.area(s);
			m + n > q + s && (i = r, g = l, 0 > i && (i += c.length), i %= c.length, 0 > g && (g += k.length), g %= k.length, e = 0 <= i - 1 ? i - 1 : c.length - 1, f = 0 <= g - 1 ? g - 1 : k.length - 1);
			m = c.slice(0, i);
			n = c.slice(i);
			r = k.slice(g);
			l = k.slice(0, g);
			f = [k[g], k[f], c[i]];
			p.push([k[g], c[i], c[e]]);
			p.push(f);
			c = m.concat(r)
				.concat(l)
				.concat(n)
		}
		return {
			shape: c,
			isolatedPts: p,
			allpoints: d
		}
	},
	triangulateShape: function(a, b)
	{
		var c = THREE.Shape.Utils.removeHoles(a, b),
			d = c.allpoints,
			e = c.isolatedPts,
			c = THREE.FontUtils.Triangulate(c.shape, !1),
			f, g, i, h, k = {};
		f = 0;
		for (g = d.length; f < g; f++) h = d[f].x + ":" + d[f].y, void 0 !== k[h] && console.log("Duplicate point", h), k[h] = f;
		f = 0;
		for (g = c.length; f < g; f++)
		{
			i = c[f];
			for (d = 0; 3 > d; d++) h = i[d].x + ":" + i[d].y, h = k[h], void 0 !== h && (i[d] = h)
		}
		f = 0;
		for (g = e.length; f < g; f++)
		{
			i = e[f];
			for (d = 0; 3 > d; d++) h = i[d].x + ":" + i[d].y, h = k[h], void 0 !== h && (i[d] = h)
		}
		return c.concat(e)
	},
	isClockWise: function(a)
	{
		return 0 > THREE.FontUtils.Triangulate.area(a)
	},
	b2p0: function(a, b)
	{
		var c = 1 - a;
		return c * c * b
	},
	b2p1: function(a, b)
	{
		return 2 * (1 - a) * a * b
	},
	b2p2: function(a, b)
	{
		return a * a * b
	},
	b2: function(a, b, c, d)
	{
		return this.b2p0(a, b) + this.b2p1(a, c) + this.b2p2(a, d)
	},
	b3p0: function(a, b)
	{
		var c = 1 - a;
		return c * c * c * b
	},
	b3p1: function(a, b)
	{
		var c = 1 - a;
		return 3 * c * c * a * b
	},
	b3p2: function(a, b)
	{
		return 3 * (1 - a) * a * a * b
	},
	b3p3: function(a, b)
	{
		return a * a * a * b
	},
	b3: function(a, b, c, d, e)
	{
		return this.b3p0(a, b) + this.b3p1(a, c) + this.b3p2(a, d) +
			this.b3p3(a, e)
	}
};
THREE.AnimationHandler = function()
{
	var a = [],
		b = {},
		c = {
			update: function(b)
			{
				for (var c = 0; c < a.length; c++) a[c].update(b)
			},
			addToUpdate: function(b)
			{
				-1 === a.indexOf(b) && a.push(b)
			},
			removeFromUpdate: function(b)
			{
				b = a.indexOf(b); - 1 !== b && a.splice(b, 1)
			},
			add: function(a)
			{
				void 0 !== b[a.name] && console.log("THREE.AnimationHandler.add: Warning! " + a.name + " already exists in library. Overwriting.");
				b[a.name] = a;
				if (!0 !== a.initialized)
				{
					for (var c = 0; c < a.hierarchy.length; c++)
					{
						for (var d = 0; d < a.hierarchy[c].keys.length; d++)
							if (0 > a.hierarchy[c].keys[d].time &&
								(a.hierarchy[c].keys[d].time = 0), void 0 !== a.hierarchy[c].keys[d].rot && !(a.hierarchy[c].keys[d].rot instanceof THREE.Quaternion))
							{
								var i = a.hierarchy[c].keys[d].rot;
								a.hierarchy[c].keys[d].rot = new THREE.Quaternion(i[0], i[1], i[2], i[3])
							} if (a.hierarchy[c].keys.length && void 0 !== a.hierarchy[c].keys[0].morphTargets)
						{
							i = {};
							for (d = 0; d < a.hierarchy[c].keys.length; d++)
								for (var h = 0; h < a.hierarchy[c].keys[d].morphTargets.length; h++)
								{
									var k = a.hierarchy[c].keys[d].morphTargets[h];
									i[k] = -1
								}
							a.hierarchy[c].usedMorphTargets = i;
							for (d = 0; d < a.hierarchy[c].keys.length; d++)
							{
								var l = {};
								for (k in i)
								{
									for (h = 0; h < a.hierarchy[c].keys[d].morphTargets.length; h++)
										if (a.hierarchy[c].keys[d].morphTargets[h] === k)
										{
											l[k] = a.hierarchy[c].keys[d].morphTargetsInfluences[h];
											break
										} h === a.hierarchy[c].keys[d].morphTargets.length && (l[k] = 0)
								}
								a.hierarchy[c].keys[d].morphTargetsInfluences = l
							}
						}
						for (d = 1; d < a.hierarchy[c].keys.length; d++) a.hierarchy[c].keys[d].time === a.hierarchy[c].keys[d - 1].time && (a.hierarchy[c].keys.splice(d, 1), d--);
						for (d = 0; d < a.hierarchy[c].keys.length; d++) a.hierarchy[c].keys[d].index =
							d
					}
					d = parseInt(a.length * a.fps, 10);
					a.JIT = {};
					a.JIT.hierarchy = [];
					for (c = 0; c < a.hierarchy.length; c++) a.JIT.hierarchy.push(Array(d));
					a.initialized = !0
				}
			},
			get: function(a)
			{
				if ("string" === typeof a)
				{
					if (b[a]) return b[a];
					console.log("THREE.AnimationHandler.get: Couldn't find animation " + a);
					return null
				}
			},
			parse: function(a)
			{
				var b = [];
				if (a instanceof THREE.SkinnedMesh)
					for (var c = 0; c < a.bones.length; c++) b.push(a.bones[c]);
				else d(a, b);
				return b
			}
		},
		d = function(a, b)
		{
			b.push(a);
			for (var c = 0; c < a.children.length; c++) d(a.children[c],
				b)
		};
	c.LINEAR = 0;
	c.CATMULLROM = 1;
	c.CATMULLROM_FORWARD = 2;
	return c
}();
THREE.Animation = function(a, b, c)
{
	this.root = a;
	this.data = THREE.AnimationHandler.get(b);
	this.hierarchy = THREE.AnimationHandler.parse(a);
	this.currentTime = 0;
	this.timeScale = 1;
	this.isPlaying = !1;
	this.loop = this.isPaused = !0;
	this.interpolationType = void 0 !== c ? c : THREE.AnimationHandler.LINEAR;
	this.points = [];
	this.target = new THREE.Vector3
};
THREE.Animation.prototype.play = function(a, b)
{
	if (!1 === this.isPlaying)
	{
		this.isPlaying = !0;
		this.loop = void 0 !== a ? a : !0;
		this.currentTime = void 0 !== b ? b : 0;
		var c, d = this.hierarchy.length,
			e;
		for (c = 0; c < d; c++)
		{
			e = this.hierarchy[c];
			this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD && (e.useQuaternion = !0);
			e.matrixAutoUpdate = !0;
			void 0 === e.animationCache && (e.animationCache = {}, e.animationCache.prevKey = {
				pos: 0,
				rot: 0,
				scl: 0
			}, e.animationCache.nextKey = {
				pos: 0,
				rot: 0,
				scl: 0
			}, e.animationCache.originalMatrix = e instanceof THREE.Bone ? e.skinMatrix : e.matrix);
			var f = e.animationCache.prevKey;
			e = e.animationCache.nextKey;
			f.pos = this.data.hierarchy[c].keys[0];
			f.rot = this.data.hierarchy[c].keys[0];
			f.scl = this.data.hierarchy[c].keys[0];
			e.pos = this.getNextKeyWith("pos", c, 1);
			e.rot = this.getNextKeyWith("rot", c, 1);
			e.scl = this.getNextKeyWith("scl", c, 1)
		}
		this.update(0)
	}
	this.isPaused = !1;
	THREE.AnimationHandler.addToUpdate(this)
};
THREE.Animation.prototype.pause = function()
{
	!0 === this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this);
	this.isPaused = !this.isPaused
};
THREE.Animation.prototype.stop = function()
{
	this.isPaused = this.isPlaying = !1;
	THREE.AnimationHandler.removeFromUpdate(this)
};
THREE.Animation.prototype.update = function(a)
{
	if (!1 !== this.isPlaying)
	{
		var b = ["pos", "rot", "scl"],
			c, d, e, f, g, i, h, k, l;
		l = this.currentTime += a * this.timeScale;
		k = this.currentTime %= this.data.length;
		parseInt(Math.min(k * this.data.fps, this.data.length * this.data.fps), 10);
		for (var m = 0, n = this.hierarchy.length; m < n; m++)
		{
			a = this.hierarchy[m];
			h = a.animationCache;
			for (var r = 0; 3 > r; r++)
			{
				c = b[r];
				g = h.prevKey[c];
				i = h.nextKey[c];
				if (i.time <= l)
				{
					if (k < l)
						if (this.loop)
						{
							g = this.data.hierarchy[m].keys[0];
							for (i = this.getNextKeyWith(c, m, 1); i.time <
								k;) g = i, i = this.getNextKeyWith(c, m, i.index + 1)
						}
					else
					{
						this.stop();
						return
					}
					else
					{
						do g = i, i = this.getNextKeyWith(c, m, i.index + 1); while (i.time < k)
					}
					h.prevKey[c] = g;
					h.nextKey[c] = i
				}
				a.matrixAutoUpdate = !0;
				a.matrixWorldNeedsUpdate = !0;
				d = (k - g.time) / (i.time - g.time);
				e = g[c];
				f = i[c];
				if (0 > d || 1 < d) console.log("THREE.Animation.update: Warning! Scale out of bounds:" + d + " on bone " + m), d = 0 > d ? 0 : 1;
				if ("pos" === c)
					if (c = a.position, this.interpolationType === THREE.AnimationHandler.LINEAR) c.x = e[0] + (f[0] - e[0]) * d, c.y = e[1] + (f[1] - e[1]) * d, c.z = e[2] +
						(f[2] - e[2]) * d;
					else
					{
						if (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) this.points[0] = this.getPrevKeyWith("pos", m, g.index - 1)
							.pos, this.points[1] = e, this.points[2] = f, this.points[3] = this.getNextKeyWith("pos", m, i.index + 1)
							.pos, d = 0.33 * d + 0.33, e = this.interpolateCatmullRom(this.points, d), c.x = e[0], c.y = e[1], c.z = e[2], this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD && (d = this.interpolateCatmullRom(this.points, 1.01 * d),
								this.target.set(d[0], d[1], d[2]), this.target.sub(c), this.target.y = 0, this.target.normalize(), d = Math.atan2(this.target.x, this.target.z), a.rotation.set(0, d, 0))
					}
				else "rot" === c ? THREE.Quaternion.slerp(e, f, a.quaternion, d) : "scl" === c && (c = a.scale, c.x = e[0] + (f[0] - e[0]) * d, c.y = e[1] + (f[1] - e[1]) * d, c.z = e[2] + (f[2] - e[2]) * d)
			}
		}
	}
};
THREE.Animation.prototype.interpolateCatmullRom = function(a, b)
{
	var c = [],
		d = [],
		e, f, g, i, h, k;
	e = (a.length - 1) * b;
	f = Math.floor(e);
	e -= f;
	c[0] = 0 === f ? f : f - 1;
	c[1] = f;
	c[2] = f > a.length - 2 ? f : f + 1;
	c[3] = f > a.length - 3 ? f : f + 2;
	f = a[c[0]];
	i = a[c[1]];
	h = a[c[2]];
	k = a[c[3]];
	c = e * e;
	g = e * c;
	d[0] = this.interpolate(f[0], i[0], h[0], k[0], e, c, g);
	d[1] = this.interpolate(f[1], i[1], h[1], k[1], e, c, g);
	d[2] = this.interpolate(f[2], i[2], h[2], k[2], e, c, g);
	return d
};
THREE.Animation.prototype.interpolate = function(a, b, c, d, e, f, g)
{
	a = 0.5 * (c - a);
	d = 0.5 * (d - b);
	return (2 * (b - c) + a + d) * g + (-3 * (b - c) - 2 * a - d) * f + a * e + b
};
THREE.Animation.prototype.getNextKeyWith = function(a, b, c)
{
	for (var d = this.data.hierarchy[b].keys, c = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? c < d.length - 1 ? c : d.length - 1 : c % d.length; c < d.length; c++)
		if (void 0 !== d[c][a]) return d[c];
	return this.data.hierarchy[b].keys[0]
};
THREE.Animation.prototype.getPrevKeyWith = function(a, b, c)
{
	for (var d = this.data.hierarchy[b].keys, c = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? 0 < c ? c : 0 : 0 <= c ? c : c + d.length; 0 <= c; c--)
		if (void 0 !== d[c][a]) return d[c];
	return this.data.hierarchy[b].keys[d.length - 1]
};
THREE.KeyFrameAnimation = function(a, b, c)
{
	this.root = a;
	this.data = THREE.AnimationHandler.get(b);
	this.hierarchy = THREE.AnimationHandler.parse(a);
	this.currentTime = 0;
	this.timeScale = 0.001;
	this.isPlaying = !1;
	this.loop = this.isPaused = !0;
	this.JITCompile = void 0 !== c ? c : !0;
	a = 0;
	for (b = this.hierarchy.length; a < b; a++)
	{
		var c = this.data.hierarchy[a].sids,
			d = this.hierarchy[a];
		if (this.data.hierarchy[a].keys.length && c)
		{
			for (var e = 0; e < c.length; e++)
			{
				var f = c[e],
					g = this.getNextKeyWith(f, a, 0);
				g && g.apply(f)
			}
			d.matrixAutoUpdate = !1;
			this.data.hierarchy[a].node.updateMatrix();
			d.matrixWorldNeedsUpdate = !0
		}
	}
};
THREE.KeyFrameAnimation.prototype.play = function(a, b)
{
	if (!this.isPlaying)
	{
		this.isPlaying = !0;
		this.loop = void 0 !== a ? a : !0;
		this.currentTime = void 0 !== b ? b : 0;
		this.startTimeMs = b;
		this.startTime = 1E7;
		this.endTime = -this.startTime;
		var c, d = this.hierarchy.length,
			e, f;
		for (c = 0; c < d; c++) e = this.hierarchy[c], f = this.data.hierarchy[c], e.useQuaternion = !0, void 0 === f.animationCache && (f.animationCache = {}, f.animationCache.prevKey = null, f.animationCache.nextKey = null, f.animationCache.originalMatrix = e instanceof THREE.Bone ? e.skinMatrix :
			e.matrix), e = this.data.hierarchy[c].keys, e.length && (f.animationCache.prevKey = e[0], f.animationCache.nextKey = e[1], this.startTime = Math.min(e[0].time, this.startTime), this.endTime = Math.max(e[e.length - 1].time, this.endTime));
		this.update(0)
	}
	this.isPaused = !1;
	THREE.AnimationHandler.addToUpdate(this)
};
THREE.KeyFrameAnimation.prototype.pause = function()
{
	this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this);
	this.isPaused = !this.isPaused
};
THREE.KeyFrameAnimation.prototype.stop = function()
{
	this.isPaused = this.isPlaying = !1;
	THREE.AnimationHandler.removeFromUpdate(this);
	for (var a = 0; a < this.data.hierarchy.length; a++)
	{
		var b = this.hierarchy[a],
			c = this.data.hierarchy[a];
		if (void 0 !== c.animationCache)
		{
			var d = c.animationCache.originalMatrix;
			b instanceof THREE.Bone ? (d.copy(b.skinMatrix), b.skinMatrix = d) : (d.copy(b.matrix), b.matrix = d);
			delete c.animationCache
		}
	}
};
THREE.KeyFrameAnimation.prototype.update = function(a)
{
	if (this.isPlaying)
	{
		var b, c, d, e, f = this.data.JIT.hierarchy,
			g, i, h;
		i = this.currentTime += a * this.timeScale;
		g = this.currentTime %= this.data.length;
		g < this.startTimeMs && (g = this.currentTime = this.startTimeMs + g);
		e = parseInt(Math.min(g * this.data.fps, this.data.length * this.data.fps), 10);
		if ((h = g < i) && !this.loop)
		{
			for (var a = 0, k = this.hierarchy.length; a < k; a++)
			{
				var l = this.data.hierarchy[a].keys,
					f = this.data.hierarchy[a].sids;
				d = l.length - 1;
				e = this.hierarchy[a];
				if (l.length)
				{
					for (l =
						0; l < f.length; l++) g = f[l], (i = this.getPrevKeyWith(g, a, d)) && i.apply(g);
					this.data.hierarchy[a].node.updateMatrix();
					e.matrixWorldNeedsUpdate = !0
				}
			}
			this.stop()
		}
		else if (!(g < this.startTime))
		{
			a = 0;
			for (k = this.hierarchy.length; a < k; a++)
			{
				d = this.hierarchy[a];
				b = this.data.hierarchy[a];
				var l = b.keys,
					m = b.animationCache;
				if (this.JITCompile && void 0 !== f[a][e]) d instanceof THREE.Bone ? (d.skinMatrix = f[a][e], d.matrixWorldNeedsUpdate = !1) : (d.matrix = f[a][e], d.matrixWorldNeedsUpdate = !0);
				else if (l.length)
				{
					this.JITCompile && m && (d instanceof THREE.Bone ? d.skinMatrix = m.originalMatrix : d.matrix = m.originalMatrix);
					b = m.prevKey;
					c = m.nextKey;
					if (b && c)
					{
						if (c.time <= i)
						{
							if (h && this.loop)
							{
								b = l[0];
								for (c = l[1]; c.time < g;) b = c, c = l[b.index + 1]
							}
							else if (!h)
								for (var n = l.length - 1; c.time < g && c.index !== n;) b = c, c = l[b.index + 1];
							m.prevKey = b;
							m.nextKey = c
						}
						c.time >= g ? b.interpolate(c, g) : b.interpolate(c, c.time)
					}
					this.data.hierarchy[a].node.updateMatrix();
					d.matrixWorldNeedsUpdate = !0
				}
			}
			if (this.JITCompile && void 0 === f[0][e])
			{
				this.hierarchy[0].updateMatrixWorld(!0);
				for (a = 0; a < this.hierarchy.length; a++) f[a][e] =
					this.hierarchy[a] instanceof THREE.Bone ? this.hierarchy[a].skinMatrix.clone() : this.hierarchy[a].matrix.clone()
			}
		}
	}
};
THREE.KeyFrameAnimation.prototype.getNextKeyWith = function(a, b, c)
{
	b = this.data.hierarchy[b].keys;
	for (c %= b.length; c < b.length; c++)
		if (b[c].hasTarget(a)) return b[c];
	return b[0]
};
THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function(a, b, c)
{
	b = this.data.hierarchy[b].keys;
	for (c = 0 <= c ? c : c + b.length; 0 <= c; c--)
		if (b[c].hasTarget(a)) return b[c];
	return b[b.length - 1]
};
THREE.CubeCamera = function(a, b, c)
{
	THREE.Object3D.call(this);
	var d = new THREE.PerspectiveCamera(90, 1, a, b);
	d.up.set(0, -1, 0);
	d.lookAt(new THREE.Vector3(1, 0, 0));
	this.add(d);
	var e = new THREE.PerspectiveCamera(90, 1, a, b);
	e.up.set(0, -1, 0);
	e.lookAt(new THREE.Vector3(-1, 0, 0));
	this.add(e);
	var f = new THREE.PerspectiveCamera(90, 1, a, b);
	f.up.set(0, 0, 1);
	f.lookAt(new THREE.Vector3(0, 1, 0));
	this.add(f);
	var g = new THREE.PerspectiveCamera(90, 1, a, b);
	g.up.set(0, 0, -1);
	g.lookAt(new THREE.Vector3(0, -1, 0));
	this.add(g);
	var i = new THREE.PerspectiveCamera(90,
		1, a, b);
	i.up.set(0, -1, 0);
	i.lookAt(new THREE.Vector3(0, 0, 1));
	this.add(i);
	var h = new THREE.PerspectiveCamera(90, 1, a, b);
	h.up.set(0, -1, 0);
	h.lookAt(new THREE.Vector3(0, 0, -1));
	this.add(h);
	this.renderTarget = new THREE.WebGLRenderTargetCube(c, c,
	{
		format: THREE.RGBFormat,
		magFilter: THREE.LinearFilter,
		minFilter: THREE.LinearFilter
	});
	this.updateCubeMap = function(a, b)
	{
		var c = this.renderTarget,
			n = c.generateMipmaps;
		c.generateMipmaps = !1;
		c.activeCubeFace = 0;
		a.render(b, d, c);
		c.activeCubeFace = 1;
		a.render(b, e, c);
		c.activeCubeFace =
			2;
		a.render(b, f, c);
		c.activeCubeFace = 3;
		a.render(b, g, c);
		c.activeCubeFace = 4;
		a.render(b, i, c);
		c.generateMipmaps = n;
		c.activeCubeFace = 5;
		a.render(b, h, c)
	}
};
THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype);
THREE.CombinedCamera = function(a, b, c, d, e, f, g)
{
	THREE.Camera.call(this);
	this.fov = c;
	this.left = -a / 2;
	this.right = a / 2;
	this.top = b / 2;
	this.bottom = -b / 2;
	this.cameraO = new THREE.OrthographicCamera(a / -2, a / 2, b / 2, b / -2, f, g);
	this.cameraP = new THREE.PerspectiveCamera(c, a / b, d, e);
	this.zoom = 1;
	this.toPerspective()
};
THREE.CombinedCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.CombinedCamera.prototype.toPerspective = function()
{
	this.near = this.cameraP.near;
	this.far = this.cameraP.far;
	this.cameraP.fov = this.fov / this.zoom;
	this.cameraP.updateProjectionMatrix();
	this.projectionMatrix = this.cameraP.projectionMatrix;
	this.inPerspectiveMode = !0;
	this.inOrthographicMode = !1
};
THREE.CombinedCamera.prototype.toOrthographic = function()
{
	var a = this.cameraP.aspect,
		b = (this.cameraP.near + this.cameraP.far) / 2,
		b = Math.tan(this.fov / 2) * b,
		a = 2 * b * a / 2,
		b = b / this.zoom,
		a = a / this.zoom;
	this.cameraO.left = -a;
	this.cameraO.right = a;
	this.cameraO.top = b;
	this.cameraO.bottom = -b;
	this.cameraO.updateProjectionMatrix();
	this.near = this.cameraO.near;
	this.far = this.cameraO.far;
	this.projectionMatrix = this.cameraO.projectionMatrix;
	this.inPerspectiveMode = !1;
	this.inOrthographicMode = !0
};
THREE.CombinedCamera.prototype.setSize = function(a, b)
{
	this.cameraP.aspect = a / b;
	this.left = -a / 2;
	this.right = a / 2;
	this.top = b / 2;
	this.bottom = -b / 2
};
THREE.CombinedCamera.prototype.setFov = function(a)
{
	this.fov = a;
	this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic()
};
THREE.CombinedCamera.prototype.updateProjectionMatrix = function()
{
	this.inPerspectiveMode ? this.toPerspective() : (this.toPerspective(), this.toOrthographic())
};
THREE.CombinedCamera.prototype.setLens = function(a, b)
{
	void 0 === b && (b = 24);
	var c = 2 * THREE.Math.radToDeg(Math.atan(b / (2 * a)));
	this.setFov(c);
	return c
};
THREE.CombinedCamera.prototype.setZoom = function(a)
{
	this.zoom = a;
	this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic()
};
THREE.CombinedCamera.prototype.toFrontView = function()
{
	this.rotation.x = 0;
	this.rotation.y = 0;
	this.rotation.z = 0;
	this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toBackView = function()
{
	this.rotation.x = 0;
	this.rotation.y = Math.PI;
	this.rotation.z = 0;
	this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toLeftView = function()
{
	this.rotation.x = 0;
	this.rotation.y = -Math.PI / 2;
	this.rotation.z = 0;
	this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toRightView = function()
{
	this.rotation.x = 0;
	this.rotation.y = Math.PI / 2;
	this.rotation.z = 0;
	this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toTopView = function()
{
	this.rotation.x = -Math.PI / 2;
	this.rotation.y = 0;
	this.rotation.z = 0;
	this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toBottomView = function()
{
	this.rotation.x = Math.PI / 2;
	this.rotation.y = 0;
	this.rotation.z = 0;
	this.rotationAutoUpdate = !1
};
THREE.AsteriskGeometry = function(a, b)
{
	THREE.Geometry.call(this);
	for (var c = 0.707 * a, d = 0.707 * b, c = [
		[a, 0, 0],
		[b, 0, 0],
		[-a, 0, 0],
		[-b, 0, 0],
		[0, a, 0],
		[0, b, 0],
		[0, -a, 0],
		[0, -b, 0],
		[0, 0, a],
		[0, 0, b],
		[0, 0, -a],
		[0, 0, -b],
		[c, c, 0],
		[d, d, 0],
		[-c, -c, 0],
		[-d, -d, 0],
		[c, -c, 0],
		[d, -d, 0],
		[-c, c, 0],
		[-d, d, 0],
		[c, 0, c],
		[d, 0, d],
		[-c, 0, -c],
		[-d, 0, -d],
		[c, 0, -c],
		[d, 0, -d],
		[-c, 0, c],
		[-d, 0, d],
		[0, c, c],
		[0, d, d],
		[0, -c, -c],
		[0, -d, -d],
		[0, c, -c],
		[0, d, -d],
		[0, -c, c],
		[0, -d, d]
	], d = 0, e = c.length; d < e; d++) this.vertices.push(new THREE.Vector3(c[d][0], c[d][1], c[d][2]))
};
THREE.AsteriskGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CircleGeometry = function(a, b, c, d)
{
	THREE.Geometry.call(this);
	var a = a || 50,
		c = void 0 !== c ? c : 0,
		d = void 0 !== d ? d : 2 * Math.PI,
		b = void 0 !== b ? Math.max(3, b) : 8,
		e, f = [];
	e = new THREE.Vector3;
	var g = new THREE.Vector2(0.5, 0.5);
	this.vertices.push(e);
	f.push(g);
	for (e = 0; e <= b; e++)
	{
		var i = new THREE.Vector3;
		i.x = a * Math.cos(c + e / b * d);
		i.y = a * Math.sin(c + e / b * d);
		this.vertices.push(i);
		f.push(new THREE.Vector2((i.x / a + 1) / 2, -(i.y / a + 1) / 2 + 1))
	}
	c = new THREE.Vector3(0, 0, -1);
	for (e = 1; e <= b; e++) this.faces.push(new THREE.Face3(e, e + 1, 0, [c, c, c])),
		this.faceVertexUvs[0].push([f[e], f[e + 1], g]);
	this.computeCentroids();
	this.computeFaceNormals();
	this.boundingSphere = new THREE.Sphere(new THREE.Vector3, a)
};
THREE.CircleGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CubeGeometry = function(a, b, c, d, e, f)
{
	function g(a, b, c, d, e, f, g, q)
	{
		var s, t = i.widthSegments,
			x = i.heightSegments,
			z = e / 2,
			v = f / 2,
			I = i.vertices.length;
		if ("x" === a && "y" === b || "y" === a && "x" === b) s = "z";
		else if ("x" === a && "z" === b || "z" === a && "x" === b) s = "y", x = i.depthSegments;
		else if ("z" === a && "y" === b || "y" === a && "z" === b) s = "x", t = i.depthSegments;
		var H = t + 1,
			D = x + 1,
			y = e / t,
			F = f / x,
			E = new THREE.Vector3;
		E[s] = 0 < g ? 1 : -1;
		for (e = 0; e < D; e++)
			for (f = 0; f < H; f++)
			{
				var G = new THREE.Vector3;
				G[a] = (f * y - z) * c;
				G[b] = (e * F - v) * d;
				G[s] = g;
				i.vertices.push(G)
			}
		for (e =
			0; e < x; e++)
			for (f = 0; f < t; f++) a = new THREE.Face4(f + H * e + I, f + H * (e + 1) + I, f + 1 + H * (e + 1) + I, f + 1 + H * e + I), a.normal.copy(E), a.vertexNormals.push(E.clone(), E.clone(), E.clone(), E.clone()), a.materialIndex = q, i.faces.push(a), i.faceVertexUvs[0].push([new THREE.Vector2(f / t, 1 - e / x), new THREE.Vector2(f / t, 1 - (e + 1) / x), new THREE.Vector2((f + 1) / t, 1 - (e + 1) / x), new THREE.Vector2((f + 1) / t, 1 - e / x)])
	}
	THREE.Geometry.call(this);
	var i = this;
	this.width = a;
	this.height = b;
	this.depth = c;
	this.widthSegments = d || 1;
	this.heightSegments = e || 1;
	this.depthSegments =
		f || 1;
	a = this.width / 2;
	b = this.height / 2;
	c = this.depth / 2;
	g("z", "y", -1, -1, this.depth, this.height, a, 0);
	g("z", "y", 1, -1, this.depth, this.height, -a, 1);
	g("x", "z", 1, 1, this.width, this.depth, b, 2);
	g("x", "z", 1, -1, this.width, this.depth, -b, 3);
	g("x", "y", 1, -1, this.width, this.height, c, 4);
	g("x", "y", -1, -1, this.width, this.height, -c, 5);
	this.computeCentroids();
	this.mergeVertices()
};
THREE.CubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CylinderGeometry = function(a, b, c, d, e, f)
{
	THREE.Geometry.call(this);
	var a = void 0 !== a ? a : 20,
		b = void 0 !== b ? b : 20,
		c = void 0 !== c ? c : 100,
		g = c / 2,
		d = d || 8,
		e = e || 1,
		i, h, k = [],
		l = [];
	for (h = 0; h <= e; h++)
	{
		var m = [],
			n = [],
			r = h / e,
			p = r * (b - a) + a;
		for (i = 0; i <= d; i++)
		{
			var q = i / d,
				s = new THREE.Vector3;
			s.x = p * Math.sin(2 * q * Math.PI);
			s.y = -r * c + g;
			s.z = p * Math.cos(2 * q * Math.PI);
			this.vertices.push(s);
			m.push(this.vertices.length - 1);
			n.push(new THREE.Vector2(q, 1 - r))
		}
		k.push(m);
		l.push(n)
	}
	c = (b - a) / c;
	for (i = 0; i < d; i++)
	{
		0 !== a ? (m = this.vertices[k[0][i]].clone(),
			n = this.vertices[k[0][i + 1]].clone()) : (m = this.vertices[k[1][i]].clone(), n = this.vertices[k[1][i + 1]].clone());
		m.setY(Math.sqrt(m.x * m.x + m.z * m.z) * c)
			.normalize();
		n.setY(Math.sqrt(n.x * n.x + n.z * n.z) * c)
			.normalize();
		for (h = 0; h < e; h++)
		{
			var r = k[h][i],
				p = k[h + 1][i],
				q = k[h + 1][i + 1],
				s = k[h][i + 1],
				t = m.clone(),
				x = m.clone(),
				z = n.clone(),
				v = n.clone(),
				I = l[h][i].clone(),
				H = l[h + 1][i].clone(),
				D = l[h + 1][i + 1].clone(),
				y = l[h][i + 1].clone();
			this.faces.push(new THREE.Face4(r, p, q, s, [t, x, z, v]));
			this.faceVertexUvs[0].push([I, H, D, y])
		}
	}
	if (!f && 0 <
		a)
	{
		this.vertices.push(new THREE.Vector3(0, g, 0));
		for (i = 0; i < d; i++) r = k[0][i], p = k[0][i + 1], q = this.vertices.length - 1, t = new THREE.Vector3(0, 1, 0), x = new THREE.Vector3(0, 1, 0), z = new THREE.Vector3(0, 1, 0), I = l[0][i].clone(), H = l[0][i + 1].clone(), D = new THREE.Vector2(H.u, 0), this.faces.push(new THREE.Face3(r, p, q, [t, x, z])), this.faceVertexUvs[0].push([I, H, D])
	}
	if (!f && 0 < b)
	{
		this.vertices.push(new THREE.Vector3(0, -g, 0));
		for (i = 0; i < d; i++) r = k[h][i + 1], p = k[h][i], q = this.vertices.length - 1, t = new THREE.Vector3(0, -1, 0), x = new THREE.Vector3(0,
			-1, 0), z = new THREE.Vector3(0, -1, 0), I = l[h][i + 1].clone(), H = l[h][i].clone(), D = new THREE.Vector2(H.u, 1), this.faces.push(new THREE.Face3(r, p, q, [t, x, z])), this.faceVertexUvs[0].push([I, H, D])
	}
	this.computeCentroids();
	this.computeFaceNormals()
};
THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry = function(a, b)
{
	"undefined" !== typeof a && (THREE.Geometry.call(this), a = a instanceof Array ? a : [a], this.shapebb = a[a.length - 1].getBoundingBox(), this.addShapeList(a, b), this.computeCentroids(), this.computeFaceNormals())
};
THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry.prototype.addShapeList = function(a, b)
{
	for (var c = a.length, d = 0; d < c; d++) this.addShape(a[d], b)
};
THREE.ExtrudeGeometry.prototype.addShape = function(a, b)
{
	function c(a, b, c)
	{
		b || console.log("die");
		return b.clone()
			.multiplyScalar(c)
			.add(a)
	}

	function d(a, b, c)
	{
		var d = THREE.ExtrudeGeometry.__v1,
			e = THREE.ExtrudeGeometry.__v2,
			f = THREE.ExtrudeGeometry.__v3,
			g = THREE.ExtrudeGeometry.__v4,
			h = THREE.ExtrudeGeometry.__v5,
			i = THREE.ExtrudeGeometry.__v6;
		d.set(a.x - b.x, a.y - b.y);
		e.set(a.x - c.x, a.y - c.y);
		d = d.normalize();
		e = e.normalize();
		f.set(-d.y, d.x);
		g.set(e.y, -e.x);
		h.copy(a)
			.add(f);
		i.copy(a)
			.add(g);
		if (h.equals(i)) return g.clone();
		h.copy(b)
			.add(f);
		i.copy(c)
			.add(g);
		f = d.dot(g);
		g = i.sub(h)
			.dot(g);
		0 === f && (console.log("Either infinite or no solutions!"), 0 === g ? console.log("Its finite solutions.") : console.log("Too bad, no solutions."));
		g /= f;
		return 0 > g ? (b = Math.atan2(b.y - a.y, b.x - a.x), a = Math.atan2(c.y - a.y, c.x - a.x), b > a && (a += 2 * Math.PI), c = (b + a) / 2, a = -Math.cos(c), c = -Math.sin(c), new THREE.Vector2(a, c)) : d.multiplyScalar(g)
			.add(h)
			.sub(a)
			.clone()
	}

	function e(c, d)
	{
		var e, f;
		for (J = c.length; 0 <= --J;)
		{
			e = J;
			f = J - 1;
			0 > f && (f = c.length - 1);
			for (var g = 0, h = r + 2 * l,
				g = 0; g < h; g++)
			{
				var i = aa * g,
					k = aa * (g + 1),
					m = d + e + i,
					i = d + f + i,
					n = d + f + k,
					k = d + e + k,
					p = c,
					q = g,
					s = h,
					t = e,
					v = f,
					m = m + W,
					i = i + W,
					n = n + W,
					k = k + W;
				G.faces.push(new THREE.Face4(m, i, n, k, null, null, x));
				m = z.generateSideWallUV(G, a, p, b, m, i, n, k, q, s, t, v);
				G.faceVertexUvs[0].push(m)
			}
		}
	}

	function f(a, b, c)
	{
		G.vertices.push(new THREE.Vector3(a, b, c))
	}

	function g(c, d, e, f)
	{
		c += W;
		d += W;
		e += W;
		G.faces.push(new THREE.Face3(c, d, e, null, null, t));
		c = f ? z.generateBottomUV(G, a, b, c, d, e) : z.generateTopUV(G, a, b, c, d, e);
		G.faceVertexUvs[0].push(c)
	}
	var i = void 0 !== b.amount ? b.amount :
		100,
		h = void 0 !== b.bevelThickness ? b.bevelThickness : 6,
		k = void 0 !== b.bevelSize ? b.bevelSize : h - 2,
		l = void 0 !== b.bevelSegments ? b.bevelSegments : 3,
		m = void 0 !== b.bevelEnabled ? b.bevelEnabled : !0,
		n = void 0 !== b.curveSegments ? b.curveSegments : 12,
		r = void 0 !== b.steps ? b.steps : 1,
		p = b.extrudePath,
		q, s = !1,
		t = b.material,
		x = b.extrudeMaterial,
		z = void 0 !== b.UVGenerator ? b.UVGenerator : THREE.ExtrudeGeometry.WorldUVGenerator,
		v, I, H, D;
	p && (q = p.getSpacedPoints(r), s = !0, m = !1, v = void 0 !== b.frames ? b.frames : new THREE.TubeGeometry.FrenetFrames(p, r,
		!1), I = new THREE.Vector3, H = new THREE.Vector3, D = new THREE.Vector3);
	m || (k = h = l = 0);
	var y, F, E, G = this,
		W = this.vertices.length,
		n = a.extractPoints(n),
		A = n.shape,
		n = n.holes;
	if (p = !THREE.Shape.Utils.isClockWise(A))
	{
		A = A.reverse();
		F = 0;
		for (E = n.length; F < E; F++) y = n[F], THREE.Shape.Utils.isClockWise(y) && (n[F] = y.reverse());
		p = !1
	}
	var X = THREE.Shape.Utils.triangulateShape(A, n),
		p = A;
	F = 0;
	for (E = n.length; F < E; F++) y = n[F], A = A.concat(y);
	var B, K, L, U, aa = A.length,
		ba = X.length,
		xa = [],
		J = 0,
		ha = p.length;
	B = ha - 1;
	for (K = J + 1; J < ha; J++, B++, K++) B === ha &&
		(B = 0), K === ha && (K = 0), xa[J] = d(p[J], p[B], p[K]);
	var ua = [],
		Oa, M = xa.concat();
	F = 0;
	for (E = n.length; F < E; F++)
	{
		y = n[F];
		Oa = [];
		J = 0;
		ha = y.length;
		B = ha - 1;
		for (K = J + 1; J < ha; J++, B++, K++) B === ha && (B = 0), K === ha && (K = 0), Oa[J] = d(y[J], y[B], y[K]);
		ua.push(Oa);
		M = M.concat(Oa)
	}
	for (B = 0; B < l; B++)
	{
		y = B / l;
		L = h * (1 - y);
		K = k * Math.sin(y * Math.PI / 2);
		J = 0;
		for (ha = p.length; J < ha; J++) U = c(p[J], xa[J], K), f(U.x, U.y, -L);
		F = 0;
		for (E = n.length; F < E; F++)
		{
			y = n[F];
			Oa = ua[F];
			J = 0;
			for (ha = y.length; J < ha; J++) U = c(y[J], Oa[J], K), f(U.x, U.y, -L)
		}
	}
	K = k;
	for (J = 0; J < aa; J++) U = m ? c(A[J], M[J],
		K) : A[J], s ? (H.copy(v.normals[0])
		.multiplyScalar(U.x), I.copy(v.binormals[0])
		.multiplyScalar(U.y), D.copy(q[0])
		.add(H)
		.add(I), f(D.x, D.y, D.z)) : f(U.x, U.y, 0);
	for (y = 1; y <= r; y++)
		for (J = 0; J < aa; J++) U = m ? c(A[J], M[J], K) : A[J], s ? (H.copy(v.normals[y])
			.multiplyScalar(U.x), I.copy(v.binormals[y])
			.multiplyScalar(U.y), D.copy(q[y])
			.add(H)
			.add(I), f(D.x, D.y, D.z)) : f(U.x, U.y, i / r * y);
	for (B = l - 1; 0 <= B; B--)
	{
		y = B / l;
		L = h * (1 - y);
		K = k * Math.sin(y * Math.PI / 2);
		J = 0;
		for (ha = p.length; J < ha; J++) U = c(p[J], xa[J], K), f(U.x, U.y, i + L);
		F = 0;
		for (E = n.length; F <
			E; F++)
		{
			y = n[F];
			Oa = ua[F];
			J = 0;
			for (ha = y.length; J < ha; J++) U = c(y[J], Oa[J], K), s ? f(U.x, U.y + q[r - 1].y, q[r - 1].x + L) : f(U.x, U.y, i + L)
		}
	}
	if (m)
	{
		h = 0 * aa;
		for (J = 0; J < ba; J++) i = X[J], g(i[2] + h, i[1] + h, i[0] + h, !0);
		h = aa * (r + 2 * l);
		for (J = 0; J < ba; J++) i = X[J], g(i[0] + h, i[1] + h, i[2] + h, !1)
	}
	else
	{
		for (J = 0; J < ba; J++) i = X[J], g(i[2], i[1], i[0], !0);
		for (J = 0; J < ba; J++) i = X[J], g(i[0] + aa * r, i[1] + aa * r, i[2] + aa * r, !1)
	}
	i = 0;
	e(p, i);
	i += p.length;
	F = 0;
	for (E = n.length; F < E; F++) y = n[F], e(y, i), i += y.length
};
THREE.ExtrudeGeometry.WorldUVGenerator = {
	generateTopUV: function(a, b, c, d, e, f)
	{
		b = a.vertices[e].x;
		e = a.vertices[e].y;
		c = a.vertices[f].x;
		f = a.vertices[f].y;
		return [new THREE.Vector2(a.vertices[d].x, a.vertices[d].y), new THREE.Vector2(b, e), new THREE.Vector2(c, f)]
	},
	generateBottomUV: function(a, b, c, d, e, f)
	{
		return this.generateTopUV(a, b, c, d, e, f)
	},
	generateSideWallUV: function(a, b, c, d, e, f, g, i)
	{
		var b = a.vertices[e].x,
			c = a.vertices[e].y,
			e = a.vertices[e].z,
			d = a.vertices[f].x,
			h = a.vertices[f].y,
			f = a.vertices[f].z,
			k = a.vertices[g].x,
			l = a.vertices[g].y,
			g = a.vertices[g].z,
			m = a.vertices[i].x,
			n = a.vertices[i].y,
			a = a.vertices[i].z;
		return 0.01 > Math.abs(c - h) ? [new THREE.Vector2(b, 1 - e), new THREE.Vector2(d, 1 - f), new THREE.Vector2(k, 1 - g), new THREE.Vector2(m, 1 - a)] : [new THREE.Vector2(c, 1 - e), new THREE.Vector2(h, 1 - f), new THREE.Vector2(l, 1 - g), new THREE.Vector2(n, 1 - a)]
	}
};
THREE.ExtrudeGeometry.__v1 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v2 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v3 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v4 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v5 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v6 = new THREE.Vector2;
THREE.ShapeGeometry = function(a, b)
{
	THREE.Geometry.call(this);
	!1 === a instanceof Array && (a = [a]);
	this.shapebb = a[a.length - 1].getBoundingBox();
	this.addShapeList(a, b);
	this.computeCentroids();
	this.computeFaceNormals()
};
THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ShapeGeometry.prototype.addShapeList = function(a, b)
{
	for (var c = 0, d = a.length; c < d; c++) this.addShape(a[c], b);
	return this
};
THREE.ShapeGeometry.prototype.addShape = function(a, b)
{
	void 0 === b && (b = {});
	var c = b.material,
		d = void 0 === b.UVGenerator ? THREE.ExtrudeGeometry.WorldUVGenerator : b.UVGenerator,
		e, f, g, i = this.vertices.length;
	e = a.extractPoints(void 0 !== b.curveSegments ? b.curveSegments : 12);
	var h = e.shape,
		k = e.holes;
	if (!THREE.Shape.Utils.isClockWise(h))
	{
		h = h.reverse();
		e = 0;
		for (f = k.length; e < f; e++) g = k[e], THREE.Shape.Utils.isClockWise(g) && (k[e] = g.reverse())
	}
	var l = THREE.Shape.Utils.triangulateShape(h, k);
	e = 0;
	for (f = k.length; e < f; e++) g = k[e],
		h = h.concat(g);
	k = h.length;
	f = l.length;
	for (e = 0; e < k; e++) g = h[e], this.vertices.push(new THREE.Vector3(g.x, g.y, 0));
	for (e = 0; e < f; e++) k = l[e], h = k[0] + i, g = k[1] + i, k = k[2] + i, this.faces.push(new THREE.Face3(h, g, k, null, null, c)), this.faceVertexUvs[0].push(d.generateBottomUV(this, a, b, h, g, k))
};
THREE.LatheGeometry = function(a, b, c, d)
{
	THREE.Geometry.call(this);
	for (var b = b || 12, c = c || 0, d = d || 2 * Math.PI, e = 1 / (a.length - 1), f = 1 / b, g = 0, i = b; g <= i; g++)
		for (var h = c + g * f * d, k = Math.cos(h), l = Math.sin(h), h = 0, m = a.length; h < m; h++)
		{
			var n = a[h],
				r = new THREE.Vector3;
			r.x = k * n.x - l * n.y;
			r.y = l * n.x + k * n.y;
			r.z = n.z;
			this.vertices.push(r)
		}
	c = a.length;
	g = 0;
	for (i = b; g < i; g++)
	{
		h = 0;
		for (m = a.length - 1; h < m; h++) d = b = h + c * g, l = b + c, k = b + 1 + c, this.faces.push(new THREE.Face4(d, l, k, b + 1)), k = g * f, b = h * e, d = k + f, l = b + e, this.faceVertexUvs[0].push([new THREE.Vector2(k,
			b), new THREE.Vector2(d, b), new THREE.Vector2(d, l), new THREE.Vector2(k, l)])
	}
	this.mergeVertices();
	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals()
};
THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.PlaneGeometry = function(a, b, c, d)
{
	THREE.Geometry.call(this);
	this.width = a;
	this.height = b;
	this.widthSegments = c || 1;
	this.heightSegments = d || 1;
	for (var c = a / 2, e = b / 2, d = this.widthSegments, f = this.heightSegments, g = d + 1, i = f + 1, h = this.width / d, k = this.height / f, l = new THREE.Vector3(0, 0, 1), a = 0; a < i; a++)
		for (b = 0; b < g; b++) this.vertices.push(new THREE.Vector3(b * h - c, -(a * k - e), 0));
	for (a = 0; a < f; a++)
		for (b = 0; b < d; b++) c = new THREE.Face4(b + g * a, b + g * (a + 1), b + 1 + g * (a + 1), b + 1 + g * a), c.normal.copy(l), c.vertexNormals.push(l.clone(), l.clone(),
			l.clone(), l.clone()), this.faces.push(c), this.faceVertexUvs[0].push([new THREE.Vector2(b / d, 1 - a / f), new THREE.Vector2(b / d, 1 - (a + 1) / f), new THREE.Vector2((b + 1) / d, 1 - (a + 1) / f), new THREE.Vector2((b + 1) / d, 1 - a / f)]);
	this.computeCentroids()
};
THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.SphereGeometry = function(a, b, c, d, e, f, g)
{
	THREE.Geometry.call(this);
	this.radius = a || 50;
	this.widthSegments = Math.max(3, Math.floor(b) || 8);
	this.heightSegments = Math.max(2, Math.floor(c) || 6);
	for (var d = void 0 !== d ? d : 0, e = void 0 !== e ? e : 2 * Math.PI, f = void 0 !== f ? f : 0, g = void 0 !== g ? g : Math.PI, i = [], h = [], c = 0; c <= this.heightSegments; c++)
	{
		for (var k = [], l = [], b = 0; b <= this.widthSegments; b++)
		{
			var m = b / this.widthSegments,
				n = c / this.heightSegments,
				r = new THREE.Vector3;
			r.x = -this.radius * Math.cos(d + m * e) * Math.sin(f + n * g);
			r.y = this.radius *
				Math.cos(f + n * g);
			r.z = this.radius * Math.sin(d + m * e) * Math.sin(f + n * g);
			this.vertices.push(r);
			k.push(this.vertices.length - 1);
			l.push(new THREE.Vector2(m, 1 - n))
		}
		i.push(k);
		h.push(l)
	}
	for (c = 0; c < this.heightSegments; c++)
		for (b = 0; b < this.widthSegments; b++)
		{
			var d = i[c][b + 1],
				e = i[c][b],
				f = i[c + 1][b],
				g = i[c + 1][b + 1],
				k = this.vertices[d].clone()
				.normalize(),
				l = this.vertices[e].clone()
				.normalize(),
				m = this.vertices[f].clone()
				.normalize(),
				n = this.vertices[g].clone()
				.normalize(),
				r = h[c][b + 1].clone(),
				p = h[c][b].clone(),
				q = h[c + 1][b].clone(),
				s = h[c + 1][b + 1].clone();
			Math.abs(this.vertices[d].y) === this.radius ? (this.faces.push(new THREE.Face3(d, f, g, [k, m, n])), this.faceVertexUvs[0].push([r, q, s])) : Math.abs(this.vertices[f].y) === this.radius ? (this.faces.push(new THREE.Face3(d, e, f, [k, l, m])), this.faceVertexUvs[0].push([r, p, q])) : (this.faces.push(new THREE.Face4(d, e, f, g, [k, l, m, n])), this.faceVertexUvs[0].push([r, p, q, s]))
		}
	this.computeCentroids();
	this.computeFaceNormals();
	this.boundingSphere = new THREE.Sphere(new THREE.Vector3, a)
};
THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TextGeometry = function(a, b)
{
	var c = THREE.FontUtils.generateShapes(a, b);
	b.amount = void 0 !== b.height ? b.height : 50;
	void 0 === b.bevelThickness && (b.bevelThickness = 10);
	void 0 === b.bevelSize && (b.bevelSize = 8);
	void 0 === b.bevelEnabled && (b.bevelEnabled = !1);
	THREE.ExtrudeGeometry.call(this, c, b)
};
THREE.TextGeometry.prototype = Object.create(THREE.ExtrudeGeometry.prototype);
THREE.TorusGeometry = function(a, b, c, d, e)
{
	THREE.Geometry.call(this);
	this.radius = a || 100;
	this.tube = b || 40;
	this.radialSegments = c || 8;
	this.tubularSegments = d || 6;
	this.arc = e || 2 * Math.PI;
	e = new THREE.Vector3;
	a = [];
	b = [];
	for (c = 0; c <= this.radialSegments; c++)
		for (d = 0; d <= this.tubularSegments; d++)
		{
			var f = d / this.tubularSegments * this.arc,
				g = 2 * c / this.radialSegments * Math.PI;
			e.x = this.radius * Math.cos(f);
			e.y = this.radius * Math.sin(f);
			var i = new THREE.Vector3;
			i.x = (this.radius + this.tube * Math.cos(g)) * Math.cos(f);
			i.y = (this.radius + this.tube *
				Math.cos(g)) * Math.sin(f);
			i.z = this.tube * Math.sin(g);
			this.vertices.push(i);
			a.push(new THREE.Vector2(d / this.tubularSegments, c / this.radialSegments));
			b.push(i.clone()
				.sub(e)
				.normalize())
		}
	for (c = 1; c <= this.radialSegments; c++)
		for (d = 1; d <= this.tubularSegments; d++)
		{
			var e = (this.tubularSegments + 1) * c + d - 1,
				f = (this.tubularSegments + 1) * (c - 1) + d - 1,
				g = (this.tubularSegments + 1) * (c - 1) + d,
				i = (this.tubularSegments + 1) * c + d,
				h = new THREE.Face4(e, f, g, i, [b[e], b[f], b[g], b[i]]);
			h.normal.add(b[e]);
			h.normal.add(b[f]);
			h.normal.add(b[g]);
			h.normal.add(b[i]);
			h.normal.normalize();
			this.faces.push(h);
			this.faceVertexUvs[0].push([a[e].clone(), a[f].clone(), a[g].clone(), a[i].clone()])
		}
	this.computeCentroids()
};
THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TorusKnotGeometry = function(a, b, c, d, e, f, g)
{
	function i(a, b, c, d, e, f)
	{
		var g = Math.cos(a);
		Math.cos(b);
		b = Math.sin(a);
		a *= c / d;
		c = Math.cos(a);
		g *= 0.5 * e * (2 + c);
		b = 0.5 * e * (2 + c) * b;
		e = 0.5 * f * e * Math.sin(a);
		return new THREE.Vector3(g, b, e)
	}
	THREE.Geometry.call(this);
	this.radius = a || 100;
	this.tube = b || 40;
	this.radialSegments = c || 64;
	this.tubularSegments = d || 8;
	this.p = e || 2;
	this.q = f || 3;
	this.heightScale = g || 1;
	this.grid = Array(this.radialSegments);
	c = new THREE.Vector3;
	d = new THREE.Vector3;
	e = new THREE.Vector3;
	for (a = 0; a < this.radialSegments; ++a)
	{
		this.grid[a] =
			Array(this.tubularSegments);
		for (b = 0; b < this.tubularSegments; ++b)
		{
			var h = 2 * (a / this.radialSegments) * this.p * Math.PI,
				g = 2 * (b / this.tubularSegments) * Math.PI,
				f = i(h, g, this.q, this.p, this.radius, this.heightScale),
				h = i(h + 0.01, g, this.q, this.p, this.radius, this.heightScale);
			c.subVectors(h, f);
			d.addVectors(h, f);
			e.crossVectors(c, d);
			d.crossVectors(e, c);
			e.normalize();
			d.normalize();
			h = -this.tube * Math.cos(g);
			g = this.tube * Math.sin(g);
			f.x += h * d.x + g * e.x;
			f.y += h * d.y + g * e.y;
			f.z += h * d.z + g * e.z;
			this.grid[a][b] = this.vertices.push(new THREE.Vector3(f.x,
				f.y, f.z)) - 1
		}
	}
	for (a = 0; a < this.radialSegments; ++a)
		for (b = 0; b < this.tubularSegments; ++b)
		{
			var e = (a + 1) % this.radialSegments,
				f = (b + 1) % this.tubularSegments,
				c = this.grid[a][b],
				d = this.grid[e][b],
				e = this.grid[e][f],
				f = this.grid[a][f],
				g = new THREE.Vector2(a / this.radialSegments, b / this.tubularSegments),
				h = new THREE.Vector2((a + 1) / this.radialSegments, b / this.tubularSegments),
				k = new THREE.Vector2((a + 1) / this.radialSegments, (b + 1) / this.tubularSegments),
				l = new THREE.Vector2(a / this.radialSegments, (b + 1) / this.tubularSegments);
			this.faces.push(new THREE.Face4(c,
				d, e, f));
			this.faceVertexUvs[0].push([g, h, k, l])
		}
	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals()
};
THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry = function(a, b, c, d, e, f)
{
	THREE.Geometry.call(this);
	this.path = a;
	this.segments = b || 64;
	this.radius = c || 1;
	this.radiusSegments = d || 8;
	this.closed = e || !1;
	f && (this.debug = new THREE.Object3D);
	this.grid = [];
	var g, i, e = this.segments + 1,
		h, k, l, f = new THREE.Vector3,
		m, n, r, b = new THREE.TubeGeometry.FrenetFrames(this.path, this.segments, this.closed);
	m = b.tangents;
	n = b.normals;
	r = b.binormals;
	this.tangents = m;
	this.normals = n;
	this.binormals = r;
	for (b = 0; b < e; b++)
	{
		this.grid[b] = [];
		d = b / (e - 1);
		l = a.getPointAt(d);
		d = m[b];
		g = n[b];
		i = r[b];
		this.debug && (this.debug.add(new THREE.ArrowHelper(d, l, c, 255)), this.debug.add(new THREE.ArrowHelper(g, l, c, 16711680)), this.debug.add(new THREE.ArrowHelper(i, l, c, 65280)));
		for (d = 0; d < this.radiusSegments; d++) h = 2 * (d / this.radiusSegments) * Math.PI, k = -this.radius * Math.cos(h), h = this.radius * Math.sin(h), f.copy(l), f.x += k * g.x + h * i.x, f.y += k * g.y + h * i.y, f.z += k * g.z + h * i.z, this.grid[b][d] = this.vertices.push(new THREE.Vector3(f.x, f.y, f.z)) - 1
	}
	for (b = 0; b < this.segments; b++)
		for (d = 0; d < this.radiusSegments; d++) e = this.closed ?
			(b + 1) % this.segments : b + 1, f = (d + 1) % this.radiusSegments, a = this.grid[b][d], c = this.grid[e][d], e = this.grid[e][f], f = this.grid[b][f], m = new THREE.Vector2(b / this.segments, d / this.radiusSegments), n = new THREE.Vector2((b + 1) / this.segments, d / this.radiusSegments), r = new THREE.Vector2((b + 1) / this.segments, (d + 1) / this.radiusSegments), g = new THREE.Vector2(b / this.segments, (d + 1) / this.radiusSegments), this.faces.push(new THREE.Face4(a, c, e, f)), this.faceVertexUvs[0].push([m, n, r, g]);
	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals()
};
THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry.FrenetFrames = function(a, b, c)
{
	new THREE.Vector3;
	var d = new THREE.Vector3;
	new THREE.Vector3;
	var e = [],
		f = [],
		g = [],
		i = new THREE.Vector3,
		h = new THREE.Matrix4,
		b = b + 1,
		k, l, m;
	this.tangents = e;
	this.normals = f;
	this.binormals = g;
	for (k = 0; k < b; k++) l = k / (b - 1), e[k] = a.getTangentAt(l), e[k].normalize();
	f[0] = new THREE.Vector3;
	g[0] = new THREE.Vector3;
	a = Number.MAX_VALUE;
	k = Math.abs(e[0].x);
	l = Math.abs(e[0].y);
	m = Math.abs(e[0].z);
	k <= a && (a = k, d.set(1, 0, 0));
	l <= a && (a = l, d.set(0, 1, 0));
	m <= a && d.set(0, 0, 1);
	i.crossVectors(e[0],
			d)
		.normalize();
	f[0].crossVectors(e[0], i);
	g[0].crossVectors(e[0], f[0]);
	for (k = 1; k < b; k++) f[k] = f[k - 1].clone(), g[k] = g[k - 1].clone(), i.crossVectors(e[k - 1], e[k]), 1E-4 < i.length() && (i.normalize(), d = Math.acos(e[k - 1].dot(e[k])), f[k].applyMatrix4(h.makeRotationAxis(i, d))), g[k].crossVectors(e[k], f[k]);
	if (c)
	{
		d = Math.acos(f[0].dot(f[b - 1]));
		d /= b - 1;
		0 < e[0].dot(i.crossVectors(f[0], f[b - 1])) && (d = -d);
		for (k = 1; k < b; k++) f[k].applyMatrix4(h.makeRotationAxis(e[k], d * k)), g[k].crossVectors(e[k], f[k])
	}
};
THREE.PolyhedronGeometry = function(a, b, c, d)
{
	function e(a)
	{
		var b = a.normalize()
			.clone();
		b.index = h.vertices.push(b) - 1;
		var c = Math.atan2(a.z, -a.x) / 2 / Math.PI + 0.5,
			a = Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z)) / Math.PI + 0.5;
		b.uv = new THREE.Vector2(c, 1 - a);
		return b
	}

	function f(a, b, c, d)
	{
		1 > d ? (d = new THREE.Face3(a.index, b.index, c.index, [a.clone(), b.clone(), c.clone()]), d.centroid.add(a)
			.add(b)
			.add(c)
			.divideScalar(3), d.normal = d.centroid.clone()
			.normalize(), h.faces.push(d), d = Math.atan2(d.centroid.z, -d.centroid.x), h.faceVertexUvs[0].push([i(a.uv,
				a, d), i(b.uv, b, d), i(c.uv, c, d)])) : (d -= 1, f(a, g(a, b), g(a, c), d), f(g(a, b), b, g(b, c), d), f(g(a, c), g(b, c), c, d), f(g(a, b), g(b, c), g(a, c), d))
	}

	function g(a, b)
	{
		m[a.index] || (m[a.index] = []);
		m[b.index] || (m[b.index] = []);
		var c = m[a.index][b.index];
		void 0 === c && (m[a.index][b.index] = m[b.index][a.index] = c = e((new THREE.Vector3)
			.addVectors(a, b)
			.divideScalar(2)));
		return c
	}

	function i(a, b, c)
	{
		0 > c && 1 === a.x && (a = new THREE.Vector2(a.x - 1, a.y));
		0 === b.x && 0 === b.z && (a = new THREE.Vector2(c / 2 / Math.PI + 0.5, a.y));
		return a
	}
	THREE.Geometry.call(this);
	for (var c = c || 1, d = d || 0, h = this, k = 0, l = a.length; k < l; k++) e(new THREE.Vector3(a[k][0], a[k][1], a[k][2]));
	for (var m = [], a = this.vertices, k = 0, l = b.length; k < l; k++) f(a[b[k][0]], a[b[k][1]], a[b[k][2]], d);
	this.mergeVertices();
	k = 0;
	for (l = this.vertices.length; k < l; k++) this.vertices[k].multiplyScalar(c);
	this.computeCentroids();
	this.boundingSphere = new THREE.Sphere(new THREE.Vector3, c)
};
THREE.PolyhedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.IcosahedronGeometry = function(a, b)
{
	var c = (1 + Math.sqrt(5)) / 2;
	THREE.PolyhedronGeometry.call(this, [
		[-1, c, 0],
		[1, c, 0],
		[-1, -c, 0],
		[1, -c, 0],
		[0, -1, c],
		[0, 1, c],
		[0, -1, -c],
		[0, 1, -c],
		[c, 0, -1],
		[c, 0, 1],
		[-c, 0, -1],
		[-c, 0, 1]
	], [
		[0, 11, 5],
		[0, 5, 1],
		[0, 1, 7],
		[0, 7, 10],
		[0, 10, 11],
		[1, 5, 9],
		[5, 11, 4],
		[11, 10, 2],
		[10, 7, 6],
		[7, 1, 8],
		[3, 9, 4],
		[3, 4, 2],
		[3, 2, 6],
		[3, 6, 8],
		[3, 8, 9],
		[4, 9, 5],
		[2, 4, 11],
		[6, 2, 10],
		[8, 6, 7],
		[9, 8, 1]
	], a, b)
};
THREE.IcosahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.OctahedronGeometry = function(a, b)
{
	THREE.PolyhedronGeometry.call(this, [
		[1, 0, 0],
		[-1, 0, 0],
		[0, 1, 0],
		[0, -1, 0],
		[0, 0, 1],
		[0, 0, -1]
	], [
		[0, 2, 4],
		[0, 4, 3],
		[0, 3, 5],
		[0, 5, 2],
		[1, 2, 5],
		[1, 5, 3],
		[1, 3, 4],
		[1, 4, 2]
	], a, b)
};
THREE.OctahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TetrahedronGeometry = function(a, b)
{
	THREE.PolyhedronGeometry.call(this, [
		[1, 1, 1],
		[-1, -1, 1],
		[-1, 1, -1],
		[1, -1, -1]
	], [
		[2, 1, 0],
		[0, 3, 2],
		[1, 3, 0],
		[2, 3, 1]
	], a, b)
};
THREE.TetrahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ParametricGeometry = function(a, b, c, d)
{
	THREE.Geometry.call(this);
	var e = this.vertices,
		f = this.faces,
		g = this.faceVertexUvs[0],
		d = void 0 === d ? !1 : d,
		i, h, k, l, m = b + 1;
	for (i = 0; i <= c; i++)
	{
		l = i / c;
		for (h = 0; h <= b; h++) k = h / b, k = a(k, l), e.push(k)
	}
	var n, r, p, q;
	for (i = 0; i < c; i++)
		for (h = 0; h < b; h++) a = i * m + h, e = i * m + h + 1, l = (i + 1) * m + h, k = (i + 1) * m + h + 1, n = new THREE.Vector2(h / b, i / c), r = new THREE.Vector2((h + 1) / b, i / c), p = new THREE.Vector2(h / b, (i + 1) / c), q = new THREE.Vector2((h + 1) / b, (i + 1) / c), d ? (f.push(new THREE.Face3(a, e, l)), f.push(new THREE.Face3(e,
			k, l)), g.push([n, r, p]), g.push([r, q, p])) : (f.push(new THREE.Face4(a, e, k, l)), g.push([n, r, q, p]));
	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals()
};
THREE.ParametricGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ConvexGeometry = function(a)
{
	function b(a)
	{
		var b = a.length();
		return new THREE.Vector2(a.x / b, a.y / b)
	}
	THREE.Geometry.call(this);
	for (var c = [
		[0, 1, 2],
		[0, 2, 1]
	], d = 3; d < a.length; d++)
	{
		var e = d,
			f = a[e].clone(),
			g = f.length();
		f.x += g * 2E-6 * (Math.random() - 0.5);
		f.y += g * 2E-6 * (Math.random() - 0.5);
		f.z += g * 2E-6 * (Math.random() - 0.5);
		for (var g = [], i = 0; i < c.length;)
		{
			var h = c[i],
				k = f,
				l = a[h[0]],
				m;
			m = l;
			var n = a[h[1]],
				r = a[h[2]],
				p = new THREE.Vector3,
				q = new THREE.Vector3;
			p.subVectors(r, n);
			q.subVectors(m, n);
			p.cross(q);
			p.normalize();
			m = p;
			l = m.dot(l);
			if (m.dot(k) >= l)
			{
				for (k = 0; 3 > k; k++)
				{
					l = [h[k], h[(k + 1) % 3]];
					m = !0;
					for (n = 0; n < g.length; n++)
						if (g[n][0] === l[1] && g[n][1] === l[0])
						{
							g[n] = g[g.length - 1];
							g.pop();
							m = !1;
							break
						} m && g.push(l)
				}
				c[i] = c[c.length - 1];
				c.pop()
			}
			else i++
		}
		for (n = 0; n < g.length; n++) c.push([g[n][0], g[n][1], e])
	}
	e = 0;
	f = Array(a.length);
	for (d = 0; d < c.length; d++)
	{
		g = c[d];
		for (i = 0; 3 > i; i++) void 0 === f[g[i]] && (f[g[i]] = e++, this.vertices.push(a[g[i]])), g[i] = f[g[i]]
	}
	for (d = 0; d < c.length; d++) this.faces.push(new THREE.Face3(c[d][0], c[d][1], c[d][2]));
	for (d = 0; d < this.faces.length; d++) g =
		this.faces[d], this.faceVertexUvs[0].push([b(this.vertices[g.a]), b(this.vertices[g.b]), b(this.vertices[g.c])]);
	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals()
};
THREE.ConvexGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.AxisHelper = function(a)
{
	var b = new THREE.Geometry;
	b.vertices.push(new THREE.Vector3, new THREE.Vector3(a || 1, 0, 0), new THREE.Vector3, new THREE.Vector3(0, a || 1, 0), new THREE.Vector3, new THREE.Vector3(0, 0, a || 1));
	b.colors.push(new THREE.Color(16711680), new THREE.Color(16755200), new THREE.Color(65280), new THREE.Color(11206400), new THREE.Color(255), new THREE.Color(43775));
	a = new THREE.LineBasicMaterial(
	{
		vertexColors: THREE.VertexColors
	});
	THREE.Line.call(this, b, a, THREE.LinePieces)
};
THREE.AxisHelper.prototype = Object.create(THREE.Line.prototype);
THREE.ArrowHelper = function(a, b, c, d)
{
	THREE.Object3D.call(this);
	void 0 === c && (c = 20);
	void 0 === d && (d = 16776960);
	var e = new THREE.Geometry;
	e.vertices.push(new THREE.Vector3(0, 0, 0));
	e.vertices.push(new THREE.Vector3(0, 1, 0));
	this.line = new THREE.Line(e, new THREE.LineBasicMaterial(
	{
		color: d
	}));
	this.add(this.line);
	e = new THREE.CylinderGeometry(0, 0.05, 0.25, 5, 1);
	this.cone = new THREE.Mesh(e, new THREE.MeshBasicMaterial(
	{
		color: d
	}));
	this.cone.position.set(0, 1, 0);
	this.add(this.cone);
	b instanceof THREE.Vector3 && (this.position =
		b);
	this.setDirection(a);
	this.setLength(c)
};
THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.ArrowHelper.prototype.setDirection = function(a)
{
	var b = THREE.ArrowHelper.__v1.copy(a)
		.normalize();
	0.999 < b.y ? this.rotation.set(0, 0, 0) : -0.999 > b.y ? this.rotation.set(Math.PI, 0, 0) : (a = THREE.ArrowHelper.__v2.set(b.z, 0, -b.x)
		.normalize(), b = Math.acos(b.y), a = THREE.ArrowHelper.__q1.setFromAxisAngle(a, b), this.rotation.setEulerFromQuaternion(a, this.eulerOrder))
};
THREE.ArrowHelper.prototype.setLength = function(a)
{
	this.scale.set(a, a, a)
};
THREE.ArrowHelper.prototype.setColor = function(a)
{
	this.line.material.color.setHex(a);
	this.cone.material.color.setHex(a)
};
THREE.ArrowHelper.__v1 = new THREE.Vector3;
THREE.ArrowHelper.__v2 = new THREE.Vector3;
THREE.ArrowHelper.__q1 = new THREE.Quaternion;
THREE.CameraHelper = function(a)
{
	function b(a, b, d)
	{
		c(a, d);
		c(b, d)
	}

	function c(a, b)
	{
		d.geometry.vertices.push(new THREE.Vector3);
		d.geometry.colors.push(new THREE.Color(b));
		void 0 === d.pointMap[a] && (d.pointMap[a] = []);
		d.pointMap[a].push(d.geometry.vertices.length - 1)
	}
	THREE.Line.call(this);
	var d = this;
	this.geometry = new THREE.Geometry;
	this.material = new THREE.LineBasicMaterial(
	{
		color: 16777215,
		vertexColors: THREE.FaceColors
	});
	this.type = THREE.LinePieces;
	this.matrixWorld = a.matrixWorld;
	this.matrixAutoUpdate = !1;
	this.pointMap = {};
	b("n1", "n2", 16755200);
	b("n2", "n4", 16755200);
	b("n4", "n3", 16755200);
	b("n3", "n1", 16755200);
	b("f1", "f2", 16755200);
	b("f2", "f4", 16755200);
	b("f4", "f3", 16755200);
	b("f3", "f1", 16755200);
	b("n1", "f1", 16755200);
	b("n2", "f2", 16755200);
	b("n3", "f3", 16755200);
	b("n4", "f4", 16755200);
	b("p", "n1", 16711680);
	b("p", "n2", 16711680);
	b("p", "n3", 16711680);
	b("p", "n4", 16711680);
	b("u1", "u2", 43775);
	b("u2", "u3", 43775);
	b("u3", "u1", 43775);
	b("c", "t", 16777215);
	b("p", "c", 3355443);
	b("cn1", "cn2", 3355443);
	b("cn3", "cn4", 3355443);
	b("cf1",
		"cf2", 3355443);
	b("cf3", "cf4", 3355443);
	this.camera = a;
	this.update(a)
};
THREE.CameraHelper.prototype = Object.create(THREE.Line.prototype);
THREE.CameraHelper.prototype.update = function()
{
	function a(a, d, e, f)
	{
		THREE.CameraHelper.__v.set(d, e, f);
		THREE.CameraHelper.__projector.unprojectVector(THREE.CameraHelper.__v, THREE.CameraHelper.__c);
		a = b.pointMap[a];
		if (void 0 !== a)
		{
			d = 0;
			for (e = a.length; d < e; d++) b.geometry.vertices[a[d]].copy(THREE.CameraHelper.__v)
		}
	}
	var b = this;
	THREE.CameraHelper.__c.projectionMatrix.copy(this.camera.projectionMatrix);
	a("c", 0, 0, -1);
	a("t", 0, 0, 1);
	a("n1", -1, -1, -1);
	a("n2", 1, -1, -1);
	a("n3", -1, 1, -1);
	a("n4", 1, 1, -1);
	a("f1", -1, -1, 1);
	a("f2", 1, -1, 1);
	a("f3", -1, 1, 1);
	a("f4", 1, 1, 1);
	a("u1", 0.7, 1.1, -1);
	a("u2", -0.7, 1.1, -1);
	a("u3", 0, 2, -1);
	a("cf1", -1, 0, 1);
	a("cf2", 1, 0, 1);
	a("cf3", 0, -1, 1);
	a("cf4", 0, 1, 1);
	a("cn1", -1, 0, -1);
	a("cn2", 1, 0, -1);
	a("cn3", 0, -1, -1);
	a("cn4", 0, 1, -1);
	this.geometry.verticesNeedUpdate = !0
};
THREE.CameraHelper.__projector = new THREE.Projector;
THREE.CameraHelper.__v = new THREE.Vector3;
THREE.CameraHelper.__c = new THREE.Camera;
THREE.DirectionalLightHelper = function(a, b)
{
	THREE.Object3D.call(this);
	this.light = a;
	this.position = a.position;
	this.direction = new THREE.Vector3;
	this.direction.subVectors(a.target.position, a.position);
	var c = THREE.Math.clamp(a.intensity, 0, 1);
	this.color = a.color.clone();
	this.color.multiplyScalar(c);
	var c = this.color.getHex(),
		d = new THREE.SphereGeometry(b, 16, 8),
		e = new THREE.AsteriskGeometry(1.25 * b, 2.25 * b),
		f = new THREE.MeshBasicMaterial(
		{
			color: c,
			fog: !1
		}),
		g = new THREE.LineBasicMaterial(
		{
			color: c,
			fog: !1
		});
	this.lightSphere =
		new THREE.Mesh(d, f);
	this.lightRays = new THREE.Line(e, g, THREE.LinePieces);
	this.add(this.lightSphere);
	this.add(this.lightRays);
	this.lightSphere.properties.isGizmo = !0;
	this.lightSphere.properties.gizmoSubject = a;
	this.lightSphere.properties.gizmoRoot = this;
	this.targetSphere = null;
	void 0 !== a.target.properties.targetInverse && (d = new THREE.SphereGeometry(b, 8, 4), e = new THREE.MeshBasicMaterial(
	{
		color: c,
		wireframe: !0,
		fog: !1
	}), this.targetSphere = new THREE.Mesh(d, e), this.targetSphere.position = a.target.position, this.targetSphere.properties.isGizmo = !0, this.targetSphere.properties.gizmoSubject = a.target, this.targetSphere.properties.gizmoRoot = this.targetSphere, c = new THREE.LineDashedMaterial(
	{
		color: c,
		dashSize: 4,
		gapSize: 4,
		opacity: 0.75,
		transparent: !0,
		fog: !1
	}), d = new THREE.Geometry, d.vertices.push(this.position.clone()), d.vertices.push(this.targetSphere.position.clone()), d.computeLineDistances(), this.targetLine = new THREE.Line(d, c), this.targetLine.properties.isGizmo = !0);
	this.properties.isGizmo = !0
};
THREE.DirectionalLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.DirectionalLightHelper.prototype.update = function()
{
	this.direction.subVectors(this.light.target.position, this.light.position);
	var a = THREE.Math.clamp(this.light.intensity, 0, 1);
	this.color.copy(this.light.color);
	this.color.multiplyScalar(a);
	this.lightSphere.material.color.copy(this.color);
	this.lightRays.material.color.copy(this.color);
	null !== this.targetSphere && (this.targetSphere.material.color.copy(this.color), this.targetLine.material.color.copy(this.color), this.targetLine.geometry.vertices[0].copy(this.light.position),
		this.targetLine.geometry.vertices[1].copy(this.light.target.position), this.targetLine.geometry.computeLineDistances(), this.targetLine.geometry.verticesNeedUpdate = !0)
};
THREE.HemisphereLightHelper = function(a, b, c)
{
	THREE.Object3D.call(this);
	this.light = a;
	this.position = a.position;
	var d = THREE.Math.clamp(a.intensity, 0, 1);
	this.color = a.color.clone();
	this.color.multiplyScalar(d);
	var e = this.color.getHex();
	this.groundColor = a.groundColor.clone();
	this.groundColor.multiplyScalar(d);
	for (var d = this.groundColor.getHex(), f = new THREE.SphereGeometry(b, 16, 8, 0, 2 * Math.PI, 0, 0.5 * Math.PI), g = new THREE.SphereGeometry(b, 16, 8, 0, 2 * Math.PI, 0.5 * Math.PI, Math.PI), i = new THREE.MeshBasicMaterial(
	{
		color: e,
		fog: !1
	}), h = new THREE.MeshBasicMaterial(
	{
		color: d,
		fog: !1
	}), k = 0, l = f.faces.length; k < l; k++) f.faces[k].materialIndex = 0;
	k = 0;
	for (l = g.faces.length; k < l; k++) g.faces[k].materialIndex = 1;
	THREE.GeometryUtils.merge(f, g);
	this.lightSphere = new THREE.Mesh(f, new THREE.MeshFaceMaterial([i, h]));
	this.lightArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 1.1 * (b + c), 0), c, e);
	this.lightArrow.rotation.x = Math.PI;
	this.lightArrowGround = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -1.1 *
		(b + c), 0), c, d);
	b = new THREE.Object3D;
	b.rotation.x = 0.5 * -Math.PI;
	b.add(this.lightSphere);
	b.add(this.lightArrow);
	b.add(this.lightArrowGround);
	this.add(b);
	this.lightSphere.properties.isGizmo = !0;
	this.lightSphere.properties.gizmoSubject = a;
	this.lightSphere.properties.gizmoRoot = this;
	this.properties.isGizmo = !0;
	this.target = new THREE.Vector3;
	this.lookAt(this.target)
};
THREE.HemisphereLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.HemisphereLightHelper.prototype.update = function()
{
	var a = THREE.Math.clamp(this.light.intensity, 0, 1);
	this.color.copy(this.light.color);
	this.color.multiplyScalar(a);
	this.groundColor.copy(this.light.groundColor);
	this.groundColor.multiplyScalar(a);
	this.lightSphere.material.materials[0].color.copy(this.color);
	this.lightSphere.material.materials[1].color.copy(this.groundColor);
	this.lightArrow.setColor(this.color.getHex());
	this.lightArrowGround.setColor(this.groundColor.getHex());
	this.lookAt(this.target)
};
THREE.PointLightHelper = function(a, b)
{
	THREE.Object3D.call(this);
	this.light = a;
	this.position = a.position;
	var c = THREE.Math.clamp(a.intensity, 0, 1);
	this.color = a.color.clone();
	this.color.multiplyScalar(c);
	var d = this.color.getHex(),
		c = new THREE.SphereGeometry(b, 16, 8),
		e = new THREE.AsteriskGeometry(1.25 * b, 2.25 * b),
		f = new THREE.IcosahedronGeometry(1, 2),
		g = new THREE.MeshBasicMaterial(
		{
			color: d,
			fog: !1
		}),
		i = new THREE.LineBasicMaterial(
		{
			color: d,
			fog: !1
		}),
		d = new THREE.MeshBasicMaterial(
		{
			color: d,
			fog: !1,
			wireframe: !0,
			opacity: 0.1,
			transparent: !0
		});
	this.lightSphere = new THREE.Mesh(c, g);
	this.lightRays = new THREE.Line(e, i, THREE.LinePieces);
	this.lightDistance = new THREE.Mesh(f, d);
	c = a.distance;
	0 === c ? this.lightDistance.visible = !1 : this.lightDistance.scale.set(c, c, c);
	this.add(this.lightSphere);
	this.add(this.lightRays);
	this.add(this.lightDistance);
	this.lightSphere.properties.isGizmo = !0;
	this.lightSphere.properties.gizmoSubject = a;
	this.lightSphere.properties.gizmoRoot = this;
	this.properties.isGizmo = !0
};
THREE.PointLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.PointLightHelper.prototype.update = function()
{
	var a = THREE.Math.clamp(this.light.intensity, 0, 1);
	this.color.copy(this.light.color);
	this.color.multiplyScalar(a);
	this.lightSphere.material.color.copy(this.color);
	this.lightRays.material.color.copy(this.color);
	this.lightDistance.material.color.copy(this.color);
	a = this.light.distance;
	0 === a ? this.lightDistance.visible = !1 : (this.lightDistance.visible = !0, this.lightDistance.scale.set(a, a, a))
};
THREE.SpotLightHelper = function(a, b)
{
	THREE.Object3D.call(this);
	this.light = a;
	this.position = a.position;
	this.direction = new THREE.Vector3;
	this.direction.subVectors(a.target.position, a.position);
	var c = THREE.Math.clamp(a.intensity, 0, 1);
	this.color = a.color.clone();
	this.color.multiplyScalar(c);
	var c = this.color.getHex(),
		d = new THREE.SphereGeometry(b, 16, 8),
		e = new THREE.AsteriskGeometry(1.25 * b, 2.25 * b),
		f = new THREE.CylinderGeometry(1E-4, 1, 1, 8, 1, !0),
		g = new THREE.Matrix4;
	g.rotateX(-Math.PI / 2);
	g.translate(new THREE.Vector3(0,
		-0.5, 0));
	f.applyMatrix(g);
	var i = new THREE.MeshBasicMaterial(
		{
			color: c,
			fog: !1
		}),
		g = new THREE.LineBasicMaterial(
		{
			color: c,
			fog: !1
		}),
		h = new THREE.MeshBasicMaterial(
		{
			color: c,
			fog: !1,
			wireframe: !0,
			opacity: 0.3,
			transparent: !0
		});
	this.lightSphere = new THREE.Mesh(d, i);
	this.lightCone = new THREE.Mesh(f, h);
	d = a.distance ? a.distance : 1E4;
	f = 2 * d * Math.tan(0.5 * a.angle);
	this.lightCone.scale.set(f, f, d);
	this.lightRays = new THREE.Line(e, g, THREE.LinePieces);
	this.gyroscope = new THREE.Gyroscope;
	this.gyroscope.add(this.lightSphere);
	this.gyroscope.add(this.lightRays);
	this.add(this.gyroscope);
	this.add(this.lightCone);
	this.lookAt(a.target.position);
	this.lightSphere.properties.isGizmo = !0;
	this.lightSphere.properties.gizmoSubject = a;
	this.lightSphere.properties.gizmoRoot = this;
	this.targetSphere = null;
	void 0 !== a.target.properties.targetInverse && (e = new THREE.SphereGeometry(b, 8, 4), g = new THREE.MeshBasicMaterial(
		{
			color: c,
			wireframe: !0,
			fog: !1
		}), this.targetSphere = new THREE.Mesh(e, g), this.targetSphere.position = a.target.position, this.targetSphere.properties.isGizmo = !0, this.targetSphere.properties.gizmoSubject =
		a.target, this.targetSphere.properties.gizmoRoot = this.targetSphere, c = new THREE.LineDashedMaterial(
		{
			color: c,
			dashSize: 4,
			gapSize: 4,
			opacity: 0.75,
			transparent: !0,
			fog: !1
		}), e = new THREE.Geometry, e.vertices.push(this.position.clone()), e.vertices.push(this.targetSphere.position.clone()), e.computeLineDistances(), this.targetLine = new THREE.Line(e, c), this.targetLine.properties.isGizmo = !0);
	this.properties.isGizmo = !0
};
THREE.SpotLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.SpotLightHelper.prototype.update = function()
{
	this.direction.subVectors(this.light.target.position, this.light.position);
	this.lookAt(this.light.target.position);
	var a = this.light.distance ? this.light.distance : 1E4,
		b = 2 * a * Math.tan(0.5 * this.light.angle);
	this.lightCone.scale.set(b, b, a);
	a = THREE.Math.clamp(this.light.intensity, 0, 1);
	this.color.copy(this.light.color);
	this.color.multiplyScalar(a);
	this.lightSphere.material.color.copy(this.color);
	this.lightRays.material.color.copy(this.color);
	this.lightCone.material.color.copy(this.color);
	null !== this.targetSphere && (this.targetSphere.material.color.copy(this.color), this.targetLine.material.color.copy(this.color), this.targetLine.geometry.vertices[0].copy(this.light.position), this.targetLine.geometry.vertices[1].copy(this.light.target.position), this.targetLine.geometry.computeLineDistances(), this.targetLine.geometry.verticesNeedUpdate = !0)
};
THREE.ImmediateRenderObject = function()
{
	THREE.Object3D.call(this);
	this.render = function() {}
};
THREE.ImmediateRenderObject.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare = function(a, b, c, d, e)
{
	THREE.Object3D.call(this);
	this.lensFlares = [];
	this.positionScreen = new THREE.Vector3;
	this.customUpdateCallback = void 0;
	void 0 !== a && this.add(a, b, c, d, e)
};
THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare.prototype.add = function(a, b, c, d, e, f)
{
	void 0 === b && (b = -1);
	void 0 === c && (c = 0);
	void 0 === f && (f = 1);
	void 0 === e && (e = new THREE.Color(16777215));
	void 0 === d && (d = THREE.NormalBlending);
	c = Math.min(c, Math.max(0, c));
	this.lensFlares.push(
	{
		texture: a,
		size: b,
		distance: c,
		x: 0,
		y: 0,
		z: 0,
		scale: 1,
		rotation: 1,
		opacity: f,
		color: e,
		blending: d
	})
};
THREE.LensFlare.prototype.updateLensFlares = function()
{
	var a, b = this.lensFlares.length,
		c, d = 2 * -this.positionScreen.x,
		e = 2 * -this.positionScreen.y;
	for (a = 0; a < b; a++) c = this.lensFlares[a], c.x = this.positionScreen.x + d * c.distance, c.y = this.positionScreen.y + e * c.distance, c.wantedRotation = 0.25 * c.x * Math.PI, c.rotation += 0.25 * (c.wantedRotation - c.rotation)
};
THREE.MorphBlendMesh = function(a, b)
{
	THREE.Mesh.call(this, a, b);
	this.animationsMap = {};
	this.animationsList = [];
	var c = this.geometry.morphTargets.length;
	this.createAnimation("__default", 0, c - 1, c / 1);
	this.setAnimationWeight("__default", 1)
};
THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphBlendMesh.prototype.createAnimation = function(a, b, c, d)
{
	b = {
		startFrame: b,
		endFrame: c,
		length: c - b + 1,
		fps: d,
		duration: (c - b) / d,
		lastFrame: 0,
		currentFrame: 0,
		active: !1,
		time: 0,
		direction: 1,
		weight: 1,
		directionBackwards: !1,
		mirroredLoop: !1
	};
	this.animationsMap[a] = b;
	this.animationsList.push(b)
};
THREE.MorphBlendMesh.prototype.autoCreateAnimations = function(a)
{
	for (var b = /([a-z]+)(\d+)/, c, d = {}, e = this.geometry, f = 0, g = e.morphTargets.length; f < g; f++)
	{
		var i = e.morphTargets[f].name.match(b);
		if (i && 1 < i.length)
		{
			var h = i[1];
			d[h] || (d[h] = {
				start: Infinity,
				end: -Infinity
			});
			i = d[h];
			f < i.start && (i.start = f);
			f > i.end && (i.end = f);
			c || (c = h)
		}
	}
	for (h in d) i = d[h], this.createAnimation(h, i.start, i.end, a);
	this.firstAnimation = c
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function(a)
{
	if (a = this.animationsMap[a]) a.direction = 1, a.directionBackwards = !1
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function(a)
{
	if (a = this.animationsMap[a]) a.direction = -1, a.directionBackwards = !0
};
THREE.MorphBlendMesh.prototype.setAnimationFPS = function(a, b)
{
	var c = this.animationsMap[a];
	c && (c.fps = b, c.duration = (c.end - c.start) / c.fps)
};
THREE.MorphBlendMesh.prototype.setAnimationDuration = function(a, b)
{
	var c = this.animationsMap[a];
	c && (c.duration = b, c.fps = (c.end - c.start) / c.duration)
};
THREE.MorphBlendMesh.prototype.setAnimationWeight = function(a, b)
{
	var c = this.animationsMap[a];
	c && (c.weight = b)
};
THREE.MorphBlendMesh.prototype.setAnimationTime = function(a, b)
{
	var c = this.animationsMap[a];
	c && (c.time = b)
};
THREE.MorphBlendMesh.prototype.getAnimationTime = function(a)
{
	var b = 0;
	if (a = this.animationsMap[a]) b = a.time;
	return b
};
THREE.MorphBlendMesh.prototype.getAnimationDuration = function(a)
{
	var b = -1;
	if (a = this.animationsMap[a]) b = a.duration;
	return b
};
THREE.MorphBlendMesh.prototype.playAnimation = function(a)
{
	var b = this.animationsMap[a];
	b ? (b.time = 0, b.active = !0) : console.warn("animation[" + a + "] undefined")
};
THREE.MorphBlendMesh.prototype.stopAnimation = function(a)
{
	if (a = this.animationsMap[a]) a.active = !1
};
THREE.MorphBlendMesh.prototype.update = function(a)
{
	for (var b = 0, c = this.animationsList.length; b < c; b++)
	{
		var d = this.animationsList[b];
		if (d.active)
		{
			var e = d.duration / d.length;
			d.time += d.direction * a;
			if (d.mirroredLoop)
			{
				if (d.time > d.duration || 0 > d.time) d.direction *= -1, d.time > d.duration && (d.time = d.duration, d.directionBackwards = !0), 0 > d.time && (d.time = 0, d.directionBackwards = !1)
			}
			else d.time %= d.duration, 0 > d.time && (d.time += d.duration);
			var f = d.startFrame + THREE.Math.clamp(Math.floor(d.time / e), 0, d.length - 1),
				g = d.weight;
			f !== d.currentFrame && (this.morphTargetInfluences[d.lastFrame] = 0, this.morphTargetInfluences[d.currentFrame] = 1 * g, this.morphTargetInfluences[f] = 0, d.lastFrame = d.currentFrame, d.currentFrame = f);
			e = d.time % e / e;
			d.directionBackwards && (e = 1 - e);
			this.morphTargetInfluences[d.currentFrame] = e * g;
			this.morphTargetInfluences[d.lastFrame] = (1 - e) * g
		}
	}
};
THREE.LensFlarePlugin = function()
{
	function a(a, c)
	{
		var d = b.createProgram(),
			e = b.createShader(b.FRAGMENT_SHADER),
			f = b.createShader(b.VERTEX_SHADER),
			g = "precision " + c + " float;\n";
		b.shaderSource(e, g + a.fragmentShader);
		b.shaderSource(f, g + a.vertexShader);
		b.compileShader(e);
		b.compileShader(f);
		b.attachShader(d, e);
		b.attachShader(d, f);
		b.linkProgram(d);
		return d
	}
	var b, c, d, e, f, g, i, h, k, l, m, n, r;
	this.init = function(p)
	{
		b = p.context;
		c = p;
		d = p.getPrecision();
		e = new Float32Array(16);
		f = new Uint16Array(6);
		p = 0;
		e[p++] = -1;
		e[p++] = -1;
		e[p++] = 0;
		e[p++] = 0;
		e[p++] = 1;
		e[p++] = -1;
		e[p++] = 1;
		e[p++] = 0;
		e[p++] = 1;
		e[p++] = 1;
		e[p++] = 1;
		e[p++] = 1;
		e[p++] = -1;
		e[p++] = 1;
		e[p++] = 0;
		e[p++] = 1;
		p = 0;
		f[p++] = 0;
		f[p++] = 1;
		f[p++] = 2;
		f[p++] = 0;
		f[p++] = 2;
		f[p++] = 3;
		g = b.createBuffer();
		i = b.createBuffer();
		b.bindBuffer(b.ARRAY_BUFFER, g);
		b.bufferData(b.ARRAY_BUFFER, e, b.STATIC_DRAW);
		b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, i);
		b.bufferData(b.ELEMENT_ARRAY_BUFFER, f, b.STATIC_DRAW);
		h = b.createTexture();
		k = b.createTexture();
		b.bindTexture(b.TEXTURE_2D, h);
		b.texImage2D(b.TEXTURE_2D, 0, b.RGB, 16, 16,
			0, b.RGB, b.UNSIGNED_BYTE, null);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
		b.bindTexture(b.TEXTURE_2D, k);
		b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 16, 16, 0, b.RGBA, b.UNSIGNED_BYTE, null);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
		0 >= b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS) ? (l = !1, m = a(THREE.ShaderFlares.lensFlare, d)) : (l = !0, m = a(THREE.ShaderFlares.lensFlareVertexTexture, d));
		n = {};
		r = {};
		n.vertex = b.getAttribLocation(m, "position");
		n.uv = b.getAttribLocation(m, "uv");
		r.renderType = b.getUniformLocation(m, "renderType");
		r.map = b.getUniformLocation(m, "map");
		r.occlusionMap = b.getUniformLocation(m, "occlusionMap");
		r.opacity =
			b.getUniformLocation(m, "opacity");
		r.color = b.getUniformLocation(m, "color");
		r.scale = b.getUniformLocation(m, "scale");
		r.rotation = b.getUniformLocation(m, "rotation");
		r.screenPosition = b.getUniformLocation(m, "screenPosition")
	};
	this.render = function(a, d, e, f)
	{
		var a = a.__webglFlares,
			x = a.length;
		if (x)
		{
			var z = new THREE.Vector3,
				v = f / e,
				I = 0.5 * e,
				H = 0.5 * f,
				D = 16 / f,
				y = new THREE.Vector2(D * v, D),
				F = new THREE.Vector3(1, 1, 0),
				E = new THREE.Vector2(1, 1),
				G = r,
				D = n;
			b.useProgram(m);
			b.enableVertexAttribArray(n.vertex);
			b.enableVertexAttribArray(n.uv);
			b.uniform1i(G.occlusionMap, 0);
			b.uniform1i(G.map, 1);
			b.bindBuffer(b.ARRAY_BUFFER, g);
			b.vertexAttribPointer(D.vertex, 2, b.FLOAT, !1, 16, 0);
			b.vertexAttribPointer(D.uv, 2, b.FLOAT, !1, 16, 8);
			b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, i);
			b.disable(b.CULL_FACE);
			b.depthMask(!1);
			var W, A, X, B, K;
			for (W = 0; W < x; W++)
				if (D = 16 / f, y.set(D * v, D), B = a[W], z.set(B.matrixWorld.elements[12], B.matrixWorld.elements[13], B.matrixWorld.elements[14]), z.applyMatrix4(d.matrixWorldInverse), z.applyProjection(d.projectionMatrix), F.copy(z), E.x = F.x * I + I,
					E.y = F.y * H + H, l || 0 < E.x && E.x < e && 0 < E.y && E.y < f)
				{
					b.activeTexture(b.TEXTURE1);
					b.bindTexture(b.TEXTURE_2D, h);
					b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGB, E.x - 8, E.y - 8, 16, 16, 0);
					b.uniform1i(G.renderType, 0);
					b.uniform2f(G.scale, y.x, y.y);
					b.uniform3f(G.screenPosition, F.x, F.y, F.z);
					b.disable(b.BLEND);
					b.enable(b.DEPTH_TEST);
					b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
					b.activeTexture(b.TEXTURE0);
					b.bindTexture(b.TEXTURE_2D, k);
					b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGBA, E.x - 8, E.y - 8, 16, 16, 0);
					b.uniform1i(G.renderType, 1);
					b.disable(b.DEPTH_TEST);
					b.activeTexture(b.TEXTURE1);
					b.bindTexture(b.TEXTURE_2D, h);
					b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
					B.positionScreen.copy(F);
					B.customUpdateCallback ? B.customUpdateCallback(B) : B.updateLensFlares();
					b.uniform1i(G.renderType, 2);
					b.enable(b.BLEND);
					A = 0;
					for (X = B.lensFlares.length; A < X; A++) K = B.lensFlares[A], 0.001 < K.opacity && 0.001 < K.scale && (F.x = K.x, F.y = K.y, F.z = K.z, D = K.size * K.scale / f, y.x = D * v, y.y = D, b.uniform3f(G.screenPosition, F.x, F.y, F.z), b.uniform2f(G.scale, y.x, y.y), b.uniform1f(G.rotation, K.rotation), b.uniform1f(G.opacity,
						K.opacity), b.uniform3f(G.color, K.color.r, K.color.g, K.color.b), c.setBlending(K.blending, K.blendEquation, K.blendSrc, K.blendDst), c.setTexture(K.texture, 1), b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0))
				} b.enable(b.CULL_FACE);
			b.enable(b.DEPTH_TEST);
			b.depthMask(!0)
		}
	}
};
THREE.ShadowMapPlugin = function()
{
	var a, b, c, d, e, f, g = new THREE.Frustum,
		i = new THREE.Matrix4,
		h = new THREE.Vector3,
		k = new THREE.Vector3;
	this.init = function(g)
	{
		a = g.context;
		b = g;
		var g = THREE.ShaderLib.depthRGBA,
			h = THREE.UniformsUtils.clone(g.uniforms);
		c = new THREE.ShaderMaterial(
		{
			fragmentShader: g.fragmentShader,
			vertexShader: g.vertexShader,
			uniforms: h
		});
		d = new THREE.ShaderMaterial(
		{
			fragmentShader: g.fragmentShader,
			vertexShader: g.vertexShader,
			uniforms: h,
			morphTargets: !0
		});
		e = new THREE.ShaderMaterial(
		{
			fragmentShader: g.fragmentShader,
			vertexShader: g.vertexShader,
			uniforms: h,
			skinning: !0
		});
		f = new THREE.ShaderMaterial(
		{
			fragmentShader: g.fragmentShader,
			vertexShader: g.vertexShader,
			uniforms: h,
			morphTargets: !0,
			skinning: !0
		});
		c._shadowPass = !0;
		d._shadowPass = !0;
		e._shadowPass = !0;
		f._shadowPass = !0
	};
	this.render = function(a, c)
	{
		b.shadowMapEnabled && b.shadowMapAutoUpdate && this.update(a, c)
	};
	this.update = function(l, m)
	{
		var n, r, p, q, s, t, x, z, v, I = [];
		q = 0;
		a.clearColor(1, 1, 1, 1);
		a.disable(a.BLEND);
		a.enable(a.CULL_FACE);
		a.frontFace(a.CCW);
		b.shadowMapCullFace === THREE.CullFaceFront ?
			a.cullFace(a.FRONT) : a.cullFace(a.BACK);
		b.setDepthTest(!0);
		n = 0;
		for (r = l.__lights.length; n < r; n++)
			if (p = l.__lights[n], p.castShadow)
				if (p instanceof THREE.DirectionalLight && p.shadowCascade)
					for (s = 0; s < p.shadowCascadeCount; s++)
					{
						var H;
						if (p.shadowCascadeArray[s]) H = p.shadowCascadeArray[s];
						else
						{
							v = p;
							x = s;
							H = new THREE.DirectionalLight;
							H.isVirtual = !0;
							H.onlyShadow = !0;
							H.castShadow = !0;
							H.shadowCameraNear = v.shadowCameraNear;
							H.shadowCameraFar = v.shadowCameraFar;
							H.shadowCameraLeft = v.shadowCameraLeft;
							H.shadowCameraRight = v.shadowCameraRight;
							H.shadowCameraBottom = v.shadowCameraBottom;
							H.shadowCameraTop = v.shadowCameraTop;
							H.shadowCameraVisible = v.shadowCameraVisible;
							H.shadowDarkness = v.shadowDarkness;
							H.shadowBias = v.shadowCascadeBias[x];
							H.shadowMapWidth = v.shadowCascadeWidth[x];
							H.shadowMapHeight = v.shadowCascadeHeight[x];
							H.pointsWorld = [];
							H.pointsFrustum = [];
							z = H.pointsWorld;
							t = H.pointsFrustum;
							for (var D = 0; 8 > D; D++) z[D] = new THREE.Vector3, t[D] = new THREE.Vector3;
							z = v.shadowCascadeNearZ[x];
							v = v.shadowCascadeFarZ[x];
							t[0].set(-1, -1, z);
							t[1].set(1, -1, z);
							t[2].set(-1,
								1, z);
							t[3].set(1, 1, z);
							t[4].set(-1, -1, v);
							t[5].set(1, -1, v);
							t[6].set(-1, 1, v);
							t[7].set(1, 1, v);
							H.originalCamera = m;
							t = new THREE.Gyroscope;
							t.position = p.shadowCascadeOffset;
							t.add(H);
							t.add(H.target);
							m.add(t);
							p.shadowCascadeArray[s] = H;
							console.log("Created virtualLight", H)
						}
						x = p;
						z = s;
						v = x.shadowCascadeArray[z];
						v.position.copy(x.position);
						v.target.position.copy(x.target.position);
						v.lookAt(v.target);
						v.shadowCameraVisible = x.shadowCameraVisible;
						v.shadowDarkness = x.shadowDarkness;
						v.shadowBias = x.shadowCascadeBias[z];
						t = x.shadowCascadeNearZ[z];
						x = x.shadowCascadeFarZ[z];
						v = v.pointsFrustum;
						v[0].z = t;
						v[1].z = t;
						v[2].z = t;
						v[3].z = t;
						v[4].z = x;
						v[5].z = x;
						v[6].z = x;
						v[7].z = x;
						I[q] = H;
						q++
					}
		else I[q] = p, q++;
		n = 0;
		for (r = I.length; n < r; n++)
		{
			p = I[n];
			p.shadowMap || (s = THREE.LinearFilter, b.shadowMapType === THREE.PCFSoftShadowMap && (s = THREE.NearestFilter), p.shadowMap = new THREE.WebGLRenderTarget(p.shadowMapWidth, p.shadowMapHeight,
			{
				minFilter: s,
				magFilter: s,
				format: THREE.RGBAFormat
			}), p.shadowMapSize = new THREE.Vector2(p.shadowMapWidth, p.shadowMapHeight), p.shadowMatrix = new THREE.Matrix4);
			if (!p.shadowCamera)
			{
				if (p instanceof THREE.SpotLight) p.shadowCamera = new THREE.PerspectiveCamera(p.shadowCameraFov, p.shadowMapWidth / p.shadowMapHeight, p.shadowCameraNear, p.shadowCameraFar);
				else if (p instanceof THREE.DirectionalLight) p.shadowCamera = new THREE.OrthographicCamera(p.shadowCameraLeft, p.shadowCameraRight, p.shadowCameraTop, p.shadowCameraBottom, p.shadowCameraNear, p.shadowCameraFar);
				else
				{
					console.error("Unsupported light type for shadow");
					continue
				}
				l.add(p.shadowCamera);
				b.autoUpdateScene && l.updateMatrixWorld()
			}
			p.shadowCameraVisible &&
				!p.cameraHelper && (p.cameraHelper = new THREE.CameraHelper(p.shadowCamera), p.shadowCamera.add(p.cameraHelper));
			if (p.isVirtual && H.originalCamera == m)
			{
				s = m;
				q = p.shadowCamera;
				t = p.pointsFrustum;
				v = p.pointsWorld;
				h.set(Infinity, Infinity, Infinity);
				k.set(-Infinity, -Infinity, -Infinity);
				for (x = 0; 8 > x; x++) z = v[x], z.copy(t[x]), THREE.ShadowMapPlugin.__projector.unprojectVector(z, s), z.applyMatrix4(q.matrixWorldInverse), z.x < h.x && (h.x = z.x), z.x > k.x && (k.x = z.x), z.y < h.y && (h.y = z.y), z.y > k.y && (k.y = z.y), z.z < h.z && (h.z = z.z), z.z > k.z &&
					(k.z = z.z);
				q.left = h.x;
				q.right = k.x;
				q.top = k.y;
				q.bottom = h.y;
				q.updateProjectionMatrix()
			}
			q = p.shadowMap;
			t = p.shadowMatrix;
			s = p.shadowCamera;
			s.position.copy(p.matrixWorld.getPosition());
			s.lookAt(p.target.matrixWorld.getPosition());
			s.updateMatrixWorld();
			s.matrixWorldInverse.getInverse(s.matrixWorld);
			p.cameraHelper && (p.cameraHelper.visible = p.shadowCameraVisible);
			p.shadowCameraVisible && p.cameraHelper.update();
			t.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
			t.multiply(s.projectionMatrix);
			t.multiply(s.matrixWorldInverse);
			i.multiplyMatrices(s.projectionMatrix, s.matrixWorldInverse);
			g.setFromMatrix(i);
			b.setRenderTarget(q);
			b.clear();
			v = l.__webglObjects;
			p = 0;
			for (q = v.length; p < q; p++)
				if (x = v[p], t = x.object, x.render = !1, t.visible && t.castShadow && (!(t instanceof THREE.Mesh || t instanceof THREE.ParticleSystem) || !t.frustumCulled || g.intersectsObject(t))) t._modelViewMatrix.multiplyMatrices(s.matrixWorldInverse, t.matrixWorld), x.render = !0;
			p = 0;
			for (q = v.length; p < q; p++) x = v[p], x.render && (t = x.object, x = x.buffer, D = t.material instanceof THREE.MeshFaceMaterial ?
				t.material.materials[0] : t.material, z = 0 < t.geometry.morphTargets.length && D.morphTargets, D = t instanceof THREE.SkinnedMesh && D.skinning, z = t.customDepthMaterial ? t.customDepthMaterial : D ? z ? f : e : z ? d : c, x instanceof THREE.BufferGeometry ? b.renderBufferDirect(s, l.__lights, null, z, x, t) : b.renderBuffer(s, l.__lights, null, z, x, t));
			v = l.__webglObjectsImmediate;
			p = 0;
			for (q = v.length; p < q; p++) x = v[p], t = x.object, t.visible && t.castShadow && (t._modelViewMatrix.multiplyMatrices(s.matrixWorldInverse, t.matrixWorld), b.renderImmediateObject(s,
				l.__lights, null, c, t))
		}
		n = b.getClearColor();
		r = b.getClearAlpha();
		a.clearColor(n.r, n.g, n.b, r);
		a.enable(a.BLEND);
		b.shadowMapCullFace === THREE.CullFaceFront && a.cullFace(a.BACK)
	}
};
THREE.ShadowMapPlugin.__projector = new THREE.Projector;
THREE.SpritePlugin = function()
{
	function a(a, b)
	{
		return a.z !== b.z ? b.z - a.z : b.id - a.id
	}
	var b, c, d, e, f, g, i, h, k, l;
	this.init = function(a)
	{
		b = a.context;
		c = a;
		d = a.getPrecision();
		e = new Float32Array(16);
		f = new Uint16Array(6);
		a = 0;
		e[a++] = -1;
		e[a++] = -1;
		e[a++] = 0;
		e[a++] = 0;
		e[a++] = 1;
		e[a++] = -1;
		e[a++] = 1;
		e[a++] = 0;
		e[a++] = 1;
		e[a++] = 1;
		e[a++] = 1;
		e[a++] = 1;
		e[a++] = -1;
		e[a++] = 1;
		e[a++] = 0;
		e[a++] = 1;
		a = 0;
		f[a++] = 0;
		f[a++] = 1;
		f[a++] = 2;
		f[a++] = 0;
		f[a++] = 2;
		f[a++] = 3;
		g = b.createBuffer();
		i = b.createBuffer();
		b.bindBuffer(b.ARRAY_BUFFER, g);
		b.bufferData(b.ARRAY_BUFFER,
			e, b.STATIC_DRAW);
		b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, i);
		b.bufferData(b.ELEMENT_ARRAY_BUFFER, f, b.STATIC_DRAW);
		var a = THREE.ShaderSprite.sprite,
			n = b.createProgram(),
			r = b.createShader(b.FRAGMENT_SHADER),
			p = b.createShader(b.VERTEX_SHADER),
			q = "precision " + d + " float;\n";
		b.shaderSource(r, q + a.fragmentShader);
		b.shaderSource(p, q + a.vertexShader);
		b.compileShader(r);
		b.compileShader(p);
		b.attachShader(n, r);
		b.attachShader(n, p);
		b.linkProgram(n);
		h = n;
		k = {};
		l = {};
		k.position = b.getAttribLocation(h, "position");
		k.uv = b.getAttribLocation(h,
			"uv");
		l.uvOffset = b.getUniformLocation(h, "uvOffset");
		l.uvScale = b.getUniformLocation(h, "uvScale");
		l.rotation = b.getUniformLocation(h, "rotation");
		l.scale = b.getUniformLocation(h, "scale");
		l.alignment = b.getUniformLocation(h, "alignment");
		l.color = b.getUniformLocation(h, "color");
		l.map = b.getUniformLocation(h, "map");
		l.opacity = b.getUniformLocation(h, "opacity");
		l.useScreenCoordinates = b.getUniformLocation(h, "useScreenCoordinates");
		l.sizeAttenuation = b.getUniformLocation(h, "sizeAttenuation");
		l.screenPosition = b.getUniformLocation(h,
			"screenPosition");
		l.modelViewMatrix = b.getUniformLocation(h, "modelViewMatrix");
		l.projectionMatrix = b.getUniformLocation(h, "projectionMatrix");
		l.fogType = b.getUniformLocation(h, "fogType");
		l.fogDensity = b.getUniformLocation(h, "fogDensity");
		l.fogNear = b.getUniformLocation(h, "fogNear");
		l.fogFar = b.getUniformLocation(h, "fogFar");
		l.fogColor = b.getUniformLocation(h, "fogColor");
		l.alphaTest = b.getUniformLocation(h, "alphaTest")
	};
	this.render = function(d, e, f, p)
	{
		var q = d.__webglSprites,
			s = q.length;
		if (s)
		{
			var t = k,
				x = l,
				z = p /
				f,
				f = 0.5 * f,
				v = 0.5 * p;
			b.useProgram(h);
			b.enableVertexAttribArray(t.position);
			b.enableVertexAttribArray(t.uv);
			b.disable(b.CULL_FACE);
			b.enable(b.BLEND);
			b.bindBuffer(b.ARRAY_BUFFER, g);
			b.vertexAttribPointer(t.position, 2, b.FLOAT, !1, 16, 0);
			b.vertexAttribPointer(t.uv, 2, b.FLOAT, !1, 16, 8);
			b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, i);
			b.uniformMatrix4fv(x.projectionMatrix, !1, e.projectionMatrix.elements);
			b.activeTexture(b.TEXTURE0);
			b.uniform1i(x.map, 0);
			var I = t = 0,
				H = d.fog;
			H ? (b.uniform3f(x.fogColor, H.color.r, H.color.g, H.color.b),
				H instanceof THREE.Fog ? (b.uniform1f(x.fogNear, H.near), b.uniform1f(x.fogFar, H.far), b.uniform1i(x.fogType, 1), I = t = 1) : H instanceof THREE.FogExp2 && (b.uniform1f(x.fogDensity, H.density), b.uniform1i(x.fogType, 2), I = t = 2)) : (b.uniform1i(x.fogType, 0), I = t = 0);
			for (var D, y, F = [], H = 0; H < s; H++) D = q[H], y = D.material, D.visible && 0 !== y.opacity && (y.useScreenCoordinates ? D.z = -D.position.z : (D._modelViewMatrix.multiplyMatrices(e.matrixWorldInverse, D.matrixWorld), D.z = -D._modelViewMatrix.elements[14]));
			q.sort(a);
			for (H = 0; H < s; H++) D =
				q[H], y = D.material, D.visible && 0 !== y.opacity && (y.map && y.map.image && y.map.image.width) && (b.uniform1f(x.alphaTest, y.alphaTest), !0 === y.useScreenCoordinates ? (b.uniform1i(x.useScreenCoordinates, 1), b.uniform3f(x.screenPosition, (D.position.x * c.devicePixelRatio - f) / f, (v - D.position.y * c.devicePixelRatio) / v, Math.max(0, Math.min(1, D.position.z))), F[0] = c.devicePixelRatio, F[1] = c.devicePixelRatio) : (b.uniform1i(x.useScreenCoordinates, 0), b.uniform1i(x.sizeAttenuation, y.sizeAttenuation ? 1 : 0), b.uniformMatrix4fv(x.modelViewMatrix,
					!1, D._modelViewMatrix.elements), F[0] = 1, F[1] = 1), e = d.fog && y.fog ? I : 0, t !== e && (b.uniform1i(x.fogType, e), t = e), e = 1 / (y.scaleByViewport ? p : 1), F[0] *= e * z * D.scale.x, F[1] *= e * D.scale.y, b.uniform2f(x.uvScale, y.uvScale.x, y.uvScale.y), b.uniform2f(x.uvOffset, y.uvOffset.x, y.uvOffset.y), b.uniform2f(x.alignment, y.alignment.x, y.alignment.y), b.uniform1f(x.opacity, y.opacity), b.uniform3f(x.color, y.color.r, y.color.g, y.color.b), b.uniform1f(x.rotation, D.rotation), b.uniform2fv(x.scale, F), c.setBlending(y.blending, y.blendEquation,
					y.blendSrc, y.blendDst), c.setDepthTest(y.depthTest), c.setDepthWrite(y.depthWrite), c.setTexture(y.map, 0), b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0));
			b.enable(b.CULL_FACE)
		}
	}
};
THREE.DepthPassPlugin = function()
{
	this.enabled = !1;
	this.renderTarget = null;
	var a, b, c, d, e, f, g = new THREE.Frustum,
		i = new THREE.Matrix4;
	this.init = function(g)
	{
		a = g.context;
		b = g;
		var g = THREE.ShaderLib.depthRGBA,
			i = THREE.UniformsUtils.clone(g.uniforms);
		c = new THREE.ShaderMaterial(
		{
			fragmentShader: g.fragmentShader,
			vertexShader: g.vertexShader,
			uniforms: i
		});
		d = new THREE.ShaderMaterial(
		{
			fragmentShader: g.fragmentShader,
			vertexShader: g.vertexShader,
			uniforms: i,
			morphTargets: !0
		});
		e = new THREE.ShaderMaterial(
		{
			fragmentShader: g.fragmentShader,
			vertexShader: g.vertexShader,
			uniforms: i,
			skinning: !0
		});
		f = new THREE.ShaderMaterial(
		{
			fragmentShader: g.fragmentShader,
			vertexShader: g.vertexShader,
			uniforms: i,
			morphTargets: !0,
			skinning: !0
		});
		c._shadowPass = !0;
		d._shadowPass = !0;
		e._shadowPass = !0;
		f._shadowPass = !0
	};
	this.render = function(a, b)
	{
		this.enabled && this.update(a, b)
	};
	this.update = function(h, k)
	{
		var l, m, n, r, p, q;
		a.clearColor(1, 1, 1, 1);
		a.disable(a.BLEND);
		b.setDepthTest(!0);
		b.autoUpdateScene && h.updateMatrixWorld();
		k.matrixWorldInverse.getInverse(k.matrixWorld);
		i.multiplyMatrices(k.projectionMatrix,
			k.matrixWorldInverse);
		g.setFromMatrix(i);
		b.setRenderTarget(this.renderTarget);
		b.clear();
		q = h.__webglObjects;
		l = 0;
		for (m = q.length; l < m; l++)
			if (n = q[l], p = n.object, n.render = !1, p.visible && (!(p instanceof THREE.Mesh || p instanceof THREE.ParticleSystem) || !p.frustumCulled || g.intersectsObject(p))) p._modelViewMatrix.multiplyMatrices(k.matrixWorldInverse, p.matrixWorld), n.render = !0;
		var s;
		l = 0;
		for (m = q.length; l < m; l++)
			if (n = q[l], n.render && (p = n.object, n = n.buffer, !(p instanceof THREE.ParticleSystem) || p.customDepthMaterial))(s =
				p.material instanceof THREE.MeshFaceMaterial ? p.material.materials[0] : p.material) && b.setMaterialFaces(p.material), r = 0 < p.geometry.morphTargets.length && s.morphTargets, s = p instanceof THREE.SkinnedMesh && s.skinning, r = p.customDepthMaterial ? p.customDepthMaterial : s ? r ? f : e : r ? d : c, n instanceof THREE.BufferGeometry ? b.renderBufferDirect(k, h.__lights, null, r, n, p) : b.renderBuffer(k, h.__lights, null, r, n, p);
		q = h.__webglObjectsImmediate;
		l = 0;
		for (m = q.length; l < m; l++) n = q[l], p = n.object, p.visible && (p._modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,
			p.matrixWorld), b.renderImmediateObject(k, h.__lights, null, c, p));
		l = b.getClearColor();
		m = b.getClearAlpha();
		a.clearColor(l.r, l.g, l.b, m);
		a.enable(a.BLEND)
	}
};
THREE.ShaderFlares = {
	lensFlareVertexTexture:
	{
		vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
		fragmentShader: "uniform lowp int renderType;\nuniform sampler2D map;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
	},
	lensFlare:
	{
		vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
		fragmentShader: "precision mediump float;\nuniform lowp int renderType;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
	}
};
THREE.ShaderSprite = {
	sprite:
	{
		vertexShader: "uniform int useScreenCoordinates;\nuniform int sizeAttenuation;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( sizeAttenuation == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
		fragmentShader: "uniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\nif ( texture.a < alphaTest ) discard;\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\nif ( fogType > 0 ) {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = 0.0;\nif ( fogType == 1 ) {\nfogFactor = smoothstep( fogNear, fogFar, depth );\n} else {\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n}\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n}"
	}
};