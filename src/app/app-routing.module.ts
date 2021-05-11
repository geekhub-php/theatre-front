import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';

import { HomePageComponent } from './components/home-page/home-page.component';

import { AboutComponent } from './components/about/about.component';
import { AboutMoreComponent } from './components/about/about-more/about-more.component';

import { ScheduleComponent } from './components/schedule/schedule.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { TeamComponent } from './components/team/team.component';
import { PersonComponent } from './components/person/person.component';

import { RepertoireComponent } from './components/repertoire/repertoire.component';
import { PerformanceComponent } from './components/performance/performance.component';

import { NewsComponent } from './components/news/news.component';
import { ArticleComponent } from './components/article/article.component';

import { BoardTrusteesComponent } from './components/board-trustees/board-trustees.component';
import { DonateComponent } from './components/donate/donate.component';

/*import { PageNotFoundComponent } from './modules/core/components/page-not-found/page-not-found.component';*/
import { DevTeamComponent } from './components/dev-team/dev-team.component';
import { PartnersComponent } from './components/partners/partners.component';

const appRoutes: Routes = [
      {path: '', component: HomePageComponent, data: {breadcrumb: 'Main'}},
      {path: 'poster', component: ScheduleComponent, data: {breadcrumb: 'Poster'}},
      {path: 'repertoire', component: RepertoireComponent, data: {breadcrumb: 'Repertoire'}},
      {path: 'performance/:slug', component: PerformanceComponent, data: {breadcrumb: 'Performance'}},
      {path: 'news', component: NewsComponent, data: {breadcrumb: 'News'}},
      {path: 'news/:slug', component: ArticleComponent, data: {breadcrumb: 'News'}},
      {path: 'about', component: AboutComponent, data: {breadcrumb: 'About'}},
      {path: 'about/:slug', component: AboutMoreComponent, data: {breadcrumb: 'About'}},
      {path: 'persons', component: TeamComponent, data: {breadcrumb: 'Personalities'}},
      {path: 'persons/:slug', component: PersonComponent, data: {breadcrumb: 'Personalities'}},
      {path: 'contacts', component: ContactsComponent, data: {breadcrumb: 'Contacts'}},
      {path: 'board-trustees', component: BoardTrusteesComponent, data: {breadcrumb: 'Board of Trustees'}},
      {path: 'donate', component: DonateComponent, data: {breadcrumb: 'Cooperation'}},
      {path: 'developers-team', component: DevTeamComponent, data: {breadcrumb: 'Developers Team'}},
      {path: 'partners', component: PartnersComponent, data: {breadcrumb: 'Partners'}}

  /*  // {path: '**', component: PageNotFoundComponent} // remove for now, due to strange behaviour in ssr setup*/
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, {
      relativeLinkResolution: 'legacy',
      scrollPositionRestoration: 'top',
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
  declarations: [],
})
export class AppRoutingModule {
}
