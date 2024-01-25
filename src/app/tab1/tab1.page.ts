import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonAlert,
  IonInput,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Router } from '@angular/router';
import { GeolocationPluginPermissions } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonButton,
    IonAlert,
    IonInput,
  ],
})
export class Tab1Page {
  imageUrl?: string;
  public alertButtons = [
    {
      text: 'abbrechen',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'ok',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');

        this.router.navigate(['/task1']);
      },
    },
  ];
  public alertInputs = [
    {
      placeholder: 'Nickname (max 10 characters)',
      attributes: {
        maxlength: 10,
      },
    },
  ];

  constructor(private router: Router) {}

  async openCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.imageUrl = image.webPath;
  }
}
