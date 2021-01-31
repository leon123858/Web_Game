document.write("<script src='modules/vector.js'></script>");

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

ball.prototype.detectWallCollision = function (Ox, Oy, Nx, Ny) {
  for (var i in this._collisionWall) {
    let li = this._collisionWall[i];
    let ballV = new vector(Ox, Oy, Nx, Ny);
    let WallV = new vector(li[0], li[1], li[2], li[3]);
    let pad = ballV.ifBallImpact(WallV, this.r);
    console.log(pad);
    if (pad[0] > 0 || pad[1] > 0) {
      this._vg += Math.PI;
      console.log(this._vg);
      if (this._vg > Math.PI * 2) this._vg -= Math.PI * 2;
      this._x -= pad[0];
      this._y += pad[1];
    }
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

// function PointsDistance(x1, x2, y1, y2) {
//   return Math.sqrt(Math.pow(x2 - x1) + Math.pow(y2 - y1));
// }

//兩移動物碰撞演算法(時間切片)
// var x1Stage = (Nx - Ox) / 50;
// var y1Stage = (Ny - Oy) / 50;
// for (var i in this._collisionWall) {
//   var x2Stage = (this._collisionWall[i][2] - this._collisionWall[i][0]) / 50;
//   var y2Stage = (this._collisionWall[i][3] - this._collisionWall[i][1]) / 50;
//   var j = 0;
//   while (true) {
//     let x1 = Ox + j * x1Stage;
//     let x2 = this._collisionWall[i][0] + j * x2Stage;
//     let y1 = Oy + j * y1Stage;
//     let y2 = this._collisionWall[i][1] + j * y2Stage;
//     console.log(x1, x2, y1, y2);
//     if (x1 > Nx || y1 > Ny) break;
//     if (PointsDistance(x1, x2, y1, y2) < this._r) {
//       //撞牆
//       this._vg += Math.PI;
//       console.log(this._vg);
//     }
//     j++;
//   }
// }
