export class Timer {
  constructor(durationInSeconds, onUpdate) {
    this.duration = durationInSeconds;
    this.remainingTime = durationInSeconds;
    this.timeSpent = 0;
    this.percent = 0;
    this.timer = null;
    this.onUpdate = onUpdate;
    this.startTime = null;
    this.endTime = null;
  }

  start() {
    if (!this.timer && this.remainingTime > 0) {
      this.startTime = new Date().getTime();
      this.endTime = this.startTime + this.remainingTime * 1000;
      this.timer = setInterval(() => this.update(), 1000); 
    }
  }

  pause() {
    clearInterval(this.timer);
    this.timer = null;
  }

  resume() {
    if (this.remainingTime > 0) {
      this.startTime = new Date().getTime();
      this.endTime = this.startTime + this.remainingTime * 1000;
      this.start();
    }
  }

  stop() {
    this.pause();
    this.remainingTime = this.duration;
    this.timeSpent = 0;
    this.percent = 0;
    this.onUpdate(this.remainingTime, this.timeSpent, this.percent);
  }

  update() {
    const now = new Date().getTime();
    this.remainingTime = Math.max(0, Math.floor((this.endTime - now) / 1000));
    this.timeSpent = this.duration - this.remainingTime;
    this.percent = (this.timeSpent / this.duration) * 100;
    this.onUpdate(this.remainingTime, this.timeSpent, this.percent);

    if (this.remainingTime <= 0) {
      this.stop();
    }
  }

  increaseDuration(seconds) {
    this.duration += seconds;
    this.remainingTime += seconds;
    this.endTime += seconds * 1000;
    this.update();
  }

  decreaseDuration(seconds) {
    if (this.duration <= seconds) return;
    this.duration -= seconds;
    this.remainingTime = Math.max(0, this.remainingTime - seconds);
    this.endTime -= seconds * 1000;
    this.update();
  }
}
