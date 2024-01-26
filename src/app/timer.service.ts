import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor() {}
  starttime: any;
  stoptime: any;

  startTimer() {
    this.starttime = new Date();
    console.log('timerstarted');
    console.log(this.starttime);
  }

  stopTimer() {
    this.stoptime = new Date();
    console.log('timerstopped');
    console.log(this.stoptime);
  }
  houres() {
    return Math.floor((this.stoptime - this.starttime) / 3_600_000);
  }
  minutes() {
    return Math.floor((this.stoptime - this.starttime) / 60_000);
  }
  seconds() {
    return Math.floor((this.stoptime - this.starttime) / 1_000);
  }
  getTime() {
    console.log(
      this.houres() +
        ' hours, ' +
        this.minutes() +
        ' minutes' +
        this.seconds() +
        'seconds',
    );
    return this.houres() + ':' + this.minutes() + ':' + this.seconds();
  }
  getMinutes() {
    return this.minutes();
  }
}
