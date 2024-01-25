import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

import { NgForm } from '@angular/forms';

@Component({
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [],
  selector: 'app-task3',
  standalone: true,
  styleUrls: ['./task3.page.scss'],
  templateUrl: './task3.page.html',
})
export class Task3Page implements OnInit {
  constructor(
    private router: Router,
    private alertController: AlertController,
  ) {}
  isSupported = false;
  barcodes: Barcode[] = [];

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  public alertButtons = [
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

  nextPage() {
    this.router.navigate(['/task4']);
  }
}
