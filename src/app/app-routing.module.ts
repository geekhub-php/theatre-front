import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';

import { HomePageComponent } from './components/home-page/home-page.component';

import { AboutComponent } from './components/about/about.component';
import { AboutMoreComponent } from './components/about/about-more/about-more.component';
import { FestivalsComponent } from './components/about/festivals/festivals.component';
import { TheatreHistoryComponent } from './components/about/theatre-history/theatre-history.component';
import { EpochComponent } from './components/about/epoch/epoch.component';
import { VisitComponent } from './components/about/visit/visit.component';

import { PersonsShowMoreComponent } from './components/team/persone-show-more/persons-show-more.component';

import { ScheduleComponent } from './components/schedule/schedule.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { TeamComponent } from './components/team/team.component';
import { PersonComponent } from './components/person/person.component';

import { RepertoireComponent } from './components/repertoire/repertoire.component';
import { PerformanceComponent } from './components/performance/performance.component';

import { NewsComponent } from './components/news/news.component';
import { ArticleComponent } from './components/article/article.component';

import { BoardTrusteesComponent } from './components/board-trustees/board-trustees.component';

import { PageNotFoundComponent } from './modules/core/components/page-not-found/page-not-found.component';
import { DevTeamComponent } from './components/dev-team/dev-team.component';
import { PartnersComponent } from './components/partners/partners.component';
import { CooperationComponent } from './components/cooperation/cooperation.component';
import { GroupComponent } from './components/team/group/group.component';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'poster', component: ScheduleComponent},
  {path: 'repertoire', component: RepertoireComponent},
  {path: 'repertoire/:slug', component: RepertoireComponent},
  {path: 'performance/:slug', component: PerformanceComponent},
  {path: 'news', component: NewsComponent},
  {path: 'news/:slug', component: ArticleComponent},
  // {
  //   path: 'about', component: AboutComponent,
  //   children: [
  //     {path: '', redirectTo: 'theatre-history', pathMatch: 'full'},
  //     {path: 'theatre-history', component: TheatreHistoryComponent},
  //     {path: 'epoch/persons', component: EpochComponent},
  //     {path: 'festivals', component: FestivalsComponent},
  //     {path: 'visit', component: VisitComponent},
  //     {path: 'festivals/:slug', component: AboutMoreComponent}
  //   ]
  // },
  // {path: 'about/:personId', component: PersonComponent},
  {
    path: 'team', component: TeamComponent,
    children: [
      {path: ':group/:slug', component: PersonsShowMoreComponent},
      {path: ':group', component: GroupComponent},
    ]
  },
  {path: 'persons/:personId', component: PersonComponent},
  {path: 'contacts', component: ContactsComponent},
  // {path: 'board-trustees', component: BoardTrusteesComponent},
  // {path: 'developers-team', component: DevTeamComponent},
  // {path: 'partners', component: PartnersComponent},
  // {path: 'cooperation', component: CooperationComponent},
  {path: '**', component: PageNotFoundComponent} // remove for now, due to strange behaviour in ssr setup*/
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, {
      relativeLinkResolution: 'legacy',
      scrollPositionRestoration: 'top',
      onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
  declarations: [],
})
export class AppRoutingModule {
}
