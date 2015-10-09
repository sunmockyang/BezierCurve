/*
BezierCurve.js by Sunmock Yang
*/

function BezierCurve(){
	this.points = [];
	this.resolution = 20;
}

BezierCurve.prototype.draw = function() {
	var width = 3;

	this.context.fillStyle = "#333";
	this.context.fillRect(0,0, globs.cWidth, globs.cHeight);

	if(globs.debug){
		this.context.strokeStyle = "#555";
		this.context.fillStyle = "#DDD";
		this.context.beginPath();
		this.context.moveTo(this.points[0].x, this.points[0].y);
		for (var i = 0; i < this.points.length; i++) {
			this.context.lineTo(this.points[i].x, this.points[i].y);
			this.context.fillRect(this.points[i].x - width/2, this.points[i].y - width/2, width, width);
		};
		this.context.stroke();
	}

	this.context.strokeStyle = "#F55";
	this.context.fillStyle = "#5FF";
	this.context.beginPath();

	for (var i = 0; i <= this.resolution; i++) {
		var point = this.getPoint(i/this.resolution);
		this.context.lineTo(point.x, point.y);
		if(globs.debug){
			this.context.fillRect(point.x - width/2, point.y - width/2, width, width);
		}
	};
	this.context.stroke();
};

BezierCurve.prototype.getPoint = function(t) {
	var point = new Point(0,0);
	var n = this.points.length - 1;

	for (var i = 0; i < this.points.length; i++) {
		var scale = Math.pow(1-t, n-i) * Math.pow(t, i) * binomialCoefficient(n, i);
		point = point.add(this.points[i].scale(scale));
	};

	return point;
};

BezierCurve.prototype.context = null;

function Point(x, y){
	this.x = x;
	this.y = y;
}

Point.prototype.add = function(point) {
	return new Point(this.x + point.x, this.y + point.y);
};

Point.prototype.sub = function(point) {
	return new Point(this.x - point.x, this.y - point.y);
};

Point.prototype.scale = function(factor) {
	return new Point(this.x * factor, this.y * factor);
};

function sqr(x){
	return Math.pow(x, 2);
}

function binomialCoefficient(n, k){
	// http://rosettacode.org/wiki/Evaluate_binomial_coefficients#JavaScript
    var coeff = 1;
    for (var i = n-k+1; i <= n; i++) coeff *= i;
    for (var i = 1;     i <= k; i++) coeff /= i;
    return coeff;
}
