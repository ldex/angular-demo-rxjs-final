import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ContactComponent } from './contact.component';
import { ErrorComponent } from './error.component';
import { AdminComponent } from './admin.component';


@NgModule({
    imports: [
        CommonModule,
        HomeComponent,
        ContactComponent,
        ErrorComponent,
        AdminComponent
    ]
})
export class SharedModule { }
