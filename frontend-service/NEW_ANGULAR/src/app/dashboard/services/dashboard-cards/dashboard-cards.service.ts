import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DashboardCard} from '../../cards/dashboard-card';

@Injectable()
export class DashboardCardsService {

  constructor() {
  }

  private _cards: BehaviorSubject<DashboardCard[]> = new BehaviorSubject<DashboardCard[]>([]);

  addCard(card: DashboardCard): void {
    this._cards.next(this._cards.getValue().concat(card));
  }

  clear(): void {
    this._cards.getValue().length=0
  }

  get cards(): BehaviorSubject<DashboardCard[]> {
    return this._cards;
  }
}
