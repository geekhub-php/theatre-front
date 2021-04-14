import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { FestivalsComponent } from "../festivals/festivals.component";
import { TheatreHistoryComponent } from "../theatre-history/theatre-history.component";
import { EpochComponent } from "../epoch/epoch.component";
import { VisitComponent } from "../visit/visit.component";
import { AboutComponent } from "../about.component";

const routes: Routes = [
  { path: "festivals", component: FestivalsComponent },
  { path: "theatre-history", component: TheatreHistoryComponent },
  { path: "epoch", component: EpochComponent },
  { path: "visit", component: VisitComponent },
  // { path: "about", component: AboutComponent },
  // { path: '**', redirectTo: '/'}

];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AboutNavModule {}
