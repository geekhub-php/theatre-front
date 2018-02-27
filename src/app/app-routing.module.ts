import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PerformanceListComponent} from './performance-list/performance-list.component';
import {ContactsComponent} from './contacts/contacts.component';
import {TeamComponent} from './team/team.component';
import {NewsListComponent} from './news-list/news-list.component';
import {TeamListComponent} from './team-list/team-list.component';
import {PerformanceComponent} from './performance/performance.component';
import {HomePageComponent} from './home-page/home-page.component';
import {NewsComponent} from './news/news.component';
import {AboutComponent} from './about/about.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

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
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
      RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
