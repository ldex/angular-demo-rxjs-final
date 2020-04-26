import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {

    message: string = "";

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        let reason:string = this.route.snapshot.queryParams['reason'] || 'none';


        this.message = reason;
    }
}