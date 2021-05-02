import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/authorization/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RegistrationComponent } from './components/authorization/registration/registration.component';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UserOverviewComponent } from './components/user/user-overview/user-overview.component';
import {AppRoutingModule} from './app-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { ProfileDetailsComponent } from './components/user/profile-details/profile-details.component';
import {MatListModule} from '@angular/material/list';
import { FriendsOverviewComponent } from './components/user/friends-overview/friends-overview.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { ProfileInspectionComponent } from './components/profile-inspection/profile-inspection.component';
import { GameComponent } from './components/game/game.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent,
    UserOverviewComponent,
    ProfileDetailsComponent,
    FriendsOverviewComponent,
    ProfileInspectionComponent,
    GameComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        HttpClientModule,
        MatDialogModule,
        MatSnackBarModule,
        AppRoutingModule,
        MatListModule,
        MatOptionModule,
        MatTabsModule,
        MatTableModule,
        FormsModule,
        MatPaginatorModule
    ],
  entryComponents: [
    RegistrationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
