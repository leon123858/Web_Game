class vector {
  constructor(x1, y1, x2, y2) {
    this._Xo = x1;
    this._Yo = y1;
    this._Xn = x2;
    this._Yn = y2;
    this.X = x2 - x1;
    this.Y = y2 - y1;
    this.length = Math.sqrt(this.Y * this.Y + this.X * this.X); //calculating length
  }
  get normal() {
    let V = new vector(
      this._Xo,
      this._Yo,
      this._Xo + this.Y / this.length,
      this._Yo + this.X / this.length
    );
    return V;
  }
}

vector.prototype.distance = function (x, y) {
  //3 side of triangle
  var A = Math.abs(
    Math.sqrt(Math.pow(x - this._Xo, 2) + Math.pow(y - this._Yo, 2))
  );
  var B = Math.abs(
    Math.sqrt(Math.pow(x - this._Xn, 2) + Math.pow(y - this._Yn, 2))
  );
  var C = Math.abs(
    Math.sqrt(
      Math.pow(this._Xo - this._Xn, 2) + Math.pow(this._Yo - this._Yn, 2)
    )
  );
  //use formula to get area of triangle
  var P = (A + B + C) / 2;
  var allArea = Math.abs(Math.sqrt(P * (P - A) * (P - B) * (P - C)));
  //普通公式计算三角形面积反推点到线的垂直距离
  var dis = (2 * allArea) / C;
  return dis;
};

vector.prototype.setLength = function (N) {
  this.X = (this.X / this.length) * N;
  this.Y = (this.Y / this.length) * N;
};

vector.prototype.dot = function (x, y) {
  let l = Math.sqrt(x * x + y * y);
  if (l > 1) {
    x /= l;
    y /= l;
  }
  return this.X * x + this.Y * y;
};
