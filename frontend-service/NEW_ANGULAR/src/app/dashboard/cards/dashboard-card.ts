import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

export class DashboardCard {
  static metadata: any = {
    NAME: new InjectionToken<string>('name'),
    ROUTERLINK: new InjectionToken<string>('routerLink'),
    ICONCLASS: new InjectionToken<string>('iconClass'),
    COLS: new InjectionToken<Observable<number>>('cols'),
    ROWS: new InjectionToken<Observable<number>>('rows'),
	COLOR: new InjectionToken<string>('color'),
	DATACALLBACK: new InjectionToken<() => Observable<any>>('dataCallback')
  };

  constructor(private _input: {
    name: {
      key: InjectionToken<string>,
      value: string
    },
    routerLink: {
      key: InjectionToken<string>,
      value: string
    },
    iconClass: {
      key: InjectionToken<string>,
      value: string
    },
    cols: {
      key: InjectionToken<Observable<number>>,
      value: Observable<number>
    },
    rows: {
      key: InjectionToken<Observable<number>>,
      value: Observable<number>
    },
    color: {
      key: InjectionToken<string>,
      value: string
	},
	dataCallback: {
      key: InjectionToken<() => Observable<any>>,
      value: () => Observable<any>
    }
  }, private _component: any) {
  }

  get input(): {
    name: {
      key: InjectionToken<string>;
      value: string
    };
    routerLink: {
      key: InjectionToken<string>;
      value: string
    };
    iconClass: {
      key: InjectionToken<string>;
      value: string
    };
    cols: {
      key: InjectionToken<Observable<number>>;
      value: Observable<number>
    };
    rows: {
      key: InjectionToken<Observable<number>>;
      value: Observable<number>
    };
    color: {
      key: InjectionToken<string>;
      value: string
	};
	dataCallback: {
      key: InjectionToken<() => Observable<any>>,
      value: () => Observable<any>
    };
  } {
    return this._input;
  }

  get component(): any {
    return this._component;
  }
}
