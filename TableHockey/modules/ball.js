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
    this._collisionWall = [];
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

ball.prototype.addCollisionThing = function (x1, y1, x2, y2) {
  let li = [x1, y1, x2, y2];
  this._collisionWall.push(li);
};

ball.prototype.detectWallCollision = function () {
  for (var i in this._collisionWall) {
  }
};

ball.prototype.move = function () {
  let originX = this._x;
  let originY = this._y;
  this._x += this._v * Math.cos(this._vg);
  this._y -= this._v * Math.sin(this._vg);
  this.detectWallCollision(originX, originY, this._x, this._y);
};

ball.prototype.setVelocity = function (v) {
  this._v = v;
};
