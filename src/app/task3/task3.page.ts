import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

import { NgForm } from '@angular/forms';
import { Haptics } from '@capacitor/haptics';

@Component({
  imports: [IonicModule, CommonModule, FormsModule],
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
  finished: boolean = false;

  ngOnInit() {}

  async scan(): Promise<void> {
    this.finished =
      (await BarcodeScanner.scan()).barcodes[0].rawValue == 'M335@ICT-BZ';
    if (this.finished) {
      await Haptics.vibrate({ duration: 500 });
    }
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
