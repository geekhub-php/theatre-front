import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './components/header/header.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SpinnerModule } from '../../components/partials/spinner/spinner.module';

import { VisuallyImpairedComponent } from './components/visually-impaired/visually-impaired.component';
import { FooterNavComponent } from './components/footer-nav/footer-nav.component';
import { BreadcrumbComponent } from '../../components/partials/breadcrumb/breadcrumb.component';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    HeaderComponent,
    MainNavComponent,
    FooterComponent,
    PageNotFoundComponent,
    VisuallyImpairedComponent,
    FooterNavComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SpinnerModule,
    NgbCollapseModule,
    FormsModule,
    TooltipModule,
  ],
  exports: [
    HeaderComponent,
    MainNavComponent,
    FooterComponent,
    FooterNavComponent,
    VisuallyImpairedComponent,
    BreadcrumbComponent
  ]
})

export class CoreModule {
}
