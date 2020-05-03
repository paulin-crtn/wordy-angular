import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FindWordComponent } from './components/find-word/find-word.component';
import { FindDefinitionComponent } from './components/find-definition/find-definition.component';
import { LegalComponent } from './components/legal/legal.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'find-word', component: FindWordComponent},
  {path: 'find-definition', component: FindDefinitionComponent},
  {path: 'legal', component: LegalComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
