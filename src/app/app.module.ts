import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { NodeApiService } from './services/node-api.service';
import { DataStoreService } from './services/data-store.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRouting,
    BrowserAnimationsModule,
    CollapseModule.forRoot()
  ],
  providers: [NodeApiService, DataStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
