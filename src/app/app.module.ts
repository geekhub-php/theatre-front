import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PerformanceListComponent } from './performance-list/performance-list.component';
import {RouterModule, Routes} from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PerformanceComponent } from './performance/performance.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamComponent } from './team/team.component';
import { ContactsComponent } from './contacts/contacts.component';

const appRoutes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'poster', component: ScheduleComponent},
    {path: 'repertoire', component: PerformanceListComponent},
    {path: 'performance/:slug', component: PerformanceComponent},
    {path: 'news', component: NewsListComponent},
    {path: 'news/:slug', component: NewsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'persons', component: TeamListComponent},
    {path: 'persons/:slug', component: TeamComponent},
    {path: 'contacts', component: ContactsComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    PerformanceListComponent,
    HomePageComponent,
    PerformanceComponent,
    ScheduleComponent,
    NewsListComponent,
    NewsComponent,
    AboutComponent,
    TeamListComponent,
    TeamComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
