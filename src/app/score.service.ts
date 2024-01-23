import { Injectable } from '@angular/core';
import { Score } from './scoreboard';
import { SCORE } from './mock-scores';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor() {}
  getHeroes(): Score[] {
    return SCORE;
  }
}
