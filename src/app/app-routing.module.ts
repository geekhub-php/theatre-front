import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';

import { AboutComponent } from './about/about.component';
import { AboutMoreComponent } from './about/about-more/about-more.component';

import { ScheduleComponent } from './schedule/schedule.component';
import { ContactsComponent } from './contacts/contacts.component';
import { TeamComponent } from './team/team.component';
import { PersonComponent } from './person/person.component';

import { PerformanceListComponent } from './performance-list/performance-list.component';
import { PerformanceComponent } from './performance/performance.component';

import { NewsComponent } from './news/news.component';
import { ArticleComponent } from './article/article.component';

import { PartnersComponent } from './partners/partners.component';
import { BoardTrusteesComponent } from './board-trustees/board-trustees.component';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { DevTeamComponent } from './dev-team/dev-team.component';


const appRoutes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'poster', component: ScheduleComponent},
    {path: 'repertoire', component: PerformanceListComponent},
    {path: 'performance/:slug', component: PerformanceComponent},
    {path: 'news', component: NewsComponent},
    {path: 'news/:slug', component: ArticleComponent},
    {path: 'about', component: AboutComponent},
    {path: 'about/:slug', component: AboutMoreComponent},
    {path: 'persons', component: TeamComponent},
    {path: 'persons/:slug', component: PersonComponent},
    {path: 'contacts', component: ContactsComponent},
    {path: 'partners', component: PartnersComponent},
    {path: 'board-trustees', component: BoardTrusteesComponent},
    {path: 'developers-team', component: DevTeamComponent}
    // {path: '**', component: PageNotFoundComponent} // remove for now, due to strange behaviour in ssr setup
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {
      relativeLinkResolution: 'legacy',
      scrollPositionRestoration : 'top'
    })
  ],
  exports: [
      RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
