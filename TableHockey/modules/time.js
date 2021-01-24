class timer {
  constructor(ms, printer) {
    this._ms = ms;
    this.MissionList = [];
    this._printer = printer;
  }
}

timer.prototype.addMission = function (element) {
  this.MissionList.push(element);
};

timer.prototype._eachRound = function () {
  for (var i in this.MissionList) {
    this.MissionList[i].move();
  }
  this._printer.show(this.MissionList);
};

timer.prototype.Run = function () {
  let time = this;
  window.setInterval(function () {
    time._eachRound();
  }, time._ms);
};
