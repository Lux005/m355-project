import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-task1',
  templateUrl: './task1.page.html',
  styleUrls: ['./task1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Task1Page implements OnInit {
  constructor(private router: Router) {}

  private updateInterval: any; // Timer-Variable
  public currentLocation: { latitude: number; longitude: number } = {
    latitude: 0,
    longitude: 0,
  };
  public coordinatesMatch: boolean = false;

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
    this.updateCurrentLocation();

    this.updateInterval = setInterval(() => {
      this.updateCurrentLocation();
    }, 5000);
  }
  ngOnDestroy() {
    clearInterval(this.updateInterval);
  }

  async updateCurrentLocation() {
    try {
      const location = await Geolocation.getCurrentPosition();
      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      console.log('Aktuelle Position aktualisiert:', newLocation);

      // Überprüfen, ob die aktuellen Koordinaten ungefähr gleich der Zieldestination sind
      const schwellenwertInKilometern = 1;
      const distanz = this.berechneDistanz(newLocation, this.zielDestination);

      // Wenn die Distanz kleiner oder gleich dem Schwellenwert ist, setzen wir coordinatesMatch auf true
      this.coordinatesMatch = distanz <= schwellenwertInKilometern;

      this.currentLocation = newLocation;
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Position:', error);
    }
  }
  private zielDestination = {
    latitude: 47.07194942144848,
    longitude: 8.348942162075302,
  };

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
    return distance;
  }

  private gradZuRad(grad: number): number {
    return (grad * Math.PI) / 180;
  }

  nextPage() {
    this.router.navigate(['/task2']);
  }
}
