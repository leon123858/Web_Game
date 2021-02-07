class printer {
  constructor(id) {
    this._canvas = window.document.getElementById(id);
    this._canvas.height = window.innerHeight * 0.7;
    this._canvas.width = window.innerWidth * 0.5;
    this._canvasWidth = this._canvas.width;
    this._canvasHeight = this._canvas.height;
  }
  get Height() {
    return this._canvasHeight;
  }
  get Width() {
    return this._canvasWidth;
  }
}

printer.prototype._clearCanvas = function () {
  this._canvas.height = this._canvas.height;
};

printer.prototype._showBall = function (ball) {
  let context = this._canvas.getContext("2d");
  context.fillStyle = ball.Color; //"#0000ff"
  context.strokeStyle = ball.Color;
  context.beginPath();
  context.arc(ball.X, ball.Y, ball.r, 0, 2 * Math.PI, true);
  context.closePath();
  context.stroke();
  context.fill();
};

printer.prototype._showBox = function (box) {
  let context = this._canvas.getContext("2d");
  context.strokeStyle = box.Color;
  context.lineWidth = 10;
  context.strokeRect(box.X, box.Y, box.Width, box.Height);
};

printer.prototype.draw = function (array) {
  this._clearCanvas();
  array.forEach((element) => {
    switch (element.type) {
      case "ball":
        this._showBall(element);
        //console.log("show ball");
        break;
      case "box":
        this._showBox(element);
        //console.log("show box");
        break;
      case "hand":
        this._showBall(element);
        //console.log("show box");
        break;
      default:
        //console.log("show default :" + " " + element.type);
        break;
    }
  });
};
