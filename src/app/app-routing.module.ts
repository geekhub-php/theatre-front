import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';

import { AboutMoreComponent } from './components/about/about-more/about-more.component';
import { FestivalsComponent } from './components/about/festivals/festivals.component';
import { TheatreHistoryComponent } from './components/about/theatre-history/theatre-history.component';
import { EpochComponent } from './components/about/epoch/epoch.component';
import { VisitComponent } from './components/about/visit/visit.component';

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

import { PageNotFoundComponent } from './modules/core/components/page-not-found/page-not-found.component';
import { DevTeamComponent } from './components/dev-team/dev-team.component';
import { PartnersComponent } from './components/partners/partners.component';


const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'poster', component: ScheduleComponent},
  {path: 'repertoire', component: RepertoireComponent},
  {path: 'performance/:slug', component: PerformanceComponent},
  {path: 'news', component: NewsComponent},
  {path: 'news/:slug', component: ArticleComponent},
  {path: 'about', component: TheatreHistoryComponent},
  {path: 'about/theatre-history', component: TheatreHistoryComponent},
  {path: 'about/epoch', component: EpochComponent},
  {path: 'about/festivals', component: FestivalsComponent},
  {path: 'about/visit', component: VisitComponent},
  {path: 'about/festivals/:slug', component: AboutMoreComponent},
  {path: 'persons', component: TeamComponent},
  {path: 'persons/:slug', component: PersonComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'board-trustees', component: BoardTrusteesComponent},
  {path: 'donate', component: DonateComponent},
  {path: 'developers-team', component: DevTeamComponent},
  {path: 'partners', component: PartnersComponent}
/*  // {path: '**', component: PageNotFoundComponent} // remove for now, due to strange behaviour in ssr setup*/
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {
      relativeLinkResolution: 'legacy',
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
