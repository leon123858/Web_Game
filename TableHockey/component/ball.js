class ball {
  constructor(m, r, x, y) {
    this.type = "ball"; //類別
    this._m = m; //質量
    this._r = r; //半徑
    this._x = x; //x座標
    this._y = y; //y座標
    this._v = 0; //順時速度
    this._a = 0; //順時加速度
    this._vg = 0; //速度方向
    this._ag = 0; //加速度方向
  }
  get R() {
    return this._r * 2; //直徑
  }
  get r() {
    return this._r;
  }
  get X() {
    return this._x;
  }
  get Y() {
    return this._y;
  }
}

ball.prototype.move = function () {
  this._x += this._v * Math.cos(this._vg);
  this._y -= this._v * Math.sin(this._vg);
};
