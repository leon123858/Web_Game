class enemyAI {
  constructor(ball, enemyPlace) {
    this._Ball = ball;
    this._enemyPlace = enemyPlace;
    this._constantP = 0.2;
    this._ms = 15;
    this._waitLength = 100;
    this._changeModeRange = 5;
    this._highSpeed = 10;
    this._status = 0;
    this._time = 0;
  }
  set offsetList(n) {
    this._offsetList = n;
  }
  get status() {
    return this._status;
  }
}

enemyAI.prototype.placeOffset = function (x1, x2, y1, y2, event, mousePlace) {
  if (event.pageX < x1) mousePlace.x = x1;
  else if (event.pageX > x2) mousePlace.x = x2;
  else mousePlace.x = event.pageX;
  if (event.pageY < y1) mousePlace.y = y1;
  else if (event.pageY > y2) mousePlace.y = y2;
  else mousePlace.y = event.pageY;
};

enemyAI.prototype._placeOffset = function () {
  if (this._enemyPlace.x < this._offsetList[0])
    this._enemyPlace.x = this._offsetList[0];
  else if (this._enemyPlace.x > this._offsetList[1])
    this._enemyPlace.x = this._offsetList[1];
  if (this._enemyPlace.y < this._offsetList[2])
    this._enemyPlace.y = this._offsetList[2];
  else if (this._enemyPlace.y > this._offsetList[3])
    this._enemyPlace.y = this._offsetList[3];
};

enemyAI.prototype._eachRound = function () {
  switch (this._status) {
    case 0:
      this._enemyPlace.y +=
        this._constantP * (this._Ball.Y - this._enemyPlace.y);
      this._enemyPlace.x +=
        this._constantP *
        (this._Ball.X + this._waitLength - this._enemyPlace.x);
      this._placeOffset();
      if (
        this._Ball.Y - this._enemyPlace.y < this._changeModeRange &&
        Math.abs(this._Ball.X - this._enemyPlace.x) < this._waitLength
      ) {
        this._status = 1;
        this._time = 20;
      }
      break;
    case 1:
      this._enemyPlace.y +=
        this._constantP * (this._Ball.Y - this._enemyPlace.y);
      this._enemyPlace.x +=
        this._Ball.X - this._enemyPlace.x > 0
          ? this._highSpeed
          : -this._highSpeed;
      this._placeOffset();
      this._time--;
      if (this._time < 0) this._status = 0;
      break;
    case 2:
      this._enemyPlace.y +=
        this._constantP *
        (this._Ball.Y - this._enemyPlace.y - this._waitLength);
      this._enemyPlace.x +=
        (this._constantP / 2) *
        (this._Ball.X + this._waitLength - this._enemyPlace.x);
      this._placeOffset();
      if (
        Math.abs(this._Ball.Y - this._enemyPlace.y - this._waitLength) <
        this._changeModeRange
      )
        this._status = 0;
      break;
    case 3:
      this._enemyPlace.y +=
        this._constantP *
        (this._Ball.Y - this._enemyPlace.y + this._waitLength);
      this._enemyPlace.x +=
        (this._constantP / 2) *
        (this._Ball.X + this._waitLength - this._enemyPlace.x);
      this._placeOffset();
      if (
        Math.abs(this._Ball.Y - this._enemyPlace.y + this._waitLength) <
        this._changeModeRange
      )
        this._status = 0;
      break;
    default:
      //console.log(this._status);
      break;
  }
};

enemyAI.prototype.Run = function () {
  let time = this;
  window.setInterval(function () {
    time._eachRound();
  }, time._ms);
};
