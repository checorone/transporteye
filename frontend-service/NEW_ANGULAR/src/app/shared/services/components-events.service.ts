import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentsEventsService {

  // @Output()
  onLoginEvent: EventEmitter<string> = new EventEmitter();
  constructor() { }
}
