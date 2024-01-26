import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { BatteryInfo, Device } from '@capacitor/device';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { style } from '@angular/animations';

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

  constructor(private router: Router) {}
  ngOnInit() {
    this.checkBatteryStatus();

    this.updateInterval = setInterval(() => {
      this.checkBatteryStatus();
    }, 5000);
  }

  async checkBatteryStatus() {
    this.info = await Device.getBatteryInfo();
    this.charging = this.info.isCharging;
    console.log('here', this.info);
    this.isAlertOpen = this.info.isCharging;
    if (this.info.isCharging == true) {
      await Haptics.vibrate({ duration: 500 });
    }
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

  public alertButtons = [
    {
      text: 'weiter',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        clearInterval(this.updateInterval);
        this.router.navigate(['/tabs']);
      },
    },
  ];
}
