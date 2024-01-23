import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonIcon,
  IonLabel,
  IonItem,
  IonTextarea,
  IonListHeader,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Score } from '../scoreboard';
import { ScoreService } from '../score.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonList,
    IonIcon,
    IonLabel,
    IonItem,
    NgFor,
    NgIf,
    IonTextarea,
    IonListHeader,
  ],
})
export class Tab2Page {
  scores: Score[] = [];
  constructor(private heroService: ScoreService) {}

  getScores(): void {
    this.scores = this.heroService.getHeroes();
  }
  ngOnInit(): void {
    this.getScores();
  }
}
