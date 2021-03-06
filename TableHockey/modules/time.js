class timer {
  constructor(ms, MissionList, printer) {
    this._ms = ms;
    this.MissionList = MissionList;
    this._printer = printer;
    this._PointBox = [];
    this._Box = [];
    this._Ball = [];
    MissionList.forEach((element) => {
      switch (element.type) {
        case "box":
          this._Box.push(element);
          break;
        case "ball":
          this._Ball.push(element);
          break;
        case "pointBox":
          this._PointBox.push(element);
          break;
        default:
          break;
      }
    });
  }
}

timer.prototype.addMission = function (element) {
  this.MissionList.push(element);
};

timer.prototype._eachRound = function () {
  for (var i in this.MissionList)
    if (this.MissionList[i].type == "ball") {
      let place = this.MissionList[i].move();
      if (
        !this.MissionList[i].SAT_getPointBox(place[0], place[1], this._PointBox)
      )
        this.MissionList[i].SAT_box(place[0], place[1], this._Box);
      else {
        alert("得分了");
        break;
      }
    } else if (this.MissionList[i].type == "hand") {
      let place = this.MissionList[i].move();
      this.MissionList[i].timeSlice(place[0], place[1], this._Ball);
    }
  this._printer.draw(this.MissionList);
};

timer.prototype.Run = function () {
  let time = this;
  window.setInterval(function () {
    time._eachRound();
  }, time._ms);
};
