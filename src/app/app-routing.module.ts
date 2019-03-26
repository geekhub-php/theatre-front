import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { AboutComponent } from './about/about.component';
import { CalendarComponent } from './schedule/calendar/calendar.component';
import { ContactsComponent } from './contacts/contacts.component';
import { TeamComponent } from './team/team.component';
import { PersonComponent } from './person/person.component';

import { PerformanceListComponent } from './performance-list/performance-list.component';
import { PerformanceComponent } from './performance/performance.component';

import { NewsComponent } from './news/news.component';
import { ArticleComponent } from './article/article.component';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';


const appRoutes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'poster', component: CalendarComponent},
    {path: 'repertoire', component: PerformanceListComponent},
    {path: 'performance/:slug', component: PerformanceComponent},
    {path: 'news', component: NewsComponent},
    {path: 'news/:slug', component: ArticleComponent},
    {path: 'about', component: AboutComponent},
    {path: 'persons', component: TeamComponent},
    {path: 'persons/:slug', component: PersonComponent},
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
