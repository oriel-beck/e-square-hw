import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar.component';
import { ButtonModule } from '../button/button.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        ButtonModule,
        MatInputModule,
        FormsModule,
        MatIconModule
    ],
    exports: [
        NavbarComponent
    ]
})
export class NavbarModule { }
