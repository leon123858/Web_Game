class vector {
  constructor(x1, y1, x2, y2) {
    this.Xo = x1;
    this.Yo = y1;
    this.Xn = x2;
    this.Yn = y2;
    this.X = x2 - x1;
    this.Y = y2 - y1;
    this.length = Math.sqrt(this.Y * this.Y + this.X * this.X); //calculating length
  }
  get normal() {
    let V = new vector(
      this.Xo,
      this.Yo,
      this.Xo + this.Y / this.length,
      this.Yo + this.X / this.length
    );
    return V;
  }
}

vector.prototype.dot = function (v2) {
  //console.log(this.X, this.Y, v2.X, v2.Y);
  return Math.abs(this.X * v2.X + this.Y * v2.Y);
};

vector.prototype.XoToLineDistance = function (x1, y1, x2, y2) {
  //三角形三个边长
  var A = Math.abs(
    Math.sqrt(Math.pow(this.Xo - x1, 2) + Math.pow(this.Yo - y1, 2))
  );
  var B = Math.abs(
    Math.sqrt(Math.pow(this.Xo - x2, 2) + Math.pow(this.Yo - y2, 2))
  );
  var C = Math.abs(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
  //利用海伦公式计算三角形面积
  //周长的一半
  var P = (A + B + C) / 2;
  var allArea = Math.abs(Math.sqrt(P * (P - A) * (P - B) * (P - C)));
  //普通公式计算三角形面积反推点到线的垂直距离
  var dis = (2 * allArea) / C;
  return dis;
};

//v2 is wall's vector, r is ball's radius
vector.prototype.ifBallImpact = function (v2, r) {
  //console.log(v2);
  let pad = 0;
  let projectionLength = this.dot(v2.normal) + 2 * r;
  let distance = this.XoToLineDistance(v2.Xo, v2.Yo, v2.Xn, v2.Yn) + r;
  //console.log(projectionLength, distance);
  if (projectionLength > distance - pad)
    return [
      (projectionLength - distance + pad) * (this.X / this.length),
      (projectionLength - distance + pad) * (this.Y / this.length),
    ];
  else return 0;
};
