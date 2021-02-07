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
