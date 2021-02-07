class box {
  constructor(X_place, Y_place, width, height, Color) {
    this._type = "box";
    this._x = X_place;
    this._y = Y_place;
    this._width = width;
    this._height = height;
    this._color = typeof Color !== "undefined" ? Color : "#000000";
  }
  get type() {
    return this._type;
  }
  get X() {
    return this._x;
  }
  get Y() {
    return this._y;
  }
  get Width() {
    return this._width;
  }
  get Height() {
    return this._height;
  }
  get Color() {
    return this._color;
  }
}
