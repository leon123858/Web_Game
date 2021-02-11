class getPointBox extends box {
  //碰撞檢測要優先檢查此物件,因優先檢查得分碰撞
  constructor(X, Y, W, H, C, who) {
    super(X, Y, W, H, C);
    this._whoPoint = who;
    this._type = "pointBox";
  }
}
getPointBox.prototype.SAT_check_impact = function (ball) {};
