import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.less']
})
export class HomeComponent implements OnInit {
    constructor() {}

    ngOnInit() {
    }

    isAuthenticated() {
        return false;
    }

    login() {
        //Open LOGIN dialog
    }
}
