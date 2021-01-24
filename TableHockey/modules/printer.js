class printer {
  constructor(id) {
    this.id = id;
    this._canvas = document.getElementById(id);
  }
}

printer.prototype._clearCanvas = function () {
  this._canvas.height = this._canvas.height;
};

printer.prototype._showBall = function (ball) {
  let context = this._canvas.getContext("2d");
  context.fillStyle = "#0000ff";
  context.strokeStyle = "#0000ff";
  context.beginPath();
  context.arc(ball.X, ball.Y, ball.r, 0, 2 * Math.PI, true);
  context.closePath();
  context.stroke();
  context.fill();
};

printer.prototype.show = function (array) {
  this._clearCanvas();
  array.forEach((element) => {
    switch (element.type) {
      case "ball":
        this._showBall(element);
        console.log("show ball");
        break;
      default:
        console.log("show default :" + " " + element.type);
        break;
    }
  });
};
