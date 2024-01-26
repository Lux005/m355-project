import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import { NgZone } from '@angular/core';
import { options } from 'ionicons/icons';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-task1',
  templateUrl: './task1.page.html',
  styleUrls: ['./task1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Task1Page implements OnInit, OnDestroy {
  private watchId: any; // Variable zum Speichern der Watch-ID
  public currentLocation: { latitude: number; longitude: number } = {
    latitude: 0,
    longitude: 0,
  };
  public coordinatesMatch: boolean = false;
  private zielDestination = {
    latitude: 47.072024,
    longitude: 8.3489759,
  };

  constructor(
    private router: Router,
    private ngZone: NgZone,
  ) {}

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

  async ngOnInit() {
    this.watchId = await Geolocation.watchPosition(
      {
        enableHighAccuracy: true, // Erhöht die Genauigkeit der Position
      },
      (position) => {
        this.updateCurrentLocation(position);
      },
    );

    if (this.coordinatesMatch) {
      await Haptics.vibrate({ duration: 500 });
    }
  }

  updateCurrentLocation(location: any) {
    this.ngZone.run(() => {
      this.currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      console.log('Aktuelle Position aktualisiert:', this.currentLocation);

      const schwellenwertInKilometern = 0.015;
      const distanz = this.berechneDistanz(
        this.currentLocation,
        this.zielDestination,
      );
      this.coordinatesMatch = distanz <= schwellenwertInKilometern;
      console.log(
        'distanz',
        distanz,
        'schwellenwertInKilometern',
        schwellenwertInKilometern,
        'match:',
        this.coordinatesMatch,
      );
    });
  }

  private berechneDistanz(
    coord1: { latitude: number; longitude: number },
    coord2: { latitude: number; longitude: number },
  ): number {
    const R = 6371; // Radius der Erde in Kilometern
    const dLat = this.gradZuRad(coord2.latitude - coord1.latitude);
    const dLon = this.gradZuRad(coord2.longitude - coord1.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.gradZuRad(coord1.latitude)) *
        Math.cos(this.gradZuRad(coord2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distanz in Kilometern
    console.log(distance);
    return distance;
  }

  private gradZuRad(grad: number): number {
    return (grad * Math.PI) / 180;
  }

  nextPage() {
    if (this.watchId != null) {
      Geolocation.clearWatch({ id: this.watchId });
    }

    this.router.navigate(['/task2']);
  }

  ngOnDestroy() {
    if (this.watchId != null) {
      Geolocation.clearWatch({ id: this.watchId });
    }
  }
}
