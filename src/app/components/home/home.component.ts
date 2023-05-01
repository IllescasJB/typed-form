import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  template: `
  <mat-sidenav-container class="example-container" autosize>
    <mat-sidenav #drawer mode="side">
      <h2 class="px-20 py-5">Navigate</h2>
      <mat-divider></mat-divider>
      <mat-nav-list>
        <div mat-subheader>Forms</div>
        <mat-list-item routerLink="/typed-form" routerLinkActive="active-link">
          <mat-icon mat-list-icon>description</mat-icon>
          <div mat-line>Typed Form</div>
        </mat-list-item>
        <mat-list-item routerLink="/typed-form-optional" routerLinkActive="active-link">
          <mat-icon mat-list-icon>description</mat-icon>
          <div mat-line>Typed Form Optional</div>
        </mat-list-item>
      </mat-nav-list>
    </mat-sidenav>
    <mat-sidenav-content>
      <mat-toolbar color="primary">
        <button mat-icon-button (click)="drawer.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>My First Typed Form</span>
      </mat-toolbar>
      <router-outlet></router-outlet>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor() { }

}
