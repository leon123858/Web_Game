class ball {
  constructor(X_place, Y_place, X_velocity, Y_velocity, radius, Color) {
    this._type = "ball";
    this.X = X_place;
    this.Y = Y_place;
    this.BeforeX = X_place;
    this.BeforeY = Y_place;
    this.Vx = X_velocity;
    this.Vy = Y_velocity;
    this.ax = 0.01;
    this.ay = 0.01;
    this._radius = radius;
    this._color = typeof Color !== "undefined" ? Color : "#000000";
  }
  get type() {
    return this._type;
  }
  get r() {
    return this._radius;
  }
  get Color() {
    return this._color;
  }
  set a(N) {
    this.ax = N;
    this.ay = N;
  }
}

ball.prototype.SAT_box = function (OriginX, OriginY, BoxArray) {
  for (var i in BoxArray) {
    let ballPath = new vector(OriginX, OriginY, this.X, this.Y);
    let X_projection = 2 * this.r + ballPath.dot(1, 0);

    let X_projection_point1 =
      this.X - OriginX > 0 ? OriginX - this.r : OriginX + this.r;
    let X_projection_point2 =
      this.X - OriginX > 0
        ? X_projection_point1 + X_projection
        : X_projection_point1 - X_projection;
    let project =
      X_projection_point1 > X_projection_point2
        ? [X_projection_point1, X_projection_point2]
        : [X_projection_point2, X_projection_point1];
    let X1 = BoxArray[i].X;
    let X2 = X1 + BoxArray[i].Width;
    if (project[0] > X2 || X1 > project[1]) {
      //console.log("impact", project, [X2, X1]);
      this.X - OriginX > 0
        ? (this.X = X2 - 1.5 * this.r)
        : (this.X = X1 + 1.5 * this.r);
      this.Y = OriginY;
      this.Vx *= -1;
      return;
      //console.log("change to :", this.X, this.Y, this.Vx);
    }
    let Y_projection = 2 * this.r + ballPath.dot(0, 1);
    let Y_projection_point1 =
      this.Y - OriginY > 0 ? OriginY + this.r : OriginY - this.r;
    let Y_projection_point2 =
      this.Y - OriginY > 0
        ? Y_projection_point1 + Y_projection
        : Y_projection_point1 - Y_projection;
    let project2 =
      Y_projection_point1 > Y_projection_point2
        ? [Y_projection_point1, Y_projection_point2]
        : [Y_projection_point2, Y_projection_point1];
    let Y1 = BoxArray[i].Y;
    let Y2 = Y1 + BoxArray[i].Height;
    if (project2[0] > Y2 || Y1 > project2[1]) {
      console.log("impact");
      this.Y - OriginY > 0
        ? (this.Y = Y2 - 1.5 * this.r)
        : (this.Y = Y1 + 1.5 * this.r);
      this.X = OriginX;
      this.Vy *= -1;
      return;
    }
  }
};

ball.prototype.SAT_hand = function (OriginX, OriginY, HandArray) {};

ball.prototype.move = function () {
  const OriginX = this.X;
  const OriginY = this.Y;
  this.X += this.Vx;
  this.Y += this.Vy;
  if (this.Vx > this.ax) this.Vx -= this.ax;
  else if (this.Vx < -this.ax) this.Vx += this.ax;
  if (this.Vy > this.ay) this.Vy -= this.ay;
  else if (this.Vy < -this.ay) this.Vy += this.ay;
  this.BeforeX = OriginX;
  this.BeforeY = OriginY;
  return [OriginX, OriginY];
};
