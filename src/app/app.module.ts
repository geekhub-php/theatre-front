import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { HomePageModule } from './home-page/home-page.module';
import { NewsListModule } from './news-list/news-list.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { PerformanceListComponent } from './performance-list/performance-list.component';
import { PerformanceComponent } from './performance/performance.component';

import { ScheduleComponent } from './schedule/schedule.component';

import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ArticleComponent } from './article/article.component';
import { PersonComponent } from './person/person.component';
import { NewsComponent } from './news/news.component';
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  declarations: [
    AppComponent,
    PerformanceListComponent,
    PerformanceComponent,
    ScheduleComponent,
    AboutComponent,
    TeamComponent,
    ContactsComponent,
    ArticleComponent,
    PersonComponent,
    NewsComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    HomePageModule,
    NewsListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
