import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { BatteryInfo, Device } from '@capacitor/device';

@Component({
  selector: 'app-task4',
  templateUrl: './task4.page.html',
  styleUrls: ['./task4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Task4Page implements OnInit {
  info?: any;

  private updateInterval: any;
  charging?: boolean;
  isAlertOpen = false;
  alertButtons = ['Action'];
  constructor(private router: Router) {}
  ngOnInit() {
    this.checkBatteryStatus();

    this.updateInterval = setInterval(() => {
      this.checkBatteryStatus();
    }, 5000);
  }

  checkBatteryStatus() {
    this.info = Device.getBatteryInfo();
    this.charging = this.info.isCharging;
    console.log(this.info);
    if (this.info.isCharging) {
      this.setOpen(true);
    }
  }
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  public alertButtons1 = [
    {
      text: 'Nein',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Ja',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');

        this.router.navigate(['/tabs']);
      },
    },
  ];

  public alertButtons2 = [
    {
      text: 'weiter',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');

        this.router.navigate(['/tabs']);
      },
    },
  ];
}
