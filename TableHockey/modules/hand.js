class hand {
  constructor(X_place, Y_place, mousePlace, radius, Color) {
    this._type = "hand";
    this.X = X_place;
    this.Y = Y_place;
    this._mousePlace = mousePlace;
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
}

hand.prototype.move = function () {
  const OriginX = this.X;
  const OriginY = this.Y;
  this.X = mousePlace.x;
  this.Y = mousePlace.y;
  return [OriginX, OriginY];
};

hand.prototype.TwoPointDistance = function (x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

hand.prototype.timeSlice = function (OriginX, OriginY, BallArray) {
  const splitCount = 10;
  for (var i in BallArray) {
    //兩移動物碰撞演算法(時間切片);
    let HandStageX = (this.X - OriginX) / splitCount;
    let HandStageY = (this.Y - OriginY) / splitCount;
    let BallStageX = BallArray[i].Vx / splitCount;
    let BallStageY = BallArray[i].Vy / splitCount;
    for (var j = 0; j <= splitCount; j++) {
      if (
        this.TwoPointDistance(
          OriginX + HandStageX * j,
          OriginY + HandStageY * j,
          BallArray[i].BeforeX + BallStageX * j,
          BallArray[i].BeforeY + BallStageY * j
        ) <
        BallArray[i].r + this.r
      ) {
        BallArray[i].Vx *= -1;
        BallArray[i].Vy *= -1;
      }
    }
  }
};
