import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatProgressSpinnerModule,
  MatFormFieldModule, MatSelectModule, MatCardModule,MatAutocompleteModule, 
  MatInputModule, MatChipsModule, MatListModule, MatTabsModule, MatDialogModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule, MatButtonModule, MatCheckboxModule, MatToolbarModule,
    MatProgressSpinnerModule, MatSelectModule, MatFormFieldModule,MatCardModule, MatAutocompleteModule,
    MatInputModule,ReactiveFormsModule,MatChipsModule, MatListModule, MatTabsModule, ChartsModule, MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
