import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';

import { AboutComponent } from './components/about/about.component';
import { AboutMoreComponent } from './components/about/about-more/about-more.component';

import { AdministrationComponent } from './components/team/administration/administration.component';
import { ArtisticComponent } from './components/team/artistic/artistic.component';
import { CreativeComponent } from './components/team/creative/creative.component';
import { PersoneShowmoreComponent } from './components/team/persone-showmore/persone-showmore.component';

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
import { CooperationComponent } from './components/cooperation/cooperation.component';


const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'poster', component: ScheduleComponent},
  {path: 'repertoire', component: RepertoireComponent},
  {path: 'performance/:slug', component: PerformanceComponent},
  {path: 'news', component: NewsComponent},
  {path: 'news/:slug', component: ArticleComponent},
  {path: 'about', component: AboutComponent},
  {path: 'about/:slug', component: AboutMoreComponent},
  {
    path: 'persons', component: TeamComponent,
    children: [
      {path: '', redirectTo: 'creative', pathMatch: 'full'},
      {path: 'creative', component: CreativeComponent},
      {path: 'artistic', component: ArtisticComponent},
      {path: 'administration', component: AdministrationComponent},
      {path: 'administration/:slug', component: PersoneShowmoreComponent},
      {path: 'creative/:slug', component: PersoneShowmoreComponent},
      {path: 'artistic/:slug', component: PersoneShowmoreComponent},
      {path: ':personId', component: PersonComponent}
    ]
  },
  {path: 'contacts', component: ContactsComponent},
  {path: 'board-trustees', component: BoardTrusteesComponent},
  {path: 'donate', component: DonateComponent},
  {path: 'developers-team', component: DevTeamComponent},
  {path: 'partners', component: PartnersComponent},
  {path: 'cooperation', component: CooperationComponent}
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
