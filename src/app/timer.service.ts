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
  }

  stopTimer() {
    this.stoptime = new Date();
    console.log('timerstopped');
  }
  getTime() {
    var diffMs = this.stoptime - this.starttime; // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    console.log(
      diffDays + ' days, ' + diffHrs + ' hours, ' + diffMins + ' minutes',
    );
    return diffHrs + ':' + diffMins;
  }
}
