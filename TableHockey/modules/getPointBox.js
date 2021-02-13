class getPointBox extends box {
  //碰撞檢測要優先檢查此物件,因優先檢查得分碰撞
  constructor(X, Y, W, H, C, who, vector) {
    super(X, Y, W, H, C);
    this._whoPoint = who;
    this._type = "pointBox";
    this._vector = vector;
  }
  get vectorX() {
    return this._vector._Xo;
  }

  get vector() {
    return this._vector;
  }

  get who() {
    return this._whoPoint;
  }
}
