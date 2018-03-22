import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TogglesidebarService } from './togglesidebar.service';
import { PlayersComponent } from './players/players.component';
import { HomeComponent } from './home/home.component';
import { AddPlayerComponent } from './players/add-player/add-player.component';
import { EditPlayerComponent } from './players/edit-player/edit-player.component';
import { TeamComponent } from './team/team.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { EditTeamComponent } from './team/edit-team/edit-team.component';
import { MatchesComponent } from './matches/matches.component';
import { SoccerFieldComponent } from './soccer-field/soccer-field.component';
import { AddMatchComponent } from './matches/add-match/add-match.component';
import { EditMatchComponent } from './matches/edit-match/edit-match.component';
import { EditPlayersMatchComponent } from './matches/edit-players-match/edit-players-match.component';
import { UsersComponent } from './users/users.component';
import { AddUsersComponent } from './users/add-users/add-users.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth-guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PaginationService } from './pagination.service'
import { HttpModule } from '@angular/http';
import { FirebaseConfig } from './../environments/firebase.config';
import { AngularFireModule } from 'angularfire2/index';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { RefereeComponent } from './referees/referees.component';
import { CoachesComponent } from './coaches/coaches.component';
import { AddCoachesComponent } from './coaches/add-coaches/add-coaches.component';
import { EditCoachesComponent } from './coaches/edit-coaches/edit-coaches.component';
import { AddRefereesComponent } from './referees/add-referees/add-referees.component';
import { EditRefereesComponent } from './referees/edit-referees/edit-referees.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidebarComponent,
    PlayersComponent,
    HomeComponent,
    AddPlayerComponent,
    EditPlayerComponent,
    TeamComponent,
    AddTeamComponent,
    EditTeamComponent,
    MatchesComponent,
    SoccerFieldComponent,
    AddMatchComponent,
    EditMatchComponent,
    EditPlayersMatchComponent,
    UsersComponent,
    AddUsersComponent,
    EditUsersComponent,
    LoginComponent,
    PagenotfoundComponent,
    RefereeComponent,
    CoachesComponent,
    AddCoachesComponent,
    EditCoachesComponent,
    AddRefereesComponent,
    EditRefereesComponent,
    PasswordComponent
    
  ],

  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFirestoreModule
  ],
  providers: [TogglesidebarService, AuthService, AuthGuard, PaginationService, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
